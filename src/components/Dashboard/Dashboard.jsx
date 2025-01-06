import { Star } from "lucide-react";

const Dashboard = () => {
  const reviews = [
    {
      id: 1,
      name: "Maude Rossi",
      service: "autism therapy",
      provider: "rebecca",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Livengood",
      service: "special education",
      provider: "Adrian",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Karl Brown",
      service: "special education",
      provider: "Andreson",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Jerry Curran",
      service: "autism therapy",
      provider: "Pique",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Upcoming Appointments</h3>
          <div className="text-4xl font-bold mt-2">12+</div>
          <div className="text-green-500 mt-1">
            12% <span className="text-gray-500">from Last Week</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Completed Appointments</h3>
          <div className="text-4xl font-bold mt-2">68+</div>
          <div className="text-red-500 mt-1">
            12% <span className="text-gray-500">from Last Week</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Canceled Appointments</h3>
          <div className="text-4xl font-bold mt-2">08+</div>
          <div className="text-gray-500 mt-1">
            0% <span className="text-gray-500">from Last Week</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Earnings</h3>
          <div className="mt-4">
            <div className="text-2xl font-bold">₹ 8145</div>
            <p className="text-gray-500">Total earned last week</p>
            <p className="text-green-500 mt-2">
              Performance is 30% better than last month
            </p>
          </div>
          <div className="mt-6">
            <button className="bg-black text-white px-4 py-2 rounded">
              View All Earnings
            </button>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold">Subscription</h3>
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <span className="bg-green-100 text-green-700 text-sm px-2 py-1 rounded">
                Current Plan
              </span>
              <span className="text-gray-500">Renewal Date: 14 Jan 2025</span>
            </div>
            <p className="text-lg font-semibold mt-4">Standard Plan</p>
            <p className="text-gray-500">
              Our most popular plan for small teams.
            </p>
            <p className="text-xl font-bold mt-2">$291 / Year</p>
          </div>
          <div className="mt-6 flex space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded">
              Upgrade Plan
            </button>
            <button className="bg-gray-200 text-black px-4 py-2 rounded">
              Cancel Plan
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">Latest Reviews</h3>
            <button className="text-sm text-gray-500 hover:text-gray-700">
              View All
            </button>
          </div>
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div>
                    <h4 className="font-semibold">{review.name}</h4>
                    <p className="text-sm text-gray-500">
                      For {review.service}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-semibold">
                      {review.rating}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
