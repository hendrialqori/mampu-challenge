import { Suspense } from "react"
import { fetchPosts, fetchTodos, fetchUsers } from "@/lib/api"
import { buildUser } from "@/lib/utils"
import { columns } from "@/modules/users/components/column"
import { DataTable } from "@/modules/users/components/data-table"
import { DataTableSkeleton } from "@/modules/users/components/data-table.skeleton"

export default async function Lists() {

  const users = await Promise.all([
    fetchUsers(), fetchTodos(), fetchPosts()
  ])

  const dataTable = await buildUser(...users)

  return (
    <main className="mx-auto w-full lg:w-2/3 px-5 space-y-4 p-5">
      <div>
        <h1 className="text-base md:text-2xl">Users</h1>
        <p className="text-sm md:text-base">Tracking all users activities</p>
      </div>
      <Suspense
        fallback={<DataTableSkeleton />}>
        <DataTable columns={columns} data={dataTable} />
      </Suspense>
    </main>
  )
}