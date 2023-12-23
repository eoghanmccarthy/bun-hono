import type { FC } from 'hono/jsx'
import { html } from 'hono/html'

type ROUTE = {
    path: string,
    title: string,
}

const routes : ROUTE[] = [
    { path: '/', title: 'Home' },
    // { path: '/posts', title: 'Posts' },
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
                    return <a href={route.path}>{route.title}</a>
                })}
            </nav>
        </header>
        <main>${props.children}</main>
        </body>
        </html>`
}

export default Layout