import { AuthWrapper } from "../components/Auth/AuthWrapper";
import { LoginForm } from "../components/Auth/LoginForm";

export const Login = () => {
  return (
    <AuthWrapper
      title={"Welcome Back"}
      subTitle={"Please enter your credentials below"}
    >
      <LoginForm />
    </AuthWrapper>
  );
};
