const { Model } = require("sequelize");
const { BatchControllerOptions, BatchControllerSchema } = require("../schemas/mysqldb/BatchController");

class BatchController extends Model {
  static init(sequelize) {
    super.init(BatchControllerSchema, { sequelize, ...BatchControllerOptions });
  }

  static associate(models) {}
}

module.exports = { BatchController };
