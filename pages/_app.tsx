import { AppProps } from "next/app";
import React,{FC} from "react";
import Head from 'next/head'
import { RecoilRoot,RecoilEnv } from "recoil"
import { Analytics } from '@vercel/analytics/react';;
import RootLayout from "@/components/layout";
import '@/styles/reset.css'
import '@/styles/common.css'
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false
const MyApp:FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <React.Suspense fallback={<div>Loading...</div>}>
      <Head>
        <title>포트폴리오</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <RootLayout>
        <Component {...pageProps} />
        <Analytics />
      </RootLayout>
      </React.Suspense>
    </RecoilRoot>
  )
}

export default MyApp;
