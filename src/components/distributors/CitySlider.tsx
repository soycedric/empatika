import { motion } from 'framer-motion';
import type { Region } from '@/components/distributors/types';
import { REGIONS } from '@/components/distributors/types';

interface CitySliderProps {
  activeRegion: Region;
  onChange: (region: Region) => void;
}

const CitySlider = ({ activeRegion, onChange }: CitySliderProps) => {
  return (
    <div
      className="inline-flex border-2 border-foreground relative"
      role="tablist"
      aria-label="Seleccionar ciudad"
    >
      {/* Indicador deslizante */}
      <motion.div
        className="absolute top-0 bottom-0 bg-foreground z-0"
        layoutId="city-slider-indicator"
        animate={{
          left: `${(REGIONS.findIndex((r) => r.id === activeRegion) / REGIONS.length) * 100}%`,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        style={{ width: `${100 / REGIONS.length}%` }}
      />

      {REGIONS.map((region) => {
        const isActive = activeRegion === region.id;
        return (
          <button
            key={region.id}
            id={`city-tab-${region.id}`}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(region.id)}
            className={[
              'relative z-10 px-5 py-2 font-display text-sm tracking-wider transition-colors duration-150 select-none cursor-pointer',
              isActive ? 'text-background' : 'text-foreground hover:bg-foreground/10',
            ].join(' ')}
          >
            <span className="mr-1.5 text-base" aria-hidden="true">
              {region.emoji}
            </span>
            {region.label}
          </button>
        );
      })}
    </div>
  );
};

export default CitySlider;
