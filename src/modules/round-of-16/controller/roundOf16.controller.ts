import { Controller, Post } from '@nestjs/common';
import { CreateRoundOf16Service } from '../service/CreateRoundOf16.service';

@Controller('roundOf16')
export class RoundOf16Controller {
  constructor(private readonly createRoundOf16: CreateRoundOf16Service) {}

  @Post()
  public async create() {
    return this.createRoundOf16.execute();
  }
}
