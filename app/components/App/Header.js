import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Head from 'next/head';
import Link from 'next/link';
import { createStructuredSelector } from 'reselect';
import * as AppSelector from 'selectors/app';

class Header extends Component {
  render() {
    const { menus = [] } = this.props;

    return (
      <header
        className="header-app-components"
      >
        <Head>
          <link rel='stylesheet' id='lavander-style-css'  href='http://lavander.premiumcoding.com/lavander-lite/wp-content/themes/lavander/style.css?ver=4.7.12' type='text/css' media='all' />
        </Head>
        <div className="top-wrapper">
          <div className="top-wrapper-content">
            <div className="top-left">
              <div className="widget socials">
                <div className="widgett">
                  <div className="social_icons">
                    <a target="_blank" href="http://twitter.com/PremiumCoding" title="Twitter"><i className="fa fa-twitter" aria-hidden="true"></i></a>
                    <a target="_blank" href="https://www.facebook.com/PremiumCoding" title="Facebook"><i className="fa fa-facebook" aria-hidden="true"></i></a>
                    <a target="_blank" href="https://dribbble.com/gljivec" title="Dribbble"><i className="fa fa-dribbble" aria-hidden="true"></i></a>
                    <a target="_blank" href="https://www.flickr.com/" title="Flickr"><i className="fa fa-flickr" aria-hidden="true"></i></a>
                    <a target="_blank" href="http://www.pinterest.com/gljivec/" title="Pinterest"><i className="fa fa-pinterest" aria-hidden="true"></i></a>
                  </div>
                </div>
              </div>
            </div>
            <div className="top-right">
              <div className="widget widget_search">
                <form method="get" id="searchform" className="searchform" action="http://lavander.premiumcoding.com/lavander-lite/">
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
                      <img src="http://lavander.premiumcoding.com/lavander-lite/wp-content/uploads/2017/05/lavander-logo@2x.png" data-rjs="3" alt="Lavander Blog theme - Just another WordPress site" width="300" height="150" />
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
  menus: PropTypes.array,
  onLoad: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  menus: AppSelector.getMenus(),
});

export default connect(mapStateToProps)(Header);
