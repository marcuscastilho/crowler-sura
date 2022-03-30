const { DataTypes } = require("sequelize");

const SmartboxesSchema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  cnpj: {
    type: DataTypes.CHAR,
    allowNull: false,
  },
  status: {
    type: DataTypes.CHAR,
  },
  sura_pass: {
    type: DataTypes.STRING,
  },
  smartbox_number: {
    type: DataTypes.CHAR,
    field: "smartbox_numero",
  },
  insurance_company_id: {
    type: DataTypes.BIGINT,
    field: "seguradora_id",
  },
  assure_type: {
    type: DataTypes.ENUM("estipulada", "padrao"),
  },
  assure_responsability: {
    type: DataTypes.ENUM("transportador", "embarcador"),
  },
  is_above_lmg: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "averbacao_acima_lmg",
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

const SmartboxesOptions = {
  tableName: "smartboxes",
  updatedAt: "updated_at",
  createdAt: "created_at",
};

module.exports = { SmartboxesSchema, SmartboxesOptions };
