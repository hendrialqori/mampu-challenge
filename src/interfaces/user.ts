import { Post } from "./post";
import { Todo } from "./todo";

export type Geo = {
    lat: string;
    lng: string;
};

export type Address = {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
};

export type Company = {
    name: string;
    catchPhrase: string;
    bs: string;
};

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
};

export type UserWithStats = User & {
    posts: number;
    task: number;
    pending: number;
    done: number
}

export type UserDetail = User & {
    totalPost: number
    totalTodo: number
    completedTodo: number
    uncompletedTodo: number
    todos: Todo[]
    posts: Post[]
}