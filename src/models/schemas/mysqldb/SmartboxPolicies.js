const { DataTypes } = require("sequelize");

const SmartboxPoliciesSchema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  smartbox_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  branch_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "ramo_id",
  },
  policy_number: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "numero",
  },
  policy_limit_value: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "limite",
  },
  policy_start_term: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "inicio_vigencia",
  },
  policy_end_term: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "fim_vigencia",
  },
  ocd: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ocdi: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  stipulated: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "estipulada",
  },
  replicate_averbation: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: "replicar_averbacao",
  },
  smartbox_shipper_id: {
    type: DataTypes.BIGINT,
    field: "smartbox_embarcador_id",
  },
  created_at: DataTypes.DATE,
  updated_at: DataTypes.DATE,
};

const SmartboxPoliciesOptions = {
  tableName: "smartbox_apolices",
  updatedAt: "updated_at",
  createdAt: "created_at",
};

module.exports = { SmartboxPoliciesSchema, SmartboxPoliciesOptions };
