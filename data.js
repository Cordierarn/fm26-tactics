// ==========================================
// FM26 Tactics Expert Tool - Data (FM26 Update)
// Includes: Dual Formations, New Player Roles, OOP Roles
// ==========================================

// Formation Positions (percentages from top-left of pitch)
const FORMATIONS = {
    '4-4-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 15, y: 50, pos: 'LM', type: 'midfielder' },
        { x: 38, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 85, y: 50, pos: 'RM', type: 'midfielder' },
        { x: 35, y: 22, pos: 'ST', type: 'attacker' },
        { x: 65, y: 22, pos: 'ST', type: 'attacker' }
    ],
    '4-4-2-diamond': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 50, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 30, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 70, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 35, y: 20, pos: 'ST', type: 'attacker' },
        { x: 65, y: 20, pos: 'ST', type: 'attacker' }
    ],
    '4-3-3': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 30, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 70, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 15, y: 25, pos: 'LW', type: 'attacker' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' },
        { x: 85, y: 25, pos: 'RW', type: 'attacker' }
    ],
    '4-3-3-dm': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 50, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 35, y: 45, pos: 'CM', type: 'midfielder' },
        { x: 65, y: 45, pos: 'CM', type: 'midfielder' },
        { x: 15, y: 25, pos: 'LW', type: 'attacker' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' },
        { x: 85, y: 25, pos: 'RW', type: 'attacker' }
    ],
    '4-2-3-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 38, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 62, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 15, y: 38, pos: 'LW', type: 'midfielder' },
        { x: 50, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 85, y: 38, pos: 'RW', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    '4-1-4-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 50, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 15, y: 45, pos: 'LM', type: 'midfielder' },
        { x: 38, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 85, y: 45, pos: 'RM', type: 'midfielder' },
        { x: 50, y: 20, pos: 'ST', type: 'attacker' }
    ],
    '4-3-2-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 30, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 58, pos: 'CM', type: 'midfielder' },
        { x: 70, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 35, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 65, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    '4-4-1-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 15, y: 52, pos: 'LM', type: 'midfielder' },
        { x: 38, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 85, y: 52, pos: 'RM', type: 'midfielder' },
        { x: 50, y: 32, pos: 'AM', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    '3-5-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 10, y: 52, pos: 'LWB', type: 'midfielder' },
        { x: 35, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 58, pos: 'CM', type: 'midfielder' },
        { x: 65, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 90, y: 52, pos: 'RWB', type: 'midfielder' },
        { x: 35, y: 22, pos: 'ST', type: 'attacker' },
        { x: 65, y: 22, pos: 'ST', type: 'attacker' }
    ],
    '3-4-3': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 10, y: 52, pos: 'LWB', type: 'midfielder' },
        { x: 38, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 90, y: 52, pos: 'RWB', type: 'midfielder' },
        { x: 20, y: 25, pos: 'LW', type: 'attacker' },
        { x: 50, y: 20, pos: 'ST', type: 'attacker' },
        { x: 80, y: 25, pos: 'RW', type: 'attacker' }
    ],
    '3-4-2-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 10, y: 52, pos: 'LWB', type: 'midfielder' },
        { x: 38, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 90, y: 52, pos: 'RWB', type: 'midfielder' },
        { x: 35, y: 32, pos: 'AM', type: 'attacker' },
        { x: 65, y: 32, pos: 'AM', type: 'attacker' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    '3-1-4-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 65, pos: 'DM', type: 'midfielder' },
        { x: 10, y: 48, pos: 'LM', type: 'midfielder' },
        { x: 38, y: 50, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 50, pos: 'CM', type: 'midfielder' },
        { x: 90, y: 48, pos: 'RM', type: 'midfielder' },
        { x: 35, y: 22, pos: 'ST', type: 'attacker' },
        { x: 65, y: 22, pos: 'ST', type: 'attacker' }
    ],
    '5-3-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 10, y: 72, pos: 'LWB', type: 'defender' },
        { x: 30, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 70, y: 78, pos: 'CB', type: 'defender' },
        { x: 90, y: 72, pos: 'RWB', type: 'defender' },
        { x: 30, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 70, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 35, y: 25, pos: 'ST', type: 'attacker' },
        { x: 65, y: 25, pos: 'ST', type: 'attacker' }
    ],
    '5-4-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 10, y: 72, pos: 'LWB', type: 'defender' },
        { x: 30, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 70, y: 78, pos: 'CB', type: 'defender' },
        { x: 90, y: 72, pos: 'RWB', type: 'defender' },
        { x: 15, y: 50, pos: 'LM', type: 'midfielder' },
        { x: 38, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 85, y: 50, pos: 'RM', type: 'midfielder' },
        { x: 50, y: 22, pos: 'ST', type: 'attacker' }
    ],
    '5-2-3': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 10, y: 72, pos: 'LWB', type: 'defender' },
        { x: 30, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 70, y: 78, pos: 'CB', type: 'defender' },
        { x: 90, y: 72, pos: 'RWB', type: 'defender' },
        { x: 38, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 20, y: 25, pos: 'LW', type: 'attacker' },
        { x: 50, y: 20, pos: 'ST', type: 'attacker' },
        { x: 80, y: 25, pos: 'RW', type: 'attacker' }
    ],
    // ── FORMATIONS CUSTOM ──────────────────────────────
    // Double pivot + 2 MAM + 2 AC (Klopp / pressing offensif)
    '4-2-2-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 38, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 62, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 25, y: 40, pos: 'AM', type: 'midfielder' },
        { x: 75, y: 40, pos: 'AM', type: 'midfielder' },
        { x: 35, y: 20, pos: 'ST', type: 'attacker' },
        { x: 65, y: 20, pos: 'ST', type: 'attacker' }
    ],
    // Double pivot + 4 attaquants (ultra offensif)
    '4-2-4': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 38, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 62, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 10, y: 25, pos: 'LW', type: 'attacker' },
        { x: 35, y: 18, pos: 'ST', type: 'attacker' },
        { x: 65, y: 18, pos: 'ST', type: 'attacker' },
        { x: 90, y: 25, pos: 'RW', type: 'attacker' }
    ],
    // Losange : MD + 2MC + MAM + 2AC
    '4-1-2-1-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 50, y: 63, pos: 'DM', type: 'midfielder' },
        { x: 30, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 70, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 33, pos: 'AM', type: 'midfielder' },
        { x: 35, y: 18, pos: 'ST', type: 'attacker' },
        { x: 65, y: 18, pos: 'ST', type: 'attacker' }
    ],
    // 3 DC + 2 MD + 5 offensifs (Guardiola possession / 3-2-5)
    '3-2-5': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 35, y: 60, pos: 'DM', type: 'midfielder' },
        { x: 65, y: 60, pos: 'DM', type: 'midfielder' },
        { x: 10, y: 28, pos: 'LW', type: 'attacker' },
        { x: 30, y: 18, pos: 'ST', type: 'attacker' },
        { x: 50, y: 15, pos: 'ST', type: 'attacker' },
        { x: 70, y: 18, pos: 'ST', type: 'attacker' },
        { x: 90, y: 28, pos: 'RW', type: 'attacker' }
    ],
    // 4 def + 6 milieux + 0 AC (Tiki-taka, faux 9)
    '4-6-0': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 38, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 62, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 15, y: 42, pos: 'LM', type: 'midfielder' },
        { x: 35, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 65, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 85, y: 42, pos: 'RM', type: 'midfielder' }
    ],
    // 3 blocs de 3 + 1 AC (jeu positionnel pur)
    '3-3-3-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 20, y: 60, pos: 'DM', type: 'midfielder' },
        { x: 50, y: 63, pos: 'DM', type: 'midfielder' },
        { x: 80, y: 60, pos: 'DM', type: 'midfielder' },
        { x: 20, y: 38, pos: 'AM', type: 'midfielder' },
        { x: 50, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 80, y: 38, pos: 'AM', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    // 3 DC + 2 MD + 4 att larges + 1 AC (pressing + largeur)
    '3-2-4-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 38, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 62, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 10, y: 35, pos: 'LW', type: 'attacker' },
        { x: 35, y: 30, pos: 'AM', type: 'attacker' },
        { x: 65, y: 30, pos: 'AM', type: 'attacker' },
        { x: 90, y: 35, pos: 'RW', type: 'attacker' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    // 4 def + 1 MD + 3 CM + 2 AC (milieu dense + 2 AC)
    '4-1-3-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 50, y: 63, pos: 'DM', type: 'midfielder' },
        { x: 25, y: 45, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 75, y: 45, pos: 'CM', type: 'midfielder' },
        { x: 35, y: 20, pos: 'ST', type: 'attacker' },
        { x: 65, y: 20, pos: 'ST', type: 'attacker' }
    ],
    // 5 def + 1 MD + 4 att (contre-attaque depuis un bloc bas)
    '5-1-4': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 10, y: 72, pos: 'LWB', type: 'defender' },
        { x: 30, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 70, y: 78, pos: 'CB', type: 'defender' },
        { x: 90, y: 72, pos: 'RWB', type: 'defender' },
        { x: 50, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 10, y: 28, pos: 'LW', type: 'attacker' },
        { x: 35, y: 20, pos: 'ST', type: 'attacker' },
        { x: 65, y: 20, pos: 'ST', type: 'attacker' },
        { x: 90, y: 28, pos: 'RW', type: 'attacker' }
    ],
    // 2 DC + 3 milieux + 5 att (ultra offensif, tout ou rien)
    '2-3-5': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 35, y: 80, pos: 'CB', type: 'defender' },
        { x: 65, y: 80, pos: 'CB', type: 'defender' },
        { x: 15, y: 55, pos: 'LM', type: 'midfielder' },
        { x: 50, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 85, y: 55, pos: 'RM', type: 'midfielder' },
        { x: 10, y: 28, pos: 'LW', type: 'attacker' },
        { x: 28, y: 18, pos: 'ST', type: 'attacker' },
        { x: 50, y: 15, pos: 'ST', type: 'attacker' },
        { x: 72, y: 18, pos: 'ST', type: 'attacker' },
        { x: 90, y: 28, pos: 'RW', type: 'attacker' }
    ],
    // Sarri — 3 CM + 1 trequartista + 2 AC
    '4-3-1-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 25, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 58, pos: 'CM', type: 'midfielder' },
        { x: 75, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 38, pos: 'AM', type: 'midfielder' },
        { x: 35, y: 20, pos: 'ST', type: 'attacker' },
        { x: 65, y: 20, pos: 'ST', type: 'attacker' }
    ],
    // 3 DC + 2 pistons + 2 CM + 1 MAM + 2 AC
    '3-4-1-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 10, y: 52, pos: 'LWB', type: 'midfielder' },
        { x: 38, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 62, y: 55, pos: 'CM', type: 'midfielder' },
        { x: 90, y: 52, pos: 'RWB', type: 'midfielder' },
        { x: 50, y: 35, pos: 'AM', type: 'midfielder' },
        { x: 35, y: 18, pos: 'ST', type: 'attacker' },
        { x: 65, y: 18, pos: 'ST', type: 'attacker' }
    ],
    // 5 def + 2 MD + 2 MAM + 1 AC (compact puis sortie)
    '5-2-2-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 10, y: 72, pos: 'LWB', type: 'defender' },
        { x: 30, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 70, y: 78, pos: 'CB', type: 'defender' },
        { x: 90, y: 72, pos: 'RWB', type: 'defender' },
        { x: 38, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 62, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 30, y: 38, pos: 'AM', type: 'midfielder' },
        { x: 70, y: 38, pos: 'AM', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    // 5 milieux à plat sans MD ancré (différent du 4-1-4-1)
    '4-5-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 15, y: 75, pos: 'LB', type: 'defender' },
        { x: 35, y: 78, pos: 'CB', type: 'defender' },
        { x: 65, y: 78, pos: 'CB', type: 'defender' },
        { x: 85, y: 75, pos: 'RB', type: 'defender' },
        { x: 10, y: 48, pos: 'LM', type: 'midfielder' },
        { x: 28, y: 50, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 52, pos: 'CM', type: 'midfielder' },
        { x: 72, y: 50, pos: 'CM', type: 'midfielder' },
        { x: 90, y: 48, pos: 'RM', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    // 3 DC + 1 MD + 3 CM + 3 att (pressing haut Bielsa)
    '3-1-3-3': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 65, pos: 'DM', type: 'midfielder' },
        { x: 20, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 50, pos: 'CM', type: 'midfielder' },
        { x: 80, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 15, y: 25, pos: 'LW', type: 'attacker' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' },
        { x: 85, y: 25, pos: 'RW', type: 'attacker' }
    ],
    // Forum FM-Arena — 2 DC + 3 mid + 2 MAM + 3 att (LXS formation)
    '2-3-2-3': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 35, y: 80, pos: 'CB', type: 'defender' },
        { x: 65, y: 80, pos: 'CB', type: 'defender' },
        { x: 15, y: 58, pos: 'LM', type: 'midfielder' },
        { x: 50, y: 62, pos: 'CM', type: 'midfielder' },
        { x: 85, y: 58, pos: 'RM', type: 'midfielder' },
        { x: 28, y: 40, pos: 'AM', type: 'midfielder' },
        { x: 72, y: 40, pos: 'AM', type: 'midfielder' },
        { x: 15, y: 22, pos: 'LW', type: 'attacker' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' },
        { x: 85, y: 22, pos: 'RW', type: 'attacker' }
    ],
    // Forum FM-Arena — 5 def + 1 MD + 3 CM + 1 AC
    '5-1-3-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 10, y: 72, pos: 'LWB', type: 'defender' },
        { x: 30, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 70, y: 78, pos: 'CB', type: 'defender' },
        { x: 90, y: 72, pos: 'RWB', type: 'defender' },
        { x: 50, y: 60, pos: 'DM', type: 'midfielder' },
        { x: 25, y: 45, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 48, pos: 'CM', type: 'midfielder' },
        { x: 75, y: 45, pos: 'CM', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ],
    // Forum FM-Arena "Purge" — 5 def + 2 MD + 1 MAM + 2 AC
    '5-2-1-2': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 10, y: 72, pos: 'LWB', type: 'defender' },
        { x: 30, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 70, y: 78, pos: 'CB', type: 'defender' },
        { x: 90, y: 72, pos: 'RWB', type: 'defender' },
        { x: 38, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 62, y: 58, pos: 'DM', type: 'midfielder' },
        { x: 50, y: 38, pos: 'AM', type: 'midfielder' },
        { x: 35, y: 20, pos: 'ST', type: 'attacker' },
        { x: 65, y: 20, pos: 'ST', type: 'attacker' }
    ],
    // 3 DC + 6 milieux + 1 AC (contrôle total, ultra dense)
    '3-6-1': [
        { x: 50, y: 92, pos: 'GK', type: 'goalkeeper' },
        { x: 25, y: 78, pos: 'CB', type: 'defender' },
        { x: 50, y: 80, pos: 'CB', type: 'defender' },
        { x: 75, y: 78, pos: 'CB', type: 'defender' },
        { x: 10, y: 58, pos: 'LWB', type: 'midfielder' },
        { x: 30, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 50, y: 60, pos: 'CM', type: 'midfielder' },
        { x: 70, y: 62, pos: 'DM', type: 'midfielder' },
        { x: 90, y: 58, pos: 'RWB', type: 'midfielder' },
        { x: 50, y: 38, pos: 'AM', type: 'midfielder' },
        { x: 50, y: 18, pos: 'ST', type: 'attacker' }
    ]
};

// FM26 Suggested OOP Formations for each IP Formation
const SUGGESTED_OOP_FORMATIONS = {
    '4-4-2': ['4-4-2', '4-4-1-1', '4-1-4-1'],
    '4-4-2-diamond': ['4-1-4-1', '4-4-2', '4-3-2-1'],
    '4-3-3': ['4-1-4-1', '4-4-2', '4-4-1-1'],
    '4-3-3-dm': ['4-1-4-1', '4-4-1-1', '4-4-2'],
    '4-2-3-1': ['4-4-2', '4-4-1-1', '4-1-4-1'],
    '4-1-4-1': ['4-1-4-1', '4-4-2', '4-4-1-1'],
    '4-3-2-1': ['4-1-4-1', '4-4-2', '4-3-2-1'],
    '4-4-1-1': ['4-4-1-1', '4-4-2', '4-1-4-1'],
    '3-5-2': ['5-3-2', '5-4-1', '3-5-2'],
    '3-4-3': ['5-4-1', '5-3-2', '3-4-3'],
    '3-4-2-1': ['5-4-1', '5-3-2', '3-4-2-1'],
    '3-1-4-2': ['5-3-2', '5-4-1', '3-1-4-2'],
    '5-3-2': ['5-3-2', '5-4-1', '5-2-3'],
    '5-4-1': ['5-4-1', '5-3-2', '5-2-3'],
    '5-2-3': ['5-4-1', '5-3-2', '5-2-3'],
    // Custom formations
    '4-2-2-2': ['4-4-2', '4-1-4-1', '4-4-1-1'],
    '4-2-4':   ['4-4-2', '4-1-4-1', '4-4-1-1'],
    '4-1-2-1-2': ['4-1-4-1', '4-4-2', '4-3-2-1'],
    '3-2-5':   ['5-3-2', '5-4-1', '3-5-2'],
    '4-6-0':   ['4-1-4-1', '4-4-2', '4-4-1-1'],
    '3-3-3-1': ['5-3-2', '5-4-1', '3-5-2'],
    '3-2-4-1': ['5-3-2', '5-4-1', '3-4-2-1'],
    '4-1-3-2': ['4-4-2', '4-1-4-1', '4-4-1-1'],
    '5-1-4':   ['5-4-1', '5-3-2', '5-2-3'],
    '2-3-5':   ['4-4-2', '4-1-4-1', '5-3-2'],
    '3-6-1':   ['5-3-2', '5-4-1', '3-1-4-2'],
    '4-3-1-2': ['4-4-2', '4-1-4-1', '4-3-2-1'],
    '3-4-1-2': ['5-4-1', '5-3-2', '3-4-2-1'],
    '5-2-2-1': ['5-4-1', '5-3-2', '5-2-3'],
    '4-5-1':   ['4-1-4-1', '4-4-2', '4-4-1-1'],
    '3-1-3-3': ['5-3-2', '5-4-1', '3-4-3'],
    '2-3-2-3': ['4-4-2', '4-1-4-1', '5-3-2'],
    '5-1-3-1': ['5-4-1', '5-3-2', '5-2-3'],
    '5-2-1-2': ['5-4-1', '5-3-2', '5-2-3']
};

// ==========================================
// FM26 RÔLES EN POSSESSION (IP) - Noms officiels FR
// Basé sur les vrais noms du jeu FM26
// ==========================================
const POSITION_ROLES_IP = {
    'GK': [
        { name: 'Gardien De But', description: 'Gardien classique, reste sur sa ligne' },
        { name: 'Gardien À L\'aise Au Pied', description: 'Participe à la construction, exprime sa créativité' },
        { name: 'Gardien Pragmatique', description: 'Prudent, reste en place, sécurité avant tout' }
    ],
    'CB': [
        { name: 'Défenseur Central', description: 'Défenseur équilibré, reste en place' },
        { name: 'Défenseur Central Avancé', description: 'Monte comme MD, exprime sa créativité' },
        { name: 'Défenseur Central À L\'aise Au Pied', description: 'Relance proprement, reste en place' },
        { name: 'Défenseur Central Strict', description: 'Prudent, reste en place, très défensif' }
    ],
    'LB': [
        { name: 'Arrière Latéral', description: 'Latéral équilibré, reste excentré' },
        { name: 'Latéral Offensif', description: 'Monte davantage, reste excentré' },
        { name: 'Latéral Offensif Intérieur', description: 'Reste en place, repique à l\'intérieur comme MD' },
        { name: 'Arrière Latéral Intérieur', description: 'Reste en place, repique à l\'intérieur comme DC' },
        { name: 'Latéral Offensif Meneur De Jeu', description: 'Repique à l\'intérieur comme MD, créatif' }
    ],
    'RB': [
        { name: 'Arrière Latéral', description: 'Latéral équilibré, reste excentré' },
        { name: 'Latéral Offensif', description: 'Monte davantage, reste excentré' },
        { name: 'Latéral Offensif Intérieur', description: 'Reste en place, repique à l\'intérieur comme MD' },
        { name: 'Arrière Latéral Intérieur', description: 'Reste en place, repique à l\'intérieur comme DC' },
        { name: 'Latéral Offensif Meneur De Jeu', description: 'Repique à l\'intérieur comme MD, créatif' }
    ],
    'LWB': [
        { name: 'Latéral Offensif', description: 'Monte davantage, reste excentré' },
        { name: 'Latéral Offensif Avancé', description: 'Très haut, presque ailier' },
        { name: 'Latéral Offensif Intérieur', description: 'Reste en place, repique à l\'intérieur comme MD' },
        { name: 'Latéral Offensif Meneur De Jeu', description: 'Repique à l\'intérieur comme MD, créatif' }
    ],
    'RWB': [
        { name: 'Latéral Offensif', description: 'Monte davantage, reste excentré' },
        { name: 'Latéral Offensif Avancé', description: 'Très haut, presque ailier' },
        { name: 'Latéral Offensif Intérieur', description: 'Reste en place, repique à l\'intérieur comme MD' },
        { name: 'Latéral Offensif Meneur De Jeu', description: 'Repique à l\'intérieur comme MD, créatif' }
    ],
    'DM': [
        { name: 'Milieu Défensif', description: 'Protection devant la défense, reste en place, prudent' },
        { name: 'Meneur De Jeu En Retrait', description: 'Reste en place, exprime sa créativité' },
        { name: 'Demi-Centre', description: 'Redescend comme DC, prudent' }
    ],
    'CM': [
        { name: 'Milieu Axial', description: 'Milieu équilibré de base' },
        { name: 'Milieu Offensif', description: 'Trouve des espaces entre les lignes, danger devant le but' },
        { name: 'Meneur De Jeu Avancé', description: 'Trouve des espaces, exprime sa créativité' },
        { name: 'Milieu De Couloir', description: 'Prend les espaces, crée le danger' },
        { name: 'Meneur De Jeu Du Milieu', description: 'Exprime sa créativité, dicte le tempo' }
    ],
    'AM': [
        { name: 'Milieu Offensif', description: 'Trouve des espaces entre les lignes, danger devant le but' },
        { name: 'Meneur De Jeu Avancé', description: 'Trouve des espaces, exprime sa créativité' },
        { name: 'Rôle Libre', description: 'Exprime sa créativité, crée le danger' },
        { name: 'Deuxième Avant-Centre', description: 'Monte comme BT, danger devant le but' },
        { name: 'Milieu De Couloir', description: 'Prend les espaces, crée le danger' }
    ],
    'LM': [
        { name: 'Milieu Latéral', description: 'Reste en place, reste excentré' },
        { name: 'Ailier', description: 'Reste excentré, crée le danger' },
        { name: 'Ailier Meneur De Jeu', description: 'Repique à l\'intérieur, exprime sa créativité' },
        { name: 'Ailier Intérieur', description: 'Repique à l\'intérieur, crée le danger' }
    ],
    'RM': [
        { name: 'Milieu Latéral', description: 'Reste en place, reste excentré' },
        { name: 'Ailier', description: 'Reste excentré, crée le danger' },
        { name: 'Ailier Meneur De Jeu', description: 'Repique à l\'intérieur, exprime sa créativité' },
        { name: 'Ailier Intérieur', description: 'Repique à l\'intérieur, crée le danger' }
    ],
    'LW': [
        { name: 'Ailier', description: 'Reste excentré, crée le danger' },
        { name: 'Attaquant Intérieur', description: 'Repique à l\'intérieur, danger devant le but' },
        { name: 'Ailier Meneur De Jeu', description: 'Repique à l\'intérieur, exprime sa créativité' },
        { name: 'Attaquant Désaxé', description: 'Reste excentré, danger devant le but' },
        { name: 'Ailier Intérieur', description: 'Repique à l\'intérieur, crée le danger' }
    ],
    'RW': [
        { name: 'Ailier', description: 'Reste excentré, crée le danger' },
        { name: 'Attaquant Intérieur', description: 'Repique à l\'intérieur, danger devant le but' },
        { name: 'Ailier Meneur De Jeu', description: 'Repique à l\'intérieur, exprime sa créativité' },
        { name: 'Attaquant Désaxé', description: 'Reste excentré, danger devant le but' },
        { name: 'Ailier Intérieur', description: 'Repique à l\'intérieur, crée le danger' }
    ],
    'ST': [
        { name: 'Attaquant En Retrait', description: 'Redescend dans les espaces, fait le lien dans le jeu' },
        { name: 'Attaquant Central', description: 'Danger devant le but, finisseur classique' },
        { name: 'Attaquant Pivot', description: 'Joue sur la dernière ligne, fait le lien dans le jeu' },
        { name: 'Renard Des Surfaces', description: 'Joue sur la dernière ligne, danger devant le but' },
        { name: 'Attaquant De Couloir', description: 'Prend les espaces, danger devant le but' },
        { name: 'Faux Neuf', description: 'Redescend comme MO(C), fait le lien dans le jeu' }
    ]
};

// ==========================================
// FM26 RÔLES HORS POSSESSION (OOP) - Noms officiels FR
// Basé sur les vrais noms du jeu FM26
// ==========================================
const POSITION_ROLES_OOP = {
    'GK': [
        { name: 'Gardien De But', description: 'Rôle par défaut' },
        { name: 'Gardien Libéro', description: 'Sort de ses buts, proactif' },
        { name: 'Gardien Sur La Ligne', description: 'Reste sur la ligne, réactif' }
    ],
    'CB': [
        { name: 'Défenseur Central', description: 'Défense positionnelle classique' },
        { name: 'Défenseur Central Stoppeur', description: 'Dézone, sûr de lui' },
        { name: 'Défenseur Central De Couverture', description: 'Reste en place, retenus' }
    ],
    'LB': [
        { name: 'Arrière Latéral', description: 'Rôle équilibré par défaut' },
        { name: 'Arrière Latéral De Pressing', description: 'Monte, sûr de lui' },
        { name: 'Arrière Latéral En Retrait', description: 'Reste en place, prudent' }
    ],
    'RB': [
        { name: 'Arrière Latéral', description: 'Rôle équilibré par défaut' },
        { name: 'Arrière Latéral De Pressing', description: 'Monte, sûr de lui' },
        { name: 'Arrière Latéral En Retrait', description: 'Reste en place, prudent' }
    ],
    'LWB': [
        { name: 'Latéral Offensif', description: 'Rôle équilibré par défaut' },
        { name: 'Latéral Offensif De Pressing', description: 'Monte, sûr de lui' },
        { name: 'Latéral Offensif En Retrait', description: 'Reste en place, prudent' }
    ],
    'RWB': [
        { name: 'Latéral Offensif', description: 'Rôle équilibré par défaut' },
        { name: 'Latéral Offensif De Pressing', description: 'Monte, sûr de lui' },
        { name: 'Latéral Offensif En Retrait', description: 'Reste en place, prudent' }
    ],
    'DM': [
        { name: 'Milieu Défensif', description: 'Rôle équilibré par défaut' },
        { name: 'Milieu Défensif En Retrait', description: 'Redescend comme DC' },
        { name: 'Milieu Défensif De Couverture', description: 'Reste en place, prudent' }
    ],
    'CM': [
        { name: 'Milieu Axial', description: 'Rôle équilibré par défaut' },
        { name: 'Milieu Axial De Pressing', description: 'Monte, sûr de lui' },
        { name: 'Milieu Axial De Couverture', description: 'Reste en place, prudent' }
    ],
    'AM': [
        { name: 'Milieu Offensif', description: 'Rôle équilibré par défaut' },
        { name: 'Milieu Offensif De Couverture', description: 'Redescend en couverture, soutient la défense' },
        { name: 'Milieu De Terrain Offensif De Contre-Attaque Axiale', description: 'Reste haut, joue les contre-attaques' }
    ],
    'LM': [
        { name: 'Milieu Latéral', description: 'Rôle équilibré par défaut' },
        { name: 'Milieu Latéral De Couverture', description: 'Redescend en couverture, soutient la défense' },
        { name: 'Milieu Latéral De Contre-Attaque', description: 'Reste haut, joue les contre-attaques' }
    ],
    'RM': [
        { name: 'Milieu Latéral', description: 'Rôle équilibré par défaut' },
        { name: 'Milieu Latéral De Couverture', description: 'Redescend en couverture, soutient la défense' },
        { name: 'Milieu Latéral De Contre-Attaque', description: 'Reste haut, joue les contre-attaques' }
    ],
    'LW': [
        { name: 'Ailier', description: 'Rôle équilibré par défaut' },
        { name: 'Ailier De Couverture', description: 'Redescend en couverture, soutient la défense' },
        { name: 'Ailier Intérieur De Contre-Attaque', description: 'Reste haut, joue les contre-attaques' },
        { name: 'Ailier De Contre-Attaque', description: 'Reste haut, joue les contre-attaques' }
    ],
    'RW': [
        { name: 'Ailier', description: 'Rôle équilibré par défaut' },
        { name: 'Ailier De Couverture', description: 'Redescend en couverture, soutient la défense' },
        { name: 'Ailier Intérieur De Contre-Attaque', description: 'Reste haut, joue les contre-attaques' },
        { name: 'Ailier De Contre-Attaque', description: 'Reste haut, joue les contre-attaques' }
    ],
    'ST': [
        { name: 'Attaquant Central', description: 'Rôle équilibré par défaut' },
        { name: 'Attaquant Central De Couverture', description: 'Redescend en couverture, soutient la défense' },
        { name: 'Avant-Centre Point D\'appui Axial', description: 'Reste haut, joue les contre-attaques' }
    ]
};

// ==========================================
// FM26 CONSIGNES INDIVIDUELLES - Individual Player Instructions
// Basé sur le système officiel FM26 (Avec le ballon / Sans le ballon)
// ==========================================
const PLAYER_INSTRUCTIONS = {
    withBall: [
        {
            id: 'pi-attacking-width',
            name: 'Largeur du jeu offensif',
            tooltip: 'Position latérale du joueur en possession.\n● Prenez les couloirs : colle la touche, étire la défense. Contre les IWB/IW/IF/AP pour compenser le manque de largeur.\n● Restez dans l\'axe : force les runs centraux, utile avec des ailiers qui coupent.\n● Prenez les espaces : s\'adapte aux zones libres.',
            positions: ['LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'narrower', label: 'Restez dans l\'axe', desc: 'Forces les runs vers l\'intérieur' },
                { value: 'standard', label: 'Standard', desc: '' },
                { value: 'wider', label: 'Prenez les couloirs', desc: 'Colle la touche, étire la défense' },
                { value: 'spaces', label: 'Prenez les espaces', desc: 'S\'adapte aux zones libres' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-run-direction',
            name: 'Direction des courses balle au pied',
            tooltip: 'Sens de progression balle au pied pour les joueurs larges.\n⚠️ Le pied fort doit correspondre au côté : Pied droit → côté droit pour longer la ligne, pied gauche → côté gauche.\n\n● Prenez le couloir (Run Wide) : longe la ligne, mobilise les joueurs centraux à s\'élargir. Idéal si bon dribble + centre + vitesse. Se combine avec un attaquant qui fait le run intérieur. Peut compenser un manque de largeur sur les rôles IWB/IW/IF/AP.\n\n● Repiquez dans l\'axe (Cut Inside) : entre dans la zone dorée et les channels. Ouvre le jeu pour faire la passe, tirer de loin ou finir. Nécessite : dribble + agilité + (vision/passes OU frappe/finition).',
            positions: ['LB', 'RB', 'LWB', 'RWB', 'LM', 'RM', 'LW', 'RW'],
            options: [
                { value: 'inside', label: 'Repiquez dans l\'axe', desc: 'Pied fort opposé au côté — zone dorée, tir ou passe décisive' },
                { value: 'standard', label: 'Standard', desc: '' },
                { value: 'outside', label: 'Prenez le couloir balle au pied', desc: 'Pied fort côté du terrain — longe la ligne, centre ou dépasse' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-run-frequency',
            name: 'Fréquence des courses',
            tooltip: 'Fréquence à laquelle le joueur effectue des courses sans ballon.\n● Plus souvent : monte davantage, crée des décalages, demande physique.\n● Moins souvent : reste en place, conserve l\'énergie, sécurise la structure.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'more', label: 'Effectuez plus de courses', desc: 'Monte davantage, crée des décalages' },
                { value: 'standard', label: 'Standard', desc: '' },
                { value: 'less', label: 'Effectuez moins de courses', desc: 'Reste en place, conserve l\'énergie' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-forward-runs',
            name: 'Courses vers l\'avant',
            tooltip: 'Tendance du joueur à se projeter vers l\'avant hors possession.\n● Montez davantage : s\'infiltre dans les espaces derrière la défense. Idéal pour MO/milieux box-to-box avec End + Ant élevés.\n● Restez en place : sécurise sa zone, protège la structure défensive. Essentiel pour les MDF et DC.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'more', label: 'Montez davantage', desc: 'Runs en profondeur, demande End + Anticipation' },
                { value: 'standard', label: 'Standard', desc: '' },
                { value: 'hold', label: 'Restez en place', desc: 'Sécurise la structure, protège derrière' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-freedom',
            name: 'Liberté de mouvement',
            tooltip: 'Décroche-t-il de son poste pour chercher le ballon ?\n● Décrochez plus souvent : s\'éloigne de sa position pour créer et recevoir. Idéal pour les meneurs créatifs (Vis + Déc + Compo).\n● Suivez le positionnement : reste strictement à son poste, prévisible mais structuré.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'roam', label: 'Décrochez plus souvent', desc: 'Cherche le ballon hors de sa zone, créatif' },
                { value: 'hold', label: 'Suivez le positionnement', desc: 'Reste à son poste, structuré' }
            ],
            default: 'hold'
        },
        {
            id: 'pi-hold-ball',
            name: 'Gardez la balle (Pivot)',
            tooltip: 'Augmente le temps entre réception et progression — le joueur temporise avant d\'agir.\n● Réduit la propension à dribbler au profit d\'une prise de décision plus posée.\n● Idéal pour les joueurs avec : 1ère touche + Équilibre + Compo + Force (tenir sous pression), et Passes + Vision + Tech + Déc (playmaking).\n● Excellent pour les ailiers intérieurs dans un système de possession : plutôt que de dire à toute l\'équipe de moins dribbler, on cible uniquement eux.\n● Se combine parfaitement avec les dédoublements ext./int. : le joueur conserve le ballon pendant que le soutien arrive.',
            positions: ['AM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'no', label: 'Non', desc: '' },
                { value: 'yes', label: 'Oui — Temporise, attend le soutien', desc: '1ère touche + Équilibre + Compo + Force requis' }
            ],
            default: 'no'
        },
        {
            id: 'pi-shooting',
            name: 'Tirs',
            tooltip: 'Fréquence à laquelle le joueur choisit de tirer plutôt que de passer.\n● Tirez plus souvent : utile pour les rôles de soutien (F9, DLF, CF(s)) qui shootent peu par défaut. Aussi pour masquer un faible niveau de passes/vision — mieux vaut tirer que perdre balle.\n● Tirez moins souvent : conserve la possession, cherche une meilleure occasion. Convient aux systèmes de possession.\n⚠️ Tirer plus convient aux styles directs (espace, secondes chances, corners). Tirer moins convient aux styles de possession.',
            positions: ['DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'less', label: 'Tirez moins souvent', desc: 'Cherche une meilleure occasion, garde la balle' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'more', label: 'Tirez plus souvent', desc: 'Crée secondes chances/corners, masque faible vision' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-pass-risk',
            name: 'Risque des passes',
            tooltip: 'Le risque est relatif : si le joueur a beaucoup d\'options proches, la passe courte est la plus sûre et la longue est risquée — et vice versa.\n\n● Prenez plus de risques : évalue aussi les options lointaines même si options proches disponibles. À utiliser en style possession (peu de runners) pour créer de la progression. Nécessite : Pas + Tech + Vis + Compo + Déc + Trav + Flair.\n\n● Prenez moins de risques : ne passe qu\'aux options proches. À utiliser en style direct pour éviter les erreurs fatales (perte en terrain adverse = contre immédiat). Utile pour joueurs avec faible Déc/Compo.\n\n⚠️ Plus de risques en style direct = désastre. Moins de risques en style possession = stagnation.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'less', label: 'Prenez moins de risques', desc: 'Options proches seulement — style direct, joueurs limités' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'more', label: 'Prenez plus de risques', desc: 'Évalue les options lointaines — style possession, bon passeur' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-passing-style',
            name: 'Directness des passes',
            tooltip: 'Distance des passes évaluées par le joueur (exception individuelle à la consigne d\'équipe).\n● Plus directes : évalue les options éloignées. Excellent pour un DC défensif (DLP(d)) dans un système de possession — crée de la progression sans changer le rôle en support. Requiert : Pas + Tech + Vis.\n● Plus courtes : cherche les options proches. Idéal pour un joueur offensif dans un style direct — il linkera ses coéquipiers au lieu de forcer seul. Requiert : Trav + Compo + Déc.\n⚠️ Un joueur défensif avec passes directes = ouverture de jeu. Un joueur offensif avec passes courtes = liaison.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'shorter', label: 'Plus courtes', desc: 'Options proches — Trav + Compo + Déc' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'direct', label: 'Plus directes', desc: 'Options lointaines — Pas + Tech + Vis' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-dribbling',
            name: 'Dribbles',
            tooltip: 'Propension du joueur à progresser balle au pied plutôt que de passer.\n● Dribblez plus : progression balle au pied — utile si faible niveau de passes/vision (masque la faiblesse). Requiert : Drib + Vitesse/Accél + Agilité.\n● Dribblez moins : force à passer — idéal si bon passeur dans un système de possession. Réduit les pertes aléatoires.\n⚠️ Dribbler plus convient au style direct (tempo rapide). Dribbler moins convient au style possession (tempo lent).',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'more', label: 'Dribblez plus', desc: 'Progression balle au pied — Drib + Vit + Agilité' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'less', label: 'Dribblez moins', desc: 'Force la passe — bon pour style possession' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-cross-from',
            name: 'Centrer de',
            tooltip: 'D\'où le joueur large choisit de centrer.\n\n● Ligne de but (Byline) : doit d\'abord y arriver — nécessite dribble + vitesse (pas forcément bon centreur). Provoque le repli de la défense très bas → espace pour les milieux à l\'entrée de la surface. Synergie : centres à ras de terre (TI) + viser le premier poteau.\n\n● De loin (Deep) : requiert une excellente qualité de centre (Centre élevé). Synergie avec centres flottants (TI) — depuis la profondeur, le gardien lit moins bien la trajectoire → têtes plongeantes, remises. Viser le second poteau pour maximiser l\'effet.\n\n● Centre (Cross aim Centre) : fonctionne avec centres whippés (TI). La largeur du but est ciblée, difficile à défendre. Compatible byline ou deep.',
            positions: ['LB', 'RB', 'LWB', 'RWB', 'LM', 'RM', 'LW', 'RW'],
            options: [
                { value: 'byline', label: 'Depuis la ligne de but', desc: 'Dribble+vitesse requis, pas forcément bon centreur — cutbacks, ras de terre' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'deep', label: 'De loin (centres flottants)', desc: 'Bonne qualité de centre requise — gardien moins à l\'aise sur la trajectoire' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-cross-aim',
            name: 'Cible des centres',
            tooltip: 'Vers où diriger le centre.\n● Premier poteau : pour les attaquants rapides qui devancent leur défenseur. Se combine avec Cross depuis la ligne de but + centres à ras de terre.\n● Second poteau : pour les attaquants puissants en l\'air. Se combine avec Cross de loin + centres flottants.\n● Centre/Penalty spot : avec centres whippés (TI). Cible la largeur du but, difficile à défendre.\n● Attaquant cible : dirige tous les centres vers le Pivot, quel que soit son placement. Idéal pour un finisseur polyvalent.',
            positions: ['LB', 'RB', 'LWB', 'RWB', 'LM', 'RM', 'LW', 'RW'],
            options: [
                { value: 'near-post', label: 'Premier poteau', desc: 'Attaquants rapides — avec byline + centres bas' },
                { value: 'standard', label: 'Normal (le joueur choisit)', desc: '' },
                { value: 'far-post', label: 'Second poteau', desc: 'Attaquants aériens — avec deep + centres flottants' },
                { value: 'center', label: 'Centre du but', desc: 'Avec centres whippés (TI)' },
                { value: 'target-man', label: 'Vers l\'attaquant cible', desc: 'Dirige tout vers le Pivot, finisseur polyvalent' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-crossing-frequency',
            name: 'Fréquence des centres',
            tooltip: 'Combien de fois le joueur choisit de centrer.\n● Centrer plus souvent : style direct avec beaucoup de runners dans la surface. Joueur avec faible niveau de passes/vision — mieux vaut centrer que perdre balle.\n● Centrer moins souvent : style possession — 1 ou 2 joueurs seulement dans la surface, chercher une meilleure occasion.\n⚠️ Centrer plus convient au style direct (tempo rapide). Centrer moins convient au style possession.',
            positions: ['LB', 'RB', 'LWB', 'RWB', 'LM', 'RM', 'LW', 'RW'],
            options: [
                { value: 'less', label: 'Centrer moins souvent', desc: 'Cherche une meilleure occasion — style possession' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'more', label: 'Centrer plus souvent', desc: 'Beaucoup de runners en surface — style direct' }
            ],
            default: 'standard'
        }
    ],
    withoutBall: [
        {
            id: 'pi-pressing',
            name: 'Pressing',
            tooltip: 'Intensité du pressing individuel (exception à la consigne d\'équipe).\n● Plus souvent : idéal pour les attaquants/milieux avec Vol + Trav + End élevés. Perturbe la construction adverse.\n● Moins souvent : économise l\'énergie, garde la forme défensive. Pour joueurs avec faible endurance ou dans un bloc bas.\n⚠️ Le pressing individuel est basé sur la consigne d\'équipe — un joueur en Défense presssera rarement même avec cette PI.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'much-more', label: 'Beaucoup plus souvent', desc: 'Pressing maximal — Vol + Trav + End élevés requis' },
                { value: 'more', label: 'Plus souvent', desc: 'Perturbe la construction adverse' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'less', label: 'Moins souvent', desc: 'Économise l\'énergie, garde la forme' },
                { value: 'much-less', label: 'Beaucoup moins souvent', desc: 'Quasi passif — bloc très bas' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-tackling',
            name: 'Tacles',
            tooltip: 'Agressivité dans les duels défensifs individuels.\n● S\'engager plus : récupère plus de ballons, plus de fautes et cartons. Pour joueurs avec bonne Tac + Anta.\n● S\'engager moins : attend le bon moment, évite les fautes. Pour joueurs moins habiles en tacle ou contre des dribbleurs dangereux.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'harder', label: 'Engagez-vous plus', desc: 'Agressif — Tac + Anticipation requis' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'ease', label: 'Engagez-vous moins', desc: 'Attend le moment, évite les cartons' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-marking',
            name: 'Marquage (serré)',
            tooltip: 'Degré de proximité avec l\'adversaire direct.\n● Marquer de plus près : colle son vis-à-vis, neutralise un joueur clé adverse. Risqué sur les appels en profondeur.\n⚠️ La consigne d\'équipe "Marquage plus serré" influence également ce paramètre globalement.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'tighter', label: 'Marquer de plus près', desc: 'Neutralise un joueur clé adverse — risqué sur appels en profondeur' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-marking-individual',
            name: 'Marquage individuel',
            tooltip: 'Assignation d\'une cible de marquage spécifique.\n● Joueur spécifique : suit un joueur adverse précis partout sur le terrain.\n● Poste spécifique : marque le joueur occupant un poste adverse donné.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'LM', 'RM', 'LW', 'RW', 'ST'],
            options: [
                { value: 'specific-player', label: 'Joueur spécifique', desc: 'Suit ce joueur partout — neutralisation d\'un danger précis' },
                { value: 'specific-position', label: 'Poste spécifique', desc: 'Marque le joueur à ce poste' },
                { value: 'standard', label: 'Normal', desc: '' }
            ],
            default: 'standard'
        },
        {
            id: 'pi-defensive-position',
            name: 'Position défensive',
            tooltip: 'Hauteur de positionnement sans ballon.\n● Rester plus haut : participe au pressing haut, laisse de l\'espace derrière. Pour milieux dans un bloc offensif.\n● Rester plus bas : sécurise derrière, idéal pour DC/DM défensifs ou pour couvrir un latéral offensif.',
            positions: ['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'LM', 'RM'],
            options: [
                { value: 'deeper', label: 'Rester plus bas', desc: 'Sécurise derrière — couvre un latéral offensif' },
                { value: 'standard', label: 'Normal', desc: '' },
                { value: 'higher', label: 'Rester plus haut', desc: 'Pressing haut, laisse de l\'espace derrière' }
            ],
            default: 'standard'
        }
    ]
};

// ==========================================
// FM26 CONSIGNES VERROUILLÉES PAR RÔLE
// Chaque rôle verrouille certaines consignes (icône cadenas dans le jeu)
// IP roles → verrouillent des consignes "Avec le ballon"
// OOP roles → verrouillent des consignes "Sans le ballon"
// ==========================================
const ROLE_LOCKED_INSTRUCTIONS = {
    // ===== RÔLES EN POSSESSION (IP) - Verrouillent "Avec le ballon" =====

    // GK
    'Gardien De But': {},
    'Gardien À L\'aise Au Pied': { 'pi-pass-risk': 'more', 'pi-passing-style': 'shorter' },
    'Gardien Pragmatique': { 'pi-pass-risk': 'less', 'pi-dribbling': 'less' },

    // CB
    'Défenseur Central': {},
    'Défenseur Central Avancé': { 'pi-forward-runs': 'more', 'pi-freedom': 'roam' },
    'Défenseur Central À L\'aise Au Pied': { 'pi-pass-risk': 'more', 'pi-freedom': 'hold' },
    'Défenseur Central Strict': { 'pi-pass-risk': 'less', 'pi-dribbling': 'less', 'pi-freedom': 'hold' },

    // LB / RB
    'Arrière Latéral': {},
    'Latéral Offensif': { 'pi-forward-runs': 'more' },
    'Latéral Offensif Intérieur': { 'pi-run-direction': 'inside' },
    'Arrière Latéral Intérieur': { 'pi-run-direction': 'inside', 'pi-freedom': 'hold' },
    'Latéral Offensif Meneur De Jeu': { 'pi-run-direction': 'inside', 'pi-pass-risk': 'more' },

    // LWB / RWB
    'Latéral Offensif Avancé': { 'pi-forward-runs': 'more', 'pi-attacking-width': 'wider' },

    // DM
    'Milieu Défensif': { 'pi-freedom': 'hold' },
    'Meneur De Jeu En Retrait': { 'pi-pass-risk': 'more', 'pi-freedom': 'hold' },
    'Demi-Centre': { 'pi-forward-runs': 'hold', 'pi-pass-risk': 'less' },

    // CM
    'Milieu Axial': {},
    'Milieu Offensif': { 'pi-forward-runs': 'more' },
    'Meneur De Jeu Avancé': { 'pi-pass-risk': 'more' },
    'Milieu De Couloir': { 'pi-forward-runs': 'more' },
    'Meneur De Jeu Du Milieu': { 'pi-pass-risk': 'more' },

    // AM
    'Rôle Libre': { 'pi-freedom': 'roam', 'pi-forward-runs': 'more' },
    'Deuxième Avant-Centre': { 'pi-forward-runs': 'more', 'pi-shooting': 'more' },

    // LM / RM
    'Milieu Latéral': {},
    'Ailier': { 'pi-attacking-width': 'wider', 'pi-run-direction': 'outside' },
    'Ailier Meneur De Jeu': { 'pi-run-direction': 'inside', 'pi-pass-risk': 'more' },
    'Ailier Intérieur': { 'pi-run-direction': 'inside' },

    // LW / RW
    'Attaquant Intérieur': { 'pi-forward-runs': 'more', 'pi-run-direction': 'inside' },
    'Attaquant Désaxé': { 'pi-attacking-width': 'wider', 'pi-forward-runs': 'more' },

    // ST
    'Attaquant En Retrait': { 'pi-forward-runs': 'hold', 'pi-hold-ball': 'yes' },
    'Attaquant Central': { 'pi-forward-runs': 'more' },
    'Attaquant Pivot': { 'pi-hold-ball': 'yes', 'pi-freedom': 'hold' },
    'Renard Des Surfaces': { 'pi-forward-runs': 'more', 'pi-shooting': 'more', 'pi-freedom': 'hold' },
    'Attaquant De Couloir': { 'pi-forward-runs': 'more' },
    'Faux Neuf': { 'pi-forward-runs': 'hold', 'pi-freedom': 'roam' },

    // ===== RÔLES HORS POSSESSION (OOP) - Verrouillent "Sans le ballon" =====

    'Gardien Libéro': {},
    'Gardien Sur La Ligne': {},

    'Défenseur Central Stoppeur': { 'pi-pressing': 'more', 'pi-tackling': 'harder' },
    'Défenseur Central De Couverture': { 'pi-pressing': 'less', 'pi-defensive-position': 'deeper' },

    'Arrière Latéral De Pressing': { 'pi-pressing': 'more' },
    'Arrière Latéral En Retrait': { 'pi-pressing': 'less', 'pi-defensive-position': 'deeper' },

    'Latéral Offensif De Pressing': { 'pi-pressing': 'more' },
    'Latéral Offensif En Retrait': { 'pi-pressing': 'less', 'pi-defensive-position': 'deeper' },

    'Milieu Défensif En Retrait': { 'pi-defensive-position': 'deeper' },
    'Milieu Défensif De Couverture': { 'pi-pressing': 'less', 'pi-defensive-position': 'deeper' },

    'Milieu Axial De Pressing': { 'pi-pressing': 'more', 'pi-tackling': 'harder' },
    'Milieu Axial De Couverture': { 'pi-pressing': 'less' },

    'Milieu Offensif De Couverture': { 'pi-pressing': 'less' },
    'Milieu De Terrain Offensif De Contre-Attaque Axiale': { 'pi-defensive-position': 'higher' },

    'Milieu Latéral De Couverture': { 'pi-pressing': 'less' },
    'Milieu Latéral De Contre-Attaque': { 'pi-defensive-position': 'higher' },

    'Ailier De Couverture': { 'pi-pressing': 'less' },
    'Ailier Intérieur De Contre-Attaque': { 'pi-defensive-position': 'higher' },
    'Ailier De Contre-Attaque': { 'pi-defensive-position': 'higher' },

    'Attaquant Central De Couverture': { 'pi-pressing': 'less' },
    'Avant-Centre Point D\'appui Axial': { 'pi-defensive-position': 'higher' }
};

// Mentality Labels
const MENTALITY_LABELS = [
    'Très Défensif',
    'Défensif',
    'Prudent',
    'Équilibré',
    'Positif',
    'Offensif',
    'Très Offensif'
];

// ==========================================
// FM26 EXPERT PRESETS - Tactiques complètes niveau coach pro
// Avec les VRAIS noms de rôles FM26 en français
// Notations: ⭐ Difficulté | 🎯 Efficacité | 💪 Physique requis
// ==========================================
const PRESETS = {
    // ==========================================
    // GUARDIOLA - Tiki-Taka FM26 (Optimisé Meta)
    // ⭐⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // Source: IRL + FM26 Meta optimisations
    // ==========================================
    'guardiola-tiki-taka': {
        name: 'Guardiola City 2024',
        coach: 'Pep Guardiola',
        team: 'Manchester City',
        formationIP: '4-3-3',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 5,
        effectiveness: 5,
        physical: 3,
        description: 'Possession dominante, latéraux inversés (Walker/Lewis inside), Rodri ancre. Foden/Bernardo demi-espaces, Haaland point focal. Adapté FM26 meta.',
        strengths: ['Contrôle total', 'Latéraux inversés FM26', 'Demi-espaces', 'Pressing intense'],
        weaknesses: ['Vulnérable transitions rapides', 'Besoin joueurs world-class'],
        
        // CONSIGNES EN POSSESSION
        instructionsIP: {
            'passing-style': 'much-shorter',        // Beaucoup plus courtes
            'tempo': 'slower',                       // Plus lent
            'width-attack': 'narrow',                // Plus axiale
            'attack-focus': 'center',                // Progression axiale
            'pass-target': 'feet',                   // Passer dans les pieds
            'crossing-patience': 'work-ball',        // Jouer le ballon dans la surface
            'crossing-style': 'low',                 // Centres à ras de terre
            'dribbling': 'standard',
            'long-shots': 'discourage',              // Dissuader tirs de loin
            'creative-freedom': 'expressive',        // Plus d'expression
            'pressing-strategy': 'manage',           // Gérer le pressing
            'set-pieces': 'no',                      // Garder le ballon en jeu
            'goal-kicks': 'short',                   // Courtes
            'distribution-target': 'cb',             // Défenseurs centraux
            'distribution-speed': 'slow',            // Ralentir le rythme
            'time-wasting': 'less',
            'counter-attack': 'hold'                 // Rester en place
        },
        
        // CONSIGNES HORS POSSESSION
        instructionsOOP: {
            'pressing-height': 'high',               // Pressing haut
            'defensive-line': 'much-higher',         // Beaucoup plus haute
            'pressing-trigger': 'much-more',         // Beaucoup plus souvent
            'defensive-transition': 'counter-press', // Contre-pressing
            'tackling': 'stay',                      // Ne pas se jeter
            'pressing-crosses': 'prevent',           // Empêcher de centrer
            'pressing-trap': 'inside',               // Attirer vers l'axe
            'defensive-behavior': 'higher',          // Rester plus haut
            'prevent-short-gk': 'yes'                // Oui
        },
        
        // Courses de soutien
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': true,                   // Dédoublement intérieur gauche
            'underlap-right': true                   // Dédoublement intérieur droite
        },
        
        // RÔLES EN POSSESSION - Vrais noms FM26
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',    // GB - Participe à la construction
            1: 'Latéral Offensif Intérieur',   // DG - Rentre en MD
            2: 'Défenseur Central À L\'aise Au Pied', // DC
            3: 'Défenseur Central À L\'aise Au Pied', // DC
            4: 'Latéral Offensif Intérieur',   // DD - Rentre en MD
            5: 'Milieu De Couloir',            // MC - Demi-espaces
            6: 'Meneur De Jeu Du Milieu',      // MC - Dicte le tempo
            7: 'Milieu De Couloir',            // MC - Demi-espaces
            8: 'Ailier Intérieur',             // AG - Rentre pour combiner
            9: 'Faux Neuf',                    // BT - Décroche pour créer
            10: 'Ailier Intérieur'             // AD - Rentre pour combiner
        },
        
        // RÔLES HORS POSSESSION - Formation 4-1-4-1
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=LM, 7=CM, 8=CM, 9=RM, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',               // GK - Sort couvrir
            1: 'Arrière Latéral De Pressing',  // LB - Presse haut
            2: 'Défenseur Central Stoppeur',   // CB - Dézone
            3: 'Défenseur Central',            // CB
            4: 'Arrière Latéral De Pressing',  // RB
            5: 'Milieu Défensif De Couverture', // DM - Écran
            6: 'Milieu Latéral De Couverture', // LM - Repli
            7: 'Milieu Axial De Pressing',     // CM
            8: 'Milieu Axial De Pressing',     // CM
            9: 'Milieu Latéral De Couverture', // RM - Repli
            10: 'Attaquant Central'            // ST - Pressing initial
        }
    },

    // ==========================================
    // KLOPP - Gegenpressing FM26 (Optimisé Meta)
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪💪 Physique
    // Source: IRL Heavy Metal + FM26 Meta pressing
    // ==========================================
    'klopp-gegenpressing': {
        name: 'Klopp Heavy Metal',
        coach: 'Jürgen Klopp',
        team: 'Dortmund / Liverpool',
        formationIP: '4-3-3',
        formationOOP: '4-4-2',
        mentality: 6,
        difficulty: 4,
        effectiveness: 5,
        physical: 5,
        description: 'Gegenpressing maximal FM26: récupération 5-6 secondes après perte. Latéraux très hauts (TAA/Robertson), milieu box-to-box, transitions 8 secondes max.',
        strengths: ['Contre-pressing FM26 optimisé', 'Transitions 8 sec', 'Latéraux hauts', 'Intensité max'],
        weaknesses: ['Fatigue fin match', 'Espace derrière latéraux'],
        
        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'much-higher',
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'space',
            'crossing-patience': 'work-ball',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'discourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'manage',
            'set-pieces': 'yes',
            'goal-kicks': 'short',
            'distribution-target': 'balanced',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'much-higher',
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },
        
        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif',
            2: 'Défenseur Central',
            3: 'Défenseur Central',
            4: 'Latéral Offensif',
            5: 'Milieu Axial',
            6: 'Meneur De Jeu Du Milieu',
            7: 'Milieu Offensif',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Ailier'
        },
        
        // RÔLES HORS POSSESSION - Formation 4-4-2
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien De But',               // GK
            1: 'Arrière Latéral De Pressing',  // LB
            2: 'Défenseur Central Stoppeur',   // CB
            3: 'Défenseur Central Stoppeur',   // CB
            4: 'Arrière Latéral De Pressing',  // RB
            5: 'Milieu Latéral De Couverture', // LM
            6: 'Milieu Axial De Pressing',     // CM
            7: 'Milieu Axial De Pressing',     // CM
            8: 'Milieu Latéral De Couverture', // RM
            9: 'Attaquant Central',            // ST
            10: 'Attaquant Central'            // ST
        }
    },

    // ==========================================
    // ANCELOTTI - Real Madrid FM26 (Equilibre + Contre)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // Source: IRL Madrid System + FM26 Meta
    // ==========================================
    'ancelotti-balanced': {
        name: 'Ancelotti Real Madrid',
        coach: 'Carlo Ancelotti',
        team: 'Real Madrid 2024',
        formationIP: '4-3-3-dm',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 3,
        description: 'L\'art de l\'équilibre. Bloc médian flexible, Bellingham/Valverde B2B dynamiques, Vinicius 1v1. Contre-attaques létales avec individualités world-class.',
        strengths: ['Flexibilité tactique', 'Contre-attaques Vinicius', 'Bellingham box-to-box', 'Clutch factor'],
        weaknesses: ['Dépendance Vinicius/Bellingham', 'Milieu parfois ouvert'],
        
        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'standard',
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'standard',
            'crossing-patience': 'standard',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'balanced',
            'set-pieces': 'no',
            'goal-kicks': 'mixed',
            'distribution-target': 'balanced',
            'distribution-speed': 'balanced',
            'time-wasting': 'normal',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'medium',
            'defensive-line': 'standard',
            'pressing-trigger': 'more',
            'defensive-transition': 'standard',
            'tackling': 'standard',
            'pressing-crosses': 'balanced',
            'pressing-trap': 'balanced',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif',
            2: 'Défenseur Central',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Milieu Défensif',
            6: 'Milieu Axial',
            7: 'Meneur De Jeu Avancé',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Attaquant Intérieur'
        },
        
        // RÔLES HORS POSSESSION - Formation 4-4-2
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien De But',               // GK
            1: 'Arrière Latéral',              // LB
            2: 'Défenseur Central',            // CB
            3: 'Défenseur Central De Couverture', // CB
            4: 'Arrière Latéral En Retrait',   // RB
            5: 'Milieu Latéral De Couverture', // LM
            6: 'Milieu Axial De Couverture',   // CM
            7: 'Milieu Axial De Couverture',   // CM
            8: 'Milieu Latéral De Couverture', // RM
            9: 'Attaquant Central',            // ST
            10: 'Attaquant Central De Couverture' // ST
        }
    },

    // ==========================================
    // MOURINHO - Anti-Football FM26 (Bloc bas optimisé)
    // ⭐⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Source: IRL Catenaccio + FM26 underdog tactics
    // ==========================================
    'mourinho-defensive': {
        name: 'Mourinho Masterclass',
        coach: 'José Mourinho',
        team: 'Inter 2010 / Chelsea',
        formationIP: '5-3-2',
        formationOOP: '5-4-1',
        mentality: 2,
        difficulty: 2,
        effectiveness: 4,
        physical: 4,
        description: 'Le Spécialiste. Bloc bas compact, xGA minimal. WB restent bas sauf contre-attaques. Set-pieces + long throws exploités. Parfait pour giant killing.',
        strengths: ['Giant killing', 'xGA minimal', 'Set-pieces', 'Contre-attaques cliniques'],
        weaknesses: ['Peu spectaculaire', 'Dépendance avant-centre'],
        
        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'slower',
            'width-attack': 'narrow',
            'attack-focus': 'balanced',
            'pass-target': 'space',
            'crossing-patience': 'early',
            'crossing-style': 'floated',
            'dribbling': 'discourage',
            'long-shots': 'standard',
            'creative-freedom': 'discipline',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'long',
            'distribution-target': 'target',
            'distribution-speed': 'fast',
            'time-wasting': 'more',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'low',
            'defensive-line': 'much-lower',
            'pressing-trigger': 'much-less',
            'defensive-transition': 'regroup',
            'tackling': 'commit',
            'pressing-crosses': 'allow',
            'pressing-trap': 'inside',
            'defensive-behavior': 'lower',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien Pragmatique',
            1: 'Latéral Offensif',             // ALG
            2: 'Défenseur Central Strict',      // DC
            3: 'Défenseur Central',             // DC
            4: 'Défenseur Central Strict',      // DC
            5: 'Latéral Offensif',             // ALD
            6: 'Milieu Axial',                 // MC
            7: 'Milieu Axial',                 // MC
            8: 'Milieu Axial',                 // MC
            9: 'Attaquant Pivot',              // BT - Dos au but
            10: 'Attaquant De Couloir'         // BT - Se déplace
        },
        
        // RÔLES HORS POSSESSION - Formation 5-4-1
        // Index: 0=GK, 1=LWB, 2=CB, 3=CB, 4=CB, 5=RWB, 6=LM, 7=CM, 8=CM, 9=RM, 10=ST
        rolesOOP: {
            0: 'Gardien Sur La Ligne',         // GK
            1: 'Latéral Offensif En Retrait',  // LWB
            2: 'Défenseur Central De Couverture', // CB
            3: 'Défenseur Central',            // CB
            4: 'Défenseur Central De Couverture', // CB
            5: 'Latéral Offensif En Retrait',  // RWB
            6: 'Milieu Latéral De Couverture', // LM
            7: 'Milieu Axial De Couverture',   // CM
            8: 'Milieu Axial De Couverture',   // CM
            9: 'Milieu Latéral De Couverture', // RM
            10: 'Avant-Centre Point D\'appui Axial' // ST
        }
    },

    // ==========================================
    // ARTETA - Arsenal Positional Play (Basé sur analyses IRL)
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // Source: Spielverlagerung - Arteta's Arsenal Rebuild
    // ==========================================
    'arteta-positional': {
        name: 'Arteta Arsenal System',
        coach: 'Mikel Arteta',
        team: 'Arsenal',
        formationIP: '4-3-3',
        formationOOP: '4-4-2',
        mentality: 5,
        difficulty: 4,
        effectiveness: 5,
        physical: 3,
        description: 'Triangles offensifs en zones larges, latéral gauche inversé (Zinchenko/Tierney dropping), latéral droit haut (Cedric/Saka combination). Pénétration des demi-espaces, pressing 4-4-2 double pivot.',
        strengths: ['Triangles offensifs fluides', 'Pénétration demi-espaces', 'Pressing 4-4-2 coordonné', 'Asymétrie exploitée'],
        weaknesses: ['Flanc gauche exposé si pressing cassé', 'Dépendance Saka/Ødegaard'],
        
        instructionsIP: {
            'passing-style': 'shorter',          // Courtes pour triangles
            'tempo': 'standard',                 // Patient
            'width-attack': 'standard',          // Triangles wide
            'attack-focus': 'right',             // Saka côté fort
            'pass-target': 'feet',               // Dans les pieds
            'crossing-patience': 'work-ball',    // Travailler le ballon
            'crossing-style': 'low',             // Cut-backs
            'dribbling': 'encourage',            // 1v1 pour Saka/Martinelli
            'long-shots': 'discourage',          // Patience
            'creative-freedom': 'balanced',
            'pressing-strategy': 'manage',
            'set-pieces': 'yes',                 // Arsenal fort sur coups de pied arrêtés
            'goal-kicks': 'short',               // Construire
            'distribution-target': 'cb',         // DC
            'distribution-speed': 'slow',        // Ralentir
            'time-wasting': 'less',
            'counter-attack': 'hold'             // Rester en place
        },
        
        instructionsOOP: {
            'pressing-height': 'high',           // Pressing haut
            'defensive-line': 'higher',          // Ligne haute
            'pressing-trigger': 'more',          // Agressif
            'defensive-transition': 'counter-press', // Contre-pressing
            'tackling': 'standard',
            'pressing-crosses': 'prevent',       // Empêcher centres
            'pressing-trap': 'inside',           // Forcer axe
            'defensive-behavior': 'higher',      // Compact haut
            'prevent-short-gk': 'yes'            // Presser gardien
        },
        
        overlaps: {
            'overlap-left': false,               // LB inversé
            'overlap-right': true,               // RB overlap avec Saka
            'underlap-left': true,               // LB dédoblement intérieur (Zinchenko)
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',     // Ramsdale/Raya
            1: 'Latéral Offensif Intérieur',    // Zinchenko - rentre en MC
            2: 'Défenseur Central À L\'aise Au Pied', // Saliba - sorties balle
            3: 'Défenseur Central',              // Gabriel
            4: 'Latéral Offensif',               // White - monte overlap
            5: 'Milieu Axial',                   // Partey - ancre
            6: 'Meneur De Jeu Du Milieu',        // Rice - distribution
            7: 'Meneur De Jeu Avancé',           // Ødegaard - demi-espace droit
            8: 'Ailier',                         // Martinelli - reste large gauche
            9: 'Attaquant Central',              // Havertz/Jesus
            10: 'Attaquant Intérieur'            // Saka - libre, rentre
        },
        
        // RÔLES HORS POSSESSION - Formation 4-4-2
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',               // GK - Sort couvrir
            1: 'Arrière Latéral De Pressing',  // LB - Presse runs courbés
            2: 'Défenseur Central Stoppeur',   // CB - Agressif
            3: 'Défenseur Central',            // CB - Couverture
            4: 'Arrière Latéral De Pressing',  // RB - Presse
            5: 'Milieu Latéral De Couverture', // LM - Resserré narrow
            6: 'Milieu Axial De Pressing',     // CM - Partey screen
            7: 'Milieu Axial De Couverture',   // CM - Ødegaard cover
            8: 'Milieu Latéral De Couverture', // RM - Resserré narrow
            9: 'Attaquant Central',            // ST - Premier rideau courbe
            10: 'Attaquant Central'            // ST - Premier rideau
        }
    },

    // ==========================================
    // SIMEONE - Cholismo 2.0 (Basé sur analyses IRL)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪💪💪 Physique
    // Source: TotalFootballAnalysis - Atlético Madrid 2020/21
    // ==========================================
    'simeone-compact': {
        name: 'Simeone Cholismo 2.0',
        coach: 'Diego Simeone',
        team: 'Atlético Madrid',
        formationIP: '4-4-2',
        formationOOP: '4-4-2',
        mentality: 3,
        difficulty: 3,
        effectiveness: 4,
        physical: 5,
        description: 'Bloc médian 4-4-2, construction en 3-2 (Hermoso dropping), force adversaire vers extérieur où le touchline = homme supplémentaire. Félix comme point focal dans les demi-espaces.',
        strengths: ['xGA le plus bas de La Liga', 'Piège pressing côtés', 'Overload surface', 'Transitions Suárez'],
        weaknesses: ['PPDA élevé (moins pressing)', 'Dépendance Félix créativité'],
        
        instructionsIP: {
            'passing-style': 'shorter',          // Construction 3-2
            'tempo': 'standard',                 // Patient build-up
            'width-attack': 'standard',
            'attack-focus': 'balanced',          // Félix demi-espaces
            'pass-target': 'feet',               // Dans les pieds
            'crossing-patience': 'standard',     // Overload surface
            'crossing-style': 'drilled',         // Centres tendus
            'dribbling': 'standard',
            'long-shots': 'standard',
            'creative-freedom': 'discipline',    // Discipline Cholismo
            'pressing-strategy': 'bypass',       // Jouer autour
            'set-pieces': 'yes',                 // Fort sur CPA
            'goal-kicks': 'short',               // Construction
            'distribution-target': 'cb',         // Vers DC (3-2)
            'distribution-speed': 'balanced',
            'time-wasting': 'normal',
            'counter-attack': 'yes'              // Transitions rapides
        },
        
        instructionsOOP: {
            'pressing-height': 'medium',         // Bloc médian
            'defensive-line': 'standard',        // Pas trop profond
            'pressing-trigger': 'standard',      // Contrôlé
            'defensive-transition': 'counter-press', // Contre-pressing
            'tackling': 'commit',                // Duels engagés
            'pressing-crosses': 'balanced',
            'pressing-trap': 'outside',          // FORCER VERS EXTÉRIEUR
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'             // Laisser construire et piéger
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',     // Oblak build-up
            1: 'Défenseur Central À L\'aise Au Pied', // Hermoso - drops into back 3
            2: 'Défenseur Central',              // Giménez
            3: 'Défenseur Central',              // Savić
            4: 'Latéral Offensif',               // Trippier - progressif
            5: 'Milieu Latéral',                 // Carrasco
            6: 'Milieu Axial',                   // Koke - fluide
            7: 'Milieu Axial',                   // De Paul
            8: 'Milieu Latéral',                 // Llorente
            9: 'Attaquant Pivot',                // Morata - dos au but
            10: 'Meneur De Jeu Avancé'           // Félix - point focal demi-espaces
        },
        
        rolesOOP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral En Retrait',     // Compact
            2: 'Défenseur Central Stoppeur',     // Agressif
            3: 'Défenseur Central De Couverture', // Libéro
            4: 'Arrière Latéral En Retrait',     // Compact
            5: 'Milieu Latéral De Couverture',   // Resserré
            6: 'Milieu Axial De Pressing',       // Koke ferme axe
            7: 'Milieu Axial De Pressing',       // De Paul duels
            8: 'Milieu Latéral De Couverture',   // Resserré
            9: 'Attaquant Central',              // Course courbée piège
            10: 'Attaquant Central De Couverture' // Suárez pressing intelligent
        }
    },

    // ==========================================
    // SLOT - Liverpool 2024 (Basé sur analyses IRL)
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Source: TotalFootballAnalysis - Arne Slot at AZ Alkmaar
    // ==========================================
    'slot-liverpool': {
        name: 'Slot Liverpool System',
        coach: 'Arne Slot',
        team: 'Liverpool',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 5,
        difficulty: 4,
        effectiveness: 5,
        physical: 4,
        description: 'Possession dominante 60%+, latéraux inversés asymétriques (RB inversé, LB overlap avec ailier Idrissi-style), rotations fluides créant triangles, pressing man-orienté agressif en 4-4-2.',
        strengths: ['Possession 60%+', 'Triangles offensifs fluides', 'Pressing man-orienté', 'Rotations imprévisibles'],
        weaknesses: ['Vulnérable aux contre-attaques', 'Besoin latéraux techniques'],
        
        instructionsIP: {
            'passing-style': 'shorter',         // Dominance possession
            'tempo': 'standard',                 // Pas trop rapide, construire
            'width-attack': 'wide',              // Ailiers écartés
            'attack-focus': 'balanced',          // Équilibré
            'pass-target': 'feet',               // Dans les pieds
            'crossing-patience': 'work-ball',    // Travailler le ballon
            'crossing-style': 'balanced',
            'dribbling': 'encourage',            // 1v1 sur les côtés
            'long-shots': 'discourage',          // Construction patiente
            'creative-freedom': 'balanced',
            'pressing-strategy': 'manage',
            'set-pieces': 'no',
            'goal-kicks': 'short',               // Relances courtes
            'distribution-target': 'cb',         // DC pour construire
            'distribution-speed': 'slow',        // Ralentir
            'time-wasting': 'less',
            'counter-attack': 'yes'              // Opportuniste
        },
        
        instructionsOOP: {
            'pressing-height': 'high',           // Pressing haut
            'defensive-line': 'higher',          // Ligne haute
            'pressing-trigger': 'much-more',     // Man-orienté agressif
            'defensive-transition': 'counter-press', // Contre-pressing
            'tackling': 'standard',
            'pressing-crosses': 'prevent',       // Bloquer centres
            'pressing-trap': 'inside',           // Forcer vers l'axe
            'defensive-behavior': 'higher',      // Compact haut
            'prevent-short-gk': 'yes'            // Presser gardien
        },
        
        overlaps: {
            'overlap-left': true,                // LB overlap (style Wijndal)
            'overlap-right': false,              // RB inversé (style Svensson)
            'underlap-left': false,
            'underlap-right': true               // RB dédoublement intérieur
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',     // Participe à la construction
            1: 'Latéral Offensif',               // LB - Overlap avec ailier
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central',
            4: 'Latéral Offensif Intérieur',     // RB - Inversé comme Svensson
            5: 'Meneur De Jeu Du Milieu',        // Pivot créatif - Gravenberch
            6: 'Milieu Axial',                   // Pivot défensif - Mac Allister
            7: 'Ailier',                         // LW - Reste large (Idrissi-style)
            8: 'Meneur De Jeu Avancé',           // AM - Entre les lignes
            9: 'Attaquant Intérieur',            // RW - Rentre (Salah)
            10: 'Attaquant De Couloir'           // ST - Mobile (Boadu-style)
        },
        
        // RÔLES HORS POSSESSION - Formation 4-4-2
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',               // GK - Sort couvrir
            1: 'Arrière Latéral De Pressing',  // LB - Presse haut
            2: 'Défenseur Central',            // CB
            3: 'Défenseur Central De Couverture', // CB - Libéro
            4: 'Arrière Latéral De Pressing',  // RB - Presse haut
            5: 'Milieu Latéral De Couverture', // LM - Resserré
            6: 'Milieu Axial De Pressing',     // CM - Agressif
            7: 'Milieu Axial De Pressing',     // CM - Agressif
            8: 'Milieu Latéral De Couverture', // RM - Resserré
            9: 'Attaquant Central',            // ST - Premier rideau
            10: 'Attaquant Central'            // ST - Premier rideau
        }
    },

    // ==========================================
    // FAUX 9 SPECIALIST
    // ⭐⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // ==========================================
    'false-9-specialist': {
        name: 'Faux 9 Specialist',
        coach: 'Expert Tactic',
        team: 'Custom',
        formationIP: '4-3-3',
        formationOOP: '4-1-4-1',
        mentality: 5,
        difficulty: 5,
        effectiveness: 4,
        physical: 3,
        description: 'Faux 9 qui décroche pour créer, ailiers intérieurs qui finissent. Requiert un faux 9 créatif et des ailiers buteurs.',
        strengths: ['Imprévisible', 'Surcharge milieu', 'Ailiers buteurs'],
        weaknesses: ['Pas de point d\'ancrage', 'Vulnérable aux centres'],
        
        instructionsIP: {
            'passing-style': 'shorter',
            'tempo': 'higher',
            'width-attack': 'standard',
            'attack-focus': 'center',
            'pass-target': 'feet',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'discourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'manage',
            'set-pieces': 'no',
            'goal-kicks': 'short',
            'distribution-target': 'playmaker',
            'distribution-speed': 'balanced',
            'time-wasting': 'less',
            'counter-attack': 'hold'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },
        
        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central',
            4: 'Latéral Offensif',
            5: 'Milieu De Couloir',
            6: 'Meneur De Jeu Du Milieu',
            7: 'Milieu Offensif',
            8: 'Attaquant Intérieur',
            9: 'Faux Neuf',
            10: 'Attaquant Intérieur'
        },
        
        // RÔLES HORS POSSESSION - Formation 4-1-4-1
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=LM, 7=CM, 8=CM, 9=RM, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',               // GK
            1: 'Arrière Latéral',              // LB
            2: 'Défenseur Central',            // CB
            3: 'Défenseur Central',            // CB
            4: 'Arrière Latéral',              // RB
            5: 'Milieu Défensif De Couverture', // DM
            6: 'Milieu Latéral De Couverture', // LM
            7: 'Milieu Axial De Pressing',     // CM
            8: 'Milieu Axial De Pressing',     // CM
            9: 'Milieu Latéral De Couverture', // RM
            10: 'Attaquant Central'            // ST
        }
    },

    // ==========================================
    // LATÉRAUX INVERSÉS META
    // ⭐⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // ==========================================
    'inverted-fullbacks-meta': {
        name: 'Latéraux Inversés META',
        coach: 'FM26 Meta',
        team: 'Custom',
        formationIP: '4-3-3-dm',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 5,
        effectiveness: 5,
        physical: 3,
        description: 'Double latéral inversé créant un 2-3-5 en possession. La tactique META de FM26.',
        strengths: ['Supériorité totale au milieu', 'Contrôle absolu', 'Difficile à contrer'],
        weaknesses: ['Flancs exposés en transition', 'Besoin de latéraux techniques'],
        
        instructionsIP: {
            'passing-style': 'shorter',
            'tempo': 'standard',
            'width-attack': 'narrow',
            'attack-focus': 'center',
            'pass-target': 'feet',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'standard',
            'long-shots': 'discourage',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'manage',
            'set-pieces': 'no',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'slow',
            'time-wasting': 'less',
            'counter-attack': 'hold'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'stay',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': true,
            'underlap-right': true
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif Intérieur',
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central À L\'aise Au Pied',
            4: 'Latéral Offensif Intérieur',
            5: 'Milieu Défensif',
            6: 'Meneur De Jeu Du Milieu',
            7: 'Meneur De Jeu Avancé',
            8: 'Attaquant Désaxé',
            9: 'Attaquant Central',
            10: 'Attaquant Désaxé'
        },
        
        // RÔLES HORS POSSESSION - Formation 4-1-4-1
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=LM, 7=CM, 8=CM, 9=RM, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',               // GK
            1: 'Arrière Latéral De Pressing',  // LB
            2: 'Défenseur Central Stoppeur',   // CB
            3: 'Défenseur Central',            // CB
            4: 'Arrière Latéral De Pressing',  // RB
            5: 'Milieu Défensif De Couverture', // DM
            6: 'Milieu Latéral De Couverture', // LM
            7: 'Milieu Axial De Pressing',     // CM
            8: 'Milieu Axial De Pressing',     // CM
            9: 'Milieu Latéral De Couverture', // RM
            10: 'Attaquant Central'            // ST
        }
    },

    // ==========================================
    // CONTRE-ATTAQUE LÉTALE
    // ⭐⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // ==========================================
    'counter-attack-master': {
        name: 'Contre-Attaque Létale',
        coach: 'Expert Tactic',
        team: 'Custom',
        formationIP: '4-4-2',
        formationOOP: '4-4-2',
        mentality: 3,
        difficulty: 2,
        effectiveness: 4,
        physical: 4,
        description: 'Bloc médian solide, transitions verticales ultra-rapides. Idéal pour les équipes rapides face à des adversaires supérieurs.',
        strengths: ['Transitions mortelles', 'Solidité', 'Facile à implémenter'],
        weaknesses: ['Peu de possession', 'Prévisible'],
        
        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'flanks',
            'pass-target': 'space',
            'crossing-patience': 'early',
            'crossing-style': 'drilled',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'discipline',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'long',
            'distribution-target': 'long',
            'distribution-speed': 'fast',
            'time-wasting': 'normal',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'medium',
            'defensive-line': 'lower',
            'pressing-trigger': 'less',
            'defensive-transition': 'regroup',
            'tackling': 'commit',
            'pressing-crosses': 'allow',
            'pressing-trap': 'outside',
            'defensive-behavior': 'lower',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral',
            2: 'Défenseur Central',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Ailier',
            6: 'Milieu Axial',
            7: 'Milieu Axial',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Attaquant De Couloir'
        },
        
        rolesOOP: {
            0: 'Gardien Sur La Ligne',
            1: 'Arrière Latéral En Retrait',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central',
            4: 'Arrière Latéral En Retrait',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Couverture',
            7: 'Milieu Axial De Couverture',
            8: 'Milieu Latéral De Contre-Attaque',
            9: 'Avant-Centre Point D\'appui Axial',
            10: 'Avant-Centre Point D\'appui Axial'
        }
    },

    // ==========================================
    // DOMINATION TOTALE
    // ⭐⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪💪 Physique
    // ==========================================
    'total-domination': {
        name: 'Domination Totale',
        coach: 'Expert Tactic',
        team: 'Custom (Top Club)',
        formationIP: '4-3-3',
        formationOOP: '4-3-3',
        mentality: 6,
        difficulty: 5,
        effectiveness: 5,
        physical: 5,
        description: 'Possession ET pressing intense. Seulement pour les équipes avec une qualité exceptionnelle à tous les postes.',
        strengths: ['Contrôle total', 'Pressing étouffant', 'Supériorité technique'],
        weaknesses: ['Fatigue', 'Requiert des stars partout'],
        
        instructionsIP: {
            'passing-style': 'shorter',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'feet',
            'crossing-patience': 'work-ball',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'manage',
            'set-pieces': 'no',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'balanced',
            'time-wasting': 'less',
            'counter-attack': 'standard'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'much-higher',
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'balanced',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },
        
        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central À L\'aise Au Pied',
            4: 'Latéral Offensif',
            5: 'Milieu Axial',
            6: 'Meneur De Jeu Du Milieu',
            7: 'Meneur De Jeu Avancé',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Attaquant Intérieur'
        },
        
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central Stoppeur',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Axial De Pressing',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Offensif',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Ailier'
        }
    },

    // ==========================================
    // PARK THE BUS - Défense extrême
    // ⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // ==========================================
    'park-the-bus': {
        name: 'Park The Bus',
        coach: 'Anti-Football',
        team: 'Petite équipe',
        formationIP: '4-1-4-1',
        formationOOP: '4-1-4-1',
        mentality: 2,
        difficulty: 1,
        effectiveness: 4,
        physical: 4,
        description: 'Ultra-défensif. Bloc très bas, discipline totale, contre-attaques opportunistes. Chaque occasion doit compter.',
        strengths: ['Simple à appliquer', 'Ultra-solide', 'Peu de risques'],
        weaknesses: ['Peu spectaculaire', 'Dépendant des erreurs adverses'],
        
        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'slower',
            'width-attack': 'standard',
            'attack-focus': 'balanced',
            'pass-target': 'space',
            'crossing-patience': 'early',
            'crossing-style': 'floated',
            'dribbling': 'discourage',
            'long-shots': 'standard',
            'creative-freedom': 'discipline',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'long',
            'distribution-target': 'target',
            'distribution-speed': 'fast',
            'time-wasting': 'more',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'low',
            'defensive-line': 'lower',
            'pressing-trigger': 'less',
            'defensive-transition': 'regroup',
            'tackling': 'commit',
            'pressing-crosses': 'allow',
            'pressing-trap': 'inside',
            'defensive-behavior': 'lower',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien Pragmatique',
            1: 'Arrière Latéral',
            2: 'Défenseur Central',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Milieu Défensif',
            6: 'Milieu Latéral',
            7: 'Milieu Axial',
            8: 'Milieu Axial',
            9: 'Milieu Latéral',
            10: 'Attaquant Pivot'
        },
        
        rolesOOP: {
            0: 'Gardien Sur La Ligne',
            1: 'Arrière Latéral En Retrait',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central',
            4: 'Arrière Latéral En Retrait',
            5: 'Milieu Défensif De Couverture',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Couverture',
            8: 'Milieu Axial De Couverture',
            9: 'Milieu Latéral De Couverture',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // CONTE 3-5-2 INTENSIF (Basé sur analyses IRL)
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪💪 Physique
    // Source: TotalFootballAnalysis + Spielverlagerung
    // ==========================================
    'conte-352': {
        name: 'Conte 3-5-2 Champion',
        coach: 'Antonio Conte',
        team: 'Inter / Tottenham / Chelsea',
        formationIP: '3-5-2',
        formationOOP: '5-3-2',
        mentality: 5,
        difficulty: 4,
        effectiveness: 5,
        physical: 5,
        description: 'Wing-backs cruciaux = principaux contributeurs final third. Défense stabilisée à 3, milieux box-to-box, duo d\'attaque complémentaire. Contre-attaques dévastatrices sur la vitesse des pistons.',
        strengths: ['Wing-backs créateurs #1', 'Stabilité défensive 3 DC', 'Contre-attaques létales', 'Duo attaque complémentaire'],
        weaknesses: ['Wing-backs doivent être infatigables', 'Espace entre DC si mal coordonné'],
        
        instructionsIP: {
            'passing-style': 'direct',           // Directes vers ailes
            'tempo': 'much-higher',              // Intensité Conte
            'width-attack': 'very-wide',         // WB = largeur max
            'attack-focus': 'flanks',            // Flancs prioritaires
            'pass-target': 'space',              // Dans l'espace pour WB
            'crossing-patience': 'early',        // Centres rapides
            'crossing-style': 'drilled',         // Tendus dans la surface
            'dribbling': 'encourage',            // WB 1v1
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',               // Varie
            'distribution-target': 'flanks',     // Vers WB
            'distribution-speed': 'fast',        // Rapide
            'time-wasting': 'less',
            'counter-attack': 'yes'              // ESSENTIEL Conte
        },
        
        instructionsOOP: {
            'pressing-height': 'medium',         // Bloc médian
            'defensive-line': 'higher',          // Compacte
            'pressing-trigger': 'more',          // Agressif
            'defensive-transition': 'counter-press', // Contre-pressing
            'tackling': 'commit',                // Engagé
            'pressing-crosses': 'balanced',
            'pressing-trap': 'outside',          // Forcer extérieur
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': true,                // WB gauche monte
            'overlap-right': true,               // WB droit monte
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',                 // Distribution rapide
            1: 'Défenseur Central',              // DC gauche
            2: 'Défenseur Central',              // DC central - libéro
            3: 'Défenseur Central',              // DC droit
            4: 'Latéral Offensif Avancé',        // WB gauche - CRUCIAL
            5: 'Milieu Axial',                   // Box-to-box
            6: 'Meneur De Jeu Du Milieu',        // Régisseur (Brozovic)
            7: 'Milieu Axial',                   // Box-to-box
            8: 'Latéral Offensif Avancé',        // WB droit - CRUCIAL
            9: 'Attaquant Central',              // Finisseur (Lukaku)
            10: 'Attaquant Pivot'                // Lien (Martinez)
        },
        
        // RÔLES HORS POSSESSION - Formation 5-3-2
        // Index: 0=GK, 1=LWB, 2=CB, 3=CB, 4=CB, 5=RWB, 6=CM, 7=CM, 8=CM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien De But',               // GK
            1: 'Latéral Offensif En Retrait',  // LWB - repli 5 défenseurs
            2: 'Défenseur Central De Couverture', // CB gauche
            3: 'Défenseur Central',            // CB central
            4: 'Défenseur Central De Couverture', // CB droit
            5: 'Latéral Offensif En Retrait',  // RWB - repli 5 défenseurs
            6: 'Milieu Axial De Pressing',     // CM - premier rideau
            7: 'Milieu Axial De Couverture',   // CM - écran
            8: 'Milieu Axial De Pressing',     // CM - premier rideau
            9: 'Attaquant Central',            // ST - pressing
            10: 'Attaquant Central De Couverture' // ST - couverture
        }
    },

    // ==========================================
    // DE ZERBI - The Timing Game (Basé sur analyses IRL)
    // ⭐⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // Source: Spielverlagerung - The Timing Game
    // ==========================================
    'de-zerbi-possession': {
        name: 'De Zerbi Timing Game',
        coach: 'Roberto De Zerbi',
        team: 'Brighton / Marseille',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 5,
        effectiveness: 5,
        physical: 3,
        description: 'The Timing Game : le bon moment de chaque action est crucial. Retourne les pièges de pressing adverse, détruit les blocs bas avec précision. Latéraux meneurs de jeu, GB constructeur essentiel.',
        strengths: ['Inverse les pièges pressing', 'Détruit blocs bas', 'Timing parfait', 'Latéraux playmakers'],
        weaknesses: ['Risques extrêmes à la construction', 'Besoin joueurs ultra-intelligents'],
        
        instructionsIP: {
            'passing-style': 'much-shorter',     // Ultra-courtes
            'tempo': 'slower',                   // Patient - timing
            'width-attack': 'wide',              // Latéraux hauts
            'attack-focus': 'balanced',          // Imprévisible
            'pass-target': 'feet',               // Toujours dans les pieds
            'crossing-patience': 'work-ball',    // Travail du ballon
            'crossing-style': 'low',             // Cut-backs
            'dribbling': 'encourage',            // 1v1 timing
            'long-shots': 'discourage',          // Patience absolue
            'creative-freedom': 'expressive',    // Liberté totale
            'pressing-strategy': 'manage',       // Gérer le pressing adverse
            'set-pieces': 'no',                  // Garder le ballon
            'goal-kicks': 'short',               // GB construire
            'distribution-target': 'cb',         // DC pour inviter pressing
            'distribution-speed': 'slow',        // Très lent - timing
            'time-wasting': 'less',
            'counter-attack': 'hold'             // Jamais précipité
        },
        
        instructionsOOP: {
            'pressing-height': 'high',           // Pressing haut
            'defensive-line': 'much-higher',     // Très haute
            'pressing-trigger': 'much-more',     // Agressif total
            'defensive-transition': 'counter-press', // Contre-pressing
            'tackling': 'stay',                  // Rester debout (timing)
            'pressing-crosses': 'prevent',       // Empêcher
            'pressing-trap': 'inside',           // Piège axe
            'defensive-behavior': 'higher',      // Compact haut
            'prevent-short-gk': 'yes'            // Forcer construction
        },
        
        overlaps: {
            'overlap-left': true,                // Latéraux montent
            'overlap-right': true,               // Latéraux montent
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',      // CRUCIAL - construit
            1: 'Latéral Offensif Meneur De Jeu', // Playmaker gauche
            2: 'Défenseur Central À L\'aise Au Pied', // Ball-playing
            3: 'Défenseur Central À L\'aise Au Pied', // Ball-playing
            4: 'Latéral Offensif Meneur De Jeu', // Playmaker droite
            5: 'Meneur De Jeu Du Milieu',        // Régisseur
            6: 'Milieu Axial',                   // Équilibre
            7: 'Ailier Meneur De Jeu',           // Créateur gauche
            8: 'Meneur De Jeu Avancé',           // Entre les lignes
            9: 'Ailier Meneur De Jeu',           // Créateur droite
            10: 'Faux Neuf'                      // Décroche - timing
        },
        
        // RÔLES HORS POSSESSION - Formation 4-4-2
        // Index: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',               // GK - Sort couvrir
            1: 'Arrière Latéral De Pressing',  // LB - Pressing haut
            2: 'Défenseur Central Stoppeur',   // CB - Agressif
            3: 'Défenseur Central',            // CB - Couverture
            4: 'Arrière Latéral De Pressing',  // RB - Pressing haut
            5: 'Milieu Latéral De Couverture', // LM - Compact
            6: 'Milieu Axial De Pressing',     // CM - Agressif
            7: 'Milieu Axial De Pressing',     // CM - Agressif
            8: 'Milieu Latéral De Couverture', // RM - Compact
            9: 'Attaquant Central',            // ST - Premier rideau
            10: 'Attaquant Central'            // ST - Premier rideau
        }
    },

    // ==========================================
    // ZAZ AUTUMN STYLE - FM26 META #1 (81% win rate)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Source: FM-Arena Hall of Fame - ZaZ Autumn 1.71
    // ==========================================
    'zaz-autumn-meta': {
        name: 'ZaZ Autumn Meta 3-4-3',
        coach: 'FM26 Meta',
        team: 'Toutes équipes',
        formationIP: '3-4-3',
        formationOOP: '5-4-1',
        mentality: 5,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'META FM26 #1 - 81% wins sur 1350 matchs. 3 DC avec OCB qui montent haut, AWB asymétriques (narrower + byline), IF stay wider. Faiblesse: BCB seul contre contre-attaques.',
        strengths: ['#1 FM26 Meta testé', 'OCB offensifs', 'AWB byline crosses', 'IF stay wider'],
        weaknesses: ['BCB seul en couverture', 'Vulnérable contre-attaques'],
        
        instructionsIP: {
            'passing-style': 'standard',         // Équilibré
            'tempo': 'much-higher',              // Tempo maximum
            'width-attack': 'wide',              // Large pour AWB
            'attack-focus': 'balanced',          // Équilibré
            'pass-target': 'standard',
            'crossing-patience': 'standard',
            'crossing-style': 'balanced',        // Balanced crosses
            'dribbling': 'encourage',            // Encourage 1v1
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'balanced',
            'distribution-speed': 'balanced',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',           // Pressing haut
            'defensive-line': 'higher',          // Ligne haute
            'pressing-trigger': 'much-more',     // Très agressif
            'defensive-transition': 'counter-press', // Contre-pressing
            'tackling': 'commit',                // Tackle Harder sur tous
            'pressing-crosses': 'balanced',
            'pressing-trap': 'balanced',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',                 // GK standard
            1: 'Défenseur Central À L\'aise Au Pied', // OCB gauche - monte haut
            2: 'Défenseur Central',              // BCB - reste arrière (seul)
            3: 'Défenseur Central À L\'aise Au Pied', // OCB droit - monte haut
            4: 'Latéral Offensif Avanc\u00e9',   // AWB gauche - narrower + byline
            5: 'Milieu Axial',                   // CM équilibre
            6: 'Milieu Axial',                   // CM équilibre
            7: 'Latéral Offensif Avancé',        // AWB droit - narrower + byline
            8: 'Attaquant Intérieur',            // IF gauche - stay wider
            9: 'Attaquant Central',              // ST
            10: 'Attaquant Intérieur'            // IF droit - stay wider
        },
        
        // RÔLES HORS POSSESSION - Formation 5-4-1
        rolesOOP: {
            0: 'Gardien De But',               // GK
            1: 'Latéral Offensif En Retrait',  // LWB - repli
            2: 'Défenseur Central De Couverture', // CB
            3: 'Défenseur Central',            // CB central
            4: 'Défenseur Central De Couverture', // CB
            5: 'Latéral Offensif En Retrait',  // RWB - repli
            6: 'Milieu Latéral De Couverture', // LM
            7: 'Milieu Axial De Pressing',     // CM
            8: 'Milieu Axial De Pressing',     // CM
            9: 'Milieu Latéral De Couverture', // RM
            10: 'Avant-Centre Point D\'appui Axial' // ST
        }
    },

    // ==========================================
    // ICE COLD STYLE - FM26 META #2 (79% win rate)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Source: FM-Arena Hall of Fame - Ice Cold v1
    // ==========================================
    'ice-cold-meta': {
        name: 'Ice Cold Meta 3-4-2-1',
        coach: 'FM26 Meta',
        team: 'Toutes équipes',
        formationIP: '3-4-2-1',
        formationOOP: '5-4-1',
        mentality: 5,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'META FM26 #2 - 79% wins. 3 DC solides, WB narrower + byline, DM écran, AM/SS move into channels. Protection contre-attaques meilleure que ZaZ.',
        strengths: ['Protection contre-attaques', 'WB efficaces', 'AM/SS channels', 'Meilleur équilibre'],
        weaknesses: ['Moins offensif que ZaZ', 'Besoin bons WB'],
        
        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'much-higher',              // Tempo max
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'standard',
            'crossing-patience': 'standard',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'balanced',
            'distribution-speed': 'balanced',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',                // Tackle harder all
            'pressing-crosses': 'balanced',
            'pressing-trap': 'balanced',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',
            1: 'Défenseur Central',              // CB gauche
            2: 'Défenseur Central',              // CB central (BCB)
            3: 'Défenseur Central',              // CB droit
            4: 'Latéral Offensif Avancé',        // WB gauche - narrower + byline
            5: 'Milieu Axial',                   // CM
            6: 'Milieu Axial',                   // CM
            7: 'Latéral Offensif Avancé',        // WB droit - narrower + byline
            8: 'Meneur De Jeu Avancé',           // AM - move into channels
            9: 'Second Attaquant',               // SS - move into channels
            10: 'Attaquant Intérieur'            // IF
        },
        
        rolesOOP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif En Retrait',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central',
            4: 'Défenseur Central De Couverture',
            5: 'Latéral Offensif En Retrait',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Axial De Pressing',
            9: 'Milieu Latéral De Couverture',
            10: 'Avant-Centre Point D\'appui Axial'
        }
    },

    // ==========================================
    // ARGUS 3430 STYLE - FM26 META (80% win rate)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Source: FM-Arena - ARGUS 26 MT 3430
    // ==========================================
    'argus-3430-meta': {
        name: 'ARGUS 3430 Meta',
        coach: 'FM26 Meta',
        team: 'Toutes équipes',
        formationIP: '3-4-3',
        formationOOP: '5-3-2',
        mentality: 5,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'META FM26 - 80% wins. 3-4-3-0 sans vrai ST, high tempo, LOW defensive line paradoxale. Trident offensif fluide.',
        strengths: ['High tempo efficace', 'Low DL contre-intuitif', 'Trident fluide', 'Testé 1350+ matchs'],
        weaknesses: ['Pas de vrai pivot', 'Milieu parfois exposé'],
        
        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'much-higher',              // HIGH TEMPO crucial
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'standard',
            'crossing-patience': 'standard',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'balanced',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',           // Pressing haut
            'defensive-line': 'lower',           // LOW DL - clé de la tactique
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'balanced',
            'pressing-trap': 'balanced',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',
            1: 'Défenseur Central À L\'aise Au Pied',
            2: 'Défenseur Central',
            3: 'Défenseur Central À L\'aise Au Pied',
            4: 'Latéral Offensif Avancé',
            5: 'Milieu Axial',
            6: 'Milieu Axial',
            7: 'Latéral Offensif Avancé',
            8: 'Attaquant Intérieur',            // IF gauche
            9: 'Faux Neuf',                      // F9 - pas de vrai ST
            10: 'Attaquant Intérieur'            // IF droit
        },
        
        rolesOOP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif En Retrait',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central',
            4: 'Défenseur Central De Couverture',
            5: 'Latéral Offensif En Retrait',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Couverture',
            8: 'Milieu Axial De Pressing',
            9: 'Attaquant Central',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // UNDERDOG KILLER - Petites équipes
    // ⭐⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪💪💪 Physique
    // Pour équipes inférieures
    // ==========================================
    'underdog-killer': {
        name: 'Underdog Killer',
        coach: 'Lower League',
        team: 'Petites équipes',
        formationIP: '4-4-2',
        formationOOP: '4-4-2',
        mentality: 3,
        difficulty: 2,
        effectiveness: 4,
        physical: 5,
        description: 'Tactique robuste pour équipes inférieures. Bloc médian, set-pieces exploités, centres near-post, contre-attaques. xG efficiency focus.',
        strengths: ['Set-pieces efficaces', 'Near-post headers', 'Contre-attaques', 'Physique récompensé'],
        weaknesses: ['Peu de possession', 'Prévisible'],
        
        instructionsIP: {
            'passing-style': 'direct',           // Direct
            'tempo': 'standard',
            'width-attack': 'wide',              // Large pour centres
            'attack-focus': 'flanks',            // Flancs
            'pass-target': 'space',              // Dans l'espace
            'crossing-patience': 'early',        // Centres rapides
            'crossing-style': 'floated',         // Near-post headers
            'dribbling': 'discourage',           // Éviter risques
            'long-shots': 'standard',
            'creative-freedom': 'discipline',    // Discipline
            'pressing-strategy': 'bypass',       // Contourner pressing
            'set-pieces': 'yes',                 // SET PIECES crucial
            'goal-kicks': 'long',                // Longs
            'distribution-target': 'target',     // Vers pivot
            'distribution-speed': 'fast',
            'time-wasting': 'normal',
            'counter-attack': 'yes'              // Contre-attaques
        },
        
        instructionsOOP: {
            'pressing-height': 'medium',         // Bloc médian
            'defensive-line': 'standard',
            'pressing-trigger': 'more',
            'defensive-transition': 'standard',
            'tackling': 'commit',                // Engagé
            'pressing-crosses': 'balanced',
            'pressing-trap': 'outside',          // Extérieur
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif',               // Centres
            2: 'Défenseur Central',
            3: 'Défenseur Central',
            4: 'Latéral Offensif',               // Centres
            5: 'Milieu Latéral',                 // LM - discipline
            6: 'Milieu Axial',                   // Destroyer
            7: 'Milieu Axial',                   // Box-to-box
            8: 'Milieu Latéral',                 // RM - discipline
            9: 'Attaquant Pivot',                // Near-post bully
            10: 'Attaquant Central'              // Finisseur
        },
        
        rolesOOP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral',
            2: 'Défenseur Central',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Couverture',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // FLUID 4-3-3 DM - Hybride moderne
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // ==========================================
    'fluid-433-dm': {
        name: 'Fluid 4-3-3 DM',
        coach: 'Moderne',
        team: 'Équipes techniques',
        formationIP: '4-3-3-dm',
        formationOOP: '4-1-4-1',
        mentality: 5,
        difficulty: 4,
        effectiveness: 5,
        physical: 4,
        description: 'Hybride possession + transitions. DM ancre, MC box-to-box, ailiers inversés. Exploitation demi-espaces avec flexibilité.',
        strengths: ['DM solide', 'Demi-espaces', 'Ailiers inversés', 'Transitions'],
        weaknesses: ['Besoin bon DM', 'Ailiers techniques'],
        
        instructionsIP: {
            'passing-style': 'shorter',
            'tempo': 'higher',
            'width-attack': 'standard',
            'attack-focus': 'balanced',
            'pass-target': 'feet',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'balanced',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },
        
        overlaps: {
            'overlap-left': true,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': true
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',               // Overlap
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central',
            4: 'Latéral Offensif Intérieur',     // Inverted
            5: 'Milieu Défensif',                // DM ancre
            6: 'Milieu Axial',                   // Box-to-box
            7: 'Milieu Offensif',                // Mezzala
            8: 'Ailier',                         // Large gauche
            9: 'Attaquant Central',
            10: 'Attaquant Intérieur'            // Inverted droite
        },
        
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Défensif De Couverture',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Axial De Pressing',
            9: 'Milieu Latéral De Couverture',
            10: 'Attaquant Central'
        }
    },

    // ==========================================
    // ASYMMETRIC 4-2-3-1 - Asymétrie totale
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // ==========================================
    'asymmetric-4231': {
        name: 'Asymmetric 4-2-3-1',
        coach: 'Moderne',
        team: 'Équipes créatives',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 4,
        effectiveness: 5,
        physical: 3,
        description: 'Asymétrie maximale: LB overlap + ailier large, RB inversé + IF inside. Double pivot avec un B2B et un ancre. Imprévisible.',
        strengths: ['Imprévisible', 'Asymétrie', 'Créativité', 'Double pivot'],
        weaknesses: ['Complexe', 'Besoin bonnes individualités'],
        
        instructionsIP: {
            'passing-style': 'shorter',
            'tempo': 'standard',
            'width-attack': 'standard',
            'attack-focus': 'balanced',          // Imprévisible
            'pass-target': 'feet',
            'crossing-patience': 'work-ball',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'discourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'manage',
            'set-pieces': 'yes',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'slow',
            'time-wasting': 'less',
            'counter-attack': 'hold'
        },
        
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },
        
        overlaps: {
            'overlap-left': true,                // LB overlap
            'overlap-right': false,              // RB inversé
            'underlap-left': false,
            'underlap-right': true               // RB underlap
        },
        
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',               // Overlap gauche
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central',
            4: 'Latéral Offensif Intérieur',     // Inversé droite
            5: 'Milieu Défensif',                // Ancre
            6: 'Milieu Axial',                   // B2B
            7: 'Ailier',                         // Large gauche
            8: 'Meneur De Jeu Avancé',           // 10
            9: 'Attaquant Intérieur',            // IF droite
            10: 'Attaquant Central'
        },
        
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Couverture',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central',
            10: 'Attaquant Central'
        }
    },

    // ==========================================
    // 5-2-3 ATTACKING WINGBACKS - Offensive avec couverture
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪💪💪 Physique
    // ==========================================
    'attacking-523': {
        name: '5-2-3 Attacking WB',
        coach: 'Hybride',
        team: 'Équipes physiques',
        formationIP: '5-2-3',
        formationOOP: '5-4-1',
        mentality: 5,
        difficulty: 3,
        effectiveness: 4,
        physical: 5,
        description: '5 défenseurs mais WB offensifs créant largeur. Double pivot compact, trident d\'attaque. Solid défensivement, explosif offensivement.',
        strengths: ['Solidité arrière', 'WB largeur', 'Trident', 'Transitions'],
        weaknesses: ['Milieu parfois dépassé', 'WB doivent être bons'],
        
        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'higher',
            'width-attack': 'very-wide',         // WB largeur max
            'attack-focus': 'flanks',
            'pass-target': 'space',
            'crossing-patience': 'early',
            'crossing-style': 'drilled',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'flanks',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },
        
        instructionsOOP: {
            'pressing-height': 'medium',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'balanced',
            'pressing-trap': 'outside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },
        
        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },
        
        rolesIP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif Avancé',        // WB attaquant
            2: 'Défenseur Central',
            3: 'Défenseur Central',              // Libéro
            4: 'Défenseur Central',
            5: 'Latéral Offensif Avancé',        // WB attaquant
            6: 'Milieu Axial',
            7: 'Milieu Axial',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Ailier'
        },
        
        rolesOOP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif En Retrait',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central',
            4: 'Défenseur Central De Couverture',
            5: 'Latéral Offensif En Retrait',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Axial De Pressing',
            9: 'Milieu Latéral De Couverture',
            10: 'Avant-Centre Point D\'appui Axial'
        }
    },

    // ==========================================
    // META POST-PATCH #1 - Dribble & Press 4-2-3-1
    // Exploite: Dribble buff (180°), pressing milieux corrigé,
    // 4-4-2 OOP buff, "Pressez vers l'axe" renforcé
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // ==========================================
    'meta-patch-dribble-press': {
        name: 'META Patch - Dribble & Press',
        coach: 'Meta FM26',
        team: 'Post-Patch',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Optimisé dernier patch : exploite le buff dribble (virages 180°), pressing milieux corrigé, 4-4-2 OOP renforcé (milieux excentrés gardent la largeur). Piège pressing vers l\'axe renforcé sur sorties de but.',
        strengths: ['Dribble buff exploité', '4-4-2 OOP corrigé/solide', 'Pressing vers l\'axe renforcé', 'MC se replacent mieux post-construction'],
        weaknesses: ['Exigence physique élevée', 'Vulnérable aux longs ballons si pressing raté'],

        instructionsIP: {
            'passing-style': 'shorter',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'feet',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'discourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'set-pieces': 'no',
            'goal-kicks': 'short',
            'distribution-target': 'fb',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'standard'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central',
            4: 'Latéral Offensif',
            5: 'Milieu Défensif',
            6: 'Meneur De Jeu En Retrait',
            7: 'Ailier',
            8: 'Meneur De Jeu Avancé',
            9: 'Attaquant Intérieur',
            10: 'Attaquant Central'
        },

        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central De Couverture',
            10: 'Avant-Centre Point D\'appui Axial'
        }
    },

    // ==========================================
    // META POST-PATCH #2 - 4-3-3 Wide Transition
    // Exploite: Milieux excentrés gardent largeur OOP,
    // MC repositionnement amélioré, pressing latéraux amélioré
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // ==========================================
    'meta-patch-wide-transition': {
        name: 'META Patch - Wide Transition',
        coach: 'Meta FM26',
        team: 'Post-Patch',
        formationIP: '4-3-3',
        formationOOP: '4-4-2',
        mentality: 5,
        difficulty: 4,
        effectiveness: 5,
        physical: 4,
        description: 'Exploite le 4-4-2 OOP corrigé avec milieux excentrés gardant la largeur. Pressing latéraux amélioré par le patch. Ailiers intérieurs en IP créent surnombre axial, transition OOP maintient la structure.',
        strengths: ['OOP 4-4-2 solide post-patch', 'Pressing latéraux buff', 'Transitions rapides', 'Ailiers intérieurs + dribble buff'],
        weaknesses: ['Espacés en possession', 'Besoin de pistons endurants'],

        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'flanks',
            'pass-target': 'space',
            'crossing-patience': 'standard',
            'crossing-style': 'drilled',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'set-pieces': 'no',
            'goal-kicks': 'short',
            'distribution-target': 'fb',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central',
            4: 'Latéral Offensif',
            5: 'Milieu Offensif',
            6: 'Meneur De Jeu Du Milieu',
            7: 'Milieu De Couloir',
            8: 'Attaquant Intérieur',
            9: 'Attaquant Central',
            10: 'Attaquant Intérieur'
        },

        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central De Couverture',
            10: 'Avant-Centre Point D\'appui Axial'
        }
    },

    // ==========================================
    // META POST-PATCH #3 - Compact Midfield 4-1-4-1
    // Exploite: Marquage courses lancées amélioré,
    // MC repositionnement post-construction, pressing milieux
    // ⭐⭐ Difficulté | 🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // ==========================================
    'meta-patch-compact-midfield': {
        name: 'META Patch - Compact Midfield',
        coach: 'Meta FM26',
        team: 'Post-Patch',
        formationIP: '4-1-4-1',
        formationOOP: '4-1-4-1',
        mentality: 3,
        difficulty: 2,
        effectiveness: 4,
        physical: 3,
        description: 'Formation stable IP=OOP. Exploite le repositionnement MC amélioré post-construction, le marquage renforcé sur courses lancées, et le pressing milieux corrigé. Idéal pour underdog et gestion de saison.',
        strengths: ['Facile à mettre en place', 'MC repositionnement buff', 'Marquage courses lancées amélioré', 'Formation stable = peu de réorg'],
        weaknesses: ['Moins de punch offensif', 'Dépendance au ST isolé'],

        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'standard',
            'width-attack': 'standard',
            'attack-focus': 'balanced',
            'pass-target': 'feet',
            'crossing-patience': 'standard',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'balanced',
            'distribution-speed': 'balanced',
            'time-wasting': 'normal',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'medium',
            'defensive-line': 'standard',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },

        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },

        rolesIP: {
            0: 'Gardien Pragmatique',
            1: 'Arrière Latéral',
            2: 'Défenseur Central',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Milieu Défensif',
            6: 'Milieu Latéral',
            7: 'Milieu Axial',
            8: 'Milieu Axial',
            9: 'Milieu Latéral',
            10: 'Attaquant Pivot'
        },

        rolesOOP: {
            0: 'Gardien Sur La Ligne',
            1: 'Arrière Latéral',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral',
            5: 'Milieu Défensif De Couverture',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Axial De Pressing',
            9: 'Milieu Latéral De Couverture',
            10: 'Avant-Centre Point D\'appui Axial'
        }
    },

    // ==========================================
    // META POST-PATCH #4 - 3-4-3 Aggressive Press
    // Exploite: Pressing latéraux amélioré, dribble buff,
    // marquage milieux en pressing renforcé
    // ⭐⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪💪 Physique
    // ==========================================
    'meta-patch-aggressive-343': {
        name: 'META Patch - 3-4-3 Aggressive',
        coach: 'Meta FM26',
        team: 'Post-Patch',
        formationIP: '3-4-3',
        formationOOP: '5-4-1',
        mentality: 5,
        difficulty: 5,
        effectiveness: 5,
        physical: 5,
        description: 'Hyper-offensif en IP avec 3 attaquants + pistons. Transition vers 5-4-1 compact en OOP (pistons descendent). Exploite le pressing latéraux amélioré, le dribble buff et le marquage milieux renforcé.',
        strengths: ['Surnombre offensif', 'Pressing total post-patch', 'Dribble buff sur les ailiers', 'Transition 3-4-3 → 5-4-1 naturelle'],
        weaknesses: ['Très exigeant physiquement', 'Vulnérable si pressing cassé', 'Pistons world-class requis'],

        instructionsIP: {
            'passing-style': 'shorter',
            'tempo': 'much-higher',
            'width-attack': 'very-wide',
            'attack-focus': 'flanks',
            'pass-target': 'space',
            'crossing-patience': 'standard',
            'crossing-style': 'drilled',
            'dribbling': 'encourage',
            'long-shots': 'discourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'set-pieces': 'no',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'standard'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'much-higher',
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Défenseur Central À L\'aise Au Pied',
            2: 'Défenseur Central',
            3: 'Défenseur Central À L\'aise Au Pied',
            4: 'Latéral Offensif Avancé',
            5: 'Milieu Axial',
            6: 'Meneur De Jeu Du Milieu',
            7: 'Latéral Offensif Avancé',
            8: 'Attaquant Intérieur',
            9: 'Attaquant Central',
            10: 'Attaquant Intérieur'
        },

        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Défenseur Central De Couverture',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Latéral Offensif En Retrait',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Latéral De Couverture',
            9: 'Latéral Offensif En Retrait',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // META POST-PATCH #5 - Inverted Fullbacks 4-3-3
    // Exploite: Pressing vers l'axe renforcé sur sorties de but,
    // MC replacement amélioré, dribble buff, latéraux inversés
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪 Physique
    // ==========================================
    'meta-patch-inverted-fb': {
        name: 'META Patch - Inverted FB Domination',
        coach: 'Meta FM26',
        team: 'Post-Patch',
        formationIP: '4-3-3',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 4,
        effectiveness: 5,
        physical: 3,
        description: 'Latéraux inversés qui rentrent en MC créant un 2-3-5 en possession. Exploite "Pressez vers l\'axe" renforcé sur sorties de but adverses, MC repositionnement amélioré, et dribble buff pour les ailiers.',
        strengths: ['Surnombre central massif', 'Pressing axe buff exploité', 'Dribble ailiers buff', 'Contrôle total possession'],
        weaknesses: ['Flancs exposés si contre-attaque rapide', 'Latéraux doivent être polyvalents'],

        instructionsIP: {
            'passing-style': 'much-shorter',
            'tempo': 'slower',
            'width-attack': 'narrow',
            'attack-focus': 'center',
            'pass-target': 'feet',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'discourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'manage',
            'set-pieces': 'no',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'slow',
            'time-wasting': 'less',
            'counter-attack': 'hold'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'much-higher',
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'stay',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': true,
            'underlap-right': true
        },

        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif Intérieur',
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central À L\'aise Au Pied',
            4: 'Latéral Offensif Intérieur',
            5: 'Milieu De Couloir',
            6: 'Meneur De Jeu Du Milieu',
            7: 'Milieu De Couloir',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Ailier'
        },

        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Défensif De Couverture',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Axial De Pressing',
            9: 'Milieu Latéral De Couverture',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // OM MARSEILLE - Preset optimise sur effectif reel 2025/26
    // Analyse CSV complete : 100 joueurs, meilleur XI par stats pures
    // Formation: 4-3-3 MDef (Hojbjerg pivot, Timber+O'Riley relayeurs)
    // Greenwood star (18B+13PD), Gouiri buteur (15B), Aubameyang impact
    // ==========================================
    'om-marseille-2026': {
        name: 'OM Marseille 2025/26',
        coach: 'Analyse CSV',
        team: 'Olympique de Marseille',
        formationIP: '4-3-3-dm',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Tactique construite sur l\'analyse complete de l\'effectif OM. Rulli (Un contre un 19) en GB, Pavard-Medina en charniere, Hojbjerg pivot (6B+9PD), Timber-O\'Riley relayeurs createurs, Greenwood star (18B+13PD), Gouiri buteur (15B). Pressing haut, transitions rapides, jeu offensif domine par les demi-espaces.',
        strengths: ['Trio milieu elite (Hojbjerg/Timber/O\'Riley)', 'Greenwood deux pieds (Finition 16, Inspiration 17)', 'Pressing haut avec volume de jeu collectif', 'Transitions rapides (Greenwood+Gouiri rapides)'],
        weaknesses: ['Espace derriere les lateraux offensifs', 'Ligne haute vulnerable aux balles en profondeur'],

        // CONSIGNES EN POSSESSION
        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'space',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },

        // CONSIGNES HORS POSSESSION
        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'yes'
        },

        // Courses de soutien
        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        // ROLES EN POSSESSION - 4-3-3 MDef
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=CM, 7=CM, 8=LW, 9=ST, 10=RW
        // Rulli | Emerson Pavard Medina Murillo | Hojbjerg | O'Riley Timber | Gouiri Aubameyang Greenwood
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central Avancé',
            3: 'Défenseur Central Strict',
            4: 'Latéral Offensif',
            5: 'Meneur De Jeu En Retrait',
            6: 'Meneur De Jeu Avancé',
            7: 'Milieu De Couloir',
            8: 'Attaquant Intérieur',
            9: 'Attaquant En Retrait',
            10: 'Attaquant Intérieur'
        },

        // ROLES HORS POSSESSION - 4-4-2
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // OM vs REAL MADRID - Retour Bernabéu (Demi-finale LDC)
    // ⭐⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Basé sur: Analyse match aller (2-2) + CSV effectif OM
    // Aller: Marseille 2-2 Real Madrid (Mbappé 2', 69' / Weah-Gouiri 73', Aubameyang-Gouiri 82')
    // Leçons: Bloc médian > ligne haute vs Mbappé, transitions mortelles, Gouiri MVP (9.0)
    // ==========================================
    'om-vs-real-madrid-retour': {
        name: 'OM vs Real Madrid - Retour LDC',
        coach: 'Analyse Match Aller',
        team: 'Olympique de Marseille',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 5,
        difficulty: 4,
        effectiveness: 5,
        physical: 4,
        description: 'Tactique retour Bernabéu basée sur le 2-2 aller. 4-2-3-1 avec double pivot Hojbjerg/Vermeeren pour sécuriser, Gouiri titulaire (9.0 à l\'aller, 2PD), Greenwood libre côté droit, Aubameyang en pointe de contre. Bloc médian pour ne pas offrir l\'espace à Mbappé, transitions rapides via les flancs. Attaque focalisée à gauche sur Trent (6.6 à l\'aller).',
        strengths: ['Gouiri impact prouvé (9.0, 2PD au match aller)', 'Transitions mortelles (2 buts en 2MT à l\'aller)', 'Double pivot solide (Hojbjerg Leadership 17 + Vermeeren Endurance 17)', 'Exploitation du côté faible de Madrid (Trent)'],
        weaknesses: ['Mbappé reste dangereux (8.3, 2 buts à l\'aller)', 'Moins de créativité sans O\'Riley titulaire', 'Pression du Bernabéu sur les jeunes joueurs'],

        // CONSIGNES EN POSSESSION
        instructionsIP: {
            'passing-style': 'standard',            // Standard - patience pour trouver les ouvertures vs bloc Rüdiger/Militão
            'tempo': 'higher',                       // Plus rapide - garder du rythme sans les pertes de balle du much-higher
            'width-attack': 'wide',                  // Plus large - étirer la défense de Madrid, exploiter les espaces latéraux
            'attack-focus': 'left',                  // Gauche - attaquer Trent (6.6), maillon faible. Gouiri + Emerson + overlap
            'pass-target': 'space',                  // Dans les espaces - Aubameyang (Vitesse 14) et Gouiri font des appels dans le dos
            'crossing-patience': 'work-ball',        // Jouer dans la surface - Courtois (7.7) domine aériennement, pas de centres lointains
            'crossing-style': 'low',                 // Centres à ras de terre - éviter la zone de force de Courtois
            'dribbling': 'encourage',                // Encourager - Greenwood (Dribbles 16), Gouiri (15), qualité technique pour éliminer
            'long-shots': 'standard',                // Standard - au match aller 0 occasion franche en 1MT avec discourage, il faut tenter
            'creative-freedom': 'expressive',        // Plus d\'expression - O\'Riley (Vision 17), Greenwood (Inspiration 17), Gouiri (16)
            'pressing-strategy': 'bypass',           // Contourner - Madrid presse haut au Bernabéu, bypass pour lancer les transitions
            'set-pieces': 'yes',                     // Oui - Pavard (Jeu de tête 17), Medina (14), Aubameyang (14) = potentiel aérien
            'goal-kicks': 'mixed',                   // Variées - pas short car Madrid pressera les relances courtes à domicile
            'distribution-target': 'fb',             // Arrières latéraux - éviter le pressing central, lancer vite sur les flancs
            'distribution-speed': 'fast',            // Relances rapides - profiter des transitions avant replacement de Madrid
            'time-wasting': 'less',                  // Moins souvent - tu dois marquer au Bernabéu
            'counter-attack': 'yes'                  // Contre-attaque - les 2 buts du match aller sont venus en transition
        },

        // CONSIGNES HORS POSSESSION
        instructionsOOP: {
            'pressing-height': 'medium',             // Bloc médian - ligne haute percée à la 2' au match aller, au Bernabéu encore plus dangereux
            'defensive-line': 'higher',              // Plus haute - compacité sans offrir l\'espace dans le dos à Mbappé/Vini
            'pressing-trigger': 'more',              // Plus souvent - bon compromis énergie/pression, pas much-more qui fatiguait l\'équipe
            'defensive-transition': 'counter-press', // Contre-pressing - Hojbjerg (Volume 17) + Vermeeren (Endurance 17) faits pour ça
            'tackling': 'standard',                  // Standard - commit au match aller = 7 fautes + 2 jaunes, au Bernabéu les arbitres siffleront vite
            'pressing-crosses': 'prevent',           // Empêcher - Mbappé (8.3) et Brahim (7.2) dangereux dans la surface
            'pressing-trap': 'outside',              // Vers les côtés - pousser Madrid loin de l\'axe, forcer des centres que Pavard/Medina défendent
            'defensive-behavior': 'balanced',        // Équilibré - pas higher comme au match aller, choix intelligent quand monter ou reculer
            'prevent-short-gk': 'no'                 // Non - économiser l\'énergie, pas besoin de presser Courtois sur ses relances
        },

        // Courses de soutien
        overlaps: {
            'overlap-left': true,                    // Emerson (7.0, Vitesse 15) déborde à gauche = surcharge sur Trent
            'overlap-right': false,                  // Murillo reste prudent côté droit face à Mbappé/Vini
            'underlap-left': false,                  // L\'overlap gauche suffit, pas besoin de doubler les courses
            'underlap-right': true                   // O\'Riley/Vermeeren dans le demi-espace droit, espace pour Greenwood qui coupe
        },

        // ROLES EN POSSESSION - 4-2-3-1
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=DM, 7=LW, 8=AM, 9=RW, 10=ST
        // Rulli | Emerson Pavard Medina Murillo | Hojbjerg Vermeeren | Gouiri O'Riley Greenwood | Aubameyang
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',          // Rulli - Relances pieds (Un contre un 19, bonne relance)
            1: 'Latéral Offensif',                    // Emerson - Monte en overlap gauche (Vitesse 15, 8.10 au match aller)
            2: 'Défenseur Central Avancé',            // Pavard - Relance propre (Sang-froid 17, Décisions 15)
            3: 'Défenseur Central Strict',            // Medina - Ancre défensive (Endurance 19, Tacles 14, gaucher)
            4: 'Latéral Offensif',                    // Murillo - Soutien mais prudent (Vitesse 15)
            5: 'Milieu Défensif',                     // Hojbjerg - Pivot volume (Volume 17, Leadership 17, Tacles 15)
            6: 'Meneur De Jeu En Retrait',            // Vermeeren - Relayeur créatif (Endurance 17, Travail d\'équipe 15)
            7: 'Ailier Intérieur',                    // Gouiri - Rentre pour frapper (Finition 15, Inspiration 16, 9.0 au match aller)
            8: 'Meneur De Jeu Avancé',                // O\'Riley - Créateur entre les lignes (Vision 17, Passes 15)
            9: 'Attaquant Intérieur',                 // Greenwood - Coupe vers le centre (Finition 16, Inspiration 17, deux pieds)
            10: 'Attaquant En Retrait'                // Aubameyang - Appels profondeur (Appels 17, Finition 16, Vitesse 14)
        },

        // ROLES HORS POSSESSION - 4-4-2
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',                      // Rulli - Sort couvrir derrière la ligne haute
            1: 'Arrière Latéral De Pressing',         // Emerson - Presse haut côté gauche
            2: 'Défenseur Central Stoppeur',          // Pavard - Dézone sur Mbappé si nécessaire
            3: 'Défenseur Central De Couverture',     // Medina - Couvre derrière Pavard
            4: 'Arrière Latéral De Pressing',         // Murillo - Presse haut côté droit
            5: 'Milieu Latéral De Couverture',        // Gouiri - Repli défensif côté gauche
            6: 'Milieu Axial De Pressing',            // Hojbjerg - Pressing central agressif
            7: 'Milieu Axial De Pressing',            // Vermeeren - Pressing central
            8: 'Milieu Latéral De Couverture',        // Greenwood - Repli côté droit
            9: 'Attaquant Central',                   // O\'Riley - Pressing initial ligne haute
            10: 'Attaquant Central De Couverture'     // Aubameyang - Pressing + couverture
        }
    },

    // ==========================================
    // 🎯 OM MARSEILLE 2025/26 - Analyse CSV v2 (Export 29/03/2026)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Analyse PURE par attributs de l'effectif complet (100+ joueurs)
    // Meilleur XI: Rulli | Emerson Medina Pavard Murillo | Hojbjerg Timber | Gouiri O'Riley Greenwood | Aubameyang
    // Greenwood NA 160 star absolue, Hojbjerg leader (Lead 17, Vol 17)
    // Double pivot B2B + 3 créateurs + 1 BT rapide
    // ==========================================
    'om-csv-v2-2026': {
        name: 'OM 2025/26 - Analyse CSV v2',
        coach: 'Analyse CSV v2',
        team: 'Olympique de Marseille',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Analyse pure par attributs CSV (export 29/03/2026). 4-2-3-1 construit sur les forces de l\'effectif: Greenwood star (NA 160, Finition 16, Inspiration 17, deux pieds), double pivot Hojbjerg (Leadership 17, Volume 17) + Timber (Travail 15, Décisions 15), trio créatif Gouiri-O\'Riley-Greenwood, Aubameyang en pointe de contre (Appels 17, Finition 16). Défense solide Pavard (Sang-froid 17) + Medina (Endurance 19). Pressing haut, transitions rapides, jeu dans les demi-espaces.',
        strengths: ['Greenwood deux pieds (NA 160, Finition 16, Inspiration 17, Tirs loin 15)', 'Double pivot complémentaire: Hojbjerg leader/volume + Timber technique/courses', 'Trio offensif polyvalent: Gouiri AI + O\'Riley créateur + Greenwood libre', 'Défense rapide: Murillo/Emerson Vitesse 15, Pavard Sang-froid 17'],
        weaknesses: ['Aubameyang 36 ans (Endurance 2, Vitesse en baisse)', 'Profondeur latérale limitée si blessure Murillo/Emerson', 'O\'Riley moral Plutôt content - risque de méforme'],

        // CONSIGNES EN POSSESSION
        instructionsIP: {
            'passing-style': 'standard',            // Standard - O'Riley (Vision 17, Passes 15) dicte le jeu, patience pour trouver les espaces
            'tempo': 'higher',                       // Plus rapide - Hojbjerg (Volume 17) + Timber (Volume 15) supportent le rythme élevé
            'width-attack': 'wide',                  // Plus large - Emerson (Centres 14) et Murillo (Vitesse 15) étirent le jeu
            'attack-focus': 'balanced',              // Équilibrée - danger des deux côtés: Gouiri à gauche, Greenwood à droite
            'pass-target': 'space',                  // Dans les espaces - Aubameyang (Appels 17, Vitesse 14) + Gouiri (Appels 15) font les appels
            'crossing-patience': 'work-ball',        // Jouer dans la surface - pas de centres lointains, combinaisons courtes
            'crossing-style': 'low',                 // Centres ras de terre - Aubameyang (Jeu de tête 14) moyen aériennement, mieux au sol
            'dribbling': 'encourage',                // Encourager - Greenwood (Dribbles 16), Gouiri (15), Paixão (14) en réserve
            'long-shots': 'standard',                // Standard - Greenwood (Tirs loin 15), Timber (14) peuvent tenter de loin
            'creative-freedom': 'expressive',        // Plus d'expression - Greenwood (Inspiration 17), O'Riley (Vision 17), Gouiri (Inspiration 16)
            'pressing-strategy': 'manage',           // Gérer le pressing - Hojbjerg (Décisions 13) et O'Riley (Décisions 14) gèrent la construction
            'set-pieces': 'yes',                     // Oui - Pavard (Jeu de tête 17), Medina (Jeu de tête 13), Aubameyang (14)
            'goal-kicks': 'short',                   // Courtes - Rulli (Relances main 13, Sorties pieds 16) bon avec le ballon
            'distribution-target': 'cb',             // Défenseurs centraux - Pavard (Passes 15, Sang-froid 17) relance propre
            'distribution-speed': 'fast',            // Relances rapides - lancer les transitions vite
            'time-wasting': 'less',                  // Moins souvent - jeu offensif dominant
            'counter-attack': 'yes'                  // Contre-attaque - Aubameyang (Appels 17) + Greenwood (Accélération 16) = danger en transition
        },

        // CONSIGNES HORS POSSESSION
        instructionsOOP: {
            'pressing-height': 'high',               // Pressing haut - Hojbjerg (Volume 17, Travail 16), Timber (Travail 15, Endurance 14)
            'defensive-line': 'higher',              // Plus haute - compacité avec le pressing, Pavard (Anticipation 13) couvre
            'pressing-trigger': 'more',              // Plus souvent - bon compromis énergie/efficacité du pressing
            'defensive-transition': 'counter-press', // Contre-pressing - Hojbjerg (Volume 17) + Timber (Volume 15) récupèrent vite
            'tackling': 'standard',                  // Standard - éviter les fautes inutiles, Medina (Tacles 14) et Pavard (16) suffisent
            'pressing-crosses': 'prevent',           // Empêcher de centrer - protéger la surface, Rulli (Un contre un 19) en dernier recours
            'pressing-trap': 'outside',              // Vers les côtés - pousser l'adversaire sur les flancs, loin de l'axe dangereux
            'defensive-behavior': 'higher',          // Rester plus haut - maintenir la pression, ne pas reculer inutilement
            'prevent-short-gk': 'yes'                // Oui - presser les relances courtes adverses, Aubameyang + Greenwood devant
        },

        // Courses de soutien
        overlaps: {
            'overlap-left': true,                    // Emerson (Vitesse 15, Centres 14) déborde à gauche pour combiner avec Gouiri
            'overlap-right': true,                   // Murillo (Vitesse 15, Centres 14) déborde à droite en soutien de Greenwood
            'underlap-left': false,                  // Pas d'underlap gauche - Gouiri (AI) rentre déjà vers l'intérieur
            'underlap-right': false                  // Pas d'underlap droit - Greenwood (AtI) coupe déjà vers le centre
        },

        // ROLES EN POSSESSION - 4-2-3-1
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=DM, 7=LW, 8=AM, 9=RW, 10=ST
        // Rulli | Emerson Medina Pavard Murillo | Hojbjerg Timber | Gouiri O'Riley Greenwood | Aubameyang
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',          // Rulli - Sorties pieds 16, Relances main 13, Un contre un 19
            1: 'Latéral Offensif',                    // Emerson - Vitesse 15, Centres 14, monte en overlap gauche
            2: 'Défenseur Central Strict',            // Medina - Endurance 19, Tacles 14, gaucher = ancre défensive
            3: 'Défenseur Central Avancé',            // Pavard - Sang-froid 17, Passes 15, Jeu de tête 17, relance propre
            4: 'Latéral Offensif',                    // Murillo - Vitesse 15, Accélération 14, soutien offensif droit
            5: 'Milieu Défensif',                     // Hojbjerg - Volume 17, Leadership 17, Tacles 15, Travail 16
            6: 'Meneur De Jeu En Retrait',            // Timber - Décisions 15, Travail 15, Passes 13, dicte le tempo
            7: 'Ailier Intérieur',                    // Gouiri - Finition 15, Inspiration 16, Dribbles 15, rentre pour frapper
            8: 'Meneur De Jeu Avancé',                // O'Riley - Vision 17, Passes 15, Appels 16, créateur entre les lignes
            9: 'Attaquant Intérieur',                 // Greenwood - Finition 16, Inspiration 17, Dribbles 16, deux pieds, coupe vers centre
            10: 'Attaquant En Retrait'                // Aubameyang - Appels 17, Finition 16, Inspiration 17, courses profondeur
        },

        // ROLES HORS POSSESSION - 4-4-2
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',                      // Rulli - Sort couvrir derrière la ligne haute
            1: 'Arrière Latéral De Pressing',         // Emerson - Presse haut côté gauche
            2: 'Défenseur Central De Couverture',     // Medina - Couvre derrière Pavard
            3: 'Défenseur Central Stoppeur',          // Pavard - Dézone agressivement
            4: 'Arrière Latéral De Pressing',         // Murillo - Presse haut côté droit
            5: 'Milieu Latéral De Couverture',        // Gouiri - Repli défensif côté gauche
            6: 'Milieu Axial De Pressing',            // Hojbjerg - Pressing central agressif
            7: 'Milieu Axial De Pressing',            // Timber - Pressing + couverture
            8: 'Milieu Latéral De Couverture',        // Greenwood - Repli côté droit
            9: 'Attaquant Central',                   // O'Riley/Aubameyang - Pressing initial
            10: 'Attaquant Central De Couverture'     // Aubameyang - Pressing + retour
        }
    },

    // ==========================================
    // ASSE 2026/27 - PRESET EFFECTIF SAISON (CSV 01/04/2026)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // Basé sur les qualités principales de l'effectif réel: vitesse sur les ailes,
    // discipline collective, transitions rapides, bloc compact en 4-1-4-1 sans ballon.
    // XI cible: Larsonneur | Vega Nade Batubinsika Ferreira | Moueffek | Jaber Humphreys | Davitashvili Cardona Gory
    // ==========================================
    'asse-saison-2026-2027': {
        name: 'ASSE 2026/27 - Preset Equipe Saison',
        coach: 'Analyse effectif CSV',
        team: 'AS Saint-Etienne',
        formationIP: '4-3-3-dm',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Preset sur mesure pour ton groupe 2026/27: volume au milieu (Moueffek/Jaber), ailes percutantes (Davitashvili/Gory), et Cardona comme finisseur principal. En possession 4-3-3 avec sentinelle, hors possession 4-1-4-1 pour fermer l axe et orienter dehors.',
        strengths: [
            'Ailes rapides et dribbleuses: Davitashvili + Gory',
            'Bloc equipe solide: Moueffek ancre, Jaber box-to-box, Humphreys organisateur',
            'Transitions offensives rapides sur Cardona',
            'Structure OOP 4-1-4-1 stable contre les equipes de possession'
        ],
        weaknesses: [
            'Si Moueffek est absent, l equilibre defensif baisse',
            'Charniere centrale forte dans le duel mais pas ultra rapide dans la profondeur',
            'Necessite une grosse activite des excentres au repli'
        ],

        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'flanks',
            'pass-target': 'space',
            'crossing-patience': 'standard',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'discourage',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'flanks',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        playerNames: {
            0: 'Gautier Larsonneur',
            1: 'Roman Vega',
            2: 'Mickael Nade',
            3: 'Dylan Batubinsika',
            4: 'Joao Ferreira',
            5: 'Aimen Moueffek',
            6: 'Mahmoud Jaber',
            7: 'Cameron Humphreys',
            8: 'Zuriko Davitashvili',
            9: 'Irvin Cardona',
            10: 'Alimami Gory'
        },

        // 4-3-3-dm: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=CM,7=CM,8=LW,9=ST,10=RW
        rolesIP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif',
            2: 'Défenseur Central Strict',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Milieu Défensif',
            6: 'Milieu De Couloir',
            7: 'Meneur De Jeu Du Milieu',
            8: 'Attaquant Intérieur',
            9: 'Attaquant Central',
            10: 'Ailier'
        },

        // 4-1-4-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=LM,7=CM,8=CM,9=RM,10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Défensif De Couverture',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Axial De Couverture',
            9: 'Milieu Latéral De Couverture',
            10: 'Attaquant Central'
        }
    },

    // ==========================================
    // ASSE 2026/27 - PLAN D'URGENCE CRISE
    // Lecture data: pace 12.98 et pressing 12.96 au-dessus du niveau technique 11.86
    // et du finish 10.92. Donc: jeu direct, largeur, transitions, et bloc plus stable.
    // ==========================================
    'asse-crise-433dm-urgence': {
        name: 'ASSE - Crise 4-3-3 DM',
        coach: 'Plan de sauvetage',
        team: 'AS Saint-Etienne',
        formationIP: '4-3-3-dm',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Preset de sauvetage base sur la data du dernier export: l equipe est plus forte en vitesse/pressing qu en technique/finalisation. On joue plus direct, plus large, avec un seul point de rupture au milieu et les 3 meilleurs profils offensifs ensemble.',
        strengths: [
            'Vitesse/pressing superieurs au niveau technique: avantage pour la transition',
            'Trio offensif adapte aux courses et a la percussion',
            'Bloc OOP compact avec un seul pivot bas',
            'Moins de pertes axiales en phase de relance'
        ],
        weaknesses: [
            'Le finish moyen du groupe reste faible (10.92)',
            'Les joueurs offensifs de rotation sous-performent',
            'Le plan depend de la qualité des courses et des centres bas'
        ],

        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'flanks',
            'pass-target': 'space',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'flanks',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'standard',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        playerNames: {
            0: 'Gautier Larsonneur',
            1: 'Roman Vega',
            2: 'Mickael Nade',
            3: 'Dylan Batubinsika',
            4: 'Joao Ferreira',
            5: 'Mahmoud Jaber',
            6: 'Aimen Moueffek',
            7: 'Cameron Humphreys',
            8: 'Zuriko Davitashvili',
            9: 'Irvin Cardona',
            10: 'Alimami Gory'
        },

        // 4-3-3-dm: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=CM,7=CM,8=LW,9=ST,10=RW
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central Strict',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Meneur De Jeu En Retrait',
            6: 'Milieu Axial',
            7: 'Meneur De Jeu Du Milieu',
            8: 'Attaquant Intérieur',
            9: 'Attaquant Central',
            10: 'Ailier'
        },

        // 4-1-4-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=LM,7=CM,8=CM,9=RM,10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Défensif De Couverture',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Axial De Couverture',
            9: 'Milieu Latéral De Couverture',
            10: 'Attaquant Central'
        }
    },

    // ==========================================
    // ASSE 2026/27 - VARIANTE DOMICILE ULTRA-OFFENSIVE
    // Objectif: etouffer l adversaire a Geoffroy-Guichard, volume offensif max,
    // recuperation haute, 4-2-3-1 tres agressif.
    // ==========================================
    'asse-domicile-ultra-offensive': {
        name: 'ASSE - Domicile Ultra-Offensive',
        coach: 'Plan domicile',
        team: 'AS Saint-Etienne',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 5,
        difficulty: 4,
        effectiveness: 5,
        physical: 5,
        description: 'Variante domicile pour imposer le rythme: pressing haut, contre-pressing agressif, ailes percutantes, et 4 joueurs dans les zones de finition autour de Cardona.',
        strengths: [
            'Pressing et volume offensif maximum',
            'Grosse menace dans les demi-espaces (Davitashvili/Gory)',
            'Recuperation haute pour enchaîner les vagues',
            'Ideal contre equipes qui relancent court'
        ],
        weaknesses: [
            'Consomme beaucoup physiquement',
            'Expose les espaces derriere les lateraux',
            'Demande une concentration defensive continue'
        ],

        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'much-higher',
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'space',
            'crossing-patience': 'standard',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'short',
            'distribution-target': 'flanks',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'much-more',
            'defensive-transition': 'counter-press',
            'tackling': 'commit',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'higher',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        playerNames: {
            0: 'Gautier Larsonneur',
            1: 'Roman Vega',
            2: 'Mickael Nade',
            3: 'Dylan Batubinsika',
            4: 'Joao Ferreira',
            5: 'Aimen Moueffek',
            6: 'Mahmoud Jaber',
            7: 'Zuriko Davitashvili',
            8: 'Cameron Humphreys',
            9: 'Alimami Gory',
            10: 'Irvin Cardona'
        },

        // 4-2-3-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central',
            3: 'Défenseur Central Strict',
            4: 'Latéral Offensif',
            5: 'Milieu Défensif',
            6: 'Milieu De Couloir',
            7: 'Attaquant Intérieur',
            8: 'Meneur De Jeu Avancé',
            9: 'Attaquant Intérieur',
            10: 'Attaquant Central'
        },

        // 4-4-2: 0=GK,1=LB,2=CB,3=CB,4=RB,5=LM,6=CM,7=CM,8=RM,9=ST,10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central Stoppeur',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // ASSE 2026/27 - VARIANTE EXTERIEUR SECURISEE
    // Objectif: rester compact, limiter la profondeur adverse, punir en transition.
    // ==========================================
    'asse-exterieur-securisee': {
        name: 'ASSE - Exterieur Securisee',
        coach: 'Plan exterieur',
        team: 'AS Saint-Etienne',
        formationIP: '4-1-4-1',
        formationOOP: '4-1-4-1',
        mentality: 2,
        difficulty: 2,
        effectiveness: 4,
        physical: 3,
        description: 'Variante pragmatique pour l exterieur: bloc median compact, securite axiale, lateraux plus prudents, et attaques rapides vers Cardona et Davitashvili.',
        strengths: [
            'Bloc equipe tres compact',
            'Bonne protection de l axe',
            'Transitions propres avec peu de risques',
            'Consomme moins d energie que la variante domicile'
        ],
        weaknesses: [
            'Moins de presence offensive continue',
            'Creation limitee si meneur bien neutralise',
            'Exige discipline des ailers au repli'
        ],

        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'standard',
            'width-attack': 'standard',
            'attack-focus': 'balanced',
            'pass-target': 'space',
            'crossing-patience': 'early',
            'crossing-style': 'balanced',
            'dribbling': 'standard',
            'long-shots': 'discourage',
            'creative-freedom': 'discipline',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'long',
            'distribution-target': 'target',
            'distribution-speed': 'fast',
            'time-wasting': 'normal',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'medium',
            'defensive-line': 'lower',
            'pressing-trigger': 'standard',
            'defensive-transition': 'regroup',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'lower',
            'prevent-short-gk': 'no'
        },

        overlaps: {
            'overlap-left': false,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },

        playerNames: {
            0: 'Gautier Larsonneur',
            1: 'Roman Vega',
            2: 'Mickael Nade',
            3: 'Dylan Batubinsika',
            4: 'Joao Ferreira',
            5: 'Aimen Moueffek',
            6: 'Zuriko Davitashvili',
            7: 'Cameron Humphreys',
            8: 'Mahmoud Jaber',
            9: 'Alimami Gory',
            10: 'Irvin Cardona'
        },

        // 4-1-4-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=LM,7=CM,8=CM,9=RM,10=ST
        rolesIP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral',
            2: 'Défenseur Central Strict',
            3: 'Défenseur Central',
            4: 'Arrière Latéral',
            5: 'Milieu Défensif',
            6: 'Ailier',
            7: 'Meneur De Jeu Du Milieu',
            8: 'Milieu De Couloir',
            9: 'Ailier',
            10: 'Attaquant En Retrait'
        },

        rolesOOP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral En Retrait',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral En Retrait',
            5: 'Milieu Défensif De Couverture',
            6: 'Milieu Latéral De Couverture',
            7: 'Milieu Axial De Couverture',
            8: 'Milieu Axial De Couverture',
            9: 'Milieu Latéral De Couverture',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // ASSE 2026/27 - VARIANTE ANTI-BLOC BAS
    // Objectif: plus de presence dans la surface, centres plus frequents,
    // deux pointes et volume de seconde balle.
    // ==========================================
    'asse-anti-bloc-bas-surface': {
        name: 'ASSE - Anti Bloc Bas (Surface +)',
        coach: 'Plan anti-bloc bas',
        team: 'AS Saint-Etienne',
        formationIP: '4-4-2',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Variante pour casser les blocs bas: deux attaquants dans la zone de verite, jeu large, centres plus frequents, et courses agressives des milieux vers la surface.',
        strengths: [
            'Presence maximale dans la surface (2 pointes)',
            'Centres et deuxiemes ballons mieux exploites',
            'Occupe mieux les 5 couloirs offensifs',
            'Efficace contre adversaires regroupes tres bas'
        ],
        weaknesses: [
            'Peut offrir des transitions si pertes axees',
            'Moins de controle au milieu qu en 4-3-3-dm',
            'Demande des lateraux actifs en continu'
        ],

        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'higher',
            'width-attack': 'very-wide',
            'attack-focus': 'flanks',
            'pass-target': 'space',
            'crossing-patience': 'early',
            'crossing-style': 'balanced',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'balanced',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'flanks',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'standard'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'standard',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': false
        },

        playerNames: {
            0: 'Gautier Larsonneur',
            1: 'Roman Vega',
            2: 'Mickael Nade',
            3: 'Dylan Batubinsika',
            4: 'Joao Ferreira',
            5: 'Zuriko Davitashvili',
            6: 'Aimen Moueffek',
            7: 'Mahmoud Jaber',
            8: 'Alimami Gory',
            9: 'Irvin Cardona',
            10: 'Lucas Stassin'
        },

        // 4-4-2: 0=GK,1=LB,2=CB,3=CB,4=RB,5=LM,6=CM,7=CM,8=RM,9=ST,10=ST
        rolesIP: {
            0: 'Gardien De But',
            1: 'Latéral Offensif',
            2: 'Défenseur Central Strict',
            3: 'Défenseur Central',
            4: 'Latéral Offensif',
            5: 'Ailier',
            6: 'Milieu De Couloir',
            7: 'Meneur De Jeu Du Milieu',
            8: 'Ailier',
            9: 'Attaquant Central',
            10: 'Attaquant En Retrait'
        },

        rolesOOP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Couverture',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // OM vs LIVERPOOL - Finale LDC 2026 (Anti 4-2-3-1 Slot)
    // Basé sur: scouting adverse + attributs effectif CSV
    // ==========================================
    'om-vs-liverpool-final-2026': {
        name: 'OM vs Liverpool - Finale LDC',
        coach: 'Plan de match anti-Liverpool',
        team: 'Olympique de Marseille',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 4,
        effectiveness: 5,
        physical: 4,
        description: 'Plan anti-Liverpool ciblant leur 4-2-3-1 pressing haut: sortie plus directe pour casser le contre-pressing, verrouillage de l\'axe (Wirtz/Isak), et attaques rapides dans le dos des latéraux. Bloc médian-haut compact, transitions agressives sur les côtés.',
        strengths: ['Neutralise l\'axe Wirtz-Isak', 'Sortie anti-pressing', 'Exploite l\'espace derrière les latéraux', 'Transitions rapides ciblées'],
        weaknesses: ['Demande discipline défensive', 'Exige gros volume de course des milieux', 'Risque si pertes axiales à la relance'],

        instructionsIP: {
            'passing-style': 'direct',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'left',
            'pass-target': 'space',
            'crossing-patience': 'early',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'fb',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': true
        },

        // 4-2-3-1: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=DM, 7=LW, 8=AM, 9=RW, 10=ST
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central Strict',
            3: 'Défenseur Central Avancé',
            4: 'Arrière Latéral',
            5: 'Milieu Défensif',
            6: 'Meneur De Jeu En Retrait',
            7: 'Ailier Intérieur',
            8: 'Meneur De Jeu Avancé',
            9: 'Attaquant Intérieur',
            10: 'Attaquant En Retrait'
        },

        // 4-4-2: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central Stoppeur',
            4: 'Arrière Latéral En Retrait',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // MON ÉQUIPE — SAISON 2026/27
    // 4-2-3-1 | Timber + Højbjerg | Gouiri - MO - Greenwood | BT
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // ==========================================
    'mon-equipe-saison-2627': {
        name: 'Mon Équipe — Saison 2026/27',
        coach: 'Mon Club',
        team: 'Mon Club',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Basé sur effectif réel : double pivot Timber (ancre) + Højbjerg (B2B), largeur avec Emerson+Murillo pistons, Gouiri et Greenwood ailiers intérieurs (AID), création centrale. Pressing intense, transitions rapides. META FM26 avec Inside Forwards + Wing-Backs.',
        strengths: ['Timber = pivot intouchable', 'Greenwood + Gouiri AID META', 'Murillo explosif en DD', 'Pressing haut structuré', 'Transitions rapides via Greenwood 2 pieds'],
        weaknesses: ['Vulnérable si Timber est suspendu/blessé', 'Nécessite un BT mobile (Aubameyang trop lent)', 'Emerson 31 ans - endurance à surveiller'],

        // CONSIGNES EN POSSESSION
        instructionsIP: {
            'passing-style': 'direct',               // Directes pour exploiter la vitesse
            'tempo': 'higher',                        // Rythme élevé
            'width-attack': 'standard',               // Standard - les AID rentrent naturellement
            'attack-focus': 'balanced',               // Équilibré - les deux AID menacent
            'pass-target': 'space',                   // Dans les espaces pour Greenwood/Gouiri
            'crossing-patience': 'early',             // Centres rapides pour tempo
            'crossing-style': 'low',                  // Centres bas (META FM26)
            'dribbling': 'encourage',                 // Greenwood + Gouiri = 1v1
            'long-shots': 'standard',                 // Tirs de loin standard
            'creative-freedom': 'expressive',         // Liberté créative pour AID
            'pressing-strategy': 'manage',
            'set-pieces': 'yes',
            'goal-kicks': 'mixed',
            'distribution-target': 'fb',              // Vers pistons pour lancer les transitions
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'                   // Contre-attaque rapide
        },

        // CONSIGNES HORS POSSESSION
        instructionsOOP: {
            'pressing-height': 'high',               // Pressing haut — Timber + Højbjerg couvrent
            'defensive-line': 'higher',              // Ligne haute
            'pressing-trigger': 'more',              // Presser plus souvent
            'defensive-transition': 'counter-press', // Contre-pressing immédiat
            'tackling': 'standard',                  // Standard
            'pressing-crosses': 'prevent',           // Empêcher les centres
            'pressing-trap': 'outside',              // Pousser vers le flanc
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,                    // Emerson chevauche Gouiri
            'overlap-right': true,                   // Murillo chevauche Greenwood
            'underlap-left': false,
            'underlap-right': false
        },

        // 4-2-3-1 IP: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=DM, 7=LW, 8=AM, 9=RW, 10=ST
        rolesIP: {
            0: 'Gardien Relanceur',              // Remplaçant de Rulli - distribution
            1: 'Latéral Offensif',               // Emerson - piston gauche offensif
            2: 'Défenseur Central À L\'aise Au Pied', // Balerdi - relance propre
            3: 'Défenseur Central Strict',       // Aguerd/Medina - marquage
            4: 'Latéral Offensif',               // Murillo - piston droit explosif
            5: 'Milieu Défensif',                // Timber - ANCRE, ne monte pas
            6: 'Milieu De Couloir',              // Højbjerg - B2B, court dans les canaux
            7: 'Ailier Intérieur',               // Gouiri - AID gauche, rentre et tire
            8: 'Meneur De Jeu Avancé',           // Gomes/Paixão - MO créateur
            9: 'Attaquant Intérieur',            // Greenwood - AID droit, 2 pieds, libre
            10: 'Avant De Pointe'                // BT recruté / Maupay
        },

        // 4-4-2 OOP: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=LM, 6=CM, 7=CM, 8=RM, 9=ST, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',    // Emerson remonte pour bloquer
            2: 'Défenseur Central De Couverture',
            3: 'Défenseur Central Stoppeur',
            4: 'Arrière Latéral En Retrait',     // Murillo plus prudent OOP
            5: 'Milieu Latéral De Couverture',   // Gouiri rentre en milieu gauche
            6: 'Milieu Axial De Pressing',       // Timber - pressing intense axe
            7: 'Milieu Axial De Pressing',       // Højbjerg - pressing
            8: 'Milieu Latéral De Couverture',   // Greenwood rentre côté droit
            9: 'Attaquant Central',              // BT presse haut
            10: 'Attaquant Central De Couverture' // 2e attaquant pressing
        }
    },

    // ==========================================
    // ELITE CSV 2026 - Optimise effectif actuel
    // XI cible: Rulli; Emerson, Pavard, Medina, Murillo;
    // Hojbjerg, Timber; Paixao, Nwaneri, Greenwood; Gouiri
    // ==========================================
    'elite-csv-2026': {
        name: 'Elite CSV 2026 (Best XI)',
        coach: 'Auto + Expert Tune',
        team: 'Ton équipe (CSV)',
        formationIP: '4-2-3-1',
        formationOOP: '4-4-2',
        mentality: 4,
        difficulty: 4,
        effectiveness: 5,
        physical: 4,
        description: 'Preset elite base sur ton CSV: Greenwood (161) et Paixao/Nwaneri en trio offensif, double pivot Hojbjerg-Timber, ligne defensive rapide et technique. Profil tres fort en transitions et en creation entre les lignes.',
        strengths: ['XI optimise sur NA + attributs', 'Greenwood/Nwaneri/Paixao tres dangereux', 'Double pivot solide et mobile', 'Bon equilibre pressing + transitions'],
        weaknesses: ['Demande discipline des latéraux', 'Risque dans le dos si ligne trop agressive'],

        instructionsIP: {
            'passing-style': 'standard',
            'tempo': 'higher',
            'width-attack': 'wide',
            'attack-focus': 'balanced',
            'pass-target': 'space',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'long-shots': 'standard',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'set-pieces': 'yes',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'fast',
            'time-wasting': 'less',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'high',
            'defensive-line': 'higher',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'standard',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'outside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'yes'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': true,
            'underlap-left': false,
            'underlap-right': true
        },

        // 4-2-3-1 IP: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',
            1: 'Latéral Offensif',
            2: 'Défenseur Central À L\'aise Au Pied',
            3: 'Défenseur Central Strict',
            4: 'Latéral Offensif',
            5: 'Milieu Défensif',
            6: 'Meneur De Jeu En Retrait',
            7: 'Attaquant Intérieur',
            8: 'Meneur De Jeu Avancé',
            9: 'Attaquant Intérieur',
            10: 'Attaquant En Retrait'
        },

        // 4-4-2 OOP: 0=GK,1=LB,2=CB,3=CB,4=RB,5=LM,6=CM,7=CM,8=RM,9=ST,10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',
            2: 'Défenseur Central Stoppeur',
            3: 'Défenseur Central De Couverture',
            4: 'Arrière Latéral De Pressing',
            5: 'Milieu Latéral De Couverture',
            6: 'Milieu Axial De Pressing',
            7: 'Milieu Axial De Pressing',
            8: 'Milieu Latéral De Couverture',
            9: 'Attaquant Central',
            10: 'Attaquant Central De Couverture'
        }
    },

    // ==========================================
    // MON ÉQUIPE — Généré depuis CSV 02/04/26
    // 4-3-3 DM | Contre-pressing | Ailiers rapides
    // Top performers: Jaber (7.55/5G), Vega (7.54/5A), Cardona (9G), Davitashvili (7.28/3G4A)
    // ⭐⭐⭐ Difficulté | 🎯🎯🎯🎯🎯 Efficacité | 💪💪💪💪 Physique
    // ==========================================
    'squad-attr-4331dm': {
        name: 'STE — Attributs Purs (4-3-3-dm)',
        coach: 'Auto Attributs (CSV 05/04/26)',
        team: 'Saint-Étienne',
        formationIP: '4-3-3-dm',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 3,
        description: 'Basé UNIQUEMENT sur attributs bruts. Différences vs stats: Stassin(Ant=15,Fin=15,Vit=15) ST > Cardona ST. Cardona(Drib=16,Fin=15) RW > Gory. Ekwah(Tac=14,Maq=14) meilleur 2ème DM que Jaber(Tac=7,Maq=6). Jaber=MC B2B End=17. Davitashvili Vit=16 Drib=16 END=8 → sortie 60min. Ramos Mingo End=7 → rotation 75min. PACE=12.1 PRESSING=13.4 TECHNIQUE=12.5 AERIAL=8.5(nul).',
        strengths: ['Davitashvili Vit=16 + Drib=16 — meilleur ailier attributs, explosif 60min', 'Cardona Drib=16 + Fin=15 — dribbleur+finisseur côté droit', 'Stassin Ant=15 + Fin=15 + Vit=15 — renard des surfaces optimal', 'Moueffek Déterm=20 + Tac=14 + Maq=14 — ancre MD parfaite', 'Jaber End=17 + Pas=15 — box-to-box indestructible'],
        weaknesses: ['Davitashvili End=8 — sortie OBLIGATOIRE 60min max', 'Ramos Mingo End=7 — surveiller fatigue, rotation Lamba à 75min', 'Nadé Acc=7 — ligne défensive basse obligatoire', 'Aérien catastrophique (5-11) — 0 jeu aérien possible', 'Ben Old Puis=4 — peut être bousculé par adversaires physiques'],

        instructionsIP: {
            'passing-style': 'short',
            'tempo': 'standard',
            'width-attack': 'standard',
            'attack-focus': 'center',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'fast',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'medium',
            'defensive-line': 'lower',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'stay',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },

        // 4-3-3-dm : 0=GK 1=LB 2=CB 3=CB 4=RB 5=DM 6=CM 7=CM 8=LW 9=ST 10=RW
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',           // Larsonneur — Réfl=15, Sort=14, 1v1=14
            1: 'Latéral Offensif',                    // Vega — Vit=14, Drib=14, Tac=15, Ant=15
            2: 'Défenseur Central Strict',            // Nadé — Maq=16, Cour=16, Acc=7→reste TOUJOURS
            3: 'Défenseur Central À L\'aise Au Pied', // Ramos Mingo — Pas=13, Tech=13, JdT=15 [End=7→rotation 75min]
            4: 'Arrière Latéral',                     // Ferreira — Agg=15, Cour=15, défensif pur
            5: 'Milieu Défensif',                     // Moueffek — Déterm=20!, Tac=14, Maq=14, Ant=14
            6: 'Meneur De Jeu Du Milieu',             // Jaber — End=17, Pas=15 [PAS DM: Tac=7, Maq=6]
            7: 'Milieu De Couloir',                   // Humphreys — Tech=15, Fin=14, Agi=15
            8: 'Attaquant Intérieur',                 // Davitashvili — Vit=16!, Drib=16!, droitier→coupe axe [End=8→sortie 60min]
            9: 'Renard Des Surfaces',                 // Stassin — Ant=15, Fin=15, Vit=15 [meilleur AC attributs]
            10: 'Attaquant Désaxé'                    // Cardona — Drib=16!, Fin=15, côté droit [meilleur RW attributs]
        },

        // 4-1-4-1 OOP : 0=GK 1=LB 2=CB 3=CB 4=RB 5=DM 6=LM 7=CM 8=CM 9=RM 10=ST
        rolesOOP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral De Pressing',         // Vega — Tac=15, Ant=15, peut presser haut
            2: 'Défenseur Central Stoppeur',          // Nadé — Maq=16, sort agressivement
            3: 'Défenseur Central De Couverture',     // Ramos Mingo — couvre, Vit=15 rattrape
            4: 'Arrière Latéral En Retrait',          // Ferreira — reste bas, ne prend pas de risques
            5: 'Milieu Défensif De Couverture',       // Moueffek — bouclier devant DC lents
            6: 'Milieu Latéral De Couverture',        // Jaber — End=17 couvre côté gauche
            7: 'Milieu Axial De Couverture',          // Davitashvili — End=8→pas de pressing, juste couvrir
            8: 'Milieu Axial De Pressing',            // Humphreys — Agi=15, End=13, presse côté droit
            9: 'Milieu Latéral De Contre-Attaque',    // Cardona — Drib=16 reste haut, contre
            10: 'Avant-Centre Point D\'appui Axial'   // Stassin — Vit=15, Ant=15, reste haut
        }
    },

    'squad-4231-v3': {
        name: 'STE — 4-2-3-1 Cardona & Old',
        coach: 'Auto (CSV 05/04/26)',
        team: 'Saint-Étienne',
        formationIP: '4-2-3-1',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 3,
        description: 'Double pivot Moueffek+Jaber protège les DC lents (Nadé Acc=7). Ben Old (7.87 best note, 5PA) + Cardona (14G) sur les flancs. Humphreys MAM créatif (6G tech=15). Stassin (5G remplaçant, Placement=15) en AC. Davitashvili (Vit=16, End=8) rotation ~70min. PACE=12.0, PRESSING=13.2, TECHNIQUE=12.5, AERIAL=11.8 → jeu au sol obligatoire.',
        strengths: ['Cardona 14 buts — Attaquant Désaxé côté droit incontournable', 'Ben Old note 7.87 — gaucher explosif côté gauche, 5 PA en remplaçant', 'Jaber End=17 + Moueffek Déterm=20 — double pivot indestructible', 'Humphreys 6 buts — MAM qui rentre dans l\'axe, Technique 15', 'Stassin Placement=15 + Finition=15 — finisseur dans la surface'],
        weaknesses: ['Nadé Acc=7 + Ramos Mingo Acc=11 — ligne défensive basse obligatoire', 'Davitashvili End=8 — sortie obligatoire ~70min', 'Aérien moyen (11.8) — éviter les centres systématiquement', 'Stansfield €463K/m — trop cher pour 3+8 matchs, à vendre'],

        instructionsIP: {
            'passing-style': 'short',
            'tempo': 'standard',
            'width-attack': 'standard',
            'attack-focus': 'center',
            'crossing-patience': 'work-ball',
            'crossing-style': 'low',
            'dribbling': 'encourage',
            'creative-freedom': 'expressive',
            'pressing-strategy': 'bypass',
            'goal-kicks': 'short',
            'distribution-target': 'cb',
            'distribution-speed': 'fast',
            'counter-attack': 'yes'
        },

        instructionsOOP: {
            'pressing-height': 'medium',
            'defensive-line': 'lower',
            'pressing-trigger': 'more',
            'defensive-transition': 'counter-press',
            'tackling': 'stay',
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },

        overlaps: {
            'overlap-left': true,
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },

        // 4-2-3-1 IP : 0=GK 1=LB 2=CB 3=CB 4=RB 5=DM 6=DM 7=LW 8=AM 9=RW 10=ST
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',           // Larsonneur — GAP, relances courtes
            1: 'Latéral Offensif',                    // Vega — Anticipation 15, Dribbles 14, 6 PA
            2: 'Défenseur Central Strict',            // Nadé — Marquage 16, Courage 16
            3: 'Défenseur Central À L\'aise Au Pied', // Ramos Mingo — Passes 13, Tech 13, JdT 15
            4: 'Arrière Latéral',                     // Ferreira — reste défensif, Courage 15
            5: 'Milieu Défensif',                     // Moueffek — Déterm 20!, bouclier devant DC lents
            6: 'Meneur De Jeu En Retrait',            // Jaber — Passes 15, End 17, distribue
            7: 'Ailier Meneur De Jeu',                // Ben Old — note 7.87!, gaucher côté gauche, créatif
            8: 'Milieu De Couloir',                   // Humphreys — 6 buts!, Technique 15, rentre axe
            9: 'Attaquant Désaxé',                    // Cardona — 14 BUTS!, reste côté droit, tire
            10: 'Renard Des Surfaces'                 // Stassin — Placement 15, Finition 15, 5 buts remplaçant
        },

        // 4-1-4-1 OOP : 0=GK 1=LB 2=CB 3=CB 4=RB 5=DM 6=LM 7=CM 8=CM 9=RM 10=ST
        rolesOOP: {
            0: 'Gardien De But',
            1: 'Arrière Latéral De Pressing',         // Vega presse gauche
            2: 'Défenseur Central Stoppeur',          // Nadé — sort sur le porteur
            3: 'Défenseur Central De Couverture',     // Ramos Mingo — reste, couvre
            4: 'Arrière Latéral En Retrait',          // Ferreira — reste bas, pas d\'espace derrière
            5: 'Milieu Défensif De Couverture',       // Moueffek — ancre devant défense
            6: 'Milieu Latéral De Couverture',        // Jaber — couvre côté gauche
            7: 'Milieu Axial De Couverture',          // Ben Old — revient défendre
            8: 'Milieu Axial De Pressing',            // Humphreys — presse côté droit
            9: 'Milieu Latéral De Contre-Attaque',    // Cardona — reste haut pour contre
            10: 'Avant-Centre Point D\'appui Axial'   // Stassin — reste haut, contre-attaque
        }
    },

    'squad-auto-433dm': {
        name: 'Mon Équipe — Axial Counter-Press',
        coach: 'Auto (CSV 02/04/26 v2)',
        team: 'Mon Équipe',
        formationIP: '4-3-3-dm',
        formationOOP: '4-1-4-1',
        mentality: 4,
        difficulty: 3,
        effectiveness: 5,
        physical: 4,
        description: 'Jeu AXIAL — centres supprimés (aérien 12.6 = trop faible, 2/22 réussis). Cardona finisseur dans la surface (11 buts). Humphreys (4G) + Jaber (5G) alimentent Davitashvili (3G 5A) et Cardona. Pace équipe 13.45 → transitions rapides activées.',
        strengths: ['Cardona 11 buts — finisseur dans la surface (Renard)', 'Humphreys 4 buts — MdC créatif en montée', 'Davitashvili 3G 5A — coupe en dedans, crée l\'espace', 'Vega 5A — latéral offensif côté gauche'],
        weaknesses: ['Pressing moyen (12.95) — éviter much-more trigger', 'Jeu aérien faible (12.6) — ne pas centrer'],

        // CONSIGNES EN POSSESSION
        instructionsIP: {
            'passing-style': 'standard',           // Passes équilibrées
            'tempo': 'higher',                     // Tempo élevé — pace 13.45
            'width-attack': 'standard',            // STANDARD — pas de jeu large (aérien 12.6 = centres inutiles)
            'attack-focus': 'center',              // JEU AXIAL — Cardona + Humphreys dans l'axe
            'pass-target': 'standard',
            'crossing-patience': 'work-ball',      // Jouer le ballon dans la surface, pas centrer
            'crossing-style': 'low',               // Si centre = ras de terre uniquement
            'dribbling': 'encourage',              // Davitashvili / Gory / Cardona dribbleurs
            'long-shots': 'standard',
            'creative-freedom': 'balanced',
            'pressing-strategy': 'bypass',         // Contourner le pressing — transitions vite
            'set-pieces': 'no',
            'goal-kicks': 'short',                 // Larsonneur GAP — relances courtes
            'distribution-target': 'cb',
            'distribution-speed': 'fast',          // Relances rapides — pace 13.45
            'time-wasting': 'normal',
            'counter-attack': 'yes'                // Contre-attaque activée
        },

        // CONSIGNES HORS POSSESSION
        instructionsOOP: {
            'pressing-height': 'medium',           // Pressing médian
            'defensive-line': 'standard',          // Ligne standard (CBs corrects)
            'pressing-trigger': 'more',            // Presser plus souvent
            'defensive-transition': 'counter-press', // Contre-pressing immédiat
            'tackling': 'stay',                    // Ne pas se jeter
            'pressing-crosses': 'prevent',
            'pressing-trap': 'inside',             // Attirer vers l'axe
            'defensive-behavior': 'balanced',
            'prevent-short-gk': 'no'
        },

        // Courses de soutien
        overlaps: {
            'overlap-left': true,                  // Vega déborde côté gauche
            'overlap-right': false,
            'underlap-left': false,
            'underlap-right': false
        },

        // RÔLES EN POSSESSION — 4-3-3-dm
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=CM, 7=CM, 8=LW, 9=ST, 10=RW
        rolesIP: {
            0: 'Gardien À L\'aise Au Pied',              // Larsonneur — GAP, relances courtes
            1: 'Latéral Offensif',                       // Vega — reste large, croise / dédouble (5 assists)
            2: 'Défenseur Central À L\'aise Au Pied',    // Nadé — gaucher, bon pied (DCP)
            3: 'Défenseur Central',                      // Batubinsika — physique, DCs
            4: 'Latéral Offensif',                       // Ferreira — LOf offensif (7.02)
            5: 'Milieu Défensif',                        // Moueffek — MD ancre (Déterm. 20!)
            6: 'Milieu De Couloir',                      // Jaber — B2B 5 buts (7.55 ⭐)
            7: 'Meneur De Jeu Du Milieu',                // Humphreys — MdC créatif (3G 1A)
            8: 'Attaquant Intérieur',                    // Davitashvili — coupe en dedans gauche (3G 5A)
            9: 'Renard Des Surfaces',                    // Cardona — 11 buts, finisseur dans la surface
            10: 'Ailier'                                 // Gory — ailier droit large (3G 4A)
        },

        // RÔLES HORS POSSESSION — 4-1-4-1
        // 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=LM, 7=CM, 8=CM, 9=RM, 10=ST
        rolesOOP: {
            0: 'Gardien Libéro',
            1: 'Arrière Latéral De Pressing',            // Vega presse côté gauche
            2: 'Défenseur Central De Couverture',        // Nadé couverture
            3: 'Défenseur Central Stoppeur',             // Batubinsika agressif
            4: 'Arrière Latéral En Retrait',             // Ferreira reste bas — évite espaces derrière
            5: 'Milieu Défensif De Couverture',          // Moueffek — ancre, protège ligne
            6: 'Milieu Latéral De Couverture',           // Davitashvili revient
            7: 'Milieu Axial De Pressing',               // Jaber seul presser axial
            8: 'Milieu Axial De Couverture',             // Humphreys couvre (pas deux presseurs)
            9: 'Milieu Latéral De Couverture',           // Gory revient
            10: 'Attaquant Central'                      // Cardona — pressing haut
        }
    }
};

// Counter Formations
const COUNTER_FORMATIONS = {
    '4-4-2': ['4-3-3', '4-2-3-1', '3-5-2'],
    '4-4-2-diamond': ['4-4-2', '4-2-3-1', '5-3-2'],
    '4-3-3': ['4-4-2', '5-4-1', '4-1-4-1'],
    '4-3-3-dm': ['4-4-2', '4-2-3-1', '3-5-2'],
    '4-2-3-1': ['4-3-3', '3-4-3', '4-4-2'],
    '4-1-4-1': ['4-3-3', '4-2-3-1', '3-4-3'],
    '4-3-2-1': ['4-4-2', '4-2-3-1', '5-3-2'],
    '4-4-1-1': ['4-3-3', '3-5-2', '4-2-3-1'],
    '3-5-2': ['4-3-3', '4-4-2', '5-2-3'],
    '3-4-3': ['5-4-1', '4-4-2', '4-1-4-1'],
    '3-4-2-1': ['4-4-2', '5-3-2', '4-2-3-1'],
    '3-1-4-2': ['4-3-3', '4-4-2', '5-4-1'],
    '5-3-2': ['4-3-3', '3-4-3', '4-2-3-1'],
    '5-4-1': ['3-4-3', '4-3-3', '4-2-3-1'],
    '5-2-3': ['4-4-2', '5-4-1', '4-3-3']
};

// FM26 Analysis Tips
const ANALYSIS_TIPS = {
    strengths: {
        highPress: "Pressing haut efficace pour récupérer le ballon dans les zones dangereuses",
        possession: "Bonne conservation du ballon grâce aux passes courtes",
        width: "Utilisation efficace de la largeur du terrain",
        compactness: "Équipe compacte difficile à percer",
        counterAttack: "Transitions rapides et dangereuses",
        solidDefense: "Arrière-garde solide et organisée",
        creativity: "Nombreuses options créatives au milieu",
        wingPlay: "Débordements efficaces sur les ailes",
        targetMan: "Jeu aérien menaçant avec un pivot",
        flexibility: "Formation flexible permettant plusieurs variantes",
        dualFormation: "FM26 - Transition fluide entre les deux formations",
        invertedWingbacks: "FM26 - Latéraux inversés créant une supériorité au milieu",
        halfSpaces: "FM26 - Exploitation des demi-espaces offensive",
        oopRoles: "FM26 - Rôles OOP bien définis pour le pressing"
    },
    weaknesses: {
        highLine: "Ligne haute vulnérable aux balles en profondeur",
        narrowDefense: "Espaces sur les côtés exploitables",
        wideDefense: "Centre du terrain exposé",
        lowBlock: "Difficulté à garder le ballon",
        slowTempo: "Tempo lent permettant à l'adversaire de s'organiser",
        lackOfWidth: "Manque de largeur offensive",
        exposedFlanks: "Latéraux exposés en cas de perte de balle",
        midFieldGap: "Espace entre la défense et le milieu",
        isolatedStriker: "Attaquant isolé du reste de l'équipe",
        vulnerableCounters: "Vulnérable aux contre-attaques rapides",
        transitionRisk: "FM26 - Risque lors des transitions entre formations"
    },
    recommendations: {
        useWidth: "Exploitez les espaces sur les ailes avec vos latéraux",
        pressHigh: "Appliquez un pressing haut pour récupérer le ballon rapidement",
        beTight: "Restez compact pour éviter les espaces entre les lignes",
        useTargetMan: "Utilisez un attaquant pivot pour gagner les duels aériens",
        playDirect: "Jouez directement pour contourner le pressing adverse",
        buildUp: "Construisez patiemment depuis l'arrière",
        useFullBacks: "Impliquez vos latéraux dans la phase offensive",
        protectCenter: "Protégez l'axe central avec vos milieux défensifs",
        quickTransitions: "Privilégiez les transitions rapides après récupération",
        crossMore: "Augmentez le nombre de centres depuis les ailes",
        useInvertedWB: "FM26 - Utilisez des pistons intérieurs pour contrôler le milieu",
        exploitHalfSpaces: "FM26 - Ciblez les demi-espaces avec vos milieux offensifs",
        trainOOPRoles: "FM26 - Entraînez vos joueurs sur leurs rôles hors possession",
        matchFormations: "FM26 - Assurez une transition fluide entre vos 2 formations"
    }
};

// ==========================================
// FM26 CONSIGNES INDIVIDUELLES PAR PRESET
// Seules les consignes NON-DEFAULT et NON-VERROUILLÉES sont listées
// Les consignes verrouillées par le rôle sont appliquées automatiquement
// ==========================================
const PRESET_PLAYER_INSTRUCTIONS = {
    'guardiola-tiki-taka': {
        // 4-3-3: 0=GK,1=LB,2=CB,3=CB,4=RB,5=CM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-crossing-frequency': 'less' },
        2: { 'pi-passing-style': 'shorter' },
        3: { 'pi-passing-style': 'shorter' },
        4: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-crossing-frequency': 'less' },
        5: { 'pi-run-frequency': 'more', 'pi-dribbling': 'more', 'pi-pressing': 'more' },
        6: { 'pi-passing-style': 'shorter', 'pi-shooting': 'less', 'pi-pressing': 'more' },
        7: { 'pi-run-frequency': 'more', 'pi-dribbling': 'more', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        9: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-pressing': 'more' }
    },
    'klopp-gegenpressing': {
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        2: { 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        3: { 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        5: { 'pi-passing-style': 'direct', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-shooting': 'less', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        8: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        9: { 'pi-shooting': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        10: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-pressing': 'more' }
    },
    'ancelotti-balanced': {
        // 4-3-3-dm: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more' },
        5: { 'pi-passing-style': 'shorter', 'pi-shooting': 'less' },
        7: { 'pi-dribbling': 'more' },
        8: { 'pi-crossing-frequency': 'more', 'pi-dribbling': 'more' },
        9: { 'pi-shooting': 'more' },
        10: { 'pi-shooting': 'more', 'pi-dribbling': 'more' }
    },
    'mourinho-defensive': {
        // 5-3-2: 0=GK,1=LWB,2=CB,3=CB,4=CB,5=RWB,6=CM,7=CM,8=CM,9=ST,10=ST
        1: { 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        2: { 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        3: { 'pi-marking': 'tighter' },
        4: { 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        5: { 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        6: { 'pi-passing-style': 'direct', 'pi-shooting': 'less' },
        7: { 'pi-passing-style': 'direct', 'pi-shooting': 'less' },
        8: { 'pi-passing-style': 'direct' },
        9: { 'pi-passing-style': 'direct' },
        10: { 'pi-passing-style': 'direct', 'pi-dribbling': 'more' }
    },
    'arteta-positional': {
        // 4-3-3: 0=GK,1=LB,2=CB,3=CB,4=RB,5=CM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less' },
        2: { 'pi-passing-style': 'shorter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline' },
        5: { 'pi-passing-style': 'direct', 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        6: { 'pi-shooting': 'less', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        9: { 'pi-shooting': 'more', 'pi-pressing': 'more' },
        10: { 'pi-shooting': 'more', 'pi-dribbling': 'more' }
    },
    'simeone-compact': {
        // 4-4-2: 0=GK,1=LB,2=CB,3=CB,4=RB,5=LM,6=CM,7=CM,8=RM,9=ST,10=ST
        1: { 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        2: { 'pi-marking': 'tighter', 'pi-dribbling': 'less' },
        3: { 'pi-marking': 'tighter' },
        4: { 'pi-defensive-position': 'deeper' },
        5: { 'pi-defensive-position': 'deeper', 'pi-crossing-frequency': 'less' },
        6: { 'pi-pressing': 'more', 'pi-tackling': 'harder', 'pi-shooting': 'less' },
        7: { 'pi-pressing': 'more', 'pi-tackling': 'harder', 'pi-shooting': 'less' },
        8: { 'pi-defensive-position': 'deeper', 'pi-crossing-frequency': 'less' },
        9: { 'pi-passing-style': 'direct' },
        10: { 'pi-dribbling': 'more' }
    },
    'slot-liverpool': {
        // 4-2-3-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline' },
        2: { 'pi-passing-style': 'shorter' },
        4: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less' },
        5: { 'pi-shooting': 'less', 'pi-pressing': 'more' },
        6: { 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        8: { 'pi-dribbling': 'more' },
        9: { 'pi-shooting': 'more', 'pi-dribbling': 'more' },
        10: { 'pi-shooting': 'more', 'pi-run-frequency': 'more' }
    },
    'false-9-specialist': {
        // 4-3-3: 0=GK,1=LB,2=CB,3=CB,4=RB,5=CM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline' },
        2: { 'pi-passing-style': 'shorter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline' },
        5: { 'pi-run-frequency': 'more', 'pi-dribbling': 'more' },
        6: { 'pi-passing-style': 'shorter', 'pi-shooting': 'less' },
        7: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more' },
        8: { 'pi-shooting': 'more', 'pi-dribbling': 'more', 'pi-run-frequency': 'more' },
        9: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'more' },
        10: { 'pi-shooting': 'more', 'pi-dribbling': 'more', 'pi-run-frequency': 'more' }
    },
    'inverted-fullbacks-meta': {
        // 4-3-3-dm: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-passing-style': 'shorter', 'pi-crossing-frequency': 'less' },
        2: { 'pi-passing-style': 'shorter' },
        3: { 'pi-passing-style': 'shorter' },
        4: { 'pi-passing-style': 'shorter', 'pi-crossing-frequency': 'less' },
        5: { 'pi-passing-style': 'shorter', 'pi-shooting': 'less' },
        6: { 'pi-shooting': 'less' },
        7: { 'pi-dribbling': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        9: { 'pi-shooting': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' }
    },
    'counter-attack-master': {
        // 4-4-2: 0=GK,1=LB,2=CB,3=CB,4=RB,5=LM,6=CM,7=CM,8=RM,9=ST,10=ST
        1: { 'pi-passing-style': 'direct', 'pi-defensive-position': 'deeper' },
        2: { 'pi-passing-style': 'direct', 'pi-marking': 'tighter' },
        3: { 'pi-passing-style': 'direct', 'pi-marking': 'tighter' },
        4: { 'pi-passing-style': 'direct', 'pi-defensive-position': 'deeper' },
        5: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-cross-from': 'byline' },
        6: { 'pi-passing-style': 'direct', 'pi-shooting': 'less' },
        7: { 'pi-passing-style': 'direct', 'pi-shooting': 'less' },
        8: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-cross-from': 'byline' },
        9: { 'pi-shooting': 'more', 'pi-passing-style': 'direct' },
        10: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more' }
    },
    'total-domination': {
        // 4-3-3: 0=GK,1=LB,2=CB,3=CB,4=RB,5=CM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        2: { 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        3: { 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        4: { 'pi-crossing-frequency': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        5: { 'pi-run-frequency': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-shooting': 'less', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more', 'pi-pressing': 'more' },
        9: { 'pi-shooting': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        10: { 'pi-shooting': 'more', 'pi-dribbling': 'more', 'pi-pressing': 'more' }
    },
    'park-the-bus': {
        // 4-1-4-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=LM,7=CM,8=CM,9=RM,10=ST
        1: { 'pi-crossing-frequency': 'less', 'pi-dribbling': 'less', 'pi-defensive-position': 'deeper', 'pi-marking': 'tighter' },
        2: { 'pi-dribbling': 'less', 'pi-marking': 'tighter', 'pi-defensive-position': 'deeper' },
        3: { 'pi-dribbling': 'less', 'pi-marking': 'tighter', 'pi-defensive-position': 'deeper' },
        4: { 'pi-crossing-frequency': 'less', 'pi-dribbling': 'less', 'pi-defensive-position': 'deeper', 'pi-marking': 'tighter' },
        5: { 'pi-shooting': 'less', 'pi-dribbling': 'less', 'pi-defensive-position': 'deeper' },
        6: { 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        7: { 'pi-shooting': 'less', 'pi-passing-style': 'direct' },
        8: { 'pi-shooting': 'less', 'pi-passing-style': 'direct' },
        9: { 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        10: { 'pi-passing-style': 'direct' }
    },
    'conte-352': {
        // 3-5-2: 0=GK,1=CB,2=CB,3=CB,4=LWB,5=CM,6=CM,7=CM,8=RWB,9=ST,10=ST
        1: { 'pi-marking': 'tighter' },
        2: { 'pi-marking': 'tighter' },
        3: { 'pi-marking': 'tighter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        5: { 'pi-run-frequency': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-shooting': 'less' },
        7: { 'pi-run-frequency': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        8: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        9: { 'pi-shooting': 'more', 'pi-run-frequency': 'more' },
        10: { 'pi-passing-style': 'direct' }
    },
    'de-zerbi-possession': {
        // 4-2-3-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        1: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'more' },
        2: { 'pi-passing-style': 'shorter' },
        3: { 'pi-passing-style': 'shorter' },
        4: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'more' },
        5: { 'pi-passing-style': 'shorter', 'pi-shooting': 'less', 'pi-pressing': 'more' },
        6: { 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-shooting': 'less' },
        8: { 'pi-dribbling': 'more' },
        9: { 'pi-dribbling': 'more', 'pi-shooting': 'less' },
        10: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'more' }
    },
    'zaz-autumn-meta': {
        // 3-4-3: 0=GK,1=CB,2=CB,3=CB,4=LWB,5=CM,6=CM,7=RWB,8=LW,9=ST,10=RW
        1: { 'pi-passing-style': 'shorter' },
        3: { 'pi-passing-style': 'shorter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        5: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        7: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        8: { 'pi-shooting': 'more', 'pi-dribbling': 'more' },
        9: { 'pi-shooting': 'more' },
        10: { 'pi-shooting': 'more', 'pi-dribbling': 'more' }
    },
    'ice-cold-meta': {
        // 3-4-2-1: 0=GK,1=CB,2=CB,3=CB,4=LWB,5=CM,6=CM,7=RWB,8=AM,9=AM,10=ST
        1: { 'pi-marking': 'tighter' },
        2: { 'pi-marking': 'tighter' },
        3: { 'pi-marking': 'tighter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-attacking-width': 'narrower' },
        5: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        7: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-attacking-width': 'narrower' },
        8: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more' },
        9: { 'pi-shooting': 'more', 'pi-run-frequency': 'more' },
        10: { 'pi-shooting': 'more', 'pi-dribbling': 'more' }
    },
    'argus-3430-meta': {
        // 3-4-3: 0=GK,1=CB,2=CB,3=CB,4=LWB,5=CM,6=CM,7=RWB,8=LW,9=ST,10=RW
        1: { 'pi-passing-style': 'shorter' },
        3: { 'pi-passing-style': 'shorter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-dribbling': 'more' },
        5: { 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-pressing': 'more' },
        7: { 'pi-crossing-frequency': 'more', 'pi-dribbling': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-shooting': 'more' },
        9: { 'pi-dribbling': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-shooting': 'more' }
    },
    'underdog-killer': {
        // 4-4-2: 0=GK,1=LB,2=CB,3=CB,4=RB,5=LM,6=CM,7=CM,8=RM,9=ST,10=ST
        1: { 'pi-crossing-frequency': 'more' },
        2: { 'pi-marking': 'tighter' },
        3: { 'pi-marking': 'tighter' },
        4: { 'pi-crossing-frequency': 'more' },
        5: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'deep' },
        6: { 'pi-passing-style': 'direct', 'pi-shooting': 'less' },
        7: { 'pi-passing-style': 'direct', 'pi-shooting': 'less' },
        8: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'deep' },
        9: { 'pi-passing-style': 'direct' },
        10: { 'pi-shooting': 'more', 'pi-run-frequency': 'more' }
    },
    'fluid-433-dm': {
        // 4-3-3-dm: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more' },
        2: { 'pi-passing-style': 'shorter' },
        4: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less' },
        5: { 'pi-passing-style': 'shorter', 'pi-shooting': 'less' },
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        9: { 'pi-shooting': 'more' },
        10: { 'pi-shooting': 'more', 'pi-dribbling': 'more' }
    },
    'asymmetric-4231': {
        // 4-2-3-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline' },
        2: { 'pi-passing-style': 'shorter' },
        4: { 'pi-passing-style': 'shorter', 'pi-crossing-frequency': 'less' },
        5: { 'pi-passing-style': 'shorter', 'pi-shooting': 'less' },
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        8: { 'pi-dribbling': 'more' },
        9: { 'pi-shooting': 'more', 'pi-dribbling': 'more' },
        10: { 'pi-shooting': 'more' }
    },
    'attacking-523': {
        // 5-2-3: 0=GK,1=LWB,2=CB,3=CB,4=CB,5=RWB,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        2: { 'pi-marking': 'tighter' },
        3: { 'pi-marking': 'tighter' },
        4: { 'pi-marking': 'tighter' },
        5: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        7: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        9: { 'pi-shooting': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' }
    },
    'meta-patch-dribble-press': {
        // 4-2-3-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-pressing': 'more' },
        2: { 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        4: { 'pi-crossing-frequency': 'more', 'pi-pressing': 'more' },
        5: { 'pi-shooting': 'less', 'pi-pressing': 'more' },
        6: { 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        8: { 'pi-dribbling': 'more' },
        9: { 'pi-dribbling': 'more', 'pi-shooting': 'more' },
        10: { 'pi-shooting': 'more', 'pi-run-frequency': 'more' }
    },
    'meta-patch-wide-transition': {
        // 4-3-3: 0=GK,1=LB,2=CB,3=CB,4=RB,5=CM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more', 'pi-pressing': 'more' },
        2: { 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        4: { 'pi-crossing-frequency': 'more', 'pi-pressing': 'more' },
        5: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        6: { 'pi-shooting': 'less', 'pi-pressing': 'more' },
        7: { 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-shooting': 'more' },
        9: { 'pi-shooting': 'more', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        10: { 'pi-dribbling': 'more', 'pi-shooting': 'more' }
    },
    'meta-patch-compact-midfield': {
        // 4-1-4-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=LM,7=CM,8=CM,9=RM,10=ST
        1: { 'pi-dribbling': 'less', 'pi-defensive-position': 'deeper', 'pi-marking': 'tighter' },
        2: { 'pi-dribbling': 'less', 'pi-marking': 'tighter', 'pi-defensive-position': 'deeper' },
        3: { 'pi-dribbling': 'less', 'pi-marking': 'tighter', 'pi-defensive-position': 'deeper' },
        4: { 'pi-dribbling': 'less', 'pi-defensive-position': 'deeper', 'pi-marking': 'tighter' },
        5: { 'pi-shooting': 'less', 'pi-dribbling': 'less' },
        6: { 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        7: { 'pi-passing-style': 'direct', 'pi-pressing': 'more' },
        8: { 'pi-passing-style': 'direct', 'pi-pressing': 'more' },
        9: { 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        10: { 'pi-passing-style': 'direct' }
    },
    'meta-patch-aggressive-343': {
        // 3-4-3: 0=GK,1=CB,2=CB,3=CB,4=LWB,5=CM,6=CM,7=RWB,8=LW,9=ST,10=RW
        1: { 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        2: { 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        3: { 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        5: { 'pi-pressing': 'more', 'pi-tackling': 'harder', 'pi-run-frequency': 'more' },
        6: { 'pi-pressing': 'more', 'pi-shooting': 'less' },
        7: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-dribbling': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-shooting': 'more' },
        9: { 'pi-shooting': 'more', 'pi-pressing': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-shooting': 'more' }
    },
    'meta-patch-inverted-fb': {
        // 4-3-3: 0=GK,1=LB,2=CB,3=CB,4=RB,5=CM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-passing-style': 'shorter', 'pi-crossing-frequency': 'less', 'pi-dribbling': 'less' },
        2: { 'pi-passing-style': 'shorter' },
        3: { 'pi-passing-style': 'shorter' },
        4: { 'pi-passing-style': 'shorter', 'pi-crossing-frequency': 'less', 'pi-dribbling': 'less' },
        5: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        6: { 'pi-shooting': 'less', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' },
        9: { 'pi-shooting': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-crossing-frequency': 'more' }
    },
    'om-marseille-2026': {
        // 4-3-3-dm: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=CM, 7=CM, 8=LW, 9=ST, 10=RW
        // Rulli | Emerson Pavard Medina Murillo | Hojbjerg | O'Riley Timber | Gouiri Aubameyang Greenwood
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more' },
        2: { 'pi-pass-risk': 'more', 'pi-passing-style': 'direct', 'pi-pressing': 'more' },
        3: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        5: { 'pi-shooting': 'less', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-pass-risk': 'more', 'pi-dribbling': 'less', 'pi-shooting': 'less' },
        7: { 'pi-run-frequency': 'more', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        9: { 'pi-shooting': 'more', 'pi-pressing': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-freedom': 'roam', 'pi-pressing': 'more' }
    },
    'om-vs-real-madrid-retour': {
        // 4-2-3-1: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=DM, 7=LW, 8=AM, 9=RW, 10=ST
        // Rulli | Emerson Pavard Medina Murillo | Hojbjerg Vermeeren | Gouiri O'Riley Greenwood | Aubameyang
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more', 'pi-forward-runs': 'more' },  // Emerson - monte en overlap, centre près de la ligne
        2: { 'pi-pass-risk': 'more', 'pi-passing-style': 'direct', 'pi-pressing': 'more' },                                     // Pavard - relance longue directe, pressing haut
        3: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },                                   // Medina - passes sûres, marquage serré sur Mbappé
        4: { 'pi-crossing-frequency': 'less', 'pi-forward-runs': 'hold', 'pi-pressing': 'more', 'pi-marking': 'tighter' },       // Murillo - prudent face à Mbappé/Vini, pas de montées
        5: { 'pi-shooting': 'less', 'pi-pressing': 'more', 'pi-tackling': 'harder', 'pi-passing-style': 'direct' },              // Hojbjerg - écran, tacles durs, relance directe
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more', 'pi-pass-risk': 'less' },                                        // Vermeeren - courses de soutien, pressing, passes sûres
        7: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-pressing': 'more', 'pi-run-direction': 'inside' },               // Gouiri - rentre pour frapper, dribble, pressing
        8: { 'pi-pass-risk': 'more', 'pi-dribbling': 'less', 'pi-shooting': 'less', 'pi-freedom': 'roam' },                      // O'Riley - créateur libre, passes risquées, pas de tir
        9: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-freedom': 'roam', 'pi-pressing': 'more', 'pi-run-direction': 'inside' }, // Greenwood - coupe intérieur, tire, dribble, libre
        10: { 'pi-shooting': 'more', 'pi-pressing': 'more', 'pi-forward-runs': 'more' }                                          // Aubameyang - appels profondeur, tire à vue, pressing
    },
    'om-csv-v2-2026': {
        // 4-2-3-1: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=DM, 7=LW, 8=AM, 9=RW, 10=ST
        // Rulli | Emerson Medina Pavard Murillo | Hojbjerg Timber | Gouiri O'Riley Greenwood | Aubameyang
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more', 'pi-forward-runs': 'more' },    // Emerson - Centres 14, Vitesse 15, overlap gauche agressif
        2: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },                                    // Medina - Endurance 19, ancre défensive, passes sûres
        3: { 'pi-pass-risk': 'more', 'pi-passing-style': 'direct', 'pi-pressing': 'more' },                                       // Pavard - Passes 15, Sang-froid 17, relance directe vers l'avant
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more', 'pi-forward-runs': 'more' },    // Murillo - Vitesse 15, Centres 14, overlap droit
        5: { 'pi-shooting': 'less', 'pi-pressing': 'more', 'pi-tackling': 'harder' },                                             // Hojbjerg - Volume 17, Tacles 15, écran défensif pur
        6: { 'pi-run-frequency': 'more', 'pi-shooting': 'more', 'pi-pressing': 'more' },                                         // Timber - Tirs loin 14(?), courses fréquentes, pressing
        7: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-pressing': 'more', 'pi-run-direction': 'inside' },               // Gouiri - Dribbles 15, Finition 15, rentre intérieur pour frapper
        8: { 'pi-pass-risk': 'more', 'pi-dribbling': 'less', 'pi-shooting': 'less', 'pi-freedom': 'roam' },                      // O'Riley - Vision 17, Passes 15, créateur libre, pas de tir
        9: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-freedom': 'roam', 'pi-pressing': 'more', 'pi-run-direction': 'inside' }, // Greenwood - Dribbles 16, Finition 16, deux pieds, libre, coupe intérieur
        10: { 'pi-shooting': 'more', 'pi-pressing': 'more', 'pi-forward-runs': 'more', 'pi-hold-ball': 'no' }                    // Aubameyang - Appels 17, Finition 16, courses profondeur, ne retient pas le ballon
    },
    'om-vs-liverpool-final-2026': {
        // 4-2-3-1: 0=GK, 1=LB, 2=CB, 3=CB, 4=RB, 5=DM, 6=DM, 7=LW, 8=AM, 9=RW, 10=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more', 'pi-forward-runs': 'more' },
        2: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        3: { 'pi-pass-risk': 'more', 'pi-passing-style': 'direct', 'pi-pressing': 'more' },
        4: { 'pi-crossing-frequency': 'less', 'pi-forward-runs': 'hold', 'pi-pressing': 'more', 'pi-marking': 'tighter' },
        5: { 'pi-shooting': 'less', 'pi-pressing': 'more', 'pi-tackling': 'harder', 'pi-marking': 'tighter' },
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more', 'pi-pass-risk': 'less' },
        7: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-run-direction': 'inside', 'pi-pressing': 'more' },
        8: { 'pi-pass-risk': 'more', 'pi-dribbling': 'less', 'pi-shooting': 'less', 'pi-freedom': 'roam' },
        9: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-freedom': 'roam', 'pi-run-direction': 'inside', 'pi-pressing': 'more' },
        10: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' }
    },
    'asse-saison-2026-2027': {
        // 4-3-3-dm: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        2: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        3: { 'pi-marking': 'tighter', 'pi-defensive-position': 'deeper' },
        4: { 'pi-forward-runs': 'standard', 'pi-crossing-frequency': 'standard', 'pi-pressing': 'more' },
        5: { 'pi-shooting': 'less', 'pi-forward-runs': 'hold', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-run-frequency': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        7: { 'pi-pass-risk': 'more', 'pi-shooting': 'less', 'pi-freedom': 'roam' },
        8: { 'pi-dribbling': 'more', 'pi-run-direction': 'inside', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        9: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-run-direction': 'outside', 'pi-crossing-frequency': 'more', 'pi-pressing': 'more' }
    },
    'asse-crise-433dm-urgence': {
        // 4-3-3-dm: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=CM,7=CM,8=LW,9=ST,10=RW
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        2: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        3: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        4: { 'pi-passing-style': 'shorter', 'pi-forward-runs': 'hold', 'pi-pressing': 'more' },
        5: { 'pi-shooting': 'less', 'pi-forward-runs': 'hold', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-run-frequency': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        7: { 'pi-pass-risk': 'more', 'pi-freedom': 'hold', 'pi-shooting': 'less', 'pi-pressing': 'more' },
        8: { 'pi-dribbling': 'more', 'pi-run-direction': 'inside', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        9: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        10: { 'pi-dribbling': 'more', 'pi-run-direction': 'outside', 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-pressing': 'more' }
    },
    'asse-domicile-ultra-offensive': {
        // 4-2-3-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        2: { 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        3: { 'pi-marking': 'tighter', 'pi-pressing': 'more' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        5: { 'pi-shooting': 'less', 'pi-forward-runs': 'hold', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-run-frequency': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-run-direction': 'inside', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        8: { 'pi-pass-risk': 'more', 'pi-freedom': 'roam', 'pi-forward-runs': 'more' },
        9: { 'pi-dribbling': 'more', 'pi-run-direction': 'inside', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        10: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' }
    },
    'asse-exterieur-securisee': {
        // 4-1-4-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=LM,7=CM,8=CM,9=RM,10=ST
        1: { 'pi-forward-runs': 'hold', 'pi-defensive-position': 'deeper', 'pi-crossing-frequency': 'less' },
        2: { 'pi-dribbling': 'less', 'pi-defensive-position': 'deeper', 'pi-marking': 'tighter' },
        3: { 'pi-dribbling': 'less', 'pi-defensive-position': 'deeper', 'pi-marking': 'tighter' },
        4: { 'pi-forward-runs': 'hold', 'pi-defensive-position': 'deeper', 'pi-crossing-frequency': 'less' },
        5: { 'pi-shooting': 'less', 'pi-forward-runs': 'hold', 'pi-defensive-position': 'deeper' },
        6: { 'pi-forward-runs': 'standard', 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        7: { 'pi-pass-risk': 'less', 'pi-shooting': 'less' },
        8: { 'pi-forward-runs': 'standard', 'pi-pass-risk': 'less', 'pi-shooting': 'less' },
        9: { 'pi-forward-runs': 'standard', 'pi-crossing-frequency': 'less', 'pi-defensive-position': 'deeper' },
        10: { 'pi-passing-style': 'direct', 'pi-forward-runs': 'more', 'pi-pressing': 'less' }
    },
    'asse-anti-bloc-bas-surface': {
        // 4-4-2: 0=GK,1=LB,2=CB,3=CB,4=RB,5=LM,6=CM,7=CM,8=RM,9=ST,10=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more' },
        2: { 'pi-marking': 'tighter' },
        3: { 'pi-marking': 'tighter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more' },
        5: { 'pi-dribbling': 'more', 'pi-run-direction': 'outside', 'pi-crossing-frequency': 'more' },
        6: { 'pi-forward-runs': 'more', 'pi-run-frequency': 'more', 'pi-pressing': 'more' },
        7: { 'pi-pass-risk': 'more', 'pi-forward-runs': 'more', 'pi-shooting': 'less' },
        8: { 'pi-dribbling': 'more', 'pi-run-direction': 'outside', 'pi-crossing-frequency': 'more' },
        9: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        10: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-hold-ball': 'yes' }
    },
    'mon-equipe-saison-2627': {
        // 4-2-3-1 IP: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        // Emerson=LB, Balerdi=CB, Aguerd/Medina=CB, Murillo=RB
        // Timber=DM ancre, Højbjerg=DM box-to-box
        // Gouiri=MOG (AID), Angel Gomes/Paixão=MO central, Greenwood=MOD (AID)
        // Maupay/BT recruté=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },   // Emerson - piston offensif, centre souvent
        2: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-forward-runs': 'hold' },                                  // Balerdi - solide, relance courte
        3: { 'pi-passing-style': 'direct', 'pi-dribbling': 'less', 'pi-forward-runs': 'hold', 'pi-marking': 'tighter' },         // DC droit - plus direct
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },    // Murillo - piston droit explosif
        5: { 'pi-shooting': 'less', 'pi-pressing': 'more', 'pi-tackling': 'harder', 'pi-forward-runs': 'hold' },                 // Timber - ancre, tackle, ne monte pas
        6: { 'pi-run-frequency': 'more', 'pi-pressing': 'more', 'pi-pass-risk': 'less', 'pi-forward-runs': 'more' },             // Højbjerg - box-to-box, court
        7: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-run-direction': 'inside', 'pi-pressing': 'more', 'pi-freedom': 'roam' }, // Gouiri - AID, coupe, tire
        8: { 'pi-pass-risk': 'more', 'pi-freedom': 'roam', 'pi-pressing': 'less', 'pi-forward-runs': 'more' },                   // MO central - créateur, vision
        9: { 'pi-dribbling': 'more', 'pi-shooting': 'more', 'pi-run-direction': 'inside', 'pi-pressing': 'more', 'pi-freedom': 'roam' }, // Greenwood - AID droit, les deux pieds
        10: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-pressing': 'more', 'pi-hold-ball': 'yes' }                   // ST - finisseur, courses, conservation
    },
    'elite-csv-2026': {
        // 4-2-3-1: 0=GK,1=LB,2=CB,3=CB,4=RB,5=DM,6=DM,7=LW,8=AM,9=RW,10=ST
        1: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        2: { 'pi-passing-style': 'shorter', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        3: { 'pi-passing-style': 'direct', 'pi-dribbling': 'less', 'pi-marking': 'tighter' },
        4: { 'pi-crossing-frequency': 'more', 'pi-cross-from': 'byline', 'pi-forward-runs': 'more', 'pi-pressing': 'more' },
        5: { 'pi-shooting': 'less', 'pi-forward-runs': 'hold', 'pi-pressing': 'more', 'pi-tackling': 'harder' },
        6: { 'pi-pass-risk': 'more', 'pi-passing-style': 'shorter', 'pi-pressing': 'more' },
        7: { 'pi-dribbling': 'more', 'pi-run-direction': 'inside', 'pi-shooting': 'more', 'pi-pressing': 'more' },
        8: { 'pi-pass-risk': 'more', 'pi-freedom': 'roam', 'pi-forward-runs': 'more', 'pi-pressing': 'less' },
        9: { 'pi-dribbling': 'more', 'pi-run-direction': 'inside', 'pi-shooting': 'more', 'pi-freedom': 'roam', 'pi-pressing': 'more' },
        10: { 'pi-shooting': 'more', 'pi-forward-runs': 'more', 'pi-hold-ball': 'no', 'pi-pressing': 'more' }
    }
};

const PLAYER_INSTRUCTION_META = (() => {
    const all = [
        ...(PLAYER_INSTRUCTIONS.withBall || []),
        ...(PLAYER_INSTRUCTIONS.withoutBall || [])
    ];
    const byId = {};
    all.forEach(instr => {
        byId[instr.id] = {
            options: new Set((instr.options || []).map(opt => opt.value)),
            positions: new Set(instr.positions || [])
        };
    });
    return byId;
})();

function sanitizeInstructionSetForPosition(instructionSet, positionCode) {
    const clean = {};
    Object.entries(instructionSet || {}).forEach(([instructionId, value]) => {
        const meta = PLAYER_INSTRUCTION_META[instructionId];
        if (!meta) return;
        if (meta.positions.size > 0 && !meta.positions.has(positionCode)) return;
        if (!meta.options.has(value)) return;
        clean[instructionId] = value;
    });
    return clean;
}

function sanitizePresetPlayerInstructions(preset, playerInstructions) {
    const clean = {};
    const formation = FORMATIONS[preset.formationIP] || [];

    Object.entries(playerInstructions || {}).forEach(([idxStr, instructions]) => {
        const idx = parseInt(idxStr, 10);
        const pos = formation[idx];
        if (!pos || pos.pos === 'GK') return;

        const sanitized = sanitizeInstructionSetForPosition(instructions, pos.pos);
        if (Object.keys(sanitized).length > 0) {
            clean[idx] = sanitized;
        }
    });

    return clean;
}

function getProfileInstructionsForPosition(preset, positionCode) {
    const ip = preset.instructionsIP || {};
    const oop = preset.instructionsOOP || {};
    const profile = {};

    const isWidePlayer = ['LB', 'RB', 'LWB', 'RWB', 'LM', 'RM', 'LW', 'RW'].includes(positionCode);
    const isAttacker = ['AM', 'LW', 'RW', 'ST'].includes(positionCode);
    const isMidfielder = ['DM', 'CM', 'AM', 'LM', 'RM'].includes(positionCode);
    const isDefender = ['CB', 'LB', 'RB', 'LWB', 'RWB'].includes(positionCode);

    if (ip['passing-style'] === 'direct' || ip['passing-style'] === 'much-direct') {
        if (['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'ST'].includes(positionCode)) {
            profile['pi-passing-style'] = 'direct';
        }
    }
    if (ip['passing-style'] === 'shorter' || ip['passing-style'] === 'much-shorter') {
        if (['CB', 'LB', 'RB', 'LWB', 'RWB', 'DM', 'CM', 'AM', 'ST'].includes(positionCode)) {
            profile['pi-passing-style'] = 'shorter';
        }
    }

    if (ip.dribbling === 'encourage') {
        if (positionCode !== 'CB') profile['pi-dribbling'] = 'more';
    } else if (ip.dribbling === 'discourage') {
        profile['pi-dribbling'] = 'less';
    }

    if (ip['long-shots'] === 'encourage' && (isMidfielder || isAttacker)) {
        profile['pi-shooting'] = 'more';
    }
    if (ip['long-shots'] === 'discourage' && (isMidfielder || isAttacker)) {
        profile['pi-shooting'] = 'less';
    }

    if (ip['crossing-patience'] === 'early' && isWidePlayer) {
        profile['pi-cross-from'] = 'deep';
        profile['pi-crossing-frequency'] = 'more';
    }
    if (ip['crossing-patience'] === 'work-ball' && isWidePlayer) {
        profile['pi-crossing-frequency'] = 'less';
    }

    if (ip['attack-focus'] === 'flanks' && isWidePlayer) {
        profile['pi-attacking-width'] = 'wider';
    }
    if (ip['attack-focus'] === 'center' && isAttacker) {
        profile['pi-attacking-width'] = 'spaces';
    }

    if (ip['counter-attack'] === 'yes') {
        if (isAttacker || ['LM', 'RM'].includes(positionCode)) {
            profile['pi-forward-runs'] = 'more';
        }
    } else if (ip['counter-attack'] === 'hold') {
        if (isDefender || positionCode === 'DM') {
            profile['pi-forward-runs'] = 'hold';
        }
    }

    if (ip['creative-freedom'] === 'expressive' && (isAttacker || positionCode === 'AM')) {
        profile['pi-freedom'] = 'roam';
        profile['pi-pass-risk'] = 'more';
    }
    if (ip['creative-freedom'] === 'discipline' && (isDefender || positionCode === 'DM')) {
        profile['pi-freedom'] = 'hold';
        profile['pi-pass-risk'] = 'less';
    }

    if (oop['pressing-trigger'] === 'much-more') profile['pi-pressing'] = 'much-more';
    if (oop['pressing-trigger'] === 'more') profile['pi-pressing'] = 'more';
    if (oop['pressing-trigger'] === 'less') profile['pi-pressing'] = 'less';
    if (oop['pressing-trigger'] === 'much-less') profile['pi-pressing'] = 'much-less';

    if (oop.tackling === 'commit') profile['pi-tackling'] = 'harder';
    if (oop.tackling === 'stay') profile['pi-tackling'] = 'ease';

    if (oop['defensive-behavior'] === 'higher' && (isDefender || ['DM', 'CM', 'LM', 'RM'].includes(positionCode))) {
        profile['pi-defensive-position'] = 'higher';
    }
    if (oop['defensive-behavior'] === 'lower' && (isDefender || ['DM', 'CM', 'LM', 'RM'].includes(positionCode))) {
        profile['pi-defensive-position'] = 'deeper';
    }

    return sanitizeInstructionSetForPosition(profile, positionCode);
}

function generateBasePlayerInstructionsForPreset(preset) {
    const generated = {};
    const formation = FORMATIONS[preset.formationIP] || [];

    formation.forEach((player, idx) => {
        if (!player || player.pos === 'GK') return;

        const roleName = preset.rolesIP ? preset.rolesIP[idx] : null;
        const roleLocks = roleName && ROLE_LOCKED_INSTRUCTIONS[roleName]
            ? ROLE_LOCKED_INSTRUCTIONS[roleName]
            : {};

        const withBallLocks = sanitizeInstructionSetForPosition(roleLocks, player.pos);
        const profile = getProfileInstructionsForPosition(preset, player.pos);
        const combined = { ...withBallLocks, ...profile };

        if (Object.keys(combined).length > 0) {
            generated[idx] = combined;
        }
    });

    return generated;
}

// Merge player instructions into all presets:
// 1) generated tactical base for every preset, 2) explicit overrides from PRESET_PLAYER_INSTRUCTIONS
Object.entries(PRESETS).forEach(([presetKey, preset]) => {
    const base = generateBasePlayerInstructionsForPreset(preset);
    const explicit = sanitizePresetPlayerInstructions(preset, PRESET_PLAYER_INSTRUCTIONS[presetKey] || {});
    const merged = { ...base };

    Object.entries(explicit).forEach(([idx, instr]) => {
        merged[idx] = { ...(merged[idx] || {}), ...instr };
    });

    preset.playerInstructions = merged;
});

// Export for use in app.js
window.FM26Data = {
    FORMATIONS,
    SUGGESTED_OOP_FORMATIONS,
    POSITION_ROLES_IP,
    POSITION_ROLES_OOP,
    PLAYER_INSTRUCTIONS,
    ROLE_LOCKED_INSTRUCTIONS,
    MENTALITY_LABELS,
    PRESETS,
    COUNTER_FORMATIONS,
    ANALYSIS_TIPS
};
