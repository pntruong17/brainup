import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { gamelib } from "@/libs/gamelib";
import PregameModal from "@/games/comps/PregameModal";

const Game = () => {
  const router = useRouter();
  const [slug, setSlug] = useState(null);
  const [game, setGame] = useState(null);
  const [visibleModal, setVisibleModal] = useState(true);

  useEffect(() => {
    if (router.query.game) {
      setSlug(router.query.game);
    }
  }, [router.query.game]);

  useEffect(() => {
    if (slug) {
      const game = gamelib.find((game) => game.Slug === slug);
      setGame(game);
    }
  }, [slug]);

  useEffect(() => {
    if (game) {
      setVisibleModal(true);
    }
  }, [game]);

  return (
    <>
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
    </>
  );
};

export default Game;
