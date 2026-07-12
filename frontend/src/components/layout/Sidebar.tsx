import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", path: "/" },
  { label: "Security Sources", path: "/security-sources" },
  { label: "Data Ingestion", path: "/data-ingestion" },
  { label: "Threat Detection", path: "/threat-detection" },
  { label: "Threat Intelligence", path: "/threat-intelligence" },
  { label: "SIEM Monitoring", path: "/siem-monitoring" },
  { label: "Incident Response", path: "/incident-response" },
  { label: "Analytics", path: "/analytics" },
  { label: "Reports", path: "/reports" },
  { label: "Settings", path: "/settings" },
];

function Sidebar() {
  return (
    <aside
      style={{
        width: "260px",
        background: "#111827",
        color: "#F8FAFC",
        padding: "24px",
      }}
    >
      <h2
        style={{
          color: "#3B82F6",
          marginBottom: "40px",
        }}
      >
        Cyber Threat
      </h2>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              padding: "12px 16px",
              borderRadius: "8px",
              textDecoration: "none",
              color: isActive ? "#3B82F6" : "#F8FAFC",
              background: isActive ? "#1E293B" : "transparent",
              transition: "0.2s",
              fontWeight: isActive ? "600" : "400",
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;