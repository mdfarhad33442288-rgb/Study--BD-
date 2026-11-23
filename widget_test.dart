import 'package:flutter_test/flutter_test.dart';
import 'package:study_bd/main.dart';

void main() {
  testWidgets('Study BD renders the learning dashboard', (tester) async {
    await tester.pumpWidget(const StudyBdApp(firebaseReady: false));
    await tester.pumpAndSettle();
    expect(find.text('study BD'), findsOneWidget);
    expect(find.text('Pick your class'), findsOneWidget);
    expect(find.text('Home'), findsOneWidget);
  });
}
