import UserDashboard from "@/app/components/dashboard/UserDashboard";
import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { transformUsers } from "@/app/lib/util";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

const UserPage = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }

  //Fetch user specific data
  const teamMembers = user.teamId
    ? await prisma.user.findMany({
        where: {
          teamId: user.teamId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
        },
      })
    : [];

  const myTeamMembers = transformUsers(teamMembers);

  return <UserDashboard myTeamMembers={myTeamMembers} currentUser={user} />;
};

export default UserPage;
