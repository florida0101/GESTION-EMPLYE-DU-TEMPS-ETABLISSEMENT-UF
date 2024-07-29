// Function to calculate Monday's date
export const getMondayDateOfCurrentWeek = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)

    // Find the offset to get to the previous Monday
    const offset = (dayOfWeek === 0) ? 6 : dayOfWeek - 1;

    // Adjust the date to the previous Monday
    const monday = new Date(today.getTime() - offset * 24 * 60 * 60 * 1000);

    return monday;
};

export const formatDate = (date) => {
    const formattedDate = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    return formattedDate;
}

// Fonction à grouper les parcours dans leur propre niveau
export const getGroupedCourse = (courseData) => {
    const groupedCourse = { l1: [], l2: [], l3: [], m1: [], m2: [] };

    // Insère chaque parcours dans sa propre niveau.
    if (courseData.length > 0) {
        courseData.map((item) => {
            switch (item.rankLevel) {
                case 'L1':
                    groupedCourse.l1.push({ courseId: item.courseId, courseName: item.courseName });
                    break;
                case 'L2':
                    groupedCourse.l2.push({ courseId: item.courseId, courseName: item.courseName });
                    break;
                case 'L3':
                    groupedCourse.l3.push({ courseId: item.courseId, courseName: item.courseName });
                    break;
                case 'M1':
                    groupedCourse.m1.push({ courseId: item.courseId, courseName: item.courseName });
                    break;
                case 'M2':
                    groupedCourse.m2.push({ courseId: item.courseId, courseName: item.courseName });
                    break;
            }
        });
    }

    return groupedCourse;
};
