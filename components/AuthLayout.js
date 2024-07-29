"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from "react";
import css from "@/styles/authLayout.module.css";
import Image from "next/image";
import SplashScreen from "./SplashScreen"; // Import the splash screen

export const metadata = {
  title: "Petstagram Login",
};

const AuthLayout = ({ children }) => {
  const [showSplash, setShowSplash] = useState(true); // State to control splash screen visibility

  useEffect(() => {
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, []);

  if (showSplash) {
    return <SplashScreen />; // Show splash screen if state is true
  }

  return (
    <div className={css.wrapper}>
      <div className={css.container}>
        <div className={css.right}>{children}</div>
        <div className={css.left}>
          <Image
            src="/images/auth.png"
            alt="branding-image"
            quality={100}
            width={800}
            height={880}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;