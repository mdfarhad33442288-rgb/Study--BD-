import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

const contentTypes = [
  { title: 'Upload notes', subtitle: 'Add study notes and summaries', icon: 'edit-note', color: '#7B61FF' },
  { title: 'Upload PDF books', subtitle: 'Publish downloadable books', icon: 'book.fill', color: '#1769E0' },
  { title: 'Create MCQ quiz', subtitle: 'Build practice question sets', icon: 'quiz', color: '#E05A73' },
  { title: 'Add video lesson', subtitle: 'Share teacher-led lessons', icon: 'play-circle', color: '#14A879' },
];

export default function AdminScreen() {
  const router = useRouter();
  const colors = useColors();
  const [selected, setSelected] = useState('');

  const create = (title: string) => {
    setSelected(title);
    Alert.alert(title, 'Content upload workspace is ready for your next file or lesson.');
  };

  return (
    <ScreenContainer containerClassName="bg-background" edges={['top', 'left', 'right']}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color={colors.foreground} /></Pressable><Text style={[styles.headerTitle, { color: colors.foreground }]}>Admin panel</Text><View style={{ width: 40 }} /></View>
        <View style={[styles.adminHero, { backgroundColor: '#102E62' }]}><View style={styles.heroBlob} /><View style={{ zIndex: 1 }}><Text style={styles.heroEyebrow}>CONTENT STUDIO</Text><Text style={styles.heroTitle}>Make learning{`\n`}better.</Text><Text style={styles.heroSub}>Publish helpful resources for every student on study BD.</Text></View><View style={styles.heroIcon}><IconSymbol name="upload" size={30} color="#FFF" /></View></View>
        <View style={styles.sectionHeader}><View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Create something new</Text><Text style={[styles.sectionSub, { color: colors.muted }]}>Choose what you want to add</Text></View></View>
        <View style={styles.grid}>{contentTypes.map((item) => <Pressable key={item.title} onPress={() => create(item.title)} style={({ pressed }) => [styles.createCard, { backgroundColor: colors.surface, borderColor: selected === item.title ? colors.primary : colors.border }, pressed && styles.pressed]}><View style={[styles.createIcon, { backgroundColor: `${item.color}16` }]}><IconSymbol name={item.icon} size={22} color={item.color} /></View><Text style={[styles.createTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.createSub, { color: colors.muted }]}>{item.subtitle}</Text><View style={styles.addRow}><Text style={[styles.addText, { color: item.color }]}>Add now</Text><IconSymbol name="chevron.right" size={16} color={item.color} /></View></Pressable>)}</View>
        <View style={styles.sectionHeader}><View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Content overview</Text><Text style={[styles.sectionSub, { color: colors.muted }]}>Your library at a glance</Text></View><Pressable onPress={() => Alert.alert('Content overview', 'All content is synced with the study BD library.')}><Text style={[styles.seeAll, { color: colors.primary }]}>View report</Text></Pressable></View>
        <View style={[styles.overviewCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={styles.overviewRow}><View style={[styles.overviewIcon, { backgroundColor: '#EAF2FF' }]}><IconSymbol name="book.fill" size={18} color="#1769E0" /></View><View style={{ flex: 1 }}><Text style={[styles.overviewTitle, { color: colors.foreground }]}>Study resources</Text><Text style={[styles.overviewSub, { color: colors.muted }]}>Ready for students</Text></View><Text style={[styles.overviewValue, { color: colors.foreground }]}>248</Text></View><View style={[styles.overviewDivider, { backgroundColor: colors.border }]} /><View style={styles.overviewRow}><View style={[styles.overviewIcon, { backgroundColor: '#E5F8F0' }]}><IconSymbol name="play-circle" size={18} color="#17A673" /></View><View style={{ flex: 1 }}><Text style={[styles.overviewTitle, { color: colors.foreground }]}>Video lessons</Text><Text style={[styles.overviewSub, { color: colors.muted }]}>Across all classes</Text></View><Text style={[styles.overviewValue, { color: colors.foreground }]}>36</Text></View><View style={[styles.overviewDivider, { backgroundColor: colors.border }]} /><View style={styles.overviewRow}><View style={[styles.overviewIcon, { backgroundColor: '#FFF0F3' }]}><IconSymbol name="quiz" size={18} color="#E05A73" /></View><View style={{ flex: 1 }}><Text style={[styles.overviewTitle, { color: colors.foreground }]}>Quiz questions</Text><Text style={[styles.overviewSub, { color: colors.muted }]}>Practice and daily quiz</Text></View><Text style={[styles.overviewValue, { color: colors.foreground }]}>1,204</Text></View></View>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { padding: 18, paddingBottom: 35 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  backButton: { height: 40, width: 40, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800' },
  adminHero: { minHeight: 168, borderRadius: 23, overflow: 'hidden', padding: 20, position: 'relative' },
  heroBlob: { position: 'absolute', width: 175, height: 175, borderRadius: 88, right: -43, top: -51, backgroundColor: '#1F4D99' },
  heroEyebrow: { color: '#9EC3FF', fontSize: 9, fontWeight: '900', letterSpacing: 1.1 },
  heroTitle: { color: '#FFF', fontSize: 27, fontWeight: '900', lineHeight: 31, marginTop: 7 },
  heroSub: { color: '#BED5F8', fontSize: 11, lineHeight: 16, marginTop: 8, maxWidth: 215 },
  heroIcon: { position: 'absolute', right: 24, bottom: 22, height: 55, width: 55, borderRadius: 18, backgroundColor: '#2A65BA', alignItems: 'center', justifyContent: 'center' },
  sectionHeader: { marginTop: 25, marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  sectionSub: { fontSize: 11, marginTop: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  createCard: { width: '48.4%', minHeight: 174, borderRadius: 18, borderWidth: 1, padding: 13 },
  createIcon: { height: 38, width: 38, borderRadius: 13, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  createTitle: { fontSize: 13, fontWeight: '800' },
  createSub: { fontSize: 10, lineHeight: 14, marginTop: 5 },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 'auto' },
  addText: { fontSize: 10, fontWeight: '800' },
  seeAll: { fontSize: 11, fontWeight: '800' },
  overviewCard: { borderRadius: 18, borderWidth: 1, paddingHorizontal: 14 },
  overviewRow: { minHeight: 69, flexDirection: 'row', alignItems: 'center', gap: 11 },
  overviewIcon: { height: 37, width: 37, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  overviewTitle: { fontSize: 12, fontWeight: '800' },
  overviewSub: { fontSize: 10, marginTop: 3 },
  overviewValue: { fontSize: 17, fontWeight: '900' },
  overviewDivider: { height: 1 },
  pressed: { opacity: 0.76 },
});
