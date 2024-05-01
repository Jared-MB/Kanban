"use client";
import { useCompletedTasks } from "@/store/useTasks";

export default function CompletedTasksCounter() {
	const tasks = useCompletedTasks((state) => state.tasks);

	return <span className="text-lg">{tasks.length}</span>;
}
