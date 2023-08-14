import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css'
import { Figtree } from 'next/font/google'
import MainLayout from '../layouts/mainLayout';
import { CookiesProvider } from 'react-cookie';

const figtree = Figtree({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  router
}) {
  return (

    <SessionProvider session={session}>
      <CookiesProvider>
        <RecoilRoot>

          {router.route.includes('/login') ?
            <main className={figtree.className}>
              <Component {...pageProps} />
            </main>
            :
            <main className={`${figtree.className}`}>
              <MainLayout>
                <Component {...pageProps} />
              </MainLayout>
            </main>
          }
        </RecoilRoot>
      </CookiesProvider>
    </SessionProvider>


  )
}
