import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Progress } from "./ui/progress";
import VirtualReceipt from "./VirtualReceipt";

interface ContributionFlowProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSuccess?: (amount: number) => void;
  groupName?: string;
  minAmount?: number;
  maxAmount?: number;
  memberName?: string;
}

const ContributionFlow = ({
  isOpen = true,
  onClose = () => {},
  onSuccess = () => {},
  groupName = "Family Savings Group",
  minAmount = 500,
  maxAmount = 50000,
  memberName = "Jane Doe",
}: ContributionFlowProps) => {
  const [step, setStep] = useState<number>(1);
  const [amount, setAmount] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>("07");
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [receiptData, setReceiptData] = useState<any>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhoneNumber(value);
    }
  };

  const handleNextStep = () => {
    if (
      step === 1 &&
      amount &&
      Number(amount) >= minAmount &&
      Number(amount) <= maxAmount
    ) {
      setStep(2);
    } else if (step === 2 && phoneNumber.length === 10) {
      setStep(3);
      simulatePayment();
    }
  };

  const simulatePayment = () => {
    setIsProcessing(true);
    // Simulate API call to M-Pesa
    setTimeout(() => {
      setIsProcessing(false);
      // 90% chance of success for demo purposes
      if (Math.random() < 0.9) {
        setIsSuccess(true);
        const receipt = {
          transactionId: `TXN${Date.now()}`,
          amount: Number(amount),
          date: new Date().toLocaleString(),
          memberName: memberName,
          groupName: groupName,
          paymentMethod: "M-Pesa",
          status: "Completed",
        };
        setReceiptData(receipt);
        setTimeout(() => {
          onSuccess(Number(amount));
          setShowReceipt(true);
        }, 2000);
      } else {
        setIsError(true);
      }
    }, 3000);
  };

  const resetFlow = () => {
    setStep(1);
    setAmount("");
    setPhoneNumber("07");
    setIsProcessing(false);
    setIsSuccess(false);
    setIsError(false);
    setShowReceipt(false);
    setReceiptData(null);
    onClose();
  };

  const handleTryAgain = () => {
    setIsError(false);
    setStep(1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {step === 1 && "Contribute to Your Group"}
            {step === 2 && "Confirm Payment Details"}
            {step === 3 && isProcessing && "Processing Payment"}
            {step === 3 && isSuccess && "Payment Successful!"}
            {step === 3 && isError && "Payment Failed"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {step === 1 &&
              `Support ${groupName} with your contribution via M-Pesa`}
            {step === 2 && "Review your contribution details before proceeding"}
            {step === 3 &&
              isProcessing &&
              "Please wait while we process your payment"}
            {step === 3 && isSuccess && "Your contribution has been received"}
            {step === 3 &&
              isError &&
              "There was an issue processing your payment"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {/* Step indicator */}
          {step < 3 && (
            <div className="mb-6">
              <Progress value={(step / 2) * 100} className="h-2" />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>Amount</span>
                <span>Confirm</span>
              </div>
            </div>
          )}

          {/* Step 1: Amount Entry */}
          {step === 1 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Enter Contribution Amount
                  </CardTitle>
                  <CardDescription>
                    Minimum: KES {minAmount.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-muted-foreground">KES</span>
                    </div>
                    <Input
                      type="text"
                      placeholder="0"
                      className="pl-12 text-lg font-medium h-14"
                      value={amount}
                      onChange={handleAmountChange}
                      autoFocus
                    />
                  </div>
                  {amount && Number(amount) < minAmount && (
                    <p className="mt-2 text-sm text-destructive">
                      Amount must be at least KES {minAmount.toLocaleString()}
                    </p>
                  )}
                  {amount && Number(amount) > maxAmount && (
                    <p className="mt-2 text-sm text-destructive">
                      Amount cannot exceed KES {maxAmount.toLocaleString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 2: Confirmation */}
          {step === 2 && (
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Payment Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-medium">
                      KES {Number(amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Group:</span>
                    <span className="font-medium">{groupName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="pt-4">
                    <label className="block mb-2 text-sm font-medium">
                      M-Pesa Phone Number
                    </label>
                    <Input
                      type="text"
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="h-12"
                      maxLength={10}
                    />
                    {phoneNumber && phoneNumber.length < 10 && (
                      <p className="mt-1 text-xs text-destructive">
                        Please enter a valid 10-digit phone number
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 3: Processing/Result */}
          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-8">
              {isProcessing && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="relative w-20 h-20 mb-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader2 size={80} className="text-primary" />
                    </motion.div>
                  </div>
                  <p className="text-center text-muted-foreground">
                    Please check your phone for the M-Pesa prompt
                  </p>
                </motion.div>
              )}

              {isSuccess && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-green-100 dark:bg-green-900">
                    <Check
                      size={40}
                      className="text-green-600 dark:text-green-300"
                    />
                  </div>
                  <p className="mb-2 text-xl font-semibold">
                    KES {Number(amount).toLocaleString()}
                  </p>
                  <p className="text-center text-muted-foreground">
                    Your contribution to {groupName} has been received. Thank
                    you!
                  </p>
                </motion.div>
              )}

              {isError && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="flex flex-col items-center"
                >
                  <div className="flex items-center justify-center w-20 h-20 mb-4 rounded-full bg-red-100 dark:bg-red-900">
                    <X size={40} className="text-red-600 dark:text-red-300" />
                  </div>
                  <p className="mb-2 text-xl font-semibold">Payment Failed</p>
                  <p className="text-center text-muted-foreground">
                    We couldn't process your payment. Please try again.
                  </p>
                </motion.div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:flex-col gap-2">
          {step === 1 && (
            <>
              <Button
                onClick={handleNextStep}
                className="w-full"
                disabled={
                  !amount ||
                  Number(amount) < minAmount ||
                  Number(amount) > maxAmount
                }
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full mt-2"
              >
                Cancel
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button
                onClick={handleNextStep}
                className="w-full"
                disabled={phoneNumber.length !== 10}
              >
                Pay with M-Pesa <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                className="w-full mt-2"
              >
                Back
              </Button>
            </>
          )}

          {step === 3 && isError && (
            <Button onClick={handleTryAgain} className="w-full">
              Try Again
            </Button>
          )}

          {step === 3 && isSuccess && (
            <Button onClick={() => setShowReceipt(true)} className="w-full">
              View Receipt
            </Button>
          )}
        </DialogFooter>
      </DialogContent>

      {/* Virtual Receipt Modal */}
      {showReceipt && receiptData && (
        <VirtualReceipt
          isOpen={showReceipt}
          onClose={resetFlow}
          receiptData={receiptData}
        />
      )}
    </Dialog>
  );
};

export default ContributionFlow;
