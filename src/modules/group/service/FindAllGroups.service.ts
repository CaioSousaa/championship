import { Injectable, NotFoundException } from '@nestjs/common';
import { prisma } from '../../../database/prisma';
import { positionsFunction } from '../utils/PositionsFunction';

@Injectable()
export class FindAllGroupService {
  async execute() {
    const groupsExist = await prisma.group.count();

    if (groupsExist === 0) {
      throw new NotFoundException('');
    }
    const groups = await prisma.group.findMany({ include: { teams: true } });

    groups.forEach((group) => {
      positionsFunction(group.name);
    });

    return groups;
  }
}
