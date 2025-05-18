export function ProfileCard({ name, roles = [], points = [] }) {
  return (
    <div className="max-w-4xl mx-auto rounded-xl p-8 h-full bg-opacity-20">
      <div className="flex flex-col items-center text-white">
        {/* Name */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {name}
          </h3>
          {roles.map((role, i) => (
            <p key={i}>{role}</p>
          ))}
        </div>

        {/* Bullet Points */}
        <ul className="list-disc pl-5 space-y-2 w-full max-w-lg mx-auto">
          {points.map((point, i) => (
            <li key={i} className="text-left">{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
