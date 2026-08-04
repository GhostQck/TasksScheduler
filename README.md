# Tasks Scheduler
Web Application to store, process and organize specific tasks.

---

Tasks must be assigned to a specific 'expert'. They can be accompanied by files or extensive descriptions.
The workflow implies having a backend database both for the users who assign the tasks, and the tasks themselves.

## Used Technologies:

Frontend Development\
**CORE LIBRARY:** `React`\
**SCRIPTS:** `TypeScript`\
**LAYOUT:** `HTML5`\
**STYLE:** `CSS3 + TailwindCSS`\
**ICONS:** `Lucide`

Backend Development\
**CORE FRAMEWORK:** `Next.js`\
**SCRIPTS:** `TypeScript`\
**DATABASE:** `PostgreSQL`\
**ORM:** `Drizzle`\
**HASH ENCRYPTION:** `bcryptjs`\
**JWT SESSIONS:** `jose`

## Chosen Color Scheme:

As in `@/globals.css`:

$\color{#273338}\textsf{BACKGROUND}$\
$\color{#2B5748}\textsf{FOREGROUND}$\
$\color{#618764}\textsf{HIGHLIGHT}$\
$\color{#9CB080}\textsf{TEXT}$

## Implemented Features:

- Integration of an optimized DB;
- Adaptive layout;
- Dynamic `input` and `textarea` placeholders;
- Seamless and optimized combining of the Tailwind classes;
- CVA dictionaries for components with multiple designs;
- Password encryption with 10 salt rounds;
- Modern `proxy` setup for Next.js routing;
- HTTPS usage (in production);
- JWT sessions;