import React, { useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import Autoplay from "embla-carousel-autoplay";
import AutoScroll from "embla-carousel-auto-scroll";
import { useAutoplay } from "./EmblaCarouselAutoplay";
import { useAutoplayProgress } from "./EmblaCarouselAutoplayProgress.jsx";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import ProjectCard from "../ProjectCard.jsx";
import "../css/base.css";
import "../css/embla.css";
import certificatesData from "../../../data/certificates.js";
import clsx from "clsx";

const EmblaCarousel = (props) => {
  const { slides, options, certificates } = props;
  const progressNode = useRef(null);

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({
      playOnInit: true,
      delay: 3000,
      jump: true,
      stopOnMouseEnter: true,
      stopOnInteraction: false,
    }),
    WheelGesturesPlugin(),
    AutoScroll({ playOnInit: certificates }),
  ]);

  useEffect(() => {
    if (!emblaApi || !certificates) return;

    const emblaNode = emblaApi.containerNode();

    const handleMouseEnter = () => emblaApi.plugins().autoScroll?.stop();
    const handleMouseLeave = () => emblaApi.plugins().autoScroll?.play();

    emblaNode.addEventListener("mouseenter", handleMouseEnter);
    emblaNode.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      emblaNode.removeEventListener("mouseenter", handleMouseEnter);
      emblaNode.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [emblaApi, certificates]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);
const MP1='assets/MP1.png';
const MP2=MP1;
  const data = certificates
    ? certificatesData
    : [
        {
          title: "Project 1",
          description: "This is a description of project 1.",
          link: "#",
          backgroundImage: MP1,
        },
        {
          title: "Project 2",
          description: "This is a description of project 2.",
          link: "#",
          backgroundImage: MP2,
        },
        {
          title: "Project 3",
          description: "This is a description of project 3.",
          link: "#",
          backgroundImage: MP1,
        },
        {
          title: "Project 4",
          description: "This is a description of project 4.",
          link: "#",
          backgroundImage: MP2,
        },
      ];

  return (
    <div className={clsx("embla", certificates && "embla-certificate")}>
      <div
        className={clsx("embla__viewport", certificates && "mb-20")}
        ref={emblaRef}
      >
        <div className="embla__container">
          {data.map((item, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number z-10">
                {!certificates ? (
                  <ProjectCard {...item} index={index} />
                ) : (
                  <div className="certificate relative rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-107 hover:z-20 hover:ring-6 hover:ring-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]">
                    <img
                      src={item}
                      alt={`Certificate ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {!certificates && (
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <div
          className={`embla__progress`.concat(
            showAutoplayProgress ? "" : " embla__progress--hidden"
          )}
        >
         
            <div className="embla__progress__bar" ref={progressNode} />
        
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {autoplayIsPlaying ? "Stop" : "Start"}
        </button>
      </div>  )}
    </div>
  );
};

export default EmblaCarousel;
