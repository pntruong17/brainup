import CountingAnimals from "@/kidgames/CountingAnimals";
import WhatColorName from "@/kidgames/WhatColorName";
export const kidgamelib = [
  {
    id: "kidgame000",
    tag: "count",
    name: "Counting Animals",
    slug: "counting-animals",
    desc: "let's count how many animals!?",
    context: "Are your ready?",
    image:
      "https://s.luyengame.net/categories/kids/78ede9626584c36515817160f36785a1.jpg",
    Game: <CountingAnimals />,
  },
  {
    id: "kidgame001",
    tag: "color",
    name: "What name color",
    slug: "what-name-color",
    desc: "let's tell name of color",
    context: "Are your ready?",
    image:
      "https://img.freepik.com/free-vector/hand-drawn-flat-design-hopscotch-template_52683-82158.jpg?w=1380&t=st=1681927821~exp=1681928421~hmac=eb4a1d8f6c92a73de0c0b0808b7f1cde7ded2baa48cfc603b555eb5a16da58e0",
    Game: <WhatColorName />,
  },
];
