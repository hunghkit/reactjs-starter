export default (sequelize, DataTypes) => {
  const ConnectRelation = sequelize.define('ConnectRelation', {
    uuid: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
    },
    targetId: DataTypes.UUID,
    sourceId: DataTypes.UUID
  }, {});

  ConnectRelation.associate = () => {
    // associations can be defined here
  };

  return ConnectRelation;
};
