import solve from './solve';

describe('solver', () => {
  const cases = [
    { play: [1], result: [{ score: 100, dice: [1] }] },
    { play: [2], result: [] },
    { play: [3], result: [] },
    { play: [4], result: [] },
    { play: [5], result: [{ score: 50, dice: [5] }] },
    { play: [6], result: [] },
    {
      play: [1, 1],
      result: [
        { score: 100, dice: [1] },
        { score: 100, dice: [1] },
      ],
    },
    { play: [1, 2], result: [{ score: 100, dice: [1] }] },
    { play: [1, 3], result: [{ score: 100, dice: [1] }] },
    {
      play: [1, 5],
      result: [
        { score: 100, dice: [1] },
        { score: 50, dice: [5] },
      ],
    },
    { play: [2, 1], result: [{ score: 100, dice: [1] }] },
    { play: [2, 2], result: [] },
    { play: [2, 3], result: [] },
    { play: [2, 5], result: [{ score: 50, dice: [5] }] },
    { play: [3, 1], result: [{ score: 100, dice: [1] }] },
    { play: [3, 4], result: [] },
    { play: [3, 5], result: [{ score: 50, dice: [5] }] },
    {
      play: [5, 1],
      result: [
        { score: 100, dice: [1] },
        { score: 50, dice: [5] },
      ],
    },
    { play: [5, 2], result: [{ score: 50, dice: [5] }] },
    {
      play: [5, 5],
      result: [
        { score: 50, dice: [5] },
        { score: 50, dice: [5] },
      ],
    },
    { play: [1, 1, 1], result: [{ score: 1000, dice: [1, 1, 1] }] },
    {
      play: [1, 1, 2],
      result: [
        { score: 100, dice: [1] },
        { score: 100, dice: [1] },
      ],
    },
    {
      play: [1, 2, 1],
      result: [
        { score: 100, dice: [1] },
        { score: 100, dice: [1] },
      ],
    },
    { play: [1, 2, 2], result: [{ score: 100, dice: [1] }] },
    { play: [3, 2, 2], result: [] },
    { play: [3, 2, 1], result: [{ score: 100, dice: [1] }] },
    { play: [3, 3, 3], result: [{ score: 300, dice: [3, 3, 3] }] },
    { play: [4, 4, 4], result: [{ score: 400, dice: [4, 4, 4] }] },
    {
      play: [6, 5, 1],
      result: [
        { score: 100, dice: [1] },
        { score: 50, dice: [5] },
      ],
    },
    { play: [6, 5, 4], result: [{ score: 50, dice: [5] }] },
    {
      play: [6, 5, 5],
      result: [
        { score: 50, dice: [5] },
        { score: 50, dice: [5] },
      ],
    },
    { play: [6, 6, 6], result: [{ score: 600, dice: [6, 6, 6] }] },
    {
      play: [1, 5, 1],
      result: [
        { score: 100, dice: [1] },
        { score: 100, dice: [1] },
        { score: 50, dice: [5] },
      ],
    },
    { play: [1, 2, 3, 4], result: [{ score: 100, dice: [1] }] },
    {
      play: [1, 2, 5, 5],
      result: [
        { score: 100, dice: [1] },
        { score: 50, dice: [5] },
        { score: 50, dice: [5] },
      ],
    },
    {
      play: [1, 5, 5, 1, 1],
      result: [
        { score: 1000, dice: [1, 1, 1] },
        { score: 50, dice: [5] },
        { score: 50, dice: [5] },
      ],
    },
    { play: [1, 2, 3, 4, 5], result: [{ score: 1500, dice: [1, 2, 3, 4, 5] }] },
    { play: [6, 3, 2, 5, 4], result: [{ score: 2000, dice: [2, 3, 4, 5, 6] }] },
    { play: [2, 3, 3, 4, 4], result: [{ score: 500, dice: [2, 3, 3, 4, 4] }] },
    { play: [4, 3, 2, 6, 3], result: [{ score: 500, dice: [2, 3, 3, 4, 6] }] },
  ];
  it.each(cases)('$play', (c) => {
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
