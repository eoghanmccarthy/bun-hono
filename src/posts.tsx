import type { FC } from 'hono/jsx'

import { Hono } from 'hono'

import { clientApi } from "./api.config";

const app = new Hono()

export interface Post {
    id: number
    title: string
    content: string
}

const Post: FC<{ post: Post }> = (props) => {
    return (
        <>
            <h1>My post!</h1>
            <p>{props.post.content}</p>
        </>
    )
}

app.get('/:id', async (c) => {
    const { id} = c.req.param()
    const data = await clientApi(`posts/${id}`);
    const post = data?.post || {};
    return c.render(<Post post={post}/>)
})

export default app
