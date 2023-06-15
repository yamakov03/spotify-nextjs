import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil';
import 'tailwindcss/tailwind.css'
import { Figtree } from 'next/font/google'
import { motion, Variants } from 'framer-motion';
import MainLayout from '@/src/layouts/mainLayout';
const figtree = Figtree({
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const appVariants = {
  initial: {
    opacity: 0,
    x: '5px'
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2
    }
  }
}


function App({
  Component,
  pageProps: { session, ...pageProps },
  router
}) {
  return (

    <SessionProvider session={session}>
      <RecoilRoot>
      
        {router.route.includes('/login') ?
          <main className={figtree.className}>
            <Component {...pageProps} />
          </main>
          :

          <MainLayout>
              <main className={`${figtree.className} flex-grow h-[calc(100vh-5rem)]`}>
                <Component {...pageProps}/>
              </main>
          </MainLayout>

        }
      </RecoilRoot>
    </SessionProvider>


  )
}

export default App;
