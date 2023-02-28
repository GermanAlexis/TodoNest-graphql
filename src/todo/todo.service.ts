import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { CreateTodoInput } from './dto/Input/create-todo.input';

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

  create(createTodoinput: CreateTodoInput) {
    const todo = new Todo();
    todo.description = createTodoinput.description;
    todo.id = Math.max(...this.todos.map((todo) => todo.id), 0) + 1;
    todo.done = false;
    this.todos.push(todo);
    return todo;
  }
}
