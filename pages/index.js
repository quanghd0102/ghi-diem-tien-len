import Lottie from "lottie-react";
import { Button } from "evergreen-ui";
import { useRouter } from "next/navigation";
import useEndedGame from "@/customHooks/useEndedGame";
import logoAnimation from "../assets/lottie-files/logo.json";
import titleImg from "@/assets/images/title.jpg";

export default function Home() {
  const router = useRouter();
  useEndedGame();

  const gotoNewGame = () => {
    router.push("/game");
  };
  return (
    <>
      <div className="min-h-screen">
        <div className="grid place-content-center h-screen">
          <div className="text-center mb-12">
            <Lottie
              animationData={logoAnimation}
              style={{ height: 200 }}
              loop={false}
            />
            <img
              src={titleImg.src}
              alt="Ghi điểm tiến lên"
              width={240}
              height={135}
              className="w-60 m-auto"
            />
            <Button
              appearance="primary"
              intent="success"
              height={56}
              width={250}
              onClick={gotoNewGame}
            >
              Bắt đầu
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
