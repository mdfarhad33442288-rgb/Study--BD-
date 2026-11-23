import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Switch, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';
import { useThemeContext } from '@/lib/theme-provider';

export default function ProfileScreen() {
  const router = useRouter();
  const colors = useColors();
  const { colorScheme, setColorScheme } = useThemeContext();
  const [notifications, setNotifications] = useState(true);
  const [offline, setOffline] = useState(true);

  const SettingRow = ({ icon, title, subtitle, value, onValueChange, onPress }: { icon: string; title: string; subtitle?: string; value?: boolean; onValueChange?: (value: boolean) => void; onPress?: () => void }) => <Pressable onPress={onPress} style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}><View style={styles.settingIcon}><IconSymbol name={icon} size={19} color={colors.primary} /></View><View style={styles.settingCopy}><Text style={[styles.settingTitle, { color: colors.foreground }]}>{title}</Text>{subtitle ? <Text style={[styles.settingSub, { color: colors.muted }]}>{subtitle}</Text> : null}</View>{onValueChange ? <Switch value={value} onValueChange={onValueChange} trackColor={{ false: colors.border, true: '#A8C7FA' }} thumbColor={value ? colors.primary : '#FFF'} /> : <IconSymbol name="chevron.right" size={18} color={colors.muted} />}</Pressable>;

  return (
    <ScreenContainer className="px-5" containerClassName="bg-background">
      <View style={styles.content}>
        <View style={styles.header}><Text style={[styles.title, { color: colors.foreground }]}>Profile</Text><Pressable onPress={() => router.push('/login')} style={({ pressed }) => [styles.headerAction, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="settings.fill" size={20} color={colors.foreground} /></Pressable></View>
        <View style={[styles.profileCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><View style={styles.profileAvatar}><Text style={styles.profileAvatarText}>A</Text><View style={styles.profileBadge}><IconSymbol name="checkmark.seal.fill" size={12} color="#FFF" /></View></View><View style={{ flex: 1 }}><Text style={[styles.profileName, { color: colors.foreground }]}>Ayesha Rahman</Text><Text style={[styles.profileEmail, { color: colors.muted }]}>ayesha@example.com</Text><View style={styles.levelRow}><View style={styles.levelPill}><Text style={styles.levelPillText}>LEVEL 04</Text></View><Text style={[styles.levelXp, { color: colors.muted }]}>1,240 XP</Text></View></View><Pressable onPress={() => Alert.alert('Profile', 'Profile editing will be available once your account is connected.')}><IconSymbol name="chevron.right" size={19} color={colors.muted} /></Pressable></View>
        <View style={[styles.progressCard, { backgroundColor: '#EAF2FF' }]}><View style={styles.progressTop}><View><Text style={[styles.progressTitle, { color: colors.foreground }]}>Your learning journey</Text><Text style={[styles.progressSub, { color: colors.muted }]}>Keep going, you’re doing great.</Text></View><Text style={[styles.progressPercent, { color: colors.primary }]}>42%</Text></View><View style={styles.progressTrack}><View style={styles.progressBar} /></View><View style={styles.progressFoot}><Text style={[styles.progressFootText, { color: colors.muted }]}>18 of 42 chapters complete</Text><IconSymbol name="chart.bar.fill" size={16} color={colors.primary} /></View></View>
        <Text style={[styles.sectionLabel, { color: colors.muted }]}>PREFERENCES</Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><SettingRow icon="bell.fill" title="Notifications" subtitle="Daily quiz and learning reminders" value={notifications} onValueChange={setNotifications} /><View style={[styles.rowDivider, { backgroundColor: colors.border }]} /><SettingRow icon="cloud.fill" title="Offline reading" subtitle="Save chapters for later" value={offline} onValueChange={setOffline} /><View style={[styles.rowDivider, { backgroundColor: colors.border }]} /><SettingRow icon={colorScheme === 'dark' ? 'sun.max.fill' : 'moon.fill'} title={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'} subtitle="Adjust the look of the app" value={colorScheme === 'dark'} onValueChange={(value) => setColorScheme(value ? 'dark' : 'light')} /></View>
        <Text style={[styles.sectionLabel, { color: colors.muted }]}>MORE</Text>
        <View style={[styles.settingsCard, { backgroundColor: colors.surface, borderColor: colors.border }]}><SettingRow icon="bookmark.fill" title="My bookmarks" subtitle="12 saved resources" onPress={() => router.push('/reader')} /><View style={[styles.rowDivider, { backgroundColor: colors.border }]} /><SettingRow icon="lock.fill" title="Privacy & security" onPress={() => Alert.alert('Privacy', 'Your learning data stays private and secure.')} /><View style={[styles.rowDivider, { backgroundColor: colors.border }]} /><SettingRow icon="upload" title="Admin panel" subtitle="Manage study content" onPress={() => router.push('/admin')} /></View>
        <Pressable onPress={() => router.push('/login')} style={({ pressed }) => [styles.logoutButton, pressed && styles.pressed]}><Text style={styles.logoutText}>Sign in to sync your progress</Text></Pressable>
        <Text style={[styles.version, { color: colors.muted }]}>study BD · v1.0.0</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { paddingTop: 17, paddingBottom: 30 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 27, fontWeight: '800', letterSpacing: -0.7 },
  headerAction: { height: 42, width: 42, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  profileCard: { borderRadius: 20, borderWidth: 1, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 13 },
  profileAvatar: { height: 58, width: 58, borderRadius: 19, backgroundColor: '#DCEAFF', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  profileAvatarText: { color: '#1769E0', fontSize: 26, fontWeight: '900' },
  profileBadge: { position: 'absolute', right: -4, bottom: -3, height: 20, width: 20, borderRadius: 10, backgroundColor: '#17A673', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFF' },
  profileName: { fontSize: 16, fontWeight: '800' },
  profileEmail: { fontSize: 11, marginTop: 3 },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  levelPill: { backgroundColor: '#EAF2FF', borderRadius: 6, paddingHorizontal: 7, paddingVertical: 4 },
  levelPillText: { fontSize: 8, fontWeight: '900', color: '#1769E0', letterSpacing: 0.5 },
  levelXp: { fontSize: 10 },
  progressCard: { borderRadius: 19, padding: 16, marginTop: 13, marginBottom: 24 },
  progressTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  progressTitle: { fontSize: 14, fontWeight: '800' },
  progressSub: { fontSize: 11, marginTop: 4 },
  progressPercent: { fontSize: 22, fontWeight: '900' },
  progressTrack: { height: 7, backgroundColor: '#D2E1F8', borderRadius: 4, marginTop: 15, overflow: 'hidden' },
  progressBar: { height: 7, width: '42%', backgroundColor: '#1769E0', borderRadius: 4 },
  progressFoot: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 },
  progressFootText: { fontSize: 10 },
  sectionLabel: { fontSize: 10, fontWeight: '800', letterSpacing: 1.1, marginBottom: 9 },
  settingsCard: { borderRadius: 19, borderWidth: 1, paddingHorizontal: 15, marginBottom: 22 },
  settingRow: { minHeight: 65, flexDirection: 'row', alignItems: 'center', gap: 12 },
  settingIcon: { height: 35, width: 35, borderRadius: 12, backgroundColor: '#EAF2FF', justifyContent: 'center', alignItems: 'center' },
  settingCopy: { flex: 1 },
  settingTitle: { fontSize: 13, fontWeight: '700' },
  settingSub: { fontSize: 10, marginTop: 3 },
  rowDivider: { height: 1 },
  logoutButton: { height: 50, borderRadius: 15, borderWidth: 1, borderColor: '#C7D9F5', alignItems: 'center', justifyContent: 'center', marginTop: 2 },
  logoutText: { color: '#1769E0', fontSize: 13, fontWeight: '800' },
  version: { textAlign: 'center', fontSize: 10, marginTop: 18 },
  pressed: { opacity: 0.76 },
});
