import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Spin } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'next/router'
import { createStructuredSelector } from 'reselect';
import Head from 'next/head';
import * as AppSelector from 'selectors/app';
import classnames from 'classnames';
import Header from './Header';
import Sidebar from './Sidebar';

const AppLayout = ({ children, loading, header, setting, className, ...others }) => {
  const { title, description, keywords, imageURL, creator, site, appId } = header || {};

  return (
    <Layout
      className={classnames("app-components blog", className)}
      {...others}
    >
      <Head>
        <title>{title || setting.title}</title>
        <meta name="title" content={title || setting.title} />
        <meta name="keywords" content={keywords || setting.keywords} />
        <meta name="description" content={description || description} />
        <meta itemProp="image" content={imageURL || setting.imageURL} />
        <meta itemProp="name" content={site || setting.site} />

        <meta name="twitter:card" content="article" />
        <meta name="twitter:site" content={site || setting.site} />
        <meta name="twitter:title" content={title  || setting.title} />
        <meta name="twitter:keywords" content={keywords || setting.keywords} />
        <meta name="twitter:description" content={description || description} />
        <meta name="twitter:image" content={imageURL || setting.imageURL} />
        {!!creator && <meta name="twitter:creator" content={creator} />}

        <meta property="og:type" content="article"/>
        <meta name="og:site" content={site || setting.site} />
        <meta name="og:title" content={title  || setting.title} />
        <meta name="og:keywords" content={keywords || setting.keywords} />
        <meta name="og:description" content={description || description} />
        <meta name="og:image" content={imageURL || setting.imageURL} />
        {!!appId && <meta property="fb:app_id" content={appId} /> }

        <meta name="robots" content="index,follow,all" />
        <meta httpEquiv="content-language" content="vi" />
        <link rel='stylesheet' id='lavander-style-css'  href='/public/css/template.css' type='text/css' media='all' />
      </Head>
      <Spin spinning={loading}>
        <Header />
        <div className="mainwrap blog home sidebar default">
          <div className="main clearfix">
            <div className="content blog">
              {children}
            </div>
            <Sidebar />
          </div>
        </div>
      </Spin>
    </Layout>
  );
}

AppLayout.propTypes = {
  loading: PropTypes.bool,
  header: PropTypes.object,
  className: PropTypes.string,
  setting: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

const mapStateToProps = createStructuredSelector({
  loading: AppSelector.getRouting(),
  setting: AppSelector.getConfig('setting')
});

export default connect(mapStateToProps)(withRouter(AppLayout));
