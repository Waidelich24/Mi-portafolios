'use client';

export const LavaLampBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-60 blur-sm"
      >
        <source src="/lava-lamp.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Filtro de capa encima (opcional) */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/30 backdrop-blur-[1px]" />
    </div>
  );
};
