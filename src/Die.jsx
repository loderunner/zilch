const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

export default function Die({ die }) {
  const { value, used } = die;
  return <h1 style={{ opacity: used ? '50%' : '100%' }}>{faces[value - 1]}</h1>;
}
