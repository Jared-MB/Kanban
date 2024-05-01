"use client";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

export default function RemoveTask({
	open,
	id,
	onOpenChange,
	removeTask,
	from
}: {
	open: boolean;
	id: string;
	from : 'pending' | 'progress' | 'completed';
	onOpenChange: (open: boolean) => void;
	removeTask: (id: string, status: 'pending' | 'completed' | 'progress') => void;
}) {
	const handleRemove = (id: string) => {
		onOpenChange(false);
		removeTask(id, from);
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Eliminar tarea</DialogTitle>
					<DialogDescription>
						¿Estás seguro de que deseas eliminar esta tarea?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<Button variant="outline" onClick={() => onOpenChange(false)}>
						Cancelar
					</Button>
					<Button variant="destructive" onClick={() => handleRemove(id)}>
						Eliminar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
