import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { IGroupDTO } from '../dto/IGroupDTO';
import { CreateGroupService } from '../service/CreateGroup.service';
import { FindAllGroupService } from '../service/FindAllGroups.service';
import { ClashesService } from '../service/Clashes.service';
import { IClashDTO } from '../dto/IClashDTO';
import { IParams, ResultsRoundService } from '../service/ResultsRound.service';
import { IResultsRound } from '../dto/IResultsRound';

@Controller('group')
export class GroupController {
  constructor(
    private readonly createGroupService: CreateGroupService,
    private readonly findAll: FindAllGroupService,
    private readonly clashService: ClashesService,
    private readonly resultsRound: ResultsRoundService,
  ) {}

  @Post()
  public async create(@Body() igroupDTO: IGroupDTO) {
    return this.createGroupService.execute(igroupDTO);
  }

  @Get('/all')
  public async getAll() {
    return this.findAll.execute();
  }

  @Put('/clash')
  public async put(@Body() iclash: IClashDTO) {
    return this.clashService.execute(iclash);
  }

  @Patch('/results/:id')
  public async update(
    @Body() iResults: IResultsRound,
    @Param() { id }: IParams,
  ) {
    return this.resultsRound.execute(iResults, { id });
  }
}
