
"use client";

import { useLottie } from "lottie-react";
import animationData from "@/app/(main)/(routes)/(root)/components/ExperienceBanner/animation.json";

const Lottie = () => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);

  return <div className="flex mx-auto w-[400px] h-[400px]">{View}</div>;
};

export default Lottie;