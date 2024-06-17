// _app.js
import { Afacad } from 'next/font/google';
import 'tailwindcss/tailwind.css';
import Head from 'next/head'; // Head 컴포넌트 임포트

// If loading a variable font, you don't need to specify the font weight
const afacad = Afacad({ subsets: ['latin'] })

export default function ApplyFont({ Component, pageProps }) {
    return (
        <>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                {/* 추가적인 크기의 favicon을 제공하여 다양한 해상도에서 최적의 아이콘을 표시 */}
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export function Layout({ children }) {
    return (
        <>
            <main className={afacad.className}>{children}</main>
        </>
    )
}
