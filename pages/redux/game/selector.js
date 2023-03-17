import { createSelector } from "reselect";

const selectCurrentGame = (state) => state.game.currentGame;
const selectListScore = (state) => state.game.listScores;
export const selectCurrentScore = createSelector(
  selectCurrentGame,
  selectListScore,
  (currentGame, listScore) => listScore[currentGame] || []
);
