const { DataTypes } = require("sequelize");

const BatchControllerSchema = {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  batch: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: 'controlador_sura'
  }
};

const BatchControllerOptions = {
  tableName: "controle_simetrias",
  timestamps: false
};

module.exports = { BatchControllerSchema, BatchControllerOptions };
