import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Coins, TrendingUp, Users, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

interface WelcomePageProps {
  onGetStarted?: () => void;
}

const WelcomePage = ({ onGetStarted = () => {} }: WelcomePageProps) => {
  const [floatingCoins, setFloatingCoins] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    // Generate floating coins
    const coins = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setFloatingCoins(coins);

    // Show features after initial animation
    const timer = setTimeout(() => setShowFeatures(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: Users,
      title: "Group Savings",
      description: "Save together with your community",
    },
    {
      icon: TrendingUp,
      title: "Track Progress",
      description: "Monitor your savings goals",
    },
    {
      icon: Shield,
      title: "Secure & Trusted",
      description: "Your money is safe with us",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden relative">
      {/* Floating Coins Background */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingCoins.map((coin) => (
          <motion.div
            key={coin.id}
            className="absolute text-yellow-400 opacity-20"
            style={{
              left: `${coin.x}%`,
              top: `${coin.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 4 + coin.delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay: coin.delay,
            }}
          >
            <Coins size={24} />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 text-center">
        {/* Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            className="mb-6 relative"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="w-32 h-32 mx-auto flex items-center justify-center">
              <motion.img
                src="/mobichama-logo.svg"
                alt="MobiChama Logo"
                className="w-full h-full"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
            <motion.div
              className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-xs font-bold text-gray-800">KSh</span>
            </motion.div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
          >
            MobiChama
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            The Digital Group Savings Platform for Kenya
          </motion.p>

          <motion.p
            className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            Save together, grow together. Join thousands of Kenyans building
            their financial future through community savings.
          </motion.p>
        </motion.div>

        {/* Interactive 3D Money Stack */}
        <motion.div
          className="mb-12 cursor-pointer"
          onClick={onGetStarted}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          <div className="relative">
            {/* Money Stack */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-32 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow-lg border-2 border-green-400 flex items-center justify-center"
                style={{
                  position: i === 0 ? "relative" : "absolute",
                  top: i === 0 ? 0 : `-${i * 4}px`,
                  left: i === 0 ? 0 : `${i * 2}px`,
                  zIndex: 5 - i,
                }}
                animate={{
                  y: [0, -5, 0],
                  rotateY: [0, 5, 0],
                }}
                transition={{
                  duration: 2 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.1,
                }}
              >
                <span className="text-white font-bold text-lg">KSh</span>
              </motion.div>
            ))}

            {/* Click indicator */}
            <motion.div
              className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Click to start saving!
            </motion.div>
          </div>
        </motion.div>

        {/* Features */}
        <AnimatePresence>
          {showFeatures && (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, staggerChildren: 0.2 }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                  }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon size={24} className="text-white" />
                  </motion.div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105"
            onClick={onGetStarted}
          >
            <motion.span
              className="flex items-center gap-2"
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Get Started Today
              <ArrowRight size={20} />
            </motion.span>
          </Button>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Trusted by thousands of Kenyans
          </p>
          <div className="flex items-center justify-center gap-8 text-xs text-gray-400">
            <span>🔒 Bank-level Security</span>
            <span>📱 M-Pesa Integration</span>
            <span>🏆 Award Winning</span>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-100/50 to-transparent dark:from-gray-800/50 pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-200/30 to-transparent dark:from-blue-800/30 rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-200/30 to-transparent dark:from-purple-800/30 rounded-full pointer-events-none" />
    </div>
  );
};

export default WelcomePage;
