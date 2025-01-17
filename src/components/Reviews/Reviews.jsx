import React, { useState } from "react";

const Reviews = () => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      service: "Autism Therapy",
      reviewer: "Salini",
      date: "July 11, 2024 11:38 am",
      rating: 4,
      reviewText:
        "The therapy sessions were highly effective in helping my child improve their communication and social skills. The therapists were patient, knowledgeable, and empathetic. I would highly recommend their services to other parents!",
      profileImage:
        "https://cdn.prod.website-files.com/61502c9b4145580f9cb99fbb/62151b361c03294290c815b1_Types%20of%20Therapy%20for%20Autism.jpg",
    },
    {
      id: 2,
      service: "Special Education",
      reviewer: "Nelson",
      date: "July 18, 2024 04:30 pm",
      rating: 3,
      reviewText:
        "The special education program was helpful in addressing my child's unique learning needs. While the overall experience was positive, there were occasional delays in communication. However, the educators were dedicated and supportive.",
      profileImage:
        "https://cdn.prod.website-files.com/61502c9b4145580f9cb99fbb/62151b361c03294290c815b1_Types%20of%20Therapy%20for%20Autism.jpg",
    },
    {
      id: 3,
      service: "Speech Therapy",
      reviewer: "Vijay",
      date: "July 28, 2024 02:15 pm",
      rating: 5,
      reviewText:
        "The speech therapy sessions were outstanding! My child made significant progress in articulation and language comprehension. The therapist was professional, engaging, and made the sessions enjoyable. I couldn't be happier with the results!",
      profileImage:
        "https://cdn.prod.website-files.com/61502c9b4145580f9cb99fbb/62151b361c03294290c815b1_Types%20of%20Therapy%20for%20Autism.jpg",
    },
  ]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6 mt-5">
        <h2 className="text-2xl font-semibold mb-6">Reviews</h2>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex gap-4 items-start"
            >
              <img
                src={review.profileImage}
                alt={review.reviewer}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{review.service}</h3>
                    <p className="text-sm text-gray-500">
                      {review.reviewer},{" "}
                      <span className="text-gray-400">{review.date}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, index) => (
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
                <p className="mt-2 text-gray-700">{review.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reviews;
