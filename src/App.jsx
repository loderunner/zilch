import { useCallback, useEffect, useMemo } from 'react';

import ControlBar from './ControlBar.jsx';
import {
  DieState,
  GameStage,
  useAddScore,
  useCurrentPlayer,
  useDice,
  usePlayers,
  useRunScore,
  useStage,
} from './game.js';
import solve from './solve.js';
import Table from './Table.jsx';

export default function App() {
  const [stage, setStage] = useStage();
  const [players, setPlayers] = usePlayers('Player 1', 'Player 2');
  const [dice, setDice] = useDice();
  const [addScore, setAddScore] = useAddScore();
  const [runScore, setRunScore] = useRunScore();
  const [currentPlayer, setCurrentPlayer] = useCurrentPlayer();

  const selected = useMemo(
    () => dice.filter((d) => d.state === DieState.SELECTED),
    [dice],
  );

  const selectedSolved = useMemo(
    () => solve(selected.map((d) => d.value)),
    [selected],
  );

  useEffect(() => {
    if (selectedSolved.used === selected.length) {
      setAddScore(selectedSolved.score);
    } else {
      setAddScore(0);
    }
  }, [selected.length, selectedSolved.score, selectedSolved.used, setAddScore]);

  const selectedValid = useMemo(
    () => selected.length > 0 && selectedSolved.used === selected.length,
    [selected.length, selectedSolved.used],
  );

  const onThrow = useCallback(() => {
    const first = dice.every((d) => d.state === DieState.USED);

    const nextDice = dice.map((d) => {
      if (!first) {
        if (d.state === DieState.USED) {
          return d;
        }
      }
      return {
        value: Math.floor(Math.random() * 6) + 1,
        state: DieState.THROWN,
      };
    });

    setStage(GameStage.THROWING);
    setDice(nextDice);
  }, [dice, setDice, setStage]);

  const onPick = useCallback(() => {
    const nextDice = dice.map((d) =>
      d.state === DieState.SELECTED ? { ...d, state: DieState.USED } : d,
    );

    setStage(GameStage.READY);
    setRunScore(runScore + addScore);
    setAddScore(0);
    setDice(nextDice);
  }, [addScore, dice, runScore, setAddScore, setDice, setRunScore, setStage]);

  const onBank = useCallback(() => {
    const nextPlayers = structuredClone(players);
    nextPlayers[currentPlayer].score += runScore;
    const nextDice = dice.map((d) => ({ ...d, state: DieState.USED }));

    setStage(GameStage.START);
    setPlayers(nextPlayers);
    setCurrentPlayer((currentPlayer + 1) % players.length);
    setRunScore(0);
    setAddScore(0);
    setDice(nextDice);
  }, [
    currentPlayer,
    dice,
    players,
    runScore,
    setAddScore,
    setCurrentPlayer,
    setDice,
    setPlayers,
    setRunScore,
    setStage,
  ]);

  const onNextPlayer = useCallback(() => {
    const nextDice = dice.map((d) => ({ ...d, state: DieState.USED }));

    setStage(GameStage.START);
    setCurrentPlayer((currentPlayer + 1) % players.length);
    setRunScore(0);
    setAddScore(0);
    setDice(nextDice);
  }, [
    currentPlayer,
    dice,
    players.length,
    setAddScore,
    setCurrentPlayer,
    setDice,
    setRunScore,
    setStage,
  ]);

  const onSelectDie = useCallback(
    (i) => {
      const d = dice[i];
      let state;
      if (d.state === DieState.THROWN) {
        state = DieState.SELECTED;
      } else if (d.state === DieState.SELECTED) {
        state = DieState.THROWN;
      } else {
        state = d.state;
      }
      setDice([
        ...dice.slice(0, i),
        { value: d.value, state },
        ...dice.slice(i + 1),
      ]);
    },
    [dice, setDice],
  );

  useEffect(() => {
    if (stage === GameStage.THROWING) {
      const unused = dice.filter((d) => d.state !== DieState.USED);
      const unusedSolved = solve(unused.map((d) => d.value));

      if (unusedSolved.used === 0) {
        setStage(GameStage.LOSE);
      } else {
        setStage(GameStage.SELECTING);
      }
    }
  }, [dice, setStage, stage]);

  return (
    <>
      <Table
        stage={stage}
        dice={dice}
        selectedValid={selectedValid}
        onSelectDie={onSelectDie}
      />
      <div>{players[currentPlayer].name}</div>
      <div>
        Score: {players[currentPlayer].score}
        Run: {runScore}
        {addScore ? `+${addScore}` : null}
      </div>
      <ControlBar
        stage={stage}
        runScore={runScore}
        selectedValid={selectedValid}
        onThrow={onThrow}
        onPick={onPick}
        onBank={onBank}
        onNextPlayer={onNextPlayer}
      />
    </>
  );
}
