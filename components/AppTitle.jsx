import Image from 'next/image';
import React from 'react'

const AppTitle = () => {
  return (
      <header className="text-center space-y-4 py-6 relative w-full flex flex-col items-center justify-center">
          {/* Center-Aligned Title Section at the Top */}
        <div className="flex items-center justify-center gap-3 transition-transform transform duration-500 ease-in-out hover:scale-105 cursor-default">
          <Image
            src="/wallet.png" // Replace with an appropriate icon for SpendWise
            alt="SpendWise Icon"
            width={500}
            height={400}
            className="w-10 sm:w-12 md:w-14 lg:w-16"
          />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-teal-400 hover:from-teal-500 hover:via-indigo-500 hover:to-pink-500">
            SpendWise: Expense Tracker
          </h1>
        </div>

        {/* Animated Underline */}
        <div className="relative w-full h-1 mx-auto max-w-md mt-2">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-pink-400 to-red-500 rounded-full animate-gradient-move" />
        </div>

        <p className="text-lg md:text-xl lg:text-2xl text-gray-700 opacity-90 px-4 md:px-8 lg:px-12 leading-relaxed font-mono">
          Take control of your finances with SpendWise, your personal expense
          tracking tool.
        </p>
      </header>
  );
}

export default AppTitle