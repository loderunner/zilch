import solve from './solve';

describe('solver', () => {
  const cases = [
    { play: [1], result: { score: 100, used: 1 } },
    { play: [2], result: { score: 0, used: 0 } },
    { play: [3], result: { score: 0, used: 0 } },
    { play: [4], result: { score: 0, used: 0 } },
    { play: [5], result: { score: 50, used: 1 } },
    { play: [6], result: { score: 0, used: 0 } },
    { play: [1, 1], result: { score: 200, used: 2 } },
    { play: [1, 2], result: { score: 100, used: 1 } },
    { play: [1, 3], result: { score: 100, used: 1 } },
    { play: [1, 5], result: { score: 150, used: 2 } },
    { play: [2, 1], result: { score: 100, used: 1 } },
    { play: [2, 2], result: { score: 0, used: 0 } },
    { play: [2, 3], result: { score: 0, used: 0 } },
    { play: [2, 5], result: { score: 50, used: 1 } },
    { play: [3, 1], result: { score: 100, used: 1 } },
    { play: [3, 4], result: { score: 0, used: 0 } },
    { play: [3, 5], result: { score: 50, used: 1 } },
    { play: [5, 1], result: { score: 150, used: 2 } },
    { play: [5, 2], result: { score: 50, used: 1 } },
    { play: [5, 5], result: { score: 100, used: 2 } },
    { play: [1, 1, 1], result: { score: 1000, used: 3 } },
    { play: [1, 1, 2], result: { score: 200, used: 2 } },
    { play: [1, 2, 1], result: { score: 200, used: 2 } },
    { play: [1, 2, 2], result: { score: 100, used: 1 } },
    { play: [3, 2, 2], result: { score: 0, used: 0 } },
    { play: [3, 2, 1], result: { score: 100, used: 1 } },
    { play: [3, 3, 3], result: { score: 300, used: 3 } },
    { play: [3, 3, 3], result: { score: 300, used: 3 } },
    { play: [6, 5, 1], result: { score: 150, used: 2 } },
    { play: [6, 5, 4], result: { score: 50, used: 1 } },
    { play: [6, 5, 5], result: { score: 100, used: 2 } },
    { play: [6, 6, 6], result: { score: 600, used: 3 } },
    { play: [1, 2, 3, 4], result: { score: 100, used: 1 } },
    { play: [1, 2, 5, 5], result: { score: 200, used: 3 } },
    { play: [1, 2, 3, 4, 5], result: { score: 1500, used: 5 } },
    { play: [6, 3, 2, 5, 4], result: { score: 2000, used: 5 } },
    { play: [2, 3, 3, 4, 4], result: { score: 500, used: 5 } },
  ];
  it.each(cases)('$play => $result.score', (c) => {
    expect(solve(c.play)).toStrictEqual(c.result);

    shuffle(c.play);
    expect(solve(c.play)).toStrictEqual(c.result);
  });
});

/**
 *
 * @param {Array<T>} array
 * @returns {Array<T>}
 */
function shuffle(array) {
  let currentIndex = array.length;
  let randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
