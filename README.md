# Deponti Commercial OS

Sistema operativo commerciale per gestire il flusso di lavoro quotidiano.

## Funzionalita'

- **Dashboard** — panoramica di task, contatti, clienti e appuntamenti del giorno
- **Task** — gestione attivita' con priorita', scadenza e stato
- **Contatti** — rubrica con export CSV
- **Clienti** — anagrafica clienti con fatturato e categoria
- **Mail** — bozze e template email
- **Calendario** — eventi su 3 giorni (oggi, domani, dopodomani)
- **Pulsante AGGIORNA** — refresh dati globale in tempo reale

## Stack Tecnico

- **Framework**: Next.js 14 (App Router)
- **Stile**: Tailwind CSS
- **Linguaggio**: TypeScript
- **Deploy**: Vercel
- **Database** (futuro): Supabase
- **PWA**: manifest.json incluso

## Setup Locale

```bash
# 1. Clona il repository
git clone https://github.com/carlodeponti-lang/commerciale-OS.git
cd commerciale-OS

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000) nel browser.

## Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com)
2. Clicca **Add New Project**
3. Importa questo repository da GitHub
4. Clicca **Deploy** — fine!

## Struttura File

```
commerciale-OS/
├── app/
│   ├── api/refresh/route.ts   # API endpoint dati
│   ├── layout.tsx              # Layout principale
│   └── page.tsx                # Entry point app
├── components/
│   ├── Sidebar.tsx
│   ├── Dashboard.tsx
│   ├── TasksPage.tsx
│   ├── ContactsPage.tsx
│   ├── ClientsPage.tsx
│   ├── MailPage.tsx
│   └── CalendarPage.tsx
├── public/
│   └── manifest.json           # PWA manifest
├── styles/
│   └── globals.css
└── package.json
```

---

Progetto creato da Carlo Deponti — uso personale/professionale.
