// eslint-disable-next-line no-undef
module.exports = function (sequelize, DataTypes) {
  const RefreshToken = sequelize.define(
    "refreshToken",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      refreshToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { freezeTableName: true, timestamps: false }
  );

  return RefreshToken;
};
