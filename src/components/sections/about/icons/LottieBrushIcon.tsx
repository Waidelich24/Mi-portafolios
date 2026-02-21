"use client";

import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import animationData from "./brush.json";

interface Props {
  isVisible: boolean;
  reduceMotion: boolean;
  animationTrigger: number;
}

export const LottieBrushIcon = ({
  isVisible,
  reduceMotion,
  animationTrigger,
}: Props) => {
  const lottieRef = useRef<any>(null);

  useEffect(() => {
    if (isVisible && !reduceMotion && lottieRef.current) {
      lottieRef.current.stop();
      lottieRef.current.play();
    }
  }, [animationTrigger, isVisible, reduceMotion]);

  return (
<div className="w-40 h-40 relative top-10">
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
      />
    </div>
  );
};
