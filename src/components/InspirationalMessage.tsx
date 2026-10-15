interface InspirationalMessageProps {
  role: 'elderly' | 'companion';
  onContinue: () => void;
}

export default function InspirationalMessage({ role, onContinue }: InspirationalMessageProps) {
  const messages = {
    elderly: "Are you ready to improve your life with meaningful companionship?",
    companion: "Your time and kindness can brighten someone’s world.",
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <p className="text-2xl text-center mb-8 text-gray-700 max-w-md">{messages[role]}</p>
      <button
        onClick={onContinue}
        className="bg-primary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-200"
      >
        Continue
      </button>
    </div>
  );
}
