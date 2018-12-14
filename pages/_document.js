import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.min.css" />
          <script src="https://cdn.ckeditor.com/4.10.0/full/ckeditor.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default AppDocument;
