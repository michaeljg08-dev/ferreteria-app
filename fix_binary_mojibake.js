const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'hr-ferreteria-v2.html');

try {
    let buffer = fs.readFileSync(filePath);
    
    // Find â€” (Em dash) which translates to bytes: C3 A2 E2 80 94
    // We want to replace it with UTF-8 Em dash: E2 80 94
    let targetDash = Buffer.from([0xC3, 0xA2, 0xE2, 0x80, 0x94]); // "â€”" in raw bytes
    let replacementDash = Buffer.from([0xE2, 0x80, 0x94]); // "—"

    // Find â• (Double lines) which translates to bytes: C3 A2 E2 80 42 (Wait, let's just use exact match from file)
    // The previous grep for "â•" showed lines 32: /* â• Â Â â•
    // â = C3 A2
    // • = E2 80 A2
    let targetLine = Buffer.from([0xC3, 0xA2, 0xE2, 0x80, 0xA2]); // "â•"
    let replacementLine = Buffer.from([0xE2, 0x95, 0x90]); // "═"
    
    // Â = C3 82
    let targetSpace = Buffer.from([0xC3, 0x82, 0xC2, 0xA0]); // "Â " (A circumflex + NBSP)
    let replacementSpace = Buffer.from([0x20]); // Space

    // Gear icon "âš™ï¸"
    // â = C3 A2
    // š = C5 A1
    // ™ = E2 84 A2
    // ï = C3 AF
    // ¸ = C2 B8
    let targetGear = Buffer.from([0xC3, 0xA2, 0xC5, 0xA1, 0xE2, 0x84, 0xA2, 0xC3, 0xAF, 0xC2, 0xB8, 0xEF, 0xB8, 0x8F]);
    let replacementGear = Buffer.from([0xE2, 0x9A, 0x99, 0xEF, 0xB8, 0x8F]); // "⚙️"

    // Replace function for buffers
    function replaceBuffer(buf, target, rep) {
        let index = 0;
        let newBuf = Buffer.alloc(0);
        while ((index = buf.indexOf(target)) !== -1) {
            newBuf = Buffer.concat([newBuf, buf.slice(0, index), rep]);
            buf = buf.slice(index + target.length);
        }
        return Buffer.concat([newBuf, buf]);
    }

    buffer = replaceBuffer(buffer, targetDash, replacementDash);
    buffer = replaceBuffer(buffer, targetLine, replacementLine);
    buffer = replaceBuffer(buffer, targetSpace, replacementSpace);
    
    // Also try standard gear byte representation just in case it's slightly different
    let altTargetGear = Buffer.from("âš™ï¸", "utf-8");
    buffer = replaceBuffer(buffer, altTargetGear, replacementGear);
    
    // Alt hyphen "â€”"
    let altTargetDash = Buffer.from("â€”", "utf-8");
    buffer = replaceBuffer(buffer, altTargetDash, replacementDash);
    
    // Alt line "â•"
    let altTargetLine = Buffer.from("â•", "utf-8");
    buffer = replaceBuffer(buffer, altTargetLine, replacementLine);

    // Let's also do a global string replace after converting buffer back to string to catch any anomalies
    let txt = buffer.toString('utf-8');
    txt = txt.replace(/â€”/g, '—');
    txt = txt.replace(/âš™ï¸/g, '⚙️');
    txt = txt.replace(/â• /g, '═ ');
    txt = txt.replace(/â•/g, '═');
    txt = txt.replace(/Â /g, ' ');

    fs.writeFileSync(filePath, txt, 'utf-8');
    console.log('Binary and explicit string replacements finished successfully.');

} catch (err) {
    console.error('Error during processing:', err);
}
