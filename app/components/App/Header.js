import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from 'next/link';
import Head from 'next/head';
import { createStructuredSelector } from 'reselect';
import * as AppSelector from 'selectors/app';

class Header extends Component {
  get socials() {
    return ({
      facebookURL: {
        title: 'Facebook',
        icon: 'facebook',
      },
      twitterURL: {
        icon: 'twitter',
        title: 'Twitter',
      },
      linkedInURL: {
        icon: 'linkedin',
        title: 'Linkedin',
      },
    })
  }

  render() {
    const { setting = {} } = this.props;
    const menus = Object.values(this.props.menus);

    return (
      <header
        className="header-app-components"
      >
        <Head>
          <title>{setting.title || ''}</title>
          <meta name="robots" content="index,follow,all" />
          <meta name="title" content={setting.title || ''} />
          <meta httpEquiv="content-language" content="vi" />
          <meta name="keywords" content={setting.keywords || ''} />
          <meta name="description" content={setting.description || ''} />
          <link rel='stylesheet' id='lavander-style-css'  href='/public/css/template.css' type='text/css' media='all' />
        </Head>
        <div className="top-wrapper">
          <div className="top-wrapper-content">
            <div className="top-left">
              <div className="widget socials">
                <div className="widgett">
                  <div className="social_icons">
                    {['facebookURL', 'twitterURL', 'linkedInURL'].filter((item) => setting[item]).map((item) => <a key={item} target="_blank" rel="noopener noreferrer" href={setting[item]} title={(this.socials[item] || {}).title || ''}><i className={`fa fa-${(this.socials[item] || {}).icon || ''}`} aria-hidden="true"></i></a>)}
                  </div>
                </div>
              </div>
            </div>
            <div className="top-right">
              <div className="widget widget_search">
                <form method="get" id="searchform" className="searchform" action="/">
                  <input type="text" placeholder="Search and hit enter..." name="s" id="s" /><i className="fa fa-search search-desktop" aria-hidden="true"></i>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div id="headerwrap">
          <div id="header">
            <div className="header-image">
              <div className="respMenu noscroll">
                <div className="resp_menu_button">
                  <i className="fa fa-list-ul fa-2x" aria-hidden="true"></i>
                </div>
                <div className="menu-main-menu-container">
                  <div className="event-type-selector-dropdown">
                    {menus.map((item, index) => (
                      <Link href={item.url || '/'} key={index}>
                        <a className="menu-item menu-item-type-custom menu-item-object-custom"><strong>{item.title || ''}</strong></a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="logo-inner">
                <div id="logo" className="">
                  <Link href="/">
                    <a>
                      <img src={(this.props.header || {}).imageURL} data-rjs="3" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
            <div className="pagenav">
              <div className="pmc-main-menu">
                <ul id="menu-main-menu-container" className="menu">
                  {menus.map((item, index) => (
                    <li key={index} className="menu-item menu-item-type-custom menu-item-object-custom">
                      <Link href={item.url || '/'} >
                        <a>{item.title || ''}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  menus: PropTypes.object.isRequired,
  header: PropTypes.object.isRequired,
  setting: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  menus: AppSelector.getMenus(),
  header: AppSelector.getConfig('header'),
  setting: AppSelector.getConfig('setting'),
});

export default connect(mapStateToProps)(Header);
