import { motion } from "motion/react";

interface ColoringTextProps {
  content: string;
  className?: string;
}
const ColoringText = ({
  content,
  className
}: ColoringTextProps) => {
  return (
   
      <motion.span className={`${className} `} 
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        ease: "linear",
      }}
      style={{ backgroundSize: "200% 200%" }}
      >
         {content}
      </motion.span>
  )
}

export default ColoringText;