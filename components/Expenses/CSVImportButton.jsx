"use client";

import React, { useState, useEffect } from "react";
import CsvUpload from "./CSVUpload";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox"; // Shadcn UI Checkbox
import { db } from "@/utils/dbConfig"; // Assume dbConfig is set up for your database
import { Settings } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { Upload } from "lucide-react";
import CsvDataTable from "./CsvDataTable";

const CSVImportButton = () => {
  const [showTutorialDialog, setShowTutorialDialog] = useState(false);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [currentTutorialPage, setCurrentTutorialPage] = useState(0);
  const [showCSVImport, setShowCSVImport] = useState(true); // Default to true
  const [csvData, setCsvData] = useState([]);
  const { user } = useUser();

  const progressColors = [
    "bg-gradient-to-r from-yellow-400 to-orange-400",
    "bg-gradient-to-r from-orange-500 to-red-500",
    "bg-gradient-to-r from-red-600 to-yellow-600",
  ];

  const tutorialPages = [
    {
      title: "Step 1: CSV File Format",
      content: (
        <div className="text-center">
          <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Your CSV file should include the following columns:
          </p>
          <ul className="mt-6 space-y-4 text-left">
            <li className="flex items-start">
              <span className="w-3 h-3 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mt-1 mr-3"></span>
              <span className="text-lg text-gray-800">
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                  Date
                </strong>
                : The date of the expense in the format:
                <div className="text-center">
                  <code className="font-mono bg-gray-800 text-yellow-300 p-1 rounded-md">
                    YYYY-MM-DD
                  </code>
                </div>
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-3 h-3 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mt-1 mr-3"></span>
              <span className="text-lg text-gray-800">
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                  Name
                </strong>
                : A brief description of the expense.
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-3 h-3 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mt-1 mr-3"></span>
              <span className="text-lg text-gray-800">
                <strong className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
                  Amount
                </strong>
                : The monetary value of the expense in numeric format.
              </span>
            </li>
          </ul>
          <p className="mt-6 text-gray-500">
            Each row represents a single expense record. Ensure there are no
            extra columns or formatting issues.
          </p>
        </div>
      ),
      image: "/sampleCSV.png", // Replace with your actual image path
    },
    {
      title: "Step 2: Date Format",
      content: (
        <div className="text-center">
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            The <span className="font-semibold text-yellow-400">Date</span>{" "}
            column must follow this format:
          </p>
          <p className="mt-4 text-2xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-tr from-green-400 via-blue-400 to-teal-400">
            YYYY-MM-DD
          </p>
          <ul className="mt-6 space-y-4 text-left">
            <li className="flex items-start">
              <span className="w-3 h-3 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mt-1 mr-3"></span>
              <span className="text-lg text-gray-800">
                <code className="font-mono bg-gray-800 text-yellow-300 px-1 py-0.5 rounded">
                  2024-01-01
                </code>{" "}
                for January 1, 2024.
              </span>
            </li>
            <li className="flex items-start">
              <span className="w-3 h-3 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-full mt-1 mr-3"></span>
              <span className="text-lg text-gray-800">
                <code className="font-mono bg-gray-800 text-yellow-300 px-1 py-0.5 rounded">
                  2024-02-15
                </code>{" "}
                for February 15, 2024.
              </span>
            </li>
          </ul>
        </div>
      ),
      image: "/images/date-format.png", // Replace with your actual image path
    },
    {
      title: "Step 3: Example File",
      content: (
        <div className="text-center">
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Here&apos;s an example of how your CSV file should look:
          </p>
          <pre className="mt-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-lg text-sm text-left shadow-lg text-gray-300">
            {`date,name,amount
2024-01-01,Groceries,150
2024-01-02,Transport,50
2024-01-03,Utilities,100`}
          </pre>
          <p className="mt-6 text-gray-500 text-lg">
            Ensure your file is saved with the{" "}
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500">
              .csv
            </strong>{" "}
            extension.
          </p>
        </div>
      ),
      image: "/images/example-file.png", // Replace with your actual image path
    },
    {
      title: "Step 4: Ready to Upload",
      content: (
        <div className="text-center">
          <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Once your file is ready, click{" "}
            <span className="text-yellow-400 font-semibold">Continue</span> to
            proceed to the upload screen.
          </p>
          <p className="mt-6 text-gray-400">
            Make sure the file format matches the requirements. Invalid files
            may not be processed.
          </p>
        </div>
      ),
      image: "/images/ready-to-upload.png", // Replace with your actual image path
    },
  ];

  useEffect(() => {
    const fetchOrCreateSettings = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      const result = await db
        .select()
        .from(Settings)
        .where(eq(Settings.createdBy, user.primaryEmailAddress.emailAddress));

      if (result.length === 0) {
        // If no entry exists, insert a new one with default `showcsvimport` value
        await db.insert(Settings).values({
          createdBy: user.primaryEmailAddress.emailAddress,
          showcsvimport: true, // Default to showing the tutorial
        });
        setShowCSVImport(true); // Set the state to match the default value
      } else {
        // If entry exists, set `showCSVImport` based on the fetched value
        setShowCSVImport(result[0].showcsvimport);
      }
    };

    fetchOrCreateSettings();
  }, [user]);

  const handleNextPage = () => {
    if (currentTutorialPage < tutorialPages.length - 1) {
      setCurrentTutorialPage((prev) => prev + 1);
    } else {
      setShowTutorialDialog(false);
      setShowUploadDialog(true);
      setCurrentTutorialPage(0);
    }
  };

  const handleSkipTutorial = async () => {
    setShowTutorialDialog(false);
    setShowUploadDialog(true);
  };

  const handleCheckboxChange = async (checked) => {
    const newShowCSVImportValue = !checked; // Checkbox indicates "Don't show tutorial"

    setShowCSVImport(newShowCSVImportValue);

    // Update the `showcsvimport` value in the database
    const result = await db
      .select()
      .from(Settings)
      .where(eq(Settings.createdBy, user?.primaryEmailAddress?.emailAddress));

    if (result.length === 0) {
      // Insert a new entry if none exists
      await db.insert(Settings).values({
        createdBy: user?.primaryEmailAddress?.emailAddress,
        showcsvimport: newShowCSVImportValue,
      });
    } else {
      // Update the existing entry
      await db
        .update(Settings)
        .set({ showcsvimport: newShowCSVImportValue })
        .where(eq(Settings.createdBy, user?.primaryEmailAddress?.emailAddress));
    }
  };

  const handleImportClick = () => {
    if (showCSVImport) {
      setShowTutorialDialog(true);
    } else {
      setShowUploadDialog(true);
    }
  };

  // Reset progress when the tutorial dialog closes
  const handleTutorialDialogClose = (isOpen) => {
    if (!isOpen) {
      setCurrentTutorialPage(0);
    }
    setShowTutorialDialog(isOpen);
  };

  const handleFileSelect = (data) => {
    setCsvData(data); // Populate table with CSV data
  };


  return (
    <div>
      <Button
        className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-blue-600 dark:via-indigo-600 dark:to-purple-600 rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-transform transform hover:scale-105"
        onClick={handleImportClick}
      >
        <Upload className="mr-1 w-9 h-9" /> Import CSV
      </Button>

      {/* Tutorial Dialog */}
      <Dialog
        open={showTutorialDialog}
        onOpenChange={handleTutorialDialogClose}
      >
        <DialogContent
          className="fixed rounded-3xl bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6 shadow-2xl overflow-hidden"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "500px",
          }}
        >
          {/* Tutorial Header */}
          <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-400 animate-gradient-text mb-4">
            {tutorialPages[currentTutorialPage].title}
          </h2>
          {/* Progress Bar */}
          <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
            <div
              className={`h-full bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400`}
              style={{
                width: `${
                  ((currentTutorialPage + 1) / tutorialPages.length) * 100
                }%`,
              }}
            ></div>
          </div>
          {tutorialPages[currentTutorialPage].image && (
            <img
              src={tutorialPages[currentTutorialPage].image}
              alt="Tutorial Step"
              className="w-full h-auto rounded-2xl mb-4 shadow-lg hover:scale-105 transition-transform duration-500"
            />
          )}
          <p className="text-gray-700 dark:text-gray-400">
            {tutorialPages[currentTutorialPage].content}
          </p>
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Button
              disabled={currentTutorialPage === 0}
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-indigo-400 to-blue-500 dark:from-blue-500 dark:to-indigo-500 rounded-lg shadow hover:from-indigo-500 hover:to-blue-600"
              onClick={() => setCurrentTutorialPage((prev) => prev - 1)}
            >
              Back
            </Button>
            <Button
              className="px-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-400 to-indigo-500 dark:from-purple-500 dark:to-indigo-600 rounded-lg shadow hover:from-purple-500 hover:to-indigo-600"
              onClick={handleNextPage}
            >
              {currentTutorialPage < tutorialPages.length - 1
                ? "Next"
                : "Continue"}
            </Button>
          </div>
          {/* Checkbox */}
          <div className="mt-4 flex items-center">
            <Checkbox
              id="show-tutorial"
              checked={!showCSVImport} // Checkbox indicates "Don't show tutorial"
              onCheckedChange={handleCheckboxChange}
            />
            <label
              htmlFor="show-tutorial"
              className="ml-2 text-sm text-gray-600 dark:text-gray-400"
            >
              Don't show this tutorial again
            </label>
          </div>
        </DialogContent>
      </Dialog>

      {/* Upload Dialog */}
      <Dialog
        open={showUploadDialog}
        onOpenChange={() => {
          setShowUploadDialog(false);
          setCsvData([]);
        }}
      >
        <DialogContent
          className="rounded-3xl bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 p-6 shadow-2xl overflow-hidden"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: "700px",
          }}
        >
          <h2 className="font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-500 dark:from-blue-500 dark:via-indigo-500 dark:to-purple-400 animate-gradient-text mb-4">
            Upload Your Expense CSV
          </h2>
          <CsvUpload onFileSelect={handleFileSelect} />
          {csvData.length > 0 && (
            <CsvDataTable csvData={csvData} setCsvData={setCsvData} />
          )}
          <Button
            className="mt-4 px-4 py-2 font-semibold text-white bg-gradient-to-r from-purple-400 to-indigo-500 dark:from-purple-500 dark:to-indigo-600 rounded-lg shadow hover:from-purple-500 hover:to-indigo-600"
            onClick={() => setShowUploadDialog(false)}
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CSVImportButton;
