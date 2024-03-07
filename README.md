EXEDRA ASD 💪 -> PROGETTO CAPSTONE 

DESCRIZIONE 💡
Exedra Asd è un'applicazione per la gestione di una palestra, che permette a gestori e utenti di ottimizzare e semplificare le operazioni quotidiane. In questo progetto, i gestori possono gestire abbonamenti, programmare lezioni, e monitorare i prodotti in vendita, mentre gli utenti possono acquistare abbonamenti, visualizzare un calendario delle lezioni e acquistare dei prodotti a marchio registrato.

FUNZIONALITA' ✨
Gestione Abbonamenti: Creazione, rinnovo e cancellazione di abbonamenti in modo semplice e intuitivo.
Monitoraggio Prodotti: Gestione dello stato dello shop.
Tracciamento Progressi: Gli utenti possono visualizzare il dettaglio dell'abbonamento acquistato.

TECNOLOGIE UTILIZZATE 🛠️ 
Front-end 🖥️
Vite: Utilizzato per la sua rapidità nel hot module replacement, migliorando significativamente l'esperienza di sviluppo.
React: Permette di costruire un'interfaccia utente dinamica e reattiva, migliorando l'esperienza dell'utente.
Bootstrap: Impiegato per creare un design responsivo e accessibile, garantendo una buona usabilità su dispositivi mobili e desktop.
API Google: Integrate per fornire servizi di mappa e autenticazione, migliorando l'interattività e la sicurezza dell'app.

Back-end 🔗
Java: Scelto per la sua robustezza e portabilità, permettendo di costruire un back-end affidabile e scalabile.
Spring: Utilizzato per semplificare lo sviluppo del back-end attraverso l'inversione di controllo e l'iniezione di dipendenze.
JWT: Implementati per gestire l'autenticazione e mantenere la sicurezza delle sessioni utente.
Sicurezza delle Password: Le password sono protette utilizzando algoritmi di hashing e salting per prevenire accessi non autorizzati.

INSTALLAZIONE 📥
Per installare e avviare Exedra asd, segui questi passaggi:

bash
Copy code
git clone https://github.com/CarmenCaniglia/exedra-asd-fe.git
cd Exedra-asd

Installa le dipendenze
npm install

Avvia l'applicazione (frontend)
npm run dev

In un altro terminale, avvia il server backend
cd backend
./gradlew bootRun

UTILIZZO 📝
Dopo aver avviato l'applicazione, naviga a http://localhost:5173 per accedere all'interfaccia utente di GymManagerApp. Puoi registrarti come nuovo utente o accedere con un account esistente per esplorare tutte le funzionalità disponibili.


Link per il codice Back End 📫
https://github.com/CarmenCaniglia/exedraAsd-be

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
