import Pagamento from "../Pagamento";

describe("pagamento", () => {
  it("should create an instance of pagamento with correct properties", () => {
    const pagamento = new Pagamento(
      "33834898-7ce0-4b88-a319-95b8a01d6881",
      "12345678900",
      "pendente",
      "descricao pedido",
      100,
    );

    expect(pagamento).toBeInstanceOf(Pagamento);
    expect(pagamento).toHaveProperty("id");
    expect(pagamento.id_pedido).toBe("33834898-7ce0-4b88-a319-95b8a01d6881");
    expect(pagamento.cpf_cliente).toBe("12345678900");
    expect(pagamento.status_pagamento).toBe("pendente");
    expect(pagamento.descricao_pedido).toBe("descricao pedido");
    expect(pagamento.valor).toBe(100);
  });
});
