import { PagamentoRepository } from '../../../adapters/postgres/pagamento/PagamentoRepository';
import { PedidoFastFoodService } from '../../../adapters/services/BuscarPorIdPedido';
import { Status } from '../../../domain/models/Pagamento';

export class AlterarStatusDoPagamentoUseCase {
  static async execute(id: string, status: Status) {
    const pedido = await PagamentoRepository.buscarPorId(id);
    const statusAtual = pedido?.status_pagamento;

    if (statusAtual?.toLowerCase() != Status.Aguardando) {
      throw new Error(
        'Somente status "pendente" pode ser atualizado para "Pago" ou "cancelado"',
      );
    }

    if (!Object.values(Status).includes(status)) {
      throw new Error('Status inválido');
    }

    await PagamentoRepository.atualizarStatus(id, status);

    const detalhePedido = await PedidoFastFoodService.consultarPedido(
      pedido?.id_pedido,
    );
    if (detalhePedido?.data) {
      detalhePedido.data.status = status;
    }
    return detalhePedido?.data;
  }
}
