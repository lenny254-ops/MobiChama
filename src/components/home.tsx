import React, { useState } from "react";
import { Bell, Menu, Moon, Sun, User, BarChart3, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Switch } from "./ui/switch";
import PaymentStatusPanel from "./PaymentStatusPanel";
import SavingsGoalTracker from "./SavingsGoalTracker";
import AdminPanel from "./AdminPanel";
import ContributionFlow from "./ContributionFlow";
import ReportsPanel from "./ReportsPanel";

interface HomeProps {
  user?: { name: string; email: string } | null;
  onSignOut?: () => void;
}

const Home = ({ user, onSignOut = () => {} }: HomeProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [showContribution, setShowContribution] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true); // For demo purposes, set to true
  const [activeTab, setActiveTab] = useState("dashboard");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    // In a real app, you would apply the theme to the document here
  };

  return (
    <div
      className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 border-b bg-background p-4 shadow-sm">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-primary">MobiChama</h1>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <div className="flex items-center gap-2">
              <Switch
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
              {theme === "light" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=user123"
                      alt="User"
                    />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Groups</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 pb-20 md:pb-4">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome, {user?.name || "User"}
            </h2>
            <p className="text-muted-foreground">
              Your group savings dashboard
            </p>
          </div>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700"
            onClick={() => setShowContribution(true)}
          >
            Contribute via M-Pesa
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="reports">
              <BarChart3 className="w-4 h-4 mr-2" />
              Reports
            </TabsTrigger>
            {isAdmin && <TabsTrigger value="admin">Admin</TabsTrigger>}
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <PaymentStatusPanel />
              <SavingsGoalTracker />
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <ReportsPanel />
          </TabsContent>

          {isAdmin && (
            <TabsContent value="admin">
              <AdminPanel />
            </TabsContent>
          )}

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">Name: {user?.name}</p>
                    <p className="text-muted-foreground">
                      Email: {user?.email}
                    </p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Mobile Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 border-t bg-background p-2 md:hidden">
        <div className="flex items-center justify-around">
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
          <Button variant="ghost" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
            </svg>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Contribution Modal */}
      {showContribution && (
        <ContributionFlow
          isOpen={showContribution}
          onClose={() => setShowContribution(false)}
          memberName={user?.name || "User"}
          onSuccess={(amount) => {
            console.log(`Contribution of KSh ${amount} successful`);
            setShowContribution(false);
          }}
        />
      )}
    </div>
  );
};

export default Home;
