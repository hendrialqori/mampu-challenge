import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table"

interface DataTableSkeletonProps {
   rows?: number
}

export function DataTableSkeleton({
   rows = 5,
}: DataTableSkeletonProps) {
   return (
      <div className="overflow-hidden rounded-md border">
         <Table>
            <TableHeader>
               <TableRow>
                  <TableHead>
                     <div className="loading h-4 w-32 rounded" />
                  </TableHead>
                  <TableHead>
                     <div className="loading h-4 w-24 rounded" />
                  </TableHead>
                  <TableHead>
                     <div className="loading h-4 w-20 rounded" />
                  </TableHead>
                  <TableHead>
                     <div className="loading h-4 w-20 rounded" />
                  </TableHead>
                  <TableHead>
                     <div className="loading h-4 w-20 rounded" />
                  </TableHead>
                  <TableHead>
                     <div className="loading h-4 w-16 rounded" />
                  </TableHead>
               </TableRow>
            </TableHeader>

            <TableBody>
               {Array.from({ length: rows }).map((_, index) => (
                  <TableRow key={index}>
                     <TableCell>
                        <div className="loading h-4 w-40 rounded" />
                     </TableCell>

                     <TableCell>
                        <div className="loading h-4 w-52 rounded" />
                     </TableCell>

                     <TableCell>
                        <div className="loading h-4 w-12 rounded" />
                     </TableCell>

                     <TableCell>
                        <div className="loading h-4 w-12 rounded" />
                     </TableCell>

                     <TableCell>
                        <div className="loading h-4 w-12 rounded" />
                     </TableCell>

                     <TableCell>
                        <div className="loading h-8 w-20 rounded-md" />
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}