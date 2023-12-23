import type { FC } from 'hono/jsx'
import { html } from 'hono/html'
import { jsxRenderer } from 'hono/jsx-renderer'
import { logger } from 'hono/logger'

import { Hono } from 'hono'

import api from './api'
import posts from './posts'
import profile from './profile'
import dashboard from './dashboard'

import Layout from './layout'

const app = new Hono()

const Home: FC = (props) => {

    const fetchScript = html`
    const postsList = document.getElementById('posts-list')
    const fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/posts', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },

            })
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            const data = await response.json();
            data.posts.forEach((post) => {
                const li = document.createElement('li')
                li.innerText = post.title
                postsList.appendChild(li)
            })
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        }
    }

    fetchPosts()`

    return (
        <>
            <h1>Hello World!</h1>
            <ul id={"posts-list"} />
            <script>
                {fetchScript}
            </script>
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

app.get('/', (c) => {
    return c.render(<Home />)
})

app.route('/api', api)
app.route('/posts', posts)
app.route('/profile', profile)
app.route('/dashboard', dashboard)


export default app
