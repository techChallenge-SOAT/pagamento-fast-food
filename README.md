# TechChallenge: Microsserviço de pagamento

## Introdução

Bem-vindo à documentação do projeto para o sistema de gerenciamento de pagamento. Este guia fornece instruções detalhadas sobre como configurar, executar e interagir com a API pagamento.

## Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

```
- Docker & Docker Compose
```

## Configuração do Projeto

1.  **Clone o Repositório:**
	```bash
	git clone git@github.com:techChallenge-SOAT/pagamento-fast-food.git
	cd pagamento-fast-food
	```

2. **Suba a aplicação:**

## Docker

-  **Subir projeto**

	```bash
	docker-compose up
	```
- **Desligar Projeto**
	```bash
	docker-compose down
	```

# Rotas da API

##  pagamento

 1. **Criar QRCode pagamento**
	 - **Método:** `POST`
	 - **Endpoint:** `/pagamento`
	 - **Exemplo Requisição:**

		```json
		{
		    "cliente_cpf": "12345678900",
			"id_pedido": "670d7b97-e82e-47f4-bb4a-cd3f05865c90",
			"descricao_produto": "Detalhes do pedido",
			"valor": 20 
		  }
		```
2. **Consultar pagamento específico**
	- **Método:** `GET`
	- **Endpoint:** `/pagamento/{id}`
	- **Exemplo Requisição:**

		```bash
		GET localhost:3000/pagamento/1
		```

4. **Consultar todos os pagamento**
	- **Método:** `GET`
	- **Endpoint:** `/pagamento`
	- **Exemplo Requisição:**

		```bash
		localhost:3000/pagamento
		```

 1. **Gerar pagamento pedido**
	 - **Método:** `POST`
	 - **Endpoint:** `/webhooks/pagamento/mercadopago`
	 - **Exemplo Requisição:**
		```json
		{
		"id_pedido":"371a1359-37fe-468c-9f36-b2509fed34e7",
		"status":"Pago"
		}
		```

# Caminho feliz para teste

### Funcionalidade: `Pagamento`

**Contexto:**
*Dado* que eu tenha um item cadastrado

**Cenário:** `Pagamento`

*Dado* que crie um pedido com pelo menos 1 item
*Quando* realize o pagamento do pedido
*Então* status do pagamento deve ser atualizado para pago

>[!NOTE]
>
>1. Gerar pagamento pedido
>2. Atualizar status Pedido para `Aguardando Pagamento`
>3. Atualizar status Pedido para `pago`
