const { DataTypes } = require("sequelize");

const AverbationStampSchema = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  averbation_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "averbacao_id",
  },
  smartbox_policy_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "smartbox_apolices_id",
  },
  branch: {
    type: DataTypes.INTEGER,
    field: "ramo",
  },
  stamped_value: {
    type: DataTypes.DOUBLE,
    field: "valor_chancelado",
  },
  process_view: {
    type: DataTypes.ENUM("transportador", "embarcador"),
    field: "visao_processo",
  },
};

const AverbationStampOptions = {
  timestamps: false,
  tableName: "averbacoes_chancelas",
};

module.exports = { AverbationStampSchema, AverbationStampOptions };
