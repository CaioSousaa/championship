import { Module } from '@nestjs/common';
import { TeamModule } from './modules/team/team.module';
import { GroupModule } from './modules/group/group.module';

@Module({
  imports: [TeamModule, GroupModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
