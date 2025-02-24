
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Discovery",
    description: "Work with a designer, virtually or in-home, who will uncover your likes and needs. Based on the measurements of your space and inventory you wish to store in it, we create a design that fits you perfectly."
  },
  {
    title: "Design",
    description: "With our 3D design software, Idea Books, and samples on hand, we craft plans that detail the organizational structure and flow of the space. Together we explore our vast selection of materials and finishes, and choose enhancements, accessories, and specialty items to create a closet that is truly unique."
  },
  {
    title: "Build",
    description: "Once you have approved your design, our craftsmen go to work. We fabricate each component based on the precise specifications of your designs because \"custom\" means individual, cut-to-order construction."
  },
  {
    title: "Install",
    description: "Your dream closet will become a reality. On installation day, you can expect friendly, contact-free, quick and expert work, meticulous attention to detail, and thorough cleanup of the space. Installers come equipped with masks, gloves, and disinfecting wipes."
  }
];

const ProcessSteps = ({ onScheduleConsultation }: { onScheduleConsultation: () => void }) => {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Fixed Content */}
            <div className="space-y-6">
              <span className="text-sm font-medium tracking-wider text-citrus-charcoal/70">
                ONLY WHEN YOU ARE READY WE WILL MOVE FORWARD
              </span>

              <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal">
                Our Process is Easy
              </h2>

              <p className="text-citrus-charcoal/70">
                We create a storage solution that creates harmony in your home based on your needs, aesthetic and budget.
              </p>

              <div className="pt-4">
                <Button
                  onClick={onScheduleConsultation}
                  size="lg"
                  className="font-semibold"
                >
                  Get Started
                </Button>
              </div>
            </div>

            {/* Right Column - Timeline */}
            <div className="relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-citrus-orange/10" />
              
              <div className="space-y-16">
                {steps.map((step, index) => (
                  <div 
                    key={step.title}
                    className="relative"
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-[-13px] top-[14px] w-[10px] h-[10px] rounded-full bg-citrus-orange" />
                    
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-[#647585]">
                        {step.title}
                      </h3>
                      <p className="text-citrus-charcoal/70 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;

