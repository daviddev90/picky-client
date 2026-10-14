# picky-client

[English](../../README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · [Español](README_es.md) · **Français** · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md) · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · [Italiano](README_it.md) · [Ελληνικά](README_el.md)

**Laissez votre agent concevoir. Soyez le client exigeant. Poussez la qualité du design de votre produit au maximum.**

Comparez de véritables propositions UI/UX et choisissez la direction qui vous convient. Une fois le design arrêté, votre agent l'applique à l'écran réel et vérifie le résultat.

## Commencez avec votre agent

Copiez cette demande dans votre agent de programmation :

```text
Lis le README à l'adresse https://github.com/daviddev90/picky-client.git et installe picky-client dans ton propre environnement d'agent.
```

Puis, dans le projet de votre produit, demandez une première série de propositions :

```text
Utilise picky-client pour créer 3–5 propositions de mise en page pour ce tableau de bord. Conserve les couleurs, les polices et les fonctionnalités existantes, et laisse-moi comparer les propositions dans un navigateur avant de choisir.
```

L'agent recherche des exemples, crée les propositions, vérifie leur rendu réel dans le navigateur et partage une URL de consultation accessible. Vous parcourez les options et faites votre choix.

## Comment se déroule une série

1. Vous précisez l’écran et la décision de design à prendre.
2. L’agent recherche des exemples, crée des propositions et les vérifie dans un vrai navigateur.
3. Vous comparez les propositions et en choisissez une.
4. Vous validez la série suivante ou arrêtez le design et demandez à l’agent de l’appliquer à l’écran réel.

Chaque série tranche un aspect du design encore ouvert. Vos choix sont conservés afin que la suite s'appuie sur ce qui vous plaît déjà.

| Votre décision | Ce que vous comparez |
|---|---|
| Ambiance, personnalité visuelle ou compositions aussi utilisables les unes que les autres | Dix directions distinctes |
| Mise en page, commandes, densité ou navigation | Trois à cinq options étayées, avec leurs compromis d'ergonomie |
| Une seule option pertinente reste possible | Une recommandation argumentée |
| Votre thème est déjà fixé | Des options qui conservent ses couleurs, son identité typographique et ses matériaux |

## Choisir, affiner, appliquer

Indiquez à l'agent votre choix et la suite souhaitée. Exemples de demandes :

```text
Je choisis la proposition #2. Propose ensuite une série consacrée à la typographie en conservant cette mise en page.
```

```text
Le design est arrêté. Applique la proposition #2 à l'écran réel et vérifie son comportement et ses états.
```

L'agent attend votre décision avant de poursuivre. Appliquer un design comprend la conservation des fonctionnalités existantes, l'adaptation de la mise en page choisie à l'écran réel et la vérification du rendu.

## Ce qui rend les choix utiles

- **Références réelles :** Chaque série étudie des services proposant la même fonctionnalité ou jouant un rôle similaire, ainsi que les pratiques actuelles de design.
- **Comparaisons équitables :** Les propositions visuelles partagent les mêmes textes relus ; les choix de design déjà arrêtés restent fixes.
- **Propositions utilisables :** Le rendu dans le navigateur et la navigation sont vérifiés avant la présentation, avec une URL accessible depuis votre appareil.
- **Décisions traçables :** Le fichier `docs/picky-client.md` de votre projet consigne les propositions, les recherches, les vérifications et les choix retenus. La spécification définitive se trouve dans `docs/picky-client-design.md`.
- **Compilation de production propre :** L'environnement temporaire de comparaison et les lignes qui le raccordent à l'application sont supprimés, puis leur absence dans le résultat de production est vérifiée.

L'environnement de comparaison fourni utilise React, TypeScript, Vite, React Router, Tailwind et Motion. Les autres piles techniques adaptent ses points d'intégration ; les produits natifs passent par un aperçu web avant l'application dans leur propre pile. Les environnements disposant de sous-agents délèguent la réalisation et les revues. Les autres exécutent les étapes successivement et consignent la revue effectuée par le même agent.

## Détails d'installation

<details>
<summary>Instructions pour l'agent, commandes manuelles et invocation</summary>

### Pour l'agent chargé de l'installation

Respectez le mode et la portée d'installation demandés par l'utilisateur. À défaut, utilisez la procédure de plugin natif ci-dessous pour Codex ou Claude Code, et l'identifiant Skills CLI correspondant pour les autres environnements. Les plugins natifs ciblent par défaut l'utilisateur actuel ; Skills CLI cible le projet. Installez le dossier complet du skill, avec ses références, scripts et ressources. Vérifiez qu'il est effectivement détecté, puis indiquez comment l'invoquer et les éventuelles étapes de rechargement requises par l'environnement.

### Skills CLI

Le skill de référence se trouve dans [skills/picky-client](../../skills/picky-client). Exécutez [Skills CLI](https://github.com/vercel-labs/skills) depuis le répertoire de votre projet avec Node.js 22.20.0 ou une version ultérieure :

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

Sélectionnez un agent lorsque vous y êtes invité, ou indiquez-le directement :

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| Agent | `--agent` ID |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode, y compris oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

Ajoutez `-g` pour installer dans l'emplacement de l'agent commun aux projets de l'utilisateur. Pour une installation manuelle dans le projet, copiez le dossier complet `skills/picky-client` dans `.agents/skills/`, un emplacement pris en charge par [OpenCode](https://opencode.ai/docs/skills/) et [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide). oh-my-opencode utilise l'installation de skills d'OpenCode.

### Plugin Claude Code

Dans le terminal, avec Claude Code 2.1.292 ou une version ultérieure :

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

Solution pour les versions antérieures :

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

Dans une session, la version 2.1.275 ou ultérieure prend en charge `/plugin install picky-client --marketplace daviddev90/picky-client`. Consultez l'[installation des plugins Claude Code](https://code.claude.com/docs/en/discover-plugins).

### Plugin Codex

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

Utilisez `/plugins` dans Codex pour parcourir les plugins. Consultez la [référence de Codex CLI](https://learn.chatgpt.com/docs/cli/reference).

Les deux plugins utilisent le dossier de référence `skills/` à la racine. Le fichier [plugin.json](../../plugin.json) à la racine empaquette le plugin portable/pour Codex ; [.claude-plugin/plugin.json](../../.claude-plugin/plugin.json) assure la compatibilité avec Claude Code. Consultez la [création de paquets de plugins](https://developers.openai.com/plugins/build/plugins).

### Invocation explicite

| Installation | Invocation |
|---|---|
| Plugin Codex | `$picky-client:picky-client` |
| Skill autonome Codex | `$picky-client` |
| Plugin Claude Code | `/picky-client:picky-client` |
| Skill autonome Claude Code | `/picky-client` |

Avec les autres agents, demandez à utiliser picky-client. Les propositions et les libellés de comparaison suivent votre langue de travail ; le nom de l'outil reste `PICKY-CLIENT DRAFTS`.

</details>

Lisez le [skill](../../skills/picky-client/SKILL.md) pour connaître le processus complet.

## Licence

MIT © daviddev90
