export default (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    uid: DataTypes.UUID,
    url: DataTypes.STRING,
    public_id: DataTypes.STRING,
    version: DataTypes.STRING,
    width: DataTypes.DECIMAL,
    height: DataTypes.DECIMAL,
    format: DataTypes.STRING,
    resource_type: DataTypes.STRING,
    bytes:  DataTypes.DECIMAL,
    original_filename: DataTypes.STRING,
    secure_url: DataTypes.STRING,
    eager: DataTypes.JSONB,
    tags: DataTypes.JSONB,
  }, {
    tableName: 'images',
  });

  const permitFields = ['uid', 'url', 'public_id', 'version', 'width', 'height', 'format', 'resource_type', 'bytes', 'original_filename', 'secure_url', 'tags', 'eager'];

  Image.associate = (models) => {
    Image.belongsTo(models.User, { foreignKey: 'uid' });
  };

  Image.createData = (params = {}) => {
    const permitParams = permitFields.reduce((obj, key) => params[key] ? ({ ...obj, [key]: params[key] }) : obj, {});

    if (permitParams.createdAt === 'Invalid date' || !permitParams.createdAt) {
      permitParams.createdAt = new Date();
    }

    return Image.create(permitParams)
      .catch((error) => console.log('Error:', permitParams, error));
  };

  return Image;
};
