const { BatchController } = require("../models/mysqldb/BatchController");
const { Averbations } = require("../models/mysqldb/Averbations");
const { InsuranceCompany } = require("../models/mysqldb/InsuranceCompany");
const { Smartboxes } = require("../models/mysqldb/Smartboxes");
const { webcrawler } = require("../utils/webcrawler");
const { data_montage } = require("../utils/data_montage");
const { Op } = require("sequelize");

class ProcessController {
  constructor() {}

  async main() {
    try {
      const { batch } = await BatchController.findOne();
      const averbations = await Averbations.findAll({
        include: [
          {
            model: Smartboxes,
            where: {
              sura_pass: {
                [Op.not]: null,
              },
            },
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
          insurance_system: "sura",
        },
        limit: batch
      });

      for (const averbation of averbations) {
        try {
          const worked_data = data_montage(averbation);
          await webcrawler(worked_data);

          await Averbations.update(
            {
              send_insurance_system: 1,
              code_insurance_system: "200",
              log_insurance_system: "Enviado com sucesso",
            },
            {
              where: {
                id: averbation.id,
              },
            }
          );
        } catch (err) {
          console.log(err)
          await Averbations.update(
            {
              send_insurance_system: 1,
              code_insurance_system: "500",
              log_insurance_system: err.message,
            },
            {
              where: {
                id: averbation.id,
              },
            }
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ProcessController };
