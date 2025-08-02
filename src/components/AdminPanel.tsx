import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Calendar,
  DollarSign,
  Users,
  Settings,
  PieChart,
} from "lucide-react";

interface Member {
  id: string;
  name: string;
  phone: string;
  email: string;
  joinDate: string;
  avatar?: string;
}

interface Payment {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  date: string;
  category: string;
  status: "completed" | "pending" | "failed";
}

interface Recipient {
  id: string;
  name: string;
  scheduledDate: string;
  amount: number;
  status: "upcoming" | "current" | "completed";
}

const AdminPanel = ({ isOpen = true }: { isOpen?: boolean }) => {
  const [activeTab, setActiveTab] = useState("members");
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [editMemberDialogOpen, setEditMemberDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [fundAllocationOpen, setFundAllocationOpen] = useState(false);
  const [fundDestination, setFundDestination] = useState("savings");

  // Mock data
  const members: Member[] = [
    {
      id: "1",
      name: "John Kamau",
      phone: "+254712345678",
      email: "john@example.com",
      joinDate: "2023-01-15",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    },
    {
      id: "2",
      name: "Mary Wanjiku",
      phone: "+254723456789",
      email: "mary@example.com",
      joinDate: "2023-02-20",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mary",
    },
    {
      id: "3",
      name: "David Ochieng",
      phone: "+254734567890",
      email: "david@example.com",
      joinDate: "2023-03-10",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
    {
      id: "4",
      name: "Sarah Auma",
      phone: "+254745678901",
      email: "sarah@example.com",
      joinDate: "2023-04-05",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
  ];

  const payments: Payment[] = [
    {
      id: "p1",
      memberId: "1",
      memberName: "John Kamau",
      amount: 5000,
      date: "2023-05-15",
      category: "Wedding",
      status: "completed",
    },
    {
      id: "p2",
      memberId: "2",
      memberName: "Mary Wanjiku",
      amount: 3000,
      date: "2023-05-16",
      category: "Emergency",
      status: "completed",
    },
    {
      id: "p3",
      memberId: "3",
      memberName: "David Ochieng",
      amount: 4000,
      date: "2023-05-17",
      category: "Land",
      status: "pending",
    },
    {
      id: "p4",
      memberId: "4",
      memberName: "Sarah Auma",
      amount: 2500,
      date: "2023-05-18",
      category: "Wedding",
      status: "failed",
    },
  ];

  const recipients: Recipient[] = [
    {
      id: "r1",
      name: "Mary Wanjiku",
      scheduledDate: "2023-06-01",
      amount: 15000,
      status: "current",
    },
    {
      id: "r2",
      name: "David Ochieng",
      scheduledDate: "2023-07-01",
      amount: 15000,
      status: "upcoming",
    },
    {
      id: "r3",
      name: "Sarah Auma",
      scheduledDate: "2023-08-01",
      amount: 15000,
      status: "upcoming",
    },
    {
      id: "r4",
      name: "John Kamau",
      scheduledDate: "2023-09-01",
      amount: 15000,
      status: "upcoming",
    },
  ];

  const handleEditMember = (member: Member) => {
    setSelectedMember(member);
    setEditMemberDialogOpen(true);
  };

  const handleDeleteMember = (member: Member) => {
    setSelectedMember(member);
    setDeleteDialogOpen(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>;
      case "current":
        return <Badge className="bg-blue-500">Current</Badge>;
      case "upcoming":
        return <Badge className="bg-purple-500">Upcoming</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-full bg-background p-4 rounded-lg border shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">Admin Panel</h2>
          <p className="text-muted-foreground">
            Manage your group's members, payments, and schedules
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users size={16} />
            <span className="hidden sm:inline">Members</span>
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <DollarSign size={16} />
            <span className="hidden sm:inline">Payments</span>
          </TabsTrigger>
          <TabsTrigger value="recipients" className="flex items-center gap-2">
            <Calendar size={16} />
            <span className="hidden sm:inline">Schedule</span>
          </TabsTrigger>
          <TabsTrigger value="allocation" className="flex items-center gap-2">
            <PieChart size={16} />
            <span className="hidden sm:inline">Fund Control</span>
          </TabsTrigger>
        </TabsList>

        {/* Member Management Tab */}
        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Members</CardTitle>
                  <CardDescription>Manage group members</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search members..." className="pl-8" />
                  </div>
                  <Dialog
                    open={addMemberDialogOpen}
                    onOpenChange={setAddMemberDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Member</DialogTitle>
                        <DialogDescription>
                          Fill in the details to add a new member to the group.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input id="name" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="phone" className="text-right">
                            Phone
                          </Label>
                          <Input id="phone" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="email" className="text-right">
                            Email
                          </Label>
                          <Input id="email" className="col-span-3" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setAddMemberDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button>Add Member</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Phone
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Email
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Join Date
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={member.avatar}
                                alt={member.name}
                              />
                              <AvatarFallback>
                                {member.name.substring(0, 2).toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-muted-foreground md:hidden">
                                {member.phone}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {member.phone}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {member.email}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {member.joinDate}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEditMember(member)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteMember(member)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {members.length} members
              </p>
            </CardFooter>
          </Card>

          {/* Edit Member Dialog */}
          <Dialog
            open={editMemberDialogOpen}
            onOpenChange={setEditMemberDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Member</DialogTitle>
                <DialogDescription>
                  Update member information.
                </DialogDescription>
              </DialogHeader>
              {selectedMember && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="edit-name"
                      defaultValue={selectedMember.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-phone" className="text-right">
                      Phone
                    </Label>
                    <Input
                      id="edit-phone"
                      defaultValue={selectedMember.phone}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="edit-email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="edit-email"
                      defaultValue={selectedMember.email}
                      className="col-span-3"
                    />
                  </div>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setEditMemberDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Delete Confirmation Dialog */}
          <AlertDialog
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently remove{" "}
                  {selectedMember?.name} from the group.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500 hover:bg-red-600">
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TabsContent>

        {/* Payment Allocation Tab */}
        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Payment Allocation</CardTitle>
                  <CardDescription>Manage and track payments</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search payments..." className="pl-8" />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Assign Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign Payment</DialogTitle>
                        <DialogDescription>
                          Allocate a payment to a specific savings category.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="member" className="text-right">
                            Member
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select member" />
                            </SelectTrigger>
                            <SelectContent>
                              {members.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="category" className="text-right">
                            Category
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="wedding">Wedding</SelectItem>
                              <SelectItem value="emergency">
                                Emergency
                              </SelectItem>
                              <SelectItem value="land">Land</SelectItem>
                              <SelectItem value="education">
                                Education
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Assign Payment</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Date
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Category
                      </TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.memberName}</TableCell>
                        <TableCell>
                          KSh {payment.amount.toLocaleString()}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {payment.date}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {payment.category}
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {payments.length} payments
              </p>
              <Button variant="outline">Generate Report</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Recipient Scheduling Tab */}
        <TabsContent value="recipients" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Recipient Scheduling</CardTitle>
                  <CardDescription>
                    Manage who receives contributions next
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full sm:w-auto">
                        <Plus className="mr-2 h-4 w-4" /> Set Next Recipient
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Set Next Recipient</DialogTitle>
                        <DialogDescription>
                          Choose who will receive the next contribution.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="recipient" className="text-right">
                            Member
                          </Label>
                          <Select>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select member" />
                            </SelectTrigger>
                            <SelectContent>
                              {members.map((member) => (
                                <SelectItem key={member.id} value={member.id}>
                                  {member.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="date" className="text-right">
                            Date
                          </Label>
                          <Input id="date" type="date" className="col-span-3" />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="amount" className="text-right">
                            Amount
                          </Label>
                          <Input
                            id="amount"
                            type="number"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Set Recipient</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Scheduled Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recipients.map((recipient) => (
                      <TableRow key={recipient.id}>
                        <TableCell>{recipient.name}</TableCell>
                        <TableCell>{recipient.scheduledDate}</TableCell>
                        <TableCell>
                          KSh {recipient.amount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(recipient.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {recipients.length} scheduled recipients
              </p>
              <Button variant="outline">Adjust Rotation</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Fund Allocation Control Tab */}
        <TabsContent value="allocation" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Fund Allocation Control</CardTitle>
                  <CardDescription>
                    Decide where collected funds should go
                  </CardDescription>
                </div>
                <Dialog
                  open={fundAllocationOpen}
                  onOpenChange={setFundAllocationOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="w-full sm:w-auto">
                      <Settings className="mr-2 h-4 w-4" /> Configure Allocation
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Fund Allocation Settings</DialogTitle>
                      <DialogDescription>
                        Set how collected funds should be distributed
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="savings"
                            name="allocation"
                            value="savings"
                            checked={fundDestination === "savings"}
                            onChange={(e) => setFundDestination(e.target.value)}
                          />
                          <Label htmlFor="savings" className="flex-1">
                            <div>
                              <p className="font-medium">Project Savings</p>
                              <p className="text-sm text-muted-foreground">
                                Save funds for group projects and investments
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="distribution"
                            name="allocation"
                            value="distribution"
                            checked={fundDestination === "distribution"}
                            onChange={(e) => setFundDestination(e.target.value)}
                          />
                          <Label htmlFor="distribution" className="flex-1">
                            <div>
                              <p className="font-medium">Member Distribution</p>
                              <p className="text-sm text-muted-foreground">
                                Distribute funds among members in rotation
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="emergency"
                            name="allocation"
                            value="emergency"
                            checked={fundDestination === "emergency"}
                            onChange={(e) => setFundDestination(e.target.value)}
                          />
                          <Label htmlFor="emergency" className="flex-1">
                            <div>
                              <p className="font-medium">Emergency Fund</p>
                              <p className="text-sm text-muted-foreground">
                                Reserve funds for member emergencies
                              </p>
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id="mixed"
                            name="allocation"
                            value="mixed"
                            checked={fundDestination === "mixed"}
                            onChange={(e) => setFundDestination(e.target.value)}
                          />
                          <Label htmlFor="mixed" className="flex-1">
                            <div>
                              <p className="font-medium">Mixed Allocation</p>
                              <p className="text-sm text-muted-foreground">
                                Split funds across multiple purposes
                              </p>
                            </div>
                          </Label>
                        </div>
                      </div>

                      {fundDestination === "mixed" && (
                        <div className="space-y-4 pt-4 border-t">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Savings</Label>
                            <Input
                              type="number"
                              placeholder="40"
                              className="col-span-2"
                            />
                            <span className="text-sm text-muted-foreground">
                              %
                            </span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Distribution</Label>
                            <Input
                              type="number"
                              placeholder="35"
                              className="col-span-2"
                            />
                            <span className="text-sm text-muted-foreground">
                              %
                            </span>
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label className="text-right">Emergency</Label>
                            <Input
                              type="number"
                              placeholder="25"
                              className="col-span-2"
                            />
                            <span className="text-sm text-muted-foreground">
                              %
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setFundAllocationOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button onClick={() => setFundAllocationOpen(false)}>
                        Save Settings
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">Project Savings</h3>
                      <p className="text-2xl font-bold text-green-600 mt-2">
                        KSh 45,000
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        40% of total funds
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">
                        Distribution Pool
                      </h3>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        KSh 35,000
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        35% of total funds
                      </p>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold text-lg">Emergency Fund</h3>
                      <p className="text-2xl font-bold text-orange-600 mt-2">
                        KSh 25,000
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        25% of total funds
                      </p>
                    </div>
                  </Card>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total Funds Available</span>
                    <span className="text-green-600">KSh 105,000</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Current allocation:{" "}
                    {fundDestination === "mixed"
                      ? "Mixed"
                      : fundDestination.charAt(0).toUpperCase() +
                        fundDestination.slice(1)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;
