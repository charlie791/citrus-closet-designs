
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Sun, Sunset } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, isSameDay, isAfter } from "date-fns";

interface TimeSlot {
  start: string;
  end: string;
  period: "morning" | "afternoon";
  isPopular?: boolean;
}

const generateTimeSlots = (): TimeSlot[] => [
  { start: "9 AM", end: "10 AM", period: "morning", isPopular: true },
  { start: "10 AM", end: "11 AM", period: "morning" },
  { start: "11 AM", end: "12 PM", period: "morning" },
  { start: "12 PM", end: "1 PM", period: "afternoon" },
  { start: "1 PM", end: "2 PM", period: "afternoon", isPopular: true },
  { start: "2 PM", end: "3 PM", period: "afternoon" },
  { start: "3 PM", end: "4 PM", period: "afternoon" },
  { start: "4 PM", end: "5 PM", period: "afternoon" }
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
  const [activePeriod, setActivePeriod] = React.useState<"morning" | "afternoon">("morning");
  const dateSliderRef = React.useRef<HTMLDivElement>(null);
  const today = new Date();
  
  const availableDates = React.useMemo(
    () => generateAvailableDates(today, 14),
    [today]
  );
  
  const timeSlots = React.useMemo(() => generateTimeSlots(), []);
  const visibleDates = availableDates.slice(startIndex, startIndex + 3);
  
  const morningSlots = timeSlots.filter(slot => slot.period === "morning");
  const afternoonSlots = timeSlots.filter(slot => slot.period === "afternoon");

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + 3 < availableDates.length;

  const handlePrevious = () => {
    if (canScrollLeft) {
      setStartIndex(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (canScrollRight) {
      setStartIndex(prev => Math.min(availableDates.length - 3, prev + 1));
    }
  };

  // Touch handling for date slider
  const [touchStart, setTouchStart] = React.useState<number | null>(null);
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart) {
      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStart - touchEnd;

      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0 && canScrollRight) {
          handleNext();
        } else if (diff < 0 && canScrollLeft) {
          handlePrevious();
        }
      }
      setTouchStart(null);
    }
  };

  // Provide haptic feedback on selection
  const provideFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const handleTimeSelect = (time: string) => {
    provideFeedback();
    onTimeSelect(time);
  };

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Date & Time
        </h2>
        <p className="text-sm text-white/70">
          Pick a date and time for your consultation
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <div 
            ref={dateSliderRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="flex justify-between items-center mb-4 transition-transform duration-300 ease-out"
          >
            <button
              onClick={handlePrevious}
              disabled={!canScrollLeft}
              className={cn(
                "p-3 rounded-full transition-colors absolute left-0 z-10 -translate-x-2",
                !canScrollLeft && "opacity-50 cursor-not-allowed",
                canScrollLeft && "hover:bg-white/10"
              )}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </button>
            
            <div className="flex gap-3 flex-1 justify-center overflow-hidden px-8">
              {visibleDates.map((date) => (
                <button
                  key={date.toISOString()}
                  onClick={() => {
                    provideFeedback();
                    onDateSelect(date);
                  }}
                  className={cn(
                    "flex flex-col items-center w-[calc(33.33%-0.75rem)] p-4 rounded-xl transition-all duration-200 border shadow-sm",
                    selectedDate && isSameDay(selectedDate, date)
                      ? "bg-white/15 border-citrus-orange scale-105 shadow-lg"
                      : "border-white/10 hover:border-white/20 bg-white/5 hover:scale-102 active:scale-95",
                    "transform-gpu" // Hardware acceleration
                  )}
                >
                  <span className={cn(
                    "text-lg font-semibold mb-1 transition-colors",
                    selectedDate && isSameDay(selectedDate, date)
                      ? "text-citrus-orange"
                      : "text-white"
                  )}>
                    {format(date, "EEE")}
                  </span>
                  <span className="text-sm text-white/70">
                    {format(date, "MMM d")}
                  </span>
                </button>
              ))}
            </div>
            
            <button
              onClick={handleNext}
              disabled={!canScrollRight}
              className={cn(
                "p-3 rounded-full transition-colors absolute right-0 z-10 translate-x-2",
                !canScrollRight && "opacity-50 cursor-not-allowed",
                canScrollRight && "hover:bg-white/10"
              )}
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-1.5 mb-6">
            {Array.from({ length: Math.ceil(availableDates.length / 3) }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-300",
                  Math.floor(startIndex / 3) === i
                    ? "bg-citrus-orange w-3"
                    : "bg-white/20"
                )}
              />
            ))}
          </div>
        </div>

        {/* Time period tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActivePeriod("morning")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all",
              activePeriod === "morning"
                ? "bg-white/15 border-citrus-orange"
                : "border-white/10 hover:border-white/20 bg-white/5"
            )}
          >
            <Sun className="h-4 w-4" />
            <span className="font-medium">Morning</span>
          </button>
          <button
            onClick={() => setActivePeriod("afternoon")}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border transition-all",
              activePeriod === "afternoon"
                ? "bg-white/15 border-citrus-orange"
                : "border-white/10 hover:border-white/20 bg-white/5"
            )}
          >
            <Sunset className="h-4 w-4" />
            <span className="font-medium">Afternoon</span>
          </button>
        </div>

        {/* Time slots */}
        <div className="space-y-3">
          {(activePeriod === "morning" ? morningSlots : afternoonSlots).map((slot) => (
            <button
              key={slot.start}
              onClick={() => handleTimeSelect(slot.start)}
              className={cn(
                "w-full p-4 rounded-xl border text-left transition-all relative",
                selectedTime === slot.start
                  ? "border-citrus-orange bg-white/15 shadow-md"
                  : "border-white/10 hover:border-white/20 bg-white/5",
                "group active:scale-98 transform-gpu"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">
                  {slot.start} - {slot.end}
                </span>
                {slot.isPopular && (
                  <span className="text-xs px-2 py-1 rounded-full bg-citrus-orange/20 text-citrus-orange">
                    Popular
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-black/0 pb-8">
        <Button
          className="w-full bg-citrus-orange hover:bg-citrus-coral text-white text-base py-6 rounded-xl h-auto shadow-xl transition-all duration-200 disabled:opacity-50"
          disabled={!selectedDate || !selectedTime}
          onClick={() => {
            provideFeedback();
            onNext();
          }}
        >
          Continue
          <ArrowRight className="h-5 w-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}
