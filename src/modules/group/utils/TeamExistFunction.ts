import { NotAcceptableException } from '@nestjs/common';
import { prisma } from '../../../database/prisma';

export async function teamExistFunction(nameTeam: string) {
  const teamExist = await prisma.teams.findUnique({
    where: { name: nameTeam },
  });

  if (!teamExist) {
    throw new NotAcceptableException('team does not exist');
  }

  return teamExist;
}
