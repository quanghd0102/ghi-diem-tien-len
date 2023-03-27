import React, { useState } from "react";
import {
  TimelineBarChartIcon,
  SideSheet,
  Pane,
  Heading,
  Table,
  Badge,
} from "evergreen-ui";
import { useSelector } from "react-redux";
import { selectScoreTable } from "../../redux/game/selector";
import titleImg from "../../assets/images/title.jpg";

const Layout = ({ children, footer, isHideScoreTable = false }) => {
  const [isShown, setIsShown] = useState(false);
  const listScore = useSelector((state) => selectScoreTable(state));
  const listPlayers = useSelector((state) => state.game.listPlayers);

  return (
    <div className="flex flex-col pb-[15px]">
      <div className="w-28 m-auto flex items-center w-full">
        <div className="w-[62px]" />
        <img
          src={titleImg.src}
          alt="Ghi điểm tiến lên"
          width={112}
          height={62}
          className="w-[112px] m-auto"
        />
        {!isHideScoreTable && (
          <TimelineBarChartIcon
            onClick={() => setIsShown(true)}
            marginLeft={15}
            marginRight={15}
            size={25}
            color="muted"
            className="cursor-pointer"
          />
        )}
        {isHideScoreTable && <div className="w-[62px]" />}
      </div>
      <div className="px-4 flex-1">{children}</div>
      {footer && <div>{footer}</div>}

      <SideSheet
        width="80vw"
        className="max-w-2xl"
        preventBodyScrolling
        isShown={isShown}
        onCloseComplete={() => setIsShown(false)}
        containerProps={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
        }}
      >
        <Pane zIndex={1} flexShrink={0} elevation={0} backgroundColor="white">
          <Pane padding={16}>
            <Heading size={600}>Bảng điểm</Heading>
          </Pane>
        </Pane>
        <Pane flex="1" overflowY="scroll" background="tint1" padding={16}>
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
      </SideSheet>
    </div>
  );
};

export default Layout;
