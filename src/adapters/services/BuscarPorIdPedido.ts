import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export class PedidoFastFoodService {
  static async consultarPedido(id_pedido: string | undefined) {
    const url = process.env.PEDIDO_FAST_FOOD_URL;
    if (!url) {
      throw new Error("PEDIDO_FAST_FOOD_URL não está definido");
    }
    try {
      return await axios.get(`${url}/pedidos/${id_pedido}`);
    } catch (error) {
      console.error("Erro ao enviar busca de pedido:", error);
    }
  }
}
