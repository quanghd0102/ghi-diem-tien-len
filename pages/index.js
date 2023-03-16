import Head from "next/head";
import Image from "next/image";
import Lottie from "lottie-react";
import { Button } from "evergreen-ui";
import { useRouter } from "next/navigation";

import logoAnimation from "@/assets/lottie-files/logo.json";
import titleImg from "@/assets/images/title.jpg";

export default function Home() {
  const router = useRouter();

  const gotoNewGame = () => {
    router.push("/game");
  };
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen">
        <div className="grid place-content-center h-screen">
          <div className="text-center mb-12">
            <Lottie
              animationData={logoAnimation}
              loop
              style={{ height: 200 }}
            />
            <Image
              src={titleImg}
              alt="Ghi điểm tiến lên"
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