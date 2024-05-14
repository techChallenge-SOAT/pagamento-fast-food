import { PagamentoRepository } from '../../../adapters/postgres/pagamento/PagamentoRepository';
import { Status } from '../../../domain/models/Qrcode';
import axios from 'axios'
const baseUrlPedido = process.env.URL_PEDIDOS

export class AlterarStatusDoPagamentoUseCase {
  static async execute(id_pagamento: string, status: Status) {
    const statusAtual = await PagamentoRepository.obterStatus(id_pagamento);

    if (statusAtual !== Status.Aguardando) {
      throw new Error(
        'Somente status "Aguardando Pagamento" pode ser atualizado para "Pago" ou "cancelado"',
      );
    }

    if (!Object.values(Status).includes(status)) {
      throw new Error('Status inválido');
    }

    const pagamento = await PagamentoRepository.buscarPorId(id_pagamento)
    try{
    await axios.post(`${baseUrlPedido}/webhooks/mercadopago`, {
      id_pedido: pagamento?.id_pedido,
      status: status
    });
  } catch (error) {
    throw Error("erro ao atualizar status de pedido")
  }

    return PagamentoRepository.atualizarStatus(id_pagamento, status);
  }
}
