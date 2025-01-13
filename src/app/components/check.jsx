import { motion } from "framer-motion";
import { LiaCheckCircle } from "react-icons/lia";

const AnimatedComponent = () => {
  return (
    <div className="text-center px-8 py-20">
      <motion.div
        initial={{ scale: 0, opacity: 0, rotate: -45 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{
          duration: 0.6,
          ease: [0.6, 0.01, -0.05, 0.95], // Smooth ease
        }}
      >
        <LiaCheckCircle
          size={100}
          className="text-blue-600 text-6xl mx-auto mb-4"
        />
      </motion.div>
    </div>
  );
};

export default AnimatedComponent;
