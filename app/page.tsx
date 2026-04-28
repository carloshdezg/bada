import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import HeroSection       from "@/components/sections/HeroSection";
import TrustStrip        from "@/components/sections/TrustStrip";
import GarantiasSection  from "@/components/sections/GarantiasSection";
import SolucionesSection from "@/components/sections/SolucionesSection";
import ServicesGrid      from "@/components/sections/ServicesGrid";
import HowItWorks        from "@/components/sections/HowItWorks";
import ComparativaSection from "@/components/sections/ComparativaSection";
import CoverageSection   from "@/components/sections/CoverageSection";
import SocialProof       from "@/components/sections/SocialProof";
import FinalCTA          from "@/components/sections/FinalCTA";

import {
  METRICS,
  GARANTIAS,
  SOLUCIONES,
  SERVICES,
  STEPS,
  COMPARATIVA_ROWS,
  COVERAGE_STATES,
} from "@/lib/data";

import { STATS_EN_NUMEROS, LOGOS_CLIENTES } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrustStrip metrics={METRICS} />
      <GarantiasSection garantias={GARANTIAS} />
      <SolucionesSection soluciones={SOLUCIONES} />
      <ServicesGrid services={SERVICES} />
      <HowItWorks steps={STEPS} />
      <ComparativaSection rows={COMPARATIVA_ROWS} />
      <CoverageSection states={COVERAGE_STATES} />
      <SocialProof stats={STATS_EN_NUMEROS} logos={LOGOS_CLIENTES} />
      <FinalCTA />
      <Footer />
    </>
  );
}
