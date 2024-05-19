import { PagamentoRepository } from '../../../adapters/postgres/pagamento/PagamentoRepository';
import { Status } from '../../../domain/models/Pagamento';
import axios from 'axios'
const baseUrlPedido = process.env.URL_PEDIDOS

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
    try {
      await axios.patch(`${baseUrlPedido}/${pedido?.id_pedido}`, {
        status: status
      })
    } catch (error) {
      console.error("erro ao atualizar status do pedido", error)
    }  
    return await PagamentoRepository.atualizarStatus(id, status) 
  }
}
