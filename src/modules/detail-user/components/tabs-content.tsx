"use client"

import { PersonalInfo } from "@/modules/detail-user/components/personal-info"
import { Tabs as BaseTabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostList } from "@/modules/detail-user/components/post-list"
import { TodoTable } from "@/modules/detail-user/components/todo-data-table"
import { todoColumn } from "@/modules/detail-user/components/todo-column"
import { User } from "@/interfaces/user"
import { Post } from "@/interfaces/post"
import { Todo } from "@/interfaces/todo"
import { parseAsString, useQueryState } from "nuqs"

type Props = {
   user: User;
   posts: Post[];
   todos: Todo[];
}

const tabValue = {
   personal: 'personal',
   posts: 'posts',
   todos: 'todos'
}


export function Tabs({ user, posts, todos }: Props) {
   const [tab, setTab] = useQueryState('tab', parseAsString.withDefault('personal'))

   return (
      <BaseTabs
         value={tab}
         onValueChange={(value) => setTab(value)}
      >
         <TabsList className='pb-6'>
            <TabsTrigger value={tabValue.personal}>Personal Info</TabsTrigger>
            <TabsTrigger value={tabValue.posts}>Posts</TabsTrigger>
            <TabsTrigger value={tabValue.todos}>Todos</TabsTrigger>
         </TabsList>
         <TabsContent value={tabValue.personal}>
            <PersonalInfo data={user} />
         </TabsContent>
         <TabsContent value={tabValue.posts}>
            <PostList data={posts} />
         </TabsContent>
         <TabsContent value={tabValue.todos}>
            <TodoTable
               columns={todoColumn}
               data={todos} />
         </TabsContent>
      </BaseTabs>
   )
}