import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../../database/prisma';

@Injectable()
export class GetAllTeams {
  async execute() {
    const teamsRegistreded = await prisma.teams.count();

    if (teamsRegistreded === 0) {
      throw new NotFoundException('no registered team');
    }

    const teams = await prisma.teams.findMany();

    return teams;
  }
}
