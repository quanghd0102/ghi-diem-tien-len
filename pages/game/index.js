import React, { useState } from "react";
import { Pane, Heading, TextInputField, Button, Alert } from "evergreen-ui";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import find from "lodash/find";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/components/layout";
import { setPlayersAndStartGame, setGameId } from "../redux/game";

const Game = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [listPlayer, setListPlayer] = useState([]);
  const [isInvalid, setIsInvalid] = useState(false);
  const gotoNewGame = () => {
    if (find(listPlayer, (player) => !player)) {
      setIsInvalid(true);
      return;
    }

    const gameId = uuidv4();
    setIsInvalid(false);
    dispatch(setPlayersAndStartGame(listPlayer));
    dispatch(setGameId(gameId));
    router.push(`/game/${gameId}`);
  };

  const onSetPlayerName = (index) => (e) => {
    const newListPlayers = [...listPlayer];
    newListPlayers[index] = e.target.value;
    setListPlayer([...newListPlayers]);
  };

  return (
    <Layout>
      <Pane className="text-center">
        <Heading size={800} marginTop={15} marginBottom={40}>
          Tạo ván bài mới
        </Heading>
      </Pane>
      <div>
        <TextInputField
          label="Tên người chơi thứ nhất"
          required
          placeholder="Tên người thứ nhất"
          value={listPlayer[0]}
          onChange={onSetPlayerName(0)}
        />
        <TextInputField
          label="Tên người chơi thứ hai"
          required
          placeholder="Tên người thứ hai"
          value={listPlayer[1]}
          onChange={onSetPlayerName(1)}
        />
        <TextInputField
          label="Tên người chơi thứ ba"
          required
          placeholder="Tên người thứ ba"
          value={listPlayer[2]}
          onChange={onSetPlayerName(2)}
        />
        <TextInputField
          label="Tên người chơi thứ tư"
          required
          placeholder="Tên người thứ tư"
          value={listPlayer[3]}
          onChange={onSetPlayerName(3)}
        />
      </div>
      {isInvalid && (
        <Alert intent="danger" title="Chưa thể bắt đầu ván bài!">
          Hãy nhập đủ tên các người chơi trước khi bắt đầu ^^
        </Alert>
      )}
      <div className="m-auto text-center">
        <Button
          appearance="primary"
          intent="success"
          width={250}
          onClick={gotoNewGame}
        >
          Bắt đầu ván bài
        </Button>
      </div>
    </Layout>
  );
};

export default Game;
