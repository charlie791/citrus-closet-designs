
export interface Step {
  title: string;
  description: string;
  time: number;
}

export interface ProcessStepsProps {
  onScheduleConsultation: () => void;
}
