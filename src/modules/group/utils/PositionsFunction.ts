import { prisma } from '../../../database/prisma';

export async function positionsFunction(nameGroup: string) {
  const groupData = await prisma.group.findFirst({
    where: { name: nameGroup },
    include: { teams: true },
  });

  if (!groupData) {
    throw new Error(`Grupo com nome "${nameGroup}" não encontrado`);
  }

  const sortedTeams = groupData.teams.sort((a, b) => {
    if (b.points !== a.points) {
      return b.points - a.points;
    } else if (b.goalsBalance !== a.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    } else {
      return b.scoredGoals - a.scoredGoals;
    }
  });

  let positionsData = '';
  sortedTeams.forEach((team, index) => {
    positionsData += `${index + 1}. ${team.name} (Pontos: ${team.points}, Saldo de Gols: ${team.goalsBalance}, Gols Feitos: ${team.scoredGoals})\n`;
  });

  await prisma.group.update({
    where: {
      id: groupData.id,
    },
    data: {
      positions: positionsData,
    },
  });

  return positionsData;
}
