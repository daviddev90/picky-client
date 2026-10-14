# picky-client

[English](../../README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Français](README_fr.md) · [Українська](README_uk.md) · **Polski** · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md) · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · [Italiano](README_it.md) · [Ελληνικά](README_el.md)

**Pozwól agentowi projektować. Bądź wymagającym klientem. Doprowadź jakość projektu swojej usługi do granic możliwości.**

Porównuj rzeczywiste propozycje UI/UX i wybierz kierunek, który Ci odpowiada. Gdy zatwierdzisz projekt, agent zastosuje go na docelowym ekranie i sprawdzi wynik.

## Zacznij od swojego agenta

Skopiuj tę prośbę do swojego agenta programistycznego:

```text
Przeczytaj README pod adresem https://github.com/daviddev90/picky-client.git i zainstaluj picky-client we własnym środowisku agenta.
```

Następnie poproś o pierwszą rundę w projekcie swojego produktu:

```text
Użyj picky-client, aby przygotować 3–5 propozycji układu tego panelu. Zachowaj dotychczasowe kolory, fonty i funkcje oraz pozwól mi porównać propozycje w przeglądarce przed wyborem.
```

Agent analizuje przykłady, tworzy propozycje, sprawdza ich rzeczywiste wyświetlanie w przeglądarce i udostępnia adres URL, który możesz otworzyć. Przeglądasz opcje i dokonujesz wyboru.

## Jak przebiega runda

1. Wskazujesz ekran i decyzję projektową, którą chcesz podjąć.
2. Agent analizuje przykłady, przygotowuje propozycje i sprawdza je w prawdziwej przeglądarce.
3. Porównujesz propozycje i wybierasz jedną.
4. Zatwierdzasz następną rundę albo ustalasz ostateczny projekt i prosisz agenta o zastosowanie go na rzeczywistym ekranie.

Każda runda rozstrzyga jeden otwarty aspekt projektu. Twoje wybory są zachowywane, więc następna runda rozwija to, co już Ci się podoba.

| Twoja decyzja | Co porównujesz |
|---|---|
| Nastrój, charakter wizualny lub równie użyteczne kompozycje | Dziesięć różnych kierunków |
| Układ, elementy sterujące, zagęszczenie lub nawigacja | Od trzech do pięciu uzasadnionych opcji z kompromisami dotyczącymi użyteczności |
| Pozostała jedna sensowna opcja | Uzasadnioną rekomendację |
| Motyw jest już ustalony | Opcje zachowujące jego kolory, charakter fontów i materiały |

## Wybierz, dopracuj, zastosuj

Powiedz agentowi, co wybierasz i co ma zrobić dalej. Przykładowe prośby:

```text
Wybieram #2. Następnie zaproponuj rundę dotyczącą typografii, zachowując ten układ.
```

```text
Projekt jest zatwierdzony. Zastosuj #2 na docelowym ekranie i sprawdź jego działanie oraz stany.
```

Agent czeka na Twoją decyzję, zanim przejdzie dalej. Zastosowanie projektu obejmuje zachowanie istniejących funkcji, dopasowanie wybranego układu do docelowego ekranu i sprawdzenie wyświetlanego wyniku.

## Co sprawia, że wybory są użyteczne

- **Rzeczywiste wzorce:** w każdej rundzie agent analizuje usługi z tą samą funkcją lub podobną rolą, a także aktualne praktyki projektowe.
- **Uczciwe porównanie:** propozycje wizualne korzystają ze wspólnych, sprawdzonych tekstów; zatwierdzone decyzje projektowe pozostają niezmienne.
- **Użyteczne propozycje:** wyświetlanie w przeglądarce i nawigacja są sprawdzane przed przekazaniem, a dostępny adres URL umożliwia ocenę na Twoim urządzeniu.
- **Historia decyzji:** plik `docs/picky-client.md` w Twoim projekcie zawiera propozycje, badania, sprawdzenia i zwycięzców. Zatwierdzona specyfikacja trafia do `docs/picky-client-design.md`.
- **Czysta kompilacja produkcyjna:** tymczasowe środowisko przeglądu i linie podłączające je do aplikacji są usuwane, a wynikowa kompilacja jest sprawdzana pod kątem ich wykluczenia.

Dołączone środowisko przeglądu używa React, TypeScript, Vite, React Router, Tailwind i Motion. Inne stosy technologiczne dostosowują punkty integracji; produkty natywne korzystają z podglądu internetowego przed zastosowaniem projektu we własnym stosie. Środowiska z subagentami delegują przygotowanie i przeglądy. Pozostałe wykonują etapy kolejno i odnotowują przegląd przez tego samego agenta.

## Szczegóły instalacji

<details>
<summary>Instrukcje dla agenta, polecenia ręczne i wywołanie</summary>

### Dla agenta instalującego

Uszanuj wybrany przez użytkownika sposób i zakres instalacji. W pozostałych przypadkach użyj opisanej poniżej wtyczki natywnej dla Codex lub Claude Code, a dla innych środowisk odpowiedniego ID w Skills CLI. Wtyczki natywne domyślnie instalują się dla bieżącego użytkownika; Skills CLI domyślnie instaluje w projekcie. Zainstaluj cały folder umiejętności, w tym materiały referencyjne, skrypty i zasoby. Sprawdź, czy środowisko rzeczywiście wykrywa umiejętność, a następnie podaj sposób wywołania i kroki ponownego załadowania wymagane przez to środowisko.

### Skills CLI

Kanoniczna umiejętność znajduje się w [skills/picky-client](../../skills/picky-client). Uruchom [Skills CLI](https://github.com/vercel-labs/skills) z katalogu projektu, używając Node.js 22.20.0 lub nowszego:

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

Wybierz agenta po wyświetleniu pytania albo wskaż go jawnie:

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| Agent | ID `--agent` |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode, w tym oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

Dodaj `-g`, aby użyć lokalizacji agenta wspólnej dla bieżącego użytkownika. Aby ręcznie zainstalować umiejętność w projekcie, skopiuj cały folder `skills/picky-client` do `.agents/skills/`, obsługiwanego przez [OpenCode](https://opencode.ai/docs/skills/) i [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide). oh-my-opencode korzysta z instalacji umiejętności OpenCode.

### Wtyczka Claude Code

W terminalu, Claude Code 2.1.292 lub nowszy:

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

Dla starszych wersji:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

W sesji wersja 2.1.275 lub nowsza obsługuje `/plugin install picky-client --marketplace daviddev90/picky-client`. Zobacz [instalację wtyczek Claude Code](https://code.claude.com/docs/en/discover-plugins).

### Wtyczka Codex

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

Użyj `/plugins` w Codex, aby przeglądać wtyczki. Zobacz [dokumentację Codex CLI](https://learn.chatgpt.com/docs/cli/reference).

Obie wtyczki korzystają z kanonicznego katalogu `skills/` w głównym katalogu repozytorium. Główny [plugin.json](../../plugin.json) opisuje przenośną wtyczkę i wtyczkę Codex; [.claude-plugin/plugin.json](../../.claude-plugin/plugin.json) zapewnia zgodność z Claude Code. Zobacz [pakowanie wtyczek](https://developers.openai.com/plugins/build/plugins).

### Jawne wywołanie

| Instalacja | Wywołanie |
|---|---|
| Wtyczka Codex | `$picky-client:picky-client` |
| Samodzielna umiejętność Codex | `$picky-client` |
| Wtyczka Claude Code | `/picky-client:picky-client` |
| Samodzielna umiejętność Claude Code | `/picky-client` |

W innych agentach poproś o użycie picky-client. Propozycje i etykiety przeglądu są w Twoim języku roboczym; nazwa narzędzia pozostaje `PICKY-CLIENT DRAFTS`.

</details>

Pełny przebieg opisuje [umiejętność](../../skills/picky-client/SKILL.md).

## Licencja

MIT © daviddev90
