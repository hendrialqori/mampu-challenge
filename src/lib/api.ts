import { Post } from "@/interfaces/post";
import { Todo } from "@/interfaces/todo";
import { User } from "@/interfaces/user";
import { API } from "./constant";

export async function fetchUsers(): Promise<User[]> {
    const req = await fetch(`${API}/users`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })
    const res = await req.json()

    if (!req.ok) throw "Error occured while fetch user!"

    return res
}

export async function fetchTodos(): Promise<Todo[]> {
    const req = await fetch(`${API}/todos`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })
    const res = await req.json()

    if (!req.ok) throw "Error occured while fetch todos!"

    return res
}

export async function fetchPosts(): Promise<Post[]> {
    const req = await fetch(`${API}/posts`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })
    const res = await req.json()

    if (!req.ok) throw "Error occured while fetch posts!"
    return res
}


export async function fetchUserById(id: number): Promise<User> {
    if (/[a-zA-Z]/.test(String(id))) {
        throw new Error("400 [Bad Request] | Id must be number, not character")
    }

    const req = await fetch(`${API}/users/${id}`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })

    if (!req.ok) {
        // handle 404
        if (req.status === 404) throw new Error("404 [Not Found] | Data not found")
        else throw new Error(`500 | Error occured while fething detail user with id ${id}`)
    }

    return req.json()
}

export async function fetchTodosByUserId(id: number): Promise<Todo[]> {
    const req = await fetch(`${API}/todos?userId=${id}`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })

    if (!req.ok) throw new Error("Error occured while fetch todos!")

    return req.json()
}

export async function fetchPostsByUserId(id: number): Promise<Post[]> {
    const req = await fetch(`${API}/posts?userId=${id}`, {
        cache: "force-cache",
        next: { revalidate: 60 }
    })

    if (!req.ok) throw new Error("Error occured while fetch posts!")

    return req.json()
}