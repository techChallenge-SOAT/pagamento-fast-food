/* eslint-disable no-useless-catch */
import Pagamento from '../../valueObjects/Pagamento';
import { PagamentoRepository } from '../../../adapters/postgres/pagamento/PagamentoRepository';
import { gerarQrCodePix } from '../../../adapters/mergadopago/gerarQrcode';

export class CriarQrcodeUseCase {
  static async execute(
    id_pedido: string,
    cpf_cliente: string,
    descricao_pedido: string,
    status_pagamento: string,
    valor: number,
  ) {
    const pagamento = new Pagamento(
      id_pedido,
      cpf_cliente,
      descricao_pedido,
      status_pagamento,
      valor,
    );

    try {
      const geraPagamento =
        await PagamentoRepository.criarQrCodePagamento(pagamento);
      const qrcode = await gerarQrCodePix(geraPagamento);
      return qrcode;
    } catch (error) {
      throw error;
    }
  }
}
