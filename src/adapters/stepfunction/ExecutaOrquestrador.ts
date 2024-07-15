import { stepfunc } from '../../config/stepfunction'

export const startStepFunctionExecution = async (input: any) => {
    const messageBody = {
        pagamentoId: input.pagamentoId,
        valor: input.valor,
        status: input.status,
        cliente_cpf: input.cliente_cpf,
        data_pedido: input.data_pedido,
        itens: input.itens
    };

    const params: AWS.StepFunctions.StartExecutionInput = {
        stateMachineArn: process.env.STEP_FUNCTION_MACHINE!,
        input:JSON.stringify({ ...input, MessageBody: JSON.stringify(messageBody) }),
        name: `execution-${Date.now()}`
    };

    try {
        const data = await stepfunc.startExecution(params).promise();
        console.log('Execução iniciada com sucesso:', data);
        return data;
    } catch (err) {
        console.error('Erro ao iniciar execução:', err);
        throw err;
    }
};