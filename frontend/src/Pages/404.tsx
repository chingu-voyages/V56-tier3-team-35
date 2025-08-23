import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => (
    <div
        style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f8fafc",
            color: "#1e293b",
            fontFamily: "Segoe UI, sans-serif",
            textAlign: "center",
            padding: "2rem",
        }}
    >
        <h1 style={{ fontSize: "6rem", margin: 0, fontWeight: 700 }}>404</h1>
        <h2 style={{ fontSize: "2rem", margin: "1rem 0" }}>Page Not Found</h2>
        <p style={{ marginBottom: "2rem", color: "#64748b" }}>
            Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
            to="/dashboard"
            style={{
                padding: "0.75rem 1.5rem",
                background: "#2563eb",
                color: "#fff",
                borderRadius: "0.5rem",
                textDecoration: "none",
                fontWeight: 500,
                boxShadow: "0 2px 8px rgba(37,99,235,0.1)",
                transition: "background 0.2s",
            }}
        >
            Go Home
        </Link>
    </div>
);

export default NotFoundPage;