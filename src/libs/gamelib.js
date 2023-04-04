import FastMatch from "@/games/FastMatch";
import MathGame from "@/games/MathGame";
import MemoryCardGame from "@/games/MemoryCardGame";
import FoodCollection from "@/games/FoodCollection";
import StarSearch from "@/games/StarSearch";
import Wordle from "@/games/Wordle";

export const gamelib = [
  {
    id: 1,
    Group: "Math",
    Name: "Math Game",
    Slug: "math-game",
    Desc: "Improve your mental math skills and enhance your speed and accuracy with this fast-paced calculation game!",
    Howplayed:
      "You are a quick thinker in math. Choose whether the calculation on the left or right side is greater or equal. Test your speed and accuracy in solving these equations!",
    PhotoURL: "/images/logogames/mathgame.png",
    ColorBG: "bg-_blue",
    Game: <MathGame />,
  },
  {
    id: 2,
    Group: "Memory",
    Name: "Memory Cards",
    Slug: "memory-card",
    Desc: "Boost your memory and concentration skills with this fun and challenging memory card game!",
    Howplayed:
      "This game may be familiar to you. Flip the cards over and find matching pairs. Test your memory and see how many pairs you can match before the time runs out!",
    PhotoURL: "/images/logogames/memorycard.png",
    ColorBG: "bg-_yellow",
    Game: <MemoryCardGame />,
  },
  {
    id: 3,
    Group: "Memory",
    Name: "Collect Food",
    Slug: "collect-food",
    Desc: "Enhance your memory and focus with this engaging and stimulating brain game!",
    Howplayed:
      "Remember the foods you selected previously. Do not repeat your choices, or the game will end. Test your memory and see how many rounds you can successfully complete!",
    PhotoURL: "/images/logogames/foodcollection.png",
    ColorBG: "bg-_pink",
    Game: <FoodCollection />,
  },
  {
    id: 4,
    Group: "Speed",
    Name: "Fast Match",
    Slug: "fast-match",
    Desc: "Speed Match exercises your brain’s ability to process information quickly and and accurately.",
    Howplayed:
      "Quickly select whether the current emoji icon you are viewing matches the previous one. Pay attention to the details and make your choice before time runs out!",
    PhotoURL: "/images/logogames/fastmatch.png",
    ColorBG: "bg-_orange",
    Game: <FastMatch />,
  },
  {
    id: 5,
    Group: "Attention",
    Name: "Diamond Search",
    Slug: "diamond-search",
    Desc: "Sharpen your concentration and improve your focus with this engaging game designed to boost your cognitive skills!",
    Howplayed:
      "Find the one and only diamond in this game! Search carefully, explore every corner, and don't give up until you find it. Start your adventure now!",
    PhotoURL: "/images/logogames/diamondsearching.png",
    ColorBG: "bg-_green",
    Game: <StarSearch />,
  },
  {
    id: 6,
    Group: "Language",
    Name: "Wordle",
    Slug: "wordle",
    Desc: "Sharpen your concentration and improve your focus with this engaging game designed to boost your cognitive skills!",
    Howplayed:
      "Find the one and only diamond in this game! Search carefully, explore every corner, and don't give up until you find it. Start your adventure now!",
    PhotoURL: "/images/logogames/diamondsearching.png",
    ColorBG: "bg-_green",
    Game: <Wordle />,
  },
];
