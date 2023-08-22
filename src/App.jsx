import { useCallback, useState } from 'react';

import Die from './Die.jsx';

export default function App() {
  const [game, setGame] = useState([
    { value: 1, state: 'used' },
    { value: 1, state: 'used' },
    { value: 1, state: 'used' },
    { value: 1, state: 'used' },
    { value: 1, state: 'used' },
  ]);

  const onThrow = useCallback(() => {
    const first = game.every(
      (d) => d.state === 'used' || d.state === 'selected',
    );

    const next = game.map((d) => {
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
    setGame(next);
  }, [game]);

  const onSelectDie = useCallback(
    (i) => {
      const d = game[i];
      let state;
      if (d.state === 'thrown') {
        state = 'selected';
      } else if (d.state === 'selected') {
        state = 'thrown';
      } else {
        state = d.state;
      }
      setGame([
        ...game.slice(0, i),
        { value: d.value, state },
        ...game.slice(i + 1),
      ]);
    },
    [game],
  );

  return (
    <>
      {game.map((d, i) => (
        <Die key={i} die={d} onSelect={() => onSelectDie(i)} />
      ))}
      <button onClick={onThrow}>Throw!</button>
    </>
  );
}
