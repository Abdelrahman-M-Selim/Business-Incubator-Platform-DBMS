export const workshopService = {
    // Fetch all workshops
    async getWorkshops() {
        try {
            const workshops = await window.electron.invoke('get-workshops');
            return workshops;
        } catch (error) {
            console.error('Error fetching workshops:', error);
            throw error;
        }
    },

    // Get single workshop details
    async getWorkshop(id) {
        try {
            const workshop = await window.electron.invoke('get-workshop', id);
            return workshop;
        } catch (error) {
            console.error(`Error fetching workshop ${id}:`, error);
            throw error;
        }
    },

    // Create new workshop
    async createWorkshop(workshopData) {
        try {
            const result = await window.electron.invoke('create-workshop', workshopData);
            return result;
        } catch (error) {
            console.error('Error creating workshop:', error);
            throw error;
        }
    },

    // Update workshop
    async updateWorkshop(id, workshopData) {
        try {
            const result = await window.electron.invoke('update-workshop', id, workshopData);
            return result;
        } catch (error) {
            console.error(`Error updating workshop ${id}:`, error);
            throw error;
        }
    },

    // Delete workshop
    async deleteWorkshop(id) {
        try {
            const result = await window.electron.invoke('delete-workshop', id);
            return result;
        } catch (error) {
            console.error(`Error deleting workshop ${id}:`, error);
            throw error;
        }
    },

    // Track attendance
    async trackAttendance(enrollmentId, attended) {
        try {
            const result = await window.electron.invoke('track-attendance', enrollmentId, attended);
            return result;
        } catch (error) {
            console.error(`Error tracking attendance:`, error);
            throw error;
        }
    },

    // Submit feedback
    async submitFeedback(enrollmentId, feedbackData) {
        try {
            const result = await window.electron.invoke('submit-feedback', enrollmentId, feedbackData);
            return result;
        } catch (error) {
            console.error('Error submitting feedback:', error);
            throw error;
        }
    },

    // Get enrollments for a workshop
    async getWorkshopEnrollments(workshopId) {
        try {
            const enrollments = await window.electron.invoke('get-workshop-enrollments', workshopId);
            return enrollments;
        } catch (error) {
            console.error(`Error fetching enrollments:`, error);
            throw error;
        }
    },

    // Export attendance report in PDF
    async exportAttendanceReport() {
        try {
            const filePath = await window.electron.invoke('export-attendance-report');
            console.log('Attendance report exported to:', filePath);
            return filePath;
        } catch (error) {
            console.error('Error exporting attendance report:', error);
            throw error;
        }
    },

    // Export feedback report in PDF
    async exportFeedbackReport() {
        try {
            const filePath = await window.electron.invoke('export-feedback-report');
            console.log('Feedback report exported to:', filePath);
            return filePath;
        } catch (error) {
            console.error('Error exporting feedback report:', error);
            throw error;
        }
    },

    // Get report data
    async getAttendanceReport() {
        try {
            const report = await window.electron.invoke('get-attendance-report');
            return report;
        } catch (error) {
            console.error('Error fetching attendance report:', error);
            throw error;
        }
    },

    async getFeedbackReport() {
        try {
            const report = await window.electron.invoke('get-feedback-report');
            return report;
        } catch (error) {
            console.error('Error fetching feedback report:', error);
            throw error;
        }
    },
};
