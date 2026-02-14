import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Home</h1>
      <p>
        <Link to="/login">Go to Login</Link>
      </p>
    </div>
  );
}