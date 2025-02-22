
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

interface AppointmentStepProps {
  date: Date | null;
  time: string;
  onBack: () => void;
  onNext: (date: Date, time: string) => void;
}

const AppointmentStep = ({
  date: initialDate,
  time: initialTime,
  onBack,
  onNext,
}: AppointmentStepProps) => {
  const [date, setDate] = useState<Date | null>(initialDate);
  const [time, setTime] = useState(initialTime);

  const handleNext = () => {
    if (!date || !time) return;
    onNext(date, time);
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-8">
        Choose Your Appointment
      </h2>
      <div className="space-y-6">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg border border-white/10 bg-white/5"
          classNames={{
            day_selected: "bg-citrus-orange text-white hover:bg-citrus-coral",
            day_today: "bg-white/5 text-white",
          }}
        />
        {date && (
          <div>
            <h3 className="font-medium mb-3">
              Available Times for {format(date, "MMMM d, yyyy")}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setTime(slot)}
                  className={`p-3 rounded-lg border text-center transition-all ${
                    time === slot
                      ? "border-citrus-orange bg-citrus-orange/10 text-citrus-orange"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex-1 border-white/10 text-white hover:bg-white/5"
          >
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!date || !time}
            className="flex-1 bg-citrus-orange hover:bg-citrus-coral disabled:opacity-50"
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentStep;
