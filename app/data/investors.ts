export type Investor = {
  image: string;
  materialColor: string;
  startX: number;
  parallaxSpeed: number;
  name: string;
  title?: string;
};

const DOCUMENT_IMAGE = "/assets/document/document-v2-1024.png";

export const INVESTORS: Investor[] = [
  { image: DOCUMENT_IMAGE, materialColor: "0xFFB829", startX: 1200, parallaxSpeed: 1.5, name: "Seedcamp" },
  {
    image: DOCUMENT_IMAGE,
    materialColor: "0x189B81",
    startX: -1000,
    parallaxSpeed: 0.5,
    name: "James Meekings",
    title: "Co-founder of Funding Circle",
  },
  { image: DOCUMENT_IMAGE, materialColor: "0xFFB829", startX: 1000, parallaxSpeed: 1, name: "Evening Fund" },
  { image: DOCUMENT_IMAGE, materialColor: "0x926AFF", startX: -1000, parallaxSpeed: -0.5, name: "Valia Ventures" },
  {
    image: DOCUMENT_IMAGE,
    materialColor: "0x926AFF",
    startX: 1000,
    parallaxSpeed: -1,
    name: "Roman Schumacher",
    title: "Co-founder & CPO at Personio",
  },
];
