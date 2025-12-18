/**
 * Script pour générer le PDF du guide-affilie-2.0.html
 *
 * Installation requise:
 * npm install puppeteer
 *
 * Usage:
 * node generate-pdf.js
 */

const fs = require('fs');
const path = require('path');

// Vérifier si puppeteer est installé
let puppeteer;
try {
    puppeteer = require('puppeteer');
} catch (error) {
    console.error('❌ Puppeteer n\'est pas installé.');
    console.log('\n📦 Pour installer Puppeteer, exécute:');
    console.log('npm install puppeteer');
    console.log('\n💡 Alternative: Ouvre guide-affilie-2.0.html dans ton navigateur');
    console.log('   et utilise Ctrl+P > Enregistrer en PDF\n');
    process.exit(1);
}

async function generatePDF() {
    console.log('🚀 Génération du PDF en cours...\n');

    const browser = await puppeteer.launch({
        headless: 'new'
    });

    const page = await browser.newPage();

    // Charger le fichier HTML
    const htmlPath = path.join(__dirname, 'guide-affilie-2.0.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

    await page.setContent(htmlContent, {
        waitUntil: 'networkidle0'
    });

    // Générer le PDF
    await page.pdf({
        path: path.join(__dirname, 'guide-affilie-2.0.pdf'),
        format: 'A4',
        margin: {
            top: '20mm',
            right: '15mm',
            bottom: '20mm',
            left: '15mm'
        },
        printBackground: true,
        preferCSSPageSize: false
    });

    await browser.close();

    console.log('✅ PDF généré avec succès: guide-affilie-2.0.pdf\n');
}

generatePDF().catch(error => {
    console.error('❌ Erreur lors de la génération du PDF:', error.message);
    console.log('\n💡 Alternative: Ouvre guide-affilie-2.0.html dans ton navigateur');
    console.log('   et utilise Ctrl+P > Enregistrer en PDF\n');
    process.exit(1);
});
