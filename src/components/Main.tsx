"use client";
import React, { useState, useMemo, useEffect } from "react";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { LabelList, Pie, PieChart } from "recharts";
import { Trash2, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Input } from "./ui/input";
import { getTodayFormatted } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";

const chartConfig = {
  visitors: { label: "Total" },
  fat: { label: "Fat", color: "var(--chart-1)" },
  protein: { label: "Protein", color: "var(--chart-2)" },
  carbs: { label: "Carbs", color: "var(--chart-3)" },
} satisfies ChartConfig;

export const Main = () => {
  const [user, setUser] = useState<{ targetWeight?: string }>({});
  const [invoices, setInvoices] = useState([
    { name: "Soup", calories: 5, fat: 9, protein: 5, carbs: 15 },
    { name: "Egg", calories: 15, fat: 13, protein: 0, carbs: 13 },
  ]);

  const [meal, setMeal] = useState({
    name: "",
    calories: "",
    fat: "",
    protein: "",
    carbs: "",
  });

  const [weight, setWeight] = useState(0);
  const [calorie, setCalorie] = useState(100);
  const [weightInput, setWeightInput] = useState("");
  const [calorieInput, setCalorieInput] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const totals = useMemo(() => {
    return invoices.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.fat += item.fat;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        return acc;
      },
      { calories: 0, fat: 0, protein: 0, carbs: 0 }
    );
  }, [invoices]);

  const chartData = [
    { browser: "fat", visitors: totals.fat, fill: "var(--color-fat)" },
    {
      browser: "protein",
      visitors: totals.protein,
      fill: "var(--color-protein)",
    },
    { browser: "carbs", visitors: totals.carbs, fill: "var(--color-carbs)" },
  ];

  const handleSaveMeal = () => {
    if (!meal.name || !meal.calories) return;
    setInvoices([
      ...invoices,
      {
        name: meal.name,
        calories: Number(meal.calories),
        fat: Number(meal.fat),
        protein: Number(meal.protein),
        carbs: Number(meal.carbs),
      },
    ]);
    setMeal({ name: "", calories: "", fat: "", protein: "", carbs: "" });
  };

  const handleDeleteMeal = (index: number) => {
    setInvoices(invoices.filter((_, i) => i !== index));
  };

  const handleUpdateWeight = () => {
    if (weightInput) {
      setWeight(Number(weightInput));
      setWeightInput("");
    }
  };

  const handleUpdateCalorie = () => {
    if (calorieInput) {
      setCalorie(Number(calorieInput));
      setCalorieInput("");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-center gap-4">
        <Card className="flex flex-col">
          <CardHeader className="items-center pb-0">
            <CardTitle>Todays calorie breakdown</CardTitle>
            <CardDescription>{getTodayFormatted()}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  content={<ChartTooltipContent nameKey="visitors" hideLabel />}
                />
                <Pie data={chartData} dataKey="visitors">
                  <LabelList
                    dataKey="browser"
                    className="fill-background"
                    stroke="none"
                    fontSize={12}
                    formatter={(value: keyof typeof chartConfig) =>
                      chartConfig[value]?.label
                    }
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex items-center gap-2 leading-none font-medium">
              Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
            </div>
            <div className="text-muted-foreground leading-none">
              Showing total calories for the last months
            </div>
          </CardFooter>
        </Card>

        <div className="grid grid-cols-2 gap-4">
          <Card className="flex flex-col col-span-2 md:col-span-1 md:w-64 h-48">
            <CardHeader className="items-center pb-0">
              <CardTitle>Daily Weight (kg)</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <span className="text-lg">{weight}</span>
              <hr className="w-full" />
              <span className="text-2xl font-bold text-blue-500">
                {user?.targetWeight}
              </span>
            </CardContent>
          </Card>

          <Card className="flex flex-col col-span-2 md:col-span-1 md:w-64 h-48">
            <CardHeader className="items-center pb-0">
              <CardTitle>Daily Total Calories</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <span className="text-lg">{totals.calories}</span>
              <hr className="w-full" />
              <span className="text-2xl font-bold text-blue-500">
                {calorie}
              </span>
            </CardContent>
          </Card>

          <Card className="flex flex-col col-span-2 md:col-span-1 md:w-64 h-48">
            <CardHeader className="items-center pb-0">
              <CardTitle>Update Current Weight</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <Input
                type="number"
                placeholder="0"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
              />
              <Button
                onClick={handleUpdateWeight}
                className="bg-blue-500 hover:bg-blue-600 w-full"
              >
                Update
              </Button>
            </CardContent>
          </Card>

          <Card className="flex flex-col col-span-2 md:col-span-1 md:w-64 h-48">
            <CardHeader className="items-center pb-0">
              <CardTitle>Update Goal Calorie</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 items-center">
              <Input
                type="number"
                placeholder="0"
                value={calorieInput}
                onChange={(e) => setCalorieInput(e.target.value)}
              />
              <Button
                onClick={handleUpdateCalorie}
                className="bg-blue-500 hover:bg-blue-600 w-full"
              >
                Update
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex justify-between items-center">
          <p className="text-blue-500 font-bold text-lg">All Foods</p>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Meal</DialogTitle>
                <DialogDescription>
                  Fill in the details of your meal and click save.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="meal-name">Name</Label>
                  <Input
                    id="meal-name"
                    placeholder="Meal name"
                    value={meal.name}
                    onChange={(e) => setMeal({ ...meal, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    placeholder="0"
                    value={meal.calories}
                    onChange={(e) =>
                      setMeal({ ...meal, calories: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="fat">Fat (gr)</Label>
                  <Input
                    id="fat"
                    type="number"
                    placeholder="0"
                    value={meal.fat}
                    onChange={(e) => setMeal({ ...meal, fat: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="protein">Protein (gr)</Label>
                  <Input
                    id="protein"
                    type="number"
                    placeholder="0"
                    value={meal.protein}
                    onChange={(e) =>
                      setMeal({ ...meal, protein: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="carbs">Carbs (gr)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    placeholder="0"
                    value={meal.carbs}
                    onChange={(e) =>
                      setMeal({ ...meal, carbs: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={handleSaveMeal}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Save Meal
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {invoices.length === 0 ? (
          <div className="flex justify-center">
            <p>Nothing logged yet. What did you eat today?</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Calories</TableHead>
                <TableHead>Fat (gr)</TableHead>
                <TableHead>Protein (gr)</TableHead>
                <TableHead>Carbs (gr)</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{invoice.name}</TableCell>
                  <TableCell>{invoice.calories}</TableCell>
                  <TableCell>{invoice.fat}</TableCell>
                  <TableCell>{invoice.protein}</TableCell>
                  <TableCell>{invoice.carbs}</TableCell>
                  <TableCell>
                    <Trash2
                      className="text-red-500 cursor-pointer"
                      onClick={() => handleDeleteMeal(index)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default Main;
