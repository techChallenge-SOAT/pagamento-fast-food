import axios from 'axios';
const baseUrlPagamento = process.env.URL_PAGAMENTO

interface PagamentoConfirmadoPayload {
    id: string;
    status: string;
}

export async function simularConfirmacaoPagamentoWebhook({id, status}: PagamentoConfirmadoPayload): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 5000));
    await axios.post(`${baseUrlPagamento}/webhooks/mercadopago/confirmacao`, {
        id_pagamento: id,
        status: status
    })
}


