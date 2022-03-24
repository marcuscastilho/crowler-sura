const { BatchController } = require("../models/mysqldb/BatchController");
const { Averbations } = require("../models/mysqldb/Averbations");
const { InsuranceCompany } = require("../models/mysqldb/InsuranceCompany");
const { Smartboxes } = require("../models/mysqldb/Smartboxes");
const { webcrawler } = require("../utils/webcrawler");
const { data_montage } = require("../utils/data_montage");

class ProcessController {
  constructor() {}
  
  async main() {
    const { batch } = await BatchController.findOne();
    const averbations = await Averbations.findAll({
      include: [
        {
          model: Smartboxes,
          include: [
            {
              model: InsuranceCompany,
              where: {
                active_send: true,
              },
            },
          ],
        },
      ],
      where: {
        send_insurance_system: false,
        is_pending: false,
        insurance_system: 'sura'
      },
      limit: 5
    });

    for(const averbation of averbations){
      const worked_data = data_montage(averbation)
    }
  }
}

module.exports = { ProcessController };
