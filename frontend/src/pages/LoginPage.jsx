import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { auth, googleProvider } from "../firebase/config";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) return setError("Nhập email và mật khẩu.");
    if (password.length < 6) return setError("Mật khẩu >= 6 ký tự.");

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate("/"); // login xong về home
    } catch (err) {
      // Hiện thông báo dễ hiểu hơn
      const code = err?.code || "";
      if (code === "auth/invalid-credential") setError("Sai email hoặc mật khẩu.");
      else if (code === "auth/user-not-found") setError("Không tìm thấy tài khoản.");
      else if (code === "auth/wrong-password") setError("Sai mật khẩu.");
      else setError(err?.message || "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      const code = err?.code || "";
      if (code === "auth/popup-closed-by-user") setError("Bạn đã đóng popup.");
      else setError(err?.message || "Đăng nhập Google thất bại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={{ marginTop: 0 }}>Login</h2>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ ...styles.googleBtn, ...(loading ? styles.disabled : null) }}
        >
          Continue with Google
        </button>

        <div style={styles.divider}>or</div>

        <form onSubmit={handleEmailLogin}>
          <div style={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="email"
            />
          </div>

          <div style={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              autoComplete="current-password"
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ ...styles.button, ...(loading ? styles.disabled : null) }}
          >
            {loading ? "Signing in..." : "Login"}
          </button>

          <p style={styles.small}>
            <Link to="/" style={styles.link}>Back Home</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
    padding: 16,
  },
  card: {
    background: "#222",
    padding: 24,
    borderRadius: 10,
    width: 320,
    color: "white",
    border: "1px solid rgba(255,255,255,0.12)",
  },
  googleBtn: {
    width: "100%",
    padding: 10,
    backgroundColor: "#333",
    color: "white",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 6,
    cursor: "pointer",
  },
  divider: {
    margin: "14px 0",
    textAlign: "center",
    opacity: 0.7,
    fontSize: 12,
  },
  inputGroup: {
    marginBottom: 12,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  input: {
    padding: 10,
    borderRadius: 6,
    border: "none",
    outline: "none",
  },
  button: {
    width: "100%",
    padding: 10,
    backgroundColor: "#4caf50",
    color: "white",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
    marginTop: 6,
  },
  disabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  error: {
    color: "#ff6b6b",
    margin: "8px 0 0",
    fontSize: 13,
  },
  small: {
    marginTop: 12,
    fontSize: 12,
    opacity: 0.8,
    textAlign: "center",
  },
  link: {
    color: "#9ad",
    textDecoration: "none",
  },
};
