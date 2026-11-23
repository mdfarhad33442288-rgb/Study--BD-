import 'dart:async';
import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  var firebaseReady = false;
  try {
    await Firebase.initializeApp();
    firebaseReady = true;
  } catch (_) {}
  runApp(StudyBdApp(firebaseReady: firebaseReady));
}

class StudyBdApp extends StatefulWidget {
  const StudyBdApp({super.key, required this.firebaseReady});
  final bool firebaseReady;
  @override
  State<StudyBdApp> createState() => _StudyBdAppState();
}

class _StudyBdAppState extends State<StudyBdApp> {
  bool dark = false;
  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final p = await SharedPreferences.getInstance();
    if (mounted) setState(() => dark = p.getBool('dark') ?? false);
  }

  Future<void> setDark(bool v) async {
    final p = await SharedPreferences.getInstance();
    await p.setBool('dark', v);
    if (mounted) setState(() => dark = v);
  }

  @override
  Widget build(BuildContext context) => MaterialApp(
    debugShowCheckedModeBanner: false,
    title: 'Study BD',
    themeMode: dark ? ThemeMode.dark : ThemeMode.light,
    theme: _theme(Brightness.light),
    darkTheme: _theme(Brightness.dark),
    home: Shell(
      firebaseReady: widget.firebaseReady,
      dark: dark,
      onDark: setDark,
    ),
  );
  ThemeData _theme(Brightness b) => ThemeData(
    useMaterial3: true,
    brightness: b,
    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color(0xFF1769E0),
      brightness: b,
    ),
    scaffoldBackgroundColor: b == Brightness.light
        ? const Color(0xFFF7F9FC)
        : null,
    inputDecorationTheme: InputDecorationTheme(
      filled: true,
      border: OutlineInputBorder(
        borderRadius: BorderRadius.circular(16),
        borderSide: BorderSide.none,
      ),
    ),
    cardTheme: const CardThemeData(margin: EdgeInsets.zero, elevation: 0),
  );
}

class Shell extends StatefulWidget {
  const Shell({
    super.key,
    required this.firebaseReady,
    required this.dark,
    required this.onDark,
  });
  final bool firebaseReady, dark;
  final ValueChanged<bool> onDark;
  @override
  State<Shell> createState() => _ShellState();
}

class _ShellState extends State<Shell> {
  int tab = 0;
  final pages = const [
    HomePage(),
    LibraryPage(),
    ExamPage(),
    CoursesPage(),
    ProfilePage(),
  ];
  @override
  Widget build(BuildContext context) => Scaffold(
    appBar: AppBar(
      titleSpacing: 20,
      title: Row(
        children: [
          Container(
            width: 36,
            height: 36,
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
              borderRadius: BorderRadius.circular(11),
            ),
            child: const Icon(Icons.school_rounded, color: Colors.white),
          ),
          const SizedBox(width: 10),
          const Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'study BD',
                style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
              ),
              Text(
                'LEARN • PRACTICE • GROW',
                style: TextStyle(fontSize: 9, letterSpacing: 1.2),
              ),
            ],
          ),
        ],
      ),
      actions: [
        IconButton(
          onPressed: () => showSearch(context: context, delegate: Searcher()),
          icon: const Icon(Icons.search_rounded),
        ),
        IconButton(
          onPressed: () => _notice(context),
          icon: const Icon(Icons.notifications_none_rounded),
        ),
        const SizedBox(width: 8),
      ],
    ),
    body: IndexedStack(index: tab, children: pages),
    bottomNavigationBar: NavigationBar(
      selectedIndex: tab,
      onDestinationSelected: (v) => setState(() => tab = v),
      destinations: const [
        NavigationDestination(
          icon: Icon(Icons.home_outlined),
          selectedIcon: Icon(Icons.home),
          label: 'Home',
        ),
        NavigationDestination(
          icon: Icon(Icons.menu_book_outlined),
          selectedIcon: Icon(Icons.menu_book),
          label: 'Library',
        ),
        NavigationDestination(
          icon: Icon(Icons.timer_outlined),
          selectedIcon: Icon(Icons.timer),
          label: 'Exam',
        ),
        NavigationDestination(
          icon: Icon(Icons.play_lesson_outlined),
          selectedIcon: Icon(Icons.play_lesson),
          label: 'Courses',
        ),
        NavigationDestination(
          icon: Icon(Icons.person_outline),
          selectedIcon: Icon(Icons.person),
          label: 'Profile',
        ),
      ],
    ),
  );
  void _notice(BuildContext c) {
    showModalBottomSheet<void>(
      context: c,
      showDragHandle: true,
      builder: (_) => const SafeArea(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Recent updates',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.w800),
              ),
              SizedBox(height: 16),
              ListTile(
                leading: CircleAvatar(child: Icon(Icons.new_releases_outlined)),
                title: Text('New Class 10 model test'),
                subtitle: Text('Bangla 1st paper is ready'),
              ),
              ListTile(
                leading: CircleAvatar(child: Icon(Icons.emoji_events_outlined)),
                title: Text('Leaderboard updated'),
                subtitle: Text('You are 12 points from the top 10'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});
  @override
  Widget build(BuildContext context) {
    final classes = ['1–5', '6–8', '9–10', '11–12'];
    final subtitles = [
      'Primary school',
      'Junior secondary',
      'SSC preparation',
      'HSC preparation',
    ];
    final colors = [Colors.blue, Colors.deepPurple, Colors.teal, Colors.pink];
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
      children: [
        Text(
          'Hi, Ayesha 👋',
          style: Theme.of(
            context,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
        ),
        const Text(
          'Keep your momentum going',
          style: TextStyle(color: Colors.grey),
        ),
        const SizedBox(height: 20),
        Card(
          color: Theme.of(context).colorScheme.primary,
          child: InkWell(
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(builder: (_) => const QuizPage()),
            ),
            borderRadius: BorderRadius.circular(16),
            child: Padding(
              padding: const EdgeInsets.all(22),
              child: Row(
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: const [
                        Text(
                          'DAILY LEARNING',
                          style: TextStyle(
                            color: Colors.white70,
                            fontSize: 11,
                            letterSpacing: 1.2,
                            fontWeight: FontWeight.w700,
                          ),
                        ),
                        SizedBox(height: 12),
                        Text(
                          'Small steps.\nBig progress.',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 27,
                            height: 1.05,
                            fontWeight: FontWeight.w800,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          'Take today’s quiz and build your streak.',
                          style: TextStyle(color: Colors.white70),
                        ),
                        SizedBox(height: 16),
                        FilledButton.tonal(
                          onPressed: null,
                          child: Text('Start quiz'),
                        ),
                      ],
                    ),
                  ),
                  const Icon(
                    Icons.auto_awesome_rounded,
                    color: Colors.white54,
                    size: 74,
                  ),
                ],
              ),
            ),
          ),
        ),
        const SizedBox(height: 20),
        const Row(
          children: [
            _Metric(
              '04',
              'Day streak',
              Icons.local_fire_department,
              Colors.orange,
            ),
            SizedBox(width: 10),
            _Metric('12.5h', 'This week', Icons.schedule, Colors.indigo),
            SizedBox(width: 10),
            _Metric('78%', 'Avg. score', Icons.insights, Colors.green),
          ],
        ),
        const SizedBox(height: 28),
        _Header(
          'Pick your class',
          'See all',
          () => Navigator.push(
            context,
            MaterialPageRoute(builder: (_) => const AcademicPage()),
          ),
        ),
        const SizedBox(height: 12),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.65,
          children: List.generate(
            4,
            (i) => _ClassTile(
              'Class ${classes[i]}',
              subtitles[i],
              colors[i],
              () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => AcademicPage(initialClass: i + 1),
                ),
              ),
            ),
          ),
        ),
        const SizedBox(height: 28),
        _Header('Explore more', '', () {}),
        const SizedBox(height: 12),
        Wrap(
          spacing: 10,
          runSpacing: 10,
          children: [
            _Chip(
              Icons.translate,
              'English speaking',
              Colors.indigo,
              () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const TopicPage(
                    title: 'English speaking',
                    topics: englishTopics,
                  ),
                ),
              ),
            ),
            _Chip(
              Icons.language,
              'IELTS prep',
              Colors.orange,
              () => Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) => const TopicPage(
                    title: 'IELTS preparation',
                    topics: ieltsTopics,
                  ),
                ),
              ),
            ),
            _Chip(
              Icons.admin_panel_settings,
              'Admin hub',
              Colors.teal,
              () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const AdminPage()),
              ),
            ),
          ],
        ),
        const SizedBox(height: 28),
        _Header('Recent updates', 'View all', () {}),
        const SizedBox(height: 8),
        const _Update(
          Icons.picture_as_pdf,
          'SSC 2026 suggestion set',
          'Class 10 • Updated today',
          Colors.red,
        ),
        const _Update(
          Icons.video_library,
          'Physics motion chapter',
          'Class 9–10 • Video lesson',
          Colors.purple,
        ),
      ],
    );
  }
}

class LibraryPage extends StatelessWidget {
  const LibraryPage({super.key});
  @override
  Widget build(BuildContext c) => ListView(
    padding: const EdgeInsets.all(20),
    children: [
      Text(
        'Your library',
        style: Theme.of(
          c,
        ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
      ),
      const Text(
        'Saved books, notes and lessons in one place.',
        style: TextStyle(color: Colors.grey),
      ),
      const SizedBox(height: 20),
      const TextField(
        decoration: InputDecoration(
          prefixIcon: Icon(Icons.search),
          hintText: 'Search library',
        ),
      ),
      const SizedBox(height: 18),
      ...[
        'Saved textbooks',
        'Bookmarked notes',
        'Offline reading',
        'Downloaded videos',
      ].map(
        (x) => Card(
          margin: const EdgeInsets.only(bottom: 10),
          child: ListTile(
            leading: const CircleAvatar(child: Icon(Icons.bookmark)),
            title: Text(x, style: const TextStyle(fontWeight: FontWeight.w700)),
            subtitle: const Text('Explore and save your resources'),
            trailing: const Icon(Icons.chevron_right),
          ),
        ),
      ),
    ],
  );
}

class ExamPage extends StatelessWidget {
  const ExamPage({super.key});
  @override
  Widget build(BuildContext c) => ListView(
    padding: const EdgeInsets.all(20),
    children: [
      Text(
        'Online exam',
        style: Theme.of(
          c,
        ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
      ),
      const Text(
        'Test yourself and climb the leaderboard.',
        style: TextStyle(color: Colors.grey),
      ),
      const SizedBox(height: 22),
      Card(
        color: Theme.of(c).colorScheme.primary,
        child: Padding(
          padding: const EdgeInsets.all(22),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Icon(Icons.emoji_events, color: Colors.white, size: 34),
              const SizedBox(height: 12),
              const Text(
                'Daily challenge',
                style: TextStyle(
                  color: Colors.white,
                  fontSize: 22,
                  fontWeight: FontWeight.w800,
                ),
              ),
              const Text(
                '10 questions • 10 minutes • Instant result',
                style: TextStyle(color: Colors.white70),
              ),
              const SizedBox(height: 16),
              FilledButton.tonal(
                onPressed: () => Navigator.push(
                  c,
                  MaterialPageRoute(builder: (_) => const QuizPage()),
                ),
                child: const Text('Start exam'),
              ),
            ],
          ),
        ),
      ),
      const SizedBox(height: 22),
      ...['Score history', 'Leaderboard', 'Certificates'].map(
        (x) => Card(
          margin: const EdgeInsets.only(bottom: 10),
          child: ListTile(
            leading: const Icon(Icons.insights),
            title: Text(x, style: const TextStyle(fontWeight: FontWeight.w700)),
            subtitle: const Text('View your progress and achievements'),
            trailing: const Icon(Icons.chevron_right),
          ),
        ),
      ),
    ],
  );
}

class CoursesPage extends StatelessWidget {
  const CoursesPage({super.key});
  @override
  Widget build(BuildContext c) => ListView(
    padding: const EdgeInsets.all(20),
    children: [
      Text(
        'Popular courses',
        style: Theme.of(
          c,
        ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
      ),
      const Text(
        'Structured lessons for every learner.',
        style: TextStyle(color: Colors.grey),
      ),
      const SizedBox(height: 18),
      ...[
        'Complete English Grammar',
        'SSC Math Mastery',
        'IELTS Band 7 Blueprint',
        'HSC Physics in Practice',
      ].map(
        (x) => Card(
          margin: const EdgeInsets.only(bottom: 12),
          child: ListTile(
            contentPadding: const EdgeInsets.all(14),
            leading: CircleAvatar(radius: 30, child: Icon(Icons.play_lesson)),
            title: Text(x, style: const TextStyle(fontWeight: FontWeight.w800)),
            subtitle: const Text('Video • PDF • Quiz • Certificate'),
            trailing: const Icon(Icons.chevron_right),
          ),
        ),
      ),
    ],
  );
}

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});
  @override
  Widget build(BuildContext c) {
    final state = c.findAncestorStateOfType<_StudyBdAppState>();
    return ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(20),
            child: Row(
              children: [
                const CircleAvatar(
                  radius: 30,
                  child: Icon(Icons.person, size: 30),
                ),
                const SizedBox(width: 16),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Ayesha Rahman',
                        style: TextStyle(
                          fontSize: 19,
                          fontWeight: FontWeight.w800,
                        ),
                      ),
                      Text(
                        'Class 10 learner',
                        style: TextStyle(color: Colors.grey),
                      ),
                    ],
                  ),
                ),
                OutlinedButton(onPressed: () {}, child: const Text('Edit')),
              ],
            ),
          ),
        ),
        const SizedBox(height: 20),
        const Text(
          'Settings',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
        ),
        SwitchListTile(
          contentPadding: EdgeInsets.zero,
          value: state?.dark ?? false,
          onChanged: state?.setDark,
          title: const Text('Dark mode'),
          secondary: const Icon(Icons.dark_mode_outlined),
        ),
        const ListTile(
          contentPadding: EdgeInsets.zero,
          leading: Icon(Icons.notifications_none),
          title: Text('Notifications'),
          trailing: Icon(Icons.chevron_right),
        ),
        const ListTile(
          contentPadding: EdgeInsets.zero,
          leading: Icon(Icons.download_outlined),
          title: Text('Downloads & offline'),
          trailing: Icon(Icons.chevron_right),
        ),
        const SizedBox(height: 18),
        FilledButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.login),
          label: const Text('Login / Create account'),
        ),
      ],
    );
  }
}

class AcademicPage extends StatelessWidget {
  const AcademicPage({super.key, this.initialClass = 1});
  final int initialClass;
  @override
  Widget build(BuildContext c) => Scaffold(
    appBar: AppBar(title: const Text('Academic section')),
    body: ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: List.generate(
            12,
            (i) => ChoiceChip(
              label: Text('Class ${i + 1}'),
              selected: initialClass == i + 1,
              onSelected: (_) {},
            ),
          ),
        ),
        const SizedBox(height: 24),
        Text(
          'Class $initialClass resources',
          style: Theme.of(
            c,
          ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
        ),
        const SizedBox(height: 12),
        ...[
          'Textbooks (PDF)',
          'Guide books',
          'Test papers',
          'Notes & suggestions',
          'MCQ practice',
          'CQ questions',
          'Model tests',
          'Previous year questions',
          'Solutions',
          'Images & diagrams',
          'Video lessons',
        ].map(
          (x) => Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: Icon(
                _resourceIcon(x),
                color: Theme.of(c).colorScheme.primary,
              ),
              title: Text(
                x,
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
              subtitle: const Text('Curriculum-aligned resources'),
              trailing: const Icon(Icons.chevron_right),
            ),
          ),
        ),
      ],
    ),
  );
}

class TopicPage extends StatelessWidget {
  const TopicPage({super.key, required this.title, required this.topics});
  final String title;
  final List<String> topics;
  @override
  Widget build(BuildContext c) => Scaffold(
    appBar: AppBar(title: Text(title)),
    body: ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Card(
          color: Theme.of(c).colorScheme.primary,
          child: Padding(
            padding: const EdgeInsets.all(22),
            child: Row(
              children: [
                const Icon(Icons.auto_stories, color: Colors.white, size: 40),
                const SizedBox(width: 16),
                Expanded(
                  child: Text(
                    'Build a practical learning habit with guided lessons.',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 18),
        ...topics.map(
          (x) => Card(
            margin: const EdgeInsets.only(bottom: 8),
            child: ListTile(
              leading: const CircleAvatar(
                child: Icon(Icons.play_arrow, size: 18),
              ),
              title: Text(
                x,
                style: const TextStyle(fontWeight: FontWeight.w700),
              ),
              subtitle: const Text('Start learning'),
              trailing: const Icon(Icons.chevron_right),
            ),
          ),
        ),
      ],
    ),
  );
}

class AdminPage extends StatelessWidget {
  const AdminPage({super.key});
  @override
  Widget build(BuildContext c) => Scaffold(
    appBar: AppBar(title: const Text('Admin hub')),
    body: ListView(
      padding: const EdgeInsets.all(20),
      children: [
        Card(
          color: Theme.of(c).colorScheme.primaryContainer,
          child: const Padding(
            padding: EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Icon(Icons.admin_panel_settings, size: 36),
                SizedBox(height: 10),
                Text(
                  'Content management',
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.w800),
                ),
                Text(
                  'Manage Firestore content and Firebase Storage files without an app update.',
                ),
              ],
            ),
          ),
        ),
        const SizedBox(height: 18),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 2,
          mainAxisSpacing: 12,
          crossAxisSpacing: 12,
          childAspectRatio: 1.15,
          children: const [
            _Admin(Icons.picture_as_pdf, 'Upload PDF'),
            _Admin(Icons.image, 'Upload images'),
            _Admin(Icons.video_library, 'Upload videos'),
            _Admin(Icons.library_books, 'Manage books'),
            _Admin(Icons.quiz, 'Create exams'),
            _Admin(Icons.notifications_active, 'Send notifications'),
          ],
        ),
        const SizedBox(height: 18),
        FilledButton.icon(
          onPressed: () {},
          icon: const Icon(Icons.people_alt_outlined),
          label: const Text('Manage users'),
        ),
      ],
    ),
  );
}

class _Admin extends StatelessWidget {
  const _Admin(this.icon, this.label);
  final IconData icon;
  final String label;
  @override
  Widget build(BuildContext c) => Card(
    child: InkWell(
      onTap: () {},
      borderRadius: BorderRadius.circular(16),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, color: Theme.of(c).colorScheme.primary, size: 30),
          const SizedBox(height: 10),
          Text(
            label,
            textAlign: TextAlign.center,
            style: const TextStyle(fontWeight: FontWeight.w700),
          ),
        ],
      ),
    ),
  );
}

const englishTopics = [
  'Daily speaking',
  'Vocabulary',
  'Pronunciation',
  'Conversation practice',
  'Grammar',
  'Listening practice',
  'Speaking test',
  'Voice practice',
];
const ieltsTopics = [
  'Reading',
  'Writing',
  'Listening',
  'Speaking',
  'Grammar',
  'Vocabulary',
  'Mock test',
  'Band score tips',
  'PDF resources',
  'Video lessons',
];

class QuizPage extends StatefulWidget {
  const QuizPage({super.key});
  @override
  State<QuizPage> createState() => _QuizState();
}

class _QuizState extends State<QuizPage> {
  int q = 0;
  int? selected;
  int seconds = 600;
  Timer? timer;
  final data = const [
    ('Which planet is the Red Planet?', ['Earth', 'Mars', 'Jupiter', 'Venus']),
    ('What is 12 × 8?', ['86', '96', '108', '88']),
    (
      'Choose the correct spelling.',
      ['Enviroment', 'Environment', 'Envirnment', 'Envaironment'],
    ),
  ];
  @override
  void initState() {
    super.initState();
    timer = Timer.periodic(const Duration(seconds: 1), (_) {
      if (mounted && seconds > 0) setState(() => seconds--);
    });
  }

  @override
  void dispose() {
    timer?.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext c) {
    final item = data[q];
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Daily quiz • ${seconds ~/ 60}:${(seconds % 60).toString().padLeft(2, '0')}',
        ),
      ),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          LinearProgressIndicator(value: (q + 1) / data.length),
          const SizedBox(height: 26),
          Text(
            'Question ${q + 1} of ${data.length}',
            style: TextStyle(
              color: Theme.of(c).colorScheme.primary,
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: 12),
          Text(
            item.$1,
            style: Theme.of(
              c,
            ).textTheme.headlineSmall?.copyWith(fontWeight: FontWeight.w800),
          ),
          const SizedBox(height: 18),
          ...List.generate(
            item.$2.length,
            (i) => Card(
              color: selected == i
                  ? Theme.of(c).colorScheme.primaryContainer
                  : null,
              child: RadioListTile<int>(
                value: i,
                groupValue: selected,
                onChanged: (v) => setState(() => selected = v),
                title: Text(item.$2[i]),
              ),
            ),
          ),
          const SizedBox(height: 20),
          FilledButton(
            onPressed: selected == null
                ? null
                : () {
                    if (q < data.length - 1) {
                      setState(() {
                        q++;
                        selected = null;
                      });
                    } else {
                      Navigator.pop(c);
                    }
                  },
            child: Text(q == data.length - 1 ? 'Finish quiz' : 'Next question'),
          ),
        ],
      ),
    );
  }
}

class Searcher extends SearchDelegate<String> {
  @override
  List<Widget>? buildActions(BuildContext c) => [
    IconButton(onPressed: () => query = '', icon: const Icon(Icons.clear)),
  ];
  @override
  Widget? buildLeading(BuildContext c) => IconButton(
    onPressed: () => close(c, ''),
    icon: const Icon(Icons.arrow_back),
  );
  @override
  Widget buildResults(BuildContext c) => Results(query);
  @override
  Widget buildSuggestions(BuildContext c) => Results(query);
}

class Results extends StatelessWidget {
  const Results(this.query, {super.key});
  final String query;
  @override
  Widget build(BuildContext c) {
    final xs = [
      'Class 10 Physics',
      'English vocabulary',
      'IELTS writing task 2',
      'SSC model test',
      'Bangla textbook',
    ].where((x) => x.toLowerCase().contains(query.toLowerCase())).toList();
    return ListView(
      padding: const EdgeInsets.all(20),
      children: xs.isEmpty
          ? [const Text('No matching resources yet.')]
          : xs
                .map(
                  (x) => Card(
                    child: ListTile(
                      leading: const Icon(Icons.search),
                      title: Text(x),
                      trailing: const Icon(Icons.chevron_right),
                    ),
                  ),
                )
                .toList(),
    );
  }
}

class _Metric extends StatelessWidget {
  const _Metric(this.value, this.label, this.icon, this.color);
  final String value, label;
  final IconData icon;
  final Color color;
  @override
  Widget build(BuildContext c) => Expanded(
    child: Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 13, horizontal: 4),
        child: Column(
          children: [
            Icon(icon, size: 20, color: color),
            const SizedBox(height: 5),
            Text(value, style: const TextStyle(fontWeight: FontWeight.w800)),
            Text(
              label,
              style: const TextStyle(fontSize: 10, color: Colors.grey),
            ),
          ],
        ),
      ),
    ),
  );
}

class _ClassTile extends StatelessWidget {
  const _ClassTile(this.title, this.sub, this.color, this.onTap);
  final String title, sub;
  final Color color;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext c) => Card(
    child: InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Padding(
        padding: const EdgeInsets.all(14),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            CircleAvatar(
              radius: 15,
              backgroundColor: color.withValues(alpha: .12),
              child: Icon(Icons.school, color: color, size: 17),
            ),
            const SizedBox(height: 7),
            Text(title, style: const TextStyle(fontWeight: FontWeight.w800)),
            Text(sub, style: const TextStyle(fontSize: 11, color: Colors.grey)),
          ],
        ),
      ),
    ),
  );
}

class _Chip extends StatelessWidget {
  const _Chip(this.icon, this.label, this.color, this.onTap);
  final IconData icon;
  final String label;
  final Color color;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext c) => ActionChip(
    avatar: Icon(icon, color: color, size: 18),
    label: Text(label),
    onPressed: onTap,
  );
}

class _Header extends StatelessWidget {
  const _Header(this.title, this.action, this.onTap);
  final String title, action;
  final VoidCallback onTap;
  @override
  Widget build(BuildContext c) => Row(
    children: [
      Expanded(
        child: Text(
          title,
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w800),
        ),
      ),
      if (action.isNotEmpty) TextButton(onPressed: onTap, child: Text(action)),
    ],
  );
}

class _Update extends StatelessWidget {
  const _Update(this.icon, this.title, this.sub, this.color);
  final IconData icon;
  final String title, sub;
  final Color color;
  @override
  Widget build(BuildContext c) => Card(
    margin: const EdgeInsets.only(bottom: 8),
    child: ListTile(
      leading: CircleAvatar(
        backgroundColor: color.withValues(alpha: .12),
        child: Icon(icon, color: color),
      ),
      title: Text(title, style: const TextStyle(fontWeight: FontWeight.w700)),
      subtitle: Text(sub),
      trailing: const Icon(Icons.chevron_right),
    ),
  );
}

IconData _resourceIcon(String x) => x.contains('PDF') || x.contains('book')
    ? Icons.menu_book
    : x.contains('video')
    ? Icons.video_library
    : x.contains('test') || x.contains('MCQ')
    ? Icons.quiz
    : Icons.notes;
