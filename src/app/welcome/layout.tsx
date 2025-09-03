import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to Calorie Tracking App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
