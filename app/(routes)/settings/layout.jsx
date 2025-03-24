"use client";

import { eq } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Budgets, Users } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import DashboardSideNavbar from "@/components/Dashboard/DashboardSideNavbar";

const SettingsLayout = ({ children }) => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12 && hour > 5) return "Good Morning";
    if (hour < 18 && hour > 12) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {
    const checkUserBudgets = async () => {
      if (pathname === "/dashboard") {
        const result = await db
          .select()
          .from(Budgets)
          .where(
            eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress)
          );
        if (result?.length === 0) {
          router.replace("/dashboard/budgets");
        }
      }
    };

    user && checkUserBudgets();
  }, [pathname, user, router]);

  return (
    <div className="flex h-screen">
      <div className="fixed top-0 left-0 2xl:w-80 2xl:block hidden w-full h-screen bg-transparent z-10">
        <DashboardSideNavbar />
      </div>

      <div className="flex-1 2xl:ml-80">
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
