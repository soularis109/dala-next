export type Investor = {
  image: string;
  materialColor: string;
  startX: number;
  parallaxSpeed: number;
  name: string;
  title?: string;
};

export const INVESTORS: Investor[] = [
  { image: "/images/investors/1.png", materialColor: "0xFFB829", startX: 1200, parallaxSpeed: 1.5, name: "Seedcamp" },
  {
    image: "/images/investors/2.png",
    materialColor: "0x189B81",
    startX: -1000,
    parallaxSpeed: 0.5,
    name: "James Meekings",
    title: "Co-founder of Funding Circle",
  },
  { image: "/images/investors/3.png", materialColor: "0xFFB829", startX: 1000, parallaxSpeed: 1, name: "Evening Fund" },
  { image: "/images/investors/4.png", materialColor: "0x926AFF", startX: -1000, parallaxSpeed: -0.5, name: "Valia Ventures" },
  {
    image: "/images/investors/5.png",
    materialColor: "0x926AFF",
    startX: 1000,
    parallaxSpeed: -1,
    name: "Roman Schumacher",
    title: "Co-founder & CPO at Personio",
  },
];
