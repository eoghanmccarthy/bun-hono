import type { FC } from 'hono/jsx'

import { Hono } from 'hono'

import Layout from './layout'

const app = new Hono()

const Work: FC = (props) => {
    return (
        <Layout>
            <h1>My work!</h1>
        </Layout>
    )
}

app.get('/', (c) => {
    return c.html(<Work />)
})

export default app
