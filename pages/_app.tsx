import { AppProps } from 'next/app';
import '@/styles/globals.css';
import {montserrat} from '../styles/fonts'
import Navbar from '@/components/Navbar';
 
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${montserrat.variable} font-sans`}>
      <Navbar username="Mehrdad" />
      <Component {...pageProps} />
    </main>
  )
}
