export type TeamMember = {
  slideId: string;
  image: string;
  role: string;
  name: string;
  twitter: string;
  linkedin: string;
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    slideId: "Haroun Hickman",
    image: "/images/team/haroun.jpg",
    role: "Co Founder & CEO",
    name: "Haroun Hickman",
    twitter: "https://twitter.com/HarounHickman",
    linkedin: "https://www.linkedin.com/in/harounhickman",
  },
  {
    slideId: "Poppy Reid",
    image: "/images/team/poppy.jpg",
    role: "Product Design Lead",
    name: "Poppy Reid",
    twitter: "https://twitter.com/ReidPoppy",
    linkedin: "https://www.linkedin.com/in/poppy-reid-484087121",
  },
  {
    slideId: "Joel Kang",
    image: "/images/team/joel.jpg",
    role: "Co Founder & CTO",
    name: "Joel Kang",
    twitter: "https://twitter.com/_joel_kang_",
    linkedin: "https://www.linkedin.com/in/joelkang",
  },
];

// Легасі team-slider.js очікує слайди, повторені кілька разів підряд (безшовний
// луп-ефект); оригінальна розмітка повторювала трьох учасників по 6 разів кожного.
export const SLIDE_REPEAT_COUNT = 6;
