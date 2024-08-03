import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { simularConfirmacaoPagamentoWebhook } from '../webhookPagamento';

// Crie uma instância do mock adapter para o axios
const mock = new MockAdapter(axios);

// Defina a URL base para o mock
const baseUrlPagamento = process.env.PAGAMENTO_FEST_FOOD_URL;

describe('simularConfirmacaoPagamentoWebhook', () => {
  beforeAll(() => {
    // Configurar o mock para interceptar as chamadas axios.post
    mock.onPost(`${baseUrlPagamento}/webhooks/mercadopago/confirmacao`).reply(200);
  });

  afterEach(() => {
    // Limpar o histórico das chamadas do mock após cada teste
    mock.reset();
  });

  it('should send a POST request with the correct payload', async () => {
    const payload = { id: '123', status: 'confirmed' };

    // Espere que a função seja chamada e que o axios.post também seja chamado com o payload correto
    await simularConfirmacaoPagamentoWebhook(payload);

    // Verifique se axios.post foi chamado com a URL e o payload corretos
    expect(mock.history.post.length).toBe(1);
    expect(mock.history.post[0].url).toBe(`${baseUrlPagamento}/webhooks/mercadopago/confirmacao`);
    expect(mock.history.post[0].data).toContain('{\"id_pagamento\":\"123\",\"status\":\"confirmed\"}');
  });
});
