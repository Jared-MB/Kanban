"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";

const ProgressBar = React.forwardRef<
	React.ElementRef<typeof ProgressPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
	<ProgressPrimitive.Root
		ref={ref}
		className={cn(
			"relative h-4 w-full overflow-hidden rounded-full bg-secondary",
			className,
		)}
		{...props}
	>
		<ProgressPrimitive.Indicator
			className="h-full w-full flex-1 bg-purple-500/80 transition-all"
			style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
		/>
	</ProgressPrimitive.Root>
));
ProgressBar.displayName = ProgressPrimitive.Root.displayName;

const Progress = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col gap-y-2 w-full justify-between">
			{children}
		</div>
	);
};

const ProgressSection = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-row w-full items-center justify-between text-purple-500">
			{children}
		</div>
	);
};

const ProgressLabel = ({ children }: { children: React.ReactNode }) => {
	return <small className="font-medium text-base">{children}</small>;
};

const ProgressValue = ({ value }: { value: number }) => {
	return <small className="font-medium">{value}%</small>;
};

export { Progress, ProgressBar, ProgressLabel, ProgressSection, ProgressValue };
