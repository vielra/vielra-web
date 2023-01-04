/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/google-font-display */
import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  render() {
    return (
      <Html lang="en">
        <Head>
          <base href={process.env.PUBLIC_URL} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Jost:400,500,600,700,800,900" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
