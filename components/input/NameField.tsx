interface NameFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function NameField({ label, value, onChange }: NameFieldProps) {
  return (
    <div>
      <label className="block text-center text-[22px] font-black">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={20}
        className="mt-4 w-full bg-transparent border-b-[3px] border-white/90 focus:border-[#ff9d00] outline-none text-center text-2xl font-bold py-3 placeholder:text-white/30"
      />
    </div>
  );
}
