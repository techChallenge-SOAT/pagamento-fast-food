import { Request, Response } from 'express';
import { AlterarStatusDoPagamentoUseCase } from '../../../application/useCases/pagamento/AlterarStatusDoPagamentoUseCase';
import { Status } from '../../../domain/models/Pagamento';
import { startStepFunctionExecution } from '../../stepfunction/ExecutaOrquestrador';
import { escape } from 'he';

export const handleConfirmaPagamentoWebhook = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id_pagamento, status } = req.body;

    if (!id_pagamento || !status) {
      return res.status(400).send('pagamento ou status ausente');
    }

    const sanitizedStatus = status.trim().toLowerCase();

    if (sanitizedStatus === Status.Pago || sanitizedStatus === Status.Cancelado) {
      const confirmaAtualizacao = await AlterarStatusDoPagamentoUseCase.execute(
        id_pagamento,
        sanitizedStatus,
      );
      await startStepFunctionExecution(confirmaAtualizacao);

      // Escapa o valor do status antes de incluí-lo na resposta
      return res.status(200).send(`Status do pedido atualizado para ${escape(sanitizedStatus)}`);
    } else {
      return res.status(400).send('Status inválido recebido');
    }
  } catch (error) {
    console.error('Erro ao processar webhook do MercadoPago:', error);
    return res.status(500).send('Erro interno ao processar o webhook');
  }
};
