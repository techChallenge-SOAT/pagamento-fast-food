import { Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/sequelize';

export class Pagamento extends Model {
  #id!: string;
  #valor!: number;
  #descricao_pedido!: string;
  #status_pagamento!: string;
  #id_pedido!: string;
  #cpf_cliente!: string;
  #created_at!: Date;
  #updated_at!: Date;

  get id(): string {
    return this.#id;
  }
  set id(value: string) {
    this.#id = value;
  }

  get status_pagamento(): string {
    return this.#status_pagamento;
  }
  set status_pagamento(value: string) {
    this.#status_pagamento = value;
  }

  get valor(): number {
    return this.#valor;
  }
  set valor(value: number) {
    this.#valor = value;
  }

  get descricao_pedido(): string {
    return this.#descricao_pedido;
  }
  set descricao_pedido(value: string) {
    this.#descricao_pedido = value;
  }

  get id_pedido(): string {
    return this.#id_pedido;
  }
  set id_pedido(value: string) {
    this.#id_pedido = value;
  }

  get cpf_cliente(): string {
    return this.#cpf_cliente;
  }
  set cpf_cliente(value: string) {
    this.#cpf_cliente = value;
  }

  get created_at(): Date {
    return this.#created_at;
  }
  set created_at(value: Date) {
    this.#created_at = value;
  }
  get updated_at(): Date {
    return this.#updated_at;
  }
  set updated_at(value: Date) {
    this.#updated_at = value;
  }
}

Pagamento.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    descricao_pedido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_pedido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf_cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status_pagamento: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize,
    modelName: 'Pagamento',
    tableName: 'pagamento',
    timestamps: false,
  },
);
