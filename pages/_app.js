import React from 'react';
import { Provider } from 'react-redux';
import App, { Container } from 'next/app';
import Router from 'next/router';
import withRedux from 'next-redux-wrapper';
import { initStore } from 'reducers/store';
import {
  onRouterRequest,
  onRouterSuccess,
} from 'actions/app';
import { onRefreshRequest } from 'actions/login';
import 'assets/scss/application.scss';

class Page extends App {
  constructor(props) {
    super(props);
    props.store.dispatch(onRefreshRequest());
    Router.events.on('routeChangeStart', (url) => props.store.dispatch(onRouterRequest(url)));
    Router.events.on('routeChangeComplete', (url) => props.store.dispatch(onRouterSuccess(url)));
  }

  static async getInitialProps({ Component, ctx }) {
    return {
      pageProps: (Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    };
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
