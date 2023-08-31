import clsx from 'clsx';

export default function ScoreBoard({ players, currentPlayer }) {
  return (
    <div className="flex flex-col">
      {players.map((player, i) => (
        <div
          key={i}
          className={clsx([
            'flex',
            'flex-row',
            'justify-between',
            'mb-2',
            'last:mb-0',
            'rounded-2xl',
            {
              'font-bold': i === currentPlayer,
            },
          ])}
        >
          <div>{player.name}</div>
          <div>{player.score}</div>
        </div>
      ))}
    </div>
  );
}
