import { prisma } from '../../../database/prisma';
import { IGroupDTO } from '../dto/IGroupDTO';
import { teamValidFunction } from '../utils/TeamValidFunction';
import { NotAcceptableException } from '@nestjs/common';
import { positionsFunction } from '../utils/PositionsFunction';
import { NameGroups } from '@prisma/client';

export class CreateGroupService {
  async execute({
    nameGroup,
    nameTeamFour,
    nameTeamOne,
    nameTeamThree,
    nameTeamTwo,
  }: IGroupDTO) {
    const groupName = nameGroup as NameGroups;

    const teamOne = await teamValidFunction(nameTeamOne);
    const teamTwo = await teamValidFunction(nameTeamTwo);
    const teamThree = await teamValidFunction(nameTeamThree);
    const teamFour = await teamValidFunction(nameTeamFour);

    const nameGroupInUse = await prisma.group.findUnique({
      where: { name: groupName },
    });

    if (nameGroupInUse) {
      throw new NotAcceptableException('This group has already been created');
    }

    const newGroup = await prisma.group.create({
      data: {
        name: groupName,
        positions: '',
        teams: {
          connect: [
            { id: teamOne.id },
            { id: teamTwo.id },
            { id: teamThree.id },
            { id: teamFour.id },
          ],
        },
      },
      include: {
        teams: true,
      },
    });

    await prisma.teams.updateMany({
      where: {
        id: { in: [teamOne.id, teamTwo.id, teamThree.id, teamFour.id] },
      },
      data: { inGroup: true },
    });

    positionsFunction(newGroup.name);

    return newGroup;
  }
}
