export function Total({ value, max }: { value: number; max: number }) {
	return (
		<div className="flex items-center gap-x-1">
			<span className="text-lg">{value}</span>
			<span>/</span>
			<small className="text-xs">{max}</small>
		</div>
	);
}
