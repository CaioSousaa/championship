import { Injectable, NotAcceptableException } from '@nestjs/common';
import { IResultsRound } from '../dto/IResultsRound';
import { clashesResultsFunction } from '../utils/ClashesResultsFunction';
import { findTeamExistFunction } from '../utils/FindTeamExistFunction';
import { prisma } from 'src/database/prisma';

export interface IParams {
  id: string;
}

@Injectable()
export class ResultsRoundService {
  async execute(
    {
      goalsTeamFour,
      goalsTeamOne,
      goalsTeamThree,
      goalsTeamTwo,
    }: IResultsRound,
    { id }: IParams,
  ) {
    const groupData = await prisma.group.findUnique({
      where: {
        id: id,
      },
    });

    if (!groupData) {
      throw new NotAcceptableException('group not exist');
    }

    const rounds = groupData.rounds;
    const nameTeams = [];

    switch (rounds) {
      case 0:
        for (let i = 0; i < 2; i++) {
          const [teamA, teamB] = groupData.clashes[i].split('x');
          nameTeams.push(teamA, teamB);
        }
        break;

      case 1:
        for (let i = 2; i < 4; i++) {
          const [teamA, teamB] = groupData.clashes[i].split('x');
          nameTeams.push(teamA, teamB);
        }
        break;

      case 2:
        for (let i = 4; i < 6; i++) {
          const [teamA, teamB] = groupData.clashes[i].split('x');
          nameTeams.push(teamA, teamB);
        }
        break;

      case 3:
        for (let i = 6; i < 8; i++) {
          const [teamA, teamB] = groupData.clashes[i].split('x');
          nameTeams.push(teamA, teamB);
        }
        break;

      default:
        throw new NotAcceptableException('Invalid round number');
    }

    const teams = await Promise.all(
      nameTeams.map((name) => findTeamExistFunction(name)),
    );

    const results = await clashesResultsFunction(
      teams,
      goalsTeamOne,
      goalsTeamTwo,
      goalsTeamThree,
      goalsTeamFour,
    );

    const updatePromises = results.map((team) =>
      prisma.teams.update({
        where: { id: team.id },
        data: {
          qtdGames: team.qtdGames,
          victories: team.victories,
          draws: team.draws,
          defeats: team.defeats,
          points: team.points,
          scoredGoals: team.scoredGoals,
          concededGoals: team.concededGoals,
          goalsBalance: team.goalsBalance,
        },
      }),
    );

    const gamesResults = await Promise.all(updatePromises);

    await prisma.group.update({
      where: {
        id: groupData.id,
      },
      data: {
        rounds: +1,
      },
    });

    return gamesResults;
  }
}
