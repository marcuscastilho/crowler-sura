const { Model } = require("sequelize");
const {
  SmartboxesOptions,
  SmartboxesSchema,
} = require("../schemas/mysqldb/Smartboxes");

class Smartboxes extends Model {
  static init(sequelize) {
    super.init(SmartboxesSchema, { sequelize, ...SmartboxesOptions });
  }

  static associate(models) {
    this.hasMany(models.Averbations, {
      foreignKey: "smartbox_id",
    });
    this.belongsTo(models.InsuranceCompany, {
      foreignKey: "insurance_company_id",
    });
  }
}

module.exports = { Smartboxes };
