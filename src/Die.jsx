import clsx from 'clsx';

const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function Die({ die, valid, enabled, onSelect }) {
  const { value, state } = die;
  return (
    <button
      className={clsx([
        state === 'used' ? 'opacity-50' : 'opacity-100',
        state === 'selected' ? 'border' : 'border-none',
        valid ? 'border-slate-700' : 'border-red-400',
        'mx-2',
      ])}
      onClick={onSelect}
      disabled={!enabled}
    >
      {faces[value - 1]}
    </button>
  );
}
