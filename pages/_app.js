import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { initStore } from 'reducers/store';
import axios from 'axios';
import {
  onRouterRequest,
  onRouterSuccess,
  onConfigRequest,
} from 'actions/app';
import { onRefreshRequest } from 'actions/login';
import 'assets/scss/application.scss';

axios.defaults.baseURL = `${process.env.API_URL || ''}/api/v1.0.0`;

class Page extends App {
  constructor(props) {
    super(props);
    props.store.dispatch(onRefreshRequest());
    Router.events.on('routeChangeStart', (url) => props.store.dispatch(onRouterRequest(url)));
    Router.events.on('routeChangeComplete', (url) => props.store.dispatch(onRouterSuccess(url)));
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      await new Promise((resolve) => ctx.store.dispatch(onConfigRequest(() => resolve(true))));
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidMount() {
    this.props.store.dispatch(onConfigRequest());
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore)(Page);
