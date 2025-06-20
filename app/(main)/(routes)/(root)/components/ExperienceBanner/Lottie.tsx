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

  return (
    <div className="flex w-full max-w-[300px] md:max-w-[400px] mx-auto">
      {View}
    </div>
  );
};

export default Lottie;
