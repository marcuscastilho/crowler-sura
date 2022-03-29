const { DataTypes } = require("sequelize");

const AverbationsSchema = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  averbation_number: {
    type: DataTypes.CHAR,
    allowNull: false,
    field: "numero_averbacao",
  },
  document_key: {
    type: DataTypes.CHAR,
    field: "chave",
  },
  serie: {
    type: DataTypes.INTEGER,
  },
  document_type: {
    type: DataTypes.CHAR,
    field: "tipo_documento",
  },
  issuer: {
    type: DataTypes.CHAR,
    field: "emitente",
  },
  responsible_insurance: {
    type: DataTypes.CHAR,
    field: "responsavel_seguro",
  },
  branch_code: {
    type: DataTypes.INTEGER,
    field: "ramo",
  },
  perimeter: {
    type: DataTypes.CHAR,
    field: "perimetro",
  },
  policy_limit_value: {
    type: DataTypes.DOUBLE,
    field: "valor_limite_apolice",
  },
  container_limit_value: {
    type: DataTypes.DOUBLE,
    field: "valor_limite_container",
  },
  policy_end_term: {
    type: DataTypes.DATE,
    field: "data_vigencia_apolice",
  },
  averbation_date: {
    type: DataTypes.DATE,
    field: "data_averbacao",
  },
  file_id: {
    type: DataTypes.CHAR,
  },
  canceled_file_id: {
    type: DataTypes.CHAR,
  },
  event_code: {
    type: DataTypes.INTEGER,
    field: "codigo_evento",
  },
  is_pending: {
    type: DataTypes.TINYINT,
    field: "pendente",
  },
  smartbox_number: {
    type: DataTypes.CHAR,
    field: "smartbox_numero",
  },
  transport_type: {
    type: DataTypes.CHAR,
    allowNull: true,
    field: "tipo_transporte",
  },
  initial_uf: {
    type: DataTypes.CHAR,
    field: "uf_origem",
  },
  final_uf: {
    type: DataTypes.CHAR,
    field: "uf_destino",
  },
  freigth_value: {
    type: DataTypes.DOUBLE,
    field: "valor_frete",
  },
  boarding_date: {
    type: DataTypes.DATE,
    field: "data_embarque",
  },
  emission_date: {
    type: DataTypes.DATE,
    field: "data_emissao",
  },
  cancellation_date: {
    type: DataTypes.DATE,
    field: "data_cancelamento",
  },
  document_number: {
    type: DataTypes.INTEGER,
    field: "numero_documento",
  },
  charge_value: {
    type: DataTypes.DOUBLE,
    field: "valor_mercadoria",
  },
  initial_city: {
    type: DataTypes.CHAR,
    field: "cidade_origem",
  },
  final_city: {
    type: DataTypes.CHAR,
    field: "cidade_destino",
  },
  ddr_cnpj: {
    type: DataTypes.CHAR,
  },
  initial_postal_code: {
    type: DataTypes.CHAR,
    field: "cep_origem",
  },
  final_postal_code: {
    type: DataTypes.CHAR,
    field: "cep_destino",
  },
  sender: {
    type: DataTypes.CHAR,
    field: "remetente",
  },
  container_value: {
    type: DataTypes.DOUBLE,
    field: "valor_container",
  },
  simetrias_anchor: {
    type: DataTypes.CHAR,
    field: "url_simetrias",
  },
  observation: {
    type: DataTypes.CHAR,
    field: "observacoes",
  },
  initial_ibge: {
    type: DataTypes.CHAR,
    field: "ibge_origem",
  },
  final_ibge: {
    type: DataTypes.CHAR,
    field: "ibge_destino",
  },
  insurance_system: {
    type: DataTypes.CHAR,
    field: "sistema_assegurador",
  },
  send_insurance_system: {
    type: DataTypes.BOOLEAN,
    field: "enviado_simetrias",
  },
  code_insurance_system: {
    type: DataTypes.STRING,
    field: "log_codigo_simetrias",
  },
  log_insurance_system: {
    type: DataTypes.STRING,
    field: "log_descricao_simetrias",
  },
  smartbox_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  document_model: {
    type: DataTypes.INTEGER,
    field: "modelo_documento",
  },
  stipulation: {
    type: DataTypes.BOOLEAN,
    field: "estipulacao",
  },
  communication_type: {
    type: DataTypes.CHAR,
    field: "tipo_comunicacao",
    defaultValue: "api",
  },
  service_type: {
    type: DataTypes.CHAR,
    field: "tipo_servico",
  },
  cte_type: {
    type: DataTypes.INTEGER,
    field: "tipo_cte",
  },
  is_multimodal: {
    type: DataTypes.BOOLEAN,
    field: "multimodal",
    defaultValue: false,
  },
};

const AverbationsOptions = {
  tableName: "averbacoes",
  timestamps: false,
};

module.exports = { AverbationsSchema, AverbationsOptions };
