import { PagamentoRepository } from "../../../adapters/postgres/pagamento/PagamentoRepository";

export class BuscarPagamentoPorIdUseCase {
  static async execute(id: string) {
    return PagamentoRepository.buscarPorId(id);
  }
}
