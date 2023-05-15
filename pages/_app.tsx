import { AppProps } from "next/app";
import React,{FC} from "react";
import Head from 'next/head'
import { RecoilRoot } from "recoil";
import '@/styles/reset.css'
const MyApp:FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RecoilRoot>
      <Head>
        <title>포트폴리오</title>
      </Head>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp;
