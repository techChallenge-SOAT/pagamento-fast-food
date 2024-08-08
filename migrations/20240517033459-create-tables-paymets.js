"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("pagamento", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      id_pedido: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      cpf_cliente: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      status_pagamento: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      valor: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      descricao_pedido: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("pagamento");
  },
};
