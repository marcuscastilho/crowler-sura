const { Model } = require("sequelize");
const {
  SmartboxPoliciesSchema,
  SmartboxPoliciesOptions,
} = require("../schemas/mysqldb/SmartboxPolicies");

class SmartboxPolicies extends Model {
  static init(sequelize) {
    super.init(SmartboxPoliciesSchema, {
      sequelize,
      ...SmartboxPoliciesOptions,
    });
  }

  static associate(models) {
    this.belongsTo(models.Smartboxes, {
      foreignKey: "smartbox_id",
    });
    this.hasMany(models.AverbationStamp, {
      foreignKey: "smartbox_policy_id",
    });

    this.belongsToMany(models.Averbations, {
      through: models.AverbationStamp,
      foreignKey: "smartbox_policy_id",
    });
  }
}

module.exports = { SmartboxPolicies };
