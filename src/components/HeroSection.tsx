
import { useRef } from "react";

import { SplitTextAnimation } from "./ReusableComponent/AnimateWords";
import { AnimateContent } from "./ReusableComponent/AnimateWords";
import ColoringText from "./ReusableComponent/ColoringText";
import Button from "./ReusableComponent/Button";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  SplitTextAnimation(textRef.current as HTMLDivElement || ".split-text");
  AnimateContent(paragraphRef.current as HTMLDivElement || ".content-paragraph");

 return(
    <div className="lg:mt-32 mt-16 flex justify-center items-center md:h-full h-screen">
      <div className="flex flex-col gap-12 h-screen">
        <h1 className="split-text px-6 mx-auto md:w-full text-3xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-8xl text-center font-extrabold" ref={textRef}>
           Book Your Event {" "}
           <ColoringText 
             className="text-purple-600"
             content=" Make"
           /> <br /> It Unforgettable
        </h1>
        <p className={` content-paragraph max-w-3/4 mx-auto md:text-xl text-sm text-center`}
        ref={paragraphRef}
        >
          Connect with like-minded people, discover new passions, and create <br />
          memories that last a lifetime.
        </p>
        <div className="flex items-center justify-center">
          <Link to="/events">
            <Button
              className={`bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200`}
            >
              Explore Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
