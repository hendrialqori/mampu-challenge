"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Todo } from "@/interfaces/todo";
import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   getFilteredRowModel,
   getPaginationRowModel,
   getSortedRowModel,
   useReactTable
} from "@tanstack/react-table";

interface DataTableProps<Data, Value> {
   columns: ColumnDef<Data, Value>[]
   data: Data[],
}

export const TodoTable = <Data extends Todo, Value>({ columns, data }: DataTableProps<Data, Value>) => {

   // eslint-disable-next-line react-hooks/incompatible-library
   const table = useReactTable({
      columns,
      data,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
   })

   return (
      <>
         <div className="hidden md:block">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                           <TableHead key={header.id}>
                              {header.isPlaceholder ? null : flexRender(
                                 header.column.columnDef.header,
                                 header.getContext()
                              )}
                           </TableHead>
                        ))}
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
         <div className="grid grid-cols-1 sm:grid-cols-2 md:hidden gap-2">
            {table.getRowModel().rows.map(({ original }) => {
               const variant = original.completed ? 'default' : 'warning'
               const label = original.completed ? 'Completed' : 'Pending'
               return (
                  <Card key={original.id}>
                     <CardHeader>
                        <h2 className="text-sm">{original.title}</h2>
                     </CardHeader>
                     <CardContent>
                        <Badge className="rounded-md" variant={variant}>{label}</Badge>
                     </CardContent>
                  </Card>
               )
            })}
         </div>
      </>

   )
}