import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { quicksand } from "@/utils/fonts";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Kanban | Kristall",
	description: "Kanban board by Kristall",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased text-zinc-700",
					quicksand.variable,
				)}
			>
				<header className="h-16 flex items-center px-4 shadow">
					<div className="flex items-center gap-x-4 font-light">
						<h2 className="text-4xl text-purple-500 font-normal flex items-center">
							<Link href="https://kristall.app" target="_blank">
								Kristall
							</Link>
						</h2>
						<span className="text-3xl">|</span>
						<h1 className="text-3xl">Kanban</h1>
					</div>
				</header>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
