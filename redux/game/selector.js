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
    return sortBy(summary, (player) => -player.summaryScore);
  }
);

export const selectScoreTable = createSelector(selectListScore, (listScore) =>
  map(listScore, (scoresData) => ({
    ...keyBy(scoresData.scores, "id"),
    key: scoresData.gameNumber + 1,
  }))
);
