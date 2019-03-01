import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

export default {
  index(req, res) {
    const queryWhere = {};
    const { page = 1, limit = 5, size = false, s } = req.query;

    if (s) {
      queryWhere.title = { iLike: '%' + s + '%' };
    }

    Model.Post
      .getAll({ page, limit: size || limit }, queryWhere, {
        include: [{
          as: 'category',
          model: Model.Category,
          attributes: ['title', 'slug'],
        }],
      })
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  show(req, res) {
    Model.Post
      .getBy(req.params.slug, 'slug', {
        include: [{
          as: 'category',
          model: Model.Category,
          attributes: ['title', 'slug'],
        }, {
          as: 'author',
          model: Model.User,
          attributes: ['uuid', 'firstName', 'lastName', 'displayName', 'username'],
        }],
      })
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  category(req, res) {
    Model.Category.findOne({
      where: { slug: req.params.slug },
    })
      .then(async (category) => {
        if (!category) {
          return ({ ...category.toJson(), posts: { rows: [], currentPage: 0, totalPage: 0, count: 0 }});
        }

        const queryWhere = { 'categoryId': category.uuid };
        const { page = 1, limit = 5, size = false, s } = req.query;

        if (s) {
          queryWhere.title = { iLike: '%' + s + '%' };
        }

        const posts = await Model.Post
          .getAll({ page, limit: size || limit }, queryWhere, {
            include: [{
              as: 'category',
              model: Model.Category,
              attributes: ['title', 'slug'],
            }],
          })

        return ({ ...category.toJson(), posts });
      })
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },

  author(req, res) {
    Model.User.findOne({
      where: { username: req.params.slug },
    })
      .then(async (author) => {
        if (!author) {
          return ({ ...author.toJson(), posts: { rows: [], currentPage: 0, totalPage: 0, count: 0 }});
        }

        const queryWhere = { authorId: author.uuid };
        const { page = 1, limit = 5, size = false, s } = req.query;

        if (s) {
          queryWhere.title = { iLike: '%' + s + '%' };
        }

        const posts = await Model.Post
          .getAll({ page, limit: size || limit }, queryWhere, {
            include: [{
              as: 'category',
              model: Model.Category,
              attributes: ['title', 'slug'],
            }],
          })

        return ({ ...author.toJson(), posts });
      })
      .then(payload => handleSuccess(res, { payload }))
      .catch(errors => handleFailure(res, { errors, message: errors.message }));
  },
};
