import { useCallback, useState } from 'react';

import Die from './Die.jsx';

export default function App() {
  const [game, setGame] = useState([
    { value: 1, used: true },
    { value: 1, used: true },
    { value: 1, used: true },
    { value: 1, used: true },
    { value: 1, used: true },
  ]);
  const onThrow = useCallback(() => {
    const first = game.every((d) => d.used);

    const next = game.map((d) => {
      if (!first && d.used) {
        return d;
      }
      return { value: Math.floor(Math.random() * 6) + 1, used: false };
    });
    setGame(next);
  }, [game]);
  return (
    <>
      {game.map((d, i) => (
        <Die key={i} die={d} />
      ))}
      <button onClick={onThrow}>Throw!</button>
    </>
  );
}
