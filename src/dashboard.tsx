import type { FC } from 'hono/jsx'

import { Hono } from 'hono'
import { html } from 'hono/html'
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
                            
                            const authHeader = 'Basic ' + props.encodedCredentials;

                            fetch(form.action, {
                                method: 'POST',
                                body: formData,
                                headers: {
                                    'Authorization': authHeader
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

app.get('/', (c) => {
    const { API_URL, PASSWORD } = env<{ API_URL: string, PASSWORD: string }>(c)
    const credentials = 'me' + ':' + PASSWORD;
    const encodedCredentials = btoa(credentials);
    return c.render(<Dashboard apiUrl={API_URL} credentials={encodedCredentials} />)
})

export default app
