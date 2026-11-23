import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { ScreenContainer } from '@/components/screen-container';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColors } from '@/hooks/use-colors';

export default function LoginScreen() {
  const router = useRouter();
  const colors = useColors();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = () => {
    if (!email || !password) {
      Alert.alert('Almost there', 'Enter your email and password to continue.');
      return;
    }
    Alert.alert('Welcome back', 'Your progress is now ready to sync.', [{ text: 'Continue', onPress: () => router.back() }]);
  };

  return (
    <ScreenContainer containerClassName="bg-background" edges={['top', 'left', 'right', 'bottom']}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.container}>
        <View style={styles.top}><Pressable onPress={() => router.back()} style={({ pressed }) => [styles.backButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><IconSymbol name="chevron.left" size={21} color={colors.foreground} /></Pressable><View style={styles.logoMark}><Text style={styles.logoLetter}>S</Text></View><View style={{ width: 40 }} /></View>
        <View style={styles.body}><Text style={[styles.title, { color: colors.foreground }]}>Welcome back</Text><Text style={[styles.subtitle, { color: colors.muted }]}>Sign in to keep your learning journey{`\n`}in sync wherever you go.</Text><View style={styles.form}><Text style={[styles.label, { color: colors.foreground }]}>Email address</Text><TextInput value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" placeholder="you@example.com" placeholderTextColor={colors.muted} style={[styles.input, { color: colors.foreground, backgroundColor: colors.surface, borderColor: colors.border }]} /><Text style={[styles.label, { color: colors.foreground, marginTop: 15 }]}>Password</Text><TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Enter your password" placeholderTextColor={colors.muted} style={[styles.input, { color: colors.foreground, backgroundColor: colors.surface, borderColor: colors.border }]} /><Pressable onPress={() => Alert.alert('Reset password', 'We’ll send a reset link to your email.')}><Text style={[styles.forgot, { color: colors.primary }]}>Forgot password?</Text></Pressable><Pressable onPress={submit} style={({ pressed }) => [styles.submit, { backgroundColor: colors.primary }, pressed && styles.pressed]}><Text style={styles.submitText}>Sign in</Text><IconSymbol name="chevron.right" size={18} color="#FFF" /></Pressable></View><View style={styles.dividerRow}><View style={[styles.divider, { backgroundColor: colors.border }]} /><Text style={[styles.or, { color: colors.muted }]}>or continue with</Text><View style={[styles.divider, { backgroundColor: colors.border }]} /></View><Pressable onPress={() => Alert.alert('Google sign-in', 'Google sign-in will be available in the production build.')} style={({ pressed }) => [styles.googleButton, { backgroundColor: colors.surface, borderColor: colors.border }, pressed && styles.pressed]}><Text style={styles.googleG}>G</Text><Text style={[styles.googleText, { color: colors.foreground }]}>Continue with Google</Text></Pressable></View>
        <Text style={[styles.terms, { color: colors.muted }]}>By continuing, you agree to our Terms of Service and Privacy Policy.</Text>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 22 },
  top: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 15 },
  backButton: { height: 40, width: 40, borderRadius: 14, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  logoMark: { height: 43, width: 43, borderRadius: 15, backgroundColor: '#1769E0', justifyContent: 'center', alignItems: 'center' },
  logoLetter: { color: '#FFF', fontSize: 26, fontWeight: '900' },
  body: { paddingTop: 58 },
  title: { fontSize: 30, fontWeight: '900', letterSpacing: -0.8 },
  subtitle: { fontSize: 13, lineHeight: 20, marginTop: 8 },
  form: { marginTop: 34 },
  label: { fontSize: 12, fontWeight: '800', marginBottom: 8 },
  input: { height: 52, borderRadius: 14, borderWidth: 1, paddingHorizontal: 14, fontSize: 13 },
  forgot: { fontSize: 11, fontWeight: '800', alignSelf: 'flex-end', marginTop: 10 },
  submit: { height: 53, borderRadius: 16, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 7, marginTop: 24 },
  submitText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 25 },
  divider: { height: 1, flex: 1 },
  or: { fontSize: 10 },
  googleButton: { height: 52, borderRadius: 15, borderWidth: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 9 },
  googleG: { color: '#4285F4', fontSize: 18, fontWeight: '900' },
  googleText: { fontSize: 13, fontWeight: '700' },
  terms: { textAlign: 'center', fontSize: 9, lineHeight: 15, marginTop: 'auto', paddingBottom: 17 },
  pressed: { opacity: 0.76 },
});
