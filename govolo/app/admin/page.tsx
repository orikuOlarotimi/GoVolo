const stats = [
  { label: "Total Destinations", value: "—" },
  { label: "Total Bookings", value: "—" },
  { label: "Unread Messages", value: "—" },
  { label: "Total Users", value: "—" },
];

export default function AdminOverviewPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[rgb(15,23,42)] mb-6">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white border border-border rounded-2xl p-5"
          >
            <p className="text-sm text-[rgb(101,117,139)] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[rgb(15,23,42)]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

