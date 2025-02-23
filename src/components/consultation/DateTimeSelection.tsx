
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay } from "date-fns";

const generateTimeSlots = () => [
  { start: "9 AM", end: "10 AM" },
  { start: "10 AM", end: "11 AM" },
  { start: "11 AM", end: "12 PM" },
  { start: "12 PM", end: "1 PM" },
  { start: "1 PM", end: "2 PM" },
  { start: "2 PM", end: "3 PM" },
  { start: "3 PM", end: "4 PM" },
  { start: "4 PM", end: "5 PM" }
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
          Date & Time
        </h2>
        <p className="text-sm text-white/70">
          Pick a date and time for your appointment, and we'll be there
        </p>
      </div>

      <div className="mb-8">
        <div className="relative px-2">
          <div className="flex justify-between items-center mb-8">
            <button
              onClick={handlePrevious}
              disabled={!canScrollLeft}
              className={cn(
                "p-3 rounded-full transition-colors absolute left-0 z-10",
                !canScrollLeft && "opacity-50 cursor-not-allowed",
                canScrollLeft && "hover:bg-white/10"
              )}
            >
              <ArrowLeft className="h-6 w-6 text-white" />
            </button>
            <div className="flex gap-4 flex-1 justify-center overflow-hidden px-10">
              {visibleDates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => onDateSelect(date)}
                  className={cn(
                    "flex flex-col items-center min-w-[96px] p-4 rounded-xl transition-all border",
                    selectedDate && isSameDay(selectedDate, date)
                      ? "bg-white/10 border-citrus-orange"
                      : "border-white/10 hover:border-white/20 bg-white/5"
                  )}
                >
                  <span className={cn(
                    "text-lg font-semibold mb-1",
                    selectedDate && isSameDay(selectedDate, date)
                      ? "text-citrus-orange"
                      : "text-white"
                  )}>
                    {format(date, "EEE")}
                  </span>
                  <span className="text-sm text-white/70">
                    {format(date, "d")}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className={cn(
                "p-3 rounded-full transition-colors absolute right-0 z-10",
                !canScrollRight && "opacity-50 cursor-not-allowed",
                canScrollRight && "hover:bg-white/10"
              )}
            >
              <ArrowRight className="h-6 w-6 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          {timeSlots.map((slot) => (
            <button
              key={slot.start}
              onClick={() => onTimeSelect(slot.start)}
              className={cn(
                "p-5 rounded-xl border text-center transition-all text-base",
                selectedTime === slot.start
                  ? "border-citrus-orange bg-white/10 text-white"
                  : "border-white/10 hover:border-white/20 bg-white/5 text-white/90"
              )}
            >
              {slot.start} - {slot.end}
            </button>
          ))}
        </div>
      </div>

      <Button
        className="w-full bg-citrus-orange hover:bg-citrus-coral text-white text-base py-6 rounded-xl h-auto"
        disabled={!selectedDate || !selectedTime}
        onClick={onNext}
      >
        Continue
        <ArrowRight className="h-5 w-5 ml-2" />
      </Button>
    </div>
  );
}
