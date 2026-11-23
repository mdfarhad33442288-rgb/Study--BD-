import { describe, expect, it } from 'vitest';

import { classGroups, dailyQuiz, libraryItems } from '../constants/study-data';

describe('study BD learning data', () => {
  it('contains all four class pathways with subjects and chapters', () => {
    expect(classGroups).toHaveLength(4);
    expect(classGroups.map((group) => group.title)).toEqual(['Class 1–5', 'Class 6–8', 'Class 9–10', 'Class 11–12']);
    expect(classGroups.every((group) => group.subjects > 0 && group.chapters > 0)).toBe(true);
  });

  it('exposes the requested library categories', () => {
    const titles = libraryItems.map((item) => item.title);
    expect(titles).toEqual(expect.arrayContaining(['English Learning', 'Grammar', 'Quiz', 'Notes', 'Video Lessons', 'Favorites']));
  });

  it('has a valid daily quiz answer', () => {
    expect(dailyQuiz.options).toContain(dailyQuiz.answer);
    expect(dailyQuiz.totalQuestions).toBeGreaterThan(dailyQuiz.questionNumber);
  });
});
