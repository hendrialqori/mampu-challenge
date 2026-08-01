"use client"

import type { ColumnDef } from "@tanstack/react-table";
import { UserWithStats } from '@/interfaces/user'
import { ArrowUpDown, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type ColumnDefExt<T> = ColumnDef<T> & { title?: string }

export const columns: ColumnDefExt<UserWithStats>[] = [
	{
		accessorKey: "name",
		title: "Name",
		size: 300,
		header: ({ column }) => {
			return (
				<div
					className="flex items-center gap-2 cursor-pointer select-none"
					onClick={column.getToggleSortingHandler()}
				>
					Name
					<ArrowUpDown className="size-3 opacity-50" />
				</div>
			)
		},
	},
	{
		accessorKey: "email",
		header: "Email",
		title: "Email",
		enableSorting: false,
		size: 300,
	},
	{
		accessorKey: "website",
		header: "Website",
		title: "Website",
		enableSorting: false
	},
	{
		accessorKey: "task",
		header: "Total Task",
		title: "Task"
	},
	{
		accessorKey: "pending",
		title: "Pending",
		header: ({ column }) => {
			return (
				<div
					className="flex items-center gap-2 cursor-pointer select-none"
					onClick={column.getToggleSortingHandler()}
				>
					Pending
					<ArrowUpDown className="size-3 opacity-50" />
				</div>
			)
		},
	},
	{
		accessorKey: "done",
		title: "Done",
		header: ({ column }) => {
			return (
				<div
					className="flex items-center gap-2 cursor-pointer select-none"
					onClick={column.getToggleSortingHandler()}
				>
					Done
					<ArrowUpDown className="size-3 opacity-50" />
				</div>
			)
		},
	},
	{
		accessorKey: "action",
		header: "",
		cell: ({ row }) => {
			const user = row.original
			return (
				<Button
					size="xs"
					variant="outline"
					className="bg-zinc-50"
					nativeButton={false}
					render={<Link href={`/users/${user.id}`} />}
				>
					Detail
					<ArrowUpRight />
				</Button>
			)
		},
		enableHiding: false
	}

]