import initialData from '../store/db.json';

const DB_KEY = 'portfolio_db';

export const initializeDb = () => {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    }
};

export const readDb = () => {
    initializeDb();
    return JSON.parse(localStorage.getItem(DB_KEY));
};

export const writeDb = (data) => {
    try {
        localStorage.setItem(DB_KEY, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error writing to localStorage:', error);
        return false;
    }
};

export const updateProjects = (projects) => {
    const db = readDb();
    if (db) {
        db.projects = projects;
        return writeDb(db);
    }
    return false;
};

export const updateCourses = (courses) => {
    const db = readDb();
    if (db) {
        db.courses = courses;
        return writeDb(db);
    }
    return false;
}; 