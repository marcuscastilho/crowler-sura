require("dotenv").config();
const { ProcessController } = require("./controllers/ProcessController");
const { sequelizeConnect } = require("./database/mysqldb");

sequelizeConnect();

const process = new ProcessController();
(async () => {
  await process.main();
})();
