import { Body, Controller, Post, Put } from '@nestjs/common';
import { CreateRoundOf16Service } from '../service/CreateRoundOf16.service';
import { IResults } from '../dto/IResultsRoundOf16';
import { ResultsRoundOf16 } from '../service/ResultsRoundOf16.service';

@Controller('roundOf16')
export class RoundOf16Controller {
  constructor(
    private readonly createRoundOf16: CreateRoundOf16Service,
    private readonly resultsRoundOf16: ResultsRoundOf16,
  ) {}

  @Post()
  public async create() {
    return this.createRoundOf16.execute();
  }

  @Put('/results_round_16')
  public async update(@Body() iResults: IResults) {
    return this.resultsRoundOf16.execute(iResults);
  }
}
