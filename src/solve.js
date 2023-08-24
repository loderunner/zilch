import combinations from './combinations';

/**
 * @typedef {{score: number, dice: number[]}} Combo
 */

/**
 *
 * @param {number[]} dice
 * @returns {string}
 */
function diceToString(dice) {
  return dice
    .map((d) => d.toString())
    .sort()
    .join('');
}

/**
 *
 * @param {string} str
 * @returns {number[]}
 */
function stringToDice(str) {
  return str.split('').map((d) => parseInt(d));
}

/**
 * @param {number[]} dice
 * @returns {Combo[]}
 */
export default function solve(dice) {
  const diceStr = diceToString(dice);

  let combo;
  let max = 0;
  let comboIndex = -1;
  for (const [c, v] of Object.entries(combinations)) {
    const i = diceStr.indexOf(c);
    if (i !== -1 && v > max) {
      combo = c;
      max = v;
      comboIndex = i;
    }
  }

  if (!combo || combo.length === 0) {
    if (dice.length === 5) {
      return [
        {
          score: 500,
          dice: stringToDice(diceStr),
        },
      ];
    }
    return [];
  }

  if (dice.length > combo.length) {
    const nextDice = stringToDice(diceStr);
    nextDice.splice(comboIndex, combo.length);
    const subSolve = solve(nextDice);
    return [{ score: max, dice: stringToDice(combo) }, ...subSolve];
  }

  return [{ score: max, dice: stringToDice(combo) }];
}
