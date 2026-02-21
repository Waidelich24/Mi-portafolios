"use client";

import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import animationData from "./deploy.json"; // tu animación de 🚀

interface Props {
  isVisible: boolean;
  reduceMotion: boolean;
  animationTrigger: number;
  maxDuration?: number; // duración máxima en segundos
}

export const LottieDeployIcon = ({
  isVisible,
  reduceMotion,
  animationTrigger,
  maxDuration = 3,
}: Props) => {
  const lottieRef = useRef<any>(null);

  // Calculamos la velocidad según duración deseada
  const speed =
    animationData.fr && animationData.op
      ? Math.max((animationData.op - (animationData.ip || 0)) / animationData.fr / maxDuration, 1)
      : 1;

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

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
