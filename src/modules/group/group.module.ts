import { Module } from '@nestjs/common';
import { CreateGroupService } from './service/CreateGroup.service';
import { GroupController } from './controller/group.controller';
import { FindAllGroupService } from './service/FindAllGroups.service';
import { ClashesService } from './service/Clashes.service';
import { ResultsRoundService } from './service/ResultsRound.service';

@Module({
  imports: [],
  controllers: [GroupController],
  providers: [
    CreateGroupService,
    FindAllGroupService,
    ClashesService,
    ResultsRoundService,
  ],
})
export class GroupModule {}
