import { cn } from "@/lib/utils";

export function Task({ children }: { children: React.ReactNode }) {
	return <article className="flex flex-col gap-y-3">{children}</article>;
}

export function TaskHeader({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<header className={cn("flex items-center gap-x-4", className)}>
			{children}
		</header>
	);
}

export function TaskTitle({ children }: { children: React.ReactNode }) {
	return <h4 className="text-lg text-purple-500">{children}</h4>;
}

export function TaskContent({ children }: { children: React.ReactNode }) {
	return <div className="flex flex-col gap-y-2">{children}</div>;
}
