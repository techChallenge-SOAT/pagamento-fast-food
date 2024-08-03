import axios from 'axios';
import { PedidoFastFoodService } from '../BuscarPorIdPedido';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('PedidoFastFoodService', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should call axios.get with the correct URL', async () => {
    process.env.PEDIDO_FAST_FOOD_URL = 'http://example.com'; // Define uma URL fictícia

    const id_pedido = '123';
    const responseData = { data: { id: id_pedido, status: 'Pronto' } };
    mockedAxios.get.mockResolvedValue(responseData);

    const response = await PedidoFastFoodService.consultarPedido(id_pedido);

    expect(mockedAxios.get).toHaveBeenCalledWith(`http://example.com/pedidos/${id_pedido}`);
    expect(response).toEqual(responseData);
  });

  it('should handle errors from axios', async () => {
    process.env.PEDIDO_FAST_FOOD_URL = 'http://example.com'; // Define uma URL fictícia

    const id_pedido = '123';
    mockedAxios.get.mockRejectedValue(new Error('Erro de rede'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    await expect(PedidoFastFoodService.consultarPedido(id_pedido)).resolves.toBeUndefined();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Erro ao enviar busca de pedido:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
