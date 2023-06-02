// import { SessionProvider } from 'next-auth/react'

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  )
}
