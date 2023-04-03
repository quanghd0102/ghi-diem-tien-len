import { createSelector } from "reselect";
import reduce from "lodash/reduce";
import find from "lodash/find";
import sortBy from "lodash/sortBy";
import map from "lodash/map";
import keyBy from "lodash/keyBy";

const selectCurrentGame = (state) => state.game.currentGame;
const selectListScore = (state) => state.game.listScores;
const selectListPlayers = (state) => state.game.listPlayers;

export const selectCurrentScore = createSelector(
  selectCurrentGame,
  selectListScore,
  (currentGame, listScore) =>
    listScore?.[currentGame ? currentGame - 1 : 0]?.scores || []
);

export const selectSummaryScore = createSelector(
  selectListPlayers,
  selectListScore,
  (listPlayers, listScore) => {
    const summary = listPlayers.map((player) => {
      const summaryScore = reduce(
        listScore,
        (sum, scoresData) => {
          if (!scoresData) return sum;

          const tempPlayer = find(
            scoresData.scores,
            (score) => score.id === player.id
          );

          if (!tempPlayer) return sum;

          return sum + tempPlayer.score;
        },
        0
      );
      return { ...player, summaryScore };
    });
    const sortedPlayer = sortBy(summary, (player) => -player.summaryScore);
    const loserScore = sortedPlayer[3]?.summaryScore || 0;
    const listSummaryPlayers = map(sortedPlayer, (player, index) => {
      if (index === 0) {
        if (player.summaryScore === loserScore) {
          player.order = -1;
        } else player.order = 1;
      } else {
        const prePlayer = sortedPlayer[index - 1];
        if (player.summaryScore === loserScore) {
          player.order = -1;
        } else if (player.summaryScore === prePlayer.summaryScore) {
          player.order = prePlayer.order;
        } else {
          player.order = prePlayer.order + 1;
        }
      }

      return player;
    });
    return listSummaryPlayers;
  }
);

export const selectScoreTable = createSelector(selectListScore, (listScore) =>
  map(listScore, (scoresData) => ({
    ...keyBy(scoresData.scores, "id"),
    key: scoresData.gameNumber + 1,
  }))
);
