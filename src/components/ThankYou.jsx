import React, { useEffect, useRef } from "react";
import NET from "vanta/dist/vanta.net.min";
import * as THREE from "three";
import { TypeAnimation } from "react-type-animation";

const ThankYou = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaRef.current) return;

    const vantaEffect = NET({
      el: vantaRef.current,
      THREE,
      color: 0x00ffcc,
      backgroundColor: 0x03041F,
      maxDistance: 25,
      spacing: 25,
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <section
      ref={vantaRef}
      className="flex justify-center items-center w-full h-screen bg-gray-900 text-white pointer-events-none overflow-x-hidden"
    >
      <div className="text-[180px] ">
      <TypeAnimation
        sequence={["Thank You!", 1000, "", 1000,"Visit Again", 1000]}
        speed={{type: 'keyStrokeDelayInMs', value: 250}}
        deletionSpeed={{type: "keyStrokeDelayInMs", value: 100}}
        repeat={Infinity}
        omitDeletionAnimation={false}
        // cursor={false}
      /></div>
    </section>
  );
};

export default ThankYou;
