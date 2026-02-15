// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faCalendar,
//     faUsers,
//     faMapPin,
//     faUser,
//     faClock,
//     faBook,
// } from '@fortawesome/free-solid-svg-icons';
const WorkshopDetails = ({ workshop }) => {
  // Debug logging
  console.log("WorkshopDetails received workshop:", workshop);
  console.log("Enrollments array:", workshop?.enrollments);
  console.log("Enrollments length:", workshop?.enrollments?.length);
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const attendanceRate =
    workshop.enrollments && workshop.enrollments.length > 0
      ? (
          (workshop.enrollments.filter((e) => e.attended).length /
            workshop.enrollments.length) *
          100
        ).toFixed(1)
      : 0;

  const averageFeedback =
    workshop.enrollments &&
    workshop.enrollments.filter((e) => e.feedbackRating).length > 0
      ? (
          workshop.enrollments.reduce(
            (sum, e) => sum + (e.feedbackRating || 0),
            0,
          ) / workshop.enrollments.filter((e) => e.feedbackRating).length
        ).toFixed(1)
      : 0;

  return (
    <div className="p-8 space-y-6">
      {/* Workshop Overview */}
      <div className="border-4 border-black p-8 bg-blue-100 rounded-2xl hover:shadow-lg transition-all">
        <h3 className="text-3xl font-black text-black mb-6">
          📋 Workshop Overview
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 bg-white border-3 border-black p-4 rounded-xl">
            <span className="text-3xl">📖</span>
            <div>
              <p className="text-sm font-black text-black mb-1">Description</p>
              <p className="text-black font-bold text-lg">
                {workshop.description || "No description available"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white border-3 border-black p-4 rounded-xl">
            <span className="text-3xl">👨‍🏫</span>
            <div>
              <p className="text-sm font-black text-black mb-1">
                Assigned Mentor
              </p>
              <p className="text-black font-black text-xl">
                {workshop.mentor || workshop.mentor_name || "-"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 bg-white border-3 border-black p-4 rounded-xl">
            <span className="text-3xl">📍</span>
            <div>
              <p className="text-sm font-black text-black mb-1">Location</p>
              <p className="text-black font-black text-xl">
                {workshop.location || "-"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule Details */}
      <div className="border-4 border-black p-8 bg-green-100 rounded-2xl hover:shadow-lg transition-all">
        <h3 className="text-3xl font-black text-black mb-6">📅 Schedule</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white border-3 border-black p-4 rounded-xl">
            <p className="text-xs font-black text-black mb-2">📅 Start Date</p>
            <p className="text-black font-black text-lg">
              {formatDate(workshop.startDate || workshop.start_date)}
            </p>
          </div>
          <div className="bg-white border-3 border-black p-4 rounded-xl">
            <p className="text-xs font-black text-black mb-2">📅 End Date</p>
            <p className="text-black font-black text-lg">
              {formatDate(workshop.endDate || workshop.end_date)}
            </p>
          </div>
          <div className="bg-white border-3 border-black p-4 rounded-xl">
            <p className="text-xs font-black text-black mb-2">🕐 Start Time</p>
            <p className="text-black font-black text-lg">
              {workshop.startTime || workshop.start_time || "-"}
            </p>
          </div>
          <div className="bg-white border-3 border-black p-4 rounded-xl">
            <p className="text-xs font-black text-black mb-2">🕐 End Time</p>
            <p className="text-black font-black text-lg">
              {workshop.endTime || workshop.end_time || "-"}
            </p>
          </div>
        </div>
      </div>

      {/* Capacity & Enrollment */}
      <div className="border-4 border-black p-8 bg-pink-100 rounded-2xl hover:shadow-lg transition-all">
        <h3 className="text-3xl font-black text-black mb-6">
          👥 Capacity & Enrollment
        </h3>
        <div className="space-y-4">
          <div className="bg-white border-3 border-black p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <p className="font-black text-black text-lg">📊 Total Capacity</p>
              <p className="text-4xl font-black text-black">
                {parseInt(workshop.capacity) || 0}
              </p>
            </div>
            <div className="flex items-center justify-between mb-4">
              <p className="font-black text-black text-lg">✅ Enrolled</p>
              <p className="text-4xl font-black text-black">
                {parseInt(workshop.enrolledCount || workshop.enrolled_count) ||
                  0}
              </p>
            </div>
            <div className="w-full bg-gray-300 h-4 border-4 border-black rounded-full mb-3 overflow-hidden">
              <div
                className="bg-black h-full transition-all"
                style={{
                  width: `${
                    ((parseInt(
                      workshop.enrolledCount || workshop.enrolled_count,
                    ) || 0) /
                      (parseInt(workshop.capacity) || 1)) *
                    100
                  }%`,
                }}
              ></div>
            </div>
            <p className="text-sm font-black text-black bg-yellow-300 inline-block px-3 py-1 rounded-lg border-2 border-black">
              {(
                ((parseInt(workshop.enrolledCount || workshop.enrolled_count) ||
                  0) /
                  (parseInt(workshop.capacity) || 1)) *
                100
              ).toFixed(1)}
              % Capacity
            </p>
          </div>
        </div>
      </div>

      {/* Attendance & Feedback Stats */}
      {workshop.enrollments && workshop.enrollments.length > 0 && (
        <div className="border-4 border-black p-8 bg-purple-100 rounded-2xl hover:shadow-lg transition-all">
          <h3 className="text-3xl font-black text-black mb-6">
            📊 Attendance & Feedback
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="border-4 border-black p-6 bg-white rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <p className="text-sm font-black text-black mb-3">
                ✅ Attendance Rate
              </p>
              <p className="text-5xl font-black text-black mb-2">
                {attendanceRate}%
              </p>
              <p className="text-sm text-black font-black bg-green-300 inline-block px-3 py-1 rounded-lg border-2 border-black">
                {workshop.enrollments.filter((e) => e.attended).length} of{" "}
                {workshop.enrollments.length} attended
              </p>
            </div>
            <div className="border-4 border-black p-6 bg-white rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all">
              <p className="text-sm font-black text-black mb-3">
                ⭐ Average Feedback
              </p>
              <p className="text-5xl font-black text-black mb-2">
                {averageFeedback === 0 ? "—" : `${averageFeedback}⭐`}
              </p>
              <p className="text-sm text-black font-black bg-yellow-300 inline-block px-3 py-1 rounded-lg border-2 border-black">
                {workshop.enrollments.filter((e) => e.feedbackRating).length}{" "}
                responses
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Enrolled Entrepreneurs Table */}
      <div className="border-4 border-black p-8 bg-indigo-100 rounded-2xl hover:shadow-lg transition-all">
        <h3 className="text-3xl font-black text-black mb-6">
          👥 ENROLLED ENTREPRENEURS
        </h3>
        {workshop.enrollments && workshop.enrollments.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b-4 border-black bg-white">
                <tr>
                  <th className="px-4 py-3 font-black text-black">Name</th>
                  <th className="px-4 py-3 font-black text-black">Email</th>
                  <th className="px-4 py-3 font-black text-black">Joined</th>
                  <th className="px-4 py-3 font-black text-black">
                    Attendance
                  </th>
                  <th className="px-4 py-3 font-black text-black">Rating</th>
                  <th className="px-4 py-3 font-black text-black">Feedback</th>
                </tr>
              </thead>
              <tbody>
                {workshop.enrollments.map((attendee, index) => (
                  <tr
                    key={attendee.id}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-indigo-50"} border-b-2 border-black`}
                  >
                    <td className="px-4 py-3 font-bold text-black">
                      {attendee.entrepreneurName ||
                        attendee.entrepreneur_name ||
                        attendee.name ||
                        "-"}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {attendee.entrepreneurEmail ||
                        attendee.entrepreneur_email ||
                        attendee.email ||
                        "-"}
                    </td>
                    <td className="px-4 py-3 text-black">
                      {attendee.enrollmentDate || attendee.enrollment_date
                        ? new Date(
                            attendee.enrollmentDate || attendee.enrollment_date,
                          ).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      {attendee.attended ? (
                        <span className="inline-block bg-green-300 text-green-900 border-2 border-green-900 px-3 py-1 rounded font-bold text-sm">
                          ✓ Yes
                        </span>
                      ) : (
                        <span className="inline-block bg-gray-200 text-gray-900 border-2 border-gray-900 px-3 py-1 rounded font-bold text-sm">
                          ✗ No
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {attendee.feedbackRating || attendee.feedback_rating ? (
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={
                                i <
                                (attendee.feedbackRating ||
                                  attendee.feedback_rating)
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }
                            >
                              ⭐
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-black max-w-xs truncate">
                      {attendee.feedbackComment || attendee.feedback_comment ? (
                        <span
                          title={
                            attendee.feedbackComment ||
                            attendee.feedback_comment
                          }
                          className="italic text-gray-700"
                        >
                          "
                          {attendee.feedbackComment ||
                            attendee.feedback_comment}
                          "
                        </span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white border-3 border-black rounded-xl p-8 text-center">
            <p className="text-black font-bold text-lg">
              No enrollments found for this workshop.
            </p>
          </div>
        )}
      </div>

      {/* Status Badge */}
      <div className="text-center border-4 border-black p-8 bg-orange-100 rounded-2xl hover:shadow-lg transition-all">
        <p className="text-sm font-black text-black mb-4">📍 Current Status</p>
        <span
          className={`inline-block px-12 py-4 font-black text-2xl border-4 rounded-2xl ${
            (workshop.status || "scheduled") === "scheduled"
              ? "border-yellow-500 bg-yellow-300 text-black"
              : (workshop.status || "scheduled") === "ongoing"
                ? "border-blue-500 bg-blue-300 text-black"
                : "border-green-500 bg-green-300 text-black"
          }`}
        >
          {(workshop.status || "scheduled") === "scheduled" && "📋"}{" "}
          {(workshop.status || "scheduled") === "ongoing" && "⚡"}{" "}
          {(workshop.status || "scheduled") === "completed" && "✅"}{" "}
          {(workshop.status || "scheduled").toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default WorkshopDetails;
