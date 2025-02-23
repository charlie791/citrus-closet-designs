
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
  const visibleDates = availableDates.slice(startIndex, startIndex + (window.innerWidth < 768 ? 3 : 5));

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + (window.innerWidth < 768 ? 3 : 5) < availableDates.length;

  const handlePrevious = () => {
    if (canScrollLeft) {
      setStartIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canScrollRight) {
      setStartIndex(prev => Math.min(availableDates.length - (window.innerWidth < 768 ? 3 : 5), prev + 1));
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4 md:mb-6 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-white mb-2">
          Date & Time
        </h2>
        <p className="text-xs md:text-sm text-white/50">
          Pick a date and time for your appointment
        </p>
      </div>

      <div className="mb-4 md:mb-6">
        <div className="relative">
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={handlePrevious}
              disabled={!canScrollLeft}
              className={cn(
                "p-1.5 rounded-full transition-colors touch-manipulation",
                !canScrollLeft && "opacity-50 cursor-not-allowed",
                canScrollLeft && "hover:bg-white/10"
              )}
            >
              <ArrowLeft className="h-4 w-4 text-white" />
            </button>
            <div className="flex gap-1 md:gap-2 flex-1 justify-center">
              {visibleDates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => onDateSelect(date)}
                  className={cn(
                    "flex flex-col items-center min-w-[60px] md:min-w-[68px] py-2 px-1 rounded-lg transition-all touch-manipulation",
                    selectedDate && isSameDay(selectedDate, date)
                      ? "border-b-2 border-citrus-orange bg-white/5"
                      : "hover:bg-white/5"
                  )}
                >
                  <span className="text-sm md:text-base font-semibold text-white mb-0.5">
                    {format(date, "EEE")}
                  </span>
                  <span className="text-xs text-white/70">
                    {format(date, "MMM d")}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className={cn(
                "p-1.5 rounded-full transition-colors touch-manipulation",
                !canScrollRight && "opacity-50 cursor-not-allowed",
                canScrollRight && "hover:bg-white/10"
              )}
            >
              <ArrowRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot.start}
              onClick={() => onTimeSelect(slot.start)}
              className={cn(
                "p-3 rounded-lg border text-center transition-all text-sm touch-manipulation active:scale-[0.99]",
                selectedTime === slot.start
                  ? "border-citrus-orange bg-white/5 text-white"
                  : "border-white/5 hover:border-white/10 bg-white/5 text-white/90"
              )}
            >
              {slot.start} - {slot.end}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 md:gap-3">
        <Button
          variant="outline"
          onClick={onBack}
          className="w-full md:flex-1 border-white/10 text-white hover:bg-white/5 rounded-xl py-4 md:py-6 h-auto text-sm md:text-base font-medium touch-manipulation"
        >
          <ArrowLeft className="h-4 md:h-5 w-4 md:w-5 mr-2" />
          Back
        </Button>
        <Button
          className="w-full md:flex-1 bg-citrus-orange hover:bg-citrus-coral text-white rounded-xl py-4 md:py-6 h-auto text-sm md:text-base font-medium touch-manipulation"
          disabled={!selectedDate || !selectedTime}
          onClick={onNext}
        >
          Continue
          <ArrowRight className="h-4 md:h-5 w-4 md:w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
