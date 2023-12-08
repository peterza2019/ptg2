import { ClerkProvider } from "@clerk/nextjs";
import { Public_Sans } from "next/font/google";
import StyledComponentsRegistry from "@/lib/AntRegistry";
import "./globals.css";
import "@/styles/typography.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        signIn: {
          variables: { colorPrimary: "#F9AA11" },
        },
        signUp: {
          variables: { colorPrimary: "#F9AA11" },
        },
      }}
    >
      <html lang="en">
        <body className={publicSans.className}>
          <StyledComponentsRegistry>
            {children}
            </StyledComponentsRegistry>
        </body>
      </html>
    </ClerkProvider>
  );
}
