import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useMemo } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { classGroups, libraryItems } from '@/constants/study-data';
import { useColors } from '@/hooks/use-colors';

function ActionIcon({ icon, color }: { icon: string; color: string }) {
  return <View style={[styles.actionIcon, { backgroundColor: `${color}18` }]}><IconSymbol name={icon as any} size={21} color={color} /></View>;
}

export default function HomeScreen() {
  const router = useRouter();
  const colors = useColors();
  const firstName = 'Ayesha';
  const greeting = useMemo(() => 'Keep your momentum going', []);

  const openClass = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({ pathname: '/class/[id]', params: { id } });
  };

  return (
    <ScreenContainer containerClassName="bg-background" edges={['top', 'left', 'right']}>
      <FlatList
        data={classGroups}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View>
            <View style={styles.topBar}>
              <View style={styles.brandRow}>
                <View style={styles.logoMark}><Text style={styles.logoLetter}>S</Text></View>
                <View>
                  <Text style={[styles.brandName, { color: colors.foreground }]}>study <Text style={{ color: colors.primary }}>BD</Text></Text>
                  <Text style={[styles.eyebrow, { color: colors.muted }]}>LEARN • PRACTICE • GROW</Text>
                </View>
              </View>
              <View style={styles.topActions}>
                <Pressable onPress={() => router.push('/search')} style={({ pressed }) => [styles.iconButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
                  <IconSymbol name="magnifyingglass" size={22} color={colors.foreground} />
                </Pressable>
                <Pressable onPress={() => router.push('/profile')} style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}>
                  <Text style={styles.avatarText}>A</Text>
                  <View style={styles.onlineDot} />
                </Pressable>
              </View>
            </View>

            <View style={styles.greetingRow}>
              <View>
                <Text style={[styles.greeting, { color: colors.foreground }]}>Hi, {firstName} <Text>👋</Text></Text>
                <Text style={[styles.greetingSub, { color: colors.muted }]}>{greeting}</Text>
              </View>
              <Pressable onPress={() => router.push('/profile')} style={({ pressed }) => [styles.notificationButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
                <IconSymbol name="bell.fill" size={21} color={colors.foreground} />
                <View style={styles.notificationDot} />
              </Pressable>
            </View>

            <Pressable onPress={() => router.push('/quiz')} style={({ pressed }) => [styles.heroCard, pressed && styles.pressed]}>
              <View style={styles.heroBlobOne} />
              <View style={styles.heroBlobTwo} />
              <View style={styles.heroCopy}>
                <View style={styles.heroPill}><IconSymbol name="sparkles" size={13} color="#D8E8FF" /><Text style={styles.heroPillText}>DAILY LEARNING</Text></View>
                <Text style={styles.heroTitle}>Small steps.{`\n`}Big progress.</Text>
                <Text style={styles.heroSubtitle}>Take today’s quiz and build your streak.</Text>
                <View style={styles.heroCta}><Text style={styles.heroCtaText}>Start quiz</Text><IconSymbol name="chevron.right" size={17} color="#1769E0" /></View>
              </View>
              <View style={styles.heroIllustration}><Text style={styles.heroIllustrationText}>✦</Text><View style={styles.heroBook}><Text style={styles.heroBookText}>A+</Text></View></View>
            </Pressable>

            <View style={[styles.statsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.stat}><Text style={[styles.statValue, { color: colors.foreground }]}>04</Text><Text style={[styles.statLabel, { color: colors.muted }]}>Day streak</Text></View>
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              <View style={styles.stat}><Text style={[styles.statValue, { color: colors.foreground }]}>12.5h</Text><Text style={[styles.statLabel, { color: colors.muted }]}>This week</Text></View>
              <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
              <View style={styles.stat}><Text style={[styles.statValue, { color: colors.foreground }]}>78%</Text><Text style={[styles.statLabel, { color: colors.muted }]}>Avg. score</Text></View>
            </View>

            <View style={styles.sectionHeader}><View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Pick your class</Text><Text style={[styles.sectionSub, { color: colors.muted }]}>A path made for your goals</Text></View><Pressable onPress={() => router.push('/library')}><Text style={[styles.seeAll, { color: colors.primary }]}>See all</Text></Pressable></View>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable onPress={() => openClass(item.id)} style={({ pressed }) => [styles.classCard, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}>
            <View style={[styles.classIcon, { backgroundColor: item.lightColor }]}><IconSymbol name={item.icon as any} size={23} color={item.color} /></View>
            <Text style={[styles.classTitle, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[styles.classSubtitle, { color: colors.muted }]}>{item.subtitle}</Text>
            <View style={styles.progressMeta}><Text style={[styles.progressLabel, { color: colors.muted }]}>Progress</Text><Text style={[styles.progressValue, { color: item.color }]}>{item.progress}%</Text></View>
            <View style={[styles.progressTrack, { backgroundColor: `${item.color}18` }]}><View style={[styles.progressBar, { width: `${item.progress}%`, backgroundColor: item.color }]} /></View>
          </Pressable>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        ListFooterComponent={
          <View>
            <View style={styles.sectionHeader}><View><Text style={[styles.sectionTitle, { color: colors.foreground }]}>Explore more</Text><Text style={[styles.sectionSub, { color: colors.muted }]}>Everything you need to learn better</Text></View></View>
            <View style={styles.exploreGrid}>{libraryItems.slice(0, 4).map((item) => <Pressable key={item.id} onPress={() => router.push(item.id === 'quiz' ? '/quiz' : '/library')} style={({ pressed }) => [styles.exploreCard, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><ActionIcon icon={item.icon} color={item.color} /><Text style={[styles.exploreTitle, { color: colors.foreground }]}>{item.title}</Text><Text style={[styles.exploreSubtitle, { color: colors.muted }]}>{item.subtitle}</Text><IconSymbol name="chevron.right" size={17} color={colors.muted} /></Pressable>)}</View>
            <Pressable onPress={() => router.push('/library')} style={({ pressed }) => [styles.offlineBanner, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><View style={styles.offlineIcon}><IconSymbol name="cloud.fill" size={20} color="#1769E0" /></View><View style={{ flex: 1 }}><Text style={[styles.offlineTitle, { color: colors.foreground }]}>Learn without internet</Text><Text style={[styles.offlineSubtitle, { color: colors.muted }]}>Download chapters to read anywhere</Text></View><IconSymbol name="chevron.right" size={18} color={colors.muted} /></Pressable>
            <Text style={[styles.adLabel, { color: colors.muted }]}>ADVERTISEMENT</Text><View style={[styles.adCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={styles.adBadge}><Text style={styles.adBadgeText}>AD</Text></View><Text style={[styles.adText, { color: colors.muted }]}>Keep learning with study BD</Text><Pressable onPress={() => router.push('/library')}><Text style={[styles.adAction, { color: colors.primary }]}>Explore</Text></Pressable></View>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: { paddingHorizontal: 18, paddingTop: 12, paddingBottom: 28 },
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  logoMark: { height: 38, width: 38, borderRadius: 14, backgroundColor: '#1769E0', alignItems: 'center', justifyContent: 'center' },
  logoLetter: { color: '#FFF', fontSize: 24, fontWeight: '800' },
  brandName: { fontSize: 18, fontWeight: '800', letterSpacing: -0.5 },
  eyebrow: { fontSize: 8, fontWeight: '800', letterSpacing: 1.1, marginTop: 1 },
  topActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  iconButton: { height: 38, width: 38, borderRadius: 13, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  avatar: { height: 38, width: 38, borderRadius: 14, backgroundColor: '#DCEAFF', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  avatarText: { color: '#1769E0', fontSize: 16, fontWeight: '800' },
  onlineDot: { position: 'absolute', right: -1, bottom: -1, height: 10, width: 10, borderRadius: 5, backgroundColor: '#17A673', borderWidth: 2, borderColor: '#F7F9FC' },
  greetingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  greeting: { fontSize: 23, fontWeight: '800', letterSpacing: -0.5 },
  greetingSub: { fontSize: 13, marginTop: 4 },
  notificationButton: { height: 42, width: 42, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  notificationDot: { position: 'absolute', right: 10, top: 9, height: 6, width: 6, borderRadius: 3, backgroundColor: '#E05A73', borderWidth: 1, borderColor: '#FFF' },
  heroCard: { minHeight: 188, borderRadius: 24, backgroundColor: '#1769E0', overflow: 'hidden', padding: 20, position: 'relative', marginBottom: 16 },
  heroBlobOne: { position: 'absolute', width: 190, height: 190, borderRadius: 95, right: -56, top: -50, backgroundColor: '#3D87F4' },
  heroBlobTwo: { position: 'absolute', width: 122, height: 122, borderRadius: 61, right: 58, bottom: -66, backgroundColor: '#1E5DC5' },
  heroCopy: { zIndex: 2 },
  heroPill: { flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 10 },
  heroPillText: { color: '#D8E8FF', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  heroTitle: { color: '#FFF', fontSize: 26, lineHeight: 30, fontWeight: '800', letterSpacing: -0.7 },
  heroSubtitle: { color: '#CFE1FF', fontSize: 12, marginTop: 7 },
  heroCta: { marginTop: 16, backgroundColor: '#FFF', borderRadius: 12, alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 4 },
  heroCtaText: { color: '#1769E0', fontSize: 12, fontWeight: '800' },
  heroIllustration: { position: 'absolute', right: 18, bottom: 22, width: 86, height: 92, zIndex: 2 },
  heroIllustrationText: { color: '#A9CCFF', fontSize: 28, position: 'absolute', right: 2, top: -10 },
  heroBook: { height: 68, width: 62, borderRadius: 7, backgroundColor: '#FFF', transform: [{ rotate: '-10deg' }], alignItems: 'center', justifyContent: 'center', shadowColor: '#0E51B4', shadowOpacity: 0.35, shadowRadius: 8, elevation: 4 },
  heroBookText: { color: '#1769E0', fontSize: 24, fontWeight: '900' },
  statsCard: { flexDirection: 'row', borderRadius: 18, borderWidth: 1, paddingVertical: 14, marginBottom: 25, justifyContent: 'space-around', alignItems: 'center' },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 17, fontWeight: '800' },
  statLabel: { fontSize: 10, marginTop: 3 },
  statDivider: { height: 27, width: 1 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  sectionTitle: { fontSize: 18, fontWeight: '800', letterSpacing: -0.3 },
  sectionSub: { fontSize: 12, marginTop: 3 },
  seeAll: { fontSize: 12, fontWeight: '800' },
  columnWrapper: { gap: 12 },
  classCard: { flex: 1, minHeight: 182, borderWidth: 1, borderRadius: 19, padding: 14, marginBottom: 12 },
  classIcon: { height: 42, width: 42, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  classTitle: { fontSize: 15, fontWeight: '800' },
  classSubtitle: { fontSize: 11, marginTop: 3, marginBottom: 15 },
  progressMeta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressLabel: { fontSize: 10 },
  progressValue: { fontSize: 10, fontWeight: '800' },
  progressTrack: { height: 5, borderRadius: 3, overflow: 'hidden', marginTop: 6 },
  progressBar: { height: 5, borderRadius: 3 },
  exploreGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  exploreCard: { width: '48.4%', minHeight: 138, borderRadius: 18, borderWidth: 1, padding: 13 },
  actionIcon: { height: 36, width: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 11 },
  exploreTitle: { fontSize: 13, fontWeight: '800' },
  exploreSubtitle: { fontSize: 10, marginTop: 4, marginBottom: 7 },
  offlineBanner: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 18, padding: 14, marginBottom: 18 },
  offlineIcon: { width: 38, height: 38, borderRadius: 13, backgroundColor: '#EAF2FF', alignItems: 'center', justifyContent: 'center' },
  offlineTitle: { fontSize: 13, fontWeight: '800' },
  offlineSubtitle: { fontSize: 11, marginTop: 3 },
  adLabel: { textAlign: 'center', fontSize: 8, fontWeight: '800', letterSpacing: 1.2, marginBottom: 6 },
  adCard: { minHeight: 52, borderRadius: 15, borderWidth: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 13, gap: 10 },
  adBadge: { height: 22, width: 26, borderRadius: 5, backgroundColor: '#EFF3F8', alignItems: 'center', justifyContent: 'center' },
  adBadgeText: { fontSize: 9, fontWeight: '800', color: '#8090A5' },
  adText: { flex: 1, fontSize: 11 },
  adAction: { fontSize: 11, fontWeight: '800' },
  pressed: { opacity: 0.78, transform: [{ scale: 0.99 }] },
});
