import type { FC } from 'hono/jsx'

import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

const app = new Hono()

const Dashboard: FC = (props) => {
    return (
        <>
            <h1>My dashboard!</h1>
            <h3>Add post</h3>
            <form method="POST" action="http://localhost:3000/api/posts">
                <input type="text" name="title" placeholder="Title" />
                <input type="text" name="content" placeholder="Content" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

app.use(
    '/*',
    basicAuth({
        username: 'me',
        password: process.env.PASSWORD || '',
    })
)

app.get('/', (c) => {
    return c.render(<Dashboard />)
})

export default app
