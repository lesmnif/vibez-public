import Document, { Html, Head, Main, NextScript } from "next/document"

export default function Documento() {
  return (
    <Html>
      <Head>
        <link rel="manifest" href="/manifest.webmanifest.json"></link>
        <link rel="vibez-logo" href="/IconoManifest.png"></link>
        <link rel="vibez-logo-screen" href="/icono_negro_svg.svg"></link>
        <link name="theme-color" content="#151515"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
