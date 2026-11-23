// Material icon fallback used consistently on Android, iOS, and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconSymbolName = string;
type IconMap = Record<string, ComponentProps<typeof MaterialIcons>['name']>;

const MAPPING: IconMap = {
  'house.fill': 'home',
  'books.vertical.fill': 'auto-stories',
  'checkmark.seal.fill': 'check-circle',
  'person.crop.circle.fill': 'account-circle',
  'magnifyingglass': 'search',
  'bell.fill': 'notifications-none',
  'bookmark.fill': 'bookmark',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'arrow.left': 'arrow-back',
  'play.fill': 'play-arrow',
  'book.fill': 'menu-book',
  'plus': 'add',
  'settings.fill': 'settings',
  'moon.fill': 'dark-mode',
  'sun.max.fill': 'light-mode',
  'cloud.fill': 'cloud-done',
  'download': 'download',
  'lock.fill': 'lock',
  'upload': 'cloud-upload',
  'chart.bar.fill': 'bar-chart',
  'sparkles': 'auto-awesome',
  'calculate': 'calculate',
  'translate': 'translate',
  'edit-note': 'edit-note',
  'quiz': 'quiz',
  'sticky-note-2': 'sticky-note-2',
  'play-circle': 'play-circle',
  'bookmark': 'bookmark',
  'school': 'school',
  'auto-stories': 'auto-stories',
  'workspace-premium': 'workspace-premium',
  'science': 'science',
  'close': 'close',
};

export function IconSymbol({ name, size = 24, color, style }: { name: IconSymbolName; size?: number; color: string | OpaqueColorValue; style?: StyleProp<TextStyle>; weight?: SymbolWeight }) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name] ?? 'help-outline'} style={style} />;
}
