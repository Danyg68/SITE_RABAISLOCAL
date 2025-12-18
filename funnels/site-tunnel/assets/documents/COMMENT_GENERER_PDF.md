# Comment générer le PDF du Guide Affilié 2.0

## Méthode 1: Via le navigateur (RECOMMANDÉE - Simple et rapide)

1. **Ouvre le fichier** `guide-affilie-2.0.html` dans ton navigateur (Chrome, Edge, Firefox)
   - Double-clique sur le fichier OU
   - Fais clic-droit > "Ouvrir avec" > Ton navigateur

2. **Imprime en PDF**:
   - Appuie sur `Ctrl + P` (Windows) ou `Cmd + P` (Mac)
   - Dans la fenêtre d'impression, sélectionne **"Enregistrer en PDF"** comme imprimante
   - Assure-toi que **"Graphiques d'arrière-plan"** est coché
   - Clique sur **"Enregistrer"**
   - Nomme le fichier: `guide-affilie-2.0.pdf`
   - Enregistre-le dans ce même dossier (`assets/documents/`)

3. **Résultat**: Tu auras maintenant un fichier `guide-affilie-2.0.pdf` professionnel et prêt à partager!

---

## Méthode 2: Via script Node.js (Pour automatisation)

Si tu veux automatiser la génération:

1. **Installe Puppeteer**:
   ```bash
   cd production/funnels/site-tunnel/assets/documents
   npm install puppeteer
   ```

2. **Exécute le script**:
   ```bash
   node generate-pdf.js
   ```

3. Le PDF sera généré automatiquement dans le même dossier.

---

## Notes importantes

- ✅ Le fichier HTML est déjà optimisé pour l'impression PDF
- ✅ Les couleurs et graphiques seront préservés
- ✅ Le tableau du plan de compensation sera parfaitement formaté
- ✅ Compatible avec tous les navigateurs modernes

---

**Besoin d'aide?** Contacte support@rabaislocal.com
