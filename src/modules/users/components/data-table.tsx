"use client"

import {
	useReactTable,
	ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getSortedRowModel,
	getPaginationRowModel,
} from "@tanstack/react-table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table"
import { type UserWithStats } from "@/interfaces/user"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { useQueryStringTable } from "@/modules/users/hooks/use-qs-table"

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

// avoid re-render
const sortableColumns = ["name", "done", "pending"]

export function DataTable<TData extends UserWithStats, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const {
		pagination, globalFilter, sorting,
		setPagination, setGlobalFilter, setSorting
	} = useQueryStringTable()

	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		state: {
			pagination,
			globalFilter,
			sorting
		},
		onPaginationChange: setPagination,
		onGlobalFilterChange: setGlobalFilter,
		onSortingChange: setSorting,
	})

	return (
		<>
			<div className="flex items-center justify-between py-4 gap-2">
				<Input
					placeholder="Search name or email ..."
					value={(table.getState().globalFilter as string) ?? ""}
					onChange={(e) => table.setGlobalFilter(e.target.value)}
					className="max-w-sm"
					aria-label="search"
					type="search"
				/>
				<DropdownMenu>
					<DropdownMenuTrigger
						render={<Button variant="outline" />}>
						Column visible
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => (
								<DropdownMenuCheckboxItem
									key={column.id}
									className="capitalize"
									checked={column.getIsVisible()}
									onCheckedChange={(value) => column.toggleVisibility(!!value)}
								>
									{(column.columnDef as unknown as Record<string, never>).title}
								</DropdownMenuCheckboxItem>
							))}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{/* desktop */}
			<div className="hidden md:block overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									const isSortable = sortableColumns.includes(header.column.id)
									return (
										<TableHead
											key={header.id}
											className={isSortable ? "cursor-pointer select-none" : ""}
											style={{ width: `${header.getSize()}px` }}
										>
											{header.isPlaceholder ? null : flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell colSpan={columns.length} className="h-24 text-center">
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			{/* mpbile */}
			<div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-2">
				{table.getRowModel().rows.map(({ original }) => (
					<Card key={original.id}>
						<CardHeader>
							<h2 className="text-sm">{original.name}</h2>
							<p className="text-xs text-muted-foreground">{original.email} | {original.website}</p>
						</CardHeader>
						<CardContent>
							<FieldSet>
								<FieldGroup>
									<div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pb-3">
										<Field>
											<FieldLabel>
												Total task
											</FieldLabel>
											<FieldDescription>
												{original.task}
											</FieldDescription>
										</Field>
										<Field>
											<FieldLabel>
												Pending
											</FieldLabel>
											<FieldDescription>
												{original.pending}
											</FieldDescription>
										</Field>
										<Field>
											<FieldLabel>
												Completed
											</FieldLabel>
											<FieldDescription>
												{original.done}
											</FieldDescription>
										</Field>
									</div>
								</FieldGroup>
							</FieldSet>
							<CardFooter>
								<Button
									size="xs"
									variant="outline"
									className="bg-zinc-50 w-full"
									nativeButton={false}
									render={<Link href={`/${original.id}`} />}
								>
									Detail
									<ArrowUpRight />
								</Button>
							</CardFooter>
						</CardContent>
					</Card>
				))}

			</div>
			<div className="flex flex-col-reverse md:flex-row items-center justify-between py-4 gap-2">
				<div className="text-xs md:text-sm text-muted-foreground">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</div>
				<div className="flex items-center gap-2">
					<select
						value={table.getState().pagination.pageSize}
						onChange={({ target }) => {
							table.setPageSize(Number(target.value))
						}}
						className="border rounded px-2 py-1 text-xs md:text-sm"
						data-testid="select-rows"
					>
						{[5, 10, 20].map((size) => (
							<option key={size} value={size}>Show {size}</option>
						))}
					</select>
					<Button
						variant="outline"
						size="sm"
						className="text-xs md:text-sm"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
						data-testid="previous"
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="text-xs md:text-sm"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
						data-testid="next"
					>
						Next
					</Button>
				</div>
			</div>
		</>
	)
}