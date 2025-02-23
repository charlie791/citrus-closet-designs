
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM"
];

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
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setMonth(threeDaysFromNow.getMonth() + 3);

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-semibold text-white mb-2">
          Select Date & Time
        </h2>
        <p className="text-sm text-white/70">
          Choose your preferred consultation time
        </p>
      </div>

      <div className="mb-6">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={onDateSelect}
          disabled={{ before: today }}
          fromDate={today}
          toDate={threeDaysFromNow}
          modifiers={{
            selected: selectedDate ? [selectedDate] : [],
          }}
          modifiersStyles={{
            selected: {
              backgroundColor: '#F26722',
              color: 'white'
            }
          }}
          styles={{
            root: { width: '100%' },
            caption: { color: 'white' },
            head: { color: 'rgba(255, 255, 255, 0.7)' },
            day: { color: 'white' },
            nav: { color: 'white' },
          }}
          showOutsideDays={false}
          components={{
            IconLeft: () => <ChevronLeft className="h-4 w-4" />,
            IconRight: () => <ChevronRight className="h-4 w-4" />,
          }}
        />
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-3 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => onTimeSelect(time)}
              className={cn(
                "p-3 rounded-lg border text-center transition-all duration-200",
                selectedTime === time
                  ? "border-citrus-orange bg-citrus-orange text-white"
                  : "border-white/10 hover:border-white/20 bg-white/5 text-white"
              )}
            >
              {time}
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
