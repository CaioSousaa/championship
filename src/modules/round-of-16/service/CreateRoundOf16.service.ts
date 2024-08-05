import { Injectable, NotAcceptableException } from '@nestjs/common';
import { prisma } from 'src/database/prisma';
import { teamExistFunction } from 'src/modules/group/utils/TeamExistFunction';

@Injectable()
export class CreateRoundOf16Service {
  async execute() {
    const clashAlreadyExist = await prisma.roundOf16.count();

    if (clashAlreadyExist > 0) {
      throw new NotAcceptableException('clashes already defined');
    }

    const checkingGroupStageCompleted = await prisma.group.findMany();

    const check = checkingGroupStageCompleted.every((group) => {
      return group.rounds === 3;
    });

    if (!check) {
      throw new NotAcceptableException('all groups must have all rounds');
    }

    const teams = [];
    checkingGroupStageCompleted.forEach((team) => {
      const parts = team.positions.split(/\d+\.\s/).filter(Boolean);
      const teamNames = parts.map((part) => part.split(' (')[0].trim());
      const firstTwoTeams = teamNames.slice(0, 2).join(' e ');
      teams.push(firstTwoTeams);
    });

    const nameTeams = [];
    for (let i = 0; i < teams.length; i++) {
      const [teamA, teamB] = teams[i].split(' e ');
      nameTeams.push(teamA.trim(), teamB.trim());
    }

    const teamsQualifield = await Promise.all(
      nameTeams.map(async (name) => {
        const team = await teamExistFunction(name);
        return team;
      }),
    );

    if (teamsQualifield.length !== 16) {
      throw new NotAcceptableException(
        'There must be exactly 16 qualified teams',
      );
    }

    const shuffledTeams = teamsQualifield.sort(() => Math.random() - 0.5);

    const clashes = [];
    for (let i = 0; i < 16; i += 2) {
      const clash = `${shuffledTeams[i].name} x ${shuffledTeams[i + 1].name}`;
      clashes.push(clash);
    }

    if (clashes.length !== 8) {
      throw new NotAcceptableException('Failed to create 8 unique matches');
    }

    const roundOf16 = await prisma.roundOf16.create({
      data: {
        teams: {
          connect: teamsQualifield.map((team) => ({ id: team.id })),
        },
        clashes: clashes,
        created_at: new Date(),
      },
    });

    return roundOf16;
  }
}
