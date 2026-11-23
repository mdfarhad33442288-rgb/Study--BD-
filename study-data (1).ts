export type ClassGroup = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  lightColor: string;
  subjects: number;
  chapters: number;
  progress: number;
  subjectList: string[];
};

export const classGroups: ClassGroup[] = [
  {
    id: 'primary',
    title: 'Class 1–5',
    subtitle: 'Primary school',
    description: 'Build bright foundations with fun lessons and practice.',
    icon: 'school',
    color: '#2F76EA',
    lightColor: '#EAF2FF',
    subjects: 7,
    chapters: 48,
    progress: 62,
    subjectList: ['Bangla', 'English', 'Mathematics', 'Science', 'BGS'],
  },
  {
    id: 'junior',
    title: 'Class 6–8',
    subtitle: 'Junior secondary',
    description: 'Explore concepts, solve problems, and learn every day.',
    icon: 'auto-stories',
    color: '#7B61FF',
    lightColor: '#F0EDFF',
    subjects: 9,
    chapters: 72,
    progress: 38,
    subjectList: ['Bangla', 'English', 'Mathematics', 'Science', 'ICT'],
  },
  {
    id: 'secondary',
    title: 'Class 9–10',
    subtitle: 'SSC preparation',
    description: 'Targeted revision, MCQs, and board-focused resources.',
    icon: 'workspace-premium',
    color: '#14A879',
    lightColor: '#E5F8F0',
    subjects: 10,
    chapters: 96,
    progress: 24,
    subjectList: ['Physics', 'Chemistry', 'Biology', 'Higher Math', 'ICT'],
  },
  {
    id: 'higher',
    title: 'Class 11–12',
    subtitle: 'HSC preparation',
    description: 'Deep dives, model tests, and smart exam preparation.',
    icon: 'science',
    color: '#E05A73',
    lightColor: '#FFF0F3',
    subjects: 12,
    chapters: 120,
    progress: 12,
    subjectList: ['Physics', 'Chemistry', 'Biology', 'Higher Math', 'English'],
  },
];

export const libraryItems = [
  { id: 'english', title: 'English Learning', subtitle: 'Speak with confidence', icon: 'translate', color: '#2F76EA' },
  { id: 'grammar', title: 'Grammar', subtitle: 'Rules made simple', icon: 'edit-note', color: '#7B61FF' },
  { id: 'quiz', title: 'Quiz', subtitle: 'Test your knowledge', icon: 'quiz', color: '#E05A73' },
  { id: 'notes', title: 'Notes', subtitle: 'Your saved summaries', icon: 'sticky-note-2', color: '#14A879' },
  { id: 'videos', title: 'Video Lessons', subtitle: 'Learn from teachers', icon: 'play-circle', color: '#F59E0B' },
  { id: 'favorites', title: 'Favorites', subtitle: 'Keep close at hand', icon: 'bookmark', color: '#1769E0' },
];

export const dailyQuiz = {
  question: 'Which planet is known as the Red Planet?',
  options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
  answer: 'Mars',
  subject: 'General Science',
  questionNumber: 3,
  totalQuestions: 10,
};

export const chapterItems = [
  { id: 'ch-01', title: 'Numbers & Place Value', type: 'Chapter 01', duration: '18 min', completed: true },
  { id: 'ch-02', title: 'Fractions and Decimals', type: 'Chapter 02', duration: '24 min', completed: true },
  { id: 'ch-03', title: 'Geometry Around Us', type: 'Chapter 03', duration: '31 min', completed: false },
  { id: 'ch-04', title: 'Measurement', type: 'Chapter 04', duration: '20 min', completed: false },
  { id: 'ch-05', title: 'Data and Patterns', type: 'Chapter 05', duration: '26 min', completed: false },
];
