import { createSlice } from "@reduxjs/toolkit";
import map from "lodash/map";
import uniqueId from "lodash/uniqueId";
import shuffle from "lodash/shuffle";

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
  currentGame: 0,
  listScores: [],
  listPlayers: [],
  isStarted: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state) => {
      state.isStarted = true;
      state.currentGame = 1;
    },
    goNextGame: (state) => {
      state.currentGame += 1;
    },
    setPlayersAndStartGame: (state, { payload }) => {
      const selectedColors = shuffle(listColors).splice(0, 4);
      state.listPlayers = map(payload, (name, index) => ({
        id: uniqueId("player_"),
        name,
        color: selectedColors[index],
      }));
      state.isStarted = true;
      state.currentGame = 1;
    },
    setScore: (state, { payload }) => {
      state.listScores[payload.currentGame || state.currentGame] =
        payload.score;
    },
    setScoreAndNextGame: (state, { payload }) => {
      state.listScores[payload.currentGame || state.currentGame] =
        payload.score;
      state.currentGame += 1;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  startGame,
  goNextGame,
  setPlayersAndStartGame,
  setScore,
  setScoreAndNextGame,
} = gameSlice.actions;

export default gameSlice.reducer;
