/**
 * Application Data
 * All study data from original app
 */

// Hero Stats
export const heroStats = {
  completion: 34,
  lectures: 142,
  hours: 89,
  tests: 23
};

// Subject Filters
export const subjectFilters = ['All', 'Physics', 'Chemistry', 'Maths'];

// Up Next Lectures
export const upNext = [
  {
    id: 1,
    title: 'Electrostatics - Coulomb\'s Law',
    subject: 'Physics',
    teacher: 'Dr. Sharma',
    duration: '45 min',
    thumbnail: null
  },
  {
    id: 2,
    title: 'Organic Chemistry - Reaction Mechanisms',
    subject: 'Chemistry',
    teacher: 'Prof. Kumar',
    duration: '60 min',
    thumbnail: null
  },
  {
    id: 3,
    title: 'Calculus - Integration by Parts',
    subject: 'Maths',
    teacher: 'Dr. Patel',
    duration: '50 min',
    thumbnail: null
  }
];

// All Lectures
export const lectures = [
  {
    id: 1,
    title: 'Electrostatics - Coulomb\'s Law and Electric Field',
    subject: 'Physics',
    teacher: 'Dr. Sharma',
    duration: 2700,
    progress: 65,
    thumbnail: null,
    description: 'Learn about the fundamental force between charged particles and how to calculate electric fields.'
  },
  {
    id: 2,
    title: 'Organic Chemistry - Reaction Mechanisms Part 1',
    subject: 'Chemistry',
    teacher: 'Prof. Kumar',
    duration: 3600,
    progress: 0,
    thumbnail: null,
    description: 'Understanding nucleophilic substitution reactions and their mechanisms.'
  },
  {
    id: 3,
    title: 'Calculus - Integration by Parts and Applications',
    subject: 'Maths',
    teacher: 'Dr. Patel',
    duration: 3000,
    progress: 100,
    thumbnail: null,
    description: 'Master the technique of integration by parts with practical examples.'
  },
  {
    id: 4,
    title: 'Mechanics - Newton\'s Laws of Motion',
    subject: 'Physics',
    teacher: 'Dr. Sharma',
    duration: 2400,
    progress: 30,
    thumbnail: null,
    description: 'Deep dive into the three laws that govern classical mechanics.'
  },
  {
    id: 5,
    title: 'Coordination Compounds - Werner\'s Theory',
    subject: 'Chemistry',
    teacher: 'Prof. Kumar',
    duration: 2800,
    progress: 0,
    thumbnail: null,
    description: 'Understanding the structure and bonding in coordination compounds.'
  },
  {
    id: 6,
    title: 'Vector Algebra - Dot and Cross Products',
    subject: 'Maths',
    teacher: 'Dr. Patel',
    duration: 2600,
    progress: 85,
    thumbnail: null,
    description: 'Learn vector operations and their geometric interpretations.'
  }
];

// Continue Watching
export const continueWatching = lectures.filter(l => l.progress > 0 && l.progress < 100);

// Leaderboard
export const leaderboard = [
  { rank: 1, name: 'Aryan Singh', score: '12,450', avatar: 'AS' },
  { rank: 2, name: 'Priya Sharma', score: '11,890', avatar: 'PS' },
  { rank: 3, name: 'Rahul Verma', score: '11,230', avatar: 'RV' },
  { rank: 4, name: 'Sneha Gupta', score: '10,980', avatar: 'SG' },
  { rank: 5, name: 'Aditya Kumar', score: '10,560', avatar: 'AK' },
  { rank: 6, name: 'Anjali Reddy', score: '10,120', avatar: 'AR' },
  { rank: 7, name: 'Vikram Joshi', score: '9,870', avatar: 'VJ' },
  { rank: 8, name: 'Neha Patel', score: '9,540', avatar: 'NP' }
];

// Tests
export const tests = [
  {
    id: 1,
    title: 'Electrostatics Mock Test',
    subject: 'Physics',
    questions: 25,
    duration: 60,
    difficulty: 'medium',
    attempts: 1247,
    avgScore: 68
  },
  {
    id: 2,
    title: 'Organic Chemistry Chapter Test',
    subject: 'Chemistry',
    questions: 30,
    duration: 45,
    difficulty: 'hard',
    attempts: 892,
    avgScore: 54
  },
  {
    id: 3,
    title: 'Calculus Fundamentals',
    subject: 'Maths',
    questions: 20,
    duration: 30,
    difficulty: 'easy',
    attempts: 2156,
    avgScore: 78
  },
  {
    id: 4,
    title: 'Mechanics Full Syllabus',
    subject: 'Physics',
    questions: 50,
    duration: 90,
    difficulty: 'hard',
    attempts: 654,
    avgScore: 62
  },
  {
    id: 5,
    title: 'Coordinate Geometry',
    subject: 'Maths',
    questions: 25,
    duration: 40,
    difficulty: 'medium',
    attempts: 1534,
    avgScore: 71
  }
];

// Test History
export const testHistory = [
  {
    id: 101,
    testId: 1,
    title: 'Electrostatics Mock Test',
    date: '2024-01-15',
    score: 84,
    correct: 21,
    total: 25,
    timeSpent: 52
  },
  {
    id: 102,
    testId: 3,
    title: 'Calculus Fundamentals',
    date: '2024-01-14',
    score: 92,
    correct: 18,
    total: 20,
    timeSpent: 28
  },
  {
    id: 103,
    testId: 2,
    title: 'Organic Chemistry Chapter Test',
    date: '2024-01-12',
    score: 67,
    correct: 20,
    total: 30,
    timeSpent: 45
  }
];

// Seed Notes
export const seedNotes = [
  {
    id: 1,
    title: 'Electrostatics Formula Sheet',
    preview: 'Key formulas: F = kq1q2/r², E = F/q, V = kq/r...',
    subject: 'Physics',
    date: 'Jan 15, 2024'
  },
  {
    id: 2,
    title: 'Organic Reactions Summary',
    preview: 'SN1 vs SN2: SN1 is two-step, SN2 is one-step...',
    subject: 'Chemistry',
    date: 'Jan 14, 2024'
  },
  {
    id: 3,
    title: 'Integration Techniques',
    preview: 'By parts: ∫u dv = uv - ∫v du...',
    subject: 'Maths',
    date: 'Jan 13, 2024'
  }
];

// Study Hours (last 7 days)
export const studyHours = [40, 65, 30, 80, 55, 20, 70];

// Streak Days (last 7 days)
export const streakDays = [true, true, true, true, true, false, true];

// Streak Count
export const streakCount = 12;

// Classes
export const classes = [
  {
    id: 1,
    name: 'Physics - Class XI',
    teacher: 'Dr. Sharma',
    icon: 'physics',
    totalLectures: 48,
    completedLectures: 32,
    nextClass: 'Tomorrow, 10 AM'
  },
  {
    id: 2,
    name: 'Chemistry - Class XI',
    teacher: 'Prof. Kumar',
    icon: 'chemistry',
    totalLectures: 52,
    completedLectures: 28,
    nextClass: 'Today, 2 PM'
  },
  {
    id: 3,
    name: 'Maths - Class XI',
    teacher: 'Dr. Patel',
    icon: 'maths',
    totalLectures: 45,
    completedLectures: 38,
    nextClass: 'Wed, 11 AM'
  }
];

// Notifications
export const notifications = [
  {
    id: 1,
    title: 'New Test Available',
    message: 'Electrostatics Mock Test is now live',
    time: '2h ago',
    read: false,
    type: 'test'
  },
  {
    id: 2,
    title: 'Class Reminder',
    message: 'Chemistry class starts in 30 minutes',
    time: '4h ago',
    read: false,
    type: 'class'
  },
  {
    id: 3,
    title: 'Streak Milestone',
    message: 'Congratulations! You\'ve reached a 12-day streak',
    time: '1d ago',
    read: true,
    type: 'achievement'
  },
  {
    id: 4,
    title: 'New Lecture Added',
    message: 'Vector Algebra Part 3 is now available',
    time: '2d ago',
    read: true,
    type: 'lecture'
  }
];

// Week days for chart
export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// Notes store (for pages/NotesPage.js)
export const notesStore = {
  getAll() {
    try {
      const data = localStorage.getItem('delta_notes');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  },
  add(note) {
    const notes = this.getAll();
    const newNote = {
      ...note,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };
    notes.unshift(newNote);
    localStorage.setItem('delta_notes', JSON.stringify(notes));
    return newNote;
  },
  delete(id) {
    const notes = this.getAll().filter(n => n.id !== id);
    localStorage.setItem('delta_notes', JSON.stringify(notes));
    return true;
  }
};

// User store (for auth)
export const userStore = {
  get() {
    try {
      const data = localStorage.getItem('delta_user');
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },
  set(user) {
    localStorage.setItem('delta_user', JSON.stringify(user));
  },
  clear() {
    localStorage.removeItem('delta_user');
  }
};
