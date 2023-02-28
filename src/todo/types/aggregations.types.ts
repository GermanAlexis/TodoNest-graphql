/* eslint-disable prettier/prettier */
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'types custom' })
export class AggregationsType {
  @Field(() => Int)
  completed: number;

  @Field(() => Int)
  pending: number;

  @Field(() => Int)
  total: number;
}
