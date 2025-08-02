import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Download,
  FileText,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ReportsPanelProps {
  isOpen?: boolean;
}

const ReportsPanel = ({ isOpen = true }: ReportsPanelProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedMonth, setSelectedMonth] = useState("may");

  // Mock data for reports
  const monthlyData = [
    { month: "January", contributions: 45000, members: 12, target: 50000 },
    { month: "February", contributions: 52000, members: 12, target: 50000 },
    { month: "March", contributions: 48000, members: 13, target: 50000 },
    { month: "April", contributions: 55000, members: 13, target: 50000 },
    { month: "May", contributions: 58000, members: 14, target: 60000 },
  ];

  const memberContributions = [
    { name: "John Kamau", amount: 5000, percentage: 100, status: "paid" },
    { name: "Mary Wanjiku", amount: 5000, percentage: 100, status: "paid" },
    { name: "David Ochieng", amount: 3000, percentage: 60, status: "partial" },
    { name: "Sarah Auma", amount: 0, percentage: 0, status: "unpaid" },
    { name: "Peter Mwangi", amount: 5000, percentage: 100, status: "paid" },
  ];

  const fundAllocation = [
    { category: "Emergency Fund", amount: 25000, percentage: 35 },
    { category: "Project Savings", amount: 30000, percentage: 42 },
    { category: "Member Distribution", amount: 16500, percentage: 23 },
  ];

  const handleGenerateReport = () => {
    console.log(
      "Generating report for",
      selectedPeriod,
      selectedYear,
      selectedMonth,
    );
    // In a real app, this would generate and download a PDF report
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-500">Paid</Badge>;
      case "partial":
        return <Badge className="bg-yellow-500">Partial</Badge>;
      case "unpaid":
        return <Badge className="bg-red-500">Unpaid</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full bg-background p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            Reports & Analytics
          </h2>
          <p className="text-muted-foreground">
            Generate detailed reports and track group performance
          </p>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="allocation">Fund Allocation</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Contributions
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KSh 258,000</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Members
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14</div>
                <p className="text-xs text-muted-foreground">
                  +1 new member this month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Payment Rate
                </CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  12 of 14 members paid
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
              <CardDescription>
                Create detailed reports for specific periods
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="period">Report Period</Label>
                  <Select
                    value={selectedPeriod}
                    onValueChange={setSelectedPeriod}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2023">2023</SelectItem>
                      <SelectItem value="2022">2022</SelectItem>
                      <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedPeriod === "monthly" && (
                  <div className="space-y-2">
                    <Label htmlFor="month">Month</Label>
                    <Select
                      value={selectedMonth}
                      onValueChange={setSelectedMonth}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="january">January</SelectItem>
                        <SelectItem value="february">February</SelectItem>
                        <SelectItem value="march">March</SelectItem>
                        <SelectItem value="april">April</SelectItem>
                        <SelectItem value="may">May</SelectItem>
                        <SelectItem value="june">June</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Button
                onClick={handleGenerateReport}
                className="w-full md:w-auto"
              >
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monthly Tab */}
        <TabsContent value="monthly" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
              <CardDescription>
                Track monthly contributions and targets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Contributions</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Progress</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthlyData.map((month) => {
                      const progress =
                        (month.contributions / month.target) * 100;
                      return (
                        <TableRow key={month.month}>
                          <TableCell className="font-medium">
                            {month.month}
                          </TableCell>
                          <TableCell>
                            KSh {month.contributions.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            KSh {month.target.toLocaleString()}
                          </TableCell>
                          <TableCell>{month.members}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={progress} className="w-20" />
                              <span className="text-sm">
                                {Math.round(progress)}%
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Members Tab */}
        <TabsContent value="members" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Contributions - May 2023</CardTitle>
              <CardDescription>
                Individual member payment status and amounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Amount Paid</TableHead>
                      <TableHead>Percentage</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {memberContributions.map((member) => (
                      <TableRow key={member.name}>
                        <TableCell className="font-medium">
                          {member.name}
                        </TableCell>
                        <TableCell>
                          KSh {member.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={member.percentage}
                              className="w-16"
                            />
                            <span className="text-sm">
                              {member.percentage}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(member.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fund Allocation Tab */}
        <TabsContent value="allocation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fund Allocation</CardTitle>
              <CardDescription>
                How collected funds are distributed
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fundAllocation.map((fund) => (
                  <div key={fund.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{fund.category}</span>
                      <span className="text-sm text-muted-foreground">
                        KSh {fund.amount.toLocaleString()} ({fund.percentage}%)
                      </span>
                    </div>
                    <Progress value={fund.percentage} className="h-3" />
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total Allocated</span>
                  <span>KSh 71,500</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReportsPanel;
