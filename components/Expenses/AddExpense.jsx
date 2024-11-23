"use client";

import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { db } from "@/utils/dbConfig";
import { Budgets, Expenses } from "@/utils/schema";
import { toast } from "sonner";
import moment from "moment";
import { eq, getTableColumns, sql } from "drizzle-orm";
import { useUser } from "@clerk/nextjs";
import { AlertCircle, Eraser, EraserIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const AddExpense = ({ budgetId, refreshData, budgetAmount }) => {
  const { user } = useUser();
  const [name, setname] = useState();
  const [amount, setamount] = useState();
  const [overBudget, setOverBudget] = useState(false);
  const [overBudgetAmount, setOverBudgetAmount] = useState(0);
  const alertTimeoutRef = useRef(null);

  // Function to fetch the total expenses for the specified budget
  const fetchTotalExpenses = async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`.mapWith(Number),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .where(eq(Budgets.id, budgetId))
      .groupBy(Budgets.id);

    return result[0].totalSpend ?? 0;
  };

  const addNewExpense = async () => {
    // Fetch the current total expenses
    const currentTotal = await fetchTotalExpenses();
    const newTotal = currentTotal + parseFloat(amount);

    // Check if adding this expense will exceed the budget
    if (newTotal > budgetAmount) {
      setOverBudget(true);
      setOverBudgetAmount(newTotal - budgetAmount);

      // Clear any existing timeout to avoid conflicts
      if (alertTimeoutRef.current) clearTimeout(alertTimeoutRef.current);

      // Set timeout to hide alert after 3 seconds
      alertTimeoutRef.current = setTimeout(() => {
        setOverBudget(false);
        setOverBudgetAmount(0);
      }, 3000);

      return;
    }
    console.log(newTotal);
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });
    
      setname("");
      setamount("");
    if (result) {
      refreshData();
      toast("New Expense Added");
    }
  };

  const clearData = () => {
    setname("");
    setamount("");
  }
  return (
    <div className="border-2 border-indigo-200 p-8 rounded-3xl bg-gradient-to-b from-blue-50 via-indigo-100 to-purple-100 shadow-2xl relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Glows */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-blue-500 via-teal-400 to-purple-600 opacity-25 blur-3xl animate-spin-slow"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-gradient-to-br from-purple-500 via-indigo-400 to-blue-500 opacity-20 blur-[120px]"></div>
        {/* Floating Particles */}
        <div className="absolute inset-0 flex space-x-4 animate-float">
          <div className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg"></div>
          <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-lg"></div>
          <div className="w-4 h-4 bg-gradient-to-r from-green-400 to-teal-500 rounded-full blur-lg"></div>
        </div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 flex justify-between items-center">
        <h2 className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 animate-gradient-text">
          Add Expense
        </h2>
        <Button
          onClick={() => clearData()}
          className="px-4 py-2 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-red-600 hover:to-yellow-600 transition-transform transform hover:scale-105"
        >
          Clear Data
        </Button>
      </div>

      {/* Over Budget Alert */}
      {overBudget && (
        <Alert
          variant="destructive"
          className="mt-6 bg-gradient-to-br from-red-100 to-pink-100 border border-red-400 shadow-lg p-4 rounded-xl flex items-center hover:shadow-xl transition-transform transform hover:scale-105"
        >
          <AlertCircle className="h-5 w-5 text-red-600 mr-3" />
          <div>
            <AlertTitle className="text-red-700 font-bold">
              Error - Over Budget
            </AlertTitle>
            <AlertDescription className="text-red-600">
              Adding this expense "<b>{name}</b>" will exceed your budget limit
              by <b>Rs. {overBudgetAmount}</b>!
            </AlertDescription>
          </div>
        </Alert>
      )}

      {/* Expense Name Input */}
      <div className="mt-6">
        <h3 className="text-gray-700 font-medium mb-2">Expense Name</h3>
        <Input
          type="text"
          placeholder="e.g. Home Decor"
          className="w-full border border-gray-300 rounded-xl shadow-lg p-4 bg-gradient-to-br from-white to-indigo-50 focus:ring focus:ring-indigo-300 transition-transform transform hover:scale-105 duration-200"
          value={name}
          onChange={(e) => setname(e.target.value)}
        />
      </div>

      {/* Expense Amount Input */}
      <div className="mt-6">
        <h3 className="text-gray-700 font-medium mb-2">Expense Amount</h3>
        <Input
          type="number"
          placeholder="e.g. Rs.5000"
          className="w-full border border-gray-300 rounded-xl shadow-lg p-4 bg-gradient-to-br from-white to-indigo-50 focus:ring focus:ring-indigo-300 transition-transform transform hover:scale-105 duration-200"
          value={amount}
          onChange={(e) => setamount(e.target.value)}
        />
      </div>

      {/* Add Expense Button */}
      <Button
        onClick={() => addNewExpense()}
        disabled={!(name && amount)}
        className="mt-8 w-full bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700 transition-transform transform hover:scale-105 duration-300 disabled:opacity-50"
      >
        Add New Expense
      </Button>
    </div>
  );
};

export default AddExpense;
