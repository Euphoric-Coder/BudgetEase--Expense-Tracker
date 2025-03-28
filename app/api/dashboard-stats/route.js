import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { dashboardData } from "@/utils/userAppData";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user?.emailAddresses[0].emailAddress) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    const dashboardStats = await dashboardData(user?.emailAddresses[0].emailAddress);
    return NextResponse.json(dashboardStats);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    return NextResponse.json(
      { error: "Failed to fetch budgets" },
      { status: 500 }
    );
  }
}
