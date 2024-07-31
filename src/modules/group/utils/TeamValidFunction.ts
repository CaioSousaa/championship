import { NotAcceptableException } from '@nestjs/common';
import { prisma } from '../../../database/prisma';

export async function teamValidFunction(nameTeam: string) {
  const teamExist = await prisma.teams.findUnique({
    where: { name: nameTeam },
  });

  if (!teamExist) {
    throw new NotAcceptableException('team does not exist');
  }

  if (teamExist.inGroup === true) {
    throw new NotAcceptableException('this team already belongs to a group');
  }

  return teamExist;
}
