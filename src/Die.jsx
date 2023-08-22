const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function Die({ die, onSelect }) {
  const { value, state } = die;
  return (
    <button
      style={{
        opacity: state === 'used' ? '50%' : '100%',
        border: state === 'selected' ? '1px' : '0',
      }}
      onClick={onSelect}
    >
      {faces[value - 1]}
    </button>
  );
}
