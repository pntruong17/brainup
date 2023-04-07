import NavbarFixed from "@/components/NavbarFixed";
import React, { useState, useEffect, useRef } from "react";
import MemoryCard from "./comps/MemoryCard";
import { motion } from "framer-motion";

const MemoryCardGame = () => {
  //index là level mà người chơi phải vượt wa, giá trị mỗi index là số cặp lá bài được chia`
  const editlevel = [
    4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  ];
  const firstStart = useRef(true);
  const [cardlist, setCardlist] = useState(
    [
      { icon: "🥩", id: 0 },
      { icon: "🍇", id: 1 },
      { icon: "🍈", id: 2 },
      { icon: "🍉", id: 3 },
      { icon: "🍊", id: 4 },
      { icon: "🍋", id: 5 },
      { icon: "🍌", id: 6 },
      { icon: "🍍", id: 7 },
      { icon: "🥭", id: 8 },
      { icon: "🍎", id: 9 },
      { icon: "🍏", id: 10 },
      { icon: "🍐", id: 11 },
      { icon: "🍑", id: 12 },
      { icon: "🍒", id: 13 },
      { icon: "🍓", id: 14 },
      { icon: "🥝", id: 15 },
      { icon: "🍅", id: 16 },
      { icon: "🥥", id: 17 },
      { icon: "🥑", id: 18 },
      { icon: "🍆", id: 19 },
      { icon: "🥔", id: 20 },
      { icon: "🥕", id: 21 },
      { icon: "🌽", id: 22 },
      { icon: "🌶️", id: 23 },
      { icon: "🥒", id: 24 },
      { icon: "🥬", id: 25 },
      { icon: "🥦", id: 26 },
      { icon: "🧄", id: 27 },
      { icon: "🧅", id: 28 },
      { icon: "🍄", id: 29 },
      { icon: "🥜", id: 30 },
      { icon: "🍟", id: 31 },
      { icon: "🍕", id: 32 },
      { icon: "🌭", id: 33 },
      { icon: "🍣", id: 34 },
    ].sort(() => Math.random() - 0.5)
  );

  const [lv, setLv] = useState(0);
  const [items, setItems] = useState([]);
  const [prev, setPrev] = useState(-1);
  const [hidePlayButton, setHidePlay] = useState(false);
  const [canClick, setCanClick] = useState(true);
  const [flips, setFlips] = useState();

  const shuffleCards = () => {
    setHidePlay(true);
    setFlips(editlevel[lv] * 3 + 3);
    // sẽ lấy từ cardlist số cặp icon , lấy từ vị trí index 0-> editlevel[lv]
    const firstCards = cardlist.slice(0, editlevel[lv]);
    //nhân đôi lá bài lên (tạo cặp bài giống nhau) -> sort: để trộn -> map: để tạo mãng mới
    const shuffleCards = [...firstCards, ...firstCards]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, stat: "", icon: card.icon }));
    // lọc lại số cards ở đúng level
    //truyền vào state mới để quản lý
    setItems(shuffleCards);
  };
  function check(current) {
    if (
      items[current].icon == items[prev].icon &&
      items[current] != items[prev]
    ) {
      playMatch();
      items[current].stat = "correct";
      items[prev].stat = "correct";
      setItems([...items]);
      setPrev(-1);
      setCanClick(true);
    } else {
      items[current].stat = "wrong";
      items[prev].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[current].stat = "";
        items[prev].stat = "";
        setItems([...items]);
        setPrev(-1);
        setCanClick(true);
      }, 750);
    }
  }
  const playMatch = () => {
    new Audio(
      "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/match.wav"
    ).play();
  };
  function playFlip() {
    new Audio(
      "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/flip.wav"
    ).play();
  }
  function playVictory() {
    new Audio(
      "https://raw.githubusercontent.com/WebDevSimplified/Mix-Or-Match/master/Assets/Audio/victory.wav"
    ).play();
  }

  function handleClick(id) {
    if (items[id].stat === "correct" || !canClick) {
      return;
    }
    playFlip();
    setFlips(flips - 1);
    if (prev === -1) {
      items[id].stat = "active";
      setItems([...items]);
      setPrev(id);
    } else {
      setCanClick(false);
      check(id);
    }
  }

  const handleWinGame = () => {
    if (flips > 0) {
      if (lv >= editlevel.length - 1) {
        setLv(editlevel.length - 1);
      } else {
        setLv((prev) => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }
    const isAllCorrect = items.findIndex((item) => item.stat !== "correct");
    if (isAllCorrect < 0) {
      setHidePlay(false);

      handleWinGame();
    } else {
    }
  }, [items]);
  return (
    <>
      <NavbarFixed />
      <div className="flex w-full h-screen bg-_dark justify-center items-center px-3 py-10">
        <div className="bg-white rounded-md flex flex-col justify-between max-w-xl h-full sm:h-auto overflow-hidden">
          <div className="flex flex-nowrap justify-between p-4 border-b bg-slate-50">
            <h4 className="border text-_pink rounded-full px-2 text-center text-xs font-medium">
              {"Total cards: " + items.length}
            </h4>
            <h2 className="px-2 text-center text-sm font-bold text-_darkblue">
              Level: {lv + 1}
            </h2>
            <h4 className="border rounded-full px-2 text-center text-xs font-medium text-_pink">
              Flips remaining: {flips > 0 ? flips : "0"}
            </h4>
          </div>

          <div className="p-1">
            <div className="flex flex-wrap justify-center">
              {items.map((item, index) => (
                <MemoryCard
                  key={item.id}
                  item={item}
                  id={item.id}
                  handleCardClick={handleClick}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-center my-4">
            {!hidePlayButton && (
              <motion.button
                Layout
                className="px-5 py-2 border rounded-full bg-_blue text-white text-sm font-semibold"
                onClick={() => shuffleCards()}
              >
                {"Play Level " + (lv + 1)}
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MemoryCardGame;
