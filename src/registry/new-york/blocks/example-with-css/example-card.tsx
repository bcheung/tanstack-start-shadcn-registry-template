import { useId } from "react";
import "./example-card.css";

export function ExampleCard() {
  const emailId = useId();
  const passwordId = useId();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <p className="login-subtitle">
          Please enter your credentials to continue
        </p>
        <form className="login-form">
          <div className="form-group">
            <label htmlFor={emailId}>Email</label>
            <input
              id={emailId}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor={passwordId}>Password</label>
            <input
              id={passwordId}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="login-button">
              Sign In
            </button>
          </div>
          <div className="form-footer">
            <a href="/forgot-password" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
