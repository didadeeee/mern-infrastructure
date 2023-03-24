import FSignUpForm from "./FSignUpForm";
import SignUpForm from "./SignUpForm";

export default function AuthPage() {
  return (
    <>
      <h1>AuthPage</h1>
      <h2>Signup Form</h2>
      <SignUpForm />
      <h2>FSignUpForm</h2>
      <FSignUpForm />
    </>
  );
}
