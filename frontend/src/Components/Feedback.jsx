import React, { useState } from "react";

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState({
    name: "",
    mno: "",
    message: "",
  });

  const submitFeedback = async (e) => {
    e.preventDefault(); // always prevent first

    try {
      console.log(feedback);

      const response = await fetch("http://localhost:5000/user/feedback/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedback),
      });

      const data = await response.json();

      if (data.success) {
        alert("✅ Feedback submitted successfully!");
        setFeedback({ name: "", mno: "", message: "" });
      } else {
        alert("❌ Failed to submit feedback.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error.message);
    }
  };

  return (
    <section id="contactus" className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Contact Form</h2>

        <form
          onSubmit={submitFeedback}
          className="bg-white p-8 rounded-xl shadow-md space-y-6"
        >
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              required
              value={feedback.name}
              onChange={(e) =>
                setFeedback({ ...feedback, name: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Enter your mobile number"
              required
              value={feedback.mno}
              onChange={(e) =>
                setFeedback({ ...feedback, mno: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Message
            </label>
            <textarea
              rows="4"
              placeholder="Enter your message"
              required
              value={feedback.message}
              onChange={(e) =>
                setFeedback({ ...feedback, message: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackForm;
