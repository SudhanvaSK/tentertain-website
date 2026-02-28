import { useState } from "react";
import ButterflyLanding from "@/components/ButterflyLanding";

const Index = () => {
  const [hoveredSide, setHoveredSide] = useState<"none" | "left" | "right">("none");

  return (
    <ButterflyLanding hoveredSide={hoveredSide} onHoverChange={setHoveredSide} />
  );
};

export default Index;
