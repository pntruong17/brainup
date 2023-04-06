import React, { useEffect, useState } from "react";
import { gamelib } from "@/libs/gamelib";
import PregameModal from "@/games/comps/PregameModal";
import LayoutEmpty from "@/components/LayoutEmpty";

const Game = ({ slug }) => {
  const [game, setGame] = useState(gamelib.find((game) => game.Slug === slug));
  const [visibleModal, setVisibleModal] = useState(true);
  useEffect(() => {
    const game = gamelib.find((game) => game.Slug === slug);
    console.log(game.Name);
  }, []);
  return (
    <>
      <LayoutEmpty
        pageMeta={{
          title: game.Name + " | Brain Up Game",
        }}
      >
        {game && (
          <PregameModal
            nameGame={game.Name}
            gameDesc={game.Desc}
            Howplayed={game.Howplayed}
            colorBG={game.ColorBG}
            photoURL={game.PhotoURL}
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
          />
        )}
        <div>{game && <div>{game.Game}</div>}</div>
      </LayoutEmpty>
    </>
  );
};

export const getStaticPaths = async () => {
  const _paths = gamelib.map((game) => ({
    params: { game: game.Slug },
  }));
  return {
    paths: _paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const slug = params.game;
  return {
    props: {
      slug: slug,
    },
    revalidate: 10,
  };
};

export default Game;
