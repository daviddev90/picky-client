# picky-client

[English](../../README.md) · [简体中文](README_zh.md) · [繁體中文](README_zh-TW.md) · [日本語](README_ja.md) · [한국어](README_ko.md) · [Türkçe](README_tr.md) · [Русский](README_ru.md) · [Tiếng Việt](README_vi.md) · [ไทย](README_th.md) · [Deutsch](README_de.md) · **Español** · [Français](README_fr.md) · [Українська](README_uk.md) · [Polski](README_pl.md) · [Português (Brasil)](README_pt-BR.md) · [العربية](README_ar.md) · [فارسی](README_fa.md) · [Bahasa Indonesia](README_id.md) · [Italiano](README_it.md) · [Ελληνικά](README_el.md)

**Deja que tu agente diseñe. Sé el cliente exigente. Lleva al máximo la calidad del diseño de tu producto.**

Compara propuestas reales de UI/UX y elige la dirección que prefieras. Cuando des por definido el diseño, tu agente lo aplica a la pantalla real y comprueba el resultado.

## Empieza con tu agente

Copia esta solicitud en tu agente de programación:

```text
Lee el README de https://github.com/daviddev90/picky-client.git e instala picky-client en tu propio entorno de agente.
```

Después, en el proyecto de tu producto, solicita una primera ronda:

```text
Usa picky-client para crear 3–5 propuestas de distribución para este panel. Mantén los colores, las fuentes y las funciones existentes, y déjame comparar las propuestas en un navegador antes de elegir.
```

El agente investiga ejemplos, crea las propuestas, comprueba cómo se muestran realmente en el navegador y comparte una URL de revisión a la que puedes acceder. Tú exploras las opciones y eliges.

## Cómo funciona una ronda

1. Indicas la pantalla y la decisión de diseño que quieres tomar.
2. El agente investiga ejemplos, crea propuestas y las comprueba en un navegador real.
3. Comparas las propuestas y eliges una.
4. Apruebas la siguiente ronda o defines el diseño y pides al agente que lo aplique a la pantalla real.

Cada ronda resuelve un aspecto del diseño que aún está abierto. Tus elecciones se conservan para que la siguiente ronda parta de lo que ya te gusta.

| Tu decisión | Qué comparas |
|---|---|
| Ambiente, personalidad visual o composiciones igualmente utilizables | Diez direcciones distintas |
| Distribución, controles, densidad o navegación | De tres a cinco opciones fundamentadas, con ventajas y desventajas de usabilidad |
| Queda una sola opción con sentido | Una recomendación razonada |
| Tu tema visual ya está definido | Opciones que conservan sus colores, la identidad tipográfica y los materiales |

## Elegir, perfeccionar y aplicar

Dile al agente qué has elegido y qué debe ocurrir después. Ejemplos de solicitudes:

```text
Elijo la opción #2. A continuación, propón una ronda de tipografía manteniendo esta distribución.
```

```text
El diseño está definido. Aplica la opción #2 a la pantalla real y verifica su comportamiento y sus estados.
```

El agente espera tu decisión antes de continuar. Aplicar un diseño incluye conservar las funciones existentes, adaptar la distribución elegida a la pantalla real y comprobar el resultado visual.

## Qué hace útiles las opciones

- **Referencias reales:** Cada ronda investiga servicios con la misma función o un papel similar, además de las prácticas de diseño actuales.
- **Comparaciones justas:** Las propuestas visuales comparten textos revisados; las decisiones de diseño ya definidas se mantienen.
- **Propuestas utilizables:** Antes de entregarlas, se comprueban su visualización y navegación en el navegador, con una URL accesible para revisarlas desde tu dispositivo.
- **Registro de decisiones:** `docs/picky-client.md` en tu proyecto registra propuestas, investigación, comprobaciones y opciones ganadoras. La especificación definitiva se guarda en `docs/picky-client-design.md`.
- **Compilación de producción limpia:** Se eliminan el entorno temporal de revisión y las líneas que lo integran en la aplicación, y se comprueba que no estén en el resultado de producción.

El entorno de revisión incluido usa React, TypeScript, Vite, React Router, Tailwind y Motion. Otros conjuntos de tecnologías adaptan sus puntos de integración; los productos nativos usan una vista previa web antes de aplicar el diseño con sus propias tecnologías. Los entornos con subagentes delegan la creación y la revisión. Los demás realizan las comprobaciones en secuencia y registran que el mismo agente hizo la revisión.

## Detalles de instalación

<details>
<summary>Instrucciones para el agente, comandos manuales e invocación</summary>

### Para el agente que realiza la instalación

Respeta el modo y el alcance de instalación solicitados por el usuario. En caso contrario, usa la vía de plugin nativo indicada abajo para Codex o Claude Code, y el ID correspondiente de Skills CLI para los demás entornos. Los plugins nativos se instalan por defecto para el usuario actual; Skills CLI, para el proyecto. Instala la carpeta completa del skill, con sus referencias, scripts y recursos. Comprueba que se detecte realmente y después informa cómo invocarlo y qué pasos de recarga requiere el entorno.

### Skills CLI

El skill de referencia está en [skills/picky-client](../../skills/picky-client). Ejecuta [Skills CLI](https://github.com/vercel-labs/skills) desde el directorio de tu proyecto con Node.js 22.20.0 o posterior:

```bash
npx skills add daviddev90/picky-client --skill picky-client
```

Selecciona un agente cuando se te solicite o indícalo directamente:

```bash
npx skills add daviddev90/picky-client --skill picky-client --agent opencode -y
npx skills add daviddev90/picky-client --skill picky-client --agent antigravity -y
```

| Agente | `--agent` ID |
|---|---|
| Codex | `codex` |
| Claude Code | `claude-code` |
| OpenCode, incluido oh-my-opencode | `opencode` |
| Antigravity IDE | `antigravity` |
| Antigravity CLI | `antigravity-cli` |
| Cursor | `cursor` |
| GitHub Copilot | `github-copilot` |
| Gemini CLI | `gemini-cli` |
| Cline | `cline` |
| Windsurf | `windsurf` |

Añade `-g` para instalarlo en la ubicación del agente a nivel de usuario. Para instalarlo manualmente en un proyecto, copia toda la carpeta `skills/picky-client` en `.agents/skills/`, una ubicación compatible con [OpenCode](https://opencode.ai/docs/skills/) y [Antigravity](https://antigravity.google/docs/skills?app=antigravity-ide). oh-my-opencode usa la instalación de skills de OpenCode.

### Plugin de Claude Code

En el terminal, con Claude Code 2.1.292 o posterior:

```bash
claude plugin install picky-client --marketplace daviddev90/picky-client
```

Alternativa para versiones anteriores:

```bash
claude plugin marketplace add daviddev90/picky-client
claude plugin install picky-client@daviddev90
```

Dentro de una sesión, la versión 2.1.275 o posterior admite `/plugin install picky-client --marketplace daviddev90/picky-client`. Consulta la [instalación de plugins de Claude Code](https://code.claude.com/docs/en/discover-plugins).

### Plugin de Codex

```bash
codex plugin marketplace add daviddev90/picky-client
codex plugin add picky-client@daviddev90
```

Usa `/plugins` dentro de Codex para explorar los plugins. Consulta la [referencia de Codex CLI](https://learn.chatgpt.com/docs/cli/reference).

Ambos plugins usan la carpeta de referencia `skills/` de la raíz. El archivo [plugin.json](../../plugin.json) de la raíz empaqueta el plugin portable/para Codex; [.claude-plugin/plugin.json](../../.claude-plugin/plugin.json) proporciona compatibilidad con Claude Code. Consulta el [empaquetado de plugins](https://developers.openai.com/plugins/build/plugins).

### Invocación explícita

| Instalación | Invocación |
|---|---|
| Plugin de Codex | `$picky-client:picky-client` |
| Skill independiente de Codex | `$picky-client` |
| Plugin de Claude Code | `/picky-client:picky-client` |
| Skill independiente de Claude Code | `/picky-client` |

En otros agentes, pide que usen picky-client. Las propuestas y las etiquetas de revisión siguen tu idioma de trabajo; el nombre de la herramienta sigue siendo `PICKY-CLIENT DRAFTS`.

</details>

Lee el [skill](../../skills/picky-client/SKILL.md) para conocer el proceso completo.

## Licencia

MIT © daviddev90
