import { Module } from '@nestjs/common';
import { CreateTeamService } from './service/CreateTeam.service';
import { TeamController } from './controller/team.controller';
import { GetAllTeams } from './service/GetAllTeam.service';

@Module({
  imports: [],
  controllers: [TeamController],
  providers: [CreateTeamService, GetAllTeams],
})
export class TeamModule {}
