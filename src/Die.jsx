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
    <div
      className={clsx([
        'absolute',
        'origin-center',
        'h-[2.5rem]',
        'w-[2.5rem]',
        state === 'used' ? 'opacity-50' : 'opacity-100',
      ])}
      style={{
        transform: `translate(calc(${position.x}px - 50%), calc(${position.y}px - 50%)) rotate(${position.rot}rad)`,
      }}
    >
      <button className="absolute z-20" onClick={onSelect} disabled={!enabled}>
        <img src={faces[value - 1]} className="" />
      </button>
      {state === 'selected' ? (
        <div
          className={clsx([
            'bg-gradient-radial',
            'absolute',
            'z-10',
            '-top-[1.75rem]',
            '-left-[1.75rem]',
            'h-[6rem]',
            'w-[6rem]',
            valid ? 'from-white' : 'from-orange-300',
            'to-transparent',
            'to-70%',
          ])}
        />
      ) : null}
    </div>
  );
}
