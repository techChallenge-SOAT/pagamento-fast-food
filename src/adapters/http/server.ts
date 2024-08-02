import express from 'express';
import bodyParser from 'body-parser';
import pagamentoRoutes from './routes/pagamentoRoutes';
import { handleConfirmaPagamentoWebhook } from './webhooks/handleMercadoPagoWebhook';
import swaggerUi from 'swagger-ui-express';

import swaggerDocs from '../../config/swagger.json';

const app = express();

app.use(bodyParser.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/pagamento', pagamentoRoutes);

app.use('/webhooks/mercadopago/confirmacao', handleConfirmaPagamentoWebhook);

app.get('/', (req, res) => {
  res.send('Sistema de Pagamentos');
});

export { app };
