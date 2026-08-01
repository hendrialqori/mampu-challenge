import { Post } from "@/interfaces/post"
import { Todo } from "@/interfaces/todo"
import { User, UserDetail, UserWithStats } from "@/interfaces/user"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function buildUser(
  users: User[],
  todos: Todo[],
  posts: Post[]
): Promise<UserWithStats[]> {

  // hitung total post per user
  const postsMap = posts.reduce<Record<number, number>>((acc, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1
    return acc
  }, {})

  // hitung todo stats per user
  const todosMap = todos.reduce<
    Record<number, { total: number; completed: number; uncompleted: number }>
  >((acc, todo) => {
    if (!acc[todo.userId]) {
      acc[todo.userId] = {
        total: 0,
        completed: 0,
        uncompleted: 0,
      }
    }

    acc[todo.userId].total += 1

    if (todo.completed) {
      acc[todo.userId].completed += 1
    } else {
      acc[todo.userId].uncompleted += 1
    }

    return acc
  }, {})

  // merge ke user
  return users.map((user) => {
    const postCount = postsMap[user.id] || 0
    const todoStats = todosMap[user.id] || {
      total: 0,
      completed: 0,
      uncompleted: 0,
    }

    return {
      ...user,
      posts: postCount,
      task: todoStats.total,
      done: todoStats.completed,
      pending: todoStats.uncompleted,
    }
  })
}

export default class Helpers {


  static buildUserDetail(
    user: User,
    todos: Todo[],
    posts: Post[]
  ): UserDetail {

    let completedTodo = 0

    for (const todo of todos) {
      if (todo.completed) completedTodo++
    }

    const totalTodo = todos.length
    const uncompletedTodo = totalTodo - completedTodo
    const totalPost = posts.length

    return {
      ...user,
      totalPost,
      totalTodo,
      completedTodo,
      uncompletedTodo,
      todos,
      posts,
    }
  }
}