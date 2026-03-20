const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'hr-ferreteria-v2.html');

try {
    // Read the file as raw buffer
    const buffer = fs.readFileSync(filePath);
    
    // The issue: UTF-8 bytes were misread as Windows-1252/Latin1, and then saved as UTF-8 again.
    // Example: The UTF-8 byte for 'í' is C3 AD.
    // If read as Latin-1, this becomes the two characters 'Ã' (C3) and '­' (AD).
    // When saved as UTF-8 again, 'Ã' becomes C3 83 and '­' becomes C2 AD.
    // So "Ferretería" became "FerreterÃ­a".
    
    // To reverse this:
    // 1. We have a string of UTF-8 characters (like "Ã­").
    // 2. We convert it to a string.
    const text = buffer.toString('utf-8');
    
    // 3. We convert that string to Latin-1 bytes. This perfectly recovers the original UTF-8 bytes
    // (e.g., changing C3 83 C2 AD back into the byte array [C3, AD]).
    const originalBytes = Buffer.from(text, 'binary'); // 'binary' in Node.js maps to Latin-1
    
    // 4. Now we decode those recovered original bytes back into a UTF-8 string.
    const recoveredText = originalBytes.toString('utf-8');
    
    // Check if the recovery worked (e.g. if it now contains "Ferretería" or the gear icon properly)
    if (recoveredText.includes('Ferretería') || recoveredText.includes('⚙️')) {
        console.log('Recovery seems successful. Writing to file...');
        fs.writeFileSync(filePath, recoveredText, 'utf-8');
        console.log('Done.');
    } else {
        console.log('Recovery might not have worked perfectly. Did not find expected keywords.');
        // If it didn't work directly with binary, maybe certain characters were lost. 
        // Let's print a small snippet to see what it looks like.
        console.log(recoveredText.substring(0, 500));
    }

} catch (err) {
    console.error('Error during processing:', err);
}
