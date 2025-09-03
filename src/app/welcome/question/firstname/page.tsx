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
  const [firstname, setFirstname] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstname.trim()) {
      setError("First name is required");
      return;
    }
    setError("");
    localStorage.setItem(
      "user",
      JSON.stringify({
        firstname: firstname,
      })
    );
    Cookies.set(
      "user",
      JSON.stringify({
        firstname: firstname,
      })
    );
    router.push("/welcome/question/currentWeight/");
  };

  return (
    <div className="w-screen h-[calc(100vh-80px)] flex justify-center p-8 text-lg">
      <Card className="w-full max-w-sm m-auto">
        <CardHeader>
          <CardTitle>What’s your first name?</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">First Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className={error ? "border-red-500" : ""}
                />
                {error && <span className="text-red-500 text-sm">{error}</span>}
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600"
                >
                  NEXT
                </Button>
                <Button
                  type="button"
                  onClick={() => router.push("/welcome/")}
                  variant="outline"
                  className="w-full"
                >
                  BACK
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
