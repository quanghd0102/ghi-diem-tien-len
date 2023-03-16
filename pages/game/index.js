import React from "react";
import { Pane, Heading, TextInputField, Button } from "evergreen-ui";
import { useRouter } from "next/navigation";
import Layout from "@/components/layout";

const Game = () => {
  const router = useRouter();
  const gotoNewGame = () => {
    router.push("/game");
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
        />
        <TextInputField
          label="Tên người chơi thứ hai"
          required
          placeholder="Tên người thứ nhất"
        />
        <TextInputField
          label="Tên người chơi thứ ba"
          required
          placeholder="Tên người thứ nhất"
        />
        <TextInputField
          label="Tên người chơi thứ tư"
          required
          placeholder="Tên người thứ nhất"
        />
      </div>
      <div>
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
