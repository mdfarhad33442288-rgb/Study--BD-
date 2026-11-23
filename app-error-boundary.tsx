import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = { children: React.ReactNode };
type State = { error: Error | null };

export class AppErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  handleRetry = () => {
    this.setState({ error: null });
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <View style={styles.container}>
        <Text style={styles.logo}>S</Text>
        <Text style={styles.title}>study BD needs a quick restart</Text>
        <Text style={styles.message}>
          We couldn’t load this screen. Your saved learning data is safe. Tap below to retry.
        </Text>
        <Pressable onPress={this.handleRetry} style={styles.button}>
          <Text style={styles.buttonText}>Retry</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 28, backgroundColor: '#F7F9FC' },
  logo: { width: 64, height: 64, borderRadius: 20, textAlign: 'center', textAlignVertical: 'center', backgroundColor: '#1769E0', color: '#FFF', fontSize: 38, fontWeight: '800', overflow: 'hidden', marginBottom: 22 },
  title: { color: '#14213D', fontSize: 22, fontWeight: '800', textAlign: 'center' },
  message: { color: '#68758A', fontSize: 14, lineHeight: 21, textAlign: 'center', marginTop: 10, maxWidth: 320 },
  button: { marginTop: 22, paddingHorizontal: 28, paddingVertical: 13, borderRadius: 14, backgroundColor: '#1769E0' },
  buttonText: { color: '#FFF', fontSize: 14, fontWeight: '800' },
});
