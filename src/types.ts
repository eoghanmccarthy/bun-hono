export interface Post {
    content: string
    id: number
    title: string
}

export type Param = {
    content: string
    title: string
}

export type Route = {
    path: string,
    title: string,
}
