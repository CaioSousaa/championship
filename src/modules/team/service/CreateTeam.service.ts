import { prisma } from '../../../database/prisma';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { ITeamDTO } from '../dto/ITeamDTO';

@Injectable()
export class CreateTeamService {
  async execute({ country, name }: ITeamDTO) {
    const teamAlreadyExist = await prisma.teams.findUnique({ where: { name } });

    if (teamAlreadyExist) {
      throw new NotAcceptableException('team alrady registred');
    }

    const team = await prisma.teams.create({
      data: { name, country, created_at: new Date() },
    });

    return team;
  }
}
