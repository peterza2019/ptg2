// pages/signin.js
import { SignIn } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

const SignInPage = () => {
  return (
    <AuthLayout>
      <SignIn />
    </AuthLayout>
  );
};

export default SignInPage;
