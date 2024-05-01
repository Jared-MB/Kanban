import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { quicksand } from "@/utils/fonts";
import { Menu } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import AddProject from "./components/add-project";
import ChangeProject from "./components/change-project";
import ProjectName from "./components/project-name";
import "./globals.css";

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
		<html lang="en" suppressHydrationWarning>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased text-zinc-700",
					quicksand.variable,
				)}
			>
				<header className="h-16 flex items-center justify-between px-4 shadow">
					<div className="flex items-center gap-x-4 font-light">
						<h2 className="text-4xl text-purple-500 font-normal flex items-center">
							<Link href="https://kristall.app" target="_blank">
								Kristall
							</Link>
						</h2>
						<span className="text-3xl">|</span>
						<h1 className="text-3xl">Kanban</h1>
					</div>
					<div className="flex flex-row gap-x-4 items-center">
						<ProjectName />
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="icon">
									<Menu />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuLabel>Opciones</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuItem asChild>
									<AddProject showTrigger />
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<ChangeProject />
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
				</header>
				{children}
				<Toaster />
			</body>
		</html>
	);
}
