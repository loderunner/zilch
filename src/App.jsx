import { useCallback, useEffect, useMemo, useState } from 'react';

import Die from './Die.jsx';
import solve from './solve';

export default function App() {
  const [game, setGame] = useState({
    score: 0,
    runScore: 0,
    addScore: 0,
    dice: [
      { value: 1, state: 'used' },
      { value: 1, state: 'used' },
      { value: 1, state: 'used' },
      { value: 1, state: 'used' },
      { value: 1, state: 'used' },
    ],
  });

  const dice = useMemo(() => game.dice, [game.dice]);
  const setDice = useCallback(
    (newDice) => setGame({ ...game, dice: newDice }),
    [game],
  );

  const selected = useMemo(
    () => dice.filter((d) => d.state === 'selected'),
    [dice],
  );

  const solved = useMemo(() => solve(selected.map((d) => d.value)), [selected]);

  const valid = useMemo(
    () => solved.used === selected.length,
    [selected.length, solved.used],
  );

  const throwable = useMemo(() => {
    if (dice.every((d) => d.state === 'used')) {
      return true;
    }
    if (dice.some((d) => d.state === 'selected')) {
      return valid;
    }
    return false;
  }, [dice, valid]);

  const onThrow = useCallback(() => {
    const first = dice.every(
      (d) => d.state === 'used' || d.state === 'selected',
    );

    const next = dice.map((d) => {
      if (!first) {
        if (d.state === 'used') {
          return { ...d };
        }
        if (d.state === 'selected') {
          return { ...d, state: 'used' };
        }
      }
      return { value: Math.floor(Math.random() * 6) + 1, state: 'thrown' };
    });
    setGame({
      ...game,
      runScore: game.runScore + solved.score,
      addScore: 0,
      dice: next,
    });
  }, [dice, game, solved.score]);

  const onSelectDie = useCallback(
    (i) => {
      const d = dice[i];
      let state;
      if (d.state === 'thrown') {
        state = 'selected';
      } else if (d.state === 'selected') {
        state = 'thrown';
      } else {
        state = d.state;
      }
      setDice([
        ...dice.slice(0, i),
        { value: d.value, state },
        ...dice.slice(i + 1),
      ]);
    },
    [dice, setDice],
  );

  useEffect(() => {
    if (valid) {
      setGame({ ...game, addScore: solved.score });
    } else {
      setGame({ ...game, addScore: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <div>
        {dice.map((d, i) => (
          <Die key={i} die={d} valid={valid} onSelect={() => onSelectDie(i)} />
        ))}
      </div>
      <div>
        Score: {game.score}
        Run: {game.runScore}
        {game.addScore ? `+${game.addScore}` : null}
      </div>
      <div>
        <button onClick={onThrow} disabled={!throwable}>
          Throw!
        </button>
      </div>
    </>
  );
}
