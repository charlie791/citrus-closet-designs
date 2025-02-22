
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { format, addDays, isSameDay } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

const timeSlots = [
  { start: "9:00 AM", end: "10:00 AM" },
  { start: "10:00 AM", end: "11:00 AM" },
  { start: "11:00 AM", end: "12:00 PM" },
  { start: "1:00 PM", end: "2:00 PM" },
  { start: "2:00 PM", end: "3:00 PM" },
  { start: "3:00 PM", end: "4:00 PM" },
  { start: "4:00 PM", end: "5:00 PM" },
  { start: "5:00 PM", end: "6:00 PM" },
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
  const [date, setDate] = useState<Date | null>(initialDate || new Date());
  const [time, setTime] = useState(initialTime);
  const [startDate, setStartDate] = useState(new Date());

  const dateRange = Array.from({ length: 5 }, (_, i) => addDays(startDate, i));

  const handleNext = () => {
    if (!date || !time) return;
    onNext(date, time);
  };

  const handlePrevDates = () => {
    setStartDate(addDays(startDate, -5));
  };

  const handleNextDates = () => {
    setStartDate(addDays(startDate, 5));
  };

  return (
    <div className="p-6 md:p-10 text-white">
      <h2 className="text-3xl font-bold text-center mb-2">Date & Time</h2>
      <p className="text-gray-400 text-center mb-8">
        Pick a date and time for your appointment, and we'll be there.
      </p>

      {/* Date Selection */}
      <div className="relative mb-8">
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={handlePrevDates}
            className="p-2 rounded-full hover:bg-white/5"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1 grid grid-cols-5 gap-2">
            {dateRange.map((currentDate) => (
              <button
                key={currentDate.toString()}
                onClick={() => setDate(currentDate)}
                className={`p-3 rounded-xl text-center transition-all ${
                  date && isSameDay(currentDate, date)
                    ? "bg-citrus-orange text-white"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="text-sm font-medium">
                  {format(currentDate, "EEE")}
                </div>
                <div className="text-lg">
                  {format(currentDate, "d")}
                </div>
              </button>
            ))}
          </div>
          <button
            onClick={handleNextDates}
            className="p-2 rounded-full hover:bg-white/5"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Time Selection */}
      {date && (
        <div className="mb-8">
          <h3 className="font-medium mb-4">
            Available Times for {format(date, "MMMM d, yyyy")}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.start}
                onClick={() => setTime(slot.start)}
                className={`p-4 rounded-xl border text-center transition-all ${
                  time === slot.start
                    ? "border-citrus-orange bg-citrus-orange/10 text-citrus-orange"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {`${slot.start} - ${slot.end}`}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30"
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
  );
};

export default AppointmentStep;
