require("dotenv").config();
const { ProcessController } = require('./controllers/ProcessController')



const process = new ProcessController();
(async () => {
  await process.main()
})();
