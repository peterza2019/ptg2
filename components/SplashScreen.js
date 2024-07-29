// components/SplashScreen.js
import React from "react";
import Image from "next/image";
import css from "@/styles/splashScreen.module.css"; // Create a CSS module for styling

const SplashScreen = () => {
  return (
    <div className={css.splashWrapper}>
      <Image
        src="/images/splash.png" // Replace with your splash image path
        alt="Splash Image"
        quality={100}
        width={800}
        height={800}
      />
      <h1 className={css.title}>Welcome to Petstagram</h1>
    </div>
  );
};

export default SplashScreen;
