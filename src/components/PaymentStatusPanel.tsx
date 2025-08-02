import React, { useState } from "react";
import { Search, Filter, Check, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Member {
  id: string;
  name: string;
  avatar: string;
  paymentStatus: "paid" | "unpaid";
  amount: number;
  date: string;
}

const PaymentStatusPanel = ({
  members = defaultMembers,
}: {
  members?: Member[];
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "paid" | "unpaid">(
    "all",
  );

  // Filter members based on search query and payment status
  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || member.paymentStatus === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-md">
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl font-bold">Payment Status</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
            <Select
              value={filterStatus}
              onValueChange={(value) =>
                setFilterStatus(value as "all" | "paid" | "unpaid")
              }
            >
              <SelectTrigger className="w-full sm:w-[180px]">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Members</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="unpaid">Unpaid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback>
                      {member.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">
                    KSh {member.amount.toLocaleString()}
                  </p>
                  <Badge
                    variant={
                      member.paymentStatus === "paid"
                        ? "default"
                        : "destructive"
                    }
                    className="flex items-center gap-1"
                  >
                    {member.paymentStatus === "paid" ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Paid</span>
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3" />
                        <span>Unpaid</span>
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No members found matching your search.
              </p>
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {members.length} members
          </p>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultMembers: Member[] = [
  {
    id: "1",
    name: "Wanjiku Kamau",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=wanjiku",
    paymentStatus: "paid",
    amount: 5000,
    date: "May 15, 2023",
  },
  {
    id: "2",
    name: "Otieno Ochieng",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=otieno",
    paymentStatus: "paid",
    amount: 5000,
    date: "May 14, 2023",
  },
  {
    id: "3",
    name: "Amina Hassan",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amina",
    paymentStatus: "unpaid",
    amount: 5000,
    date: "Due: May 20, 2023",
  },
  {
    id: "4",
    name: "David Mwangi",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    paymentStatus: "unpaid",
    amount: 5000,
    date: "Due: May 18, 2023",
  },
  {
    id: "5",
    name: "Faith Njeri",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=faith",
    paymentStatus: "paid",
    amount: 5000,
    date: "May 12, 2023",
  },
];

export default PaymentStatusPanel;
