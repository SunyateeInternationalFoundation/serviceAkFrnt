import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Reviews = () => {
  const providerId = useSelector((state) => state.provider.providerId);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      const response = await axios.get(
        `${import.meta.env.VITE_WEBSITE}/reviews/${providerId}`
      );
      if (response.data.success) {
        setReviews(response.data.data);
      }
    }
    getReviews();
  }, [providerId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 mt-5">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.length > 0 ? (
            <>
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-4 items-start"
                >
                  <img
                    src={
                      review?.childId?.image ||
                      "https://cdn.prod.website-files.com/61502c9b4145580f9cb99fbb/62151b361c03294290c815b1_Types%20of%20Therapy%20for%20Autism.jpg"
                    }
                    alt={review?.childId?.basicInfo?.childFullName}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {review?.serviceId?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {review?.childId?.basicInfo?.childFullName},{" "}
                          <span className="text-gray-400">
                            {new Date(review?.createdAt).toLocaleString()}
                          </span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(review?.rating)].map((_, index) => (
                          <svg
                            key={index}
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 text-yellow-500"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-700">{review?.review}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-500 text-center">
              No reviews available at the moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
