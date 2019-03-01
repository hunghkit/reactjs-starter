export default (app, server) => {
  server.get(`/${process.env.POST_SLUG}/:slug`, (req, res) => {
    const actualPage = '/post';
    const queryParams = { slug: req.params.slug };
    app.render(req, res, actualPage, queryParams);
  });

  server.get(`/${process.env.CATEGORY_SLUG}/:slug`, (req, res) => {
    const actualPage = '/category';
    const queryParams = { slug: req.params.slug };
    app.render(req, res, actualPage, queryParams);
  });

  server.get(`/${process.env.AUTHOR_SLUG}/:slug`, (req, res) => {
    const actualPage = '/author';
    const queryParams = { slug: req.params.slug };
    app.render(req, res, actualPage, queryParams);
  });

  server.get(`/admin/${process.env.POST_SLUG}/:slug`, (req, res) => {
    const actualPage = '/admin/posts/edit';
    const queryParams = { title: req.params.title };
    app.render(req, res, actualPage, queryParams);
  });
};
