import { v4 as uuidv4 } from 'uuid';

export default class Pagamento {
  id: string;
  id_pedido: string;
  cpf_cliente: string;
  descricao_pedido: string;
  valor: number;
  status_pagamento: string

  constructor(
    id_pedido: string,
    cpf_cliente: string,
    status_pagamento: string,
    descricao_pedido: string,
    valor: number,
  ) {
    this.id = uuidv4();
    this.id_pedido = id_pedido;
    this.cpf_cliente = cpf_cliente;
    this.status_pagamento = status_pagamento;
    this.descricao_pedido = descricao_pedido;
    this.valor = valor;
  }
}
