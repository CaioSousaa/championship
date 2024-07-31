import { NotAcceptableException } from '@nestjs/common';
import { prisma } from 'src/database/prisma';

export async function findTeamExistFunction(nameTeam: string) {
  const team = await prisma.teams.findFirst({
    where: {
      name: nameTeam,
    },
  });

  if (!team) {
    throw new NotAcceptableException('team does not exist');
  }

  return team;
}
