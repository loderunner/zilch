import clsx from 'clsx';
import { useLayoutEffect, useRef, useState } from 'react';

import Die from './Die.jsx';
import { DieState, GameStage } from './game';

function randomPositions(dice, positions, tableSize, dieSize) {
  const newPositions = [];
  dieSize = dieSize * 0.5 * Math.SQRT2;
  for (let i = 0; i < 5; i++) {
    if (dice[i].state === DieState.USED) {
      newPositions.push({ ...positions[i] });
      continue;
    }

    let overlap, x, y, rot;
    do {
      overlap = false;
      x = dieSize + Math.floor(Math.random() * (tableSize - 2 * dieSize));
      y = dieSize + Math.floor(Math.random() * (tableSize - 2 * dieSize));
      rot = Math.random() * 2 * Math.PI;
      for (let j = 0; j < 5; j++) {
        let otherX, otherY;
        if (dice[j].state === DieState.USED) {
          otherX = positions[j].x;
          otherY = positions[j].y;
        } else if (newPositions[j]) {
          otherX = newPositions[j].x;
          otherY = newPositions[j].y;
        } else {
          continue;
        }
        if (
          (x - otherX) * (x - otherX) + (y - otherY) * (y - otherY) <
          4 * dieSize * dieSize
        ) {
          overlap = true;
          break;
        }
      }
    } while (overlap);
    newPositions.push({ x, y, rot });
  }
  return newPositions;
}

export default function Table({
  stage,
  setStage,
  dice,
  selectedValid,
  onSelectDie,
}) {
  const ref = useRef();
  const [positions, setPositions] = useState([
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
    { x: 0, y: 0, rot: 0 },
  ]);
  useLayoutEffect(() => {
    if (stage === GameStage.THROWING) {
      setPositions(
        randomPositions(dice, positions, ref.current.clientWidth, 40),
      );
      setStage(GameStage.THROWN);
    }
  }, [dice, positions, setStage, stage]);
  return (
    <div ref={ref} className={clsx(['bg-table', 'aspect-square', 'md:w-xl'])}>
      {stage !== GameStage.START
        ? dice.map((d, i) => (
            <Die
              key={i}
              die={d}
              position={positions[i]}
              enabled={
                stage === GameStage.SELECTING && d.state !== DieState.USED
              }
              valid={selectedValid}
              onSelect={() => onSelectDie(i)}
            />
          ))
        : null}
    </div>
  );
}
