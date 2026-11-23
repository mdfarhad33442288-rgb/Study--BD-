import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { classGroups, libraryItems } from '@/constants/study-data';
import { useColors } from '@/hooks/use-colors';

const filters = ['All', 'Books', 'Notes', 'Videos', 'MCQ'];

export default function LibraryScreen() {
  const router = useRouter();
  const colors = useColors();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const results = useMemo(() => {
    const base = libraryItems.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(query.toLowerCase()));
    return filter === 'All' ? base : base.filter((item) => filter === 'Videos' ? item.id === 'videos' : filter === 'Notes' ? item.id === 'notes' : filter === 'MCQ' ? item.id === 'quiz' : true);
  }, [filter, query]);

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <View>
            <View style={styles.headerRow}><View><Text style={[styles.title, { color: colors.foreground }]}>Library</Text><Text style={[styles.subtitle, { color: colors.muted }]}>Find your next lesson</Text></View><Pressable onPress={() => router.push('/search')} style={({ pressed }) => [styles.headerIcon, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="magnifyingglass" size={21} color={colors.foreground} /></Pressable></View>
            <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.border }]}><IconSymbol name="magnifyingglass" size={19} color={colors.muted} /><TextInput value={query} onChangeText={setQuery} placeholder="Search notes, books, lessons..." placeholderTextColor={colors.muted} style={[styles.searchInput, { color: colors.foreground }]} returnKeyType="search" /></View>
            <FlatList horizontal showsHorizontalScrollIndicator={false} data={filters} keyExtractor={(item) => item} contentContainerStyle={styles.filterList} renderItem={({ item }) => <Pressable onPress={() => setFilter(item)} style={[styles.filterChip, { backgroundColor: filter === item ? colors.primary : colors.surface, borderColor: filter === item ? colors.primary : colors.border }]}><Text style={[styles.filterText, { color: filter === item ? '#FFF' : colors.muted }]}>{item}</Text></Pressable>} />
            <Pressable onPress={() => router.push('/class/primary')} style={({ pressed }) => [styles.featuredCard, pressed && styles.pressed]}><View style={styles.featuredBubble} /><View style={{ flex: 1, zIndex: 1 }}><Text style={styles.featuredEyebrow}>RECOMMENDED FOR YOU</Text><Text style={styles.featuredTitle}>Mathematics{`\n`}made simple</Text><Text style={styles.featuredSub}>Continue from Chapter 03</Text></View><View style={styles.featuredVisual}><IconSymbol name="calculate" size={46} color="#FFF" /></View></Pressable>
            <View style={styles.sectionRow}><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Browse all resources</Text><Text style={[styles.countText, { color: colors.muted }]}>{results.length} categories</Text></View>
          </View>
        }
        renderItem={({ item }) => <Pressable onPress={() => item.id === 'quiz' ? router.push('/quiz') : item.id === 'favorites' ? router.push('/profile') : router.push('/reader')} style={({ pressed }) => [styles.resourceRow, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.resourceIcon, { backgroundColor: `${item.color}16` }]}><IconSymbol name={item.icon as any} size={23} color={item.color} /></View><View style={{ flex: 1 }}><Text style={[styles.resourceTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.resourceSubtitle, { color: colors.muted }]}>{item.subtitle}</Text></View><View style={styles.resourceArrow}><IconSymbol name="chevron.right" size={18} color={colors.muted} /></View></Pressable>}
        ListFooterComponent={<View style={styles.footer}><Text style={[styles.footerTitle, { color: colors.foreground }]}>Start with a class</Text>{classGroups.map((item) => <Pressable key={item.id} onPress={() => router.push({ pathname: '/class/[id]', params: { id: item.id } })} style={({ pressed }) => [styles.classRow, { borderBottomColor: colors.border }, pressed && styles.pressed]}><View style={[styles.miniClassIcon, { backgroundColor: item.lightColor }]}><IconSymbol name={item.icon as any} size={18} color={item.color} /></View><View style={{ flex: 1 }}><Text style={[styles.classRowTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.classRowSub, { color: colors.muted }]}>{item.subjects} subjects · {item.chapters} chapters</Text></View><IconSymbol name="chevron.right" size={17} color={colors.muted} /></Pressable>)}</View>}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 18, paddingBottom: 30 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  title: { fontSize: 27, fontWeight: '800', letterSpacing: -0.7 },
  subtitle: { fontSize: 13, marginTop: 4 },
  headerIcon: { height: 42, width: 42, borderRadius: 15, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  searchBox: { height: 50, borderRadius: 15, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 14, gap: 9 },
  searchInput: { flex: 1, fontSize: 13 },
  filterList: { gap: 8, paddingVertical: 15 },
  filterChip: { borderRadius: 20, borderWidth: 1, paddingHorizontal: 15, paddingVertical: 8 },
  filterText: { fontSize: 11, fontWeight: '700' },
  featuredCard: { minHeight: 132, borderRadius: 21, backgroundColor: '#1769E0', overflow: 'hidden', padding: 18, flexDirection: 'row', position: 'relative', marginBottom: 25 },
  featuredBubble: { position: 'absolute', width: 160, height: 160, borderRadius: 80, right: -45, top: -46, backgroundColor: '#3C87F4' },
  featuredEyebrow: { color: '#CDE0FF', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  featuredTitle: { color: '#FFF', fontSize: 22, fontWeight: '800', lineHeight: 25, marginTop: 7 },
  featuredSub: { color: '#D7E6FF', fontSize: 11, marginTop: 7 },
  featuredVisual: { alignItems: 'center', justifyContent: 'center', width: 74, zIndex: 1 },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 17, fontWeight: '800' },
  countText: { fontSize: 11 },
  resourceRow: { minHeight: 72, borderRadius: 17, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  resourceIcon: { height: 44, width: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  resourceTitle: { fontSize: 14, fontWeight: '800' },
  resourceSubtitle: { fontSize: 11, marginTop: 3 },
  resourceArrow: { height: 29, width: 29, borderRadius: 10, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F3F6FA' },
  footer: { marginTop: 18 },
  footerTitle: { fontSize: 17, fontWeight: '800', marginBottom: 6 },
  classRow: { paddingVertical: 13, flexDirection: 'row', alignItems: 'center', gap: 11, borderBottomWidth: 1 },
  miniClassIcon: { height: 35, width: 35, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  classRowTitle: { fontSize: 13, fontWeight: '700' },
  classRowSub: { fontSize: 10, marginTop: 3 },
  pressed: { opacity: 0.75 },
});
