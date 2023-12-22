import type { FC } from 'hono/jsx'

type ROUTE = {
    path: string,
    title: string,
}

const routes : ROUTE[] = [
    { path: '/', title: 'Home' },
    { path: '/bio', title: 'Bio' },
    { path: '/work', title: 'Work' },
    { path: '/profile', title: 'Profile' }
]

const Layout: FC = (props) => {
    return (
        <html>
        <body>
        <header>
            <nav>
                {routes.map((route) => {
                    return <a href={route.path}>{route.title}</a>
                })}
            </nav>
        </header>
        <main>{props.children}</main>
        </body>
        </html>
    )
}

export default Layout