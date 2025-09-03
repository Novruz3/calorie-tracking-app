import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Tracking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex justify-center p-2 h-20 bg-blue-500 items-center rounded-b-3xl">
        <span className="text-white text-4xl font-bold">
          Calorie Tracking App
        </span>
      </div>
      {children}
    </>
  );
}
