import type { FC } from 'hono/jsx'

import { Hono } from 'hono'

const app = new Hono()

const Post: FC = (props) => {
    const fetchPost = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/posts/${props.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("fetchPost", data);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    }

    fetchPost()

    return (
        <>
            <h1>My post!</h1>
            <p>{props.id}</p>
        </>
    )
}

app.get('/:id', (c) => {
    const { id} = c.req.param()
    return c.render(<Post id={id}/>)
})

export default app
