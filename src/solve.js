import combinations from './combinations';

/**
 * @typedef {{points: number, dice: number[]}} Combo
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
 * @returns {{score: number, used: number, combos: Combo[]}
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
      return {
        score: 500,
        used: 5,
        combos: [
          {
            points: 500,
            dice: stringToDice(diceStr),
          },
        ],
      };
    }
    return { score: 0, used: 0, combos: [] };
  }

  if (dice.length > combo.length) {
    const nextDice = stringToDice(diceStr);
    nextDice.splice(comboIndex, combo.length);
    const subSolve = solve(nextDice);
    return {
      score: max + subSolve.score,
      used: combo.length + subSolve.used,
      combos: [{ points: max, dice: stringToDice(combo) }, ...subSolve.combos],
    };
  }

  return {
    score: max,
    used: combo.length,
    combos: [{ points: max, dice: stringToDice(combo) }],
  };
}
