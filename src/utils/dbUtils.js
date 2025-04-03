import initialData from '../store/db.json';

const DB_KEY = 'mvep_db';

export const initializeDb = () => {
    if (!localStorage.getItem(DB_KEY)) {
        localStorage.setItem(DB_KEY, JSON.stringify(initialData));
    }
};

export const getDb = () => {
    return JSON.parse(localStorage.getItem(DB_KEY) || JSON.stringify(initialData));
};

export const updateCourses = (courses) => {
    const db = getDb();
    db.courses = courses;
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const updateUsers = (users) => {
    const db = getDb();
    db.users = users;
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const addUser = (user) => {
    const db = getDb();
    db.users.push(user);
    localStorage.setItem(DB_KEY, JSON.stringify(db));
};

export const updateUser = (userId, updates) => {
    const db = getDb();
    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
        db.users[userIndex] = { ...db.users[userIndex], ...updates };
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        return true;
    }
    return false;
};

export const updateProjects = (projects) => {
    try {
        const db = getDb();
        db.projects = projects;
        localStorage.setItem(DB_KEY, JSON.stringify(db));
        return true;
    } catch (error) {
        console.error('Error updating projects:', error);
        return false;
    }
};

export const getProjects = () => {
    try {
        const db = getDb();
        return db.projects;
    } catch (error) {
        console.error('Error reading projects:', error);
        return [];
    }
}; 