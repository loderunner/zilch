import combinations from './combinations';

/**
 * @param {string[]} play
 * @returns {{score: number, used: number}}
 */
export default function solve(play) {
  const playStr = play.sort().join('');

  let combo;
  let max = 0;
  let comboIndex = -1;
  for (const [c, v] of Object.entries(combinations)) {
    const i = playStr.indexOf(c);
    if (i !== -1 && v > max) {
      combo = c;
      max = v;
      comboIndex = i;
    }
  }

  if (!combo) {
    if (play.length === 5) {
      return { score: 500, used: 5 };
    }
    return { score: 0, used: 0 };
  }

  if (play.length > combo.length) {
    const nextPlay = playStr.split('');
    nextPlay.splice(comboIndex, combo.length);
    const subSolve = solve(nextPlay);
    return { score: max + subSolve.score, used: combo.length + subSolve.used };
  }

  return { score: max, used: combo.length };
}
