import { handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    handleSuccess(res, {
      payload: {
        menus: [{
          title: 'Home',
          url: '/',
        }, {
          title: 'Features',
          url: '/',
        }],
        sidebars: [{
          title: 'About me',
          html: `
            <div>
              <img src="http://fashy.premiumcoding.com/demo1/wp-content/uploads/2017/05/avatar.jpg" />
              Hello, my name is <b>Lavander.</b> I am a blogger living in New York. This is my blog, where I post my photos and traveling tips.
            </div>
          `
        }]
      }
    });
  }
};
