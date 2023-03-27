import { createSlice } from "@reduxjs/toolkit";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import shuffle from "lodash/shuffle";
import {
  saveListPlayersToFirebase,
  saveScoresToFirebase,
  setIsEndedGameToFirebase,
} from "@/ultis/firebase";

const listColors = [
  "green",
  "blue",
  "red",
  "orange",
  "purple",
  "yellow",
  "teal",
];
const initialState = {
  gameId: undefined,
  currentGame: 0,
  listScores: [],
  listPlayers: [],
  isStarted: false,
  isEnded: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isStarted = true;
      state.currentGame = 1;
    },
    setGameId: (state, { payload }) => {
      state.gameId = payload;
    },
    goNextGame: (state) => {
      state.currentGame += 1;
    },
    setPlayersAndStartGame: (state, { payload }) => {
      const selectedColors = shuffle(listColors).splice(0, 4);
      const listPlayers = map(payload.listNewPlayer, (name, index) => ({
        id: uniqueId("player_"),
        name,
        color: selectedColors[index],
      }));
      state.listPlayers = listPlayers;
      state.isStarted = true;
      state.currentGame = 1;
      state.gameId = payload.gameId;
      saveListPlayersToFirebase(payload.gameId, listPlayers);
    },
    setScore: (state, { payload }) => {
      const currentGame = payload.currentGame
        ? payload.currentGame - 1
        : state.currentGame - 1;
      const data = {
        gameNumber: currentGame,
        scores: payload.score,
      };
      state.listScores[currentGame] = data;
      saveScoresToFirebase(state.gameId, data);
    },
    setScoreAndNextGame: (state, { payload }) => {
      const currentGame = payload.currentGame
        ? payload.currentGame - 1
        : state.currentGame - 1;
      const data = {
        gameNumber: currentGame,
        scores: payload.score,
      };
      state.listScores[currentGame] = data;
      state.currentGame += 1;
      saveScoresToFirebase(state.gameId, data);
    },
    setEndGame: (state) => {
      state.isEnded = true;
      setIsEndedGameToFirebase(state.gameId);
    },
    resetGame: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  startGame,
  setGameId,
  goNextGame,
  setPlayersAndStartGame,
  setScore,
  setScoreAndNextGame,
  resetGame,
  setEndGame,
} = gameSlice.actions;

export default gameSlice.reducer;
