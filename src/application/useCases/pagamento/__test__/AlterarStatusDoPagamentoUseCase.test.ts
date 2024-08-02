import { PagamentoRepository } from "../../../../adapters/postgres/pagamento/PagamentoRepository";
import { PedidoFastFoodService } from "../../../../adapters/services/BuscarPorIdPedido";
import { AlterarStatusDoPagamentoUseCase } from "../AlterarStatusDoPagamentoUseCase";
import { Status } from "../../../../domain/models/Pagamento";

// Mock das dependências
jest.mock("../../../../adapters/postgres/pagamento/PagamentoRepository");
jest.mock("../../../../adapters/services/BuscarPorIdPedido");

describe("AlterarStatusDoPagamentoUseCase", () => {
  const mockPedido = {
    id: "123",
    status_pagamento: Status.Aguardando,
    id_pedido: "pedido_123",
  };

  const mockDetalhePedido = {
    data: {
      id: "pedido_123",
      status: Status.Aguardando,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve lançar um erro se o status atual não for "aguardando"', async () => {
    (PagamentoRepository.buscarPorId as jest.Mock).mockResolvedValue({
      ...mockPedido,
      status_pagamento: "pago",
    });

    await expect(
      AlterarStatusDoPagamentoUseCase.execute("123", Status.Pago),
    ).rejects.toThrow(
      'Somente status "pendente" pode ser atualizado para "Pago" ou "cancelado"',
    );
  });

  it("deve lançar um erro se o novo status for inválido", async () => {
    (PagamentoRepository.buscarPorId as jest.Mock).mockResolvedValue(
      mockPedido,
    );

    await expect(
      AlterarStatusDoPagamentoUseCase.execute("123", "invalido" as Status),
    ).rejects.toThrow("Status inválido");
  });

  it("deve atualizar o status do pagamento e retornar os detalhes do pedido atualizados", async () => {
    (PagamentoRepository.buscarPorId as jest.Mock).mockResolvedValue(
      mockPedido,
    );
    (PedidoFastFoodService.consultarPedido as jest.Mock).mockResolvedValue(
      mockDetalhePedido,
    );

    const result = await AlterarStatusDoPagamentoUseCase.execute(
      "123",
      Status.Pago,
    );

    expect(PagamentoRepository.atualizarStatus).toHaveBeenCalledWith(
      "123",
      Status.Pago,
    );
    expect(PedidoFastFoodService.consultarPedido).toHaveBeenCalledWith(
      "pedido_123",
    );
    expect(result).toEqual({
      ...mockDetalhePedido.data,
      status: Status.Pago,
    });
  });

  it("deve lançar um erro se o pedido não for encontrado", async () => {
    (PagamentoRepository.buscarPorId as jest.Mock).mockResolvedValue(null);

    await expect(
      AlterarStatusDoPagamentoUseCase.execute("123", Status.Pago),
    ).rejects.toThrow();
  });

  it("deve atualizar o status do pagamento para cancelado", async () => {
    (PagamentoRepository.buscarPorId as jest.Mock).mockResolvedValue(
      mockPedido,
    );
    (PedidoFastFoodService.consultarPedido as jest.Mock).mockResolvedValue(
      mockDetalhePedido,
    );

    const result = await AlterarStatusDoPagamentoUseCase.execute(
      "123",
      Status.Cancelado,
    );

    expect(PagamentoRepository.atualizarStatus).toHaveBeenCalledWith(
      "123",
      Status.Cancelado,
    );
    expect(PedidoFastFoodService.consultarPedido).toHaveBeenCalledWith(
      "pedido_123",
    );
    expect(result).toEqual({
      ...mockDetalhePedido.data,
      status: Status.Cancelado,
    });
  });
});
