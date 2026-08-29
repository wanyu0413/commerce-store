import { Cute_Font, Source_Sans_3 } from "next/font/google";

// Site-name display font: https://fonts.google.com/specimen/Cute+Font
export const cuteFont = Cute_Font({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Default site typeface: https://fonts.google.com/specimen/Source+Sans+3
export const sourceSans3 = Source_Sans_3({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-sans-3",
});
