import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetGame } from "@/redux/game";

const useEndedGame = () => {
  const currentGameId = useSelector((state) => state.game.gameId);
  const isEnded = useSelector((state) => state.game.isEnded);
  const dispatch = useDispatch();

  useEffect(() => {
    if (currentGameId && isEnded) {
      dispatch(resetGame());
    }
  }, []);
};

export default useEndedGame;
