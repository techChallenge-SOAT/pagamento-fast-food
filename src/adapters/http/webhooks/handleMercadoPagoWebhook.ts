import { Request, Response } from 'express';
import { AlterarStatusDoPagamentoUseCase } from '../../../application/useCases/pagamento/AlterarStatusDoPagamentoUseCase';
import { Status } from '../../../domain/models/Pagamento';

export const handleConfirmaPagamentoWebhook = async (req: Request, res: Response) => {
  try {
    const { id_pagamento, status } = req.body;

    if (!id_pagamento || !status) {
      return res.status(400).send('pagamento ou status ausente');
    }

    if (status.trim().toLowerCase() === Status.Pago) {
      await AlterarStatusDoPagamentoUseCase.execute(id_pagamento, Status.Pago);
      return res.status(200).send('Status do pedido atualizado para "pago"');
    } else if (status.trim().toLowerCase() === Status.Cancelado) {
      await AlterarStatusDoPagamentoUseCase.execute(id_pagamento, Status.Cancelado);
      return res
        .status(200)
        .send('Status do pagamento atualizado para "cancelado"');
    } else {
      return res.status(400).send('Status inválido recebido');
    }
  } catch (error) {
    console.error('Erro ao processar webhook do MercadoPago:', error);
    return res.status(500).send('Erro interno ao processar o webhook');
  }
};
