import { NextPage } from "next";
import ProcessSteps from "@/components/process/ProcessSteps";

const Home: NextPage = () => {
  const handleScheduleConsultation = () => {
    // Handle scheduling consultation
  };

  return (
    <div>
      <ProcessSteps onScheduleConsultation={handleScheduleConsultation} />
    </div>
  );
};

export default Home;
