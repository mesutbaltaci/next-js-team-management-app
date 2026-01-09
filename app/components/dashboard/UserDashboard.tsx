"use client";

import { Team, User } from "@/app/types";

interface UserDashboardProps {
  myTeamMembers: User[];
  currentUser: User;
}
const UserDashboard = ({
  myTeamMembers,

  currentUser,
}: UserDashboardProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">User Dashboard</h1>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* team members */}

        {/* my teeam members */}
      </div>
    </div>
  );
};

export default UserDashboard;
