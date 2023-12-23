import type { FC } from 'hono/jsx'

import { Hono } from 'hono'

const app = new Hono()

const Profile: FC = (props) => {
    return (
        <h1>My profile!</h1>
    )
}

app.get('/', (c) => {
    return c.render(<Profile />)
})

export default app
