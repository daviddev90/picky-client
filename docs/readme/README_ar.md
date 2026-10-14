# picky-client

[English](../../README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Français](README_fr.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · **العربية** · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · [Italiano](README_it.md) · [Ελληνικά](README_el.md)

**دع وكيلك يصمّم. كن العميل الدقيق في اختياراته. ادفع جودة تصميم خدمتك إلى أقصى حد.**

قارن بين مسودات UI/UX فعلية واختر الاتجاه الذي تريده. عندما تعتمد التصميم، يطبّقه وكيلك على الشاشة الفعلية ويتحقق من النتيجة.

## ابدأ مع وكيلك

انسخ هذا الطلب إلى وكيل البرمجة لديك:

```text
اقرأ README على https://github.com/daviddev90/picky-client.git وثبّت picky-client في بيئة الوكيل الخاصة بك.
```

ثم اطلب الجولة الأولى داخل مشروع منتجك:

```text
استخدم picky-client لإنشاء 3–5 مسودات لتخطيط لوحة التحكم هذه. حافظ على الألوان والخطوط والميزات الحالية، وأتح لي مقارنة المسودات في المتصفح قبل أن أختار.
```

يبحث الوكيل في الأمثلة، وينشئ الخيارات، ويتحقق من عرضها في متصفح فعلي، ويشارك رابط مراجعة يمكنك الوصول إليه. تتصفح الخيارات وتتخذ قرارك.

## كيف تسير الجولة

1. تحدّد الشاشة وقرار التصميم الذي تريد اتخاذه.
2. يبحث الوكيل في الأمثلة، وينشئ المسودات، ويفحصها في متصفح فعلي.
3. تقارن المسودات وتختار إحداها.
4. توافق على الجولة التالية أو تعتمد التصميم وتطلب من الوكيل تطبيقه على الشاشة الفعلية.

تحسم كل جولة جانبًا واحدًا من التصميم لم يُحسم بعد. تُحفظ اختياراتك، فتستند الجولة التالية إلى ما أعجبك بالفعل.

| قرارك | ما تقارنه |
|---|---|
| الطابع، أو الشخصية البصرية، أو تكوينات متساوية في سهولة الاستخدام | عشرة اتجاهات مختلفة |
| التخطيط، أو عناصر التحكم، أو الكثافة، أو التنقل | ثلاثة إلى خمسة خيارات تستند إلى بحث، مع توضيح المفاضلات المتعلقة بسهولة الاستخدام |
| لم يبقَ سوى خيار واحد ذي معنى | توصية معلّلة |
| المظهر محدّد بالفعل | خيارات تحافظ على ألوانه وهوية خطوطه وخاماته |

## اختر، حسّن، طبّق

أخبر الوكيل بما اخترته وبما تريد فعله بعد ذلك. أمثلة على الطلبات:

```text
أختار #2. اقترح بعد ذلك جولة لتنسيق الخطوط مع الحفاظ على هذا التخطيط.
```

```text
تم اعتماد التصميم. طبّق #2 على الشاشة الفعلية وتحقق من سلوكها وحالاتها.
```

ينتظر الوكيل قرارك قبل المتابعة. يشمل تطبيق التصميم الحفاظ على الوظائف الحالية، ومواءمة التخطيط المختار مع الشاشة الفعلية، والتحقق من النتيجة المعروضة.

## ما الذي يجعل الخيارات مفيدة

- **مراجع فعلية:** تبحث كل جولة في خدمات تقدم الميزة نفسها أو تؤدي دورًا مشابهًا، إلى جانب ممارسات التصميم الحالية.
- **مقارنات عادلة:** تستخدم الخيارات البصرية نصوصًا مشتركة تمت مراجعتها؛ وتبقى قرارات التصميم المعتمدة ثابتة.
- **مسودات قابلة للاستخدام:** يُفحص العرض في المتصفح والتنقل قبل التسليم، مع رابط متاح للمراجعة على جهازك.
- **سجل للقرارات:** يسجّل `docs/picky-client.md` في مشروعك الخيارات والبحث والفحوصات والفائزين. وتُحفظ المواصفات المعتمدة في `docs/picky-client-design.md`.
- **بناء إنتاج نظيف:** تُزال بيئة المراجعة المؤقتة وأسطر ربطها بالتطبيق، ويُفحص ناتج البناء الإنتاجي للتأكد من استبعادها.

تستخدم بيئة المراجعة المرفقة React وTypeScript وVite وReact Router وTailwind وMotion. تتطلب الحزم التقنية الأخرى تكييف نقاط التكامل؛ وتستخدم المنتجات المبنية بتقنيات المنصة الأصلية معاينة ويب قبل التطبيق ضمن حزمتها التقنية. تفوّض البيئات التي تدعم الوكلاء الفرعيين أعمال الإنشاء والمراجعة إليهم. وتنفّذ البيئات الأخرى المراحل بالتتابع وتسجّل أن المراجعة أجراها الوكيل نفسه.

## تفاصيل التثبيت

<details>
<summary>تعليمات الوكيل والأوامر اليدوية وطريقة الاستدعاء</summary>

### للوكيل الذي يجري التثبيت

التزم بطريقة التثبيت ونطاقه اللذين طلبهما المستخدم. إذا لم يحددهما، فاستخدم مسار الإضافة الأصلية أدناه مع Codex أو Claude Code، ومعرّف Skills CLI المناسب للبيئات الأخرى. يكون النطاق الافتراضي للإضافات الأصلية هو المستخدم الحالي؛ ويكون نطاق Skills CLI الافتراضي هو المشروع. ثبّت مجلد المهارة كاملًا، بما فيه المراجع والبرامج النصية والموارد. تحقق من أن البيئة تكتشف المهارة فعليًا، ثم وضّح طريقة استدعائها وأي خطوات لإعادة التحميل تتطلبها البيئة.

### Skills CLI

توجد المهارة المرجعية في [skills/picky-client](../../skills/picky-client). شغّل [Skills CLI](https://github.com/vercel-labs/skills) من مجلد مشروعك باستخدام Node.js 22.20.0 أو أحدث:

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

اختر وكيلًا عند سؤالك، أو حدّده صراحةً:

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| الوكيل | معرّف `--agent` |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode، بما فيه oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

أضف `-g` للتثبيت في موقع الوكيل المشترك على مستوى المستخدم. وللتثبيت اليدوي داخل المشروع، انسخ مجلد `skills/picky-client` كاملًا إلى `.agents/skills/`، الذي يدعمه [OpenCode](https://opencode.ai/docs/skills/) و[Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide). يستخدم oh-my-opencode طريقة تثبيت المهارات في OpenCode.

### إضافة Claude Code

في الطرفية، مع Claude Code 2.1.292 أو أحدث:

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

الطريقة البديلة للإصدارات الأقدم:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

داخل الجلسة، يدعم الإصدار 2.1.275 أو أحدث الأمر `/plugin install picky-client --marketplace daviddev90/picky-client`. راجع [تثبيت إضافات Claude Code](https://code.claude.com/docs/en/discover-plugins).

### إضافة Codex

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

استخدم `/plugins` داخل Codex لتصفح الإضافات. راجع [مرجع Codex CLI](https://learn.chatgpt.com/docs/cli/reference).

تستخدم الإضافتان مجلد `skills/` المرجعي في جذر المستودع. يحدّد [plugin.json](../../plugin.json) في الجذر حزمة الإضافة المحمولة/إضافة Codex؛ ويوفّر [.claude-plugin/plugin.json](../../.claude-plugin/plugin.json) التوافق مع Claude Code. راجع [تجهيز حزم الإضافات](https://developers.openai.com/plugins/build/plugins).

### الاستدعاء الصريح

| طريقة التثبيت | الاستدعاء |
|---|---|
| إضافة Codex | `$picky-client:picky-client` |
| مهارة Codex المستقلة | `$picky-client` |
| إضافة Claude Code | `/picky-client:picky-client` |
| مهارة Claude Code المستقلة | `/picky-client` |

في الوكلاء الآخرين، اطلب استخدام picky-client. تستخدم الخيارات وتسميات المراجعة لغة عملك؛ ويظل اسم الأداة `PICKY-CLIENT DRAFTS`.

</details>

اقرأ [المهارة](../../skills/picky-client/SKILL.md) للاطلاع على سير العمل الكامل.

## الترخيص

MIT © daviddev90
