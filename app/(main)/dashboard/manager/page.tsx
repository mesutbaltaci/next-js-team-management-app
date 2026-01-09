import { checkUserPermission, getCurrentUser } from "@/app/lib/auth";
import { prisma } from "@/app/lib/db";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

const ManagerPage = async () => {
  const user = await getCurrentUser();
  if (!user || !checkUserPermission(user, Role.MANAGER)) {
    redirect("/unauthorized");
  }

  //Fetch manager's own team members
  const prismaMyTeamMembers = user.teamId
    ? prisma.user.findMany({
        where: {
          teamId: user.teamId,
          role: { not: Role.ADMIN },
        },
        include: {
          team: true,
        },
      })
    : [];

  //fetch all the team members cross team view
  const prismaAllTeamMembers = prisma.user.findMany({
    where: {
      role: { not: Role.ADMIN },
    },
    include: {
      team: {
        select: {
          id: true,
          name: true,
          code: true,
          description: true,
        },
      },
    },
    orderBy: { teamId: "desc" },
  });

  return (
    <ManagerDashboard
      myTeamMembers={prismaMyTeamMembers}
      allTeamMembers={prismaAllTeamMembers}
      currectUser={user}
    />
  );
};

export default ManagerPage;
