const Chalk = require("../utils/chalk");
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
      Chalk.info("ProcessController", "Buscando as averbações.");
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
          insurance_system: "sura",
        },
        limit: batch,
      });

      for (const averbation of averbations) {
        try {
          Chalk.info("ProcessController", "Fazendo Scraping.");
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
          Chalk.success("ProcessController", "Enviado para Sura");
        } catch (err) {
          await Averbations.update(
            {
              send_insurance_system: 1,
              code_insurance_system: "func",
              log_insurance_system: `func- ${err.message}`,
            },
            {
              where: {
                id: averbation.id,
              },
            }
          );
        }
      }
      Chalk.success("ProcessController", "Finalizado");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = { ProcessController };
