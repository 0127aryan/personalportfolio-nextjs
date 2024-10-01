"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true when component mounts
  }, []);

  useEffect(() => {
    if (isMounted) {
      // Only animate after the component has mounted
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration,
          delay: stagger(0.2),
        }
      );
    }
  }, [isMounted, animate, filter, duration]); // Dependencies for the animation

  const renderWords = () => (
    <motion.div ref={scope}>
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className={`${idx > 3 ? 'text-purple' : 'dark:text-white text-black'} opacity-0`}
          style={{
            filter: filter ? "blur(10px)" : "none", // Initial blur filter
          }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </motion.div>
  );

  return (
    <div className={cn("font-bold", className)}>
      <div className="my-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {isMounted ? renderWords() : <span style={{ opacity: 0 }}>Loading...</span>} {/* Render placeholder until mounted */}
        </div>
      </div>
    </div>
  );
};
