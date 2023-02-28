import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput, UpdateTodoInput } from './dto/Input/index';

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    { id: 1, description: 'piedra del alma', done: false },
    { id: 2, description: 'piedra del espacio', done: true },
    { id: 3, description: 'piedra del tiempo', done: false },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo {
    const todo = this.todos.find((todo) => todo.id === id);

    if (!todo) throw new NotFoundException(`Todo with id #${id} not found `);

    return todo;
  }

  create(createTodoInput: CreateTodoInput) {
    const todo = new Todo();
    todo.description = createTodoInput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.done = false;
    this.todos.push(todo);
    return todo;
  }

  update(updateTodoInput: UpdateTodoInput) {
    const { id, description, done } = updateTodoInput;
    const todoToUpdate = this.findOne(id);

    if (description) todoToUpdate.description = description;
    if (done !== undefined) todoToUpdate.done = done;

    this.todos = this.todos.map((todo) => {
      return todo.id == id ? todoToUpdate : todo;
    });
  }
}
