import React, { useState, useEffect } from "react";
import {
  Pane,
  Heading,
  TextInputField,
  Button,
  Alert,
  Dialog,
} from "evergreen-ui";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import compact from "lodash/compact";
import map from "lodash/map";
import trim from "lodash/trim";
import { v4 as uuidv4 } from "uuid";
import Layout from "@/components/layout";
import useEndedGame from "@/customHooks/useEndedGame";
import { setPlayersAndStartGame, resetGame } from "../../redux/game";

const Game = () => {
  useEndedGame();
  const router = useRouter();
  const dispatch = useDispatch();
  const currentGameId = useSelector((state) => state.game.gameId);
  const [listPlayer, setListPlayer] = useState([]);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isShownContinueDialog, setIsShownContinueDialog] = useState(false);

  useEffect(() => {
    if (currentGameId) {
      setIsShownContinueDialog(true);
    }
  }, []);

  const gotoNewGame = () => {
    const listNewPlayer = compact(map(listPlayer, trim));
    if (listNewPlayer.length < 4) {
      setIsInvalid(true);
      return;
    }

    const gameId = uuidv4();
    setIsInvalid(false);
    dispatch(setPlayersAndStartGame({ listNewPlayer, gameId }));
    router.push(`/game/${gameId}`);
  };

  const onSetPlayerName = (index) => (e) => {
    const newListPlayers = [...listPlayer];
    newListPlayers[index] = e.target.value;
    setListPlayer([...newListPlayers]);
  };

  const removeOldGameData = () => {
    dispatch(resetGame());
    setIsShownContinueDialog(false);
  };

  const continueOldGame = () => {
    router.push(`/game/${currentGameId}`);
    setIsShownContinueDialog(false);
  };

  return (
    <Layout>
      <Pane className="text-center">
        <Heading size={800} marginTop={15} marginBottom={40}>
          Tạo ván bài mới
        </Heading>

        <Dialog
          isShown={isShownContinueDialog}
          shouldCloseOnOverlayClick={false}
          title="Tiếp tục những ván bài cũ?"
          onCloseComplete={() => setIsShownContinueDialog(false)}
          cancelLabel="Tiếp tục ván cũ"
          confirmLabel="Bắt đầu trận mới"
          onConfirm={removeOldGameData}
          onCancel={continueOldGame}
        >
          Hình như bạn đang có những ván bài cũ chơi chưa xong. Bạn có muốn tiếp
          tục những ván bài cũ không hay bắt đầu những ván bài mới?
        </Dialog>
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
        <Alert
          intent="danger"
          title="Chưa thể bắt đầu ván bài!"
          marginBottom={15}
        >
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
