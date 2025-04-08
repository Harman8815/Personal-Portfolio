import React from 'react'
import {
  Cloud,
  renderSimpleIcon,
  fetchSimpleIcons,
} from 'react-icon-cloud'

const useIcons = (slugs) => {
  const [icons, setIcons] = React.useState(null)

  React.useEffect(() => {
    fetchSimpleIcons({ slugs }).then(setIcons)
  }, [])

  if (icons) {
    return Object.values(icons.simpleIcons).map((icon) =>
      renderSimpleIcon({
        icon,
        size: 42,
        aProps: {
          key: icon.slug,
          onClick: (e) => e.preventDefault(),
          className: 'transition-transform duration-300 ease-in-out hover:scale-150',
        },
      })
    )
  }

  return <a>Loading</a>
}

const slugs = [
  "javascript", "python", "java",
  "typescript", "html5", "css3", "react", "redux",
  "nodedotjs", "express", "flask", "socketdotio", "threedotjs", "mui",
  "mongodb", "mysql", "bootstrap", "tailwindcss", "sass",
  "docker", "netlify", "github", "postman", "vercel", "tensorflow", "pytorch",
  "pandas", "numpy"
]

const Temo = () => {
  const icons = useIcons(slugs)

  return (
    <div className="w-full h-[500px] flex items-center justify-center bg-primary">
      <Cloud
        options={{
          rotateSpeed: 0.1,          // ⬅️ Slowed down
          maxSpeed: 0.2,             // ⬅️ Keep max speed low
          initial: [0.05, -0.05],    // Subtle tilt
          keep: true,
        }}
      >
        {icons}
      </Cloud>
    </div>
  )
}

export default Temo
