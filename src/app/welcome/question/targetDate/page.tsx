"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [error, setError] = useState("");

  const handleNext = () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    const today = new Date();
    const selected = new Date(date);

    today.setHours(0, 0, 0, 0);
    selected.setHours(0, 0, 0, 0);

    if (selected <= today) {
      setError("Please choose a date after today");
      return;
    }

    setError("");
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    const updatedUser = {
      ...storedUser,
      targetDate: Number(date),
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    Cookies.set("user", JSON.stringify(updatedUser));
    router.push("/");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="w-screen h-[calc(100vh-80px)] flex justify-center p-8 text-lg">
      <Card className="w-full max-w-sm m-auto">
        <CardHeader>
          <CardTitle>What’s your goal target date?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
              Target Date
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className={`w-full justify-between font-normal ${
                    error ? "border-red-500" : ""
                  }`}
                >
                  {date ? date.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  disabled={{
                    before: new Date(today.getTime() + 24 * 60 * 60 * 1000),
                  }}
                  onSelect={(date) => {
                    setDate(date);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
            {error && <span className="text-red-500 text-sm">{error}</span>}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            onClick={handleNext}
            className="w-full bg-blue-500 hover:bg-blue-600"
          >
            FINISH
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/welcome/question/targetWeight")}
            variant="outline"
            className="w-full"
          >
            BACK
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
