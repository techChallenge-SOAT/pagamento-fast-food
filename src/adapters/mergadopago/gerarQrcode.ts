import qrcode from "qrcode";
import { simularConfirmacaoPagamentoWebhook } from "./webhookPagamento";
interface DadosPagamento {
  valor: number;
  descricao_pedido: string;
  cpf_cliente: string;
  id: string;
}

function gerarStringAleatoria(): string {
  return Math.random().toString().slice(2, 10);
}
const dataAtual: Date = new Date();

function gerarPixPayload(pixData: DadosPagamento): string {
  const payloadFormatIndicator: string = "00";
  const merchantAccountInformation: string = pixData.cpf_cliente;
  const merchantCategoryCode: string = "0000";
  const transactionCurrency: string = "986";
  const transactionAmount: number = pixData.valor;
  const countryCode: string = "BR";
  const additionalDataField: string = pixData.descricao_pedido;
  const idEndToEnd: string = `E${String(dataAtual.getDate()).padStart(
    2,
    "0",
  )}${String(dataAtual.getMonth() + 1).padStart(
    2,
    "0",
  )}${dataAtual.getFullYear()}${String(dataAtual.getHours()).padStart(
    2,
    "0",
  )}${String(dataAtual.getMinutes()).padStart(2, "0")}${String(
    dataAtual.getSeconds(),
  ).padStart(2, "0")}${gerarStringAleatoria()}`;
  const payload = `${payloadFormatIndicator}${merchantAccountInformation}${merchantCategoryCode}${transactionCurrency}${transactionAmount}${countryCode}${additionalDataField}${idEndToEnd}`;
  const checksum: string = "00";
  return `${payload}${checksum}`;
}

export async function gerarQrCodePix({
  valor,
  descricao_pedido,
  cpf_cliente,
  id,
}: DadosPagamento): Promise<{
  emv: string;
  img: string;
  id_pagamento: string;
}> {
  const payload: string = gerarPixPayload({
    valor,
    descricao_pedido,
    cpf_cliente,
    id,
  });
  const url: string = `000201${payload}`;
  const codigoTexto: string = url;
  const imagem: string = await gerarQRCodeImagem(url);
  await simularConfirmacaoPagamentoWebhook({ id: id, status: "pago" });
  return { emv: codigoTexto, img: imagem, id_pagamento: id };
}

async function gerarQRCodeImagem(texto: string): Promise<string> {
  return await qrcode.toDataURL(texto);
}
