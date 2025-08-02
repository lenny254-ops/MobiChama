import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface SavingsGoal {
  id: string;
  name: string;
  currentAmount: number;
  goalAmount: number;
  color: string;
}

interface SavingsGoalTrackerProps {
  goals?: SavingsGoal[];
  totalSavings?: number;
}

const SavingsGoalTracker = ({
  goals = [
    {
      id: "1",
      name: "Wedding",
      currentAmount: 25000,
      goalAmount: 50000,
      color: "bg-pink-500",
    },
    {
      id: "2",
      name: "Emergency",
      currentAmount: 15000,
      goalAmount: 30000,
      color: "bg-amber-500",
    },
    {
      id: "3",
      name: "Land",
      currentAmount: 100000,
      goalAmount: 200000,
      color: "bg-emerald-500",
    },
    {
      id: "4",
      name: "Education",
      currentAmount: 35000,
      goalAmount: 50000,
      color: "bg-blue-500",
    },
  ],
  totalSavings = 175000,
}: SavingsGoalTrackerProps) => {
  return (
    <Card className="w-full bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Savings Goals</span>
          <span className="text-lg font-bold">
            Total: KSh {totalSavings.toLocaleString()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const percentage = Math.round(
              (goal.currentAmount / goal.goalAmount) * 100,
            );

            return (
              <div key={goal.id} className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{goal.name}</h3>
                  <span className="text-sm font-semibold">{percentage}%</span>
                </div>

                <div className="relative pt-1">
                  <Progress
                    value={percentage}
                    className={`h-3 ${goal.color}`}
                  />
                </div>

                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>KSh {goal.currentAmount.toLocaleString()}</span>
                  <span>KSh {goal.goalAmount.toLocaleString()}</span>
                </div>

                <motion.div
                  className="relative w-24 h-24 mx-auto mt-2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={goal.color.replace("bg-", "var(--")}
                        strokeWidth="8"
                        strokeDasharray={`${percentage * 2.51} 251`}
                        strokeDashoffset="0"
                        transform="rotate(-90 50 50)"
                        className="transition-all duration-1000 ease-in-out"
                      />
                    </svg>
                    <div className="absolute text-center">
                      <span className="text-lg font-bold">{percentage}%</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default SavingsGoalTracker;
