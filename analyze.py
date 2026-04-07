import csv, sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

with open('c:/Users/nonog/Documents/tool fm26 tactics/player_export_20260329_194901.csv', 'r', encoding='utf-8-sig') as f:
    reader = csv.reader(f, delimiter=';')
    headers = next(reader)
    players = [row for row in reader if len(row) > 60]

def safe_int(v):
    try: return int(v)
    except: return 0

plist = []
for row in players:
    if len(row) < 62: continue
    p = {
        'name': row[1], 'sel': row[0], 'posn': row[2], 'bpos': row[3], 'role': row[4],
        'na': safe_int(row[61]), 'pot': safe_int(row[62]), 'age': safe_int(row[63]),
        'moral': row[64],
        # GK
        'aer': safe_int(row[10]), 'cmd': safe_int(row[11]), 'comm': safe_int(row[12]),
        'han': safe_int(row[13]), 'kic': safe_int(row[15]), 'one': safe_int(row[16]),
        'pun': safe_int(row[17]), 'ref': safe_int(row[18]), 'tro': safe_int(row[20]),
        # Mental
        'agg': safe_int(row[21]), 'ant': safe_int(row[22]), 'brav': safe_int(row[23]),
        'comp': safe_int(row[24]), 'conc': safe_int(row[25]), 'dec': safe_int(row[26]),
        'det': safe_int(row[27]), 'flair': safe_int(row[28]), 'lead': safe_int(row[29]),
        'otb': safe_int(row[30]), 'pos': safe_int(row[31]), 'team': safe_int(row[32]),
        'vis': safe_int(row[33]), 'wor': safe_int(row[34]),
        # Physical
        'acc': safe_int(row[35]), 'agi': safe_int(row[36]), 'bal': safe_int(row[37]),
        'jmp': safe_int(row[38]), 'nf': safe_int(row[39]), 'pac': safe_int(row[40]),
        'sta': safe_int(row[41]), 'str': safe_int(row[42]),
        # Technical
        'cor': safe_int(row[43]), 'cro': safe_int(row[44]), 'dri': safe_int(row[45]),
        'fin': safe_int(row[46]), 'fir': safe_int(row[47]), 'fk': safe_int(row[48]),
        'hea': safe_int(row[49]), 'lon': safe_int(row[50]), 'lth': safe_int(row[51]),
        'mar': safe_int(row[52]), 'pas': safe_int(row[53]), 'pen': safe_int(row[54]),
        'tac': safe_int(row[55]), 'tec': safe_int(row[56]),
        'rating': row[72] if len(row) > 72 else '',
        'goals': row[70] if len(row) > 70 else '',
        'assists': row[71] if len(row) > 71 else '',
        'matches': row[69] if len(row) > 69 else '',
    }
    plist.append(p)

print('='*80)
print('FULL SQUAD ANALYSIS - CHAMPIONS LEAGUE FINAL XI vs LIVERPOOL')
print('='*80)

# 1. GK
print('\n' + '-'*60)
print('1. GOALKEEPER')
print('-'*60)
gks = [p for p in plist if 'GB' in p['posn']]
gks.sort(key=lambda p: p['na'], reverse=True)
for p in gks[:3]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']}")
    print(f"    1v1:{p['one']} Ref:{p['ref']} Han:{p['han']} Cmd:{p['cmd']} Comm:{p['comm']}")
    print(f"    Kic:{p['kic']} Aer:{p['aer']} Pun:{p['pun']} Throw:{p['tro']}")
    print(f"    Comp:{p['comp']} Conc:{p['conc']} Dec:{p['dec']} Pos:{p['pos']}")
    print(f"    Rating:{p['rating']} Matches:{p['matches']}")
    print()

# 2. RB
print('-'*60)
print('2. RIGHT BACK')
print('-'*60)
rbs = [p for p in plist if 'D (D)' in p['bpos'] or 'D (DC)' in p['bpos'] or ('D (D)' in p['posn'] and 'GB' not in p['posn'])]
rbs = list({p['name']: p for p in rbs}.values())
rbs.sort(key=lambda p: p['na'], reverse=True)
for p in rbs[:5]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']} | Pos:{p['posn']} Role:{p['role']}")
    print(f"    Tac:{p['tac']} Mar:{p['mar']} Ant:{p['ant']} Pos:{p['pos']} Conc:{p['conc']}")
    print(f"    Acc:{p['acc']} Pac:{p['pac']} Sta:{p['sta']} Cro:{p['cro']} Dec:{p['dec']}")
    print(f"    Rating:{p['rating']} Matches:{p['matches']}")
    print()

# 3. CB
print('-'*60)
print('3. CENTRE BACK')
print('-'*60)
cbs = [p for p in plist if p['bpos'] in ['D (C)', 'D (GC)', 'D (DC)'] or 'D (C)' in p['posn']]
cbs = [p for p in cbs if p['na'] > 100]
cbs.sort(key=lambda p: p['na'], reverse=True)
for p in cbs[:6]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']} | Pos:{p['posn']} Role:{p['role']}")
    print(f"    Mar:{p['mar']} Tac:{p['tac']} Hea:{p['hea']} Pos:{p['pos']} Comp:{p['comp']}")
    print(f"    Jmp:{p['jmp']} Str:{p['str']} Ant:{p['ant']} Conc:{p['conc']} Brav:{p['brav']} Dec:{p['dec']}")
    print(f"    Pac:{p['pac']} Acc:{p['acc']} Lead:{p['lead']} Team:{p['team']}")
    print(f"    Rating:{p['rating']} Matches:{p['matches']}")
    print()

# 4. LB
print('-'*60)
print('4. LEFT BACK')
print('-'*60)
lbs = [p for p in plist if p['bpos'] in ['D (G)', 'D (GC)'] or 'AL (G)' in p['posn'] or 'D (G)' in p['posn']]
lbs = [p for p in lbs if p['na'] > 100]
lbs.sort(key=lambda p: p['na'], reverse=True)
for p in lbs[:5]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']} | Pos:{p['posn']} Role:{p['role']}")
    print(f"    Tac:{p['tac']} Mar:{p['mar']} Ant:{p['ant']} Pos:{p['pos']} Conc:{p['conc']}")
    print(f"    Acc:{p['acc']} Pac:{p['pac']} Sta:{p['sta']} Cro:{p['cro']} Dec:{p['dec']}")
    print(f"    Team:{p['team']} Wor:{p['wor']} Brav:{p['brav']}")
    print(f"    Rating:{p['rating']} Matches:{p['matches']}")
    print()

# 5. DM
print('-'*60)
print('5. DEFENSIVE MIDFIELDER')
print('-'*60)
dms = [p for p in plist if 'MD' in p['posn'] or p['bpos'] == 'MD']
dms = [p for p in dms if p['na'] > 100]
dms.sort(key=lambda p: p['na'], reverse=True)
for p in dms[:5]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']} | Pos:{p['posn']} BPos:{p['bpos']} Role:{p['role']}")
    print(f"    Tac:{p['tac']} Mar:{p['mar']} Pos:{p['pos']} Ant:{p['ant']} Comp:{p['comp']}")
    print(f"    Pas:{p['pas']} Dec:{p['dec']} Conc:{p['conc']} Team:{p['team']} Wor:{p['wor']}")
    print(f"    Sta:{p['sta']} Str:{p['str']} Lead:{p['lead']} Vis:{p['vis']}")
    print(f"    Rating:{p['rating']} Matches:{p['matches']}")
    print()

# 6. CM/AM
print('-'*60)
print('6. CENTRAL/ATTACKING MIDFIELDER')
print('-'*60)
cms = [p for p in plist if 'M (C)' in p['posn'] or 'MO (C)' in p['posn'] or 'MO (D)' in p['posn'] or 'MO (G)' in p['posn']]
cms = [p for p in cms if p['na'] > 120]
cms.sort(key=lambda p: p['na'], reverse=True)
for p in cms[:8]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']} | Pos:{p['posn']} BPos:{p['bpos']} Role:{p['role']}")
    print(f"    Pas:{p['pas']} Vis:{p['vis']} Tec:{p['tec']} Dec:{p['dec']} Comp:{p['comp']}")
    print(f"    Flair:{p['flair']} Dri:{p['dri']} FirTch:{p['fir']} Ant:{p['ant']} Fin:{p['fin']}")
    print(f"    OtB:{p['otb']} Wor:{p['wor']} Sta:{p['sta']} Team:{p['team']}")
    print(f"    Rating:{p['rating']} Goals:{p['goals']} Assists:{p['assists']} Matches:{p['matches']}")
    print()

# 7. Wingers
print('-'*60)
print('7. WINGERS (LW/RW)')
print('-'*60)
wings = [p for p in plist if 'MO (D)' in p['posn'] or 'MO (G)' in p['posn'] or 'M (G)' in p['posn']]
wings = [p for p in wings if p['na'] > 120]
wings.sort(key=lambda p: p['na'], reverse=True)
for p in wings[:6]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']} | Pos:{p['posn']} BPos:{p['bpos']} Role:{p['role']}")
    print(f"    Pac:{p['pac']} Acc:{p['acc']} Dri:{p['dri']} Cro:{p['cro']} Tec:{p['tec']}")
    print(f"    Flair:{p['flair']} Agi:{p['agi']} FirTch:{p['fir']} OtB:{p['otb']} Fin:{p['fin']}")
    print(f"    Rating:{p['rating']} Goals:{p['goals']} Assists:{p['assists']} Matches:{p['matches']}")
    print()

# 8. Strikers
print('-'*60)
print('8. STRIKERS')
print('-'*60)
sts = [p for p in plist if 'BT' in p['posn'] or p['bpos'] == 'BT (C)']
sts = [p for p in sts if p['na'] > 100]
sts.sort(key=lambda p: p['na'], reverse=True)
for p in sts[:5]:
    print(f"  {p['name']} | NA {p['na']} Pot {p['pot']} Age {p['age']} | Pos:{p['posn']} BPos:{p['bpos']} Role:{p['role']}")
    print(f"    Fin:{p['fin']} Comp:{p['comp']} OtB:{p['otb']} Ant:{p['ant']} Acc:{p['acc']}")
    print(f"    Pac:{p['pac']} Hea:{p['hea']} Dec:{p['dec']} FirTch:{p['fir']} Dri:{p['dri']}")
    print(f"    Flair:{p['flair']} Str:{p['str']} Wor:{p['wor']} Sta:{p['sta']}")
    print(f"    Rating:{p['rating']} Goals:{p['goals']} Assists:{p['assists']} Matches:{p['matches']}")
    print()

# RECOMMENDED XI
print('='*80)
print('RECOMMENDED CHAMPIONS LEAGUE FINAL XI')
print('='*80)
print("""
Based on NA, attributes, and season performance:

GK:  Geronimo Rulli (NA 147) - Elite 1v1 (19), Ref 17, best GK by far
RB:  Benjamin Pavard (NA 153) - Complete defender, Tac 16, Mar 16, Hea 17, Comp 17
CB:  Leonardo Balerdi (NA 144) - Mar 15, Tac 15, Hea 15, Pos 15, Comp 15
CB:  Facundo Medina (NA 145) - Mar 14, Tac 14, Hea 13, versatile, great work rate 19
LB:  Emerson (NA 135) - Best natural LB, Pac 15, Acc 14, Cro 14, balanced
DM:  Pierre-Emile Hojbjerg (NA 144) - Leader, Tac 15, Pos 12, Pas 15, Wor 17
CM:  Quinten Timber (NA 144) - Box-to-box, Pas 13, Dec 15, Wor 15, versatile
AM:  Ethan Nwaneri (NA 144, Pot 170!) - Creative spark, Flair 16, Dri 15, Vis 14
RW:  Mason Greenwood (NA 160) - STAR PLAYER, Fin 16, Dri 16, Pac 16, Acc 16
LW:  Igor Paixao (NA 145) - Pac 16, Acc 16, electric pace for counter-attacks
ST:  Pierre-Emerick Aubameyang (NA 137) - Fin 16, OtB 17, Ant 15, proven scorer

BENCH PRIORITIES:
- Matt O'Riley (NA 143) - CM/AM impact sub, Vis 17, Tec 17
- Amine Gouiri (NA 142) - LW/ST versatility, Fin 15, Dri 15
- Angel Gomes (NA 139) - Creative CM option, Pas 15, Vis 15, Tec 15
- Nayef Aguerd (NA 139) - CB backup
- Timothy Weah (NA 143) - RB/wing backup, pace
- Neal Maupay (NA 126) - ST backup, aerial threat
- Jeffrey de Lange (NA 121) - Backup GK
""")
