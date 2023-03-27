import { doc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
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
