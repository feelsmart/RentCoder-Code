/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var employer= sequelize.define('employer', {
    EmployerID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Technologies: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Experience: {
      type: DataTypes.STRING,
      allowNull: false
    },
    PhoneNo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    EmployementType: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    tableName: 'employer'
  });
  return employer;
};
