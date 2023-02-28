import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { Todo } from './entity/todo.entity';
import { TodoService } from './todo.service';

@Resolver()
export class TodoResolver {
  constructor(private todoService: TodoService) {}

  @Query(() => [Todo], {
    description: 'devuelve un lista de todo',
    name: 'Todos',
  })
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Query(() => Todo, {
    description: 'devuelve un todo existente',
    name: 'TodoByOne',
  })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }
}
