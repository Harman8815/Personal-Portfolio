import React from 'react'
import EmblaCarousel from './majorProject/embla/EmblaCarousel';
import certificatesData from '../data/certificates';
const OPTIONS = { 
  loop: true,
  speed: 0.2,
  align: 'center',
  skipSnaps: false,
  containScroll: 'trimSnaps',
  draggable: true,
  dragFree: false,
  inViewThreshold: 0.5,  };
const SLIDE_COUNT = certificatesData.length;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());


const Certifications = () => {
  return (
    <section
      id="certifications"
      className=" major-projects-section bg-primary w-full text-white  py-12"
    >
     <h2 className="text-4xl tablet:text-5xl laptop:text-6xl font-bold mb-6 text-center">
        Certifications
      </h2>

      <EmblaCarousel slides={SLIDES} options={OPTIONS} certificates={true} />
    </section>
  )
}

export default Certifications