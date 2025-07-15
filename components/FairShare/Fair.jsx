"use client";

import React, { useState } from "react";
import {
  Users,
  Plus,
  Calculator,
  Receipt,
  UserPlus,
  DollarSign,
  X,
  ArrowRight,
  Wallet,
} from "lucide-react";

const initialFriends = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    id: "4",
    name: "Emily Davis",
    email: "emily@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    id: "5",
    name: "Chris Brown",
    email: "chris@example.com",
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];

const initialExpenses = [
  {
    id: "1",
    description: "Dinner at Restaurant",
    amount: 1200,
    date: "2024-03-15",
    category: "Food",
    paidBy: "1",
    splits: [
      { friendId: "1", amount: 400, paid: true },
      { friendId: "2", amount: 400, paid: false },
      { friendId: "3", amount: 400, paid: false },
    ],
  },
  {
    id: "2",
    description: "Movie Tickets",
    amount: 600,
    date: "2024-03-14",
    category: "Entertainment",
    paidBy: "2",
    splits: [
      { friendId: "1", amount: 300, paid: false },
      { friendId: "2", amount: 300, paid: true },
    ],
  },
];

const categories = [
  "Food",
  "Entertainment",
  "Travel",
  "Shopping",
  "Utilities",
  "Rent",
  "Other",
];

export default function SplitExpenses() {
  const [friends] = useState(initialFriends);
  const [expenses] = useState(initialExpenses);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [splitType, setSplitType] = useState("equal");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [paidBy, setPaidBy] = useState([]);
  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Food",
    paidBy: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [newFriend, setNewFriend] = useState({
    name: "",
    email: "",
  });

  const handleAddExpense = (e) => {
    e.preventDefault();
    console.log(newExpense);
    setShowAddExpense(false);
    setNewExpense({
      description: "",
      amount: "",
      category: "Food",
      paidBy: "",
      date: new Date().toISOString().split("T")[0],
    });
    setSelectedFriends([]);
    setSplitType("equal");
  };

  const handleAddFriend = (e) => {
    e.preventDefault();
    setShowAddFriend(false);
    setNewFriend({
      name: "",
      email: "",
    });
  };

  const getFriendName = (id) => {
    return friends.find((f) => f.id === id)?.name || "Unknown";
  };

  const getFriendAvatar = (id) => {
    return friends.find((f) => f.id === id)?.avatar;
  };

  const calculateBalance = (friendId) => {
    let balance = 0;
    expenses.forEach((expense) => {
      if (expense.paidBy === friendId) {
        balance += expense.amount;
      }
      expense.splits.forEach((split) => {
        if (split.friendId === friendId && !split.paid) {
          balance -= split.amount;
        }
      });
    });
    return balance;
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Split Expenses</h1>
          <p className="text-gray-500 mt-1">
            Track and split expenses with friends
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddFriend(!showAddFriend)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            <UserPlus size={20} />
            Add Friend
          </button>
          <button
            onClick={() => setShowAddExpense(!showAddExpense)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus size={20} />
            New Split Expense
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {friends.map((friend) => {
          const balance = calculateBalance(friend.id);
          if(balance === 0) return null; // Skip if balance is zero
          
          return (
            <div key={friend.id} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{friend.name}</h3>
                  <p className="text-sm text-gray-500">{friend.email}</p>
                  <div
                    className={`mt-2 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 ${
                      balance > 0
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <Wallet size={16} />
                    {balance > 0 ? "owes you" : "you owe"} ₹{Math.abs(balance)}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {expenses
                  .filter(
                    (expense) =>
                      expense.splits.some(
                        (split) => split.friendId === friend.id
                      ) || expense.paidBy === friend.id
                  )
                  .slice(0, 3)
                  .map((expense) => (
                    <div
                      key={expense.id}
                      className="text-sm flex justify-between items-center p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Receipt size={16} className="text-gray-400" />
                        <span>{expense.description}</span>
                      </div>
                      <span
                        className={
                          expense.paidBy === friend.id
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {expense.paidBy === friend.id ? "+" : "-"}₹
                        {expense.splits.find((s) => s.friendId === friend.id)
                          ?.amount || 0}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          );
        })}
      </div>

      {showAddFriend && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add New Friend</h2>
              <button
                onClick={() => setShowAddFriend(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddFriend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newFriend.name}
                  onChange={(e) =>
                    setNewFriend({ ...newFriend, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newFriend.email}
                  onChange={(e) =>
                    setNewFriend({ ...newFriend, email: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700"
              >
                Add Friend
              </button>
            </form>
          </div>
        </div>
      )}

      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Add Split Expense</h2>
              <button
                onClick={() => setShowAddExpense(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddExpense} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <input
                    type="text"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Amount
                  </label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    value={newExpense.category}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, category: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    value={newExpense.date}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paid By
                </label>
                <div className="flex gap-2 flex-wrap">
                  {friends.map((friend) => (
                    <button
                      key={friend.id}
                      type="button"
                      onClick={() =>
                        setNewExpense({ ...newExpense, paidBy: friend.id })
                      }
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        newExpense.paidBy === friend.id
                          ? "bg-purple-600 text-white border-purple-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {friend.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Split With
                </label>
                <div className="flex flex-wrap gap-2">
                  {friends.map((friend) => (
                    <button
                      key={friend.id}
                      type="button"
                      onClick={() => {
                        setSelectedFriends((prev) =>
                          prev.includes(friend.id)
                            ? prev.filter((id) => id !== friend.id)
                            : [...prev, friend.id]
                        );
                      }}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        selectedFriends.includes(friend.id)
                          ? "bg-purple-600 text-white border-purple-600"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        className="w-6 h-6 rounded-full"
                      />
                      {friend.name}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Split Type
                </label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setSplitType("equal")}
                    className={`flex-1 py-2 rounded-lg border ${
                      splitType === "equal"
                        ? "bg-purple-600 text-white border-purple-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Equal Split
                  </button>
                  <button
                    type="button"
                    onClick={() => setSplitType("custom")}
                    className={`flex-1 py-2 rounded-lg border ${
                      splitType === "custom"
                        ? "bg-purple-600 text-white border-purple-600"
                        : "border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    Custom Split
                  </button>
                </div>
              </div>

              {splitType === "custom" && selectedFriends.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-medium">Custom Split Amounts</h3>
                  {selectedFriends.map((friendId) => (
                    <div key={friendId} className="flex items-center gap-3">
                      <img
                        src={getFriendAvatar(friendId)}
                        alt={getFriendName(friendId)}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>{getFriendName(friendId)}</span>
                      <input
                        type="number"
                        placeholder="Amount"
                        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
              >
                Add Split Expense
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-6">Recent Split Expenses</h2>
        <div className="space-y-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Receipt className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{expense.date}</span>
                    <span>•</span>
                    <div className="flex items-center">
                      <img
                        src={getFriendAvatar(expense.paidBy)}
                        alt={getFriendName(expense.paidBy)}
                        className="w-5 h-5 rounded-full"
                      />
                      <ArrowRight size={12} className="mx-1" />
                      <div className="flex -space-x-2">
                        {expense.splits.map((split) => (
                          <img
                            key={split.friendId}
                            src={getFriendAvatar(split.friendId)}
                            alt={getFriendName(split.friendId)}
                            className="w-5 h-5 rounded-full border-2 border-white"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">₹{expense.amount}</p>
                <p className="text-sm text-gray-500">
                  {expense.splits.length} way split
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
