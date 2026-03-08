import { Carousel } from "components/carousel";
import { ThreeItemGrid } from "components/grid/three-items";
import { Features } from "components/layout/features";
import Footer from "components/layout/footer";
import Hero from "components/layout/hero";

export const metadata = {
  description:
    "High-performance ecommerce store built with Next.js, Vercel, and Shopify.",
  openGraph: {
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <ThreeItemGrid />
      <Carousel />
      <Footer />
    </>
  );
}
