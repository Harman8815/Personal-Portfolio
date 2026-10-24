"use client";

import React, { useState, useEffect } from "react";
import { Cloud, renderSimpleIcon, fetchSimpleIcons } from "react-icon-cloud";

// Global cache to share preloaded icons
let globalIconCache = null;

const SkillCloud = React.memo(({ slugs }) => {
  const [icons, setIcons] = useState(globalIconCache);
  const [isLoading, setIsLoading] = useState(!globalIconCache);

  useEffect(() => {
    // If icons are already preloaded globally, use them
    if (globalIconCache) {
      setIcons(globalIconCache);
      setIsLoading(false);
      return;
    }

    // Otherwise fetch them
    setIsLoading(true);
    fetchSimpleIcons({ slugs })
      .then((fetchedIcons) => {
        globalIconCache = fetchedIcons; // Cache globally
        setIcons(fetchedIcons);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching icons:', error);
        setIsLoading(false);
      });
  }, [slugs]);

  if (isLoading) {
    return (
      <div className="w-full flex justify-center items-center min-h-[300px]">
        <div className="text-cyan-500/40 font-mono text-xs animate-pulse">Loading Icons...</div>
      </div>
    );
  }

  if (icons) {
    const iconElements = Object.values(icons.simpleIcons).map((icon) =>
      renderSimpleIcon({
        icon,
        size: 72,
        aProps: {
          key: icon.slug,
          onClick: (e) => e.preventDefault(),
          className:
            "transition-transform duration-300 ease-in-out hover:scale-150",
        },
      }),
    );

    return (
      <div className="w-full flex justify-center items-center min-h-[300px]">
        <Cloud
          options={{
            rotateSpeed: 0.1,
            maxSpeed: 0.2,
            initial: [0.05, -0.05],
            keep: true,
            wheelZoom: false,
          }}
        >
          {iconElements}
        </Cloud>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center items-center min-h-[300px]">
      <div className="text-cyan-500/20 font-mono text-xs">No icons loaded</div>
    </div>
  );
});

SkillCloud.displayName = "SkillCloud";

export default SkillCloud;
