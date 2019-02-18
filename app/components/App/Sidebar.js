import React from 'react';
import Widget from 'components/Common/Widget';

export const Header = () => {
  return (
    <div
      className="sidebar-app-components sidebar"
    >
      <Widget
        title="About me2"
        className="widget_text"
      >
        <img src="http://fashy.premiumcoding.com/demo1/wp-content/uploads/2017/05/avatar.jpg" />
        Hello, my name is <b>Lavander.</b> I am a blogger living in New York. This is my blog, where I post my photos and traveling tips.
      </Widget>
    </div>
  );
}

export default Header;
