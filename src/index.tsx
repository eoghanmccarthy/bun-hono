import type { FC } from 'hono/jsx'

import { Hono } from 'hono'

import bio from './bio'
import work from './work'
import profile from './profile'

import Layout from './layout'

const app = new Hono()

const Home: FC = (props) => {
    return (
        <Layout>
            <h1>Hello World!</h1>
        </Layout>
    )
}

app.get('/', (c) => {
    return c.html(<Home />)
})

app.route('/bio', bio)
app.route('/work', work)
app.route('/profile', profile)


export default app
