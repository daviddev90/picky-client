# picky-client

[English](../../README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · [Français](README_fr.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md) · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · **Italiano** · [Ελληνικά](README_el.md)

**Lascia che il tuo agente progetti. Diventa il cliente esigente. Porta al massimo la qualità del design del tuo prodotto.**

Confronta proposte UI/UX reali e scegli la direzione che preferisci. Quando definisci il design, il tuo agente lo applica alla schermata reale e verifica il risultato.

## Inizia con il tuo agente

Copia questa richiesta nel tuo agente di programmazione:

```text
Leggi il README su https://github.com/daviddev90/picky-client.git e installa picky-client nel tuo ambiente agente.
```

Poi, nel progetto del tuo prodotto, richiedi un primo ciclo:

```text
Usa picky-client per creare 3–5 proposte di layout per questa dashboard. Mantieni i colori, i caratteri e le funzionalità esistenti e fammi confrontare le proposte in un browser prima di scegliere.
```

L'agente ricerca esempi, crea le proposte, ne verifica il rendering effettivo nel browser e condivide un URL di revisione raggiungibile. Tu esplori le opzioni e scegli.

## Come funziona un ciclo

1. Indichi la schermata e la decisione di design da prendere.
2. L’agente ricerca esempi, crea proposte e le verifica in un browser reale.
3. Confronti le proposte e ne scegli una.
4. Approvi il ciclo successivo oppure definisci il design e chiedi all’agente di applicarlo alla schermata reale.

Ogni ciclo risolve un aspetto del design ancora aperto. Le tue scelte vengono mantenute, così il ciclo successivo parte da ciò che ti piace già.

| La tua decisione | Che cosa confronti |
|---|---|
| Atmosfera, personalità visiva o composizioni ugualmente utilizzabili | Dieci direzioni distinte |
| Layout, controlli, densità o navigazione | Da tre a cinque opzioni motivate, con compromessi di usabilità |
| Rimane una sola opzione sensata | Una raccomandazione motivata |
| Il tema è già definito | Opzioni che ne preservano colori, identità tipografica e materiali |

## Scegli, perfeziona, applica

Comunica all'agente la tua scelta e il passo successivo. Esempi di richieste:

```text
Scelgo la proposta #2. Ora proponi un ciclo dedicato alla tipografia mantenendo questo layout.
```

```text
Il design è definitivo. Applica la proposta #2 alla schermata reale e verificane il comportamento e gli stati.
```

L'agente attende la tua decisione prima di continuare. Applicare un design comprende preservare le funzionalità esistenti, adattare il layout scelto alla schermata reale e verificare il rendering risultante.

## Che cosa rende utili le scelte

- **Riferimenti reali:** Ogni ciclo ricerca servizi con la stessa funzionalità o un ruolo simile, insieme alle pratiche di design attuali.
- **Confronti equi:** Le proposte visive condividono testi revisionati; le decisioni di design già definite restano fisse.
- **Proposte utilizzabili:** Rendering nel browser e navigazione vengono verificati prima della consegna, con un URL raggiungibile per la revisione dal tuo dispositivo.
- **Traccia delle decisioni:** `docs/picky-client.md` nel tuo progetto registra proposte, ricerche, verifiche e scelte vincitrici. La specifica definitiva viene salvata in `docs/picky-client-design.md`.
- **Build di produzione pulita:** L'ambiente temporaneo di revisione e le righe che lo collegano all'applicazione vengono rimossi; si verifica poi che siano esclusi dal risultato di produzione.

L'ambiente di revisione incluso usa React, TypeScript, Vite, React Router, Tailwind e Motion. Gli altri stack adattano i punti di integrazione; i prodotti nativi usano un'anteprima web prima dell'applicazione nel proprio stack. Gli ambienti con sottoagenti delegano creazione e revisione. Gli altri eseguono i passaggi in sequenza e registrano la revisione svolta dallo stesso agente.

## Dettagli di installazione

<details>
<summary>Istruzioni per l'agente, comandi manuali e invocazione</summary>

### Per l'agente che esegue l'installazione

Rispetta modalità e ambito di installazione richiesti dall'utente. Altrimenti usa il percorso del plugin nativo riportato sotto per Codex o Claude Code e l'ID Skills CLI corrispondente per gli altri ambienti. I plugin nativi si installano per impostazione predefinita per l'utente corrente; Skills CLI si installa nel progetto. Installa l'intera cartella dello skill, comprese risorse di riferimento, script e asset. Verifica che venga effettivamente individuato, poi indica come invocarlo e gli eventuali passaggi di ricaricamento richiesti dall'ambiente.

### Skills CLI

Lo skill di riferimento è [skills/picky-client](../../skills/picky-client). Esegui [Skills CLI](https://github.com/vercel-labs/skills) dalla directory del tuo progetto con Node.js 22.20.0 o successivo:

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

Seleziona un agente quando richiesto oppure specificalo direttamente:

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| Agente | `--agent` ID |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode, incluso oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

Aggiungi `-g` per installare nella posizione dell'agente a livello utente. Per l'installazione manuale nel progetto, copia tutta la cartella `skills/picky-client` in `.agents/skills/`, una posizione supportata da [OpenCode](https://opencode.ai/docs/skills/) e [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide). oh-my-opencode usa l'installazione degli skill di OpenCode.

### Plugin Claude Code

Nel terminale, con Claude Code 2.1.292 o successivo:

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

Alternativa per versioni precedenti:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

All'interno di una sessione, la versione 2.1.275 o successiva supporta `/plugin install picky-client --marketplace daviddev90/picky-client`. Consulta l'[installazione dei plugin di Claude Code](https://code.claude.com/docs/en/discover-plugins).

### Plugin Codex

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

Usa `/plugins` in Codex per esplorare i plugin. Consulta il [riferimento di Codex CLI](https://learn.chatgpt.com/docs/cli/reference).

Entrambi i plugin usano la cartella di riferimento `skills/` nella radice. Il file [plugin.json](../../plugin.json) nella radice definisce il pacchetto del plugin portabile/per Codex; [.claude-plugin/plugin.json](../../.claude-plugin/plugin.json) fornisce la compatibilità con Claude Code. Consulta la [creazione dei pacchetti di plugin](https://developers.openai.com/plugins/build/plugins).

### Invocazione esplicita

| Installazione | Invocazione |
|---|---|
| Plugin Codex | `$picky-client:picky-client` |
| Skill autonomo Codex | `$picky-client` |
| Plugin Claude Code | `/picky-client:picky-client` |
| Skill autonomo Claude Code | `/picky-client` |

Negli altri agenti, chiedi di usare picky-client. Le proposte e le etichette di revisione seguono la tua lingua di lavoro; il nome dello strumento resta `PICKY-CLIENT DRAFTS`.

</details>

Leggi lo [skill](../../skills/picky-client/SKILL.md) per il flusso completo.

## Licenza

MIT © daviddev90
