"use client";

import Lottie from "lottie-react";
import { useEffect, useRef } from "react";
import animationData from "./gear.json"; // tu animación de engranaje

interface Props {
  isVisible: boolean;
  reduceMotion: boolean;
  animationTrigger: number;
  maxDuration?: number; // opcional: duración máxima en segundos
}

export const LottieGearIcon = ({
  isVisible,
  reduceMotion,
  animationTrigger,
  maxDuration = 2,
}: Props) => {
  const lottieRef = useRef<any>(null);

  // Calculamos el speed
  const speed =
    animationData.fr && animationData.op
      ? Math.max((animationData.op - (animationData.ip || 0)) / animationData.fr / maxDuration, 1)
      : 1;

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed); // ⚡ aquí aplicamos la velocidad
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
