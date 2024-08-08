export async function resultsRoundOf16Function(
  resultsClasshes: string[],
  results: Array<number[]>,
): Promise<string[]> {
  const classifields: string[] = [];

  for (let i = 0; i < 8; i++) {
    let semaphore = false;

    while (semaphore === false) {
      const [resultA, resultB] = results[i];
      const [teamA, teamB] = resultsClasshes[i].split(' x ');

      if (resultA > resultB) {
        classifields.push(teamA);
      } else if (resultB > resultA) {
        classifields.push(teamB);
      } else {
        const randomTeamOne = Math.random() * 1001;
        const randomTeamTwo = Math.random() * 1001;

        if (randomTeamOne > randomTeamTwo) {
          classifields.push(teamA);
        } else {
          classifields.push(teamB);
        }
      }

      semaphore = true;
    }
  }

  return classifields;
}
