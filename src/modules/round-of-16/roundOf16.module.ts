import { Module } from '@nestjs/common';
import { CreateRoundOf16Service } from './service/CreateRoundOf16.service';
import { RoundOf16Controller } from './controller/roundOf16.controller';
import { ResultsRoundOf16 } from './service/ResultsRoundOf16.service';

@Module({
  imports: [],
  controllers: [RoundOf16Controller],
  providers: [CreateRoundOf16Service, ResultsRoundOf16],
})
export class RoundOf16Module {}
