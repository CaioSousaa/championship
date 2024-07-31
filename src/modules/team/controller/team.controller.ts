import { Body, Controller, Get, Post } from '@nestjs/common';
import { ITeamDTO } from '../dto/ITeamDTO';
import { CreateTeamService } from '../service/CreateTeam.service';
import { GetAllTeams } from '../service/GetAllTeam.service';

@Controller('team')
export class TeamController {
  constructor(
    private readonly createTeamService: CreateTeamService,
    private readonly getAllTeams: GetAllTeams,
  ) {}
  d;

  @Post()
  public async create(@Body() teamDTO: ITeamDTO) {
    return this.createTeamService.execute(teamDTO);
  }

  @Get('findAll')
  public async get() {
    return this.getAllTeams.execute();
  }
}
