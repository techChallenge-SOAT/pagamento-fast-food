/* eslint-disable no-useless-catch */
import Pagamento from '../../valueObjects/Pagamento';
import { PagamentoRepository } from '../../../adapters/postgres/pagamento/PagamentoRepository';
import axios from 'axios'
const baseUrlPedido = process.env.URL_PEDIDOS

export class CriarQrcodeUseCase {
  static async execute(
    id_pedido: string,
    cpf_cliente: string,
    descricao_pedido: string,
    valor: number,
    status_pagamento: string) {

    const pedido = await axios.get(`${baseUrlPedido}/pedidos/${id_pedido}`);
    
    if (pedido.status !== 200) throw Error('Não é possivel criar pagamento');

    const pagamento = new Pagamento(
      id_pedido,
      cpf_cliente,
      descricao_pedido,
      status_pagamento,
      valor
    )

    try {
      const qrcode = await PagamentoRepository.criarQrCodePagamento(pagamento);
      return qrcode;
    } catch (error) {
      throw error;
    }
  }
}
