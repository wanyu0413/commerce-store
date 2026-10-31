import { Cute_Font, Josefin_Sans, Montserrat } from "next/font/google";

// Site-name display font: https://fonts.google.com/specimen/Cute+Font
export const cuteFont = Cute_Font({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

// Default site typeface: https://fonts.google.com/specimen/Montserrat
export const montserrat = Montserrat({
  weight: "variable",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

// Hero headline: https://fonts.google.com/specimen/Josefin+Sans
export const josefinSans = Josefin_Sans({
  weight: "700",
  subsets: ["latin"],
  display: "swap",
});
