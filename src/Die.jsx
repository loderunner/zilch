import clsx from 'clsx';

import die1 from './assets/die-1.png';
import die2 from './assets/die-2.png';
import die3 from './assets/die-3.png';
import die4 from './assets/die-4.png';
import die5 from './assets/die-5.png';
import die6 from './assets/die-6.png';

const faces = [die1, die2, die3, die4, die5, die6];

export default function Die({ die, position, valid, enabled, onSelect }) {
  const { value, state } = die;
  return (
    <button
      className={clsx([
        'absolute',
        'origin-center',
        state === 'used' ? 'opacity-50' : 'opacity-100',
        state === 'selected' ? 'border-2' : 'border-none',
        valid ? 'border-sky-500' : 'border-red-400',
      ])}
      style={{
        transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%)) rotate(${position.rot}rad)`,
      }}
      onClick={onSelect}
      disabled={!enabled}
    >
      <img src={faces[value - 1]} className="h-10 w-10" />
    </button>
  );
}
