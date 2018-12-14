import React, { Component } from 'react';
import { Row, Col, Layout } from 'antd';
import Head from 'next/head';
import App from 'components/App';

class Page extends Component {
  render() {
    return (
      <App>
        <Head>
         <title>Welcome app page</title>
        </Head>
        <Layout.Content>
          <Row>
            <Col span={24}>
              <h1>Welcome to app</h1>
            </Col>
          </Row>
        </Layout.Content>
      </App>
    );
  }
}

export default Page;
