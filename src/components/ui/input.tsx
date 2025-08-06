import type * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
	return (
		<input
			type={type}
			data-slot="input"
			className={cn(
				"file:text-sjsu-bg placeholder:text-white selection:bg-primary selection:text-white border-input flex h-9 w-full min-w-0 rounded-md border-2 bg-transparent px-2 py-1 text-white shadow-xs transition-[color,box-shadow] outline-none file:border-2 file:rounded-md file:bg-gray-200 file:text-sm file:px-1 file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
				"focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
				"aria-invalid:ring-destructive/20 aria-invalid:border-destructive",
				className,
			)}
			{...props}
		/>
	);
}

export { Input };
