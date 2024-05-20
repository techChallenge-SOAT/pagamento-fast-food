import { AlterarStatusDoPagamentoUseCase } from '../AlterarStatusDoPagamentoUseCase';
import { PagamentoRepository } from '../../../../adapters/postgres/pagamento/PagamentoRepository';
import { Status } from '../../../../domain/models/Pagamento';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

jest.mock('../../../../adapters/postgres/pagamento/PagamentoRepository');

const mockAxios = new MockAdapter(axios);

describe('AlterarStatusDoPagamentoUseCase', () => {
  const baseUrlPedido = process.env.URL_PEDIDOS;

  beforeEach(() => {
    jest.clearAllMocks();
    mockAxios.reset();
  });

  it('deve lançar um erro se o status atual não for "pendente"', async () => {
    const mockPagamento = { status_pagamento: 'Pago' };
    PagamentoRepository.buscarPorId = jest.fn().mockResolvedValue(mockPagamento);

    await expect(AlterarStatusDoPagamentoUseCase.execute('33834898-7ce0-4b88-a319-95b8a01d6881', Status.Pago)).rejects.toThrow(
      'Somente status "pendente" pode ser atualizado para "Pago" ou "cancelado"',
    );
  });

  it('deve lançar um erro se o status fornecido não for válido', async () => {
    const mockPagamento = { status_pagamento: 'pendente' };
    PagamentoRepository.buscarPorId = jest.fn().mockResolvedValue(mockPagamento);

    await expect(AlterarStatusDoPagamentoUseCase.execute('33834898-7ce0-4b88-a319-95b8a01d6881', 'Invalido' as Status)).rejects.toThrow(
      'Status inválido',
    );
  });

  it('deve atualizar o status do pagamento e do pedido com sucesso', async () => {
    const mockPagamento = { status_pagamento: 'pendente', id_pedido: '123' };
    PagamentoRepository.buscarPorId = jest.fn().mockResolvedValue(mockPagamento);
    PagamentoRepository.atualizarStatus = jest.fn().mockResolvedValue(true);

    mockAxios.onPatch(`${baseUrlPedido}/123`).reply(200);

    const result = await AlterarStatusDoPagamentoUseCase.execute('33834898-7ce0-4b88-a319-95b8a01d6881', Status.Pago);
    expect(PagamentoRepository.atualizarStatus).toHaveBeenCalledWith('33834898-7ce0-4b88-a319-95b8a01d6881', Status.Pago);
    expect(result).toBe(true);
  });
});