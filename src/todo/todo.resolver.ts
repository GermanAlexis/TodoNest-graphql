import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StatusArgs } from './dto/args/status.args';
import { CreateTodoInput, UpdateTodoInput } from './dto/Input/index';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo], {
    description: 'devuelve un lista de todo',
    name: 'Todos',
  })
  findAll(@Args() status: StatusArgs): Todo[] {
    return this.todoService.findAll(status);
  }

  @Query(() => Todo, {
    description: 'devuelve un todo existente',
    name: 'TodoByOne',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'CreateTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput) {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'UpdateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput) {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean, { name: 'deleteTodo' })
  deleteTodo(
    @Args('deleteTodoInput') updateTodoInput: UpdateTodoInput,
  ): boolean {
    return this.todoService.delete(updateTodoInput);
  }

  @Query(() => Int, {
    description: 'devuelve el conteo de todos los todos',
    name: 'TotalTodos',
  })
  totalTodos(): number {
    return this.todoService.totaltodos;
  }

  @Query(() => Int, {
    description: 'devuelve todos completados',
    name: 'completedTodos',
  })
  completedTodos(): number {
    return this.todoService.completedtodos;
  }

  @Query(() => Int, {
    description: 'devuelve los todos pendientes',
    name: 'peddingtodos',
  })
  peddingTodos(): number {
    return this.todoService.pendingtodos;
  }
}
