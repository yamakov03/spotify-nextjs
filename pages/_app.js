import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css'
import { Figtree } from 'next/font/google'

const figtree = Figtree({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (

    <SessionProvider session={session}>
      <RecoilRoot>
        <main className={figtree.className}>
          <Component {...pageProps} />
        </main>
      </RecoilRoot>
    </SessionProvider>


  )
}

export default App;
