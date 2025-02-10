import { Check, Car, UserRound, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface BookingProgressProps {
  currentStep: number;
  completedSteps: number[];
}

export function BookingProgress({ currentStep, completedSteps }: BookingProgressProps) {
  const steps = [
    { icon: Car, label: "Vehicle" },
    { icon: UserRound, label: "Details" },
    { icon: CreditCard, label: "Payment" },
  ];

  return (
    <div className="w-full py-4">
      <div className="flex justify-between relative">
        {/* Background line */}
        <div className="absolute inset-0 top-1/2 -translate-y-1/2 mx-8">
          <div className="h-[2px] w-full bg-border" />
          <motion.div 
            className="h-[2px] bg-primary transition-all"
            initial={{ width: "0%" }}
            animate={{ 
              width: `${(Math.max(0, currentStep - 1) / (steps.length - 1)) * 100}%` 
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>

        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = completedSteps.includes(index);
          const isCurrent = currentStep === index;

          return (
            <motion.div 
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
              }}
              transition={{ delay: index * 0.2 }}
              className={`relative flex flex-col items-center gap-2 ${
                index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              <motion.div 
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center z-10
                  transition-colors duration-300
                  ${isCompleted 
                    ? 'bg-primary text-primary-foreground' 
                    : isCurrent
                      ? 'bg-primary/20 text-primary border-2 border-primary'
                      : 'bg-muted'
                  }
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <Check className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Icon className="w-5 h-5" />
                )}
              </motion.div>
              <span className="text-sm font-medium">{step.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}