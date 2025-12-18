# 📁 Documents téléchargeables pour affiliés

## Comment ajouter des documents

1. **Placez vos fichiers** dans ce dossier (`assets/documents/`)
2. **Nommez-les** selon les noms référencés dans `documents-utiles.html` :

### Fichiers attendus :

- `guide-affilie-2.0.pdf` - Guide complet de l'affilié
- `presentation-rabaislocal.pptx` - Présentation PowerPoint
- `Systeme_Remuneration.pptx` - Explication du plan de rémunération PowerPoint
### - `script-prospection.docx` - Scripts de messages
- `plan-remuneration-detaille.pdf` - Plan de rémunération PDF
### - `calculateur-revenus.xlsx` - Calculateur Excel
- `depliant_commercant.pdf` - Dépliant pour commerçant

## Formats acceptés :

- **PDF** (`.pdf`) - Recommandé pour les guides et documents officiels
- **PowerPoint** (`.pptx`, `.ppt`) - Pour les présentations
- **Word** (`.docx`, `.doc`) - Pour les modèles éditables
- **Excel** (`.xlsx`, `.xls`) - Pour les calculateurs

## Taille recommandée :

- Maximum **10 MB** par fichier pour un téléchargement rapide
- Compressez les PDF si nécessaire

## Comment ajouter un nouveau document :

1. Ajoutez le fichier dans ce dossier
2. Modifiez `documents-utiles.html` et ajoutez une nouvelle carte :

```html
<div class="rl-card">
  <div class="rl-card-icon">📄</div>
  <h3>Titre du document</h3>
  <p>Description du document.</p>
  <a href="assets/documents/nom-fichier.pdf" download class="rl-btn rl-btn-outline">📥 Télécharger (PDF)</a>
</div>
```

## Upload sur le serveur :

Via FTP, uploadez ce dossier complet vers :
`/public_html/production/funnels/site-tunnel/assets/documents/`

---

**Dernière mise à jour** : 10 décembre 2025
