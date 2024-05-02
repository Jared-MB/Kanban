import { z } from "zod";

export const ProjectValidator = z.object({
	name: z.string(),
	tasks: z.object({
		completed: z.array(
			z.object({
				_id: z.string().uuid(),
				title: z.string(),
				description: z.string().optional(),
				subtasks: z.array(
					z.object({
						_id: z.string().uuid(),
						name: z.string(),
						completed: z.boolean(),
						description: z.string().optional(),
					}),
				),
			}),
		),
		pending: z.array(
			z.object({
				_id: z.string().uuid(),
				title: z.string(),
				description: z.string().optional(),
				subtasks: z.array(
					z.object({
						_id: z.string().uuid(),
						name: z.string(),
						completed: z.boolean(),
						description: z.string().optional(),
					}),
				),
			}),
		),
		progress: z.array(
			z.object({
				_id: z.string().uuid(),
				title: z.string(),
				description: z.string().optional(),
				subtasks: z.array(
					z.object({
						_id: z.string().uuid(),
						name: z.string(),
						completed: z.boolean(),
						description: z.string().optional(),
					}),
				),
			}),
		),
	}),
	_id: z.string().uuid(),
});
