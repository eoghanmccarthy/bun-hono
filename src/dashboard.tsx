import type { FC } from 'hono/jsx'

import { Hono } from 'hono'
import { html } from 'hono/html'
import { basicAuth } from 'hono/basic-auth'
import { env } from 'hono/adapter'

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
                            fetch(form.action, {
                                method: 'POST',
                                body: formData,
                                headers: {
                                    'Authorization': 'Bearer ${props.token}'
                                }
                            }).then((response) => {
                                form.reset();
                            });
                        });
                    });
                </script>
            `}
            <h1>My dashboard!</h1>
            <h3>Add post</h3>
            <form action={`${props.apiUrl}/api/posts`} id="postForm" method="POST">
                <input name="title" placeholder="Title" type="text" />
                <input name="content" placeholder="Content" type="text" />
                <button type="submit">Submit</button>
            </form>
        </>
    )
}

app.use(
    '/*',
    basicAuth({
        password: process.env.PASSWORD || '',
        username: 'me',
    })
)

app.get('/', (c) => {
    const { API_URL, BEARER_TOKEN } = env<{ API_URL: string, BEARER_TOKEN: string }>(c)
    return c.render(<Dashboard apiUrl={API_URL} token={BEARER_TOKEN} />)
})

export default app
