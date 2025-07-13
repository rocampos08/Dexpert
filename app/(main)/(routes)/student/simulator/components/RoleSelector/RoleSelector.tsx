type RoleSelectorProps = {
  onSelectRole: (role: string) => void;
};

const roles = [
  { title: 'Receptionist', description: 'Handle calls, guests, and calendar bookings' },
  { title: 'Customer Support', description: 'Answer client questions with empathy and speed' },
  { title: 'Administrative Assistant', description: 'Organize schedules, manage docs, and assist teams' },
];

export default function RoleSelector({ onSelectRole }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {roles.map((role) => (
        <button
          key={role.title}
          onClick={() => onSelectRole(role.title)}
          className="p-6 border rounded-xl hover:shadow-md transition bg-white"
        >
          <h2 className="text-xl font-semibold text-[#0a2342]">{role.title}</h2>
          <p className="text-sm text-gray-600 mt-2">{role.description}</p>
        </button>
      ))}
    </div>
  );
}
