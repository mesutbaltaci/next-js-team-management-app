import { getCurrentUser } from "@/app/lib/auth";
import { Role } from "@/app/types";
import { redirect } from "next/navigation";

const DashboardLayout = async () => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  //   redirect based on role

  switch (user.role) {
    case Role.ADMIN:
      redirect("/dashboard/admin");
      break;
    case Role.MANAGER:
      redirect("/dashboard/manager");
      break;
    case Role.USER:
      redirect("/dashboard/user");
      break;
  }
};

export default DashboardLayout;
