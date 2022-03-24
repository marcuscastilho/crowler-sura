const { Model } = require("sequelize");

const {
  AverbationsOptions,
  AverbationsSchema,
} = require("../schemas/mysqldb/Averbations");

class Averbations extends Model {
  static init(sequelize) {
    super.init(AverbationsSchema, { sequelize, ...AverbationsOptions });
  }

  static associate(models) {
    this.belongsTo(models.Smartboxes, {
      foreignKey: "smartbox_id",
    });
  }
}

module.exports = { Averbations };
