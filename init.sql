CREATE TABLE pagamento (
  id UUID PRIMARY KEY,
  id_pedido UUID NOT NULL,
  cpf_cliente VARCHAR(14) NOT NULL,
  status_pagamento VARCHAR(255) NOT NULL,
  valor VARCHAR(255) NOT NULL,
  descricao_pedido VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pagamento (id, id_pedido, cpf_cliente, status_pagamento, valor, descricao_pedido) VALUES ('1', '123456', '123.456.789-00', 'Pendente', '100.00', 'Pedido 1'), ('2', '789012', '987.654.321-00', 'Pago', '50.00', 'Pedido 2'), ('3', '345678', '111.222.333-44', 'Cancelado', '200.00', 'Pedido 3');