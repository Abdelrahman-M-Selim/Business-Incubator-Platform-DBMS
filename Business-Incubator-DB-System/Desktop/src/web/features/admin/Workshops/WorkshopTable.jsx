import React , { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChevronDown,
    faChevronUp,
    faEye,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';

const WorkshopTable = ({ workshops, onView, onDelete }) => {
    const [expandedId, setExpandedId] = useState(null);

    const getStatusBadge = (status) => {
        const badges = {
            scheduled: { emoji: '📋', bg: 'bg-orange-300', text: 'Scheduled' },
            ongoing: { emoji: '⚡', bg: 'bg-blue-300', text: 'Ongoing' },
            completed: { emoji: '✅', bg: 'bg-green-300', text: 'Completed' },
        };
        const badge = badges[status] || badges.scheduled;
        return (
            <span
                className={`px-4 py-2 font-black text-sm whitespace-nowrap border-3 border-black rounded-lg ${badge.bg}`}
            >
                {badge.emoji} {badge.text}
            </span>
        );
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="px-6 py-4 text-left font-black text-black border-4 border-black bg-blue-300 rounded-tl-2xl">
                            📅 Workshop Title
                        </th>
                        <th className="px-6 py-4 text-left font-black text-black border-4 border-black bg-green-300">
                            👨‍🏫 Mentor
                        </th>
                        <th className="px-6 py-4 text-left font-black text-black border-4 border-black bg-orange-300">
                            📆 Date Range
                        </th>
                        <th className="px-6 py-4 text-left font-black text-black border-4 border-black bg-blue-300">
                            👥 Enrolled / Capacity
                        </th>
                        <th className="px-6 py-4 text-left font-black text-black border-4 border-black bg-orange-300">
                            📊 Status
                        </th>
                        <th className="px-6 py-4 text-center font-black text-black border-4 border-black bg-orange-300 rounded-tr-2xl">
                            ⚙️ Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {workshops.map((workshop, index) => (
                        <React.Fragment key={workshop.id ? `workshop-${workshop.id}` : `temp-${index}`}>
                            <tr className="border-b-4 border-black hover:shadow-lg hover:-translate-y-1 transition-all bg-white">
                                <td className="px-6 py-4 font-black text-black border-r-4 border-black">
                                    <div>
                                        <p className="text-base mb-1">📌 {workshop.title || 'Untitled'}</p>
                                        <p className="text-xs text-gray-700 font-bold">
                                            {workshop.description ? workshop.description.substring(0, 50) + '...' : 'No description'}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-black text-black border-r-4 border-black">
                                    👤 {workshop.mentor || workshop.mentor_name || '-'}
                                </td>
                                <td className="px-6 py-4 font-black text-black border-r-4 border-black">
                                    <div>
                                        <p className="text-sm">
                                            🗓️ {formatDate(workshop.startDate || workshop.start_date)}
                                        </p>
                                        <p className="text-xs text-gray-700">
                                            → {formatDate(workshop.endDate || workshop.end_date)}
                                        </p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-black text-black border-r-4 border-black">
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 bg-gray-200 h-3 border-3 border-black rounded-full overflow-hidden">
                                            <div
                                                className="bg-black h-full transition-all"
                                                style={{
                                                    width: `${
                                                        ((parseInt(workshop.enrolledCount || workshop.enrolled_count) || 0) /
                                                            (parseInt(workshop.capacity) || 1)) *
                                                        100
                                                    }%`,
                                                }}
                                            ></div>
                                        </div>
                                        <span className="text-sm whitespace-nowrap ml-2 font-black">
                                            {parseInt(workshop.enrolledCount || workshop.enrolled_count) || 0}/{parseInt(workshop.capacity) || 0}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-black text-black border-r-4 border-black">
                                    {getStatusBadge(workshop.status)}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-3">
                                        <button
                                            onClick={() => setExpandedId(expandedId === workshop.id ? null : workshop.id)}
                                            className="p-2 border-3 border-black bg-orange-300 hover:shadow-lg hover:-translate-y-1
                                            transition-all font-black rounded-lg"
                                            title="View Details"
                                        >
                                            <FontAwesomeIcon icon={expandedId === workshop.id ? faChevronUp : faChevronDown} />
                                        </button>
                                        <button
                                            onClick={() => onView(workshop)}
                                            className="p-2 border-3 border-black bg-green-300 hover:shadow-lg hover:-translate-y-1
                                            transition-all font-black rounded-lg"
                                            title="View Details"
                                        >
                                            <FontAwesomeIcon icon={faEye} />
                                        </button>
                                        <button
                                            onClick={() => onDelete(workshop.id)}
                                            className="p-2 border-3 border-black bg-orange-300 hover:shadow-lg hover:-translate-y-1
                                            transition-all font-black text-black rounded-lg"
                                            title="Delete"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {/* Expanded Row - Enrollments */}
                            {expandedId === workshop.id && (
                                <tr className="bg-orange-50 border-b-4 border-black">
                                    <td colSpan="6" className="px-6 py-4">
                                        <div className="bg-white border-4 border-black rounded-2xl p-6">
                                            <h4 className="font-black text-black mb-6 text-2xl">
                                                👥 Enrolled Entrepreneurs
                                            </h4>
                                            <div className="overflow-x-auto">
                                                <table className="w-full text-sm">
                                                    <thead>
                                                        <tr className="border-b-3 border-black bg-blue-200">
                                                            <th className="text-left font-black py-3 px-3 rounded-tl-lg">
                                                                👤 Name
                                                            </th>
                                                            <th className="text-left font-black py-3 px-3">
                                                                📧 Email
                                                            </th>
                                                            <th className="text-left font-black py-3 px-3">
                                                                📅 Enrollment Date
                                                            </th>
                                                            <th className="text-left font-black py-3 px-3">
                                                                ✅ Attendance
                                                            </th>
                                                            <th className="text-left font-black py-3 px-3 rounded-tr-lg">
                                                                ⭐ Feedback
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {workshop.enrollments &&
                                                        workshop.enrollments.length > 0 ? (
                                                            workshop.enrollments.map(
                                                                (enrollment, idx) => (
                                                                    <tr
                                                                        key={enrollment.id ? `enrollment-${enrollment.id}` : `enrollment-${workshop.id}-${idx}`}
                                                                        className="border-b-2 border-gray-300 hover:bg-green-50 transition-colors"
                                                                    >
                                                                        <td className="py-3 px-3 font-bold">
                                                                            {
                                                                                enrollment.entrepreneurName
                                                                            }
                                                                        </td>
                                                                        <td className="py-3 px-3 font-bold text-blue-700">
                                                                            {
                                                                                enrollment.entrepreneurEmail
                                                                            }
                                                                        </td>
                                                                        <td className="py-3 px-3 font-bold">
                                                                            {formatDate(
                                                                                enrollment.enrollmentDate
                                                                            )}
                                                                        </td>
                                                                        <td className="py-3 px-3">
                                                                            <span
                                                                                className={`px-3 py-1 font-black text-xs border-3 rounded-lg ${
                                                                                    enrollment.attended
                                                                                        ? 'border-green-600 bg-green-300 text-black'
                                                                                        : 'border-orange-600 bg-orange-300 text-black'
                                                                                }`}
                                                                            >
                                                                                {enrollment.attended
                                                                                    ? '✅ Attended'
                                                                                    : '❌ Absent'}
                                                                            </span>
                                                                        </td>
                                                                        <td className="py-3 px-3 font-black">
                                                                            {enrollment.feedbackRating ? (
                                                                                <span className="bg-orange-200 px-3 py-1 rounded-lg border-2 border-black">
                                                                                    ⭐ {enrollment.feedbackRating}/5
                                                                                </span>
                                                                            ) : (
                                                                                <span className="text-gray-500 font-bold">
                                                                                    🚫 No feedback
                                                                                </span>
                                                                            )}
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            )
                                                        ) : (
                                                            <tr>
                                                                <td
                                                                    colSpan="5"
                                                                    className="py-6 px-3 text-center text-gray-600 font-black text-lg"
                                                                >
                                                                    📭 No enrollments yet
                                                                </td>
                                                            </tr>
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorkshopTable;
