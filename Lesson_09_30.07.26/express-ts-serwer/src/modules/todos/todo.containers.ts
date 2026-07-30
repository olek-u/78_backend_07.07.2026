import { Router } from "express";
import { InMemoryRepository } from "./todo.pg.repositopy";
import { TodoService } from "./todo.service";
import { TodoController } from "./todo.controller";
import { createTodoRouter } from "./todo.router";
// writing - соединим все независимые слои
export function buildTodoRouter(): Router {
  const repo = new InMemoryRepository();
  const service = new TodoService(repo);
  const controller = new TodoController(service);
  return createTodoRouter(controller);
}


