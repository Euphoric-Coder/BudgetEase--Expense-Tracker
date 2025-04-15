import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { budgetId } = params;

  try {
    const user = await currentUser();

    if (!user?.emailAddresses[0].emailAddress) {
      return NextResponse.json(
        { error: "User is not authenticated" },
        { status: 401 }
      );
    }

    const blog = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.emailAddresses[0].emailAddress))
      .where(eq(Budgets.id, budgetId))
      .groupBy(Budgets.id);

    return NextResponse.json(blog[0]);
  } catch (error) {
    console.error("Error fetching budget by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch budget!" },
      { status: 500 }
    );
  }
}
