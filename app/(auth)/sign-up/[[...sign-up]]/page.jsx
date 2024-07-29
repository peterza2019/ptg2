// pages/signup.js
import { SignUp } from "@clerk/nextjs";
import AuthLayout from "@/components/AuthLayout";

const SignUpPage = () => {
  return (
    <AuthLayout>
      <SignUp />
    </AuthLayout>
  );
};

export default SignUpPage;