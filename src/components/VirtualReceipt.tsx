import React from "react";
import { motion } from "framer-motion";
import { Check, Download, Share, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VirtualReceiptProps {
  isOpen?: boolean;
  onClose?: () => void;
  receiptData?: {
    transactionId: string;
    amount: number;
    date: string;
    memberName: string;
    groupName: string;
    paymentMethod: string;
    status: string;
  };
}

const VirtualReceipt = ({
  isOpen = true,
  onClose = () => {},
  receiptData = {
    transactionId: "TXN123456789",
    amount: 5000,
    date: new Date().toLocaleDateString(),
    memberName: "Jane Doe",
    groupName: "Family Savings Group",
    paymentMethod: "M-Pesa",
    status: "Completed",
  },
}: VirtualReceiptProps) => {
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading receipt...");
  };

  const handleShare = () => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: "MobiChama Receipt",
        text: `Payment receipt for KSh ${receiptData.amount.toLocaleString()}`,
        url: window.location.href,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-background">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold text-green-600">
            Payment Successful!
          </DialogTitle>
        </DialogHeader>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="border-2 border-green-200 bg-green-50 dark:bg-green-900/20">
            <CardHeader className="text-center pb-4">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4"
              >
                <Check className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-lg font-semibold">Virtual Receipt</h3>
              <p className="text-sm text-muted-foreground">
                Transaction Confirmation
              </p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="border-t border-dashed border-gray-300 pt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Transaction ID</p>
                    <p className="font-mono font-medium">
                      {receiptData.transactionId}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date & Time</p>
                    <p className="font-medium">{receiptData.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Member</p>
                    <p className="font-medium">{receiptData.memberName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Group</p>
                    <p className="font-medium">{receiptData.groupName}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Payment Method</p>
                    <p className="font-medium">{receiptData.paymentMethod}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Status</p>
                    <p className="font-medium text-green-600">
                      {receiptData.status}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-4">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm">Amount Paid</p>
                  <p className="text-3xl font-bold text-green-600">
                    KSh {receiptData.amount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="border-t border-dashed border-gray-300 pt-4">
                <div className="text-center text-xs text-muted-foreground">
                  <p>Thank you for your contribution!</p>
                  <p className="mt-1">MobiChama - Digital Group Savings</p>
                  <p className="font-mono mt-2">{new Date().toISOString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="flex gap-2 mt-6">
          <Button variant="outline" className="flex-1" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" className="flex-1" onClick={handleShare}>
            <Share className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button
            className="flex-1 bg-green-600 hover:bg-green-700"
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VirtualReceipt;
