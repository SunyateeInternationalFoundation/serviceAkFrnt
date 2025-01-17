import { useState } from "react";

export default function Appointments() {
  const [appointmentInterval, setAppointmentInterval] = useState("30");
  const [minAdvanceBooking, setMinAdvanceBooking] = useState("50");
  const [maxAdvanceBooking, setMaxAdvanceBooking] = useState("4");
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [availableDays, setAvailableDays] = useState([]);
  const [availableHours, setAvailableHours] = useState("");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        Appointment Settings
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium">
                  Maximum Advance Booking Time
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Set the maximum time clients can book an appointment in
                  advance (e.g., 4 months, 6 months, up to 5 years).
                </p>
              </div>
              <select
                value={maxAdvanceBooking}
                onChange={(e) => setMaxAdvanceBooking(e.target.value)}
                className="w-[120px] border rounded-md px-2 py-1 text-sm"
              >
                <option value="1">1 Month</option>
                <option value="2">2 Months</option>
                <option value="3">3 Months</option>
                <option value="4">4 Months</option>
                <option value="6">6 Months</option>
              </select>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium">
                  Minimum Advance Booking Time
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Set the minimum time in advance that an appointment must be
                  booked (e.g., between 1 hour to 10 days, depending on
                  availability).
                </p>
              </div>
              <select
                value={minAdvanceBooking}
                onChange={(e) => setMinAdvanceBooking(e.target.value)}
                className="w-[100px] border rounded-md px-2 py-1 text-sm"
              >
                <option value="30">1 day</option>
                <option value="50">2 days</option>
                <option value="60">3 days</option>
                <option value="120">4 days</option>
              </select>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium">
                  Appointment Time Intervals
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Define the duration of each appointment (e.g., 45 minutes, 60
                  minutes).
                </p>
              </div>
              <select
                value={appointmentInterval}
                onChange={(e) => setAppointmentInterval(e.target.value)}
                className="w-[100px] border rounded-md px-2 py-1 text-sm"
              >
                <option value="15">15 Min</option>
                <option value="30">30 Min</option>
                <option value="45">45 Min</option>
                <option value="60">60 Min</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium">
                  Available Appointment Days
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Define the days of the week the therapist is available for
                  appointments (e.g., Monday to Friday, specific weekdays).
                </p>
              </div>
              <input
                type="text"
                value={availableDays}
                onChange={(e) => setAvailableDays(e.target.value)}
                className="w-[150px] border rounded-md px-2 py-1 text-sm"
                placeholder="e.g., Monday, Tuesday"
              />
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium">
                  Appointment Auto Confirm
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Enable or disable automatic confirmation for appointments once
                  they are booked (e.g., auto-confirm after booking or require
                  manual confirmation).
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={autoConfirm}
                  onChange={() => setAutoConfirm(!autoConfirm)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[15px] font-medium">
                  Available Appointment Hours
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Set the specific hours within each day that the therapist is
                  available (e.g., 9 AM to 5 PM, with a break between noon and 1
                  PM).
                </p>
              </div>
              <input
                type="text"
                value={availableHours}
                onChange={(e) => setAvailableHours(e.target.value)}
                className="w-[150px] border rounded-md px-2 py-1 text-sm"
                placeholder="e.g., 9 AM - 5 PM"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
