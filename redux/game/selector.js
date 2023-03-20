import { createSelector } from "reselect";
import reduce from "lodash/reduce";
import find from "lodash/find";
import sortBy from "lodash/sortBy";

const selectCurrentGame = (state) => state.game.currentGame;
const selectListScore = (state) => state.game.listScores;
const selectListPlayers = (state) => state.game.listPlayers;

export const selectCurrentScore = createSelector(
  selectCurrentGame,
  selectListScore,
  (currentGame, listScore) => listScore[currentGame] || []
);

export const selectSummaryScore = createSelector(
  selectListPlayers,
  selectListScore,
  (listPlayers, listScore) => {
    const summary = listPlayers.map((player) => {
      console.log("player:", player);
      const summaryScore = reduce(
        listScore,
        (sum, scores) => {
          if (!scores) return sum;

          const tempPlayer = find(scores, (score) => score.id === player.id);

          if (!tempPlayer) return sum;

          console.log("tempPlayer.score:", tempPlayer);
          return sum + tempPlayer.score;
        },
        0
      );
      console.log("summaryScore:", summaryScore);
      return { ...player, summaryScore };
    });
    return sortBy(summary, (player) => -player.summaryScore);
  }
);
