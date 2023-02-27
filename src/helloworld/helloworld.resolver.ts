import { Args, Float, Int, Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class HelloworldResolver {
  @Query(() => String, {
    description: 'Query Hola mundo return string',
    name: 'hello',
  })
  helloWorld(): string {
    return 'Hola mundo';
  }

  @Query(() => Float, {
    description: 'Obtiene un numero ramdon decimal',
    name: 'numberRamdonfloat',
  })
  getnumberRamdon(): number {
    return Math.random() * 100;
  }

  @Query(() => Int, {
    description: 'Obtiene un numero ramdon entero del 1 a TO (default 6)',
    name: 'numberRamdonint',
  })
  ramdonFromZeroTo(
    @Args('to', { nullable: true, type: () => Int }) to = 6,
  ): number {
    return Math.floor(Math.random() * to + 1);
  }
}
