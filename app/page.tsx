import BackgroundMesh from "./components/BackgroundMesh";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import MarqueeTicker from "./components/MarqueeTicker";
import PillarsSticky from "./components/PillarsSticky";
import BigChartScene from "./components/BigChartScene";
import Process from "./components/Process";
import FloatingReports from "./components/FloatingReports";
import Proof from "./components/Proof";
import GiantWordmark from "./components/GiantWordmark";
import Testimonial from "./components/Testimonial";
import Compliance from "./components/Compliance";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <BackgroundMesh />
      <ScrollProgress />
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <MarqueeTicker />
        <PillarsSticky />
        <BigChartScene />
        <Process />
        <FloatingReports />
        <Proof />
        <GiantWordmark />
        <Testimonial />
        <Compliance />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
