import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";
import { isAuthenticationConfigured } from "@/lib/auth/config";
import "./login.css";

export const metadata: Metadata = {
  title: "Sign In | Future Minds",
  description: "Secure Future Minds account access.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  const configured = isAuthenticationConfigured();

  return (
    <main className="fm-login-page">
      <div className="fm-login-shell">
        <div className="fm-login-intro">
          <Link href="/" className="fm-login-back">
            ← Back to website
          </Link>

          <span className="fm-login-eyebrow">
            FUTURE MINDS / ACCOUNT ACCESS
          </span>

          <h1>
            Welcome
            <br />
            <span>back.</span>
          </h1>

          <p>
            A secure academic workspace for
            students, teachers and authorised
            administrators.
          </p>
        </div>

        <div className="fm-login-panel">
          <span className="fm-login-eyebrow">
            SECURE SIGN IN
          </span>

          <h2>Access your account</h2>

          {configured ? (
            <LoginForm />
          ) : (
            <div className="fm-login-unavailable">
              <h3>Account access is being prepared</h3>

              <p>
                The authentication service and database
                are not yet connected. Sign-in will be
                enabled after secure configuration and testing.
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
