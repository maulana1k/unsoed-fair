// import { SessionProvider } from 'next-auth/react'

import '@/styles/globals.css'
import { Inter } from 'next/font/google'
import { ContextProvider } from '../lib/context'
const inter = Inter({ subsets: ['latin'] })

interface AppProps {
  Component: React.ComponentType<any>
  pageProps: {
    session: any
    [key: string]: any
  }
}
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ContextProvider>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </ContextProvider>
  )
}
