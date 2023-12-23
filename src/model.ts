const PREFIX = 'v1:post:'

declare global {
    interface Crypto {
        randomUUID(): string
    }
}

export interface Post {
    id: number
    title: string
    content: string
}

export type Param = {
    title: string
    content: string
}

const posts: Post[] = []

const generateID = (key: string) => {
    return `${PREFIX}${key}`
}

export const getPosts = async (): Promise<Post[]> => {
    return posts
    // const list = await KV.list({ prefix: PREFIX })
    // const keys = list.keys
    // const posts: Post[] = []
    //
    // const len = keys.length
    // for (let i = 0; i < len; i++) {
    //     const value = await KV.get(keys[i].name)
    //     if (value) {
    //         const post: Post = JSON.parse(value)
    //         posts.push(post)
    //     }
    // }
    //
    // return posts
}

export const getPost = async (id: string): Promise<Post | undefined> => {
    const value = posts.find(data => data.id === parseInt(id))
    if (!value) return
    return value
    // const value = await KV.get(generateID(id))
    // if (!value) return
    // const post: Post = JSON.parse(value)
    // return post
}

export const createPost = async (param: Param): Promise<Post | undefined> => {
    if (!(param && param.title && param.content)) return
    const id =  posts.length + 1;
    const newPost: Post = { id: id, title: param.title, content: param.content }
    posts.push(newPost)
    return newPost
}