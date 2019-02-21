export default (app, server) => {
  server.get('/post/:slug', (req, res) => {
    const actualPage = '/post/detail';
    const queryParams = { slug: req.params.slug };
    app.render(req, res, actualPage, queryParams);
  });

  server.get('/admin/posts/:slug', (req, res) => {
    const actualPage = '/admin/posts/edit';
    const queryParams = { title: req.params.title };
    app.render(req, res, actualPage, queryParams);
  });
};
