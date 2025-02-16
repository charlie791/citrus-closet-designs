
import { ClipboardCheck, Palette, Ruler, Wrench } from "lucide-react";

const steps = [
  {
    icon: ClipboardCheck,
    title: "Initial Consultation",
    description: "We discuss your needs, space, and style preferences"
  },
  {
    icon: Palette,
    title: "Custom Design",
    description: "Experience your space in 3D before we build"
  },
  {
    icon: Wrench,
    title: "Crafting",
    description: "Expert fabrication of your custom storage solutions"
  },
  {
    icon: Ruler,
    title: "Professional Installation",
    description: "Careful installation by our certified team"
  }
];

const ProcessSteps = () => {
  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block bg-citrus-orange/10 text-citrus-orange px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-citrus-charcoal mb-4">
            How We Work
          </h2>
          <p className="text-citrus-charcoal/70 max-w-2xl mx-auto">
            From concept to completion, we ensure a seamless experience with our proven process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="relative group"
            >
              <div className="p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="mb-4 inline-block p-3 bg-citrus-orange/10 rounded-xl text-citrus-orange">
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-citrus-charcoal mb-2">
                  {step.title}
                </h3>
                <p className="text-citrus-charcoal/70">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 right-0 w-full h-0.5 bg-citrus-orange/20 transform translate-x-1/2">
                  <div className="absolute right-0 top-1/2 w-2 h-2 bg-citrus-orange rounded-full transform -translate-y-1/2" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;
