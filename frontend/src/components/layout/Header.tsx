function Header() {
  return (
    <header
      style={{
        height: "70px",
        background: "#1E293B",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        color: "#F8FAFC",
      }}
    >
      <h2>AI-Assisted Threat Detection Dashboard</h2>

      <div>
        AWS Connected
      </div>
    </header>
  );
}

export default Header;