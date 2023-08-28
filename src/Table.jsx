import clsx from 'clsx';
import { useEffect, useState } from 'react';

import Die from './Die.jsx';
import { DieState, GameStage } from './game';

function randomPositions(tableSize, dieSize) {
  const positions = [];
  dieSize = dieSize * 0.5 * Math.SQRT2;
  for (let i = 0; i < 5; i++) {
    let overlap, x, y, rot;
    do {
      overlap = false;
      x = dieSize + Math.floor(Math.random() * (tableSize - 2 * dieSize));
      y = dieSize + Math.floor(Math.random() * (tableSize - 2 * dieSize));
      rot = Math.random() * 2 * Math.PI;
      for (let j = 0; j < i; j++) {
        const { x: otherX, y: otherY } = positions[j];
        if (
          Math.abs(x - otherX) < 2 * dieSize &&
          Math.abs(y - otherY) < 2 * dieSize
        ) {
          overlap = true;
          break;
        }
      }
    } while (overlap);
    positions.push({ x, y, rot });
  }
  return positions;
}

export default function Table({ stage, dice, selectedValid, onSelectDie }) {
  const [positions, setPositions] = useState(randomPositions(576, 40));
  useEffect(() => {
    if (stage === GameStage.THROWING) {
      setPositions(randomPositions(576, 40));
    }
  }, [stage]);
  return (
    <div className={clsx(['bg-table', 'aspect-square', 'max-w-xl'])}>
      {dice.map((d, i) => (
        <Die
          key={i}
          die={d}
          position={positions[i]}
          enabled={stage === GameStage.SELECTING && d.state !== DieState.USED}
          valid={selectedValid}
          onSelect={() => onSelectDie(i)}
        />
      ))}
    </div>
  );
}
