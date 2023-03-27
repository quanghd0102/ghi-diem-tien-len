import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import map from "lodash/map";
import { firebaseDB } from "../configs/firebase";

export const saveListPlayersToFirebase = async (gameId, listPlayers) => {
  if (!gameId) return;

  await setDoc(doc(firebaseDB, "games", gameId), {
    listPlayers,
    scores: [],
    isEnded: false,
  });
};

export const saveScoresToFirebase = async (gameId, score) => {
  if (!gameId) return;

  const scoreRef = doc(firebaseDB, "games", gameId);
  await updateDoc(scoreRef, {
    scores: arrayUnion(JSON.stringify(score)),
  });
};

export const setIsEndedGameToFirebase = async (gameId) => {
  if (!gameId) return;

  const scoreRef = doc(firebaseDB, "games", gameId);
  await updateDoc(scoreRef, {
    isEnded: true,
  });
};

export const getGameDataFromFirebase = async (gameId) => {
  const scoreRef = doc(firebaseDB, "games", gameId);
  const docSnap = await getDoc(scoreRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return {
      isEnded: data.isEnded,
      listPlayers: data.listPlayers,
      listScores: map(data.scores, (score) => JSON.parse(score)),
    };
  }
  return null;
};
