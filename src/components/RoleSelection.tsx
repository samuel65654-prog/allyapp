interface RoleSelectionProps {
  onSelectRole: (role: 'elderly' | 'companion') => void;
}

export default function RoleSelection({ onSelectRole }: RoleSelectionProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Who are you?</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => onSelectRole('elderly')}
          className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200"
        >
          I am an Elderly
        </button>
        <button
          onClick={() => onSelectRole('companion')}
          className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200"
        >
          I am a Companion
        </button>
      </div>
    </div>
  );
}
