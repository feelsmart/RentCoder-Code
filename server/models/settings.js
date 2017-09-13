/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var settings= sequelize.define('settings', {
    SettingsID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Signature: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmailTemplate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    IsActive: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'settings'
  });
  return settings;
};
