import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function ReaderScreen() {
  const router = useRouter();
  const colors = useColors();
  const { title } = useLocalSearchParams<{ title?: string }>();
  const [saved, setSaved] = useState(false);

  return (
    <ScreenContainer containerClassName="bg-background" edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color={colors.foreground} /></Pressable><Text style={[styles.headerTitle, { color: colors.foreground }]}>Reading</Text><Pressable onPress={() => setSaved(!saved)} style={({ pressed }) => [styles.backButton, { backgroundColor: saved ? '#EAF2FF' : colors.surface, borderColor: saved ? colors.primary : colors.border }, pressed && styles.pressed]}><IconSymbol name="bookmark.fill" size={20} color={saved ? colors.primary : colors.foreground} /></Pressable></View>
        <View style={styles.metaRow}><View style={styles.metaPill}><IconSymbol name="cloud.fill" size={14} color="#17A673" /><Text style={styles.metaText}>Available offline</Text></View><Text style={[styles.readTime, { color: colors.muted }]}>5 min read</Text></View>
        <Text style={[styles.title, { color: colors.foreground }]}>{title || 'Numbers & Place Value'}</Text><Text style={[styles.subtitle, { color: colors.muted }]}>Mathematics · Class 1–5 · Chapter 01</Text>
        <View style={styles.divider} />
        <View style={[styles.highlight, { backgroundColor: '#EAF2FF' }]}><View style={styles.quoteMark}><Text style={styles.quoteText}>“</Text></View><Text style={[styles.highlightText, { color: colors.foreground }]}>Every number tells a story. Let’s learn to read it, write it, and use it with confidence.</Text></View>
        <Text style={[styles.heading, { color: colors.foreground }]}>What is place value?</Text><Text style={[styles.paragraph, { color: colors.muted }]}>Place value tells us the value of a digit based on where it sits in a number. In 352, the digit 3 is in the hundreds place, 5 is in the tens place, and 2 is in the ones place.</Text>
        <View style={[styles.exampleCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><Text style={[styles.exampleLabel, { color: colors.primary }]}>EXAMPLE</Text><View style={styles.numberRow}><View><Text style={[styles.bigNumber, { color: colors.foreground }]}>352</Text><View style={styles.numberLabels}><Text style={[styles.numberLabel, { color: '#E05A73' }]}>Hundreds</Text><Text style={[styles.numberLabel, { color: '#F59E0B' }]}>Tens</Text><Text style={[styles.numberLabel, { color: '#17A673' }]}>Ones</Text></View></View><View style={styles.breakdown}><Text style={[styles.breakdownText, { color: colors.muted }]}>3 × 100 = 300</Text><Text style={[styles.breakdownText, { color: colors.muted }]}>5 × 10 = 50</Text><Text style={[styles.breakdownText, { color: colors.muted }]}>2 × 1 = 2</Text></View></View><View style={[styles.totalLine, { borderTopColor: colors.border }]}><Text style={[styles.totalText, { color: colors.foreground }]}>300 + 50 + 2 = 352</Text><IconSymbol name="checkmark.seal.fill" size={20} color="#17A673" /></View></View>
        <Text style={[styles.heading, { color: colors.foreground }]}>Try it yourself</Text><Text style={[styles.paragraph, { color: colors.muted }]}>What is the value of the digit 4 in the number 4,276? Think about its position before checking your answer.</Text>
        <Pressable onPress={() => setSaved(true)} style={({ pressed }) => [styles.noteButton, { backgroundColor: colors.primary }, pressed && styles.pressed]}><IconSymbol name="bookmark.fill" size={18} color="#FFF" /><Text style={styles.noteButtonText}>{saved ? 'Saved to bookmarks' : 'Save this lesson'}</Text></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 35 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  backButton: { height: 40, width: 40, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '800' },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  metaPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#E5F8F0', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 5 },
  metaText: { color: '#17A673', fontSize: 10, fontWeight: '800' },
  readTime: { fontSize: 10 },
  title: { fontSize: 28, lineHeight: 34, fontWeight: '900', letterSpacing: -0.6, marginTop: 18 },
  subtitle: { fontSize: 12, marginTop: 6 },
  divider: { height: 1, backgroundColor: '#E3EAF4', marginVertical: 21 },
  highlight: { borderRadius: 17, padding: 16, flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 26 },
  quoteMark: { height: 27, width: 27, borderRadius: 10, backgroundColor: '#CFE1FF', alignItems: 'center', justifyContent: 'center' },
  quoteText: { color: '#1769E0', fontSize: 24, lineHeight: 28, fontWeight: '900' },
  highlightText: { flex: 1, fontSize: 13, lineHeight: 20, fontWeight: '700' },
  heading: { fontSize: 19, fontWeight: '900', marginBottom: 9 },
  paragraph: { fontSize: 13, lineHeight: 21, marginBottom: 20 },
  exampleCard: { borderRadius: 18, borderWidth: 1, padding: 16, marginBottom: 25 },
  exampleLabel: { fontSize: 9, fontWeight: '900', letterSpacing: 1.1, marginBottom: 14 },
  numberRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  bigNumber: { fontSize: 34, fontWeight: '900', letterSpacing: 4 },
  numberLabels: { flexDirection: 'row', gap: 7, marginTop: 4 },
  numberLabel: { fontSize: 8, fontWeight: '800' },
  breakdown: { gap: 5 },
  breakdownText: { fontSize: 11 },
  totalLine: { borderTopWidth: 1, marginTop: 15, paddingTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalText: { fontSize: 13, fontWeight: '900' },
  noteButton: { minHeight: 52, borderRadius: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 7, marginTop: 4 },
  noteButtonText: { color: '#FFF', fontSize: 13, fontWeight: '800' },
  pressed: { opacity: 0.77 },
});
