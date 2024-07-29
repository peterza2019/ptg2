import React from "react";
import css from "@/styles/authLayout.module.css";
import Image from "next/image";
export const metadata = {
  title: "Petstagram Login",
};
const AuthLayout = ({ children }) => {
  return (
    <div className={css.wrapper}>
      <sdiv className={css.container}>
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
      </sdiv>
    </div>
  );
};

export default AuthLayout;
