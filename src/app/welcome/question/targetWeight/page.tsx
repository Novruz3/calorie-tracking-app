"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [weight, setWeight] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!weight.trim() || Number(weight) <= 0) {
      setError("Please enter a valid weight");
      return;
    }

    setError("");
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    const updatedUser = {
      ...storedUser,
      targetWeight: Number(weight),
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    Cookies.set("user", JSON.stringify(updatedUser));
    router.push("/welcome/question/targetDate");
  };

  return (
    <div className="w-screen h-[calc(100vh-80px)] flex justify-center p-8 text-lg">
      <Card className="w-full max-w-sm m-auto">
        <CardHeader>
          <CardTitle>What’s do you what target weight?</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="weight">Target Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="Target Weight (kg)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className={error ? "border-red-500" : ""}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-6">
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
              >
                NEXT
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/welcome/question/currentWeight")}
                variant="outline"
                className="w-full"
              >
                BACK
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
