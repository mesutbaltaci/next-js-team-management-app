"use client";

import { Team, User } from "@/app/types";

interface ManagerDashboardProps {
  myTeamMembers: User[];
  allTeamMembers: User[];
  currentUser: User;
}

const ManagerDashboard = ({
  myTeamMembers,
  allTeamMembers,
  currentUser,
}: ManagerDashboardProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Manager Dashboard</h1>
        <p className="text-slate-300">Team Management </p>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* team members */}

        {/* my teeam members */}
      </div>
    </div>
  );
};

export default ManagerDashboard;
