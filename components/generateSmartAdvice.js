export function generateSmartAdvice(logs) {
    if (!logs || logs.length === 0) return 'Er zijn nog geen logs om advies op te baseren.';

    const recentLogs = logs.slice(0, 5); // pak de laatste 5 logs

    const supplement = recentLogs[0].supplement;
    const supplementLogs = recentLogs.filter(log => log.supplement === supplement);

    const avgMood = supplementLogs.reduce((sum, l) => sum + parseInt(l.mood), 0) / supplementLogs.length;
    const avgEnergy = supplementLogs.reduce((sum, l) => sum + parseInt(l.energy), 0) / supplementLogs.length;

    let advice = `Je gebruikt meestal ${supplement}. Je gemiddelde stemming is ${avgMood.toFixed(1)}, energie ${avgEnergy.toFixed(1)}.\n`;

    if (avgMood < 3) {
        advice += 'Overweeg een lagere dosering of een ander moment van inname. ';
    } else if (avgMood > 4) {
        advice += 'Je stemming is erg goed, deze aanpak werkt blijkbaar goed! ';
    }

    if (avgEnergy < 3) {
        advice += 'Let op je energie — plan je dosering op een actiever moment.';
    }

    return advice.trim();
}