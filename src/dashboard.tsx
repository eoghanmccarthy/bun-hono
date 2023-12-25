import type { FC } from 'hono/jsx'

import { Hono } from 'hono'
import { html } from 'hono/html'
import { basicAuth } from 'hono/basic-auth'

import { clientApi } from "./api.config";

const app = new Hono()

const Dashboard: FC = (props) => {
    return (
        <>
            {html`
                <script>
                    document.addEventListener('DOMContentLoaded', function() {
                        const form = document.getElementById('postForm');
                        form.addEventListener('submit', function(event) {
                            event.preventDefault();
                            const formData = new FormData(form);
                            fetch(form.action, { method: 'POST', body: formData }).then((response) => {
                                form.reset();
                            });
                        });
                    });
                </script>
            `}
            <h1>My dashboard!</h1>
            <h3>Add post</h3>
            <form id="postForm" method="POST" action={`${process.env.API_URL}/api/posts`}>
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
