import express, { request, response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'

const prisma = new PrismaClient();

const app = express();

app.use(express.json()); /* Garante que o express utilize o .json */
app.use(cors())

app.post("/usuarios", async (request, response) => {
  await prisma.user.create({
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(201).json(request.body);
});

app.get("/usuarios", async (request, response) => {
  let users = [];
  users = await prisma.user.findMany({
    where: {
      name: request.query.name,
      age: request.query.age,
      email: request.query.email,
    },
  });
  if (request.query) {
  } else {
    users = await prisma.user.findMany();
  }

  response.status(200).json(users);
});

app.put("/usuarios/:id", async (request, response) => {
  await prisma.user.update({
    where: {
      id: request.params.id,
    },
    data: {
      email: request.body.email,
      name: request.body.name,
      age: request.body.age,
    },
  });

  response.status(201).json(request.body);
});

app.delete("/usuarios/:id", async (request, response) => {
  await prisma.user.delete({
    where: {
      id: request.params.id,
    },
  });
  response.status(200).json({ message: "Usuário deletado com sucesso!" });
});

app.listen(3000);

/* 
    O que preciso para criar uma rota?
    1) Tipo de rota/ Método HTTP
    2) Endereço
*/

/* 
    Criar nossa API de Usuários
    - Criar usuário
    - Listar todos os usuários
    - Editar um usuário
    - Deletar um usuário

*/
