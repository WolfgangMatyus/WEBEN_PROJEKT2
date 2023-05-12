# WEBEN_PROJEKT
WEBSHOP - beste-brettspiele.at


Meilensteine:

1.) Organisatorisches abgeschlossen
1a) Git-Repo mit Schreiberechte für alle angelegt + Main, Dev angelegt
1b) Meilensteine definiert
1c) Agile Arbeitsweise geklärt
1d) Erste Tickets erstellt

2.) Programm-Struktur angelegt
2a) Unterteilung Frontend/Backend
2b) Ordnerstruktur eingerichtet

2.) User-Registrierung + User-Login abgeschlossen

3.) Produkte + Produktsuche abgeschlossen

4.) Funktionen für reg. User abgeschlossen

5.) Admin-Funktionen abgeschlossen

(Wenn 1 rausfällt, können wir 2/4/5 weiter unterteilen)




ENVIRONMENT

1) Create and start docker image / container:
    1.1) Navigate to directory "/BE"
    1.2) Maven: clean -> install
    1.3) run: docker-compose up -d


2) Start development environment
    2.1) Navigate to directory "/BE"
    2.2) Maven: clean -> install
    2.3) run: docker-compose up -d web_mysql
    2.4) if you haven't done so far
         IntelliJ Settings for auto reload during development:
             - Check -> Preferences / Build, Execution, Deployment / Compiler / Build project automatically
             - Check -> Preferences / Advanced Settings / Allow auto-make to start even if developed application is currently running

    2.5) Start BackendApplication


