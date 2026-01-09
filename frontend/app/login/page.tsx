import AuthForm from "../../components/AuthForm";

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-lg">
      <AuthForm mode="login" />
    </div>
  );
}
