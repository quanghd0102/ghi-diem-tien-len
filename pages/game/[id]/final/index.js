import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { Pane, Heading, Badge, Table, HeartIcon } from "evergreen-ui";
import Lottie from "lottie-react";
import Layout from "@/components/layout";
import { setGameData } from "@/redux/game";
import { selectSummaryScore, selectScoreTable } from "@/redux/game/selector";
import { getGameDataFromFirebase } from "@/ultis/firebase";
import iconTrophy from "@/assets/lottie-files/trophy-winner.json";
import icon1st from "@/assets/lottie-files/1st.json";
import icon2nd from "@/assets/lottie-files/2nd.json";
import icon3rd from "@/assets/lottie-files/3rd.json";
import iconLoser from "@/assets/lottie-files/loser.json";

const GameFinal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const summaryScore = useSelector((state) => selectSummaryScore(state));
  const listScore = useSelector((state) => selectScoreTable(state));
  const listPlayers = useSelector((state) => state.game.listPlayers);
  const { id } = router.query;

  useEffect(() => {
    const getData = async () => {
      if (id) {
        const data = await getGameDataFromFirebase(id);
        if (data) dispatch(setGameData({ ...data, gameId: id }));
      }
    };

    getData();
  }, [id]);

  return (
    <Layout isHideScoreTable>
      <Pane className="text-center">
        <div>
          <Lottie animationData={iconTrophy} style={{ height: 200 }} />
        </div>
      </Pane>
      <div className="mt-[50px]">
        <div className="grid grid-cols-3 gap-x-2 gap-y-[50px] place-content-end h-full">
          {summaryScore[1] && (
            <div className="relative self-end" key={summaryScore[1]?.id}>
              <Badge
                color={summaryScore[1]?.color}
                className="bg-blend-lighten hover:bg-blend-darken"
                style={{
                  height: "190px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  minHeight: "135px",
                }}
              >
                <div className="flex flex-col justify-items-center mb-[-50px]">
                  <div className="absolute left-0 right-0 top-[-35px]">
                    <Lottie animationData={icon2nd} style={{ height: 100 }} />
                  </div>
                  <div>{summaryScore[1]?.name}</div>
                  <div>
                    <Badge marginTop={10}>
                      {summaryScore[1]?.summaryScore} điểm
                    </Badge>
                  </div>
                </div>
              </Badge>
            </div>
          )}
          {summaryScore[0] && (
            <div className="relative self-end" key={summaryScore[0]?.id}>
              <Badge
                color={summaryScore[0]?.color}
                className="bg-blend-lighten hover:bg-blend-darken"
                style={{
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  minHeight: "135px",
                }}
              >
                <div className="flex flex-col justify-items-center mb-[-50px]">
                  <div className="absolute left-0 right-0 top-[-35px]">
                    <Lottie animationData={icon1st} style={{ height: 100 }} />
                  </div>
                  <div>{summaryScore[0]?.name}</div>
                  <div>
                    <Badge marginTop={10}>
                      {summaryScore[0]?.summaryScore} điểm
                    </Badge>
                  </div>
                </div>
              </Badge>
            </div>
          )}
          {summaryScore[2] && (
            <div className="relative self-end" key={summaryScore[2]?.id}>
              <Badge
                color={summaryScore[2]?.color}
                className="bg-blend-lighten hover:bg-blend-darken"
                style={{
                  height: "140px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                  minHeight: "135px",
                }}
              >
                <div className="flex flex-col justify-items-center mb-[-50px]">
                  <div className="absolute left-0 right-0 top-[-35px]">
                    <Lottie animationData={icon3rd} style={{ height: 100 }} />
                  </div>
                  <div>{summaryScore[2]?.name}</div>
                  <div>
                    <Badge marginTop={10}>
                      {summaryScore[2]?.summaryScore} điểm
                    </Badge>
                  </div>
                </div>
              </Badge>
            </div>
          )}
        </div>
        <div className="mt-[50px]">
          {summaryScore[3] && (
            <div className="relative" key={summaryScore[3]?.id}>
              <Badge
                color={summaryScore[3]?.color}
                className="bg-blend-lighten hover:bg-blend-darken"
                style={{
                  height: "130px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "30px",
                }}
              >
                <div className="flex flex-col justify-items-center mb-[-50px]">
                  <div className="absolute left-0 right-0 top-[-35px]">
                    <Lottie animationData={iconLoser} style={{ height: 100 }} />
                  </div>
                  <div>{summaryScore[3]?.name}</div>
                  <div>
                    <Badge marginTop={10}>
                      {summaryScore[3]?.summaryScore} điểm
                    </Badge>
                  </div>
                </div>
              </Badge>
            </div>
          )}
        </div>
      </div>
      <div className="mt-[20px]">
        <Pane flex="1" background="tint1" padding={16}>
          <Table>
            <Table.Head className="!pr-0">
              <Table.TextHeaderCell className="min-w-[120px]" />
              {listPlayers.map((player) => (
                <Table.TextHeaderCell className="text-right" key={player.id}>
                  {player.name}
                </Table.TextHeaderCell>
              ))}
            </Table.Head>
            <Table.Body>
              {listScore.map((scores) => (
                <Table.Row key={scores.key}>
                  <Table.TextCell className="min-w-[120px]">
                    Ván thứ{" "}
                    <Badge
                      display="inline-flex"
                      color="red"
                      style={{
                        marginTop: "-3px",
                      }}
                    >
                      {scores.key === 1 ? "nhất" : scores.key}
                    </Badge>
                  </Table.TextCell>
                  {listPlayers.map((player) => (
                    <Table.TextCell
                      isNumber
                      className="text-right"
                      key={player.id}
                    >
                      {scores?.[player.id]?.score || 0}
                    </Table.TextCell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Pane>
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
      </div>
    </Layout>
  );
};

export default GameFinal;
