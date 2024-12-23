"use client";

import { memo } from "react";
import Particles from "react-particles";
import type { Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";

const SnowfallBackground = memo(() => {
  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  return (
    <Particles
      id="particles"
      init={particlesInit}
      options={{
        fullScreen: {
          enable: true,
          zIndex: 0,
        },
        particles: {
          number: {
            value: 50,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#fff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 2,
            direction: "bottom",
            straight: false,
            random: true,
            outModes: "out",
          },
        },
        background: {
          opacity: 0,
        },
        detectRetina: true,
        smooth: true,
      }}
      className="particles-snow"
    />
  );
});

SnowfallBackground.displayName = "SnowfallBackground";

export default SnowfallBackground;
