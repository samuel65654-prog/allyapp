"use client";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SLOTS = ["Morning", "Afternoon", "Evening"];

export interface Availability {
  [day: string]: string[]; // e.g. { Mon: ["Morning", "Evening"], Sat: ["Afternoon"] }
}

interface AvailabilityPickerProps {
  value: Availability;
  onChange: (value: Availability) => void;
}

export default function AvailabilityPicker({ value, onChange }: AvailabilityPickerProps) {
  const toggle = (day: string, slot: string) => {
    const current = value[day] ?? [];
    const updated = current.includes(slot)
      ? current.filter((s) => s !== slot)
      : [...current, slot];
    onChange({ ...value, [day]: updated });
  };

  return (
    <div>
      <p className="text-sm text-gray-600 mb-2">Availability</p>
      <div className="overflow-x-auto">
        <table className="text-sm w-full border-collapse">
          <thead>
            <tr>
              <th className="w-20" />
              {SLOTS.map((slot) => (
                <th key={slot} className="text-gray-500 font-medium pb-1 text-center">{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DAYS.map((day) => (
              <tr key={day}>
                <td className="text-gray-600 pr-3 py-1 font-medium">{day}</td>
                {SLOTS.map((slot) => {
                  const active = (value[day] ?? []).includes(slot);
                  return (
                    <td key={slot} className="text-center py-1">
                      <button
                        type="button"
                        onClick={() => toggle(day, slot)}
                        className={`w-full rounded-md py-1 px-2 border text-xs transition-colors ${
                          active
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-gray-400 border-gray-200 hover:border-primary"
                        }`}
                      >
                        {active ? "✓" : "—"}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
