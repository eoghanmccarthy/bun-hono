import type { FC } from 'hono/jsx'
import {Post} from "./types";

import { Hono } from 'hono'
import { jsxRenderer } from 'hono/jsx-renderer'
import { logger } from 'hono/logger'

import posts from './posts'
import profile from './profile'
import dashboard from './dashboard'

import Layout from './layout'

import { clientApi } from "./api.config";

const app = new Hono()

const Home: FC<{ posts: Post[] }> = (props) => {
    return (
        <>
            <h1>Hello World!</h1>
            <ul>
                {props.posts.map((post) => {
                    return <li key={post.id}>{post.title}</li>
                })}
            </ul>
        </>
    )
}

app.use('*', logger())

app.get(
    '/*',
    jsxRenderer(({ children }) => {
        return (
            <Layout>
                {children}
            </Layout>
        )
    })
)

app.get('/', async (c) => {
    const data = await clientApi(`posts`);
    const posts = data?.posts || [];
    return c.render(<Home posts={posts} />)
})

app.route('/posts', posts)
app.route('/profile', profile)
app.route('/dashboard', dashboard)


export default app
