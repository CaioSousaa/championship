import { Injectable, NotAcceptableException } from '@nestjs/common';
import { resultsRoundOf16Function } from '../utils/ResultsRoundOf16';
import { IResults } from '../dto/IResultsRoundOf16';
import { prisma } from 'src/database/prisma';

@Injectable()
export class ResultsRoundOf16 {
  async execute({
    resultGameOne,
    resultGameTwo,
    resultGameThree,
    resultGameFour,
    resultGameFive,
    resultGameSix,
    resultGameSeven,
    resultGameEigth,
  }: IResults) {
    const results = [
      resultGameOne,
      resultGameTwo,
      resultGameThree,
      resultGameFour,
      resultGameFive,
      resultGameSix,
      resultGameSeven,
      resultGameEigth,
    ];

    const round16 = await prisma.roundOf16.findFirst();

    if (round16.concluded) {
      throw new NotAcceptableException('the games have already happened');
    }

    const clashs = round16.clashes;

    const teamsClassifields = await resultsRoundOf16Function(clashs, results);

    const update = await prisma.roundOf16.update({
      where: {
        id: round16.id,
      },
      data: {
        classified: teamsClassifields,
        concluded: true,
      },
    });

    return update;
  }
}
