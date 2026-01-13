import React from "react";
import { Cloud, renderSimpleIcon, fetchSimpleIcons } from "react-icon-cloud";

const useIcons = (slugs) => {
  const [icons, setIcons] = React.useState(null);

  React.useEffect(() => {
    fetchSimpleIcons({ slugs }).then(setIcons);
  }, []);

  if (icons) {
    return Object.values(icons.simpleIcons).map((icon) =>
      renderSimpleIcon({
        icon,
        size: 72,
        aProps: {
          key: icon.slug,
          onClick: (e) => e.preventDefault(),
          className:
            "transition-transform duration-300 ease-in-out hover:scale-150",
        },
      })
    );
  }

  return <a>Loading...</a>;
};

const SkillCloud = ({ slugs }) => {
  const icons = useIcons(slugs);

  return (
    <div className="w-full flex justify-center items-center">
      <Cloud
        options={{
          rotateSpeed: 0.1,
          maxSpeed: 0.2,
          initial: [0.05, -0.05],
          keep: true,
          wheelZoom: false, 
        }}
      >
        {icons}
      </Cloud>
    </div>
  );
};

export default SkillCloud;
