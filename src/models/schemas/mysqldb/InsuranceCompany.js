const { DataTypes } = require("sequelize");

const InsuranceCompanySchema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  susep_cod: {
    type: DataTypes.CHAR,
    field: "susep",
  },
  simetrias_anchor: {
    type: DataTypes.CHAR,
    field: "ambiente_simetria",
  },
  active_send: {
    type: DataTypes.BOOLEAN,
    field: "envio_habilitado",
  },
  is_susep_table: {
    type: DataTypes.BOOLEAN,
    field: "use_susep_table",
  },
  is_insurance_company_table: {
    type: DataTypes.BOOLEAN,
    field: "use_seguradora_table",
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

const InsuranceCompanyOptions = {
  tableName: "seguradoras",
  updatedAt: "updated_at",
  createdAt: "created_at",
};

module.exports = {
  InsuranceCompanySchema,
  InsuranceCompanyOptions,
};
