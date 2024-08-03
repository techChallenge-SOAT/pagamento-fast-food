import { PagamentoRepository } from '../PagamentoRepository';
import { Pagamento as PagamentoModel } from '../../models/PagamentosModel';
import Pagamento from '../../../../application/valueObjects/Pagamento';

jest.mock('../../models/PagamentosModel');

const PagamentoModelMock = PagamentoModel as jest.Mocked<typeof PagamentoModel>;

describe('PagamentoRepository', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should create a payment QR code', async () => {
    const pagamento = new Pagamento(
      'pedido1',
      '12345678901',
      'Pendente',
      'Pedido Teste',
      100.00
    );

    PagamentoModelMock.create.mockResolvedValue(pagamento as any);

    const result = await PagamentoRepository.criarQrCodePagamento(pagamento);

    expect(PagamentoModelMock.create).toHaveBeenCalledWith({
      id: pagamento.id,
      cpf_cliente: pagamento.cpf_cliente,
      descricao_pedido: pagamento.descricao_pedido,
      valor: pagamento.valor,
      status_pagamento: pagamento.status_pagamento,
      id_pedido: pagamento.id_pedido,
    });
    expect(result).toEqual(pagamento);
  });

  it('should find a payment by ID', async () => {
    const pagamento = { id: '1', status_pagamento: 'Pendente' } as any;
    PagamentoModelMock.findByPk.mockResolvedValue(pagamento);

    const result = await PagamentoRepository.buscarPorId('1');

    expect(PagamentoModelMock.findByPk).toHaveBeenCalledWith('1');
    expect(result).toEqual(pagamento);
  });

  it('should update the payment status', async () => {
    PagamentoModelMock.update.mockResolvedValue([1]);

    const result = await PagamentoRepository.atualizarStatus('1', 'Pago');

    expect(PagamentoModelMock.update).toHaveBeenCalledWith(
      { status_pagamento: 'Pago', updated_at: expect.any(Date) },
      { where: { id: '1' } },
    );
    expect(result).toEqual([1]);
  });

  it('should handle errors when obtaining status', async () => {
    PagamentoModelMock.findByPk.mockRejectedValue(new Error('Database error'));

    await expect(PagamentoRepository.obterStatus('1')).rejects.toThrow('Erro ao buscar status do pagamento');
  });

  it('should return payment status', async () => {
    const pagamento = { status_pagamento: 'Pendente' } as any;
    PagamentoModelMock.findByPk.mockResolvedValue(pagamento);

    const status = await PagamentoRepository.obterStatus('1');

    expect(PagamentoModelMock.findByPk).toHaveBeenCalledWith('1');
    expect(status).toEqual('Pendente');
  });
});
