import {formatDate} from './toolbox';

// Fonction à obtenir parcours filtré
export const fetchFilteredCourses = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/course/filtered?establishment=ENI');
        const data = await response.json();

        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des parcours filtré: ', error);
    }
}

// Fonction à récupérer les programmes filtrés
export const fetchFilteredPrograms = async (courseId, startDate, endDate) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/program/filtered?course-id=' + courseId + '&start-date=' + startDate + '&end-date=' + endDate);
        const data = await response.json();

        if (response.ok) {
            return data;
        }
    } catch (Error) {
        console.log('Erreur lors de la récupération de programme: ', Error);
    }
};

// Function to fetch timetable data
export const fetchFreshTimetable = async (courseId, mondayDate) => {
    // Clone the mondayDate to avoid modifying the original
    const nextSaturday = new Date(mondayDate.getTime());

    // Add 6 days to get to next Saturday
    nextSaturday.setDate(nextSaturday.getDate() + 6);

    const data = await fetchFilteredPrograms(courseId, formatDate(mondayDate), formatDate(nextSaturday));

    return data;
};

// Fonction à enregistrer les nouveaux programmes
export const createNewPrograms = async (programs) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/program/many/', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(programs)
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        }
    } catch (Error) {
        console.log("Erreur lors de l'enregistrement des programmes: ", Error);
    }
};

// Fonction à obtenir les jours dans la semaine
export const fetchWeekDays = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/week/');
        const data = await response.json();

        if (response.ok) {
            return data;
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des jours de la semaine: ', error);
    }
}

// Fonction à modifier le programme existant
export const updateExistingProgram = async (id, program) => {
    try {
        const response = await fetch('http://localhost:8080/api/v1/program/update?id='+id, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(program)
        });
        const data = await response.json();

        if (response.ok) {
            return data;
        }
    } catch (Error) {
        console.log("Erreur lors de modification du programme: ", Error);
    }
};
