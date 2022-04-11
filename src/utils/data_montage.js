const { decrypt } = require("../utils/crypto_key");

module.exports = {
  data_montage: (data) => {
    try {
      return {
        cnpj: String(data.Smartbox.cnpj).replace(/[^a-zA-Z0-9]/g, ""),
        password: decrypt(data.Smartbox.sura_pass),
        document_number: data.document_number,
        document_type: data.document_type,
        boarding_date: data.boarding_date || data.averbation_date,
        origin_uf: data.initial_uf,
        destination_uf: data.final_uf,
        is_urban: data.perimeter == "urbano" ? true : false,
        charge_value: data.charge_value,
      };
    } catch (err) {
      throw new Error("Não foi possível montar os dados para envio");
    }
  },
};
