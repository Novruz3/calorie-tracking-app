"use client";
import Image from "next/image";
import image from "@/../../public/images/diet-tracker-jpg.webp";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen h-screen flex align-center p-8 flex-col">
      <div className="flex flex-col">
        <span className="text-lg">Welcome to</span>{" "}
        <span className="text-blue-500 text-4xl font-bold">
          Calorie Tracking App
        </span>
      </div>
      <div className="p-8">
        <Image
          className="rounded-lg md:h-[calc(100vh*2/3)]"
          src={image}
          alt=""
        />
      </div>
      <div className="flex justify-end items-end h-full">
        <Button
          onClick={() => router.push("welcome/question/firstname")}
          className="bg-blue-500 w-48 h-12 text-lg cursor-pointer rounded-sm hover:bg-blue-600"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
