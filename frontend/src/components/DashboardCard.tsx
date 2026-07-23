interface DashboardCardProps {
  title: string;
  value: string | number;
}

function DashboardCard({ title, value }: DashboardCardProps) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 6px 15px rgba(0,0,0,0.08)",
        transition: "0.3s",
        cursor: "pointer",
        minHeight: "120px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow =
          "0 10px 25px rgba(37,99,235,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 6px 15px rgba(0,0,0,0.08)";
      }}
    >
      <h3
        style={{
          margin: 0,
          color: "#64748b",
          fontSize: "18px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "15px",
          color: "#2563eb",
          fontSize: "34px",
          fontWeight: "bold",
        }}
      >
        {value}
      </h1>
    </div>
  );
}

export default DashboardCard;