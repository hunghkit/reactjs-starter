export default (app, server) => {
  server.get('/admin/posts/:slug', (req, res) => {
    const actualPage = '/admin/posts/edit'
    const queryParams = { title: req.params.title }
    app.render(req, res, actualPage, queryParams)
  });
};
