const { Model } = require("sequelize");

const {
  AverbationStampSchema,
  AverbationStampOptions,
} = require("../schemas/mysqldb/AverbationStamp");

class AverbationStamp extends Model {
  static init(sequelize) {
    super.init(AverbationStampSchema, { sequelize, ...AverbationStampOptions });
  }

  static associate(models) {
    this.belongsTo(models.Averbations, {
      foreignKey: "averbation_id",
    });
    this.belongsTo(models.SmartboxPolicies, {
      foreignKey: "smartbox_policy_id",
    });
  }
}

module.exports = { AverbationStamp };
