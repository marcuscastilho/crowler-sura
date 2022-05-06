const { Sequelize } = require("sequelize");
const Chalk = require("../utils/chalk");
const dbConfig = require("../config/database");
const { BatchController } = require("../models/mysqldb/BatchController");
const { Averbations } = require("../models/mysqldb/Averbations");
const { Smartboxes } = require("../models/mysqldb/Smartboxes");
const { InsuranceCompany } = require("../models/mysqldb/InsuranceCompany");
const { AverbationStamp } = require("../models/mysqldb/AverbationStamp");
const { SmartboxPolicies } = require("../models/mysqldb/SmartboxPolicies");

const sequelize = new Sequelize(dbConfig);

BatchController.init(sequelize);
Averbations.init(sequelize);
Smartboxes.init(sequelize);
SmartboxPolicies.init(sequelize);
InsuranceCompany.init(sequelize);
AverbationStamp.init(sequelize);

BatchController.associate(sequelize.models);
Averbations.associate(sequelize.models);
Smartboxes.associate(sequelize.models);
SmartboxPolicies.associate(sequelize.models);
InsuranceCompany.associate(sequelize.models);
AverbationStamp.associate(sequelize.models);

const sequelizeConnect = async () => {
  try {
    await sequelize.authenticate();
    Chalk.info("Mysql", "Connection has been established successfully");
  } catch (error) {
    console.log(error)
    Chalk.error("Mysql", "Unable to connect to the database:", error);
  }
};

module.exports = {
  sequelizeConnect,
};
