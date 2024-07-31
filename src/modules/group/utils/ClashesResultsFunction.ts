import { Teams } from '@prisma/client';

export async function clashesResultsFunction(
  teams: Teams[],
  goalsTeamOne: number,
  goalsTeamTwo: number,
  goalsTeamThree: number,
  goalsTeamFour: number,
) {
  if (goalsTeamOne > goalsTeamTwo) {
    teams[0].points += 3;
    teams[0].victories += 1;
    teams[0].qtdGames += 1;
    teams[0].scoredGoals += goalsTeamOne;
    teams[0].concededGoals += goalsTeamTwo;
    teams[0].goalsBalance = teams[0].scoredGoals - teams[0].concededGoals;

    teams[1].defeats += 1;
    teams[1].qtdGames += 1;
    teams[1].scoredGoals += goalsTeamTwo;
    teams[1].concededGoals += goalsTeamOne;
    teams[1].goalsBalance = teams[1].scoredGoals - teams[1].concededGoals;
  } else if (goalsTeamTwo > goalsTeamOne) {
    teams[1].points += 3;
    teams[1].victories += 1;
    teams[1].qtdGames += 1;
    teams[1].scoredGoals += goalsTeamTwo;
    teams[1].concededGoals += goalsTeamOne;
    teams[1].goalsBalance = teams[1].scoredGoals - teams[1].concededGoals;

    teams[0].defeats += 1;
    teams[0].qtdGames += 1;
    teams[0].scoredGoals += goalsTeamOne;
    teams[0].concededGoals += goalsTeamTwo;
    teams[0].goalsBalance = teams[0].scoredGoals - teams[0].concededGoals;
  } else {
    teams[1].points += 1;
    teams[1].draws += 1;
    teams[1].qtdGames += 1;
    teams[1].scoredGoals += goalsTeamTwo;
    teams[1].concededGoals += goalsTeamOne;
    teams[1].goalsBalance = teams[1].scoredGoals - teams[1].concededGoals;

    teams[0].points += 1;
    teams[0].draws += 1;
    teams[0].qtdGames += 1;
    teams[0].scoredGoals += goalsTeamOne;
    teams[0].concededGoals += goalsTeamTwo;
    teams[0].goalsBalance = teams[0].scoredGoals - teams[0].concededGoals;
  }

  if (goalsTeamThree > goalsTeamFour) {
    teams[2].points += 3;
    teams[2].victories += 1;
    teams[2].qtdGames += 1;
    teams[2].scoredGoals += goalsTeamThree;
    teams[2].concededGoals += goalsTeamFour;
    teams[2].goalsBalance = teams[2].scoredGoals - teams[2].concededGoals;

    teams[3].defeats += 1;
    teams[3].qtdGames += 1;
    teams[3].scoredGoals += goalsTeamFour;
    teams[3].concededGoals += goalsTeamThree;
    teams[3].goalsBalance = teams[3].scoredGoals - teams[3].concededGoals;
  } else if (goalsTeamFour > goalsTeamThree) {
    teams[3].points += 3;
    teams[3].victories += 1;
    teams[3].qtdGames += 1;
    teams[3].scoredGoals += goalsTeamFour;
    teams[3].concededGoals += goalsTeamThree;
    teams[3].goalsBalance = teams[3].scoredGoals - teams[3].concededGoals;

    teams[2].defeats += 1;
    teams[2].qtdGames += 1;
    teams[2].scoredGoals += goalsTeamThree;
    teams[2].concededGoals += goalsTeamFour;
    teams[2].goalsBalance = teams[2].scoredGoals - teams[2].concededGoals;
  } else {
    teams[2].points += 1;
    teams[2].draws += 1;
    teams[2].qtdGames += 1;
    teams[2].scoredGoals += goalsTeamThree;
    teams[2].concededGoals += goalsTeamFour;
    teams[2].goalsBalance = teams[2].scoredGoals - teams[2].concededGoals;

    teams[3].points += 1;
    teams[3].draws += 1;
    teams[3].qtdGames += 1;
    teams[3].scoredGoals += goalsTeamFour;
    teams[3].concededGoals += goalsTeamThree;
    teams[3].goalsBalance = teams[3].scoredGoals - teams[3].concededGoals;
  }

  return teams;
}
