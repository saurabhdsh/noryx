import { lazy, Suspense, useEffect, useState } from "react";
import { AuroraBackground } from "../components/AuroraBackground";
import { Navbar } from "../components/Navbar";
import { PageLoader } from "../components/PageLoader";
import { ScrollProgress } from "../components/ScrollProgress";
import { Hero } from "../sections/Hero";

const ProblemSolution = lazy(() =>
  import("../sections/ProblemSolution").then((m) => ({ default: m.ProblemSolution })),
);
const HowItWorks = lazy(() =>
  import("../sections/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);
const Features = lazy(() =>
  import("../sections/Features").then((m) => ({ default: m.Features })),
);
const Evaluators = lazy(() =>
  import("../sections/Evaluators").then((m) => ({ default: m.Evaluators })),
);
const AgentPlatforms = lazy(() =>
  import("../sections/AgentPlatforms").then((m) => ({ default: m.AgentPlatforms })),
);
const Pricing = lazy(() =>
  import("../sections/Pricing").then((m) => ({ default: m.Pricing })),
);
const Comparison = lazy(() =>
  import("../sections/Comparison").then((m) => ({ default: m.Comparison })),
);
const Integrations = lazy(() =>
  import("../sections/Integrations").then((m) => ({ default: m.Integrations })),
);
const SocialProof = lazy(() =>
  import("../sections/SocialProof").then((m) => ({ default: m.SocialProof })),
);
const FinalCTA = lazy(() =>
  import("../sections/FinalCTA").then((m) => ({ default: m.FinalCTA })),
);
const Footer = lazy(() => import("../sections/Footer").then((m) => ({ default: m.Footer })));
const CustomCursor = lazy(() =>
  import("../components/CustomCursor").then((m) => ({ default: m.CustomCursor })),
);

function SectionFallback() {
  return <div className="min-h-[200px]" aria-hidden />;
}

export function MarketingPage() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setTimeout(() => setReady(true), 400);
    });
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {!ready && <PageLoader ready={ready} />}
      <ScrollProgress />
      <Suspense fallback={null}>
        <CustomCursor />
      </Suspense>
      <AuroraBackground />
      <Navbar />
      <main
        id="main-content"
        className={`transition-opacity duration-500 ${ready ? "opacity-100" : "opacity-0"}`}
      >
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <div className="content-auto">
          <ProblemSolution />
          <HowItWorks />
          <Features />
          <Evaluators />
          <AgentPlatforms />
          <Pricing />
          <Comparison />
          <Integrations />
          <SocialProof />
          <FinalCTA />
          </div>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
