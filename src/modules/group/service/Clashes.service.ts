import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from 'src/database/prisma';
import { IClashDTO } from '../dto/IClashDTO';
import { teamExistFunction } from '../utils/TeamExistFunction';

@Injectable()
export class ClashesService {
  async execute({
    nameTeamFour,
    nameTeamOne,
    nameTeamThree,
    nameTeamTwo,
  }: IClashDTO) {
    const teamNames = [nameTeamOne, nameTeamTwo, nameTeamThree, nameTeamFour];
    const teams = await Promise.all(
      teamNames.map((name) => teamExistFunction(name)),
    );

    const clashes = [];
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        const clash = `${teams[i].name} x ${teams[j].name}`;
        clashes.push(clash);
      }
    }

    const groupData = await prisma.group.findFirst({
      where: {
        teams: {
          some: {
            name: {
              in: teamNames,
            },
          },
        },
      },
    });

    if (!groupData) {
      throw new NotFoundException('Group not found');
    }

    const clashAlreadyExist = await prisma.group.findFirst({
      where: {
        clashes: {
          hasSome: clashes,
        },
      },
    });

    if (clashAlreadyExist) {
      throw new NotFoundException('Confrontation already exists');
    }

    const rounds = [];
    const usedTeams = new Set();

    while (clashes.length > 0) {
      const round = [];
      usedTeams.clear();

      for (let i = 0; i < clashes.length; i++) {
        const [teamA, teamB] = clashes[i].split(' x ');

        if (!usedTeams.has(teamA) && !usedTeams.has(teamB)) {
          round.push(clashes[i]);
          usedTeams.add(teamA);
          usedTeams.add(teamB);
          clashes.splice(i, 1);
          i--;
        }

        if (round.length === 2) {
          break;
        }
      }

      if (round.length > 0) {
        rounds.push(round);
      }
    }

    const updateGroup = await prisma.group.update({
      where: { id: groupData.id },
      data: {
        clashes: {
          push: rounds.flat(),
        },
      },
    });

    return { updateGroup };
  }
}
