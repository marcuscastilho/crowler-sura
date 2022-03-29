require("dotenv").config();
const { ProcessController } = require("./controllers/ProcessController");
const { sequelizeConnect } = require("./database/mysqldb");
const { webcrawler } = require("./utils/webcrawler");

sequelizeConnect();

const process = new ProcessController();
(async () => {
  await process.main();
  // await webcrawler()
})();
