import express from 'express';
import bodyParser from 'body-parser';
import pagamentoRoutes from './routes/pagamentoRoutes';
import { handleConfirmaPagamentoWebhook } from './webhooks/handleMercadoPagoWebhook';

const app = express();

app.use(bodyParser.json());

app.use('/pagamento', pagamentoRoutes);

app.use('/webhooks/pagamento/mercadopago', handleConfirmaPagamentoWebhook);


export { app };
