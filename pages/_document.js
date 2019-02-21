import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class AppDocument extends Document {
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx);
  }

  render() {
    return (
      <html>
        <Head>
          <script src="https://cdn.ckeditor.com/4.10.0/full/ckeditor.js"></script>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.2/antd.min.css" />
          <link rel='stylesheet' id='ot-google-fonts-css'  href='//fonts.googleapis.com/css?family=Lora:regular,italic,700%7CKarla:regular,italic,700%7COswald:regular,500,700' type='text/css' media='all' />
          <link rel='stylesheet' id='sb_instagram_icons-css'  href='https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css?ver=4.6.3' type='text/css' media='all' />
        </Head>
        <body className="blog">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}

export default AppDocument;
