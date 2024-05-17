import { PagamentoRepository } from '../../../adapters/postgres/pagamento/PagamentoRepository';
import { Status } from '../../../domain/models/Pagamento';
import axios from 'axios'
const baseUrlPedido = process.env.URL_PEDIDO

export class AlterarStatusDoPagamentoUseCase {
  static async execute(id: string, status: Status) {
    const statusAtual = await PagamentoRepository.obterStatus(id);

    if (statusAtual?.toLowerCase() != Status.Aguardando) {
      throw new Error(
        'Somente status "pendente" pode ser atualizado para "Pago" ou "cancelado"',
      );
    }

    if (!Object.values(Status).includes(status)) {
      throw new Error('Status inválido');
    }
    try {
      // await axios.post(`${baseUrlPedido}/webhooks/mercadopago`, {
      //  id_pagamento: id,
      //  status: status
      //})
    } catch (error) {
      console.error("erro ao atualizar status do pedido", error)
    }  
    return await PagamentoRepository.atualizarStatus(id, status) 
  }
}
