import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Divider } from "@/components/ui/divider";
import AddTask from "./components/add-task";
import CompletedTasks from "./components/completed-tasks";
import CompletedTasksCounter from "./components/completed-tasks-counter";
import PendingTasks from "./components/pending-tasks";
import PendingTasksCounter from "./components/pending-tasks-counter";
import ProgressTasks from "./components/progress-tasks";
import ProgressTasksBar from "./components/progress-tasks-bar";
import ProgressTasksCounter from "./components/progress-tasks-counter";

export default function HomePage() {
	return (
		<main className="grid grid-cols-3 gap-x-6 p-8 h-[calc(100dvh-4rem)]">
			<Card className="h-[85dvh]">
				<CardHeader>
					<CardTitle>
						Pendientes (<PendingTasksCounter />)
					</CardTitle>
					<AddTask />
				</CardHeader>
				<Divider />
				<PendingTasks />
			</Card>
			<Card className="grid grid-rows-[auto_1px_1fr_1px_auto]">
				<CardHeader>
					<CardTitle>
						En proceso (<ProgressTasksCounter />)
					</CardTitle>
				</CardHeader>
				<Divider />
				<ProgressTasks />
				<Divider />
				<CardFooter>
					<ProgressTasksBar />
				</CardFooter>
			</Card>
			<Card className="h-[85dvh]">
				<CardHeader>
					<CardTitle>
						Completadas (<CompletedTasksCounter />)
					</CardTitle>
				</CardHeader>
				<Divider />
				<CompletedTasks />
			</Card>
		</main>
	);
}
