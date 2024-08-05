import { Module } from '@nestjs/common';
import { TeamModule } from './modules/team/team.module';
import { GroupModule } from './modules/group/group.module';
import { RoundOf16Module } from './modules/round-of-16/roundOf16.module';

@Module({
  imports: [TeamModule, GroupModule, RoundOf16Module],
  controllers: [],
  providers: [],
})
export class AppModule {}
