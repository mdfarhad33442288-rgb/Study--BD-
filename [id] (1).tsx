import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { chapterItems, classGroups } from '@/constants/study-data';
import { useColors } from '@/hooks/use-colors';

const tabs = ['Chapters', 'PDF Books', 'Notes', 'MCQ Quiz', 'Videos'];

export default function ClassDetailScreen() {
  const router = useRouter();
  const colors = useColors();
  const { id } = useLocalSearchParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('Chapters');
  const group = classGroups.find((item) => item.id === id) ?? classGroups[0];

  const openItem = () => router.push({ pathname: '/reader', params: { title: activeTab === 'Chapters' ? 'Numbers & Place Value' : activeTab } });

  return (
    <ScreenContainer containerClassName="bg-background" edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color={colors.foreground} /></Pressable><Text style={[styles.headerTitle, { color: colors.foreground }]}>Class overview</Text><Pressable onPress={() => router.push('/search')} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="magnifyingglass" size={20} color={colors.foreground} /></Pressable></View>
        <View style={[styles.hero, { backgroundColor: group.color }]}><View style={styles.heroCircle} /><View style={{ zIndex: 1, flex: 1 }}><Text style={styles.heroEyebrow}>{group.subtitle.toUpperCase()}</Text><Text style={styles.heroTitle}>{group.title}</Text><Text style={styles.heroDescription}>{group.description}</Text><View style={styles.heroMeta}><View><Text style={styles.metaValue}>{group.subjects}</Text><Text style={styles.metaLabel}>Subjects</Text></View><View><Text style={styles.metaValue}>{group.chapters}</Text><Text style={styles.metaLabel}>Chapters</Text></View><View><Text style={styles.metaValue}>{group.progress}%</Text><Text style={styles.metaLabel}>Complete</Text></View></View></View><View style={styles.heroIcon}><IconSymbol name={group.icon} size={42} color="#FFF" /></View></View>
        <View style={styles.subjectsRow}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Popular subjects</Text><Text style={[styles.subjectHint, { color: colors.muted }]}>Tap to explore</Text></View><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.subjectList}>{group.subjectList.map((subject, index) => <Pressable key={subject} onPress={openItem} style={({ pressed }) => [styles.subjectChip, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.subjectDot, { backgroundColor: [group.color, '#7B61FF', '#F59E0B', '#E05A73', '#14A879'][index % 5] }]} /><Text style={[styles.subjectText, { color: colors.foreground }]}>{subject}</Text></Pressable>)}</ScrollView>
        <View style={[styles.tabsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabList}>{tabs.map((tab) => <Pressable key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && { backgroundColor: '#EAF2FF' }]}><Text style={[styles.tabText, { color: activeTab === tab ? colors.primary : colors.muted }]}>{tab}</Text></Pressable>)}</ScrollView></View>
        <View style={styles.contentHeader}><View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>{activeTab}</Text><Text style={[styles.subjectHint, { color: colors.muted }]}>{activeTab === 'Chapters' ? 'Continue where you left off' : 'Curated for your exam preparation'}</Text></View><Pressable onPress={() => router.push('/reader')}><Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text></Pressable></View>
        {activeTab === 'Chapters' ? chapterItems.map((chapter, index) => <Pressable key={chapter.id} onPress={openItem} style={({ pressed }) => [styles.chapterRow, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.chapterNumber, { backgroundColor: chapter.completed ? '#E5F8F0' : '#EAF2FF' }]}><Text style={[styles.chapterNumberText, { color: chapter.completed ? '#17A673' : colors.primary }]}>{String(index + 1).padStart(2, '0')}</Text></View><View style={{ flex: 1 }}><Text style={[styles.chapterTitle, { color: colors.foreground }]}>{chapter.title}</Text><Text style={[styles.chapterMeta, { color: colors.muted }]}>{chapter.type} · {chapter.duration}</Text></View>{chapter.completed ? <IconSymbol name="checkmark.seal.fill" size={21} color="#17A673" /> : <View style={styles.playCircle}><IconSymbol name="play.fill" size={15} color={colors.primary} /></View>}</Pressable>) : <View>{['Complete study guide', 'Quick revision notes', 'Practice set 01'].map((item, index) => <Pressable key={item} onPress={openItem} style={({ pressed }) => [styles.chapterRow, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.chapterNumber, { backgroundColor: index === 0 ? '#F0EDFF' : '#EAF2FF' }]}><IconSymbol name={activeTab === 'Videos' ? 'play-circle' : activeTab === 'MCQ Quiz' ? 'quiz' : activeTab === 'PDF Books' ? 'book.fill' : 'sticky-note-2'} size={19} color={index === 0 ? '#7B61FF' : colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.chapterTitle, { color: colors.foreground }]}>{item}</Text><Text style={[styles.chapterMeta, { color: colors.muted }]}>{activeTab} · {index + 1} resource{index ? 's' : ''}</Text></View><IconSymbol name="chevron.right" size={18} color={colors.muted} /></Pressable>)}</View>}
        <Pressable onPress={() => openItem()} style={({ pressed }) => [styles.downloadCard, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={styles.downloadIcon}><IconSymbol name="download" size={20} color={colors.primary} /></View><View style={{ flex: 1 }}><Text style={[styles.downloadTitle, { color: colors.foreground }]}>Download for offline</Text><Text style={[styles.downloadSub, { color: colors.muted }]}>Read without an internet connection</Text></View><IconSymbol name="chevron.right" size={18} color={colors.muted} /></Pressable>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 30 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  backButton: { height: 40, width: 40, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 16, fontWeight: '800' },
  hero: { minHeight: 198, borderRadius: 23, padding: 20, position: 'relative', overflow: 'hidden', flexDirection: 'row' },
  heroCircle: { position: 'absolute', height: 190, width: 190, borderRadius: 95, right: -55, top: -68, backgroundColor: 'rgba(255,255,255,0.12)' },
  heroEyebrow: { color: 'rgba(255,255,255,0.72)', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  heroTitle: { color: '#FFF', fontSize: 28, fontWeight: '900', marginTop: 7, letterSpacing: -0.6 },
  heroDescription: { color: 'rgba(255,255,255,0.82)', fontSize: 11, lineHeight: 16, maxWidth: 210, marginTop: 7 },
  heroMeta: { flexDirection: 'row', gap: 24, marginTop: 17 },
  metaValue: { color: '#FFF', fontSize: 16, fontWeight: '900' },
  metaLabel: { color: 'rgba(255,255,255,0.72)', fontSize: 9, marginTop: 2 },
  heroIcon: { position: 'absolute', right: 22, bottom: 19, height: 62, width: 62, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.17)', justifyContent: 'center', alignItems: 'center' },
  subjectsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, marginBottom: 10 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  subjectHint: { fontSize: 11, marginTop: 4 },
  subjectList: { gap: 8, paddingBottom: 21 },
  subjectChip: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', gap: 7 },
  subjectDot: { height: 7, width: 7, borderRadius: 4 },
  subjectText: { fontSize: 11, fontWeight: '700' },
  tabsCard: { borderWidth: 1, borderRadius: 17, marginBottom: 22 },
  tabList: { gap: 3, padding: 5 },
  tab: { borderRadius: 12, paddingHorizontal: 12, paddingVertical: 9 },
  tabText: { fontSize: 10, fontWeight: '800' },
  contentHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  seeAll: { fontSize: 11, fontWeight: '800' },
  chapterRow: { minHeight: 70, borderRadius: 17, borderWidth: 1, padding: 11, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 11 },
  chapterNumber: { height: 40, width: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  chapterNumberText: { fontSize: 12, fontWeight: '900' },
  chapterTitle: { fontSize: 13, fontWeight: '800' },
  chapterMeta: { fontSize: 10, marginTop: 4 },
  playCircle: { height: 31, width: 31, borderRadius: 16, backgroundColor: '#EAF2FF', alignItems: 'center', justifyContent: 'center' },
  downloadCard: { borderWidth: 1, borderRadius: 17, padding: 13, flexDirection: 'row', alignItems: 'center', gap: 11, marginTop: 7 },
  downloadIcon: { height: 39, width: 39, borderRadius: 13, backgroundColor: '#EAF2FF', justifyContent: 'center', alignItems: 'center' },
  downloadTitle: { fontSize: 12, fontWeight: '800' },
  downloadSub: { fontSize: 10, marginTop: 3 },
  pressed: { opacity: 0.76 },
});
