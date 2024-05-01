import { z } from "zod";

const TaskValidator = z.object({
	title: z.string().min(3).max(100),
	description: z.string().optional(),
	subtasks: z.array(
		z.object({
			name: z.string().min(3).max(100),
			description: z.string().optional(),
			completed: z.boolean().optional(),
		}),
	),
});

export type Task = z.infer<typeof TaskValidator>;

export default TaskValidator;
