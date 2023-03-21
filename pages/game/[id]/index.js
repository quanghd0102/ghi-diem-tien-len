import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Pane, Heading, Badge, Button } from "evergreen-ui";
import findIndex from "lodash/findIndex";
import find from "lodash/find";
import filter from "lodash/filter";
import map from "lodash/map";
import Layout from "@/components/layout";
import { setScore } from "../../../redux/game";

const highestScore = 3;

const GameDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.game.currentGame);
  const gameId = useSelector((state) => state.game.gameId);
  const listPlayer = useSelector((state) => state.game.listPlayers);
  const [listWinner, setListWinner] = useState([]);

  useEffect(() => {
    if (!currentGame) router.push("/game");
  }, []);

  const onSetWinner = (playerId) => () => {
    setListWinner([...listWinner, playerId]);
  };

  const onClear = () => {
    setListWinner([]);
  };

  const onSeeResult = () => {
    const listScore = listWinner.map((item, index) => ({
      score: highestScore - index,
      ...find(listPlayer, (player) => player.id === item),
    }));
    const listPlayerRejected = filter(
      listPlayer,
      (p) => !find(listWinner, (winnerId) => winnerId === p.id)
    );
    dispatch(
      setScore({
        currentGame,
        score: [
          ...listScore,
          ...map(listPlayerRejected, (playerRejected) => ({
            ...playerRejected,
            score: highestScore * -1,
          })),
        ],
      })
    );
    router.push(`/game/${gameId}/result`);
  };

  return (
    <Layout>
      <Pane className="text-center">
        <Heading size={600} marginTop={15} marginBottom={40}>
          Ván bài thứ{" "}
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
        <div className="grid grid-cols-2 gap-4 place-content-center h-full">
          {listPlayer.map((player) => (
            <div className="relative" key={player.id}>
              {findIndex(listWinner, (item) => item === player.id) !== -1 && (
                <div className="w-full h-full flex absolute justify-center items-center backdrop-brightness-50">
                  <span className="text-white text-6xl w-1/2 text-center">
                    {findIndex(listWinner, (item) => item === player.id) + 1}
                  </span>
                </div>
              )}
              <Badge
                color={player.color}
                className="bg-blend-lighten hover:bg-blend-darken"
                style={{
                  height: "25vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
                onClick={onSetWinner(player.id)}
              >
                {player.name}
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="m-auto text-center flex flex-col justify-center items-center">
        <Pane>
          <Heading size={100} marginTop={40} marginBottom={15}>
            Hãy chọn tên người chơi theo thứ tự thắng cuộc
          </Heading>
        </Pane>
        <Button
          appearance="primary"
          intent="success"
          width={250}
          onClick={onSeeResult}
        >
          Ok
        </Button>
        <Button marginTop={15} intent="danger" width={250} onClick={onClear}>
          Clear
        </Button>
      </div>
    </Layout>
  );
};

export default GameDetail;
