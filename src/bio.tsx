import type { FC } from 'hono/jsx'

import { Hono } from 'hono'

import Layout from './layout'

const app = new Hono()

const Bio: FC = (props) => {
    return (
        <Layout>
            <h1>My bio!</h1>
        </Layout>
    )
}

app.get('/', (c) => {
    return c.html(<Bio />)
})

export default app
