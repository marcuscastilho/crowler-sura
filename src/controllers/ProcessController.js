const moment = require("moment-timezone");
moment.tz.setDefault(process.env.TIME_ZONE);
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
      const month = moment().format('MM');
      const year = moment().format("YYYY") 
      const date =  moment(`${year}-${month}-01`).format("YYYY-MM-DD")

      const averbations = await Averbations.findAll({
        include: [
          {
            model: Smartboxes,
            include: [
              {
                model: InsuranceCompany,
              },
            ],
          },
        ],
        where: {
          send_insurance_system: false,
          is_pending: false,
          insurance_system: "sura",
          averbation_date: {
            [Op.gte]: date,
          },
          "$Smartbox.sura_pass$": {
            [Op.not]: null,
          },
          "$Smartbox->InsuranceCompany.envio_habilitado$": true,
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
              send_insurance_system_date: moment().format("YYYY-MM-DD HH:mm:ss")
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
              log_insurance_system: err.message,
              send_insurance_system_date: moment().format("YYYY-MM-DD HH:mm:ss")
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
