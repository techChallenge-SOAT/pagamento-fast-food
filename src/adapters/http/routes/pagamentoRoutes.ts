import express, { Request, Response } from 'express';
import { Status } from '../../../domain/models/Pagamento';
import { CriarQrcodeUseCase } from '../../../application/useCases/pagamento/CriarQrCodeUseCase';
import { BuscarPagamentoPorIdUseCase } from '../../../application/useCases/pagamento/BuscarPagamentoPorIdUseCase';

import logger from '../../../config/logger';
const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const { id_pedido, cpf_cliente, descricao_pedido, valor } = req.body;
  try {
    const pagamento = await CriarQrcodeUseCase.execute(
      id_pedido,
      cpf_cliente,
      Status.Aguardando,
      descricao_pedido,
      valor,
    );

    return res.status(200).json(pagamento);
  } catch (error) {
    logger.info(error);
    return res.status(500).json({ message: 'Erro ao gerar seu pagamento.' });
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = String(req.params.id);
    const pagamento = await BuscarPagamentoPorIdUseCase.execute(id);
    return res.status(200).json(pagamento);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar o pagamento.' });
  }
});

export default router;
