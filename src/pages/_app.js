// _app.js
import { Afacad } from 'next/font/google';
import 'tailwindcss/tailwind.css';

// If loading a variable font, you don't need to specify the font weight
const afacad = Afacad({ subsets: ['latin'] })

export default function ApplyFont({ Component, pageProps }) {
    return <Component {...pageProps} />
}

export function Layout({ children }) {
    return <main className={afacad.className}>{children}</main>;
}