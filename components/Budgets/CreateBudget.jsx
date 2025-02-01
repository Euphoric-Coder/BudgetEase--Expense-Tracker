"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmojiPicker from "emoji-picker-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { db } from "@/utils/dbConfig";
import { Button } from "../ui/button";
import { Budgets } from "@/utils/schema";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Checkbox } from "../ui/checkbox";
import { getISTDateTime } from "@/utils/utilities";
import {
  expenseCategoriesList,
  expenseSubcategories,
  frequencyTypes,
} from "@/utils/data";

const CreateBudget = ({ refreshData }) => {
  const [emojiIcon, setEmojiIcon] = useState("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [isRecurring, setIsRecurring] = useState(false); // Toggle for recurring
  const [frequency, setFrequency] = useState("monthly"); // Default frequency
  const [category, setCategory] = useState("housing");
  const [selectedSubCategories, setSelectedSubCategories] = useState("");

  const router = useRouter();
  const [name, setname] = useState();
  const [amount, setamount] = useState();

  const { user } = useUser();
  const onCreateBudget = async () => {
    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
        budgetType: isRecurring ? "recurring" : "non-recurring",
        frequency: isRecurring ? frequency : null,
        createdAt: getISTDateTime(),
      })
      .returning({ insertedId: Budgets.id });
    if (result) {
      refreshData();
      toast.success(`New Budget:"${name}" Created!`);
    }
  };
  return (
    <Dialog
      onOpenChange={() => {
        setIsRecurring(false);
        setFrequency("monthly");
        setCategory("housing");
        setSelectedSubCategories("");
        setname("");
        setamount("");
      }}
    >
      <DialogTrigger>
        <div className="bg-gradient-to-b from-white via-blue-50 to-indigo-50 dark:from-gray-800 dark:via-blue-900 dark:to-indigo-950 p-10 rounded-2xl items-center flex flex-col border-2 border-dashed border-indigo-300 dark:border-blue-600 cursor-pointer hover:shadow-[0_4px_20px_rgba(0,200,255,0.5)] hover:scale-105 transition-transform transform">
          <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-indigo-400 dark:via-blue-400 dark:to-blue-500">
            +
          </h2>
          <h2 className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 dark:from-teal-400 dark:via-blue-500 dark:to-indigo-400">
            Create New Budget
          </h2>
        </div>
      </DialogTrigger>

      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 rounded-3xl shadow-[0_0_40px_rgba(0,200,255,0.3)] w-[95%] max-w-lg max-h-[80vh] md:max-h-[90vh] overflow-y-auto">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-60 h-60 bg-gradient-radial from-purple-400 via-blue-400 to-transparent dark:from-indigo-800 dark:via-blue-800 dark:to-gray-800 opacity-25 blur-3xl animate-spin-slow"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-radial from-teal-300 via-blue-300 to-transparent dark:from-blue-900 dark:via-teal-800 dark:to-gray-800 opacity-30 blur-[120px]"></div>
        </div>

        {/* Dialog Header */}
        <DialogHeader>
          <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-indigo-400 dark:to-teal-400">
            Create New Budget
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
            Fill in the details below to create your budget.
          </DialogDescription>
        </DialogHeader>

        {/* Emoji Picker Section */}
        <div className="">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-indigo-300 dark:border-indigo-600 rounded-full p-4 bg-gradient-to-r from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 shadow-md hover:shadow-lg hover:scale-105 transition-transform"
            onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
          >
            {emojiIcon}
          </Button>

          {/* Emoji Picker */}
          {openEmojiPicker && (
            <div
              className="absolute z-20 space-y-4"
              style={{ minWidth: "250px" }}
            >
              <EmojiPicker
                onEmojiClick={(e) => {
                  setEmojiIcon(e.emoji);
                  setOpenEmojiPicker(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Input Fields */}
        <div className="mt-1">
          <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Budget Name
          </h2>
          <Input
            type="text"
            placeholder="e.g. Home Decor"
            className="budg-input-field focus-visible:ring-cyan-400 dark:focus-visible:ring-blue-400 focus-visible:ring-[2px]"
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mt-6">
          <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Budget Amount
          </h2>
          <Input
            type="number"
            placeholder="e.g. Rs.5000"
            className="budg-input-field focus-visible:ring-cyan-400 dark:focus-visible:ring-blue-400 focus-visible:ring-[2px]"
            onChange={(e) => setamount(e.target.value)}
          />
        </div>

        <div className="mt-4">
          <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">
            Category
          </h2>
          <Select
            value={category.toLowerCase()}
            onValueChange={(e) => setCategory(e)}
            // className="block w-full p-2 mb-2 border border-gray-300 rounded-full"
          >
            <SelectTrigger className="budg-select-field focus:ring-cyan-400 dark:focus:ring-blue-400 focus:ring-[3px]">
              <SelectValue
              // placeholder={category}
              // className="text-lg font-bold"
              />
            </SelectTrigger>
            <SelectContent className="budg-select-content mt-2">
              <ScrollArea className="max-h-60 overflow-auto">
                {expenseCategoriesList.map((category, index) => (
                  <SelectItem
                    key={index}
                    value={category.toLowerCase()}
                    className="budg-select-item"
                  >
                    {category}
                  </SelectItem>
                ))}
              </ScrollArea>
            </SelectContent>
          </Select>
        </div>

        {/* Sub-Categories (Only Show When Category is Selected) */}
        {category && (
          <div className="relative max-h-[200px] mt-2 overflow-y-auto border border-gray-300 rounded-md p-3 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sub-Categories (
              {new Set(expenseSubcategories[category] || []).size})
            </label>

            {/* Subcategories List */}
            <div className="flex flex-wrap gap-2">
              {[...new Set(expenseSubcategories[category] || [])].map(
                (subCategory) => {
                  const lowerSubCategory = subCategory.toLowerCase();
                  const isSelected =
                    selectedSubCategories.includes(lowerSubCategory);

                  return (
                    <Button
                      key={subCategory}
                      onClick={() => {
                        setSelectedSubCategories((prev) => {
                          let subCategoriesArray = prev ? prev.split(", ") : [];

                          if (isSelected) {
                            // Remove if already selected
                            subCategoriesArray = subCategoriesArray.filter(
                              (c) => c !== lowerSubCategory
                            );
                          } else {
                            // Add new selection
                            subCategoriesArray.push(lowerSubCategory);
                          }

                          return subCategoriesArray.join(", "); // Convert back to a comma-separated string
                        });
                      }}
                      className={`rounded-full text-sm ${
                        isSelected
                          ? "bg-purple-600 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {subCategory}
                    </Button>
                  );
                }
              )}
            </div>

            {/* Display Selected Subcategories */}
            {selectedSubCategories && (
              <p className="mt-3 text-sm text-gray-600">
                <strong>Selected:</strong> {selectedSubCategories}
              </p>
            )}
          </div>
        )}

        {/* Recurring Income Section */}
        <div className="mt-6 flex items-center space-x-2">
          <Checkbox
            id="recurring"
            checked={isRecurring}
            onCheckedChange={(value) => setIsRecurring(value)}
          />
          <label
            htmlFor="recurring"
            className="text-gray-700 dark:text-gray-300 font-medium text-sm"
          >
            Recurring Income
          </label>
        </div>
        {isRecurring && (
          <div className="mt-4">
            <h2 className="text-gray-700 dark:text-gray-300 font-medium mb-2">
              Frequency
            </h2>
            <Select value={frequency} onValueChange={(e) => setFrequency(e)}>
              <SelectTrigger className="budg-select-field focus:ring-cyan-400 dark:focus:ring-blue-400 focus:ring-[3px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="budg-select-content">
                {frequencyTypes.map((frequency, index) => (
                  <SelectItem
                    key={index}
                    value={frequency}
                    className="budg-select-item"
                  >
                    {frequency.replace(/^./, (char) => char.toUpperCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* Footer Section */}
        <DialogFooter className="mt-6">
          <DialogClose asChild>
            <Button
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 dark:from-blue-600 dark:via-indigo-600 dark:to-teal-600 text-white font-bold shadow-lg hover:shadow-[0_0_30px_rgba(100,150,255,0.5)] transition-transform transform hover:scale-105 disabled:opacity-50"
              onClick={() => onCreateBudget()}
              disabled={!(name && amount)}
            >
              Create Budget
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBudget;
