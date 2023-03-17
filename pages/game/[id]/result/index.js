import React, { useState } from "react";
import {
  Pane,
  Heading,
  TextInputField,
  Button,
  Alert,
  Badge,
} from "evergreen-ui";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import find from "lodash/find";
import map from "lodash/map";
import parseInt from "lodash/parseInt";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/components/layout";
import {
  setPlayersAndStartGame,
  setScoreAndNextGame,
} from "../../../redux/game";
import { selectCurrentScore } from "../../../redux/game/selector";

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.game.currentGame);
  const gameId = useSelector((state) => state.game.gameId);
  const currentScore = useSelector((state) => selectCurrentScore(state));
  const [isInvalid, setIsInvalid] = useState(false);
  const [listNewScore, setListNewScore] = useState([...currentScore]);

  const onSetNewScore = (playerId) => (e) => {
    const { value } = e.target;
    setListNewScore(
      map(listNewScore, (data) =>
        data.id === playerId
          ? { ...data, score: value === "" ? value : parseInt(value) }
          : data
      )
    );
  };

  const goToNextGame = () => {
    console.log("listNewScore:", listNewScore);
    if (find(listNewScore, (score) => score.score === "")) {
      setIsInvalid(true);
      return;
    }

    setIsInvalid(false);
    dispatch(
      setScoreAndNextGame({
        currentGame,
        score: [...listNewScore],
      })
    );
    router.push(`/game/${gameId}`);
  };

  return (
    <Layout>
      <Pane className="text-center">
        <Heading size={800} marginTop={15} marginBottom={40}>
          Kết quả ván bài thứ{" "}
          <Badge
            display="inline-flex"
            color="red"
            style={{
              fontSize: "20px",
              padding: "5px 15px",
              height: "25px",
              marginTop: "-5px",
            }}
          >
            {currentGame === 1 ? "nhất" : currentGame}
          </Badge>
        </Heading>
      </Pane>
      <div>
        {listNewScore.map((score) => (
          <TextInputField
            label={
              <>
                Người chơi <Badge color={score.color}>${score.name}</Badge>
              </>
            }
            required
            value={score.score}
            onChange={onSetNewScore(score.id)}
          />
        ))}
      </div>
      {isInvalid && (
        <Alert
          intent="danger"
          title="Thiếu điểm của người chơi"
          marginBottom={20}
        >
          Hãy nhập đủ điểm của các người chơi trước khi bắt đầu ván mới ^^
        </Alert>
      )}
      <div className="m-auto text-center">
        <Button
          appearance="primary"
          intent="success"
          width={250}
          onClick={goToNextGame}
        >
          Tiếp tục ván mới
        </Button>
      </div>
    </Layout>
  );
};

export default Game;
