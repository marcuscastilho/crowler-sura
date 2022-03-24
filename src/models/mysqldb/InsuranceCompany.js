const { Model } = require("sequelize");
const {
  InsuranceCompanySchema,
  InsuranceCompanyOptions,
} = require("../schemas/mysqldb/InsuranceCompany");

class InsuranceCompany extends Model {
  static init(sequelize) {
    super.init(InsuranceCompanySchema, {
      sequelize,
      ...InsuranceCompanyOptions,
    });
  }

  static associate(models) {
    this.hasMany(models.Smartboxes, {
      foreignKey: "insurance_company_id",
    });
  }
}

module.exports = {InsuranceCompany};
