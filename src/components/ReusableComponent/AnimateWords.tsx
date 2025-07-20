/* eslint-disable prefer-const */
// import  SplitText  from "gsap"
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useEffect } from "react";


export const SplitTextAnimation = (className: HTMLDivElement) => {
  useEffect(() => {
  gsap.registerPlugin(SplitText);

  let splitText = new SplitText(className, {
    type: 'chars'
  })
  let chars = splitText.chars; 
  gsap.from(chars, {
    duration: 0.5,
    opacity: 0,
    y: 50,
    ease: 'back',
    stagger: 0.05,
    delay: 0.5
  });
},[])
}

export const AnimateContent = (className: HTMLDivElement) => {
  useEffect(() => {
  gsap.registerPlugin(SplitText);

  let splitText = new SplitText(className, {
    type: 'chars'
  })
  let chars = splitText.chars; 
  gsap.from(chars, {
    duration: 0.4,
    opacity: 0,
    y: 50,
    ease: 'back',
    stagger: 0.05,
    delay: 0.4
  });
},[])
}

export const AnimateFallingText = () => {
  useEffect(() => {
  gsap.fromTo(".card-info", {
    y: -1000,
  },
{
  y: 0,
  duration: 1.5,
  ease: "back",
  stagger: {
    each: 0.1,
    from: "start",
    amount: 0.5,
  },
  delay: 1
})
},[])
}
