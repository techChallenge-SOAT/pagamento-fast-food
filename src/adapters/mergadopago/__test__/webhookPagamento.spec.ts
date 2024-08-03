import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { simularConfirmacaoPagamentoWebhook } from '../webhookPagamento';

const mock = new MockAdapter(axios);

const baseUrlPagamento = process.env.PAGAMENTO_FEST_FOOD_URL;

describe('simularConfirmacaoPagamentoWebhook', () => {
  beforeAll(() => {
    mock.onPost(`${baseUrlPagamento}/webhooks/mercadopago/confirmacao`).reply(200);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should send a POST request with the correct payload', async () => {
    const payload = { id: '123', status: 'confirmed' };

    await simularConfirmacaoPagamentoWebhook(payload);

    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${baseUrlPagamento}/webhooks/mercadopago/confirmacao`);
    expect(mock.history.post[0].data).toContain('{\"id_pagamento\":\"123\",\"status\":\"confirmed\"}');
  });
});
