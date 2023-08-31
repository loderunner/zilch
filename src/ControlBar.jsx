import { GameStage } from './game';

import './ControlBar.css';

/**
 *
 * @param {{
 *  stage: string,
 *  runScore: number,
 *  selectedValid: boolean,
 *  onThrow: () => {},
 *  onPick: () => {},
 *  onBank: () => {},
 *  onNextPlayer: () => {}
 * }} props
 */
export default function ControlBar({
  stage,
  runScore,
  selectedValid,
  onThrow,
  onPick,
  onBank,
  onNextPlayer,
}) {
  const buttons = [];

  switch (stage) {
    case GameStage.START:
    case GameStage.READY:
      buttons.push(
        <button key="throw" onClick={onThrow}>
          Throw!
        </button>,
      );
      if (runScore >= 300) {
        buttons.push(
          <button key="bank" onClick={onBank}>
            Bank
          </button>,
        );
      }
      break;
    case GameStage.THROWING:
      break;
    case GameStage.SELECTING:
      buttons.push(
        <button key="pick" onClick={onPick} disabled={!selectedValid}>
          Pick
        </button>,
      );
      break;
    case GameStage.LOSE:
      buttons.push(
        <button key="next" onClick={onNextPlayer}>
          Next player
        </button>,
      );
      break;
  }

  return (
    <div className="control-bar flex flex-row justify-center bg-red-50">
      {buttons}
    </div>
  );
}
