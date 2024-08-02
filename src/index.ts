import { app } from "./adapters/http/server";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
});

export default app;
