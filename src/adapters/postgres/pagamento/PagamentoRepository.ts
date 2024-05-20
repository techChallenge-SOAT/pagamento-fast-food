import Pagamento from '../../../application/valueObjects/Pagamento';
import { Pagamento as PagamentoModel } from '../models/PagamentosModel';

export class PagamentoRepository {

  static async criarQrCodePagamento(pagamento: Pagamento) {
    return await PagamentoModel.create({
      id: pagamento.id,
      cpf_cliente: pagamento.cpf_cliente,
      descricao_pedido: pagamento.descricao_pedido,
      valor: pagamento.valor,
      status_pagamento: pagamento.status_pagamento,
      id_pedido: pagamento.id_pedido,
    });
  }

  static async buscarPorId(id: string) {
    return PagamentoModel.findByPk(id);
  }

  static async atualizarStatus(id: string, status_pagamento: string) {
    return PagamentoModel.update({ status_pagamento: status_pagamento, updated_at: new Date() }, { where: { id: id } })
  }

  static async obterStatus(id: string): Promise<string | null | undefined> {
    try {
      const pagamento = await PagamentoModel.findByPk(id);
      return pagamento?.status_pagamento;
    } catch (error) {
      throw new Error(`Erro ao buscar status do pagamento`);
    }
  }
}
