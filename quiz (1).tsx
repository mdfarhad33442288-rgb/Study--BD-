import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { dailyQuiz } from '@/constants/study-data';
import { useColors } from '@/hooks/use-colors';

export default function QuizScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selected, setSelected] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const answer = (option: string) => {
    setSelected(option);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const submit = () => {
    if (!selected) return;
    setCompleted(true);
    Haptics.notificationAsync(selected === dailyQuiz.answer ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning);
  };

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <View style={styles.content}>
        <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color={colors.foreground} /></Pressable><Text style={[styles.headerTitle, { color: colors.foreground }]}>Daily quiz</Text><View style={styles.headerSpacer} /></View>
        <View style={styles.progressMeta}><Text style={[styles.progressLabel, { color: colors.muted }]}>QUESTION {dailyQuiz.questionNumber} OF {dailyQuiz.totalQuestions}</Text><Text style={[styles.progressScore, { color: colors.primary }]}>+10 XP</Text></View>
        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}><View style={[styles.progressFill, { width: `${(dailyQuiz.questionNumber / dailyQuiz.totalQuestions) * 100}%`, backgroundColor: colors.primary }]} /></View>
        <View style={styles.quizIntro}><View style={styles.quizIcon}><IconSymbol name="sparkles" size={23} color="#1769E0" /></View><View><Text style={[styles.subject, { color: colors.primary }]}>{dailyQuiz.subject}</Text><Text style={[styles.introText, { color: colors.muted }]}>One question a day keeps the doubt away</Text></View></View>
        <View style={[styles.questionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.question, { color: colors.foreground }]}>{dailyQuiz.question}</Text><Text style={[styles.chooseText, { color: colors.muted }]}>Choose the correct answer</Text></View>
        <View style={styles.options}>{dailyQuiz.options.map((option, index) => { const isSelected = selected === option; const isCorrect = completed && option === dailyQuiz.answer; const isWrong = completed && isSelected && option !== dailyQuiz.answer; return <Pressable key={option} onPress={() => !completed && answer(option)} style={({ pressed }) => [styles.option, { backgroundColor: isCorrect ? '#E5F8F0' : isWrong ? '#FFF0F0' : isSelected ? '#EAF2FF' : colors.surface, borderColor: isCorrect ? '#17A673' : isWrong ? '#E05252' : isSelected ? colors.primary : colors.border }, pressed && styles.pressed]}><View style={[styles.optionLetter, { backgroundColor: isCorrect ? '#17A673' : isWrong ? '#E05252' : isSelected ? colors.primary : '#EEF2F7' }]}><Text style={[styles.optionLetterText, { color: isCorrect || isWrong || isSelected ? '#FFF' : colors.muted }]}>{String.fromCharCode(65 + index)}</Text></View><Text style={[styles.optionText, { color: colors.foreground }]}>{option}</Text><View style={styles.optionStatus}>{isCorrect ? <IconSymbol name="checkmark.seal.fill" size={20} color="#17A673" /> : isWrong ? <IconSymbol name="close" size={20} color="#E05252" /> : isSelected ? <View style={styles.selectedDot} /> : null}</View></Pressable>; })}</View>
        {completed ? <View style={[styles.resultCard, { backgroundColor: selected === dailyQuiz.answer ? '#E5F8F0' : '#FFF7E6' }]}><IconSymbol name={selected === dailyQuiz.answer ? 'checkmark.seal.fill' : 'sparkles'} size={22} color={selected === dailyQuiz.answer ? '#17A673' : '#F59E0B'} /><View style={{ flex: 1 }}><Text style={[styles.resultTitle, { color: colors.foreground }]}>{selected === dailyQuiz.answer ? 'Great job! +10 XP' : 'Keep going! +2 XP'}</Text><Text style={[styles.resultSub, { color: colors.muted }]}>{selected === dailyQuiz.answer ? 'You got the correct answer.' : `The correct answer is ${dailyQuiz.answer}.`}</Text></View></View> : null}
        <Pressable disabled={!selected || completed} onPress={submit} style={({ pressed }) => [styles.submitButton, { backgroundColor: selected && !completed ? colors.primary : colors.border }, pressed && styles.pressed]}><Text style={styles.submitText}>{completed ? 'Answer submitted' : 'Check answer'}</Text><IconSymbol name="chevron.right" size={18} color="#FFF" /></Pressable>
        <Pressable onPress={() => Alert.alert('Quiz reminders', 'Daily quiz reminders are enabled for your account.')} style={styles.reminder}><IconSymbol name="bell.fill" size={16} color={colors.muted} /><Text style={[styles.reminderText, { color: colors.muted }]}>You’ll get a reminder tomorrow</Text></Pressable>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 16, paddingBottom: 30, flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  backButton: { height: 40, width: 40, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800' },
  headerSpacer: { width: 40 },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 0.9 },
  progressScore: { fontSize: 11, fontWeight: '800' },
  progressTrack: { height: 6, borderRadius: 3, marginTop: 9, overflow: 'hidden' },
  progressFill: { height: 6, borderRadius: 3 },
  quizIntro: { flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 31, marginBottom: 18 },
  quizIcon: { height: 43, width: 43, borderRadius: 14, backgroundColor: '#EAF2FF', alignItems: 'center', justifyContent: 'center' },
  subject: { fontSize: 12, fontWeight: '800' },
  introText: { fontSize: 11, marginTop: 3 },
  questionCard: { borderRadius: 20, borderWidth: 1, padding: 20, marginBottom: 14 },
  question: { fontSize: 22, fontWeight: '800', lineHeight: 28, letterSpacing: -0.4 },
  chooseText: { fontSize: 12, marginTop: 12 },
  options: { gap: 10 },
  option: { minHeight: 58, borderRadius: 16, borderWidth: 1, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionLetter: { height: 35, width: 35, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  optionLetterText: { fontSize: 13, fontWeight: '800' },
  optionText: { fontSize: 14, fontWeight: '700', flex: 1 },
  optionStatus: { width: 22, alignItems: 'center' },
  selectedDot: { height: 10, width: 10, borderRadius: 5, backgroundColor: '#1769E0' },
  resultCard: { borderRadius: 16, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 16 },
  resultTitle: { fontSize: 13, fontWeight: '800' },
  resultSub: { fontSize: 11, marginTop: 3 },
  submitButton: { minHeight: 54, borderRadius: 16, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, marginTop: 20 },
  submitText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  reminder: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 18 },
  reminderText: { fontSize: 11 },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
