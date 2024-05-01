import { cn } from "@/lib/utils";

export function Card({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<section
			className={cn("border border-zinc-300/50 rounded h-full", className)}
		>
			{children}
		</section>
	);
}

export function CardHeader({ children }: { children: React.ReactNode }) {
	return (
		<header className="p-4 flex items-center justify-between">
			{children}
		</header>
	);
}

export function CardTitle({ children }: { children: React.ReactNode }) {
	return <h3 className="text-2xl text-purple-500">{children}</h3>;
}

export function CardBody({
	children,
	className,
}: { children: React.ReactNode; className?: string }) {
	return (
		<div className={cn("p-4 flex flex-col gap-y-5 overflow-y-auto", className)}>
			{children}
		</div>
	);
}

export function CardFooter({ children }: { children: React.ReactNode }) {
	return <footer className="p-4 flex items-center">{children}</footer>;
}
