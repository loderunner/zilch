import { useCallback, useEffect, useMemo, useState } from 'react';

import Die from './Die.jsx';
import solve from './solve';

const DieState = {
  THROWN: 'thrown',
  SELECTED: 'selected',
  USED: 'used',
};

const GameStage = {
  THROWING: 'throwing',
  SELECTING: 'selecting',
};

const initialGame = {
  stage: GameStage.THROWING,
  score: 0,
  runScore: 0,
  addScore: 0,
  dice: [
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
    { value: 1, state: DieState.USED },
  ],
};

export default function App() {
  const [game, setGame] = useState(initialGame);

  const dice = useMemo(() => game.dice, [game.dice]);
  const setDice = useCallback(
    (newDice) => setGame({ ...game, dice: newDice }),
    [game],
  );

  const selected = useMemo(
    () => dice.filter((d) => d.state === DieState.SELECTED),
    [dice],
  );

  const solved = useMemo(() => {
    const s = solve(selected.map((d) => d.value));
    const total = s.reduce(
      (acc, c) => ({
        score: acc.score + c.score,
        used: acc.used + c.dice.length,
      }),
      { score: 0, used: 0 },
    );
    return { ...total, combos: s };
  }, [selected]);

  const valid = useMemo(
    () => solved.used === selected.length,
    [selected.length, solved.used],
  );

  const throwable = useMemo(() => {
    if (dice.every((d) => d.state === DieState.USED)) {
      return true;
    }
    if (dice.some((d) => d.state === DieState.SELECTED)) {
      return valid;
    }
    return false;
  }, [dice, valid]);

  const onThrow = useCallback(() => {
    const first = dice.every(
      (d) => d.state === DieState.USED || d.state === DieState.SELECTED,
    );

    const next = dice.map((d) => {
      if (!first) {
        if (d.state === DieState.USED) {
          return { ...d };
        }
        if (d.state === DieState.SELECTED) {
          return { ...d, state: DieState.USED };
        }
      }
      return {
        value: Math.floor(Math.random() * 6) + 1,
        state: DieState.THROWN,
      };
    });
    setGame({
      ...game,
      runScore: game.runScore + solved.score,
      addScore: 0,
      dice: next,
    });
  }, [dice, game, solved.score]);

  const onBank = useCallback(() => {
    setGame({
      ...initialGame,
      score: game.score + game.runScore + game.addScore,
    });
  }, [game.addScore, game.runScore, game.score]);

  const onSelectDie = useCallback(
    (i) => {
      const d = dice[i];
      let state;
      if (d.state === DieState.THROWN) {
        state = DieState.SELECTED;
      } else if (d.state === DieState.SELECTED) {
        state = DieState.THROWN;
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
        <button onClick={onBank} disabled={game.runScore + game.addScore < 300}>
          Bank
        </button>
      </div>
    </>
  );
}
