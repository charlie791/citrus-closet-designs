
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay } from "date-fns";

const generateTimeSlots = () => [
  { start: "9:00 AM", end: "10:00 AM" },
  { start: "10:00 AM", end: "11:00 AM" },
  { start: "11:00 AM", end: "12:00 PM" },
  { start: "12:00 PM", end: "1:00 PM" },
  { start: "1:00 PM", end: "2:00 PM" },
  { start: "2:00 PM", end: "3:00 PM" },
  { start: "3:00 PM", end: "4:00 PM" },
  { start: "4:00 PM", end: "5:00 PM" }
];

const generateAvailableDates = (startDate: Date, count: number) => {
  const dates = [];
  let currentDate = startDate;

  for (let i = 0; i < count; i++) {
    dates.push(currentDate);
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

interface DateTimeSelectionProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date | null) => void;
  onTimeSelect: (time: string | null) => void;
  onBack: () => void;
  onNext: () => void;
}

export function DateTimeSelection({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  onBack,
  onNext
}: DateTimeSelectionProps) {
  const [startIndex, setStartIndex] = React.useState(0);
  const today = new Date();
  const availableDates = React.useMemo(
    () => generateAvailableDates(today, 14),
    [today]
  );
  const timeSlots = React.useMemo(() => generateTimeSlots(), []);
  const visibleDates = availableDates.slice(startIndex, startIndex + 5);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + 5 < availableDates.length;

  const handlePrevious = () => {
    if (canScrollLeft) {
      setStartIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canScrollRight) {
      setStartIndex(prev => Math.min(availableDates.length - 5, prev + 1));
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold text-white mb-3">
          Select Date & Time
        </h2>
        <p className="text-sm text-white/70">
          Pick a date and time for your appointment, and we'll be there
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handlePrevious}
              disabled={!canScrollLeft}
              className={cn(
                "p-2 rounded-full transition-colors",
                !canScrollLeft && "opacity-50 cursor-not-allowed",
                canScrollLeft && "hover:bg-white/10"
              )}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            <div className="flex gap-3 flex-1 justify-center">
              {visibleDates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => onDateSelect(date)}
                  className={cn(
                    "flex flex-col items-center min-w-[84px] p-3 rounded-lg transition-all",
                    selectedDate && isSameDay(selectedDate, date)
                      ? "border-b-2 border-citrus-orange"
                      : "hover:bg-white/5"
                  )}
                >
                  <span className="text-sm font-medium text-white/70">
                    {format(date, "EEE")}
                  </span>
                  <span className="text-lg font-semibold text-white mt-1">
                    {format(date, "MMM d")}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className={cn(
                "p-2 rounded-full transition-colors",
                !canScrollRight && "opacity-50 cursor-not-allowed",
                canScrollRight && "hover:bg-white/10"
              )}
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 gap-3">
          {timeSlots.map((slot) => (
            <button
              key={slot.start}
              onClick={() => onTimeSelect(slot.start)}
              className={cn(
                "p-4 rounded-lg border text-center transition-all",
                selectedTime === slot.start
                  ? "border-citrus-orange bg-white/10 text-white"
                  : "border-white/10 hover:border-white/20 bg-white/5 text-white"
              )}
            >
              {slot.start} - {slot.end}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="flex-1 border-white/10 text-white hover:bg-white/5"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Button>
        <Button
          className="flex-1 bg-citrus-orange hover:bg-citrus-coral text-white"
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
        >
          Continue
          <ArrowRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
