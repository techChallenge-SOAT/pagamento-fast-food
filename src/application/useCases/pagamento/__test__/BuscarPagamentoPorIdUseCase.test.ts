import { BuscarPagamentoPorIdUseCase } from '../BuscarPagamentoPorIdUseCase';
import { PagamentoRepository } from '../../../../adapters/postgres/pagamento/PagamentoRepository';

jest.mock('../../../../adapters/postgres/pagamento/PagamentoRepository');

describe('BuscarItensUseCase', () => {
  it('should call ItemRepository.buscarTodos', async () => {
    const mockBuscarPagamento = jest.fn();
    (PagamentoRepository.buscarPorId as jest.Mock) = mockBuscarPagamento;
    const id = '8c5f31f4-a546-4ec9-b8c4-cc4838023d5d';

    await BuscarPagamentoPorIdUseCase.execute(id);

    expect(mockBuscarPagamento).toHaveBeenCalled();
  });
});
