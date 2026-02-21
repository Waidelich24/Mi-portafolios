"use client";

import { motion } from "framer-motion";
import { IdeaIcon } from "./icons/IdeaIcon";
import { LottieBrushIcon } from "./icons/LottieBrushIcon";
import { LottieGearIcon } from "./icons/GearIcon";
import { LottieDeployIcon } from "./icons/Deployicon";
import { useEffect, useState } from "react";

interface PipelineIconProps {
  type: 'idea' | 'design' | 'development' | 'deploy';
  label: string;
  index: number;
  isActive: boolean;
  reduceMotion: boolean;
}

export const PipelineIcon = ({
  type,
  label,
  isActive,
  reduceMotion,
}: PipelineIconProps) => {

  const [localTrigger, setLocalTrigger] = useState(0);

  // 🔥 Se anima SOLO cuando le toca
  useEffect(() => {
    if (isActive && !reduceMotion) {
      setLocalTrigger(prev => prev + 1);
    }
  }, [isActive, reduceMotion]);

  const commonProps = {
    isVisible: isActive,
    reduceMotion,
    animationTrigger: localTrigger
  };

  const renderIcon = () => {
    switch(type) {
      case 'idea':
        return <IdeaIcon {...commonProps} />;
      case 'design':
        return <LottieBrushIcon {...commonProps} />;
      case 'development':
        return <LottieGearIcon {...commonProps} />;
      case 'deploy':
        return <LottieDeployIcon {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isActive ? 1 : 0.5, y: isActive ? 0 : 10 }}
      transition={{ duration: 0.5 }}
      className="group relative flex flex-col items-center gap-3 text-center"
    >
      <div className="relative flex h-16 w-16 items-center justify-center">
        {renderIcon()}
      </div>
      
      <p className="
        text-sm 
        font-medium 
        tracking-wide 
        text-gray-700 
        dark:text-gray-300
        transition-colors
      ">
        {label}
      </p>
    </motion.div>
  );
};
