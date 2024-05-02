import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import AddProject from "../add-project";
import ChangeProject from "./change-project";
import ExportProject from "./export-project";
import ImportProject from "./import-project";

export default function Menu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<MenuIcon />
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
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<ExportProject />
				</DropdownMenuItem>
				<DropdownMenuItem asChild>
					<ImportProject />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
