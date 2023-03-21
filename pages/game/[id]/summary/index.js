import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Pane, Heading, Badge, Button, HeartIcon } from "evergreen-ui";
import Lottie from "lottie-react";
import Layout from "@/components/layout";
import { resetGame } from "../../../../redux/game";
import { selectSummaryScore } from "../../../../redux/game/selector";
import iconTrophy from "@/assets/lottie-files/trophy-winner.json";
import icon1st from "@/assets/lottie-files/1st.json";
import icon2nd from "@/assets/lottie-files/2nd.json";
import icon3rd from "@/assets/lottie-files/3rd.json";
import iconLoser from "@/assets/lottie-files/loser.json";

const GameSummary = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentGame = useSelector((state) => state.game.currentGame);
  const summaryScore = useSelector((state) => selectSummaryScore(state));
  const [listWinner, setListWinner] = useState([]);

  useEffect(() => {
    if (!currentGame) router.push("/game");
  }, []);

  const onSetWinner = (playerId) => () => {
    setListWinner([...listWinner, playerId]);
  };

  const onReset = () => {
    dispatch(resetGame());
    router.push(`/`);
  };

  return (
    <Layout>
      <Pane className="text-center">
        <div>
          <Lottie animationData={iconTrophy} style={{ height: 200 }} />
        </div>
        <Heading size={600} marginTop={15} marginBottom={40}>
          Tổng kết toàn bộ ván bài
        </Heading>
      </Pane>
      <div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-[50px] place-content-center h-full">
          {summaryScore.map((player, index) => (
            <div className="relative" key={player.id}>
              <Badge
                color={player.color}
                className="bg-blend-lighten hover:bg-blend-darken"
                style={{
                  height: "15vh",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  minHeight: "135px",
                }}
                onClick={onSetWinner(player.id)}
              >
                <div className="flex flex-col justify-items-center mb-[-50px]">
                  <div className="absolute left-0 right-0 top-[-35px]">
                    {index === 0 && (
                      <Lottie animationData={icon1st} style={{ height: 100 }} />
                    )}
                    {index === 1 && (
                      <Lottie animationData={icon2nd} style={{ height: 100 }} />
                    )}
                    {index === 2 && (
                      <Lottie animationData={icon3rd} style={{ height: 100 }} />
                    )}
                    {index === 3 && (
                      <Lottie
                        animationData={iconLoser}
                        style={{ height: 100 }}
                      />
                    )}
                  </div>
                  <div>{player.name}</div>
                  <div>
                    <Badge marginTop={10}>{player.summaryScore} điểm</Badge>
                  </div>
                </div>
              </Badge>
            </div>
          ))}
        </div>
      </div>
      <div className="m-auto text-center">
        <Pane>
          <Heading size={100} marginTop={40} marginBottom={15}>
            Made by QuangHD with love
            <div className="flex justify-center mt-[10px]">
              <HeartIcon color="danger" marginRight={4} marginLeft={4} />
              <HeartIcon color="danger" marginRight={4} marginLeft={4} />
              <HeartIcon color="danger" marginRight={4} marginLeft={4} />
            </div>
          </Heading>
        </Pane>
        <Button
          appearance="primary"
          intent="success"
          width={250}
          onClick={onReset}
        >
          Bắt đầu lại những ván mới
        </Button>
      </div>
    </Layout>
  );
};

export default GameSummary;
