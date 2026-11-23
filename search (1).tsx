import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { classGroups, libraryItems } from '@/constants/study-data';
import { useColors } from '@/hooks/use-colors';

export default function SearchScreen() {
  const router = useRouter();
  const colors = useColors();
  const [query, setQuery] = useState('');
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...classGroups.map((item) => ({ id: item.id, title: item.title, subtitle: item.subtitle, icon: item.icon, color: item.color, kind: 'Class' })), ...libraryItems.map((item) => ({ ...item, kind: 'Collection' }))];
    return [...classGroups.map((item) => ({ id: item.id, title: item.title, subtitle: item.subtitle, icon: item.icon, color: item.color, kind: 'Class' })), ...libraryItems.map((item) => ({ ...item, kind: 'Collection' }))].filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(q));
  }, [query]);

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <View style={styles.header}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color={colors.foreground} /></Pressable><Text style={[styles.headerTitle, { color: colors.foreground }]}>Search</Text><View style={{ width: 40 }} /></View>
      <View style={[styles.searchBox, { backgroundColor: colors.surface, borderColor: colors.primary }]}><IconSymbol name="magnifyingglass" size={20} color={colors.primary} /><TextInput autoFocus value={query} onChangeText={setQuery} placeholder="Search anything..." placeholderTextColor={colors.muted} style={[styles.input, { color: colors.foreground }]} returnKeyType="search" /></View>
      <View style={styles.resultMeta}><Text style={[styles.resultTitle, { color: colors.foreground }]}>{query ? 'Search results' : 'Suggested for you'}</Text><Text style={[styles.resultCount, { color: colors.muted }]}>{searchResults.length} items</Text></View>
      <FlatList data={searchResults} keyExtractor={(item) => `${item.kind}-${item.id}`} showsVerticalScrollIndicator={false} contentContainerStyle={styles.list} renderItem={({ item }) => <Pressable onPress={() => item.kind === 'Class' ? router.push({ pathname: '/class/[id]', params: { id: item.id } }) : item.id === 'quiz' ? router.push('/quiz') : router.push('/reader')} style={({ pressed }) => [styles.row, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={[styles.icon, { backgroundColor: `${item.color}16` }]}><IconSymbol name={item.icon} size={21} color={item.color} /></View><View style={{ flex: 1 }}><View style={styles.rowTitle}><Text style={[styles.itemTitle, { color: colors.foreground }]}>{item.title}</Text><View style={styles.kindPill}><Text style={[styles.kindText, { color: colors.primary }]}>{item.kind}</Text></View></View><Text style={[styles.itemSub, { color: colors.muted }]}>{item.subtitle}</Text></View><IconSymbol name="chevron.right" size={18} color={colors.muted} /></Pressable>} ListEmptyComponent={<View style={styles.empty}><IconSymbol name="magnifyingglass" size={32} color={colors.muted} /><Text style={[styles.emptyTitle, { color: colors.foreground }]}>No results found</Text><Text style={[styles.emptySub, { color: colors.muted }]}>Try a different keyword like “Math” or “Quiz”.</Text></View>} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginBottom: 20 },
  backButton: { height: 40, width: 40, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800' },
  searchBox: { height: 53, borderRadius: 16, borderWidth: 1.5, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10 },
  input: { flex: 1, fontSize: 14 },
  resultMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 28, marginBottom: 11 },
  resultTitle: { fontSize: 17, fontWeight: '800' },
  resultCount: { fontSize: 11 },
  list: { paddingBottom: 25 },
  row: { minHeight: 70, borderRadius: 17, borderWidth: 1, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
  icon: { height: 43, width: 43, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowTitle: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  itemTitle: { fontSize: 13, fontWeight: '800' },
  kindPill: { backgroundColor: '#EAF2FF', paddingHorizontal: 6, paddingVertical: 3, borderRadius: 5 },
  kindText: { fontSize: 8, fontWeight: '800' },
  itemSub: { fontSize: 10, marginTop: 4 },
  empty: { alignItems: 'center', paddingTop: 100 },
  emptyTitle: { fontSize: 16, fontWeight: '800', marginTop: 14 },
  emptySub: { fontSize: 11, marginTop: 6 },
  pressed: { opacity: 0.75 },
});
