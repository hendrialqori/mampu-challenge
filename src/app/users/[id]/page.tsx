import { fetchPostsByUserId, fetchTodosByUserId, fetchUserById } from "@/lib/api"
import { Tabs } from "@/modules/detail-user/components/tabs-content"
import { notFound } from "next/navigation"
import { AvatarHeader } from "@/modules/detail-user/components/avatar-header"

type Props = {
   params: Promise<{ id: string }>
}

export default async function Detail({ params }: Props) {

   const { id } = await params

   const [user, posts, todos] = await Promise.all([
      fetchUserById(Number(id)),
      fetchPostsByUserId(Number(id)),
      fetchTodosByUserId(Number(id))
   ])

   if (!user) return notFound()

   return (
      <main className="mx-auto w-full lg:w-2/3 px-5 space-y-4 p-5">
         <AvatarHeader data={user} />
         <Tabs user={user} posts={posts} todos={todos} />
      </main>
   )
}