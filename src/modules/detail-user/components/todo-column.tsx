"use client"

import { Todo } from "@/interfaces/todo"
import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"

type Column<T> = ColumnDef<T>

export const todoColumn: Column<Todo>[] = [
   {
      accessorKey: 'title',
      size: 300,
      header: 'Title',
      enableSorting: false
   },
   {
      accessorKey: 'completed',
      size: 300,
      header: 'Status',
      enableSorting: false,
      cell: (info) => {
         const value = info.getValue() as boolean

         const variant = value ? 'default' : 'warning'
         const label = value ? 'Completed' : 'Pending'

         return <Badge className="rounded-md" variant={variant}>{label}</Badge>
      },
   }
]