import React from 'react';
import Head from 'next/head';

const Header = () => {
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
                <input type="text" value="Search and hit enter..." name="s" id="s" /><i className="fa fa-search search-desktop" aria-hidden="true"></i>
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
                  <a className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home" href="http://lavander.premiumcoding.com/lavander-lite/"><strong>Home</strong></a><br />
                  <a className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" href="#"><strong>Features</strong></a><br />
                  <a className="menu-item menu-item-type-custom menu-item-object-custom" href="http://lavander.premiumcoding.com/lavander-lite/exploring-my-surroundings/">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i>Standard Post</a><br />
                  <a className="menu-item menu-item-type-custom menu-item-object-custom" href="http://lavander.premiumcoding.com/lavander-lite/this-is-a-gallery-post-2/">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i>Gallery Post</a><br />
                  <a className="menu-item menu-item-type-custom menu-item-object-custom" href="http://lavander.premiumcoding.com/lavander-lite/video-post/">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i>Video Post</a><br />
                  <a className="menu-item menu-item-type-taxonomy menu-item-object-category" href="http://lavander.premiumcoding.com/lavander-lite/category/blog/"><strong>Blog</strong></a><br />
                  <a className="menu-item menu-item-type-custom menu-item-object-custom" href="https://app.monstercampaigns.com/c/axajk0auofxbrjoldf9r/"><strong>Download For Free</strong></a><br />
                  <a className="menu-item menu-item-type-taxonomy menu-item-object-category" href="http://lavander.premiumcoding.com/lavander-lite/category/travel/"><strong>Travel</strong></a><br />
                  <a className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children" href="#"><strong>Pages</strong></a><br />
                  <a className="menu-item menu-item-type-post_type menu-item-object-page" href="http://lavander.premiumcoding.com/lavander-lite/sample-page-2-2/">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i>Sample Page Example</a><br />
                  <a className="menu-item menu-item-type-post_type menu-item-object-page" href="http://lavander.premiumcoding.com/lavander-lite/typography/">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i>Typography</a><br />
                  <a className="menu-item menu-item-type-post_type menu-item-object-page" href="http://lavander.premiumcoding.com/lavander-lite/about-us/">&nbsp;&nbsp;&nbsp;&nbsp;<i className="fa fa-circle" aria-hidden="true"></i>About me</a><br />
                  <a className="menu-item menu-item-type-post_type menu-item-object-page" href="http://lavander.premiumcoding.com/lavander-lite/about-us/"><strong>About Me</strong></a><br />
                  <a className="menu-item menu-item-type-custom menu-item-object-custom" href="https://themeforest.net/item/lavander-a-lifestyle-responsive-wordpress-blog-theme/20140677?ref=premiumtemplates"><strong>CHECK OUT PREMIUM VERSION</strong></a><br />
                </div>
              </div>
            </div>
            <div className="logo-inner">
              <div id="logo" className="">
                <a href="http://lavander.premiumcoding.com/lavander-lite/">
                  <img src="http://lavander.premiumcoding.com/lavander-lite/wp-content/uploads/2017/05/lavander-logo@2x.png" data-rjs="3" alt="Lavander Blog theme - Just another WordPress site" width="300" height="150" />
                </a>
              </div>
            </div>
          </div>
          <div className="pagenav">
            <div className="pmc-main-menu">
              <ul id="menu-main-menu-container" className="menu">
                <li id="menu-item-4223-7326" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home"><a href="http://lavander.premiumcoding.com/lavander-lite/">Home</a></li>
                <li id="menu-item-7179-7328" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children has-sub-menu"><a href="#">Features</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
