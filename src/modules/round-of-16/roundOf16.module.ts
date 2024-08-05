import { Module } from '@nestjs/common';
import { CreateRoundOf16Service } from './service/CreateRoundOf16.service';
import { RoundOf16Controller } from './controller/roundOf16.controller';

@Module({
  imports: [],
  controllers: [RoundOf16Controller],
  providers: [CreateRoundOf16Service],
})
export class RoundOf16Module {}
