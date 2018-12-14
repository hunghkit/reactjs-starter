import Model from '@server/models';
import { handleFailure, handleSuccess } from '@server/helpers/auth';

const cloudinary = require('cloudinary').v2;

export default {
  create(req, res) {
    cloudinary.uploader.upload(req.file.path, {
      tags: 'blog-project',
      folder: process.env.CLOUDINARY_ASSET || 'blog',
      eager: { width: 100, height: 100, crop: 'thumb', gravity: 'face' },
    })
      .then((image) => Model.Image.createData({ ...image, uid: (req.user || {}).uuid }))
      .then((image) => handleSuccess(res, { image }))
      .catch(error => handleFailure(res, error));
  },
};
