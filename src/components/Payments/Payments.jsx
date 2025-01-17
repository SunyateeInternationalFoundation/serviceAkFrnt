import { useState } from "react";

export default function Payments() {
  const [sortBy, setSortBy] = useState("newly-added");
  const [entriesPerPage, setEntriesPerPage] = useState("7");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      {/* <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Payout</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-[140px] px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
                <option value="newly-added">Newly Added</option>
                <option value="oldest">Oldest</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select className="appearance-none w-[140px] px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200">
                <option value="export">Export</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Printer className="h-4 w-4" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-md">
            <Settings className="h-4 w-4" />
          </button>
          <button className="px-4 py-2 bg-[#18181B] text-white rounded-md hover:bg-[#27272A]">
            Set Payout
          </button>
        </div>
      </div> */}

      {/* Payout Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Available Payout</p>
              <p className="text-2xl font-semibold">₹ 180</p>
            </div>
            <button className="px-4 py-2 bg-[#18181B] text-white  rounded-md hover:bg-gray-200">
              Transactions
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Last Payout</p>
              <p className="text-2xl font-semibold">₹ 229</p>
            </div>
            <button className="px-4 py-2 bg-[#18181B] text-white rounded-md hover:bg-[#27272A]">
              Transactions
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border shadow-sm">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-500 mb-1">Next Payout</p>
              <p className="text-2xl font-semibold">₹ 200</p>
            </div>
            <button className="px-4 py-2 bg-[#18181B] text-white rounded-md hover:bg-[#27272A]">
              Transactions
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200 border-b">
              <th className="text-left p-4 font-medium">Payout Date</th>
              <th className="text-left p-4 font-medium">Amount</th>
              {/* <th className="text-left p-4 font-medium">Refunds</th> */}
              <th className="text-left p-4 font-medium">Fees</th>
              <th className="text-left p-4 font-medium">Total</th>
              <th className="text-left p-4 font-medium">Payment Method</th>
              <th className="text-left p-4 font-medium">Status</th>
              <th className="text-left p-4 font-medium">Payment Processed</th>
            </tr>
          </thead>
          <tbody>
            {payoutData.map((row) => (
              <tr key={row.date} className="border-b">
                <td className="p-4">{row.date}</td>
                <td className="p-4">₹{row.amount}</td>
                {/* <td className="p-4 text-red-500">-₹{row.refunds}</td> */}
                <td className="p-4 text-red-500">-₹{row.fees}</td>
                <td className="p-4">₹{row.total}</td>
                <td className="p-4">{row.paymentMethod}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      row.status === "Paid"
                        ? "bg-green-100 text-green-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="p-4">{row.processed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <div className="relative">
            <select
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
              className="appearance-none w-[70px] px-3 py-2 bg-white border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="21">21</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <span className="text-sm text-gray-500">entries</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">1 - 07 of 10</span>
          <div className="flex">
            <button className="px-3 py-1 bg-pink-600 text-white border-y border-l border-gray-300 rounded-l-md hover:bg-pink-700">
              1
            </button>
            <button className="px-3 py-1 bg-white border border-l-0 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 bg-white border border-l-0 rounded-r-md hover:bg-gray-50">
              3
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const payoutData = [
  {
    date: "07 Oct 2024",
    amount: "300",
    refunds: "10.00",
    fees: "10.00",
    total: "280",
    paymentMethod: "GPay",
    status: "Paid",
    processed: "07 Oct 2024",
  },
  {
    date: "10 Oct 2024",
    amount: "400",
    refunds: "10.00",
    fees: "10.00",
    total: "380",
    paymentMethod: "PhonePe",
    status: "Pending",
    processed: "",
  },
  {
    date: "20 Oct 2024",
    amount: "200",
    refunds: "10.00",
    fees: "10.00",
    total: "180",
    paymentMethod: "GPay",
    status: "Paid",
    processed: "20 Oct 2024",
  },
  {
    date: "02 Nov 2024",
    amount: "100",
    refunds: "10.00",
    fees: "10.00",
    total: "80",
    paymentMethod: "GPay",
    status: "Pending",
    processed: "",
  },
  {
    date: "15 Nov 2024",
    amount: "300",
    refunds: "10.00",
    fees: "10.00",
    total: "280",
    paymentMethod: "PhonePe",
    status: "Paid",
    processed: "15 Nov 2024",
  },
  {
    date: "22 Nov 2024",
    amount: "350",
    refunds: "10.00",
    fees: "10.00",
    total: "330",
    paymentMethod: "GPay",
    status: "Paid",
    processed: "22 Nov 2024",
  },
  {
    date: "04 Dec 2024",
    amount: "280",
    refunds: "10.00",
    fees: "10.00",
    total: "260",
    paymentMethod: "GPay",
    status: "Paid",
    processed: "04 Dec 2024",
  },
];
