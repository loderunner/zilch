const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function Die({ die, onSelect }) {
  const { value, state } = die;
  return (
    <button
      className={`${state === 'used' ? 'opacity-50' : 'opacity-100'} ${
        state === 'selected' ? 'border' : 'border-none'
      }`}
      onClick={onSelect}
    >
      {faces[value - 1]}
    </button>
  );
}
