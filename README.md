# 🌏 El Temps del Viatge — Japó + Maldives

Aplicació web (PWA) que mostra la previsió del temps lligada a l'itinerari del viatge
(23 jun – 12 jul 2026) i recomana com anar vestit i què posar a la maleta.

- **Previsió detallada** per hores per al dia seleccionat (i els 2-3 vinents).
- **Resum de 10 dies** amb una targeta per dia (ciutat, hotel, temperatura, pluja, roba).
- **Recomanacions de roba** automàtiques segons temperatura, pluja, UV, vent i humitat.
- **Llista de maleta** agregada de tot el viatge.
- **Instal·lable al mòbil** (PWA) i funciona offline amb l'última previsió descarregada.

Dades meteorològiques: [Open-Meteo](https://open-meteo.com) (gratuït, sense clau d'API).
No hi ha backend: són només fitxers estàtics.

## Provar-ho en local

```bash
cd "Vacances - temps"
python3 -m http.server 8765
# obre http://localhost:8765 al navegador
```

## Publicar a GitHub Pages

1. Crea un repositori a GitHub i puja aquests fitxers:
   ```bash
   git init
   git add .
   git commit -m "App del temps del viatge"
   git branch -M main
   git remote add origin https://github.com/<usuari>/<repo>.git
   git push -u origin main
   ```
2. Al repositori: **Settings → Pages → Build and deployment**
   - Source: *Deploy from a branch*
   - Branch: `main` / carpeta `/ (root)` → **Save**
3. Al cap d'un minut tindràs la URL: `https://<usuari>.github.io/<repo>/`
4. Obre la URL al mòbil i, des del menú del navegador, tria
   **"Afegir a la pantalla d'inici"** per instal·lar-la com a app.

> Tots els camins de l'app són relatius, així que funciona sense problemes sota el
> subcamí `/<repo>/` de GitHub Pages.

## Estructura

| Fitxer | Funció |
|---|---|
| `index.html` | Estructura de la pàgina |
| `css/styles.css` | Estils (mobile-first) |
| `js/itinerary.js` | Itinerari + coordenades de cada ciutat |
| `js/weather.js` | Crida a Open-Meteo, cache offline, codis del temps |
| `js/clothing.js` | Motor de recomanació de roba/maleta |
| `js/ui.js` | Generació del HTML de les vistes |
| `js/app.js` | Lògica principal i events |
| `manifest.webmanifest` / `sw.js` | Configuració PWA + offline |
| `icons/` | Icones de l'app |

## Notes

- La previsió és fiable a ~7-10 dies. Els dies més llunyans (p. ex. Maldives a principis
  de juliol vistos a finals de juny) apareixen com a *"encara no disponible"* i s'omplen
  automàticament a mesura que entren dins la finestra de 16 dies d'Open-Meteo.
- Per canviar dates, hotels o ciutats, edita només `js/itinerary.js`.
