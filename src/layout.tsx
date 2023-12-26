import type { FC } from 'hono/jsx'
import { Route } from "./types";

import { html } from 'hono/html'

const routes : Route[] = [
    { path: '/', title: 'Home' },
    { path: '/profile', title: 'Profile' },
    { path: '/dashboard', title: 'Dashboard' }
]

const Layout: FC = (props) => {
    return html`
        <!DOCTYPE html>
        <html lang="en">
        <body>
        <header>
            <nav>
                ${routes.map((route) => {
                    return <a href={route.path} key={route.path}>{route.title}</a>
                })}
            </nav>
        </header>
        <main>${props.children}</main>
        </body>
        </html>`
}

export default Layout
