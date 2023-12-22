import type { FC } from 'hono/jsx'

import { Hono } from 'hono'
import { basicAuth } from 'hono/basic-auth'

import Layout from './layout'

const app = new Hono()

const Profile: FC = (props) => {
    return (
        <Layout>
            <h1>My profile!</h1>
        </Layout>
    )
}

app.use(
    '/*',
    basicAuth({
        username: 'me',
        password: process.env.PASSWORD,
    })
)

app.get('/', (c) => {
    return c.html(<Profile />)
})

export default app
