// ==========================================
// FM26 Tactics Expert Tool - Application
// ==========================================

// Sanitize HTML to prevent XSS
function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function stripEmojiText(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[\p{Extended_Pictographic}\u200D\uFE0F]/gu, '');
}

class FM26TacticsTool {
    constructor() {
        // State
        this.currentPhase = 'ip'; // 'ip' or 'oop'
        this.formationIP = '4-3-3';
        this.formationOOP = '4-1-4-1';
        this.mentality = 3;
        this.tacticName = 'Ma Tactique FM26';
        this.selectedPlayer = null;
        this.playerRoles = { ip: {}, oop: {} };
        this.playerPositions = { ip: {}, oop: {} };
        this.playerNames = {};
        this.playerInstructions = {}; // Per player individual instructions: { playerIndex: { instructionId: value } }
        this.phasePlayerMapOverride = null;
        this.phaseInstructionMapCache = null;
        this.currentPITab = 'withBall'; // Current individual instructions tab
        this.instructions = {};
        this.checkboxes = {};
        this.compareTacticA = '__current__';
        this.compareTacticB = '';
        this.lastCsvMetaReport = null;


        // Initialize
        this.init();
    }
    
    init() {
        this.setupEmojiSanitizer();
        this.bindEvents();
        this.renderFormation();
        this.renderPresets();
        this.loadFromStorage();
        this.updateMentalityLabel();
    }
    
    // ==========================================
    // Event Bindings
    // ==========================================
    setupEmojiSanitizer() {
        const sanitizeTextNode = (node) => {
            if (!node || node.nodeType !== Node.TEXT_NODE) return;
            const original = node.nodeValue;
            const cleaned = stripEmojiText(original);
            if (cleaned !== original) node.nodeValue = cleaned;
        };

        const sanitizeNodeTree = (root) => {
            if (!root) return;
            if (root.nodeType === Node.TEXT_NODE) {
                sanitizeTextNode(root);
                return;
            }

            const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
            let current = walker.nextNode();
            while (current) {
                sanitizeTextNode(current);
                current = walker.nextNode();
            }
        };

        sanitizeNodeTree(document.body);

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'characterData') {
                    sanitizeTextNode(mutation.target);
                    return;
                }

                mutation.addedNodes.forEach((node) => sanitizeNodeTree(node));
            });
        });

        observer.observe(document.body, {
            subtree: true,
            childList: true,
            characterData: true
        });
    }

    bindEvents() {
        // Tab Navigation
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.closest('.tab-btn')));
        });
        
        // Phase Toggle (FM26 Feature)
        document.querySelectorAll('.phase-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchPhase(e.target.closest('.phase-btn').dataset.phase));
        });
        
        // Header buttons
        document.getElementById('save-tactic')?.addEventListener('click', () => this.openSaveModal());
        document.getElementById('load-tactic')?.addEventListener('click', () => this.openLoadModal());
        document.getElementById('export-tactic')?.addEventListener('click', () => this.exportTactic());
        document.getElementById('import-tactic')?.addEventListener('click', () => document.getElementById('import-file')?.click());
        document.getElementById('import-file')?.addEventListener('change', (e) => this.importTactic(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                if (e.key === 's') { e.preventDefault(); this.openSaveModal(); }
                if (e.key === 'e') { e.preventDefault(); this.exportTactic(); }
            }
        });

        // Formation Select
        document.getElementById('run-analysis').addEventListener('click', () => this.runAnalysis());
        const csvMetaBtn = document.getElementById('generate-csv-meta');
        if (csvMetaBtn) {
            csvMetaBtn.addEventListener('click', () => this.generateMetaPresetFromCSV());
        }

        // Training CSV file name display
        const trainingCsvInput = document.getElementById('training-csv-file');
        if (trainingCsvInput) {
            trainingCsvInput.addEventListener('change', (e) => {
                const nameEl = document.getElementById('training-csv-name');
                if (nameEl) nameEl.textContent = e.target.files[0] ? e.target.files[0].name : '';
            });
        }

        // Instructions
        this.bindInstructionEvents();

        // Individual Player Instructions tabs
        document.querySelectorAll('.pi-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.piTab;
                if (tab) this.switchPITab(tab);
            });
        });

        // Visualizer
        document.querySelectorAll('.visualizer-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchVisualizerView(e.target.dataset.view));
        });

        const copyBtn = document.getElementById('copy-player-instructions');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => this.copySelectedPlayerInstructions());
        }

        // Set pieces sub-tabs
        document.querySelectorAll('.sp-tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.spTab;
                if (!tab) return;
                document.querySelectorAll('.sp-tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.sp-tab-content').forEach(c => c.classList.remove('active'));
                e.target.classList.add('active');
                const el = document.getElementById(`sp-${tab}`);
                if (el) el.classList.add('active');
            });
        });

        const compareBtn = document.getElementById('run-tactic-compare');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.runTacticComparison());
        }

        const exportImageBtn = document.getElementById('export-visual-image');
        if (exportImageBtn) {
            exportImageBtn.addEventListener('click', () => this.exportVisualSummary('image'));
        }

        const exportPdfBtn = document.getElementById('export-visual-pdf');
        if (exportPdfBtn) {
            exportPdfBtn.addEventListener('click', () => this.exportVisualSummary('pdf'));
        }

        // Scoring tab events
        const scoringCsvInput = document.getElementById('scoring-csv-file');
        if (scoringCsvInput) {
            scoringCsvInput.addEventListener('change', (e) => {
                const nameEl = document.getElementById('scoring-csv-name');
                if (nameEl) nameEl.textContent = e.target.files[0] ? e.target.files[0].name : 'Aucun fichier sélectionné';
            });
        }
        const runScoringBtn = document.getElementById('run-scoring-btn');
        if (runScoringBtn) {
            runScoringBtn.addEventListener('click', () => this.runPlayerScoring());
        }
        document.querySelectorAll('.scoring-view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.dataset.view;
                document.querySelectorAll('.scoring-view-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.scoring-view').forEach(v => v.classList.remove('active'));
                e.currentTarget.classList.add('active');
                const el = document.getElementById(`sv-${view}`);
                if (el) el.classList.add('active');
            });
        });
        const rsSearch = document.getElementById('rs-search');
        if (rsSearch) rsSearch.addEventListener('input', () => this.filterRoleScorer());
        const rsRoleFilter = document.getElementById('rs-role-filter');
        if (rsRoleFilter) rsRoleFilter.addEventListener('change', () => this.filterRoleScorer());
        const rsPosFilter = document.getElementById('rs-pos-filter');
        if (rsPosFilter) rsPosFilter.addEventListener('change', () => this.filterRoleScorer());
        const rsTopOnly = document.getElementById('rs-top-only');
        if (rsTopOnly) rsTopOnly.addEventListener('change', () => this.filterRoleScorer());
        const scoringExportBtn = document.getElementById('scoring-export-btn');
        if (scoringExportBtn) scoringExportBtn.addEventListener('click', () => this.exportScoringReport());

        // Preset search + filter chips
        const presetsSearch = document.getElementById('presets-search');
        if (presetsSearch) {
            presetsSearch.addEventListener('input', () => this.filterPresets());
        }
        document.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                e.currentTarget.classList.add('active');
                this.filterPresets();
            });
        });

    }

    bindInstructionEvents() {
        // All instruction selects (matching actual HTML IDs)
        const selects = [
            // En Possession
            'passing-style', 'tempo', 'width-attack', 'attack-focus',
            'pass-target', 'crossing-patience', 'crossing-style',
            'dribbling', 'long-shots', 'creative-freedom',
            'pressing-strategy', 'set-pieces',
            // Sorties de but / Relances
            'goal-kicks', 'distribution-target', 'distribution-speed', 'time-wasting',
            // Transition offensive
            'counter-attack',
            // Hors Possession
            'pressing-height', 'defensive-line', 'pressing-trigger',
            'defensive-transition', 'tackling', 'pressing-crosses',
            'pressing-trap', 'defensive-behavior', 'prevent-short-gk'
        ];

        selects.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', (e) => {
                    this.instructions[id] = e.target.value;
                    this.updateIdentityDNA();
                });
            }
        });

        // Overlap/underlap checkboxes
        const checkboxes = ['overlap-left', 'overlap-right', 'underlap-left', 'underlap-right'];

        checkboxes.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.addEventListener('change', (e) => {
                    this.checkboxes[id] = e.target.checked;
                });
            }
        });

        // "Deux flancs" checkboxes - auto-toggle both sides
        const overlapBoth = document.getElementById('overlap-both');
        if (overlapBoth) {
            overlapBoth.addEventListener('change', (e) => {
                const checked = e.target.checked;
                ['overlap-left', 'overlap-right'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.checked = checked;
                        this.checkboxes[id] = checked;
                    }
                });
            });
        }

        const underlapBoth = document.getElementById('underlap-both');
        if (underlapBoth) {
            underlapBoth.addEventListener('change', (e) => {
                const checked = e.target.checked;
                ['underlap-left', 'underlap-right'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) {
                        el.checked = checked;
                        this.checkboxes[id] = checked;
                    }
                });
            });
        }
    }

    // ==========================================
    // Tab Management
    // ==========================================
    switchTab(btn) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        btn.classList.add('active');
        document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');

        // Update visualizer if switching to that tab
        if (btn.dataset.tab === 'visualizer') {
            this.updateVisualizer();
            this.populateTacticCompareSelectors();
            this.renderVisualExportCard();
        } else if (btn.dataset.tab === 'xireport') {
            this.renderXIPresetReport();
        }
    }

    // ==========================================
    // FM26 Phase Management (IP/OOP)
    // ==========================================
    invalidateInstructionMapCache() {
        this.phaseInstructionMapCache = null;
    }

    getSideBucket(x) {
        if (x < 33) return 'left';
        if (x > 67) return 'right';
        return 'center';
    }

    buildOOPToIPIndexMap() {
        const ipPositions = window.FM26Data.FORMATIONS[this.formationIP] || [];
        const oopPositions = window.FM26Data.FORMATIONS[this.formationOOP] || [];
        const size = Math.max(ipPositions.length, oopPositions.length);
        const map = {};
        const usedIP = new Set();

        const assignBestByPos = (sourceIndices, targetIndices) => {
            sourceIndices.forEach(srcIdx => {
                if (map[srcIdx] !== undefined || !oopPositions[srcIdx]) return;
                let bestIdx = null;
                let bestScore = Number.POSITIVE_INFINITY;

                targetIndices.forEach(ipIdx => {
                    if (usedIP.has(ipIdx) || !ipPositions[ipIdx]) return;
                    const sx = oopPositions[srcIdx].x;
                    const tx = ipPositions[ipIdx].x;
                    const score = Math.abs(sx - tx);
                    if (score < bestScore) {
                        bestScore = score;
                        bestIdx = ipIdx;
                    }
                });

                if (bestIdx !== null) {
                    map[srcIdx] = bestIdx;
                    usedIP.add(bestIdx);
                }
            });
        };

        const uniquePos = ['GK', 'LB', 'RB', 'DM', 'AM', 'LM', 'RM', 'LW', 'RW'];
        uniquePos.forEach(posName => {
            const src = oopPositions.map((p, i) => p && p.pos === posName ? i : -1).filter(i => i >= 0);
            const tgt = ipPositions.map((p, i) => p && p.pos === posName ? i : -1).filter(i => i >= 0);
            if (src.length && tgt.length) assignBestByPos(src, tgt);
        });

        const duplicatePos = ['CB', 'CM', 'ST'];
        duplicatePos.forEach(posName => {
            const src = oopPositions.map((p, i) => p && p.pos === posName ? i : -1).filter(i => i >= 0);
            const tgt = ipPositions.map((p, i) => p && p.pos === posName ? i : -1).filter(i => i >= 0);
            if (src.length && tgt.length) assignBestByPos(src, tgt);
        });

        oopPositions.forEach((sourcePos, srcIdx) => {
            if (!sourcePos || map[srcIdx] !== undefined) return;

            let bestIdx = null;
            let bestScore = Number.POSITIVE_INFINITY;
            const sourceSide = this.getSideBucket(sourcePos.x);

            ipPositions.forEach((targetPos, ipIdx) => {
                if (!targetPos || usedIP.has(ipIdx)) return;

                const targetSide = this.getSideBucket(targetPos.x);
                let score = Math.abs(sourcePos.x - targetPos.x) * 2 + Math.abs(sourcePos.y - targetPos.y);
                if (sourcePos.type !== targetPos.type) score += 30;
                if (sourceSide !== targetSide) score += 45;
                if (sourcePos.pos === targetPos.pos) score -= 15;

                if (score < bestScore) {
                    bestScore = score;
                    bestIdx = ipIdx;
                }
            });

            if (bestIdx !== null) {
                map[srcIdx] = bestIdx;
                usedIP.add(bestIdx);
            } else {
                map[srcIdx] = srcIdx;
            }
        });

        for (let i = 0; i < size; i++) {
            if (map[i] === undefined) map[i] = i;
        }

        return map;
    }

    getInstructionPhaseMaps() {
        const signature = `${this.formationIP}|${this.formationOOP}`;

        if (this.phasePlayerMapOverride
            && this.phasePlayerMapOverride.formationIP === this.formationIP
            && this.phasePlayerMapOverride.formationOOP === this.formationOOP
            && this.phasePlayerMapOverride.oopToIp
            && this.phasePlayerMapOverride.ipToOop) {
            return {
                signature,
                oopToIp: this.phasePlayerMapOverride.oopToIp,
                ipToOop: this.phasePlayerMapOverride.ipToOop
            };
        }

        if (this.phaseInstructionMapCache && this.phaseInstructionMapCache.signature === signature) {
            return this.phaseInstructionMapCache;
        }

        const oopToIp = this.buildOOPToIPIndexMap();
        const ipToOop = {};
        Object.entries(oopToIp).forEach(([oopIdx, ipIdx]) => {
            if (ipToOop[ipIdx] === undefined) {
                ipToOop[ipIdx] = parseInt(oopIdx, 10);
            }
        });

        const cache = { signature, oopToIp, ipToOop };
        this.phaseInstructionMapCache = cache;
        return cache;
    }

    getCanonicalPlayerIndex(playerIdx, phase = this.currentPhase) {
        if (phase === 'ip') return playerIdx;
        const { oopToIp } = this.getInstructionPhaseMaps();
        return oopToIp[playerIdx] !== undefined ? oopToIp[playerIdx] : playerIdx;
    }

    getPhasePlayerIndexFromCanonical(canonicalIdx, phase) {
        if (phase === 'ip') return canonicalIdx;
        const { ipToOop } = this.getInstructionPhaseMaps();
        return ipToOop[canonicalIdx] !== undefined ? ipToOop[canonicalIdx] : canonicalIdx;
    }

    switchPhase(phase) {
        this.currentPhase = phase;

        // Update UI
        document.querySelectorAll('.phase-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.phase === phase);
        });

        // Update indicator
        const indicator = document.getElementById('current-phase-indicator');
        if (phase === 'ip') {
            indicator.textContent = 'EN POSSESSION';
            indicator.className = 'phase-indicator ip';
            document.getElementById('formation-phase-title').textContent = 'Formation En Possession';
            document.getElementById('oop-suggestions-panel').style.display = 'block';
        } else {
            indicator.textContent = 'HORS POSSESSION';
            indicator.className = 'phase-indicator oop';
            document.getElementById('formation-phase-title').textContent = 'Formation Hors Possession';
            document.getElementById('oop-suggestions-panel').style.display = 'none';
        }

        // Update formation select
        const select = document.getElementById('formation-select');
        select.value = phase === 'ip' ? this.formationIP : this.formationOOP;

        // Clear selection and animate transition
        this.selectedPlayer = null;
        this.animateFormationTransition();
        this.updateRolesPanel();
    }

    updateOOPSuggestions() {
        const suggestions = window.FM26Data.SUGGESTED_OOP_FORMATIONS[this.formationIP] || [];
        const container = document.getElementById('oop-suggestions');

        container.innerHTML = suggestions.map(formation => `
            <div class="suggestion-item" onclick="app.applySuggestedOOP('${formation}')">
                ${formation}
            </div>
        `).join('');
    }
    
    applySuggestedOOP(formation) {
        this.formationOOP = formation;
        this.invalidateInstructionMapCache();
        // Flash feedback
        const items = document.querySelectorAll('.suggestion-item');
        items.forEach(item => {
            if (item.textContent.trim() === formation) {
                item.style.background = 'var(--phase-ip)';
                item.style.color = 'white';
                setTimeout(() => {
                    item.style.background = '';
                    item.style.color = '';
                }, 500);
            }
        });
    }
    
    // ==========================================
    // Formation Rendering
    // ==========================================
    renderFormation() {
        const container = document.getElementById('players-container');
        const currentFormation = this.currentPhase === 'ip' ? this.formationIP : this.formationOOP;
        const positions = window.FM26Data.FORMATIONS[currentFormation];
        
        if (!positions) return;
        
        container.innerHTML = positions.map((pos, index) => {
            const savedPos = this.playerPositions[this.currentPhase][index];
            const x = savedPos ? savedPos.x : pos.x;
            const y = savedPos ? savedPos.y : pos.y;
            const role = this.playerRoles[this.currentPhase][index] || this.getDefaultRole(pos.pos);
            
            const playerName = this.playerNames[index] || '';
            const nameHtml = playerName.trim()
                ? `<div class="player-name">${escapeHtml(playerName.length > 8 ? playerName.substring(0, 8) + '.' : playerName)}</div>`
                : '';
            const modifiedDot = this.hasModifiedInstructions(index)
                ? '<span class="player-modified-dot" title="Consignes individuelles modifiées"></span>'
                : '';

            return `
                <div class="player ${pos.type}"
                     data-index="${index}"
                     data-pos="${pos.pos}"
                     style="left: ${x}%; top: ${y}%;"
                     onclick="app.selectPlayer(${index})">
                    <div class="player-circle">${pos.pos}</div>
                    ${modifiedDot}
                    <div class="player-role">${this.shortenRoleName(role)}</div>
                    ${nameHtml}
                </div>
            `;
        }).join('');
        
        this.makeDraggable();
        this.updateOOPSuggestions();
        this.renderVisualExportCard();
        this.renderXIPresetReport();
        this.updateStrikerlessNotice();
    }

    updateStrikerlessNotice() {
        const ipPositions = window.FM26Data.FORMATIONS[this.formationIP] || [];
        const hasStriker = ipPositions.some(p => p.pos === 'ST');
        const notice = document.getElementById('strikerless-notice');
        if (notice) notice.style.display = hasStriker ? 'none' : 'flex';
    }
    
    animateFormationTransition() {
        const container = document.getElementById('players-container');
        const currentFormation = this.currentPhase === 'ip' ? this.formationIP : this.formationOOP;
        const positions = window.FM26Data.FORMATIONS[currentFormation];

        if (!positions) {
            this.renderFormation();
            return;
        }

        const existingPlayers = container.querySelectorAll('.player');

        // If no existing players or count mismatch, just render normally
        if (existingPlayers.length !== positions.length) {
            this.renderFormation();
            return;
        }

        // Animate each player to new position
        existingPlayers.forEach((player, index) => {
            const savedPos = this.playerPositions[this.currentPhase][index];
            const targetX = savedPos ? savedPos.x : positions[index].x;
            const targetY = savedPos ? savedPos.y : positions[index].y;
            const role = this.playerRoles[this.currentPhase][index] || this.getDefaultRole(positions[index].pos);

            player.style.transition = 'left 0.5s ease, top 0.5s ease';
            player.style.left = `${targetX}%`;
            player.style.top = `${targetY}%`;

            // Update role label
            const roleLabel = player.querySelector('.player-role');
            if (roleLabel) roleLabel.textContent = this.shortenRoleName(role);

            // Update position label
            const circle = player.querySelector('.player-circle');
            if (circle) circle.textContent = positions[index].pos;

            // Update data attributes
            player.dataset.pos = positions[index].pos;
            player.className = `player ${positions[index].type}`;
        });

        // After animation, do a full re-render to ensure consistency
        setTimeout(() => {
            this.renderFormation();
        }, 550);
    }

    // Résout la liste de rôles IP pour un poste selon sa position x dans la formation
    getIPRolesForSlot(pos, x) {
        const entry = window.FM26Data.POSITION_ROLES_IP[pos];
        if (!entry) return [];
        if (Array.isArray(entry)) return entry;
        // Structure center/side — même seuils que OOP
        let isSide = false;
        if (x !== undefined && x !== null) {
            if (pos === 'CB') {
                isSide = x < 32 || x > 68;
            } else {
                isSide = x < 45 || x > 55;
            }
        }
        return isSide ? (entry.side || entry.center || []) : (entry.center || entry.side || []);
    }

    // Résout la liste de rôles OOP pour un poste selon sa position x dans la formation
    // CB : side si x < 40 ou x > 60 (détecte le DC excentré dans un 3DC, x~30/70)
    // DM/CM/AM/ST : side si x < 45 ou x > 55 (détecte les postes décalés, x~38/62)
    getOOPRolesForSlot(pos, x) {
        const entry = window.FM26Data.POSITION_ROLES_OOP[pos];
        if (!entry) return [];
        if (Array.isArray(entry)) return entry;
        // Structure center/side — seuil différent selon poste
        let isSide = false;
        if (x !== undefined && x !== null) {
            if (pos === 'CB') {
                // 3DC côté : x~25/30 → side (rôles Excentré). 2DC x~35/65 et 3DC centre x=50 → center
                isSide = x < 32 || x > 68;
            } else {
                // ST/DM/CM/AM : x~50 → center. x~38/62 → side
                isSide = x < 45 || x > 55;
            }
        }
        return isSide ? (entry.side || entry.center || []) : (entry.center || entry.side || []);
    }

    getDefaultRole(position) {
        const roles = this.currentPhase === 'ip'
            ? this.getIPRolesForSlot(position, 50)
            : this.getOOPRolesForSlot(position, 50);
        return roles && roles[0] ? roles[0].name : position;
    }
    
    shortenRoleName(name) {
        // Abbreviate long role names
        const abbreviations = {
            'Arrière Latéral': 'AL',
            'Arrière Défensif': 'AD',
            'Arrière Latéral Inversé': 'ALI',
            'Arrière Latéral Défensif': 'ALD',
            'Arrière Latéral Équilibré': 'ALE',
            'Arrière Latéral Presseur': 'ALP',
            'Défenseur Central': 'DC',
            'Défenseur Couvreur': 'DCv',
            'Défenseur Stoppeur': 'DS',
            'Défenseur Relanceur': 'DR',
            'Défenseur Agressif': 'DA',
            'Défenseur de Couverture': 'DCo',
            'Défenseur Presseur': 'DP',
            'Milieu Défensif': 'MDéf',
            'Milieu Récupérateur': 'MRec',
            'Milieu Défensif Presseur': 'MDP',
            'Milieu Central': 'MC',
            'Milieu Relayeur': 'MRel',
            'Milieu Box-to-Box': 'B2B',
            'Milieu Presseur': 'MP',
            'Milieu Bloqueur': 'MBl',
            'Milieu Central Défensif': 'MCD',
            'Milieu Central Équilibré': 'MCE',
            'Milieu Central Large': 'MCL',
            'Milieu Offensif Axial': 'MOA',
            'Milieu Latéral': 'ML',
            'Milieu Latéral Défensif': 'MLD',
            'Milieu Latéral Presseur': 'MLP',
            'Meneur de Jeu': 'MdJ',
            'Meneur de Jeu Avancé': 'MdJA',
            'Meneur Presseur': 'MnP',
            'Meneur en Repli': 'MnR',
            'Meneur de Contre': 'MnC',
            'Numéro 10': 'N10',
            'Faux 9 Reculé': 'F9R',
            'Ombre de l\'Attaquant': 'OA',
            'Piston': 'Pis',
            'Piston Offensif': 'PO',
            'Piston Défensif': 'PD',
            'Piston Intérieur': 'PI',
            'Piston Avancé': 'PA',
            'Piston Relanceur': 'PR',
            'Piston Presseur': 'PP',
            'Ailier': 'Ail',
            'Ailier Inversé': 'AI',
            'Ailier Complet': 'AC',
            'Ailier Défensif': 'ADéf',
            'Ailier en Repli': 'AR',
            'Ailier Presseur': 'AP',
            'Ailier de Contre': 'ACo',
            'Attaquant Intérieur': 'AttI',
            'Attaquant Large': 'AttL',
            'Avant-Centre': 'AC',
            'Attaquant Complet': 'AttC',
            'Renard des Surfaces': 'RdS',
            'Faux 9': 'F9',
            'Pressing Forward': 'PF',
            'Pivot Offensif': 'PivO',
            'Attaquant de Couloir': 'AdC',
            'Avant-Centre de Profondeur': 'ACP',
            'Attaquant Presseur': 'AttP',
            'Attaquant en Attente': 'AttA',
            'Attaquant Bloqueur': 'AttB',
            'Attaquant de Contre': 'AttCo',
            'Gardien': 'GK',
            'Gardien Sans Fioritures': 'GSF',
            'Gardien Relanceur': 'GR',
            'Gardien-Libéro': 'GL',
            'Gardien en Ligne': 'GeL',
            'Gardien Balayeur': 'GB',
            'Sentinelle': 'Sen',
            'Régisseur': 'Rég',
            'Demi-Défensif': 'DD',
            'Volante': 'Vol',
            'Carrilero': 'Car',
            'Raumdeuter': 'Rau',
            'Écran Défensif': 'ED'
        };
        
        return abbreviations[name] || name.substring(0, 4);
    }
    
    // ==========================================
    // Drag & Drop
    // ==========================================
    makeDraggable() {
        const players = document.querySelectorAll('.player');
        const pitch = document.getElementById('pitch');

        players.forEach(player => {
            let isDragging = false;

            const startDrag = (clientX, clientY) => {
                isDragging = true;
                player.style.zIndex = '100';
            };

            const moveDrag = (clientX, clientY) => {
                if (!isDragging) return;

                const rect = pitch.getBoundingClientRect();
                const x = ((clientX - rect.left) / rect.width) * 100;
                const y = ((clientY - rect.top) / rect.height) * 100;

                const clampedX = Math.max(5, Math.min(95, x));
                const clampedY = Math.max(5, Math.min(95, y));

                player.style.left = `${clampedX}%`;
                player.style.top = `${clampedY}%`;

                const index = parseInt(player.dataset.index);
                this.playerPositions[this.currentPhase][index] = { x: clampedX, y: clampedY };
            };

            const endDrag = () => {
                if (isDragging) {
                    isDragging = false;
                    player.style.zIndex = '';
                }
            };

            // Mouse events
            player.addEventListener('mousedown', (e) => {
                if (e.button !== 0) return;
                startDrag(e.clientX, e.clientY);
            });
            document.addEventListener('mousemove', (e) => moveDrag(e.clientX, e.clientY));
            document.addEventListener('mouseup', endDrag);

            // Touch events
            player.addEventListener('touchstart', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                startDrag(touch.clientX, touch.clientY);
            }, { passive: false });
            document.addEventListener('touchmove', (e) => {
                if (!isDragging) return;
                e.preventDefault();
                const touch = e.touches[0];
                moveDrag(touch.clientX, touch.clientY);
            }, { passive: false });
            document.addEventListener('touchend', endDrag);
        });
    }
    
    // ==========================================
    // Player Selection & Roles
    // ==========================================
    selectPlayer(index) {
        // Deselect previous
        document.querySelectorAll('.player').forEach(p => p.classList.remove('selected'));
        
        // Select new
        const player = document.querySelector(`.player[data-index="${index}"]`);
        player.classList.add('selected');
        this.selectedPlayer = index;
        
        this.updateRolesPanel();
    }
    
    updateRolesPanel() {
        const infoContainer = document.getElementById('selected-player-info');
        const rolesList = document.getElementById('roles-list');
        const positionIndicator = document.getElementById('selected-position-indicator');
        const piPanel = document.getElementById('player-instructions-panel');

        if (this.selectedPlayer === null) {
            infoContainer.innerHTML = `
                <div class="no-selection">
                    <span class="no-selection-icon" aria-hidden="true"><i class="bi bi-hand-index"></i></span>
                    <p>Cliquez sur un joueur pour voir et modifier son rôle</p>
                </div>
            `;
            rolesList.style.display = 'none';
            if (piPanel) piPanel.style.display = 'none';
            positionIndicator.textContent = 'Sélectionnez un joueur';
            this.renderCopyTargets();
            return;
        }

        const currentFormation = this.currentPhase === 'ip' ? this.formationIP : this.formationOOP;
        const positions = window.FM26Data.FORMATIONS[currentFormation];
        const playerPos = positions[this.selectedPlayer];

        if (!playerPos) return;

        positionIndicator.textContent = `Position: ${playerPos.pos} (${this.currentPhase.toUpperCase()})`;
        const currentName = this.playerNames[this.selectedPlayer] || '';
        infoContainer.innerHTML = `
            <div class="player-name-input">
                <label>Nom du joueur</label>
                <input type="text" class="form-input" id="player-name-field"
                       placeholder="Ex: Mbappe, Salah..."
                       value="${escapeHtml(currentName)}"
                       oninput="app.setPlayerName(this.value)">
            </div>
        `;

        // Get roles for this position
        const rolesData = this.currentPhase === 'ip'
            ? this.getIPRolesForSlot(playerPos.pos, playerPos.x)
            : this.getOOPRolesForSlot(playerPos.pos, playerPos.x);

        if (!rolesData) {
            rolesList.innerHTML = '<p>Aucun rôle disponible pour cette position</p>';
            rolesList.style.display = 'block';
            if (piPanel) piPanel.style.display = 'none';
            this.renderCopyTargets();
            return;
        }

        const currentRole = this.playerRoles[this.currentPhase][this.selectedPlayer] || rolesData[0].name;

        rolesList.innerHTML = rolesData.map(role => {
            const isNew = role.description.includes('NOUVEAU FM26');
            const isSelected = role.name === currentRole;
            return `
                <div class="role-item ${isSelected ? 'selected' : ''} ${isNew ? 'new-fm26' : ''}"
                     onclick="app.setPlayerRole('${role.name.replace(/'/g, "\\'")}')">
                    <div class="role-name">
                        ${role.name}
                        ${isNew ? '<span class="new-tag">FM26</span>' : ''}
                    </div>
                    <div class="role-description">${role.description.replace('NOUVEAU FM26 - ', '')}</div>
                </div>
            `;
        }).join('');

        rolesList.style.display = 'block';

        // Show and render individual player instructions (GK has no individual instructions)
        if (playerPos.pos !== 'GK' && piPanel) {
            piPanel.style.display = 'block';
            this.renderPlayerInstructions();
            this.renderCopyTargets();
        } else if (piPanel) {
            piPanel.style.display = 'none';
            this.renderCopyTargets();
        }
    }
    
    setPlayerName(name) {
        if (this.selectedPlayer === null) return;
        this.playerNames[this.selectedPlayer] = name;

        // Update display on pitch
        const player = document.querySelector(`.player[data-index="${this.selectedPlayer}"]`);
        if (player) {
            let nameLabel = player.querySelector('.player-name');
            if (name.trim()) {
                if (!nameLabel) {
                    nameLabel = document.createElement('div');
                    nameLabel.className = 'player-name';
                    player.appendChild(nameLabel);
                }
                nameLabel.textContent = name.length > 8 ? name.substring(0, 8) + '.' : name;
            } else if (nameLabel) {
                nameLabel.remove();
            }
        }

        this.renderVisualExportCard();
        this.renderXIPresetReport();
    }

    setPlayerRole(roleName) {
        if (this.selectedPlayer === null) return;

        this.playerRoles[this.currentPhase][this.selectedPlayer] = roleName;
        const canonicalIdx = this.getCanonicalPlayerIndex(this.selectedPlayer, this.currentPhase);

        // When role changes, reset locked instructions to their locked values
        const locked = window.FM26Data.ROLE_LOCKED_INSTRUCTIONS[roleName] || {};
        if (!this.playerInstructions[canonicalIdx]) {
            this.playerInstructions[canonicalIdx] = {};
        }
        Object.entries(locked).forEach(([instrId, value]) => {
            this.playerInstructions[canonicalIdx][instrId] = value;
        });

        // Update role display
        const player = document.querySelector(`.player[data-index="${this.selectedPlayer}"]`);
        const roleLabel = player.querySelector('.player-role');
        roleLabel.textContent = this.shortenRoleName(roleName);

        // Update roles panel selection
        document.querySelectorAll('.role-item').forEach(item => {
            item.classList.toggle('selected', item.querySelector('.role-name').textContent.includes(roleName));
        });

        // Refresh individual instructions panel to reflect new locks
        this.renderFormation();
        this.renderPlayerInstructions();
        this.renderCopyTargets();
    }
    
    // ==========================================
    // Individual Player Instructions (Consignes Individuelles)
    // ==========================================
    switchPITab(tab) {
        this.currentPITab = tab;
        document.querySelectorAll('.pi-tab').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.piTab === tab);
        });
        this.renderPlayerInstructions();
    }

    renderPlayerInstructions() {
        const container = document.getElementById('pi-content');
        if (!container || this.selectedPlayer === null) return;

        const piData = window.FM26Data.PLAYER_INSTRUCTIONS;
        const lockedData = window.FM26Data.ROLE_LOCKED_INSTRUCTIONS;
        const selectedIdx = this.selectedPlayer;
        const canonicalIdx = this.getCanonicalPlayerIndex(selectedIdx, this.currentPhase);
        const playerIdx = this.currentPITab === 'withBall'
            ? canonicalIdx
            : this.getPhasePlayerIndexFromCanonical(canonicalIdx, 'oop');

        // Determine which instruction set to show
        const instructionSet = this.currentPITab === 'withBall' ? piData.withBall : piData.withoutBall;

        // Determine position for filtering available instructions
        // "With ball" uses IP position, "Without ball" uses OOP position
        let playerPos;
        if (this.currentPITab === 'withBall') {
            const ipPositions = window.FM26Data.FORMATIONS[this.formationIP];
            playerPos = ipPositions && ipPositions[playerIdx] ? ipPositions[playerIdx].pos : null;
        } else {
            const oopPositions = window.FM26Data.FORMATIONS[this.formationOOP];
            playerPos = oopPositions && oopPositions[playerIdx] ? oopPositions[playerIdx].pos : null;
        }

        if (!playerPos || playerPos === 'GK') {
            container.innerHTML = '<p class="pi-no-instructions">Aucune consigne disponible pour cette position</p>';
            return;
        }

        // Get the relevant role for determining locks
        // "With ball" → IP role locks; "Without ball" → OOP role locks
        let roleName;
        if (this.currentPITab === 'withBall') {
            const ipPositions = window.FM26Data.FORMATIONS[this.formationIP];
            const ipSlot = ipPositions && ipPositions[playerIdx] ? ipPositions[playerIdx] : null;
            const ipRoles = ipSlot ? this.getIPRolesForSlot(ipSlot.pos, ipSlot.x) : null;
            roleName = this.playerRoles.ip[playerIdx] || (ipRoles && ipRoles[0] ? ipRoles[0].name : '');
        } else {
            const oopPositions = window.FM26Data.FORMATIONS[this.formationOOP];
            const oopSlot = oopPositions && oopPositions[playerIdx] ? oopPositions[playerIdx] : null;
            const oopRoles = oopSlot ? this.getOOPRolesForSlot(oopSlot.pos, oopSlot.x) : null;
            roleName = this.playerRoles.oop[playerIdx] || (oopRoles && oopRoles[0] ? oopRoles[0].name : '');
        }

        const roleLocks = lockedData[roleName] || {};

        // Ensure player instructions object exists
        if (!this.playerInstructions[canonicalIdx]) {
            this.playerInstructions[canonicalIdx] = {};
        }
        const playerInstrs = this.playerInstructions[canonicalIdx];

        // Filter instructions available for this position
        const availableInstructions = instructionSet.filter(instr =>
            instr.positions.includes(playerPos)
        );

        if (availableInstructions.length === 0) {
            container.innerHTML = '<p class="pi-no-instructions">Aucune consigne disponible pour cette position</p>';
            return;
        }

        container.innerHTML = availableInstructions.map(instr => {
            const isLocked = roleLocks.hasOwnProperty(instr.id);
            const currentValue = isLocked
                ? roleLocks[instr.id]
                : (playerInstrs[instr.id] || instr.default);
            const isModified = !isLocked && currentValue !== instr.default;

            const tooltipHtml = instr.tooltip
                ? `<span class="pi-help-icon" data-tip="${escapeHtml(instr.tooltip)}">?</span>`
                : '';

            const currentOpt = instr.options.find(o => o.value === currentValue);
            const currentDesc = currentOpt && currentOpt.desc ? currentOpt.desc : '';

            return `
                <div class="pi-instruction-item ${isLocked ? 'locked' : ''} ${isModified ? 'modified' : ''}">
                    <label class="pi-label">
                        ${isLocked ? '<span class="pi-lock-icon">&#128274;</span>' : ''}
                        <span class="${isModified ? 'pi-modified-name' : ''}">${escapeHtml(instr.name)}</span>
                        ${tooltipHtml}
                    </label>
                    <select class="pi-select" data-pi-id="${instr.id}"
                            ${isLocked ? 'disabled' : ''}
                            onchange="app.setPlayerInstruction('${instr.id}', this.value)">
                        ${instr.options.map(opt => `
                            <option value="${opt.value}" ${opt.value === currentValue ? 'selected' : ''}>
                                ${escapeHtml(opt.label)}${opt.desc ? ' — ' + escapeHtml(opt.desc) : ''}
                            </option>
                        `).join('')}
                    </select>
                    ${currentDesc ? `<div class="pi-option-desc">${escapeHtml(currentDesc)}</div>` : ''}
                </div>
            `;
        }).join('');
    }

    setPlayerInstruction(instructionId, value) {
        if (this.selectedPlayer === null) return;
        const canonicalIdx = this.getCanonicalPlayerIndex(this.selectedPlayer, this.currentPhase);

        if (!this.playerInstructions[canonicalIdx]) {
            this.playerInstructions[canonicalIdx] = {};
        }
        this.playerInstructions[canonicalIdx][instructionId] = value;

        // Update visual state (modified indicator)
        this.renderPlayerInstructions();
        this.renderFormation();
        this.renderCopyTargets();
    }

    getPlayerPositionForTab(playerIdx, tab) {
        const formation = tab === 'withBall' ? this.formationIP : this.formationOOP;
        const positions = window.FM26Data.FORMATIONS[formation] || [];
        const playerPos = positions[playerIdx];
        return playerPos ? playerPos.pos : null;
    }

    getPlayerSlotForTab(playerIdx, tab) {
        const formation = tab === 'withBall' ? this.formationIP : this.formationOOP;
        const positions = window.FM26Data.FORMATIONS[formation] || [];
        return positions[playerIdx] || null;
    }

    getPlayerRoleForTab(playerIdx, tab) {
        if (tab === 'withBall') {
            const slot = this.getPlayerSlotForTab(playerIdx, 'withBall');
            const roles = slot ? this.getIPRolesForSlot(slot.pos, slot.x) : null;
            return this.playerRoles.ip[playerIdx] || (roles && roles[0] ? roles[0].name : '');
        }

        const slot = this.getPlayerSlotForTab(playerIdx, 'withoutBall');
        const roles = slot ? this.getOOPRolesForSlot(slot.pos, slot.x) : null;
        return this.playerRoles.oop[playerIdx] || (roles && roles[0] ? roles[0].name : '');
    }

    getInstructionDefinitionById(instructionId) {
        const allInstructions = [
            ...(window.FM26Data.PLAYER_INSTRUCTIONS.withBall || []),
            ...(window.FM26Data.PLAYER_INSTRUCTIONS.withoutBall || [])
        ];
        return allInstructions.find(instr => instr.id === instructionId) || null;
    }

    getPlayerSlotDetails(canonicalIdx, phase) {
        const formation = phase === 'ip' ? this.formationIP : this.formationOOP;
        const positions = window.FM26Data.FORMATIONS[formation] || [];
        const phaseIdx = phase === 'ip'
            ? canonicalIdx
            : this.getPhasePlayerIndexFromCanonical(canonicalIdx, 'oop');
        const slot = positions[phaseIdx] || null;

        if (!slot) {
            return { phaseIdx, positionCode: '-', roleName: '-' };
        }

        const roleSet = phase === 'ip'
            ? this.getIPRolesForSlot(slot.pos, slot.x)
            : this.getOOPRolesForSlot(slot.pos, slot.x);
        const roleMap = phase === 'ip' ? this.playerRoles.ip : this.playerRoles.oop;
        const roleName = roleMap[phaseIdx] || (roleSet && roleSet[0] ? roleSet[0].name : slot.pos);

        return {
            phaseIdx,
            positionCode: slot.pos,
            roleName
        };
    }

    getEffectiveInstructionItemsForReport(canonicalIdx, tab) {
        const isWithBall = tab === 'withBall';
        const phase = isWithBall ? 'ip' : 'oop';
        const slotDetails = this.getPlayerSlotDetails(canonicalIdx, phase);
        const positionCode = slotDetails.positionCode;

        if (!positionCode || positionCode === '-' || positionCode === 'GK') {
            return [];
        }

        const instructionDefs = isWithBall
            ? (window.FM26Data.PLAYER_INSTRUCTIONS.withBall || [])
            : (window.FM26Data.PLAYER_INSTRUCTIONS.withoutBall || []);
        const available = instructionDefs.filter(instr => Array.isArray(instr.positions) && instr.positions.includes(positionCode));
        const roleLocks = window.FM26Data.ROLE_LOCKED_INSTRUCTIONS[slotDetails.roleName] || {};
        const playerInstrs = this.playerInstructions[canonicalIdx] || {};

        return available.map(instr => {
            const hasLock = Object.prototype.hasOwnProperty.call(roleLocks, instr.id);
            const effectiveValue = hasLock
                ? roleLocks[instr.id]
                : (playerInstrs[instr.id] ?? instr.default);
            const option = (instr.options || []).find(opt => opt.value === effectiveValue);

            return {
                id: instr.id,
                name: instr.name,
                value: effectiveValue,
                label: option ? option.label : effectiveValue,
                locked: hasLock
            };
        });
    }

    renderXIPresetReport() {
        const container = document.getElementById('xi-report-content');
        if (!container) return;

        const ipPositions = window.FM26Data.FORMATIONS[this.formationIP] || [];
        if (!ipPositions.length) {
            container.innerHTML = `
                <tr>
                    <td colspan="4" class="xireport-empty">Aucun joueur disponible pour cette formation.</td>
                </tr>
            `;
            return;
        }

        container.innerHTML = ipPositions.map((_, canonicalIdx) => {
            const playerName = this.playerNames[canonicalIdx] || `Joueur ${canonicalIdx + 1}`;
            const withBall = this.getPlayerSlotDetails(canonicalIdx, 'ip');
            const withoutBall = this.getPlayerSlotDetails(canonicalIdx, 'oop');
            const withBallInstructions = this.getEffectiveInstructionItemsForReport(canonicalIdx, 'withBall');
            const withoutBallInstructions = this.getEffectiveInstructionItemsForReport(canonicalIdx, 'withoutBall');

            const renderInstructionBadges = (items) => {
                if (!items.length) return '<span class="xi-instr-empty">Aucune</span>';
                return items.map(item => `
                    <span class="xi-instr-badge ${item.locked ? 'locked' : ''}">
                        ${escapeHtml(item.name)}: ${escapeHtml(item.label)}${item.locked ? ' <i class="bi bi-lock-fill" title="Verrouillé par le rôle" style="font-size:0.8em;color:var(--accent)"></i>' : ''}
                    </span>
                `).join('');
            };

            return `
                <tr>
                    <td>
                        <div class="xi-player-name">${escapeHtml(playerName)}</div>
                        <div class="xi-player-slot">N°${canonicalIdx + 1}</div>
                    </td>
                    <td>
                        <div class="xi-role-line"><span class="xi-pos">${escapeHtml(withBall.positionCode)}</span><span class="xi-role">${escapeHtml(withBall.roleName)}</span></div>
                    </td>
                    <td>
                        <div class="xi-role-line"><span class="xi-pos">${escapeHtml(withoutBall.positionCode)}</span><span class="xi-role">${escapeHtml(withoutBall.roleName)}</span></div>
                    </td>
                    <td>
                        <div class="xi-instr-phase-block">
                            <div class="xi-instr-phase-title">Avec ballon</div>
                            <div class="xi-instr-list">${renderInstructionBadges(withBallInstructions)}</div>
                        </div>
                        <div class="xi-instr-phase-block">
                            <div class="xi-instr-phase-title">Sans ballon</div>
                            <div class="xi-instr-list">${renderInstructionBadges(withoutBallInstructions)}</div>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');
    }

    isInstructionModifiedForPlayer(playerIdx, instructionId, value) {
        const definition = this.getInstructionDefinitionById(instructionId);
        if (!definition) return false;
        if (value === definition.default) return false;

        const tab = (window.FM26Data.PLAYER_INSTRUCTIONS.withBall || []).some(instr => instr.id === instructionId)
            ? 'withBall'
            : 'withoutBall';
        const roleName = this.getPlayerRoleForTab(playerIdx, tab);
        const roleLocks = window.FM26Data.ROLE_LOCKED_INSTRUCTIONS[roleName] || {};

        if (Object.prototype.hasOwnProperty.call(roleLocks, instructionId) && roleLocks[instructionId] === value) {
            return false;
        }

        return true;
    }

    getModifiedInstructionsForPlayer(playerIdx) {
        const playerInstrs = this.playerInstructions[playerIdx] || {};
        const modified = [];

        Object.entries(playerInstrs).forEach(([instructionId, value]) => {
            if (this.isInstructionModifiedForPlayer(playerIdx, instructionId, value)) {
                modified.push({ playerIdx, instructionId, value });
            }
        });

        return modified;
    }

    hasModifiedInstructions(playerIdx) {
        const canonicalIdx = this.getCanonicalPlayerIndex(playerIdx, this.currentPhase);
        return this.getModifiedInstructionsForPlayer(canonicalIdx).length > 0;
    }

    getAllModifiedInstructions() {
        const result = [];
        Object.keys(this.playerInstructions).forEach(playerIdx => {
            result.push(...this.getModifiedInstructionsForPlayer(parseInt(playerIdx, 10)));
        });
        return result;
    }

    renderCopyTargets() {
        const panel = document.getElementById('pi-copy-controls');
        const select = document.getElementById('copy-target-player');
        const button = document.getElementById('copy-player-instructions');

        if (!panel || !select || !button) return;

        if (this.selectedPlayer === null) {
            panel.style.display = 'none';
            return;
        }

        const currentFormation = this.currentPhase === 'ip' ? this.formationIP : this.formationOOP;
        const positions = window.FM26Data.FORMATIONS[currentFormation] || [];
        const sourcePos = positions[this.selectedPlayer];

        if (!sourcePos || sourcePos.pos === 'GK') {
            panel.style.display = 'none';
            return;
        }

        const candidates = positions
            .map((pos, index) => ({ pos, index }))
            .filter(item => item.index !== this.selectedPlayer && item.pos.type === sourcePos.type && item.pos.pos !== 'GK');

        panel.style.display = '';

        if (candidates.length === 0) {
            select.innerHTML = '<option value="">Aucun joueur compatible</option>';
            button.disabled = true;
            return;
        }

        select.innerHTML = candidates.map(item => {
            const playerName = this.playerNames[item.index] || `Joueur ${item.index + 1}`;
            return `<option value="${item.index}">${escapeHtml(playerName)} (${item.pos.pos})</option>`;
        }).join('');
        button.disabled = false;
    }

    copySelectedPlayerInstructions() {
        if (this.selectedPlayer === null) {
            this.showNotification('Sélectionnez d\'abord un joueur source', 'error');
            return;
        }

        const select = document.getElementById('copy-target-player');
        if (!select || !select.value) {
            this.showNotification('Sélectionnez un joueur cible', 'error');
            return;
        }

        const targetIdx = parseInt(select.value, 10);
        if (Number.isNaN(targetIdx)) {
            this.showNotification('Joueur cible invalide', 'error');
            return;
        }

        const sourceCanonicalIdx = this.getCanonicalPlayerIndex(this.selectedPlayer, this.currentPhase);
        const targetCanonicalIdx = this.getCanonicalPlayerIndex(targetIdx, this.currentPhase);
        const sourceInstructions = this.playerInstructions[sourceCanonicalIdx] || {};
        this.playerInstructions[targetCanonicalIdx] = JSON.parse(JSON.stringify(sourceInstructions));

        this.renderFormation();
        this.renderPlayerInstructions();
        this.renderCopyTargets();
        this.showNotification('Consignes copiées vers le joueur cible');
    }

    // ==========================================
    // Mentality
    // ==========================================
    updateMentalityLabel() {
        const label = document.getElementById('mentality-value');
        label.textContent = window.FM26Data.MENTALITY_LABELS[this.mentality];
    }

    updateIdentityDNA() {
        const container = document.getElementById('identity-dna-live');
        if (!container) return;

        const get = (k) => this.instructions[k] || (document.getElementById(k) ? document.getElementById(k).value : '');
        const preset = {
            instructionsIP: Object.fromEntries(
                ['passing-style','tempo','width-attack','counter-attack','creative-freedom','pressing-strategy'].map(k => [k, get(k)])
            ),
            instructionsOOP: Object.fromEntries(
                ['pressing-height','defensive-line','pressing-trigger','defensive-transition'].map(k => [k, get(k)])
            )
        };
        const dna = this.computePresetDNA(preset);
        if (!dna) {
            container.innerHTML = '<p class="identity-placeholder">Configurez vos consignes pour voir votre DNA tactique</p>';
            return;
        }
        container.innerHTML = `
            <div class="identity-dna-badge" style="border-color:${dna.color};color:${dna.color}">
                <span class="identity-dna-label">DNA</span>
                <span class="identity-dna-value">${dna.label}</span>
            </div>
        `;
    }
    
    // ==========================================
    // Presets
    // ==========================================
    computePresetDNA(preset) {
        const ip = preset.instructionsIP || {};
        const oop = preset.instructionsOOP || {};
        const get = (k) => ip[k] || oop[k] || '';

        const scores = { pressing: 0, possession: 0, counter: 0, hybrid: 0 };
        const ph = get('pressing-height'), pt = get('pressing-trigger');
        const dl = get('defensive-line'), ps = get('passing-style');
        const tp = get('tempo'), wi = get('width-attack');
        const dt = get('defensive-transition'), ot = get('counter-attack');
        const cr = get('creative-freedom');

        if (ph === 'high') scores.pressing += 3;
        if (['more', 'much-more'].includes(pt)) scores.pressing += 2;
        if (dt === 'counter-press') scores.pressing += 2;
        if (['higher', 'much-higher'].includes(dl)) scores.pressing += 1;

        if (['shorter', 'much-shorter'].includes(ps)) scores.possession += 3;
        if (['slower', 'much-slower'].includes(tp)) scores.possession += 2;
        if (['narrow', 'much-narrow'].includes(wi)) scores.possession += 1;
        if (cr === 'expressive') scores.possession += 1;

        if (ot === 'yes') scores.counter += 3;
        if (['higher', 'much-higher'].includes(tp)) scores.counter += 2;
        if (['direct', 'much-more-direct'].includes(ps)) scores.counter += 2;
        if (ph === 'low') scores.counter += 1;

        const maxScore = Math.max(...Object.values(scores));
        if (maxScore === 0) return null;
        const dominant = Object.entries(scores).find(([, v]) => v === maxScore)?.[0] || 'hybrid';

        const labels = { pressing: 'Pressing', possession: 'Possession', counter: 'Contre', hybrid: 'Hybride' };
        const colors = { pressing: '#e63946', possession: '#2ecc71', counter: '#f4a261', hybrid: '#9b5de5' };
        return { label: labels[dominant], color: colors[dominant] };
    }

    renderPresets() {
        const container = document.getElementById('presets-grid');
        const presets = window.FM26Data.PRESETS;

        container.innerHTML = Object.entries(presets).map(([key, preset]) => {
            const hasRoles = preset.rolesIP && preset.rolesOOP;
            const coachInfo = preset.coach ? `Coach: ${preset.coach}` : this.getCoachStyle(key);
            const teamInfo = preset.team ? `(${preset.team})` : '';

            // Star ratings
            const difficultyStars = preset.difficulty ? '●'.repeat(preset.difficulty) : '';
            const effectivenessStars = preset.effectiveness ? '●'.repeat(preset.effectiveness) : '';
            const physicalStars = preset.physical ? '●'.repeat(preset.physical) : '';

            // Strengths/Weaknesses
            const strengthsList = preset.strengths ? preset.strengths.slice(0, 3).join(' • ') : '';
            const weaknessesList = preset.weaknesses ? preset.weaknesses.slice(0, 2).join(' • ') : '';

            // DNA badge
            const dna = this.computePresetDNA(preset);
            const dnaBadge = dna ? `<span class="dna-badge" style="background:${dna.color}20;color:${dna.color};border-color:${dna.color}40">${dna.label}</span>` : '';

            return `
                <div class="preset-card" onclick="app.applyPreset('${key}')" style="position: relative;">
                    <div class="preset-header">
                        <div class="preset-title-area">
                            ${coachInfo ? `<span class="coach-badge">${coachInfo}</span>` : ''}
                            <span class="preset-name">${preset.name || this.formatPresetName(key)}</span>
                            ${teamInfo ? `<span class="team-info">${teamInfo}</span>` : ''}
                        </div>
                        <div class="preset-formations">
                            <span class="preset-formation ip">IP: ${preset.formationIP}</span>
                            <span class="preset-formation oop">OOP: ${preset.formationOOP}</span>
                        </div>
                    </div>
                    
                    ${dnaBadge ? `<div class="preset-dna-row">${dnaBadge}</div>` : ''}
                    <p class="preset-description">${preset.description}</p>

                    ${preset.difficulty ? `
                    <div class="preset-ratings">
                        <div class="rating-item" title="Difficulté">
                            <span class="rating-label">Difficulté:</span>
                            <span class="rating-stars">${difficultyStars}</span>
                        </div>
                        <div class="rating-item" title="Efficacité">
                            <span class="rating-label">Efficacité:</span>
                            <span class="rating-stars">${effectivenessStars}</span>
                        </div>
                        <div class="rating-item" title="Exigence physique">
                            <span class="rating-label">Physique:</span>
                            <span class="rating-stars">${physicalStars}</span>
                        </div>
                    </div>
                    ` : ''}
                    
                    ${strengthsList ? `
                    <div class="preset-analysis">
                        <div class="analysis-strengths">
                            <span class="analysis-label">Forces:</span>
                            <span class="analysis-text">${strengthsList}</span>
                        </div>
                        ${weaknessesList ? `
                        <div class="analysis-weaknesses">
                            <span class="analysis-label">Faiblesses:</span>
                            <span class="analysis-text">${weaknessesList}</span>
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    
                    <div class="preset-footer">
                        <div class="preset-mentality">
                            ${Array(7).fill(0).map((_, i) => `
                                <span class="mentality-dot ${i <= preset.mentality ? 'active' : ''}"></span>
                            `).join('')}
                        </div>
                        ${hasRoles ? '<span class="roles-complete-badge">Rôles FM26 complets</span>' : ''}
                    </div>
                </div>
            `;
        }).join('');

        // Add data-key attribute so filterPresets can match elements to preset data
        container.querySelectorAll('.preset-card').forEach((card, i) => {
            const key = Object.keys(window.FM26Data.PRESETS)[i];
            if (key) card.dataset.presetKey = key;
        });

        this.filterPresets();
    }

    filterPresets() {
        const search = (document.getElementById('presets-search')?.value || '').toLowerCase().trim();
        const activeChip = document.querySelector('.filter-chip.active');
        const chipFilter = activeChip ? activeChip.dataset.filter : 'all';
        const presets = window.FM26Data.PRESETS;
        let visible = 0;

        document.querySelectorAll('#presets-grid .preset-card').forEach(card => {
            const key = card.dataset.presetKey;
            const preset = presets[key];
            if (!preset) { card.classList.add('hidden'); return; }

            // Text search across name, coach, description, formations
            const searchText = [
                preset.name || key,
                preset.coach || '',
                preset.team || '',
                preset.description || '',
                preset.formationIP || '',
                preset.formationOOP || '',
                (preset.strengths || []).join(' '),
                (preset.tags || []).join(' ')
            ].join(' ').toLowerCase();

            const matchesSearch = !search || searchText.includes(search);

            // Chip filter
            let matchesChip = true;
            if (chipFilter !== 'all') {
                const dna = this.computePresetDNA(preset);
                const dnaLabel = dna ? dna.label.toLowerCase() : '';
                const tags = ((preset.tags || []).join(' ') + ' ' + (preset.description || '')).toLowerCase();
                const mentality = preset.mentality ?? 3;
                switch (chipFilter) {
                    case 'possession':
                        matchesChip = dnaLabel.includes('possession') || tags.includes('possession') || tags.includes('tiki');
                        break;
                    case 'pressing':
                        matchesChip = dnaLabel.includes('pressing') || tags.includes('pressing') || tags.includes('gegen');
                        break;
                    case 'counter':
                        matchesChip = dnaLabel.includes('contre') || tags.includes('counter') || tags.includes('contre-attaque');
                        break;
                    case 'defensive':
                        matchesChip = dnaLabel.includes('défensif') || tags.includes('défensif') || tags.includes('defensive') || tags.includes('compact');
                        break;
                    case 'high-mentality':
                        matchesChip = mentality >= 5;
                        break;
                    case 'low-mentality':
                        matchesChip = mentality <= 2;
                        break;
                }
            }

            const show = matchesSearch && matchesChip;
            card.classList.toggle('hidden', !show);
            if (show) visible++;
        });

        const total = document.querySelectorAll('#presets-grid .preset-card').length;
        const countEl = document.getElementById('presets-results-count');
        if (countEl) {
            countEl.textContent = visible < total ? `${visible} / ${total} tactiques` : `${total} tactiques`;
        }
    }

    getCoachStyle(key) {
        const coaches = {
            'guardiola-tiki-taka': 'Guardiola',
            'klopp-gegenpressing': 'Klopp',
            'ancelotti-balanced': 'Ancelotti',
            'mourinho-defensive': 'Mourinho',
            'arteta-positional': 'Arteta',
            'simeone-compact': 'Simeone',
            'slot-liverpool': 'Slot',
            'conte-352': 'Conte',
            'de-zerbi-possession': 'De Zerbi',
            'false-9-specialist': 'Expert',
            'inverted-fullbacks-meta': 'META FM26',
            'counter-attack-master': 'Contre',
            'total-domination': 'Domination',
            'underdog-killer': 'Underdog'
        };
        return coaches[key] || null;
    }
    
    formatPresetName(key) {
        return key.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    syncInstructionsToDom() {
        // Force all instruction control elements to sync with this.instructions state
        Object.entries(this.instructions).forEach(([key, value]) => {
            const el = document.getElementById(key);
            if (el && el.type !== 'checkbox') {
                el.value = value;
            }
        });
    }
    
    applyPreset(presetKey) {
        const preset = window.FM26Data.PRESETS[presetKey];
        if (!preset) return;
        
        // Apply formations
        this.formationIP = preset.formationIP;
        this.formationOOP = preset.formationOOP;
        this.mentality = preset.mentality;
        
        // Update UI
        document.getElementById('mentality').value = this.mentality;
        this.updateMentalityLabel();
        
        // Apply IP instructions (FM26 new structure)
        if (preset.instructionsIP) {
            Object.entries(preset.instructionsIP).forEach(([key, value]) => {
                const el = document.getElementById(key);
                if (el) {
                    el.value = value;
                    this.instructions[key] = value;
                }
            });
        }
        
        // Apply OOP instructions (FM26 new structure)
        if (preset.instructionsOOP) {
            Object.entries(preset.instructionsOOP).forEach(([key, value]) => {
                const el = document.getElementById(key);
                if (el) {
                    el.value = value;
                    this.instructions[key] = value;
                }
            });
        }
        
        // Legacy: Apply old instructions format for backward compatibility
        if (preset.instructions) {
            Object.entries(preset.instructions).forEach(([key, value]) => {
                const el = document.getElementById(key);
                if (el) {
                    el.value = value;
                    this.instructions[key] = value;
                }
            });
        }
        
        // Reset all overlap checkboxes first
        const allCheckboxes = ['overlap-left', 'overlap-right', 'underlap-left', 'underlap-right'];
        allCheckboxes.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.checked = false;
                this.checkboxes[id] = false;
            }
        });
        
        // Apply overlaps (FM26 new structure) - AFTER reset
        if (preset.overlaps) {
            Object.entries(preset.overlaps).forEach(([key, value]) => {
                const el = document.getElementById(key);
                if (el && el.type === 'checkbox') {
                    el.checked = value;
                    this.checkboxes[key] = value;
                }
            });
        }
        
        // Apply other checkboxes
        if (preset.checkboxes) {
            Object.entries(preset.checkboxes).forEach(([key, value]) => {
                const el = document.getElementById(key);
                if (el) {
                    el.checked = value;
                    this.checkboxes[key] = value;
                }
            });
        }
        
        // Apply roles from preset (FM26 Expert feature)
        this.playerRoles = { ip: {}, oop: {} };
        this.playerPositions = { ip: {}, oop: {} };
        this.playerInstructions = {};
        this.playerNames = {};
        this.phasePlayerMapOverride = null;
        
        if (preset.rolesIP) {
            Object.entries(preset.rolesIP).forEach(([index, role]) => {
                this.playerRoles.ip[parseInt(index)] = role;
            });
        }
        
        if (preset.rolesOOP) {
            Object.entries(preset.rolesOOP).forEach(([index, role]) => {
                this.playerRoles.oop[parseInt(index)] = role;
            });
        }

        if (preset.playerInstructions) {
            this.playerInstructions = JSON.parse(JSON.stringify(preset.playerInstructions));
        }

        if (preset.playerNames) {
            this.playerNames = JSON.parse(JSON.stringify(preset.playerNames));
        }

        if (preset.phasePlayerMap && preset.phasePlayerMap.oopToIp && preset.phasePlayerMap.ipToOop) {
            this.phasePlayerMapOverride = JSON.parse(JSON.stringify(preset.phasePlayerMap));
        }

        this.invalidateInstructionMapCache();
        
        // Update formation display
        this.currentPhase = 'ip';
        document.querySelectorAll('.phase-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.phase === 'ip');
        });
        document.getElementById('formation-select').value = this.formationIP;
        
        // Update phase indicator
        const indicator = document.getElementById('current-phase-indicator');
        indicator.textContent = 'EN POSSESSION';
        indicator.className = 'phase-indicator ip';
        document.getElementById('formation-phase-title').textContent = 'Formation En Possession';
        document.getElementById('oop-suggestions-panel').style.display = 'block';
        
        this.renderFormation();
        this.updateIdentityDNA();

        // Force sync of instructions from this.instructions to DOM elements
        this.syncInstructionsToDom();

        // Diagnostic: log how many instructions were applied
        const appliedCount = Object.keys(this.instructions).length;
        const instructionsInfo = appliedCount > 0 
            ? ` (${appliedCount} consignes synchronisées)` 
            : ' <i class="bi bi-exclamation-triangle" title="Aucune consigne appliquée"></i>';

        const trainingPresetBadge = document.getElementById('training-active-preset');
        if (trainingPresetBadge) trainingPresetBadge.textContent = preset.name || presetKey;

        // Switch to formation tab
        const formationTab = document.querySelector('[data-tab="formation"]');
        this.switchTab(formationTab);

        // Flash feedback
        this.showNotification(`Preset "${this.formatPresetName(presetKey)}" appliqué${instructionsInfo}`);
    }

    // ==========================================
    // CSV META PRESET GENERATOR
    // ==========================================
    async generateMetaPresetFromCSV() {
        const input = document.getElementById('csv-meta-file');
        if (!input || !input.files || !input.files[0]) {
            this.showNotification('Sélectionne un fichier CSV d’abord', 'error');
            return;
        }

        try {
            const csvText = await input.files[0].text();
            const parsedPlayers = this.parseFMCSVPlayers(csvText);

            if (!parsedPlayers.length) {
                this.showNotification('Aucun joueur exploitable trouvé dans le CSV', 'error');
                return;
            }

            const { preset, report } = this.buildMetaPresetFromPlayers(parsedPlayers);
            const presetKey = 'meta-csv-auto';
            window.FM26Data.PRESETS[presetKey] = preset;
            this.lastCsvMetaReport = report;

            this.renderPresets();
            this.applyPreset(presetKey);
            this.tacticName = preset.name;
            document.getElementById('tactic-name').value = this.tacticName;
            this.renderCsvMetaSummary(report);
            this.showNotification('Preset META généré depuis ton CSV et appliqué');
        } catch (err) {
            this.showNotification(`Erreur CSV: ${err.message}`, 'error');
        }
    }

    parseFMCSVPlayers(csvText) {
        const lines = csvText.split(/\r?\n/).filter(l => l.trim().length > 0);
        if (lines.length < 2) return [];

        const parseLine = (line) => {
            const cols = [];
            let current = '';
            let inQuotes = false;
            for (let i = 0; i < line.length; i++) {
                const ch = line[i];
                if (ch === '"') {
                    if (inQuotes && line[i + 1] === '"') {
                        current += '"';
                        i++;
                    } else {
                        inQuotes = !inQuotes;
                    }
                } else if (ch === ';' && !inQuotes) {
                    cols.push(current.trim());
                    current = '';
                } else {
                    current += ch;
                }
            }
            cols.push(current.trim());
            return cols;
        };

        const normalize = (s) => (s || '')
            .replace(/^\uFEFF/, '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();

        const headers = parseLine(lines[0]);
        const headerMap = {};
        headers.forEach((h, i) => {
            headerMap[normalize(h)] = i;
        });

        const idx = (name) => headerMap[normalize(name)];
        const required = {
            name: idx('Joueur'),
            position: idx('Position'),
            bpos: idx('M. poste'),
            role: idx('M. rôle')
        };
        if (required.name === undefined || required.position === undefined) {
            throw new Error('Colonnes "Joueur" / "Position" introuvables');
        }

        const intVal = (row, colName) => {
            const col = idx(colName);
            if (col === undefined || col >= row.length) return 0;
            const n = parseInt(String(row[col]).replace(/[^\d-]/g, ''), 10);
            return Number.isNaN(n) ? 0 : n;
        };

        const strVal = (row, colName) => {
            const col = idx(colName);
            if (col === undefined || col >= row.length) return '';
            return (row[col] || '').trim();
        };

        const players = [];
        for (let i = 1; i < lines.length; i++) {
            const row = parseLine(lines[i]);
            if (row.length < headers.length / 2) continue;

            const name = row[required.name] || '';
            const position = row[required.position] || '';
            if (!name || !position) continue;

            players.push({
                name,
                position,
                bpos: required.bpos !== undefined ? (row[required.bpos] || '') : '',
                role: required.role !== undefined ? (row[required.role] || '') : '',
                rightFootLabel: strVal(row, 'Pied droit'),
                leftFootLabel: strVal(row, 'Pied gauche'),
                bestFootLabel: strVal(row, 'Meilleur pied'),
                age: intVal(row, 'Âge'),
                na: intVal(row, 'NA'),
                pot: intVal(row, 'Pot.'),
                acc: intVal(row, 'Accélération'),
                pac: intVal(row, 'Vitesse'),
                sta: intVal(row, 'Endurance'),
                str: intVal(row, 'Puissance'),
                agi: intVal(row, 'Agilité'),
                ant: intVal(row, 'Anticipation'),
                dec: intVal(row, 'Décisions'),
                comp: intVal(row, 'Sang-froid'),
                conc: intVal(row, 'Concentration'),
                team: intVal(row, "Travail d'équipe"),
                wor: intVal(row, 'Volume de jeu'),
                vis: intVal(row, 'Vision du jeu'),
                pas: intVal(row, 'Passes'),
                tec: intVal(row, 'Technique'),
                dri: intVal(row, 'Dribbles'),
                fir: intVal(row, 'Contrôle de balle'),
                fin: intVal(row, 'Finition'),
                tac: intVal(row, 'Tacles'),
                mar: intVal(row, 'Marquage'),
                hea: intVal(row, 'Jeu de tête'),
                jmp: intVal(row, 'Détente verticale'),
                one: intVal(row, 'Un contre un'),
                ref: intVal(row, 'Réflexes'),
                han: intVal(row, 'Prises de balle'),
                cmd: intVal(row, 'Sorties dans la surface'),
                note: strVal(row, 'Note'),
                goals: intVal(row, 'Buts'),
                assists: intVal(row, 'Passes décisives')
            });
        }

        return players;
    }

    buildMetaPresetFromPlayers(players) {
        const self = this;
        const formations = window.FM26Data.FORMATIONS || {};
        const suggestedOOP = window.FM26Data.SUGGESTED_OOP_FORMATIONS || {};
        const lockedInstructions = window.FM26Data.ROLE_LOCKED_INSTRUCTIONS || {};

        const outfield = players.filter(p => !(p.position || '').includes('GB'));
        const avg = (arr) => arr.length ? arr.reduce((s, n) => s + n, 0) / arr.length : 0;
        const max = (arr) => arr.length ? Math.max(...arr) : 0;

        const norm = (s) => (s || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();

        const positionBlob = (p) => `${norm(p.position)} | ${norm(p.bpos)} | ${norm(p.role)}`;
        const footBlob = (p) => `${norm(p.rightFootLabel)} | ${norm(p.leftFootLabel)} | ${norm(p.bestFootLabel)}`;
        const hasAny = (text, tokens) => tokens.some(t => text.includes(t));

        const footValue = (label) => {
            const val = norm(label);
            if (val.includes('tres fort')) return 20;
            if (val.includes('fort')) return 17;
            if (val.includes('assez fort')) return 14;
            if (val.includes('correct')) return 11;
            if (val.includes('faible')) return 7;
            if (val.includes('tres faible')) return 4;
            return 10;
        };

        const getFootProfile = (p) => {
            const blob = footBlob(p);
            if (blob.includes('gaucher uniquement')) return { left: 20, right: 2 };
            if (blob.includes('droitier uniquement')) return { left: 2, right: 20 };
            return { left: footValue(p.leftFootLabel), right: footValue(p.rightFootLabel) };
        };

        const isPreferredWingerFoot = (p, slot) => {
            const f = getFootProfile(p);
            if (slot === 'LW') return f.left >= f.right;
            if (slot === 'RW') return f.right >= f.left;
            return true;
        };

        const canPlay = (p, slot) => {
            const text = positionBlob(p);
            if (slot === 'GK')  return text.includes('gb');
            if (slot === 'CB')  return hasAny(text, ['d (c)', 'd (dc)', 'd (gc)', 'd (dgc)']);
            if (slot === 'LB')  return hasAny(text, ['d (g)', 'd (dg)', 'al (g)', 'd/al (g)', 'lwb']);
            if (slot === 'RB')  return hasAny(text, ['d (d)', 'd (dc)', 'al (d)', 'd/al (d)', 'd/al/m (d)', 'rwb']);
            if (slot === 'LWB') return hasAny(text, ['al (g)', 'd/al (g)', 'd (g)', 'm (g)', 'mo (g)', 'lwb']);
            if (slot === 'RWB') return hasAny(text, ['al (d)', 'd/al (d)', 'd (d)', 'm (d)', 'mo (d)', 'rwb']);
            if (slot === 'DM')  return hasAny(text, ['md', 'mdef', 'milieu defensif']);
            if (slot === 'CM')  return hasAny(text, ['m (c)', 'm/mo (c)', 'md', 'milieu axial']);
            if (slot === 'AM')  return hasAny(text, ['mo (c)', 'mo (dgc)', 'm/mo (c)', '9 1/2', '9 ½']);
            if (slot === 'LM')  return hasAny(text, ['m (g)', 'mo (g)', 'mo (dg)', 'm/mo (dg)']);
            if (slot === 'RM')  return hasAny(text, ['m (d)', 'mo (d)', 'mo (dg)', 'm/mo (d)']);
            if (slot === 'LW')  return hasAny(text, ['mo (g)', 'mo (dg)', 'm (g)', 'm/mo (dg)']);
            if (slot === 'RW')  return hasAny(text, ['mo (d)', 'mo (dg)', 'm (d)', 'm/mo (d)']);
            if (slot === 'ST')  return hasAny(text, ['bt', 'bt (c)', 'avant-centre', 'attaquant']);
            return false;
        };

        const naValues = players
            .map(p => p.na || 0)
            .filter(v => Number.isFinite(v) && v > 0);
        const naMean = naValues.length ? avg(naValues) : 0;
        const naVariance = naValues.length
            ? naValues.reduce((sum, value) => sum + Math.pow(value - naMean, 2), 0) / naValues.length
            : 0;
        const naStd = Math.sqrt(naVariance);
        const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
        const naRelativeBonus = (p) => {
            if (!naStd || naStd < 0.001) return 0;
            const z = ((p.na || naMean) - naMean) / naStd;
            return clamp(z * 2.2, -4, 4);
        };

        // ── Slot score unifié : meilleur score parmi tous les rôles disponibles ──
        const slotScore = (p, slot) => {
            const naBonus = naRelativeBonus(p);
            if (slot === 'GK') {
                return naBonus + (p.ref || 0) * 1.8 + (p.one || 0) * 1.6 + (p.han || 0) * 1.2 + (p.cmd || 0);
            }
            const roles = self.getIPRolesForSlot(slot, undefined);
            if (!roles.length) return naBonus;
            let best = 0;
            for (const r of roles) {
                const s = self.scorePlayerForRole(p, r.name).totalScore;
                if (s > best) best = s;
            }
            // Bonus pied pour ailiers
            if (slot === 'LW' || slot === 'RW') {
                const footAdj = isPreferredWingerFoot(p, slot) ? 8 : -30;
                return naBonus + best + footAdj;
            }
            return naBonus + best;
        };

        const hungarianMaximize = (scoreMatrix) => {
            const rows = scoreMatrix.length;
            const cols = scoreMatrix[0] ? scoreMatrix[0].length : 0;
            if (!rows || !cols) return { assignment: [], totalScore: 0 };

            const n = rows;
            const m = Math.max(cols, rows);
            const padded = Array.from({ length: n }, (_, i) => {
                const row = scoreMatrix[i].slice();
                while (row.length < m) row.push(-1e9);
                return row;
            });

            const maxScore = padded.reduce((mx, row) => Math.max(mx, ...row), -1e9);
            const cost = padded.map(row => row.map(v => maxScore - v));

            const u = Array(n + 1).fill(0);
            const v = Array(m + 1).fill(0);
            const p = Array(m + 1).fill(0);
            const way = Array(m + 1).fill(0);

            for (let i = 1; i <= n; i++) {
                p[0] = i;
                let j0 = 0;
                const minv = Array(m + 1).fill(Number.POSITIVE_INFINITY);
                const used = Array(m + 1).fill(false);

                do {
                    used[j0] = true;
                    const i0 = p[j0];
                    let delta = Number.POSITIVE_INFINITY;
                    let j1 = 0;

                    for (let j = 1; j <= m; j++) {
                        if (used[j]) continue;
                        const cur = cost[i0 - 1][j - 1] - u[i0] - v[j];
                        if (cur < minv[j]) {
                            minv[j] = cur;
                            way[j] = j0;
                        }
                        if (minv[j] < delta) {
                            delta = minv[j];
                            j1 = j;
                        }
                    }

                    for (let j = 0; j <= m; j++) {
                        if (used[j]) {
                            u[p[j]] += delta;
                            v[j] -= delta;
                        } else {
                            minv[j] -= delta;
                        }
                    }
                    j0 = j1;
                } while (p[j0] !== 0);

                do {
                    const j1 = way[j0];
                    p[j0] = p[j1];
                    j0 = j1;
                } while (j0 !== 0);
            }

            const assignment = Array(n).fill(-1);
            for (let j = 1; j <= m; j++) {
                if (p[j] > 0) assignment[p[j] - 1] = j - 1;
            }

            let totalScore = 0;
            assignment.forEach((col, row) => {
                if (col >= 0 && col < cols) totalScore += scoreMatrix[row][col];
            });

            return { assignment, totalScore };
        };

        // ── Delta de transition IP→OOP : pénalité si mouvement fonctionnel important ──
        const SLOT_GROUP = {
            GK: 'gk', CB: 'def', LB: 'defWide', RB: 'defWide',
            LWB: 'defWide', RWB: 'defWide',
            DM: 'mid', CM: 'mid',
            LM: 'wide', RM: 'wide', AM: 'attack',
            LW: 'wide', RW: 'wide', ST: 'attack'
        };
        const transitionPenalty = (slotIP, slotOOP, player) => {
            const gIP  = SLOT_GROUP[slotIP]  || 'mid';
            const gOOP = SLOT_GROUP[slotOOP] || 'mid';
            if (gIP === gOOP) return 0;
            const staWor = (player.sta || 0) + (player.wor || 0);
            const major = (gIP === 'attack' && gOOP === 'def') || (gIP === 'def' && gOOP === 'attack');
            if (major)  return staWor >= 28 ? 0 : staWor >= 22 ? -6 : -18;
            return staWor >= 24 ? 0 : -5;
        };

        // ── Choix du meilleur rôle IP parmi TOUS les rôles disponibles ──
        // slot peut être une string (pos) ou un objet {pos, x}
        const pickRoleIP = (slot, player) => {
            const slotPos = typeof slot === 'object' ? slot.pos : slot;
            const slotX   = typeof slot === 'object' ? slot.x   : undefined;
            if (slotPos === 'GK') {
                const passVis = (player.pas || 0) + (player.vis || 0);
                const refOne  = (player.ref || 0) + (player.one || 0);
                if (passVis >= 27) return 'Gardien À L\'aise Au Pied';
                if (refOne  >= 28) return 'Gardien De But';
                return 'Gardien Pragmatique';
            }
            const roles = self.getIPRolesForSlot(slotPos, slotX);
            if (!roles.length) return '';
            let bestRole = roles[0].name;
            let bestScore = -1;
            for (const r of roles) {
                const s = self.scorePlayerForRole(player, r.name).totalScore;
                if (s > bestScore) { bestScore = s; bestRole = r.name; }
            }
            return bestRole;
        };

        // ── Choix du meilleur rôle OOP (pondération OOP 65 / IP 35) ──
        // slot peut être une string (pos) ou un objet {pos, x}
        const pickRoleOOP = (slot, player) => {
            const slotPos = typeof slot === 'object' ? slot.pos : slot;
            const slotX   = typeof slot === 'object' ? slot.x   : undefined;
            if (slotPos === 'GK') {
                const refOne = (player.ref || 0) + (player.one || 0);
                return refOne >= 28 ? 'Gardien Libéro' : 'Gardien Sur La Ligne';
            }
            const roles = self.getOOPRolesForSlot(slotPos, slotX);
            if (!roles.length) return '';
            let bestRole = roles[0].name;
            let bestScore = -1;
            for (const r of roles) {
                const res = self.scorePlayerForRole(player, r.name);
                const weighted = res.oopScore * 0.65 + res.ipScore * 0.35;
                if (weighted > bestScore) { bestScore = weighted; bestRole = r.name; }
            }
            return bestRole;
        };

        // ── PI dynamiques : locks rôle + suggestions attributs, sans double-lock ──
        const buildPlayerPI = (player, roleIP, roleOOP) => {
            const pi = {};
            // 1. PI verrouillées par le rôle IP (source de vérité)
            const lockedIP  = lockedInstructions[roleIP]  || {};
            const lockedOOP = lockedInstructions[roleOOP] || {};
            Object.assign(pi, lockedIP);
            for (const [k, v] of Object.entries(lockedOOP)) {
                if (!(k in pi)) pi[k] = v;
            }
            // 2. Suggestions basées sur les attributs, sans écraser les locks
            const suggestions = self.suggestPlayerInstructions(player, roleIP);
            for (const s of suggestions) {
                if (!(s.id in pi)) pi[s.id] = s.value;
            }
            return pi;
        };

        // ── Évaluation d'une formation (score role-aware + affectation optimale) ──
        const evaluateFormation = (formationName) => {
            const shape = formations[formationName] || [];
            if (!shape.length) return null;
            if (players.length < shape.length) return null;

            const slots = shape.map(p => p.pos);
            const slotObjs = shape;
            const FALLBACK_FACTOR = 0.38;
            const FALLBACK_PENALTY = 24;

            const scoreMatrix = slotObjs.map(slotObj => {
                const slot = slotObj.pos;
                return players.map(player => {
                    const base = slotScore(player, slot);
                    const natural = canPlay(player, slot);
                    if (natural) return base;
                    return base * FALLBACK_FACTOR - FALLBACK_PENALTY;
                });
            });

            const solved = hungarianMaximize(scoreMatrix);
            const picks = slotObjs.map((slotObj, slotIdx) => {
                const playerIdx = solved.assignment[slotIdx];
                if (playerIdx === undefined || playerIdx < 0 || playerIdx >= players.length) return null;
                const player = players[playerIdx];
                const slot = slotObj.pos;
                const natural = canPlay(player, slot);
                const score = natural
                    ? slotScore(player, slot)
                    : (slotScore(player, slot) * FALLBACK_FACTOR - FALLBACK_PENALTY);
                return { slotObj, slot, index: slotIdx, player, score, natural };
            });

            const starters = picks.filter(Boolean);
            if (starters.length < 11) return null;

            const total = starters.reduce((sum, p) => sum + p.score, 0);
            const naturalCoverage = starters.filter(p => p.natural).length;
            const fallbackCount = starters.length - naturalCoverage;

            const structureBonus = naturalCoverage * 6 - fallbackCount * 16;
            return { formation: formationName, slots, starters, totalScore: total + structureBonus, naturalCoverage, fallbackCount };
        };

        // ── Évaluation de toutes les formations IP ──
        const formationResults = Object.keys(formations)
            .map(name => evaluateFormation(name))
            .filter(Boolean)
            .sort((a, b) => b.totalScore - a.totalScore);

        if (!formationResults.length) throw new Error('Impossible d\'évaluer les formations disponibles.');

        const getBestOOPFitScore = (player, slotObj) => {
            const slotPos = slotObj && slotObj.pos ? slotObj.pos : slotObj;
            const slotX = slotObj && slotObj.x !== undefined ? slotObj.x : undefined;
            if (slotPos === 'GK') {
                return (player.ref || 0) * 1.6 + (player.one || 0) * 1.5 + (player.cmd || 0) * 1.1 + naRelativeBonus(player);
            }
            const roles = self.getOOPRolesForSlot(slotPos, slotX);
            if (!roles || !roles.length) return slotScore(player, slotPos);
            let best = -1e9;
            roles.forEach(r => {
                const scored = self.scorePlayerForRole(player, r.name);
                const weighted = scored.oopScore * 0.65 + scored.ipScore * 0.35;
                if (weighted > best) best = weighted;
            });
            return best;
        };

        const buildOOPStarterMapping = (ipResult, oopShape) => {
            const starters = ipResult.starters || [];
            if (!oopShape.length || !starters.length) {
                return {
                    transitionPenaltyTotal: 0,
                    oopSlotToStarterIdx: [],
                    oopNaturalCoverage: 0,
                    oopFallbackCount: 0,
                    majorShiftCount: 0
                };
            }

            const scoreMatrix = oopShape.map(slotObj => {
                return starters.map((starter) => {
                    const trans = transitionPenalty(starter.slot, slotObj.pos, starter.player);
                    const fit = getBestOOPFitScore(starter.player, slotObj);
                    const naturalAdj = canPlay(starter.player, slotObj.pos) ? 10 : -22;

                    const ipSide = starter.slotObj ? self.getSideBucket(starter.slotObj.x) : 'center';
                    const oopSide = slotObj && slotObj.x !== undefined ? self.getSideBucket(slotObj.x) : 'center';
                    const sidePenalty = ipSide === oopSide ? 0 : -8;

                    const slotGroupPenalty = (() => {
                        const groupIP = SLOT_GROUP[starter.slot] || 'mid';
                        const groupOOP = SLOT_GROUP[slotObj.pos] || 'mid';
                        if (groupIP === groupOOP) return 0;
                        const major = (groupIP === 'attack' && groupOOP === 'def') || (groupIP === 'def' && groupOOP === 'attack');
                        return major ? -24 : -8;
                    })();

                    return trans * 1.35 + fit * 0.14 + naturalAdj + sidePenalty + slotGroupPenalty;
                });
            });

            const solved = hungarianMaximize(scoreMatrix);
            const oopSlotToStarterIdx = solved.assignment.map(idx => (idx >= 0 && idx < starters.length ? idx : 0));

            const transitionPenaltyTotal = oopSlotToStarterIdx.reduce((sum, starterIdx, oopSlotIdx) => {
                const starter = starters[starterIdx];
                const slotOOP = oopShape[oopSlotIdx] ? oopShape[oopSlotIdx].pos : starter.slot;
                return sum + transitionPenalty(starter.slot, slotOOP, starter.player);
            }, 0);

            let oopNaturalCoverage = 0;
            let majorShiftCount = 0;
            oopSlotToStarterIdx.forEach((starterIdx, oopSlotIdx) => {
                const starter = starters[starterIdx];
                const slotOOP = oopShape[oopSlotIdx] ? oopShape[oopSlotIdx].pos : starter.slot;
                if (canPlay(starter.player, slotOOP)) oopNaturalCoverage += 1;

                const groupIP = SLOT_GROUP[starter.slot] || 'mid';
                const groupOOP = SLOT_GROUP[slotOOP] || 'mid';
                const isMajor = (groupIP === 'attack' && groupOOP === 'def') || (groupIP === 'def' && groupOOP === 'attack');
                if (isMajor) majorShiftCount += 1;
            });
            const oopFallbackCount = oopSlotToStarterIdx.length - oopNaturalCoverage;

            return {
                transitionPenaltyTotal,
                oopSlotToStarterIdx,
                oopNaturalCoverage,
                oopFallbackCount,
                majorShiftCount
            };
        };

        // ── Score dual-phase : IP + OOP, avec priorité à la cohérence OOP ──
        const dualResults = [];

        formationResults.forEach(ipCandidate => {
            const oopCandidates = (suggestedOOP[ipCandidate.formation] || []).length
                ? suggestedOOP[ipCandidate.formation]
                : [ipCandidate.formation];

            oopCandidates.forEach(oopName => {
                const oopEval = evaluateFormation(oopName);
                if (!oopEval) return;

                const oopShape = formations[oopName] || [];
                
                const mapping = buildOOPStarterMapping(ipCandidate, oopShape);
                const cohesionPenalty = mapping.oopFallbackCount * 18 + mapping.majorShiftCount * 12;

                dualResults.push({
                    formationIP: ipCandidate.formation,
                    formationOOP: oopName,
                    ipResult: ipCandidate,
                    oopResult: oopEval,
                    oopMapping: mapping,
                    transitionPenalty: mapping.transitionPenaltyTotal,
                    cohesionPenalty,
                    dualScore: ipCandidate.totalScore + oopEval.totalScore - cohesionPenalty
                });
            });
        });
        dualResults.sort((a, b) => b.dualScore - a.dualScore);
        const identityOOPIdx = (formationResults[0]?.starters || []).map((_, idx) => idx);
        const identityMapping = {
            transitionPenaltyTotal: 0,
            oopSlotToStarterIdx: identityOOPIdx,
            oopNaturalCoverage: identityOOPIdx.length,
            oopFallbackCount: 0,
            majorShiftCount: 0
        };
        const bestDual = dualResults[0] || {
            formationIP: formationResults[0].formation,
            formationOOP: formationResults[0].formation,
            ipResult: formationResults[0],
            oopResult: formationResults[0],
            oopMapping: identityMapping,
            transitionPenalty: 0,
            cohesionPenalty: 0
        };
        const bestIP  = bestDual.ipResult;

        // ── Profil d'équipe ──
        const startersOutfield = bestIP.starters.map(s => s.player)
            .filter(p => !(p.position || '').includes('GB'));

        // Joueurs par ligne pour pondération zonale
        const defSlots  = new Set(['CB', 'LB', 'RB', 'LWB', 'RWB']);
        const midSlots  = new Set(['DM', 'CM', 'LM', 'RM']);
        const attSlots2 = new Set(['AM', 'LW', 'RW', 'ST']);
        const defPlayers2 = bestIP.starters.filter(s => defSlots.has(s.slot)).map(s => s.player);
        const midPlayers2 = bestIP.starters.filter(s => midSlots.has(s.slot)).map(s => s.player);
        const attPlayers2 = bestIP.starters.filter(s => attSlots2.has(s.slot)).map(s => s.player);

        const zonalAvg = (defArr, midArr, attArr, fn, wDef, wMid, wAtt) => {
            const d = defArr.length ? avg(defArr.map(fn)) : 0;
            const m = midArr.length ? avg(midArr.map(fn)) : 0;
            const a = attArr.length ? avg(attArr.map(fn)) : 0;
            const total = (defArr.length > 0 ? wDef : 0) + (midArr.length > 0 ? wMid : 0) + (attArr.length > 0 ? wAtt : 0);
            if (!total) return 0;
            return (d * (defArr.length > 0 ? wDef : 0) + m * (midArr.length > 0 ? wMid : 0) + a * (attArr.length > 0 ? wAtt : 0)) / total;
        };

        const teamProfile = {
            // Pressing : 20% def / 30% mid / 50% att — le pressing part d'en haut
            pressing:   zonalAvg(defPlayers2, midPlayers2, attPlayers2,
                            p => (p.wor + p.team + p.sta + p.ant) / 4, 0.2, 0.3, 0.5),
            // Technique : 20% def / 50% mid / 30% att
            technique:  zonalAvg(defPlayers2, midPlayers2, attPlayers2,
                            p => (p.pas + p.tec + p.fir + p.vis) / 4, 0.2, 0.5, 0.3),
            // Pace : global
            pace:       avg(startersOutfield.map(p => (p.acc + p.pac) / 2)),
            aerial:     avg(startersOutfield.map(p => (p.hea + p.jmp + p.str) / 3)),
            creativity: avg(startersOutfield.map(p => (p.vis + p.dec + p.dri + p.comp) / 4)),
            defensive:  avg(startersOutfield.map(p => (p.mar + p.tac + p.conc + p.ant) / 4)),
            // Endurance globale — limite le tempo
            stamina:    avg(startersOutfield.map(p => p.sta || 0)),
            // Décisions — limite la mentalité offensive
            decisions:  avg(startersOutfield.map(p => p.dec || 0)),
            topNA:      max(outfield.map(p => p.na || 0)),
            avgNA:      avg(outfield.map(p => p.na || 0))
        };

        const wideSet = new Set(['LM', 'RM', 'LW', 'RW', 'LWB', 'RWB']);
        const widePlayers = bestIP.starters.filter(s => wideSet.has(s.slot)).map(s => s.player);
        const wingPace     = avg(widePlayers.map(p => (p.acc + p.pac) / 2));
        const wingDrib     = avg(widePlayers.map(p => p.dri || 0));
        const wingCreative = avg(widePlayers.map(p => (p.dri + p.tec + p.fin) / 3));

        const squadOutfield = outfield.length ? outfield : startersOutfield;
        const squadWidePlayers = squadOutfield.filter(p =>
            canPlay(p, 'LM') || canPlay(p, 'RM') || canPlay(p, 'LW') || canPlay(p, 'RW') || canPlay(p, 'LWB') || canPlay(p, 'RWB')
        );
        const squadProfile = {
            pressing: avg(squadOutfield.map(p => (p.wor + p.team + p.sta + p.ant) / 4)),
            technique: avg(squadOutfield.map(p => (p.pas + p.tec + p.fir + p.vis) / 4)),
            pace: avg(squadOutfield.map(p => (p.acc + p.pac) / 2)),
            aerial: avg(squadOutfield.map(p => (p.hea + p.jmp + p.str) / 3)),
            creativity: avg(squadOutfield.map(p => (p.vis + p.dec + p.dri + p.comp) / 4)),
            defensive: avg(squadOutfield.map(p => (p.mar + p.tac + p.conc + p.ant) / 4)),
            stamina: avg(squadOutfield.map(p => p.sta || 0)),
            decisions: avg(squadOutfield.map(p => p.dec || 0))
        };
        const squadWingPace = squadWidePlayers.length
            ? avg(squadWidePlayers.map(p => (p.acc + p.pac) / 2))
            : wingPace;
        const squadWingCreative = squadWidePlayers.length
            ? avg(squadWidePlayers.map(p => (p.dri + p.tec + p.fin) / 3))
            : wingCreative;

        const above = (value, baseline, margin) => value >= (baseline + margin);
        const highPressProfile = above(teamProfile.pressing, squadProfile.pressing, 0.45);
        const highPaceProfile = above(teamProfile.pace, squadProfile.pace, 0.45);
        const highTechniqueProfile = above(teamProfile.technique, squadProfile.technique, 0.55);
        const highCreativeProfile = above(teamProfile.creativity, squadProfile.creativity, 0.45);

        // ── Détection du style (seuils adaptatifs selon l'effectif) ──
        let style = 'balanced';
        let styleLabel = 'Équilibré pragmatique';
        let styleReason = '';

        if (above(wingPace, squadWingPace, 0.7) && above(wingCreative, squadWingCreative, 0.6)) {
            style = 'transition'; styleLabel = 'Transitions couloirs / attaquants intérieurs';
            styleReason = `Ailiers au-dessus du niveau effectif (vitesse ${wingPace.toFixed(1)} vs ${squadWingPace.toFixed(1)}, percussion ${wingCreative.toFixed(1)} vs ${squadWingCreative.toFixed(1)}).`;
        } else if (highTechniqueProfile && highCreativeProfile) {
            style = 'possession'; styleLabel = 'Contrôle possession';
            styleReason = `Niveau technique/créatif supérieur à l'effectif (tech ${teamProfile.technique.toFixed(1)}, créa ${teamProfile.creativity.toFixed(1)}).`;
        } else if (highPaceProfile && highPressProfile) {
            style = 'press'; styleLabel = 'Pressing vertical';
            styleReason = `Vitesse et pressing supérieurs au baseline effectif (pace ${teamProfile.pace.toFixed(1)}, pressing ${teamProfile.pressing.toFixed(1)}).`;
        } else if (teamProfile.pace >= 13.3 && teamProfile.pressing >= 13.3) {
            style = 'press'; styleLabel = 'Pressing vertical';
            styleReason = `Valeurs absolues élevées (pace ${teamProfile.pace.toFixed(1)}, pressing ${teamProfile.pressing.toFixed(1)}).`;
        } else if (wingPace >= 13.6 && wingCreative >= 12.8) {
            style = 'transition'; styleLabel = 'Transitions couloirs / attaquants intérieurs';
            styleReason = `Niveau absolu des couloirs élevé (vitesse ${wingPace.toFixed(1)}, percussion ${wingCreative.toFixed(1)}).`;
        } else if (above(teamProfile.aerial, squadProfile.aerial, 0.6)) {
            style = 'aerial'; styleLabel = 'Jeu direct / centres';
            styleReason = `Domination aérienne notable (XI ${teamProfile.aerial.toFixed(1)} vs effectif ${squadProfile.aerial.toFixed(1)}).`;
        } else {
            styleReason = `Effectif homogène (NA moy. ${teamProfile.avgNA.toFixed(0)}).`;
        }

        // ── Consignes d'équipe dynamiques par dimension ──
        const rolesIPFinal  = {};
        const rolesOOPFinal = {};
        const playerNames   = {};
        const playerInstructions = {};

        // Pré-calcul rôles pour l'analyse des overlaps
        bestIP.starters.forEach((starter, idx) => {
            rolesIPFinal[idx] = pickRoleIP(starter.slotObj || starter.slot, starter.player);
        });
        const oopSlots = formations[bestDual.formationOOP] || [];
        const oopSlotToStarterIdx = (bestDual.oopMapping && bestDual.oopMapping.oopSlotToStarterIdx) || [];
        const canonicalToOOPIndex = {};
        const oopToCanonicalIndex = {};
        oopSlots.forEach((slot, idx) => {
            const starterIdx = oopSlotToStarterIdx[idx] !== undefined ? oopSlotToStarterIdx[idx] : idx;
            const starter = bestIP.starters[starterIdx] || bestIP.starters[0];
            rolesOOPFinal[idx] = pickRoleOOP(slot, starter.player);
            canonicalToOOPIndex[starterIdx] = idx;
            oopToCanonicalIndex[idx] = starterIdx;
        });

        // Détection rôles créatifs (pour consignes créativité)
        const creativityRoles = ['Meneur', 'Rôle Libre'];
        const hasCreativeRole = Object.values(rolesIPFinal).some(r =>
            creativityRoles.some(kw => r.includes(kw))
        );
        // Détection pivot aérien en ST
        const stStarter = bestIP.starters.find(s => s.slot === 'ST');
        const hasPivot   = stStarter && (stStarter.player.hea || 0) >= 14 && (stStarter.player.jmp || 0) >= 13;
        // Détection ailiers intérieurs (coupent vers l'intérieur)
        const wideIntSlots = ['LW', 'RW', 'LM', 'RM'];
        const hasInteriorWingers = bestIP.starters
            .filter(s => wideIntSlots.includes(s.slot))
            .some(s => {
                const rip = rolesIPFinal[s.index];
                return rip && (rip.includes('Intérieur') || rip.includes('Couloir'));
            });
        // Compétence dribble des attaquants
        const attSlots = new Set(['AM', 'LM', 'RM', 'LW', 'RW', 'ST']);
        const attPlayers = bestIP.starters.filter(s => attSlots.has(s.slot)).map(s => s.player);
        const dribSkill = avg(attPlayers.map(p => ((p.dri || 0) + (p.tec || 0)) / 2));
        // Pace des DC
        const cbPlayers = bestIP.starters.filter(s => s.slot === 'CB').map(s => s.player);
        const cbPace    = avg(cbPlayers.map(p => (p.acc + p.pac) / 2));

        // ── IP instructions ──
        const instrIP = {};

        const staminaEdge = teamProfile.stamina - squadProfile.stamina;
        const techniqueEdge = teamProfile.technique - squadProfile.technique;
        const creativityEdge = teamProfile.creativity - squadProfile.creativity;
        const paceEdge = teamProfile.pace - squadProfile.pace;
        const pressingEdge = teamProfile.pressing - squadProfile.pressing;

        instrIP['tempo']              = (pressingEdge >= 0.55 && paceEdge >= 0.55 && staminaEdge >= -0.1) ? 'much-higher'
                          : paceEdge >= 0.2 ? 'higher' : 'standard';

        instrIP['passing-style']      = techniqueEdge <= -0.6 ? 'direct'
                          : (techniqueEdge >= 0.5 && creativityEdge >= 0.45) ? 'shorter'
                          : 'standard';

        instrIP['pass-target']        = creativityEdge >= 0.45 ? 'feet'
                          : paceEdge >= 0.45 ? 'space' : 'standard';

        instrIP['width-attack']       = (wingDrib >= squadWingCreative + 1.1 || wingPace >= squadWingPace + 1.0) ? 'very-wide'
                          : wingPace >= squadWingPace + 0.35 ? 'wide' : 'narrow';

        instrIP['attack-focus']       = hasPivot ? 'flanks' : 'balanced';
        instrIP['crossing-style']     = hasPivot ? 'floated' : 'low';
        instrIP['crossing-patience']  = paceEdge >= 0.4 ? 'early' : 'work-ball';
        instrIP['dribbling']          = dribSkill >= (squadWingCreative + 0.6) ? 'encourage' : 'standard';
        instrIP['long-shots']         = creativityEdge >= 0.35 ? 'standard' : 'discourage';
        instrIP['creative-freedom']   = hasCreativeRole || creativityEdge >= 0.65 ? 'expressive' : 'balanced';
        instrIP['pressing-strategy']  = pressingEdge >= 0.7 ? 'bypass'
                          : pressingEdge >= 0.15 ? 'balanced' : 'manage';
        instrIP['goal-kicks']         = techniqueEdge >= 0.45 ? 'short' : paceEdge >= 0.5 ? 'long' : 'mixed';
        instrIP['distribution-target']= techniqueEdge >= 0.45 ? 'cb' : 'flanks';
        instrIP['distribution-speed'] = paceEdge >= 0.5 ? 'fast' : 'balanced';
        instrIP['counter-attack']     = paceEdge >= 0.45 ? 'yes' : 'standard';
        instrIP['time-wasting']       = 'normal';
        instrIP['set-pieces']         = 'yes';

        // ── OOP instructions ──
        const instrOOP = {};

        // Ligne défensive : vérifier aussi que le GK peut sortir si ligne haute
        const gkStarter = bestIP.starters.find(s => s.slot === 'GK');
        const gkAcc = gkStarter ? (gkStarter.player.acc || 0) : 0;
        const safeHighLine = cbPace >= (squadProfile.pace + 0.8) && gkAcc >= 10;
        instrOOP['defensive-line']       = safeHighLine ? 'higher' : cbPace >= (squadProfile.pace - 0.2) ? 'standard' : 'lower';

        instrOOP['pressing-height']      = pressingEdge >= 0.7 ? 'high'
                         : pressingEdge >= 0.15 ? 'medium' : 'low';
        instrOOP['pressing-trigger']     = pressingEdge >= 0.8 ? 'much-more'
                         : pressingEdge >= 0.35 ? 'more' : 'less';
        instrOOP['defensive-transition'] = pressingEdge >= 0.5 ? 'counter-press' : 'regroup';
        instrOOP['tackling']             = (teamProfile.defensive - squadProfile.defensive) >= 0.6 ? 'harder'
                         : (teamProfile.defensive - squadProfile.defensive) >= 0.1 ? 'standard' : 'ease';
        instrOOP['pressing-crosses']     = 'stop';

        // Pressing trap : si milieux axiaux défensivement forts → vers l'intérieur
        const cmPlayers = bestIP.starters.filter(s => s.slot === 'CM' || s.slot === 'DM').map(s => s.player);
        const cmDefensive = cmPlayers.length ? avg(cmPlayers.map(p => (p.mar + p.tac + p.conc) / 3)) : 0;
        instrOOP['pressing-trap']        = (style === 'possession' || cmDefensive >= 14) ? 'inside' : 'outside';

        instrOOP['defensive-behavior']   = pressingEdge >= 0.45 ? 'step-up' : 'balanced';
        instrOOP['prevent-short-gk']     = pressingEdge >= 0.25 ? 'yes' : 'no';

        // ── Overlaps dynamiques ──
        const hasWB = bestIP.starters.some(s => s.slot === 'LWB' || s.slot === 'RWB');
        const overlaps = {
            'overlap-left':   !hasInteriorWingers || hasWB,
            'overlap-right':  !hasInteriorWingers || hasWB,
            'underlap-left':  hasInteriorWingers,
            'underlap-right': hasInteriorWingers
        };

        // ── Mentality dynamique ──
        const decisionsEdge = teamProfile.decisions - squadProfile.decisions;
        const canBePositive = teamProfile.decisions >= 10.8 && decisionsEdge >= -0.15;
        const mentality = (canBePositive && highPressProfile && highPaceProfile) ? 4
                : (highTechniqueProfile || highCreativeProfile) ? 3
                : ((teamProfile.defensive - squadProfile.defensive) >= 0.6 && paceEdge < -0.2) ? 2
                        : 3;

        // ── Assignation finale joueurs + PI ──
        bestIP.starters.forEach((starter, idx) => {
            playerNames[idx] = starter.player.name;
            const roleIP  = rolesIPFinal[idx]  || '';
            const mappedOOPIndex = canonicalToOOPIndex[idx];
            const roleOOP = mappedOOPIndex !== undefined ? (rolesOOPFinal[mappedOOPIndex] || '') : '';
            playerInstructions[idx] = buildPlayerPI(starter.player, roleIP, roleOOP);
        });

        // ── Meilleurs joueurs par poste ──
        const bestByPos = {};
        ['GK', 'CB', 'LB', 'RB', 'DM', 'CM', 'AM', 'LW', 'RW', 'ST'].forEach(slot => {
            const cands = players
                .filter(p => canPlay(p, slot))
                .sort((a, b) => slotScore(b, slot) - slotScore(a, slot));
            if (cands.length > 0) bestByPos[slot] = cands.slice(0, 3).map(p => `${p.name} (${p.na || '?'})`);
        });

        const topFormations = formationResults.slice(0, 8).map(item => ({
            formation: item.formation,
            score: Math.round(item.totalScore),
            naturalCoverage: item.naturalCoverage
        }));

        const tacticSlots = bestIP.starters.map((starter, idx) => ({
            index: idx,
            slotCode: starter.slot,
            roleIP: rolesIPFinal[idx] || starter.slot,
            roleOOP: rolesOOPFinal[canonicalToOOPIndex[idx]] || rolesIPFinal[idx] || starter.slot,
            player: starter.player,
            slotObj: starter.slotObj
        }));

        const marketStyleProfiles = {
            press: {
                label: 'Profil pressing vertical',
                summary: 'Priorité à des joueurs capables de répéter les efforts, presser haut et couvrir les transitions.',
                keyAttrs: ['Endurance 14+', 'Volume de jeu 14+', 'Accélération 13+', 'Vitesse 13+', 'Travail d\'équipe 13+', 'Anticipation 13+']
            },
            transition: {
                label: 'Profil transition / couloirs',
                summary: 'Cherche de la vitesse, des appels dans le dos et des joueurs capables d\'attaquer vite l\'espace.',
                keyAttrs: ['Accélération 14+', 'Vitesse 14+', 'Dribbles 13+', 'Décisions 13+', 'Endurance 12+', 'Sans ballon 12+']
            },
            possession: {
                label: 'Profil possession / contrôle',
                summary: 'Cherche des joueurs propres techniquement, capables de sécuriser et faire circuler sous pression.',
                keyAttrs: ['Passes 14+', 'Vision du jeu 13+', 'Technique 13+', 'Sang-froid 13+', 'Décisions 13+', 'Contrôle de balle 13+']
            },
            aerial: {
                label: 'Profil direct / jeu aérien',
                summary: 'Cherche de la présence dans la surface, des duels aériens et des seconds ballons.',
                keyAttrs: ['Jeu de tête 14+', 'Détente 14+', 'Puissance 13+', 'Finition 13+', 'Sang-froid 12+', 'Anticipation 12+']
            },
            hybrid: {
                label: 'Profil hybride',
                summary: 'Cherche des profils polyvalents, propres techniquement et capables de s\'adapter à plusieurs rôles.',
                keyAttrs: ['Décisions 13+', 'Technique 13+', 'Passes 13+', 'Endurance 12+', 'Vitesse 12+', 'Vision du jeu 12+']
            }
        };

        const marketStyle = marketStyleProfiles[style] || marketStyleProfiles.hybrid;
        const squadAvgNA = naValues.length ? avg(naValues) : 0;

        // ── Scoring d'un joueur sur un slot (IP + OOP séparément) ──
        const scorePlayerOnSlot = (player, slot) => {
            const scoredIP = self.scorePlayerForRole(player, slot.roleIP || slot.slotCode);
            const scoredOOP = self.scorePlayerForRole(player, slot.roleOOP || slot.roleIP || slot.slotCode);
            const compat = self.getPositionCompatibility(player, slot.slotCode || '');
            const compatMultiplier = compat === 'natural' ? 1 : compat === 'capable' ? 0.9 : 0.72;
            const combined = Math.round(((scoredIP.totalScore * 0.56) + (scoredOOP.totalScore * 0.44)) * compatMultiplier);
            const ipOopGap = scoredIP.totalScore - scoredOOP.totalScore;
            return { slot, compat, compatMultiplier, ipScore: scoredIP.totalScore, oopScore: scoredOOP.totalScore, combinedScore: combined, ipOopGap };
        };

        const bestSlotForPlayer = (player) => {
            const scored = tacticSlots.map(slot => scorePlayerOnSlot(player, slot))
                .sort((a, b) => b.combinedScore - a.combinedScore);
            return scored[0] || null;
        };

        // ── Profondeur par slot : combien de joueurs peuvent couvrir décemment ──
        const slotDepth = {};
        for (const slot of tacticSlots) {
            slotDepth[slot.slotCode] = players.filter(p => {
                const s = scorePlayerOnSlot(p, slot);
                return s.combinedScore >= 50 && s.compat !== 'unlikely';
            }).length;
        }

        // ── Indispensabilité : slots où le joueur est le MEILLEUR ou l'un des 2 seuls ──
        // On utilise ipScore comme critère primaire pour éviter qu'un mauvais rôle OOP
        // ne pénalise un joueur qui est objectivement bon à ce poste en possession.
        const slotTopPlayer = {};
        for (const slot of tacticSlots) {
            const ranked = players
                .map(p => ({ player: p, s: scorePlayerOnSlot(p, slot) }))
                // Tri par ipScore d'abord (résistant aux mauvais rôles OOP), puis combinedScore
                .sort((a, b) => b.s.ipScore !== a.s.ipScore
                    ? b.s.ipScore - a.s.ipScore
                    : b.s.combinedScore - a.s.combinedScore);
            slotTopPlayer[slot.slotCode] = ranked.slice(0, 2).map(r => r.player);
        }

        // Starters identifiés par le XI optimisé
        const starterSet = new Set(bestIP.starters.map(s => s.player));

        const isIndispensable = (player) => {
            // Protection 1 : joueur titulaire dont le ipScore est ≥ 55 à son slot attribué
            const starterIdx = bestIP.starters.findIndex(s => s.player === player);
            if (starterIdx >= 0) {
                const assignedSlot = tacticSlots[starterIdx];
                if (assignedSlot) {
                    const s = scorePlayerOnSlot(player, assignedSlot);
                    if (s.ipScore >= 55) return true;
                }
            }
            // Protection 2 : dans le top2 d'un slot avec profondeur faible
            return tacticSlots.some(slot => {
                const top2 = slotTopPlayer[slot.slotCode] || [];
                const depth = slotDepth[slot.slotCode] || 0;
                return top2.includes(player) && depth <= 2;
            });
        };

        const playerFits = players.map(player => {
            const bestSlot = bestSlotForPlayer(player);
            const starterIndex = bestIP.starters.findIndex(s => s.player === player);
            const isStarter = starterIndex >= 0;
            const age = player.age || 0;
            let sellScore = 0;
            const reasons = [];

            // Protection : joueur indispensable (seul ou l'un des 2 à son poste)
            if (isIndispensable(player)) {
                return { player, bestSlot, starter: isStarter, sellScore: 0, action: 'keep', reasons: ['indispensable à son poste'], group: self.positionGroup(player.position) };
            }

            if (bestSlot) {
                if (bestSlot.combinedScore < 45) {
                    sellScore += 30;
                    reasons.push(`fit faible (${bestSlot.combinedScore}/100)`);
                } else if (bestSlot.combinedScore < 60) {
                    sellScore += 18;
                    reasons.push(`fit moyen (${bestSlot.combinedScore}/100)`);
                }
                if (bestSlot.compat === 'unlikely') {
                    sellScore += 10;
                    reasons.push('poste peu compatible');
                }
                // IP/OOP gap : bon en possession mais pas défensivement (ou inverse)
                if (Math.abs(bestSlot.ipOopGap) >= 15) {
                    const gapLabel = bestSlot.ipOopGap > 0 ? 'profil IP only' : 'profil OOP only';
                    sellScore += 6;
                    reasons.push(gapLabel);
                }
            } else {
                sellScore += 25;
                reasons.push('aucun slot clair');
            }

            if (!isStarter) {
                sellScore += 10;
                reasons.push('hors XI de départ');
            }

            if (age >= 30) {
                sellScore += 10;
                reasons.push('âge avancé');
            } else if (age >= 28) {
                sellScore += 5;
                reasons.push('rotation à surveiller');
            }

            if (player.na && squadAvgNA && player.na < squadAvgNA - 5) {
                sellScore += 8;
                reasons.push('NA sous le cœur du groupe');
            }

            const action = sellScore >= 45 ? 'sell' : sellScore >= 28 ? 'watch' : 'keep';
            return { player, bestSlot, starter: isStarter, sellScore, action, reasons, group: self.positionGroup(player.position) };
        });

        const sellCandidates = playerFits
            .filter(item => item.action !== 'keep')
            .sort((a, b) => b.sellScore - a.sellScore)
            .slice(0, 8)
            .map(item => ({
                name: item.player.name,
                age: item.player.age || '?',
                na: item.player.na || '?',
                position: item.player.position,
                bestSlot: item.bestSlot ? item.bestSlot.slot.slotCode : '-',
                bestRoleIP: item.bestSlot ? item.bestSlot.slot.roleIP : '-',
                bestScore: item.bestSlot ? item.bestSlot.combinedScore : 0,
                ipScore: item.bestSlot ? item.bestSlot.ipScore : 0,
                oopScore: item.bestSlot ? item.bestSlot.oopScore : 0,
                action: item.action,
                reasons: item.reasons
            }));

        const styleBoostAttrs = {
            press: new Set(['sta', 'wor', 'acc', 'pac', 'ant', 'dec', 'tac']),
            transition: new Set(['acc', 'pac', 'dri', 'fin', 'ant', 'dec']),
            possession: new Set(['pas', 'vis', 'tec', 'fir', 'comp', 'dec']),
            aerial: new Set(['hea', 'jmp', 'str', 'fin', 'comp']),
            hybrid: new Set(['dec', 'tec', 'pas'])
        }[style] || new Set();

        const slotNeeds = tacticSlots.map(slot => {
            const scored = players.map(player => {
                const s = scorePlayerOnSlot(player, slot);
                return { player, ...s };
            }).sort((a, b) => b.combinedScore - a.combinedScore);

            const best = scored[0] || { combinedScore: 0, ipScore: 0, oopScore: 0 };
            const top3 = scored.slice(0, 3);
            const depth = slotDepth[slot.slotCode] || 0;

            // IP/OOP gap sur le meilleur joueur de ce slot
            const ipOopGap = best.ipScore && best.oopScore ? Math.round(best.ipScore - best.oopScore) : 0;

            // Si le meilleur joueur est titulaire incontesté avec bon score IP,
            // le rôle OOP ne peut pas faire monter l'urgence au-delà de 'high'.
            // Cas typique : GK avec rôle Libéro OOP inadapté → ipScore bon mais oopScore effondré.
            const bestIsStarter = best.player && starterSet.has(best.player);
            const ipGapInflation = best.ipScore >= 55 && best.combinedScore < 55; // OOP tire le score vers le bas

            // Urgence : combinaison score + profondeur
            let urgency = best.combinedScore < 55 ? 'urgent' : best.combinedScore < 65 ? 'high' : 'medium';
            if (depth <= 1 && urgency === 'medium') urgency = 'high';
            if (depth === 0) urgency = 'urgent';

            // Cap : titulaire incontesté avec bon IP → au maximum 'high', jamais 'urgent'
            if (urgency === 'urgent' && bestIsStarter && ipGapInflation) urgency = 'high';

            const roleProfile = self.getRoleAttributeProfile(slot.roleIP || slot.slotCode || '');
            const keyAttrs = [...new Set([...(roleProfile.ipAttrs || []), ...(roleProfile.oopAttrs || [])])].slice(0, 5);
            const thresholdBase = urgency === 'urgent' ? 14 : urgency === 'high' ? 13 : 12;

            const thresholds = keyAttrs.map(attr => {
                const attrLabel = self.getAttrLabel(attr);
                const floor = thresholdBase + (styleBoostAttrs.has(attr) ? 1 : 0);
                return `${attrLabel} ${floor}+`;
            });

            return {
                slotCode: slot.slotCode,
                roleIP: slot.roleIP,
                roleOOP: slot.roleOOP,
                bestScore: best.combinedScore,
                ipScore: Math.round(best.ipScore || 0),
                oopScore: Math.round(best.oopScore || 0),
                ipOopGap,
                depth,
                urgency,
                thresholds,
                topCurrentPlayers: top3.map(item => ({
                    name: item.player.name,
                    score: item.combinedScore,
                    ipScore: Math.round(item.ipScore || 0),
                    oopScore: Math.round(item.oopScore || 0),
                    compat: item.compat
                }))
            };
        }).sort((a, b) => {
            // Tri : urgent first, puis par score ASC (les plus faibles en tête)
            const urgOrd = { urgent: 0, high: 1, medium: 2 };
            const uDiff = (urgOrd[a.urgency] || 2) - (urgOrd[b.urgency] || 2);
            return uDiff !== 0 ? uDiff : a.bestScore - b.bestScore;
        });

        // ── Filtrer : garder uniquement les slots qui méritent vraiment une action ──
        // Dédupliquer les slots qui ont exactement le même roleIP + roleOOP (ex: 2× CM Milieu Axial)
        const seenRolePairs = new Map();
        const slotNeedsDeduped = slotNeeds.map(s => {
            const key = `${s.roleIP || s.slotCode}||${s.roleOOP || s.roleIP || s.slotCode}`;
            if (seenRolePairs.has(key)) {
                const existing = seenRolePairs.get(key);
                existing.count = (existing.count || 1) + 1;
                return null; // doublon
            }
            const entry = { ...s, count: 1 };
            seenRolePairs.set(key, entry);
            return entry;
        }).filter(Boolean);

        const buyPriorities = slotNeedsDeduped.filter(s => s.bestScore < 70 || s.depth <= 1).slice(0, 8);

        // ── Slots sans doublure (profondeur = 1 = que le titulaire) ──
        const fragilityWarnings = slotNeeds
            .filter(s => s.depth <= 1 && s.bestScore >= 70)
            .map(s => ({ slotCode: s.slotCode, roleIP: s.roleIP, depth: s.depth, bestScore: s.bestScore }));

        const marketPlan = {
            style,
            styleLabel,
            profileLabel: marketStyle.label,
            summary: marketStyle.summary,
            keyAttrs: marketStyle.keyAttrs,
            sellCandidates,
            buyPriorities,
            fragilityWarnings,
            tacticSlots,
            formationIP: bestDual.formationIP,
            formationOOP: bestDual.formationOOP
        };

        const transStr = bestDual.transitionPenalty < 0
            ? ` Pénalité de transition: ${bestDual.transitionPenalty} pts.` : '';

        const preset = {
            name: `META CSV — ${styleLabel}`,
            coach: 'Analyse attributs exhaustive',
            team: 'Ton équipe',
            formationIP: bestDual.formationIP,
            formationOOP: bestDual.formationOOP,
            mentality,
            difficulty: 3,
            effectiveness: 5,
            physical: (style === 'press' || style === 'transition') ? 5 : 4,
            description: `IP ${bestDual.formationIP} / OOP ${bestDual.formationOOP} — score dual ${Math.round(bestDual.dualScore)}.${transStr} ${styleReason}`,
            strengths: [
                `Formation IP: ${bestDual.formationIP} (score ${Math.round(bestIP.totalScore)}) | OOP: ${bestDual.formationOOP}`,
                `Couverture naturelle IP: ${bestIP.naturalCoverage}/11 | OOP (même XI): ${bestDual.oopMapping?.oopNaturalCoverage || 0}/11`,
                `Pénalité transition: ${bestDual.transitionPenalty} | Pénalité cohérence OOP: -${bestDual.cohesionPenalty || 0}`,
                `Profil: vitesse ${teamProfile.pace.toFixed(1)} • technique ${teamProfile.technique.toFixed(1)} • pressing ${teamProfile.pressing.toFixed(1)}`,
                `Style: ${styleLabel}`,
                `Rôles sélectionnés parmi tous les rôles disponibles par poste (scorePlayerForRole)`
            ],
            weaknesses: [
                'Analyse fondée sur attributs uniquement (pas de forme ni statistiques de saison)',
                'Ajustements contextuels requis selon adversaire'
            ],
            instructionsIP: instrIP,
            instructionsOOP: instrOOP,
            overlaps,
            rolesIP: rolesIPFinal,
            rolesOOP: rolesOOPFinal,
            playerInstructions,
            playerNames,
            marketPlan,
            phasePlayerMap: {
                formationIP: bestDual.formationIP,
                formationOOP: bestDual.formationOOP,
                ipToOop: canonicalToOOPIndex,
                oopToIp: oopToCanonicalIndex
            }
        };

        const report = {
            style, styleLabel, styleReason,
            profile: teamProfile,
            formationIP: bestDual.formationIP,
            formationOOP: bestDual.formationOOP,
            transitionPenalty: bestDual.transitionPenalty,
            cohesionPenalty: bestDual.cohesionPenalty || 0,
            starters: bestIP.starters.map(s => ({ slot: s.slot, player: s.player })),
            bestByPos,
            topFormations,
            marketPlan,
            totalPlayers: players.length,
            outfieldCount: outfield.length,
            analysedFormations: Object.keys(formations).length
        };

        this.playerNames = playerNames;
        return { preset, report };
    }

    renderCsvMetaSummary(report) {
        const container = document.getElementById('csv-meta-summary');
        if (!container || !report) return;

        const profileBar = (val, max = 20) => {
            const pct = Math.round((val / max) * 100);
            return `<span class="csv-bar" style="display:inline-block;width:${pct}%;max-width:100px;height:8px;background:var(--accent-color,#4CAF50);border-radius:4px;vertical-align:middle;margin-left:4px;" title="${val.toFixed(1)}"></span> ${val.toFixed(1)}`;
        };

        const starterRows = report.starters.slice(0, 11).map(s => {
            const p = s.player;
            return `<tr>
                <td><strong>${escapeHtml(s.slot)}</strong></td>
                <td>${escapeHtml(p.name)}</td>
                <td>${p.na || '?'}</td>
                <td>${p.age || '?'} ans</td>
                <td>${escapeHtml(p.role || '-')}</td>
            </tr>`;
        }).join('');

        const bestRows = Object.entries(report.bestByPos || {}).map(([slot, names]) => {
            return `<li><strong>${escapeHtml(slot)}:</strong> ${names.map(n => escapeHtml(n)).join(', ')}</li>`;
        }).join('');

        const topFormationRows = (report.topFormations || []).map(item => {
            return `<li><strong>${escapeHtml(item.formation)}</strong> — score ${escapeHtml(String(item.score))} (${escapeHtml(String(item.naturalCoverage))}/11 postes naturels)</li>`;
        }).join('');

        const marketPlan = report.marketPlan || null;

        const urgencyBadge = (u) => {
            const map = { urgent: ['bi-circle-fill', 'URGENT'], high: ['bi-exclamation-circle', 'ÉLEVÉ'], medium: ['bi-dash-circle', 'MOYEN'] };
            const [icon, label] = map[u] || ['bi-circle', u];
            return `<span class="csv-urgency-badge csv-urgency-${escapeHtml(u)}"><i class="bi ${icon}"></i> ${escapeHtml(label)}</span>`;
        };

        const ipOopBadge = (gap) => {
            if (Math.abs(gap) < 8) return '';
            return gap > 0
                ? ` <span class="csv-gap-badge csv-gap-ip" title="Meilleur en possession qu'en défense">IP+${gap}</span>`
                : ` <span class="csv-gap-badge csv-gap-oop" title="Meilleur hors possession qu'en possession">OOP+${Math.abs(gap)}</span>`;
        };

        const marketSellRows = marketPlan?.sellCandidates?.map(item => {
            const reasonText = (item.reasons || []).join(' · ');
            const label = item.action === 'sell' ? '<i class="bi bi-arrow-up-right-circle" style="color:#e63946"></i> Vente' : '<i class="bi bi-eye" style="color:#f4a261"></i> Surveiller';
            const gapBadge = item.ipScore && item.oopScore ? ipOopBadge(item.ipScore - item.oopScore) : '';
            return `<li>
                <span class="csv-sell-name"><strong>${escapeHtml(item.name)}</strong> ${label}</span>
                <span class="csv-sell-meta">${escapeHtml(String(item.position || '-'))} · ${escapeHtml(String(item.age || '?'))} ans · NA ${escapeHtml(String(item.na || '?'))} · fit ${escapeHtml(String(item.bestScore || 0))}/100${gapBadge}</span>
                ${reasonText ? `<span class="csv-sell-reasons"><em>${escapeHtml(reasonText)}</em></span>` : ''}
            </li>`;
        }).join('');

        const marketBuyRows = marketPlan?.buyPriorities?.map(item => {
            const currentPlayers = (item.topCurrentPlayers || []).map(t => {
                const gapStr = ipOopBadge(t.ipScore - t.oopScore);
                return `${escapeHtml(t.name)} (${t.score}/100${t.compat === 'natural' ? '' : ' ~'})${gapStr}`;
            }).join(', ');
            const depthWarn = item.depth <= 1 ? ` <span class="csv-depth-warn" title="Profondeur faible"><i class="bi bi-exclamation-triangle-fill"></i> ${item.depth} joueur viable</span>` : `<span class="csv-depth-ok"><i class="bi bi-people"></i> ${item.depth} joueurs viables</span>`;
            const threshStr = escapeHtml((item.thresholds || []).join(' · '));
            return `<li>
                <div class="csv-buy-header">${urgencyBadge(item.urgency)} <strong>${escapeHtml(item.slotCode)}${item.count > 1 ? ` ×${item.count}` : ''}</strong> — IP: ${escapeHtml(item.roleIP || '-')} | OOP: ${escapeHtml(item.roleOOP || '-')} ${depthWarn}</div>
                <div class="csv-buy-score">Meilleur actuel: <strong>${escapeHtml(String(item.bestScore || 0))}/100</strong> (IP ${escapeHtml(String(item.ipScore || 0))} · OOP ${escapeHtml(String(item.oopScore || 0))})</div>
                ${threshStr ? `<div class="csv-buy-thresholds">Attributs cibles: ${threshStr}</div>` : ''}
                ${currentPlayers ? `<div class="csv-buy-current">Meilleurs actuels: ${currentPlayers}</div>` : ''}
            </li>`;
        }).join('');

        const fragilityRows = marketPlan?.fragilityWarnings?.map(item => {
            return `<li><i class="bi bi-exclamation-triangle-fill" style="color:#e63946"></i> <strong>${escapeHtml(item.slotCode)}</strong> (${escapeHtml(item.roleIP || '-')}) — 1 seul joueur viable · score ${escapeHtml(String(item.bestScore))}/100</li>`;
        }).join('');

        container.innerHTML = `
            <div class="csv-report">
                <div class="csv-report-section">
                    <h4><i class="bi bi-crosshair"></i> Style META détecté: ${escapeHtml(report.styleLabel || report.style)}</h4>
                    <p class="csv-reason">${escapeHtml(report.styleReason || '')}</p>
                    <p><strong>Formations:</strong> En possession <em>${escapeHtml(report.formationIP)}</em> | Hors possession <em>${escapeHtml(report.formationOOP)}</em></p>
                    <p><strong>Effectif analysé:</strong> ${report.totalPlayers || '?'} joueurs (${report.outfieldCount || '?'} de champ)</p>
                    <p><strong>Formations testées:</strong> ${report.analysedFormations || '?'} du tool FM26</p>
                    <p><strong>Cohérence transition:</strong> pénalité transition ${Math.round(report.transitionPenalty || 0)} | pénalité cohérence OOP -${Math.round(report.cohesionPenalty || 0)}</p>
                </div>
                <div class="csv-report-section">
                    <h4><i class="bi bi-bar-chart-line"></i> Profil de l'équipe (top 15)</h4>
                    <table class="csv-profile-table">
                        <tr><td><i class="bi bi-lightning-charge"></i> Vitesse</td><td>${profileBar(report.profile.pace)}</td></tr>
                        <tr><td><i class="bi bi-tools"></i> Technique</td><td>${profileBar(report.profile.technique)}</td></tr>
                        <tr><td><i class="bi bi-activity"></i> Pressing</td><td>${profileBar(report.profile.pressing)}</td></tr>
                        <tr><td><i class="bi bi-lightbulb"></i> Créativité</td><td>${profileBar(report.profile.creativity)}</td></tr>
                        <tr><td><i class="bi bi-shield-check"></i> Défensif</td><td>${profileBar(report.profile.defensive)}</td></tr>
                        <tr><td><i class="bi bi-arrow-up-circle"></i> Aérien</td><td>${profileBar(report.profile.aerial)}</td></tr>
                    </table>
                </div>
                <div class="csv-report-section">
                    <h4><i class="bi bi-people"></i> Onze de départ optimisé</h4>
                    <table class="csv-starters-table">
                        <thead><tr><th>Poste</th><th>Joueur</th><th>NA</th><th>Âge</th><th>Rôle FM</th></tr></thead>
                        <tbody>${starterRows}</tbody>
                    </table>
                </div>
                ${bestRows ? `<div class="csv-report-section">
                    <h4><i class="bi bi-star"></i> Meilleurs joueurs par poste (top 3)</h4>
                    <ul class="csv-best-list">${bestRows}</ul>
                </div>` : ''}
                ${topFormationRows ? `<div class="csv-report-section">
                    <h4><i class="bi bi-grid-3x3-gap"></i> Top formations testées</h4>
                    <ul class="csv-best-list">${topFormationRows}</ul>
                </div>` : ''}
                ${marketPlan ? `<div class="csv-report-section">
                    <h4><i class="bi bi-briefcase"></i> Plan mercato — ${escapeHtml(marketPlan.profileLabel || 'Profil recrutement')}</h4>
                    <p class="csv-market-summary">${escapeHtml(marketPlan.summary || '')}</p>
                    ${fragilityRows ? `<div class="csv-report-subsection csv-fragility-section">
                        <h5><i class="bi bi-exclamation-octagon-fill"></i> Postes sans doublure fiable</h5>
                        <ul class="csv-best-list">${fragilityRows}</ul>
                    </div>` : ''}
                    ${marketSellRows ? `<div class="csv-report-subsection">
                        <h5>Ventes / Joueurs à surveiller</h5>
                        <ul class="csv-sell-list">${marketSellRows}</ul>
                    </div>` : ''}
                    ${marketBuyRows ? `<div class="csv-report-subsection">
                        <h5>Priorités de recrutement</h5>
                        <ul class="csv-buy-list">${marketBuyRows}</ul>
                    </div>` : ''}
                </div>` : ''}
            </div>
        `;
    }
    
    // ==========================================
    // Analysis
    // ==========================================
    runAnalysis() {
        const tips = window.FM26Data.ANALYSIS_TIPS;
        const counters = window.FM26Data.COUNTER_FORMATIONS;

        // Read current values from DOM if not in this.instructions
        const getInstruction = (id) => {
            if (this.instructions[id]) return this.instructions[id];
            const el = document.getElementById(id);
            return el ? el.value : 'standard';
        };

        // Analyze based on settings
        const strengths = [];
        const weaknesses = [];
        const recommendations = [];

        // Pressing trigger analysis (was 'pressing', now correct ID)
        const pressingTrigger = getInstruction('pressing-trigger');
        if (['more', 'much-more'].includes(pressingTrigger)) {
            strengths.push(tips.strengths.highPress);
            if (tips.strengths.oopRoles) strengths.push(tips.strengths.oopRoles);
        } else if (['less', 'much-less'].includes(pressingTrigger)) {
            weaknesses.push(tips.weaknesses.slowTempo);
        }

        // Pressing height analysis
        const pressingHeight = getInstruction('pressing-height');
        if (pressingHeight === 'high') {
            strengths.push('Pressing haut : recuperation rapide dans le camp adverse');
        } else if (pressingHeight === 'low') {
            strengths.push('Bloc bas : difficilement penetrable, attire l\'adversaire');
        }

        // Defensive line
        const defLine = getInstruction('defensive-line');
        if (['higher', 'much-higher'].includes(defLine)) {
            strengths.push(tips.strengths.compactness);
            weaknesses.push(tips.weaknesses.highLine);
        } else if (['lower', 'much-lower'].includes(defLine)) {
            strengths.push(tips.strengths.solidDefense);
            weaknesses.push(tips.weaknesses.lowBlock);
        }

        // Width
        const widthAttack = getInstruction('width-attack');
        if (['wide', 'very-wide'].includes(widthAttack)) {
            strengths.push(tips.strengths.width);
            if (tips.strengths.wingPlay) strengths.push(tips.strengths.wingPlay);
        } else if (['narrow', 'much-narrow'].includes(widthAttack)) {
            weaknesses.push(tips.weaknesses.lackOfWidth);
        }

        // Passing style
        const passingStyle = getInstruction('passing-style');
        if (['shorter', 'much-shorter'].includes(passingStyle)) {
            strengths.push(tips.strengths.possession);
        } else if (['direct', 'much-more-direct'].includes(passingStyle)) {
            strengths.push(tips.strengths.counterAttack);
        }

        // Tempo analysis
        const tempo = getInstruction('tempo');
        if (['higher', 'much-higher'].includes(tempo)) {
            strengths.push('Rythme eleve : desorganise la defense adverse');
            weaknesses.push('Rythme eleve : risque de perte de balle accru');
        } else if (['slower', 'much-slower'].includes(tempo)) {
            strengths.push('Rythme lent : meilleur controle de la possession');
        }

        // Defensive transition analysis
        const defTransition = getInstruction('defensive-transition');
        if (defTransition === 'counter-press') {
            strengths.push('Contre-pressing : recuperation immediate apres perte de balle');
        } else if (defTransition === 'regroup') {
            strengths.push('Regroupement : solidite defensive apres perte de balle');
        }

        // Counter-attack analysis
        const counterAttack = getInstruction('counter-attack');
        if (counterAttack === 'yes') {
            strengths.push('Contre-attaque activee : transitions offensives rapides');
        }

        // FM26 specific analysis
        if (this.formationIP !== this.formationOOP) {
            strengths.push(tips.strengths.dualFormation);
        }

        this.analyzeIndividualInstructions(strengths, weaknesses, recommendations);

        // Check for inverted wing-backs
        const hasInvertedWB = Object.values(this.playerRoles.ip).some(role =>
            (role && role.includes('Inversé')) || (role && role.includes('Intérieur'))
        );
        if (hasInvertedWB) {
            strengths.push(tips.strengths.invertedWingbacks);
            recommendations.push(tips.recommendations.exploitHalfSpaces);
        }

        // Add recommendations based on formation
        recommendations.push(tips.recommendations.matchFormations);
        if (this.formationIP.startsWith('4')) {
            recommendations.push(tips.recommendations.useFullBacks);
        }
        if (this.formationIP.includes('3')) {
            recommendations.push(tips.recommendations.useWidth);
        }

        const passingStyleVal = passingStyle;
        const crossingPatVal = getInstruction('crossing-patience');
        const goalKicksVal = getInstruction('goal-kicks');
        const presStratVal = getInstruction('pressing-strategy');
        const counterVal = getInstruction('counter-attack');
        const tempoVal = tempo;

        // ==========================================
        // FM26 — Seuils d'attributs minimum requis
        // ==========================================
        if (pressingHeight === 'high' || ['more', 'much-more'].includes(pressingTrigger) || defTransition === 'counter-press') {
            recommendations.push('Pressing/Contre-press requis : Endurance 14+, Volume de jeu 14+, Travail d\'équipe 13+ sur les pressseurs');
        }
        if (['higher', 'much-higher'].includes(defLine)) {
            recommendations.push('Ligne défensive haute requise : Vitesse DC 12+, Anticipation DC 13+');
        }
        if (counterVal === 'yes' || ['direct', 'much-more-direct'].includes(passingStyleVal)) {
            recommendations.push('Jeu direct / Contre-attaque : Vitesse attaquants 15+, Accélération 14+');
        }
        if (['shorter', 'much-shorter'].includes(passingStyleVal)) {
            recommendations.push('Passes courtes / Possession : Passes défenseurs 13+, Sang-froid 13+');
        }
        const creativeVal = getInstruction('creative-freedom');
        if (creativeVal === 'expressive') {
            recommendations.push('Liberté d\'expression requise : Inspiration 14+, Dribbles 14+, Vision du jeu 14+');
        }
        const longShotsVal = getInstruction('long-shots');
        if (longShotsVal === 'encourage') {
            recommendations.push('Tirs de loin : Tirs de loin 15+ recommandé');
        }

        // ==========================================
        // FM26 — Détection de conflits d'instructions
        // ==========================================
        // Conflit 1 : Pressing haut + Ligne défensive basse → espace entre blocs
        if (pressingHeight === 'high' && ['lower', 'much-lower'].includes(defLine)) {
            weaknesses.push('CONFLIT :Pressing haut + Ligne défensive basse → espace vide entre blocs exploitable');
        }

        // Conflit 2 : Passes directes + Jouer le ballon en surface → instructions opposées
        if (['direct', 'much-more-direct'].includes(passingStyleVal) && crossingPatVal === 'work-ball') {
            weaknesses.push('CONFLIT :Passes directes + "Jouer le ballon en surface" → consignes contradictoires');
        }

        // Conflit 3 : Contre-pressing + Bloc bas → philosophies opposées
        if (defTransition === 'counter-press' && pressingHeight === 'low') {
            weaknesses.push('CONFLIT :Contre-pressing + Bloc bas → impossible de récupérer haut en restant compact');
        }

        // Conflit 4 : Gérer le pressing (garder le ballon) + Dégagements longs → stratégie ignorée
        if (presStratVal === 'manage' && goalKicksVal === 'long') {
            weaknesses.push('CONFLIT :"Gérer le pressing" + Sorties longues → le gardien casse la construction courte');
        }

        // Conflit 5 : Pressing haut fréquent mais déclencheur rare → pressing inefficace
        if (pressingHeight === 'high' && ['less', 'much-less'].includes(pressingTrigger)) {
            weaknesses.push('CONFLIT :Pressing haut activé mais déclencheur rare → bloc haut sans press réel');
        }

        // Conflit 6 : Contre-attaque + Tempo lent → transitions lentes
        if (counterVal === 'yes' && ['slower', 'much-slower'].includes(tempoVal)) {
            weaknesses.push('CONFLIT :Contre-attaque activée + Tempo lent → transitions offensives trop lentes');
        }

        // Conflit 7 : Ligne très haute + Ligne de pressing basse → défense incohérente
        if (['higher', 'much-higher'].includes(defLine) && pressingHeight === 'low') {
            weaknesses.push('CONFLIT :Ligne défensive haute + Pressing bas → défense avancée sans pressing = nombreuses occasions derrière');
        }

        // Render results
        const strengthsList = document.getElementById('strengths-list');
        const weaknessesList = document.getElementById('weaknesses-list');
        const recommendationsList = document.getElementById('recommendations-list');
        const countersGrid = document.getElementById('counters-grid');
        
        strengthsList.innerHTML = strengths.length 
            ? strengths.map(s => `<li>${s}</li>`).join('')
            : '<li class="placeholder">Aucun point fort détecté</li>';
            
        weaknessesList.innerHTML = weaknesses.length
            ? weaknesses.map(w => `<li>${w}</li>`).join('')
            : '<li class="placeholder">Aucun point faible détecté</li>';
            
        recommendationsList.innerHTML = recommendations.length
            ? recommendations.map(r => `<li>${r}</li>`).join('')
            : '<li class="placeholder">Aucune recommandation</li>';
        
        // Counter formations
        const counterFormations = counters[this.formationIP] || [];
        countersGrid.innerHTML = counterFormations.length
            ? counterFormations.map(f => `<span class="counter-formation">${f}</span>`).join('')
            : '<p class="placeholder">Aucune contre-formation suggérée</p>';

        this.renderIndividualAnalysisList();

        // FM26 Dual Formation Analysis
        this.analyzeDualFormation();

        // DNA Tactique
        this.analyzeDNA(getInstruction);

        // 3 Moments
        this.analyzeTransitionMoments(getInstruction);

        // Completeness score
        this.renderCompletenessScore(getInstruction);
    }

    analyzeIndividualInstructions(strengths, weaknesses, recommendations) {
        const modified = this.getAllModifiedInstructions();
        const countBy = (instructionId, value) => modified.filter(item => item.instructionId === instructionId && item.value === value).length;

        const forwardRunsMore = countBy('pi-forward-runs', 'more');
        const runFrequencyMore = countBy('pi-run-frequency', 'more');
        const holdBallYes = countBy('pi-hold-ball', 'yes');
        const pressingMore = countBy('pi-pressing', 'more');
        const passingDirect = countBy('pi-passing-style', 'direct');

        if (forwardRunsMore >= 3) {
            weaknesses.push(`${forwardRunsMore} joueurs ont des courses vers l'avant sur Plus - risque d'espace derrière.`);
        }

        if (runFrequencyMore >= 4) {
            strengths.push(`${runFrequencyMore} joueurs attaquent activement la profondeur.`);
            weaknesses.push('Multiplication des courses offensives - attention à la structure de couverture en transition.');
        }

        if (holdBallYes === 0) {
            recommendations.push('Aucun joueur ne conserve la balle - manque potentiel de point d\'appui entre les lignes.');
        } else if (holdBallYes >= 2) {
            strengths.push(`${holdBallYes} joueurs offrent un point d'appui dos au jeu.`);
        }

        if (pressingMore >= 5) {
            strengths.push(`${pressingMore} joueurs avec pressing individuel élevé - récupération agressive.`);
            weaknesses.push('Pressing individuel massif - risque de fatigue et de fautes en fin de match.');
        }

        if (passingDirect >= 4) {
            strengths.push('Consignes individuelles de passes directes fréquentes - transitions rapides favorisées.');
        }

        if (modified.length === 0) {
            recommendations.push('Aucune consigne individuelle modifiée : vous pouvez spécialiser certains profils pour créer des avantages ciblés.');
        }
    }

    renderIndividualAnalysisList() {
        const list = document.getElementById('individual-analysis-list');
        if (!list) return;

        const modified = this.getAllModifiedInstructions();
        if (modified.length === 0) {
            list.innerHTML = '<li class="placeholder">Aucune consigne individuelle modifiée détectée.</li>';
            return;
        }

        const grouped = {};
        modified.forEach(item => {
            if (!grouped[item.instructionId]) grouped[item.instructionId] = [];
            grouped[item.instructionId].push(item);
        });

        const lines = Object.entries(grouped).map(([instructionId, entries]) => {
            const definition = this.getInstructionDefinitionById(instructionId);
            const name = definition ? definition.name : instructionId;
            return `<li>${entries.length} joueur(s) modifié(s) sur <strong>${escapeHtml(name)}</strong></li>`;
        });

        list.innerHTML = lines.join('');
    }
    
    analyzeDNA(getInstruction) {
        const container = document.getElementById('dna-analysis-content');
        if (!container) return;

        const pressingHeight = getInstruction('pressing-height');
        const pressingTrigger = getInstruction('pressing-trigger');
        const defLine = getInstruction('defensive-line');
        const passingStyle = getInstruction('passing-style');
        const tempo = getInstruction('tempo');
        const width = getInstruction('width-attack');
        const defTrans = getInstruction('defensive-transition');
        const offTrans = getInstruction('counter-attack');
        const creativity = getInstruction('creative-freedom');

        // Score chaque identité
        const scores = {
            pressing: 0,
            possession: 0,
            counter: 0,
            hybrid: 0
        };

        if (pressingHeight === 'high') scores.pressing += 3;
        if (['more', 'much-more'].includes(pressingTrigger)) scores.pressing += 2;
        if (defTrans === 'counter-press') scores.pressing += 2;
        if (['higher', 'much-higher'].includes(defLine)) scores.pressing += 1;

        if (['shorter', 'much-shorter'].includes(passingStyle)) scores.possession += 3;
        if (['slower', 'much-slower'].includes(tempo)) scores.possession += 2;
        if (['narrow', 'much-narrow'].includes(width)) scores.possession += 1;
        if (creativity === 'expressive') scores.possession += 1;

        if (offTrans === 'yes') scores.counter += 3;
        if (['higher', 'much-higher'].includes(tempo)) scores.counter += 2;
        if (['direct', 'much-more-direct'].includes(passingStyle)) scores.counter += 2;
        if (pressingHeight === 'low') scores.counter += 1;

        // Déterminer le DNA dominant
        const maxScore = Math.max(...Object.values(scores));
        const dominant = Object.entries(scores).find(([, v]) => v === maxScore)?.[0] || 'hybrid';

        const dnaProfiles = {
            pressing: {
                label: '<i class="bi bi-lightning-charge-fill"></i> Pressing Évangéliste',
                color: '#e63946',
                desc: 'Ton équipe presse haut et fort. La récupération dans le camp adverse est ta priorité. Exige endurance, vitesse de réaction et coordination collective.',
                requires: 'End 14+ sur les presseurs · Vol 14+ · Trav 13+ · Vitesse 13+',
                planB: 'Plan B : Réduis le LOE + Ligne défensive sur -1 cran à l\'extérieur pour gérer l\'énergie.',
                planC: 'Plan C : Active contre-attaque + tempo élevé pour exploiter les erreurs provoquées.'
            },
            possession: {
                label: '<i class="bi bi-circle-fill"></i> Contrôle &amp; Possession',
                color: '#2ecc71',
                desc: 'Tu contrôles le jeu avec le ballon. Tes joueurs recyclent proprement et progressent par la patience. Idéal pour des équipes avec forte qualité technique.',
                requires: 'Passes 13+ sur DC · 1ère touche 13+ · Sang-froid 13+ · Vision 13+',
                planB: 'Plan B : Passe en directness standard + contre-attaque pour varier les menaces.',
                planC: 'Plan C : Largeur élargie sur un flanc pour créer une solution longue directe.'
            },
            counter: {
                label: '<i class="bi bi-arrow-right-circle-fill"></i> Contre-Assassin',
                color: '#f4a261',
                desc: 'Tu invites l\'adversaire et tu frappes en transition. Exige des attaquants rapides et un bloc défensif organisé derrière la ligne.',
                requires: 'Vitesse attaquants 15+ · Accélération 15+ · Anticipation 13+ sur DC',
                planB: 'Plan B : Passe en regroupement + contre-attaque pour une version plus prudente.',
                planC: 'Plan C : Remonte le bloc médian pour mieux conserver si tu mènes au score.'
            },
            hybrid: {
                label: '<i class="bi bi-sliders"></i> Pragmatiste Hybride',
                color: '#9b5de5',
                desc: 'Tu t\'adaptes selon l\'adversaire. Pas d\'identité rigide. Ça peut être une force ou une absence d\'identité — à toi de le décider.',
                requires: 'Polyvalence des joueurs · Bonne lecture du jeu du manager',
                planB: 'Plan B : Oriente vers ton style secondaire selon l\'adversaire.',
                planC: 'Plan C : Consignes individuelles pour personnaliser rôle par rôle.'
            }
        };

        const profile = dnaProfiles[dominant];

        // Barre de profil
        const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;
        const barsHtml = Object.entries(scores).map(([key, val]) => {
            const pct = Math.round((val / total) * 100);
            const labels = { pressing: '<i class="bi bi-lightning-charge"></i> Pressing', possession: '<i class="bi bi-circle"></i> Possession', counter: '<i class="bi bi-arrow-right-circle"></i> Contre', hybrid: '<i class="bi bi-sliders"></i> Hybride' };
            const colors = { pressing: '#e63946', possession: '#2ecc71', counter: '#f4a261', hybrid: '#9b5de5' };
            return `<div class="dna-bar-row">
                <span class="dna-bar-label">${labels[key]}</span>
                <div class="dna-bar-track">
                    <div class="dna-bar-fill" style="width:${pct}%;background:${colors[key]}"></div>
                </div>
                <span class="dna-bar-pct">${pct}%</span>
            </div>`;
        }).join('');

        container.innerHTML = `
            <div class="dna-result">
                <div class="dna-dominant" style="border-left-color:${profile.color}">
                    <div class="dna-dominant-label" style="color:${profile.color}">${profile.label}</div>
                    <p class="dna-dominant-desc">${escapeHtml(profile.desc)}</p>
                    <div class="dna-dominant-req"><strong>Attributs requis :</strong> ${escapeHtml(profile.requires)}</div>
                </div>
                <div class="dna-bars">${barsHtml}</div>
                <div class="dna-planbc">
                    <div class="dna-plan"><span class="dna-plan-label">Plan B</span> ${escapeHtml(profile.planB)}</div>
                    <div class="dna-plan"><span class="dna-plan-label">Plan C</span> ${escapeHtml(profile.planC)}</div>
                </div>
            </div>
        `;
    }

    renderCompletenessScore(getInstruction) {
        const container = document.getElementById('completeness-content');
        if (!container) return;

        const hasExplicitInstruction = (id) => Object.prototype.hasOwnProperty.call(this.instructions || {}, id);

        const checks = [
            {
                label: 'Nom de la tactique',
                ok: !!(this.tacticName && this.tacticName.trim() && this.tacticName !== 'Ma Tactique FM26'),
                hint: 'Donnez un nom unique à votre tactique'
            },
            {
                label: 'Formations IP/OOP différentes',
                ok: this.formationIP !== this.formationOOP,
                hint: 'Utilisez des formations distinctes en/hors possession pour le double bloc FM26'
            },
            {
                label: 'Rôles IP assignés',
                ok: Object.keys(this.playerRoles?.ip || {}).length >= 7,
                hint: 'Assignez les rôles FM26 à vos joueurs en possession'
            },
            {
                label: 'Rôles OOP assignés',
                ok: Object.keys(this.playerRoles?.oop || {}).length >= 7,
                hint: 'Assignez les rôles FM26 à vos joueurs hors possession'
            },
            {
                label: 'Style de jeu configuré',
                ok: hasExplicitInstruction('passing-style') || getInstruction('passing-style') !== 'standard',
                hint: 'Définissez votre style de passe'
            },
            {
                label: 'Pressing configuré',
                ok: hasExplicitInstruction('pressing-height') || hasExplicitInstruction('pressing-trigger')
                    || getInstruction('pressing-height') !== 'standard' || getInstruction('pressing-trigger') !== 'standard',
                hint: 'Configurez votre pressing (hauteur ou déclenchement)'
            },
            {
                label: 'Ligne défensive configurée',
                ok: hasExplicitInstruction('defensive-line') || getInstruction('defensive-line') !== 'standard',
                hint: 'Définissez votre ligne défensive'
            },
            {
                label: 'Mentalité de contre-attaque',
                ok: hasExplicitInstruction('counter-attack') || getInstruction('counter-attack') !== 'standard',
                hint: 'Configurez votre transition offensive'
            },
            {
                label: 'Consignes individuelles (≥3 joueurs)',
                ok: this.getAllModifiedInstructions().length >= 3,
                hint: 'Ajoutez des consignes individuelles à vos joueurs clés'
            }
        ];

        const done = checks.filter(c => c.ok).length;
        const total = checks.length;
        const pct = Math.round((done / total) * 100);

        const color = pct >= 80 ? '#4caf50' : pct >= 50 ? '#ff9800' : '#f44336';
        const label = pct >= 80 ? 'Complète' : pct >= 50 ? 'En cours' : 'Incomplète';

        container.innerHTML = `
            <div class="completeness-header">
                <div class="completeness-score-circle" style="--score-color:${color}">
                    <span class="completeness-pct">${pct}%</span>
                    <span class="completeness-label">${label}</span>
                </div>
                <div class="completeness-bar-wrap">
                    <div class="completeness-bar-track">
                        <div class="completeness-bar-fill" style="width:${pct}%;background:${color}"></div>
                    </div>
                    <span class="completeness-bar-count">${done} / ${total} critères remplis</span>
                </div>
            </div>
            <ul class="completeness-checklist">
                ${checks.map(c => `
                    <li class="completeness-item ${c.ok ? 'ok' : 'missing'}">
                        <span class="comp-icon">${c.ok ? '<i class="bi bi-check-circle-fill"></i>' : '<i class="bi bi-circle"></i>'}</span>
                        <span class="comp-text">${c.label}</span>
                        ${!c.ok ? `<span class="comp-hint">${c.hint}</span>` : ''}
                    </li>
                `).join('')}
            </ul>
        `;
    }

    analyzeTransitionMoments(getInstruction) {
        const container = document.getElementById('moments-analysis-content');
        if (!container) return;

        const defTrans = getInstruction('defensive-transition');
        const offTrans = getInstruction('counter-attack');
        const pressingHeight = getInstruction('pressing-height');
        const defLine = getInstruction('defensive-line');
        const pressingTrigger = getInstruction('pressing-trigger');

        // Moment 1 : Perte du ballon — défenseurs de repli
        const ipPositions = window.FM26Data.FORMATIONS[this.formationIP] || [];
        const deepRoles = Object.entries(this.playerRoles.ip)
            .filter(([idx]) => {
                const pos = ipPositions[idx];
                return pos && pos.y > 60; // joueurs très bas = repli naturel
            }).length;

        const moment1Score = deepRoles >= 3 ? 'ok' : deepRoles >= 2 ? 'warn' : 'bad';
        const moment1Tips = {
            ok: { icon: '<i class="bi bi-check-circle-fill"></i>', text: `${deepRoles} joueurs en position basse en IP — bonne couverture de repli.` },
            warn: { icon: '<i class="bi bi-exclamation-triangle-fill"></i>', text: `${deepRoles} joueurs en position basse en IP — risque sur les contre-attaques adverses.` },
            bad: { icon: '<i class="bi bi-x-circle-fill"></i>', text: `Seulement ${deepRoles} joueur(s) bas en IP — très vulnérable sur perte de balle.` }
        };

        // Moment 2 : Récupération du ballon — sorties offensives
        const oopPositions = window.FM26Data.FORMATIONS[this.formationOOP] || [];
        const highOopRoles = Object.entries(this.playerRoles.oop)
            .filter(([idx]) => {
                const pos = oopPositions[idx];
                return pos && pos.y < 35;
            }).length;

        const offTransLabel = offTrans === 'yes' ? '<i class="bi bi-lightning-charge"></i> Contre-attaque activée' : offTrans === 'hold' ? '<i class="bi bi-stop-circle"></i> Rester en place' : '<i class="bi bi-dash-circle"></i> Standard';
        const moment2Status = offTrans === 'yes' && highOopRoles >= 2 ? 'ok' :
                              offTrans === 'yes' && highOopRoles < 2 ? 'warn' : 'neutral';
        const moment2Tips = {
            ok: { icon: '<i class="bi bi-check-circle-fill"></i>', text: `Contre-attaque + ${highOopRoles} joueurs hauts en OOP — transition offensive efficace.` },
            warn: { icon: '<i class="bi bi-exclamation-triangle-fill"></i>', text: `Contre-attaque activée mais seulement ${highOopRoles} joueur(s) haut en OOP — peu de sorties disponibles.` },
            neutral: { icon: '<i class="bi bi-info-circle"></i>', text: `Contre-attaque standard — ${highOopRoles} joueur(s) haut en OOP pour les sorties de contre.` }
        };

        // Moment 3 : Installation dans le bloc
        const loePressing = pressingHeight === 'high' ? 'haut' : pressingHeight === 'low' ? 'bas' : 'médian';
        const linePos = ['higher', 'much-higher'].includes(defLine) ? 'haute' : ['lower', 'much-lower'].includes(defLine) ? 'basse' : 'standard';
        const coherence = (pressingHeight === 'high' && ['higher', 'much-higher'].includes(defLine)) ||
                          (pressingHeight === 'low' && ['lower', 'much-lower'].includes(defLine)) ||
                          pressingHeight === 'medium';
        const moment3Tips = coherence
            ? { icon: '<i class="bi bi-check-circle-fill"></i>', text: `LOE ${loePressing} + Ligne défensive ${linePos} — bloc cohérent, espace entre lignes minimal.` }
            : { icon: '<i class="bi bi-exclamation-triangle-fill"></i>', text: `LOE ${loePressing} + Ligne défensive ${linePos} — attention au no-man's land entre les lignes.` };

        const defTransLabel = defTrans === 'counter-press' ? '<i class="bi bi-lightning-charge"></i> Contre-pressing' :
                              defTrans === 'regroup' ? '<i class="bi bi-shield-check"></i> Regroupement' : '<i class="bi bi-dash-circle"></i> Standard';

        container.innerHTML = `
            <div class="moments-diag-grid">
                <div class="moment-diag ${moment1Score}">
                    <div class="moment-diag-num">1</div>
                    <h4>Perte du ballon</h4>
                    <div class="moment-diag-status">${moment1Tips[moment1Score].icon} ${escapeHtml(moment1Tips[moment1Score].text)}</div>
                    <div class="moment-diag-context">Transition défensive : <strong>${defTransLabel}</strong></div>
                </div>
                <div class="moment-diag ${moment2Status}">
                    <div class="moment-diag-num">2</div>
                    <h4>Récupération du ballon</h4>
                    <div class="moment-diag-status">${moment2Tips[moment2Status].icon} ${escapeHtml(moment2Tips[moment2Status].text)}</div>
                    <div class="moment-diag-context">Transition offensive : <strong>${escapeHtml(offTransLabel)}</strong></div>
                </div>
                <div class="moment-diag ${coherence ? 'ok' : 'warn'}">
                    <div class="moment-diag-num">3</div>
                    <h4>Installation dans le bloc</h4>
                    <div class="moment-diag-status">${moment3Tips.icon} ${escapeHtml(moment3Tips.text)}</div>
                    <div class="moment-diag-context">LOE : <strong>${loePressing}</strong> · Ligne : <strong>${linePos}</strong></div>
                </div>
            </div>
        `;
    }

    analyzeDualFormation() {
        const container = document.getElementById('dual-formation-analysis-content');
        
        // Analyze transition between IP and OOP
        const ipPositions = window.FM26Data.FORMATIONS[this.formationIP];
        const oopPositions = window.FM26Data.FORMATIONS[this.formationOOP];
        
        if (!ipPositions || !oopPositions) {
            container.innerHTML = '<p class="placeholder">Sélectionnez vos formations IP et OOP</p>';
            return;
        }
        
        // Count players per zone in each formation
        const ipZones = this.countZones(ipPositions);
        const oopZones = this.countZones(oopPositions);
        
        container.innerHTML = `
            <div class="transition-item">
                <h4><i class="bi bi-circle-fill" style="color:#2ecc71"></i> En Possession (${this.formationIP})</h4>
                <p>Défense: ${ipZones.defense} | Milieu: ${ipZones.midfield} | Attaque: ${ipZones.attack}</p>
            </div>
            <div class="transition-item">
                <h4><i class="bi bi-arrow-left-right"></i> Transition</h4>
                <p>${this.analyzeTransition(ipZones, oopZones)}</p>
            </div>
            <div class="transition-item">
                <h4><i class="bi bi-shield-check" style="color:#e74c3c"></i> Hors Possession (${this.formationOOP})</h4>
                <p>Défense: ${oopZones.defense} | Milieu: ${oopZones.midfield} | Attaque: ${oopZones.attack}</p>
            </div>
        `;
    }
    
    countZones(positions) {
        let defense = 0, midfield = 0, attack = 0;
        positions.forEach(pos => {
            if (pos.y > 60) defense++;
            else if (pos.y > 30) midfield++;
            else attack++;
        });
        return { defense, midfield, attack };
    }
    
    analyzeTransition(ip, oop) {
        const defChange = oop.defense - ip.defense;
        const attChange = ip.attack - oop.attack;
        
        if (defChange > 0 && attChange > 0) {
            return `+${defChange} joueurs reculent en défense, -${attChange} en attaque. Transition défensive solide.`;
        } else if (defChange === 0 && attChange === 0) {
            return 'Formation stable entre les phases. Peu de réajustements nécessaires.';
        } else {
            return 'Transition équilibrée entre les deux phases de jeu.';
        }
    }
    
    // ==========================================
    // FM26 Visualizer
    // ==========================================
    switchVisualizerView(view) {
        document.querySelectorAll('.visualizer-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        const singleView = document.getElementById('visualizer-single');
        const compareView = document.getElementById('visualizer-compare');

        if (view === 'compare') {
            singleView.style.display = 'none';
            compareView.style.display = 'grid';
            this.updateCompareVisualizer();
            this.populateTacticCompareSelectors();
        } else {
            singleView.style.display = '';
            compareView.style.display = 'none';
            this.updateVisualizer(view);
        }

        this.renderVisualExportCard();
    }

    updateVisualizer(view = 'ip') {
        const formation = view === 'oop' ? this.formationOOP : this.formationIP;
        const positions = window.FM26Data.FORMATIONS[formation];

        if (!positions) return;

        const defensiveZone = document.getElementById('defensive-zone-players');
        const middleZone = document.getElementById('middle-zone-players');
        const attackingZone = document.getElementById('attacking-zone-players');

        let defensive = [], middle = [], attacking = [];

        positions.forEach(pos => {
            const playerHtml = `<div class="zone-player ${pos.type}">${pos.pos}</div>`;
            if (pos.y > 60) {
                defensive.push(playerHtml);
            } else if (pos.y > 30) {
                middle.push(playerHtml);
            } else {
                attacking.push(playerHtml);
            }
        });

        defensiveZone.innerHTML = defensive.join('');
        middleZone.innerHTML = middle.join('');
        attackingZone.innerHTML = attacking.join('');

        // Update stats
        document.getElementById('stat-defensive').textContent = defensive.length;
        document.getElementById('stat-middle').textContent = middle.length;
        document.getElementById('stat-attacking').textContent = attacking.length;

        // Shape analysis
        this.analyzeShape(defensive.length, middle.length, attacking.length, formation);
    }

    updateCompareVisualizer() {
        const fillZones = (formation, defId, midId, attId) => {
            const positions = window.FM26Data.FORMATIONS[formation];
            if (!positions) return { def: 0, mid: 0, att: 0 };

            let defensive = [], middle = [], attacking = [];
            positions.forEach(pos => {
                const playerHtml = `<div class="zone-player ${pos.type}">${pos.pos}</div>`;
                if (pos.y > 60) defensive.push(playerHtml);
                else if (pos.y > 30) middle.push(playerHtml);
                else attacking.push(playerHtml);
            });

            document.getElementById(defId).innerHTML = defensive.join('');
            document.getElementById(midId).innerHTML = middle.join('');
            document.getElementById(attId).innerHTML = attacking.join('');

            return { def: defensive.length, mid: middle.length, att: attacking.length };
        };

        const ipStats = fillZones(this.formationIP, 'compare-ip-defensive', 'compare-ip-middle', 'compare-ip-attacking');
        const oopStats = fillZones(this.formationOOP, 'compare-oop-defensive', 'compare-oop-middle', 'compare-oop-attacking');

        // Update stats with combined info
        document.getElementById('stat-defensive').textContent = `${ipStats.def} → ${oopStats.def}`;
        document.getElementById('stat-middle').textContent = `${ipStats.mid} → ${oopStats.mid}`;
        document.getElementById('stat-attacking').textContent = `${ipStats.att} → ${oopStats.att}`;

        // Shape analysis for compare
        const content = document.getElementById('shape-content');
        let analysis = `<strong>IP (${this.formationIP}):</strong> ${ipStats.def}-${ipStats.mid}-${ipStats.att}<br>`;
        analysis += `<strong>OOP (${this.formationOOP}):</strong> ${oopStats.def}-${oopStats.mid}-${oopStats.att}<br><br>`;

        const defDiff = oopStats.def - ipStats.def;
        const attDiff = ipStats.att - oopStats.att;
        if (defDiff > 0) {
            analysis += `<i class="bi bi-shield-check"></i> <strong>+${defDiff} joueur(s)</strong> reculent en defense lors de la perte de balle. `;
        }
        if (attDiff > 0) {
            analysis += `<i class="bi bi-arrow-up-right-circle"></i> <strong>${attDiff} joueur(s)</strong> de moins en attaque hors possession. `;
        }
        if (defDiff === 0 && attDiff === 0) {
            analysis += '<i class="bi bi-dash-circle"></i> Formation stable entre les phases. Peu de reorganisation necessaire.';
        }
        content.innerHTML = analysis;
    }

    populateTacticCompareSelectors() {
        const selectA = document.getElementById('compare-tactic-a');
        const selectB = document.getElementById('compare-tactic-b');
        if (!selectA || !selectB) return;

        const saved = JSON.parse(localStorage.getItem('fm26_tactics') || '{}');
        const entries = Object.keys(saved);

        const options = ['<option value="__current__">Tactique actuelle (en cours)</option>']
            .concat(entries.map(name => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`));

        selectA.innerHTML = options.join('');
        selectB.innerHTML = options.join('');

        if (entries.length > 0) {
            selectA.value = '__current__';
            selectB.value = entries[0];
        } else {
            selectA.value = '__current__';
            selectB.value = '__current__';
        }
    }

    getComparableTactic(selection) {
        if (selection === '__current__') {
            return {
                name: this.tacticName || 'Tactique actuelle',
                formationIP: this.formationIP,
                formationOOP: this.formationOOP,
                mentality: this.mentality,
                playerRoles: this.playerRoles,
                playerInstructions: this.playerInstructions,
                instructions: this.instructions
            };
        }

        const saved = JSON.parse(localStorage.getItem('fm26_tactics') || '{}');
        return saved[selection] || null;
    }

    formatRoleListForComparison(tactic, phaseKey) {
        const formation = phaseKey === 'ip' ? tactic.formationIP : tactic.formationOOP;
        const positions = window.FM26Data.FORMATIONS[formation] || [];
        const roles = tactic.playerRoles && tactic.playerRoles[phaseKey] ? tactic.playerRoles[phaseKey] : {};

        return positions.map((pos, index) => {
            const fallback = phaseKey === 'ip'
                ? this.getIPRolesForSlot(pos.pos, pos.x)
                : this.getOOPRolesForSlot(pos.pos, pos.x);
            const roleName = roles[index] || (fallback[0] ? fallback[0].name : pos.pos);
            return `${pos.pos}: ${roleName}`;
        });
    }

    runTacticComparison() {
        const selectA = document.getElementById('compare-tactic-a');
        const selectB = document.getElementById('compare-tactic-b');
        const results = document.getElementById('tactic-compare-results');
        if (!selectA || !selectB || !results) return;

        const tacticA = this.getComparableTactic(selectA.value);
        const tacticB = this.getComparableTactic(selectB.value);

        if (!tacticA || !tacticB) {
            results.innerHTML = '<p class="placeholder">Impossible de charger les deux tactiques.</p>';
            return;
        }

        const insA = tacticA.instructions || {};
        const insB = tacticB.instructions || {};
        const instructionKeys = Array.from(new Set([...Object.keys(insA), ...Object.keys(insB)]));
        const changedInstructions = instructionKeys.filter(key => (insA[key] || 'standard') !== (insB[key] || 'standard'));

        const rolesA = this.formatRoleListForComparison(tacticA, 'ip').concat(this.formatRoleListForComparison(tacticA, 'oop'));
        const rolesB = this.formatRoleListForComparison(tacticB, 'ip').concat(this.formatRoleListForComparison(tacticB, 'oop'));
        let roleDifferences = 0;
        const maxLen = Math.max(rolesA.length, rolesB.length);
        for (let i = 0; i < maxLen; i++) {
            if ((rolesA[i] || '') !== (rolesB[i] || '')) roleDifferences++;
        }

        const modifiedA = Object.keys(tacticA.playerInstructions || {}).reduce((sum, key) => sum + Object.keys(tacticA.playerInstructions[key] || {}).length, 0);
        const modifiedB = Object.keys(tacticB.playerInstructions || {}).reduce((sum, key) => sum + Object.keys(tacticB.playerInstructions[key] || {}).length, 0);

        const mentalityA = typeof tacticA.mentality === 'number'
            ? window.FM26Data.MENTALITY_LABELS[tacticA.mentality]
            : (tacticA.mentality || 'Équilibré');
        const mentalityB = typeof tacticB.mentality === 'number'
            ? window.FM26Data.MENTALITY_LABELS[tacticB.mentality]
            : (tacticB.mentality || 'Équilibré');

        results.innerHTML = `
            <div class="tactic-compare-grid">
                <div class="compare-card">
                    <h4>${escapeHtml(tacticA.name || 'Tactique A')}</h4>
                    <p><strong>IP:</strong> ${escapeHtml(tacticA.formationIP || '-')}</p>
                    <p><strong>OOP:</strong> ${escapeHtml(tacticA.formationOOP || '-')}</p>
                    <p><strong>Mentalité:</strong> ${escapeHtml(mentalityA || '-')}</p>
                    <p><strong>Consignes individuelles:</strong> ${modifiedA}</p>
                </div>
                <div class="compare-card">
                    <h4>${escapeHtml(tacticB.name || 'Tactique B')}</h4>
                    <p><strong>IP:</strong> ${escapeHtml(tacticB.formationIP || '-')}</p>
                    <p><strong>OOP:</strong> ${escapeHtml(tacticB.formationOOP || '-')}</p>
                    <p><strong>Mentalité:</strong> ${escapeHtml(mentalityB || '-')}</p>
                    <p><strong>Consignes individuelles:</strong> ${modifiedB}</p>
                </div>
            </div>
            <div class="compare-summary">
                <p><strong>Écarts de consignes d'équipe:</strong> ${changedInstructions.length}</p>
                <p><strong>Écarts de rôles (IP+OOP):</strong> ${roleDifferences}</p>
            </div>
            <div class="compare-diff-list">
                <h5>Consignes d'équipe différentes</h5>
                ${changedInstructions.length
                    ? `<ul>${changedInstructions.slice(0, 12).map(key => `<li>${escapeHtml(key)}: <strong>${escapeHtml(insA[key] || 'standard')}</strong> vs <strong>${escapeHtml(insB[key] || 'standard')}</strong></li>`).join('')}</ul>`
                    : '<p class="placeholder">Aucune différence détectée.</p>'}
            </div>
        `;
    }

    getCurrentInstructionValue(instructionId) {
        if (this.instructions[instructionId]) return this.instructions[instructionId];
        const el = document.getElementById(instructionId);
        return el ? el.value : null;
    }

    renderVisualExportCard() {
        const card = document.getElementById('visual-export-card');
        if (!card) return;

        const title = document.getElementById('visual-export-title');
        const meta = document.getElementById('visual-export-meta');
        const rolesIP = document.getElementById('visual-export-roles-ip');
        const rolesOOP = document.getElementById('visual-export-roles-oop');
        const teamInstr = document.getElementById('visual-export-team-instr');
        const playerInstr = document.getElementById('visual-export-player-instr');

        if (!title || !meta || !rolesIP || !rolesOOP || !teamInstr || !playerInstr) return;

        title.textContent = this.tacticName || 'Résumé tactique';
        meta.innerHTML = `
            <span>IP: ${escapeHtml(this.formationIP)}</span>
            <span>OOP: ${escapeHtml(this.formationOOP)}</span>
            <span>Mentalité: ${escapeHtml(window.FM26Data.MENTALITY_LABELS[this.mentality] || 'Équilibré')}</span>
        `;

        const buildRoleList = (phase) => {
            const formation = phase === 'ip' ? this.formationIP : this.formationOOP;
            const positions = window.FM26Data.FORMATIONS[formation] || [];
            return positions.map((pos, index) => {
                const defaults = phase === 'ip'
                    ? this.getIPRolesForSlot(pos.pos, pos.x)
                    : this.getOOPRolesForSlot(pos.pos, pos.x);
                const defaultRole = defaults[0] ? defaults[0].name : pos.pos;
                const role = phase === 'ip'
                    ? this.playerRoles.ip[index] || defaultRole
                    : this.playerRoles.oop[index] || defaultRole;
                return `<li>${pos.pos}: ${escapeHtml(this.shortenRoleName(role))}</li>`;
            }).join('');
        };

        rolesIP.innerHTML = `<ul>${buildRoleList('ip')}</ul>`;
        rolesOOP.innerHTML = `<ul>${buildRoleList('oop')}</ul>`;

        const keyInstructions = ['passing-style', 'tempo', 'width-attack', 'pressing-height', 'defensive-line', 'counter-attack'];
        teamInstr.innerHTML = `<ul>${keyInstructions.map(id => {
            const value = this.getCurrentInstructionValue(id) || 'standard';
            return `<li>${escapeHtml(id)}: ${escapeHtml(value)}</li>`;
        }).join('')}</ul>`;

        const modified = this.getAllModifiedInstructions();
        if (!modified.length) {
            playerInstr.innerHTML = '<p class="placeholder">Aucune consigne individuelle modifiée.</p>';
        } else {
            playerInstr.innerHTML = `<ul>${modified.slice(0, 14).map(item => {
                const definition = this.getInstructionDefinitionById(item.instructionId);
                const name = definition ? definition.name : item.instructionId;
                return `<li>Joueur ${item.playerIdx + 1}: ${escapeHtml(name)} → ${escapeHtml(item.value)}</li>`;
            }).join('')}</ul>`;
        }
    }

    async exportVisualSummary(format) {
        const card = document.getElementById('visual-export-card');
        if (!card) return;

        this.renderVisualExportCard();

        if (typeof html2canvas !== 'function') {
            this.showNotification('Bibliothèque de capture indisponible', 'error');
            return;
        }

        try {
            const canvas = await html2canvas(card, {
                backgroundColor: '#12121a',
                scale: 2
            });
            const imageData = canvas.toDataURL('image/png');

            if (format === 'image') {
                const link = document.createElement('a');
                link.href = imageData;
                link.download = `${(this.tacticName || 'tactique').replace(/\s+/g, '_')}_resume.png`;
                link.click();
                this.showNotification('Export PNG généré !');
                return;
            }

            if (window.jspdf && window.jspdf.jsPDF) {
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pageW = pdf.internal.pageSize.getWidth();
                const pageH = pdf.internal.pageSize.getHeight();
                const margin = 10;
                const imgW = pageW - margin * 2;
                const imgH = (canvas.height * imgW) / canvas.width;
                const finalH = Math.min(imgH, pageH - margin * 2);
                pdf.addImage(imageData, 'PNG', margin, margin, imgW, finalH);
                pdf.save(`${(this.tacticName || 'tactique').replace(/\s+/g, '_')}_resume.pdf`);
                this.showNotification('Export PDF généré !');
                return;
            }

            this.showNotification('Export PDF indisponible sur ce navigateur', 'error');
        } catch (error) {
            this.showNotification('Erreur lors de l\'export visuel', 'error');
        }
    }
    
    analyzeShape(def, mid, att, formation) {
        const content = document.getElementById('shape-content');
        let analysis = '';
        
        if (def >= 5) {
            analysis += '<i class="bi bi-shield-fill"></i> <strong>Formation très défensive</strong> - Bloc bas avec beaucoup de joueurs dans le tiers défensif. ';
        } else if (att >= 4) {
            analysis += '<i class="bi bi-arrow-up-right-circle-fill"></i> <strong>Formation très offensive</strong> - Beaucoup de joueurs dans le tiers offensif. ';
        } else if (mid >= 5) {
            analysis += '<i class="bi bi-dash-circle-fill"></i> <strong>Formation équilibrée</strong> - Concentration au milieu de terrain. ';
        }

        if (formation.startsWith('3')) {
            analysis += 'La défense à 3 nécessite des pistons très actifs. ';
        } else if (formation.startsWith('5')) {
            analysis += 'La défense à 5 offre une grande solidité mais limite les options offensives. ';
        }

        analysis += `<br><br><i class="bi bi-bar-chart"></i> <strong>Ratio:</strong> ${def}-${mid}-${att} (Déf-Mil-Att)`;
        
        content.innerHTML = analysis;
    }
    
    // ==========================================
    // Save/Load/Export
    // ==========================================
    openSaveModal() {
        document.getElementById('save-name').value = this.tacticName;
        document.getElementById('save-modal').classList.add('active');
        this.renderSavedTactics();
    }
    
    closeSaveModal() {
        document.getElementById('save-modal').classList.remove('active');
    }
    
    renderSavedTactics() {
        const container = document.getElementById('saved-items');
        const saved = JSON.parse(localStorage.getItem('fm26_tactics') || '{}');
        
        if (Object.keys(saved).length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted);">Aucune tactique sauvegardée</p>';
            return;
        }
        
        container.innerHTML = Object.entries(saved).map(([name, _]) => `
            <div class="saved-item">
                <span class="saved-item-name">${escapeHtml(name)}</span>
                <div class="saved-item-actions">
                    <button onclick="app.deleteSavedTactic('${escapeHtml(name)}')" title="Supprimer"><i class="bi bi-trash3"></i></button>
                </div>
            </div>
        `).join('');
    }
    
    confirmSave() {
        const name = document.getElementById('save-name').value.trim();
        if (!name) {
            this.showNotification('Veuillez entrer un nom', 'error');
            return;
        }
        
        const tactic = {
            name,
            formationIP: this.formationIP,
            formationOOP: this.formationOOP,
            mentality: this.mentality,
            playerRoles: this.playerRoles,
            playerPositions: this.playerPositions,
            playerNames: this.playerNames,
            playerInstructions: this.playerInstructions,
            phasePlayerMap: this.phasePlayerMapOverride,
            instructions: this.instructions,
            checkboxes: this.checkboxes,
            savedAt: new Date().toISOString()
        };
        
        const saved = JSON.parse(localStorage.getItem('fm26_tactics') || '{}');
        saved[name] = tactic;
        localStorage.setItem('fm26_tactics', JSON.stringify(saved));
        
        this.tacticName = name;
        document.getElementById('tactic-name').value = name;
        
        this.closeSaveModal();
        this.showNotification('Tactique sauvegardée !');
    }
    
    deleteSavedTactic(name) {
        if (!confirm(`Supprimer "${name}" ?`)) return;
        
        const saved = JSON.parse(localStorage.getItem('fm26_tactics') || '{}');
        delete saved[name];
        localStorage.setItem('fm26_tactics', JSON.stringify(saved));
        
        this.renderSavedTactics();
        this.renderLoadTactics();
    }
    
    openLoadModal() {
        document.getElementById('load-modal').classList.add('active');
        this.renderLoadTactics();
    }
    
    closeLoadModal() {
        document.getElementById('load-modal').classList.remove('active');
    }
    
    renderLoadTactics() {
        const container = document.getElementById('load-tactics-list');
        const saved = JSON.parse(localStorage.getItem('fm26_tactics') || '{}');
        
        if (Object.keys(saved).length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">Aucune tactique sauvegardée</p>';
            return;
        }
        
        container.innerHTML = Object.entries(saved).map(([name, tactic]) => `
            <div class="load-item" onclick="app.loadTactic('${escapeHtml(name)}')">
                <div class="load-item-info">
                    <div class="load-item-name">${escapeHtml(name)}</div>
                    <div class="load-item-details">
                        IP: ${escapeHtml(tactic.formationIP)} | OOP: ${escapeHtml(tactic.formationOOP)} |
                        ${escapeHtml(window.FM26Data.MENTALITY_LABELS[tactic.mentality])}
                    </div>
                </div>
                <button class="load-item-delete" onclick="event.stopPropagation(); app.deleteSavedTactic('${escapeHtml(name)}')"><i class="bi bi-trash3"></i></button>
            </div>
        `).join('');
    }
    
    loadTactic(name) {
        const saved = JSON.parse(localStorage.getItem('fm26_tactics') || '{}');
        const tactic = saved[name];
        
        if (!tactic) return;
        
        this.tacticName = tactic.name;
        this.formationIP = tactic.formationIP;
        this.formationOOP = tactic.formationOOP;
        this.mentality = tactic.mentality;
        this.playerRoles = tactic.playerRoles || { ip: {}, oop: {} };
        this.playerPositions = tactic.playerPositions || { ip: {}, oop: {} };
        this.playerNames = tactic.playerNames || {};
        this.playerInstructions = tactic.playerInstructions || {};
        this.phasePlayerMapOverride = tactic.phasePlayerMap || null;
        this.instructions = tactic.instructions || {};
        this.checkboxes = tactic.checkboxes || {};
        this.invalidateInstructionMapCache();

        // Update UI
        document.getElementById('tactic-name').value = this.tacticName;
        document.getElementById('mentality').value = this.mentality;
        document.getElementById('formation-select').value = this.formationIP;
        this.updateMentalityLabel();

        // Apply instructions
        Object.entries(this.instructions).forEach(([key, value]) => {
            const el = document.getElementById(key);
            if (el) el.value = value;
        });

        // Apply checkboxes
        Object.entries(this.checkboxes).forEach(([key, value]) => {
            const el = document.getElementById(key);
            if (el) el.checked = value;
        });

        this.currentPhase = 'ip';
        this.renderFormation();
        this.closeLoadModal();
        this.showNotification(`Tactique "${name}" chargée !`);
    }
    
    loadFromStorage() {
        // Auto-load last saved state if exists
        const lastState = localStorage.getItem('fm26_last_state');
        if (lastState) {
            try {
                const state = JSON.parse(lastState);
                if (state.formationIP) this.formationIP = state.formationIP;
                if (state.formationOOP) this.formationOOP = state.formationOOP;
                if (state.mentality !== undefined) {
                    this.mentality = state.mentality;
                    document.getElementById('mentality').value = this.mentality;
                }
                if (state.tacticName) {
                    this.tacticName = state.tacticName;
                    document.getElementById('tactic-name').value = this.tacticName;
                }
                if (state.playerRoles) this.playerRoles = state.playerRoles;
                if (state.playerPositions) this.playerPositions = state.playerPositions;
                if (state.playerNames) this.playerNames = state.playerNames;
                if (state.playerInstructions) this.playerInstructions = state.playerInstructions;
                if (state.phasePlayerMap) this.phasePlayerMapOverride = state.phasePlayerMap;
                if (state.instructions) {
                    this.instructions = state.instructions;
                    Object.entries(this.instructions).forEach(([key, value]) => {
                        const el = document.getElementById(key);
                        if (el) el.value = value;
                    });
                }
                if (state.checkboxes) {
                    this.checkboxes = state.checkboxes;
                    Object.entries(this.checkboxes).forEach(([key, value]) => {
                        const el = document.getElementById(key);
                        if (el) el.checked = value;
                    });
                }
                document.getElementById('formation-select').value = this.formationIP;

                this.renderFormation();
                this.renderVisualExportCard();
            } catch (e) {
                // No previous state
            }
        }
    }
    
    exportTactic() {
        const tactic = {
            name: this.tacticName,
            version: 'FM26',
            formationIP: this.formationIP,
            formationOOP: this.formationOOP,
            mentality: window.FM26Data.MENTALITY_LABELS[this.mentality],
            playerRoles: this.playerRoles,
            playerNames: this.playerNames,
            playerInstructions: this.playerInstructions,
            phasePlayerMap: this.phasePlayerMapOverride,
            instructions: this.instructions,
            checkboxes: this.checkboxes,
            exportedAt: new Date().toISOString()
        };
        
        const blob = new Blob([JSON.stringify(tactic, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.tacticName.replace(/\s+/g, '_')}_FM26.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        this.showNotification('Tactique exportée !');
    }

    importTactic(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const tactic = JSON.parse(e.target.result);

                // Validate minimum required fields
                if (!tactic.formationIP || !tactic.formationOOP) {
                    this.showNotification('Fichier invalide : formations manquantes', 'error');
                    return;
                }

                // Apply imported tactic
                this.tacticName = tactic.name || 'Tactique Importée';
                this.formationIP = tactic.formationIP;
                this.formationOOP = tactic.formationOOP;

                // Handle mentality (could be label or number)
                if (typeof tactic.mentality === 'number') {
                    this.mentality = tactic.mentality;
                } else if (typeof tactic.mentality === 'string') {
                    const idx = window.FM26Data.MENTALITY_LABELS.indexOf(tactic.mentality);
                    this.mentality = idx >= 0 ? idx : 3;
                }

                this.playerRoles = tactic.playerRoles || { ip: {}, oop: {} };
                this.playerPositions = tactic.playerPositions || { ip: {}, oop: {} };
                this.playerNames = tactic.playerNames || {};
                this.playerInstructions = tactic.playerInstructions || {};
                this.phasePlayerMapOverride = tactic.phasePlayerMap || null;
                this.instructions = tactic.instructions || {};
                this.checkboxes = tactic.checkboxes || {};
                this.invalidateInstructionMapCache();

                // Update UI
                document.getElementById('tactic-name').value = this.tacticName;
                document.getElementById('mentality').value = this.mentality;
                document.getElementById('formation-select').value = this.formationIP;
                this.updateMentalityLabel();

                // Apply instructions to DOM
                Object.entries(this.instructions).forEach(([key, value]) => {
                    const el = document.getElementById(key);
                    if (el) el.value = value;
                });

                // Apply checkboxes to DOM
                Object.entries(this.checkboxes).forEach(([key, value]) => {
                    const el = document.getElementById(key);
                    if (el) el.checked = value;
                });

                this.currentPhase = 'ip';
                document.querySelectorAll('.phase-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.phase === 'ip');
                });
                const indicator = document.getElementById('current-phase-indicator');
                indicator.textContent = 'EN POSSESSION';
                indicator.className = 'phase-indicator ip';
                document.getElementById('formation-phase-title').textContent = 'Formation En Possession';

                this.renderFormation();
                this.renderVisualExportCard();
                this.showNotification(`Tactique "${escapeHtml(this.tacticName)}" importée !`);
            } catch (err) {
                this.showNotification('Erreur : fichier JSON invalide', 'error');
            }
        };
        reader.readAsText(file);

        // Reset file input so same file can be imported again
        event.target.value = '';
    }
    
    // ==========================================
    // ==========================================
    // Training Plan Generator
    // ==========================================

    // Mapping: FM26 training focus categories (from the in-game list)
    // Each entry: { id, label, attrs } where attrs are the player stat keys that benefit
    getTrainingCategories() {
        return [
            { id: 'coups-francs',       label: 'Coups francs',              attrs: ['tec', 'pas', 'fin'] },
            { id: 'corners',            label: 'Tirer les corners',          attrs: ['tec', 'pas'] },
            { id: 'penalties',          label: 'Pénalties',                  attrs: ['fin', 'comp', 'tec'] },
            { id: 'touches-longues',    label: 'Touches longues',            attrs: ['str', 'tec'] },
            { id: 'vivacite',           label: 'Vivacité',                   attrs: ['acc', 'pac'] },
            { id: 'agilite',            label: 'Agilité et équilibre',       attrs: ['agi', 'fir'] },
            { id: 'puissance',          label: 'Puissance',                  attrs: ['str', 'jmp'] },
            { id: 'endurance',          label: 'Endurance',                  attrs: ['sta', 'wor'] },
            { id: 'placement-def',      label: 'Placement défensif',         attrs: ['tac', 'dec', 'conc'] },
            { id: 'deplacements-off',   label: 'Déplacements offensifs',     attrs: ['ant', 'dec', 'vis'] },
            { id: 'tirs',               label: 'Tirs',                       attrs: ['fin', 'lon', 'tec'] },
            { id: 'passes',             label: 'Passes',                     attrs: ['pas', 'vis', 'tec'] },
            { id: 'trente-metres',      label: 'Trente derniers mètres',     attrs: ['fin', 'ant', 'dec'] },
            { id: 'centres',            label: 'Centres',                    attrs: ['tec', 'pas', 'cro'] },
            { id: 'controle',           label: 'Contrôle de balle',          attrs: ['fir', 'tec', 'dri'] },
            { id: 'jeu-aerien',         label: 'Jeu aérien',                 attrs: ['hea', 'jmp', 'str'] },
            // GK specific
            { id: 'reactions-gb',       label: 'Réactions GB',               attrs: ['ref', 'one'] },
            { id: 'tactique-gb',        label: 'Tactique GB',                attrs: ['cmd', 'dec'] },
            { id: 'technique-gb',       label: 'Technique GB',               attrs: ['han', 'ref', 'one'] },
            { id: 'couverture-gb',      label: 'Couverture GB',              attrs: ['cmd', 'acc', 'pac'] },
            { id: 'relances-longues',   label: 'Relances GB (longues)',      attrs: ['kic', 'str'] },
            { id: 'relances-courtes',   label: 'Relances GB (courtes)',      attrs: ['han', 'pas'] }
        ];
    }

    // For each FM26 role name, define the key attributes that matter in IP and OOP
    getRoleAttributeProfile(roleName) {
        // Returns { ipAttrs: [], oopAttrs: [], ipFocus: [], oopFocus: [] }
        // ipAttrs/oopAttrs: stat keys that must be high for this role
        // ipFocus/oopFocus: training category IDs recommended

        const profiles = {
            // ===== GARDIENS =====
            'Gardien De But': {
                ipAttrs: ['han', 'pas', 'fir', 'cmd'], oopAttrs: ['ref', 'one', 'cmd', 'conc'],
                ipFocus: ['relances-courtes', 'relances-longues', 'tactique-gb'],
                oopFocus: ['reactions-gb', 'technique-gb', 'couverture-gb']
            },
            'Gardien À L\'aise Au Pied': {
                ipAttrs: ['pas', 'han', 'cmd', 'vis', 'tec'], oopAttrs: ['ref', 'one', 'cmd'],
                ipFocus: ['relances-courtes', 'relances-longues', 'tactique-gb'],
                oopFocus: ['reactions-gb', 'technique-gb', 'couverture-gb']
            },
            'Gardien Pragmatique': {
                ipAttrs: ['han', 'kic', 'cmd'], oopAttrs: ['ref', 'one', 'conc', 'cmd'],
                ipFocus: ['relances-longues', 'tactique-gb', 'couverture-gb'],
                oopFocus: ['reactions-gb', 'technique-gb', 'couverture-gb']
            },
            'Gardien Libéro': {
                ipAttrs: ['han', 'pas', 'acc', 'cmd'], oopAttrs: ['ref', 'one', 'cmd', 'acc'],
                ipFocus: ['relances-courtes', 'couverture-gb', 'tactique-gb'],
                oopFocus: ['couverture-gb', 'reactions-gb', 'technique-gb']
            },
            'Gardien Sur La Ligne': {
                ipAttrs: ['han', 'ref', 'conc'], oopAttrs: ['ref', 'one', 'conc', 'jmp'],
                ipFocus: ['technique-gb', 'reactions-gb', 'tactique-gb'],
                oopFocus: ['reactions-gb', 'technique-gb', 'couverture-gb']
            },

            // ===== DÉFENSEURS CENTRAUX (IP) =====
            'Défenseur Central': {
                ipAttrs: ['pas', 'fir', 'dec', 'str'], oopAttrs: ['mar', 'tac', 'hea', 'str'],
                ipFocus: ['passes', 'controle', 'placement-def'],
                oopFocus: ['placement-def', 'jeu-aerien', 'puissance']
            },
            'Défenseur Central Avancé': {
                ipAttrs: ['pas', 'vis', 'fir', 'acc', 'dec'], oopAttrs: ['mar', 'tac', 'dec'],
                ipFocus: ['passes', 'deplacements-off', 'controle'],
                oopFocus: ['placement-def', 'jeu-aerien', 'endurance']
            },
            'Défenseur Central À L\'aise Au Pied': {
                ipAttrs: ['pas', 'vis', 'tec', 'fir', 'dec'], oopAttrs: ['mar', 'tac', 'dec'],
                ipFocus: ['passes', 'controle', 'placement-def'],
                oopFocus: ['placement-def', 'jeu-aerien', 'endurance']
            },
            'Défenseur Central Strict': {
                ipAttrs: ['pas', 'fir', 'str'], oopAttrs: ['mar', 'tac', 'str', 'hea', 'conc'],
                ipFocus: ['passes', 'placement-def', 'puissance'],
                oopFocus: ['placement-def', 'jeu-aerien', 'puissance']
            },
            // ===== DÉFENSEURS CENTRAUX (OOP) =====
            'Défenseur Central Stoppeur': {
                ipAttrs: ['pas', 'fir', 'str'], oopAttrs: ['mar', 'tac', 'str', 'hea', 'ant'],
                ipFocus: ['passes', 'placement-def', 'puissance'],
                oopFocus: ['placement-def', 'jeu-aerien', 'puissance']
            },
            'Défenseur Central De Couverture': {
                ipAttrs: ['pas', 'fir', 'dec'], oopAttrs: ['mar', 'tac', 'conc', 'dec'],
                ipFocus: ['passes', 'placement-def', 'controle'],
                oopFocus: ['placement-def', 'jeu-aerien', 'endurance']
            },
            // Variantes Excentré (DC gauche/droite dans un 3DC)
            'Défenseur Central Excentré': {
                ipAttrs: ['pas', 'fir', 'acc', 'dec'], oopAttrs: ['mar', 'tac', 'acc', 'sta'],
                ipFocus: ['passes', 'placement-def', 'vivacite'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Défenseur Central Excentré Stoppeur': {
                ipAttrs: ['pas', 'fir', 'str'], oopAttrs: ['mar', 'tac', 'str', 'hea', 'ant'],
                ipFocus: ['passes', 'placement-def', 'puissance'],
                oopFocus: ['placement-def', 'jeu-aerien', 'puissance']
            },
            'Défenseur Central Excentré De Couverture': {
                ipAttrs: ['pas', 'fir', 'dec'], oopAttrs: ['mar', 'tac', 'conc', 'dec'],
                ipFocus: ['passes', 'placement-def', 'controle'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },

            // ===== ARRIÈRES LATÉRAUX / LATÉRAUX OFFENSIFS (IP) =====
            'Arrière Latéral': {
                ipAttrs: ['pas', 'tec', 'acc', 'fir'], oopAttrs: ['tac', 'mar', 'sta'],
                ipFocus: ['passes', 'vivacite', 'placement-def'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Latéral Offensif': {
                ipAttrs: ['acc', 'pac', 'pas', 'tec', 'sta'], oopAttrs: ['tac', 'mar', 'sta', 'wor'],
                ipFocus: ['vivacite', 'passes', 'endurance'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Latéral Offensif Intérieur': {
                ipAttrs: ['acc', 'pac', 'dri', 'tec', 'pas'], oopAttrs: ['tac', 'mar', 'sta', 'wor'],
                ipFocus: ['vivacite', 'controle', 'deplacements-off'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Arrière Latéral Intérieur': {
                ipAttrs: ['pas', 'dec', 'tec', 'fir'], oopAttrs: ['tac', 'mar', 'sta'],
                ipFocus: ['passes', 'controle', 'placement-def'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Latéral Offensif Meneur De Jeu': {
                ipAttrs: ['acc', 'pas', 'vis', 'tec', 'dri'], oopAttrs: ['tac', 'mar', 'sta', 'wor'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Latéral Offensif Avancé': {
                ipAttrs: ['acc', 'pac', 'dri', 'tec', 'sta'], oopAttrs: ['tac', 'mar', 'sta', 'wor'],
                ipFocus: ['vivacite', 'controle', 'endurance'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },

            // ===== LATÉRAUX OOP =====
            'Arrière Latéral De Pressing': {
                ipAttrs: ['pas', 'tec', 'acc'], oopAttrs: ['tac', 'mar', 'wor', 'ant', 'acc'],
                ipFocus: ['passes', 'vivacite', 'placement-def'],
                oopFocus: ['placement-def', 'endurance', 'vivacite']
            },
            'Arrière Latéral En Retrait': {
                ipAttrs: ['pas', 'fir', 'dec'], oopAttrs: ['tac', 'mar', 'conc', 'sta'],
                ipFocus: ['passes', 'placement-def', 'controle'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Latéral Offensif De Pressing': {
                ipAttrs: ['acc', 'pac', 'pas', 'tec'], oopAttrs: ['tac', 'wor', 'ant', 'acc', 'sta'],
                ipFocus: ['vivacite', 'passes', 'endurance'],
                oopFocus: ['endurance', 'placement-def', 'vivacite']
            },
            'Latéral Offensif En Retrait': {
                ipAttrs: ['pas', 'tec', 'fir'], oopAttrs: ['tac', 'mar', 'conc', 'sta'],
                ipFocus: ['passes', 'placement-def', 'controle'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },

            // ===== MILIEUX DÉFENSIFS (DM - IP) =====
            'Milieu Défensif': {
                ipAttrs: ['pas', 'vis', 'dec', 'fir'], oopAttrs: ['tac', 'mar', 'sta', 'conc'],
                ipFocus: ['passes', 'placement-def'],
                oopFocus: ['placement-def', 'endurance', 'puissance']
            },
            'Meneur De Jeu En Retrait': {
                ipAttrs: ['pas', 'vis', 'tec', 'dec', 'dri'], oopAttrs: ['wor', 'tac', 'sta'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Demi-Centre': {
                ipAttrs: ['pas', 'dec', 'vis', 'fir'], oopAttrs: ['tac', 'mar', 'dec', 'str'],
                ipFocus: ['passes', 'placement-def'],
                oopFocus: ['placement-def', 'puissance', 'jeu-aerien']
            },
            'Milieu Box To Box': {
                ipAttrs: ['pas', 'wor', 'sta', 'ant', 'fir'], oopAttrs: ['wor', 'sta', 'tac', 'ant'],
                ipFocus: ['endurance', 'deplacements-off', 'passes'],
                oopFocus: ['endurance', 'placement-def', 'vivacite']
            },
            'Meneur De Jeu Box-To-Box': {
                ipAttrs: ['pas', 'vis', 'tec', 'wor', 'sta'], oopAttrs: ['wor', 'sta', 'tac'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },

            // ===== MILIEUX DÉFENSIFS (DM - OOP) =====
            'Milieu Défensif En Retrait': {
                ipAttrs: ['pas', 'fir', 'dec'], oopAttrs: ['mar', 'tac', 'str', 'hea'],
                ipFocus: ['passes', 'placement-def', 'controle'],
                oopFocus: ['placement-def', 'puissance', 'jeu-aerien']
            },
            'Milieu Défensif De Couverture': {
                ipAttrs: ['dec', 'vis', 'pas'], oopAttrs: ['tac', 'mar', 'conc', 'dec'],
                ipFocus: ['passes', 'placement-def'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Milieu Défensif De Couverture Dans La Largeur': {
                ipAttrs: ['dec', 'pas', 'fir', 'acc'], oopAttrs: ['tac', 'mar', 'sta', 'acc'],
                ipFocus: ['passes', 'placement-def', 'vivacite'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },

            // ===== MILIEUX CENTRAUX (CM - IP) =====
            'Milieu Axial': {
                ipAttrs: ['pas', 'tec', 'fir', 'dec'], oopAttrs: ['wor', 'sta', 'tac'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Milieu Offensif': {
                ipAttrs: ['pas', 'vis', 'tec', 'fin', 'ant'], oopAttrs: ['wor', 'sta', 'tac'],
                ipFocus: ['passes', 'deplacements-off', 'trente-metres'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Meneur De Jeu Avancé': {
                ipAttrs: ['pas', 'vis', 'tec', 'dec', 'dri'], oopAttrs: ['wor', 'sta', 'tac'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Milieu De Couloir': {
                ipAttrs: ['acc', 'pac', 'ant', 'fin', 'dri'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'deplacements-off', 'trente-metres'],
                oopFocus: ['endurance', 'placement-def', 'vivacite']
            },
            'Meneur De Jeu Du Milieu': {
                ipAttrs: ['pas', 'vis', 'tec', 'dec', 'dri'], oopAttrs: ['wor', 'tac', 'sta'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },

            // ===== MILIEUX CENTRAUX (CM - OOP) =====
            'Milieu Axial De Pressing': {
                ipAttrs: ['pas', 'tec', 'fir'], oopAttrs: ['wor', 'sta', 'ant', 'acc', 'tac'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'vivacite']
            },
            'Milieu Axial De Couverture': {
                ipAttrs: ['pas', 'dec', 'fir'], oopAttrs: ['tac', 'mar', 'conc', 'sta'],
                ipFocus: ['passes', 'placement-def', 'controle'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },
            'Milieu Axial De Couverture Dans La Largeur': {
                ipAttrs: ['pas', 'dec', 'fir', 'acc'], oopAttrs: ['tac', 'mar', 'sta', 'acc'],
                ipFocus: ['passes', 'placement-def', 'vivacite'],
                oopFocus: ['placement-def', 'endurance', 'agilite']
            },

            // ===== MILIEUX OFFENSIFS (AM - IP) =====
            'Rôle Libre': {
                ipAttrs: ['pas', 'vis', 'tec', 'dri', 'dec'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['controle', 'deplacements-off', 'passes'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Deuxième Avant-Centre': {
                ipAttrs: ['fin', 'ant', 'pas', 'dec', 'vis'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['trente-metres', 'deplacements-off', 'passes'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },
            // ===== MILIEUX OFFENSIFS (AM - OOP) =====
            'Milieu Offensif De Couverture': {
                ipAttrs: ['pas', 'vis', 'tec'], oopAttrs: ['wor', 'sta', 'tac', 'conc'],
                ipFocus: ['passes', 'controle', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Milieu De Terrain Offensif De Contre-Attaque Axiale': {
                ipAttrs: ['acc', 'pac', 'ant', 'fin', 'fir'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'deplacements-off', 'trente-metres'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },
            'Milieu Offensif De Contre-Attaque De Couloir': {
                ipAttrs: ['acc', 'pac', 'dri', 'fin', 'ant'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'deplacements-off', 'trente-metres'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },

            // ===== MILIEUX LATÉRAUX (LM/RM - IP) =====
            'Milieu Latéral': {
                ipAttrs: ['pas', 'tec', 'acc', 'fir'], oopAttrs: ['wor', 'sta', 'tac'],
                ipFocus: ['passes', 'controle', 'vivacite'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Ailier Meneur De Jeu': {
                ipAttrs: ['pas', 'vis', 'tec', 'dri', 'acc'], oopAttrs: ['wor', 'sta', 'tac'],
                ipFocus: ['controle', 'passes', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Ailier Intérieur': {
                ipAttrs: ['acc', 'pac', 'dri', 'fin', 'tec'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'trente-metres', 'controle'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },

            // ===== MILIEUX LATÉRAUX (LM/RM - OOP) =====
            'Milieu Latéral De Couverture': {
                ipAttrs: ['pas', 'tec', 'fir'], oopAttrs: ['wor', 'sta', 'tac', 'conc'],
                ipFocus: ['passes', 'controle', 'placement-def'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Milieu Latéral De Contre-Attaque': {
                ipAttrs: ['acc', 'pac', 'ant', 'fir'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'deplacements-off', 'passes'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },

            // ===== AILIERS (LW/RW - IP) =====
            'Ailier': {
                ipAttrs: ['acc', 'pac', 'dri', 'tec', 'pas'], oopAttrs: ['wor', 'sta'],
                ipFocus: ['vivacite', 'centres', 'controle'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Attaquant Intérieur': {
                ipAttrs: ['acc', 'pac', 'dri', 'fin', 'tec'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'trente-metres', 'controle'],
                oopFocus: ['endurance', 'deplacements-off', 'placement-def']
            },
            'Attaquant Désaxé': {
                ipAttrs: ['acc', 'pac', 'fin', 'dri', 'ant'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'trente-metres', 'centres'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },

            // ===== AILIERS (LW/RW - OOP) =====
            'Ailier De Couverture': {
                ipAttrs: ['acc', 'pac', 'dri', 'tec'], oopAttrs: ['wor', 'sta', 'tac', 'conc'],
                ipFocus: ['vivacite', 'controle', 'passes'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Ailier Intérieur De Contre-Attaque': {
                ipAttrs: ['acc', 'pac', 'dri', 'fin'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'trente-metres', 'deplacements-off'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },
            'Ailier De Contre-Attaque': {
                ipAttrs: ['acc', 'pac', 'dri', 'ant'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'deplacements-off', 'controle'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },

            // ===== ATTAQUANTS (ST - IP) =====
            'Attaquant En Retrait': {
                ipAttrs: ['fin', 'ant', 'tec', 'dri', 'pas'], oopAttrs: ['wor', 'sta'],
                ipFocus: ['trente-metres', 'controle', 'deplacements-off'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Attaquant Central': {
                ipAttrs: ['fin', 'ant', 'acc', 'pac', 'fir'], oopAttrs: ['wor', 'sta'],
                ipFocus: ['trente-metres', 'deplacements-off', 'vivacite'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },
            'Attaquant Pivot': {
                ipAttrs: ['fin', 'ant', 'str', 'hea', 'fir'], oopAttrs: ['wor', 'sta', 'str'],
                ipFocus: ['trente-metres', 'puissance', 'jeu-aerien'],
                oopFocus: ['endurance', 'placement-def', 'puissance']
            },
            'Renard Des Surfaces': {
                ipAttrs: ['fin', 'ant', 'acc', 'pac', 'comp'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['trente-metres', 'deplacements-off', 'vivacite'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },
            'Attaquant De Couloir': {
                ipAttrs: ['acc', 'pac', 'fin', 'ant', 'dri'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['vivacite', 'trente-metres', 'deplacements-off'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            },
            'Faux Neuf': {
                ipAttrs: ['fin', 'ant', 'pas', 'vis', 'tec', 'dri'], oopAttrs: ['wor', 'sta'],
                ipFocus: ['trente-metres', 'controle', 'passes'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },

            // ===== ATTAQUANTS (ST - OOP) =====
            'Attaquant Central De Couverture': {
                ipAttrs: ['fin', 'ant', 'fir'], oopAttrs: ['wor', 'sta', 'tac', 'conc'],
                ipFocus: ['trente-metres', 'deplacements-off', 'controle'],
                oopFocus: ['endurance', 'placement-def', 'agilite']
            },
            'Avant-Centre Point D\'appui Axial': {
                ipAttrs: ['fin', 'ant', 'str', 'hea', 'fir'], oopAttrs: ['wor', 'sta', 'str'],
                ipFocus: ['trente-metres', 'puissance', 'jeu-aerien'],
                oopFocus: ['endurance', 'placement-def', 'puissance']
            },
            'Avant-Centre Point D\'appui Mobile': {
                ipAttrs: ['fin', 'ant', 'acc', 'pac', 'str'], oopAttrs: ['wor', 'sta', 'ant'],
                ipFocus: ['trente-metres', 'vivacite', 'deplacements-off'],
                oopFocus: ['endurance', 'vivacite', 'placement-def']
            }
        };

        const profile = profiles[roleName];
        if (profile) return profile;

        // Fallback par type de rôle si le nom exact n'est pas trouvé
        const r = (roleName || '').toLowerCase();
        if (r.includes('gardien') || r.includes('libéro')) return {
            ipAttrs: ['han', 'pas', 'cmd'], oopAttrs: ['ref', 'one', 'cmd'],
            ipFocus: ['relances-courtes', 'relances-longues', 'tactique-gb'],
            oopFocus: ['reactions-gb', 'technique-gb', 'couverture-gb']
        };
        if (r.includes('défenseur central') || r.includes('libéro')) return {
            ipAttrs: ['pas', 'fir', 'str'], oopAttrs: ['mar', 'tac', 'hea'],
            ipFocus: ['passes', 'placement-def'],
            oopFocus: ['placement-def', 'jeu-aerien', 'puissance']
        };
        if (r.includes('latéral') || r.includes('arrière')) return {
            ipAttrs: ['pas', 'acc', 'tec'], oopAttrs: ['tac', 'mar', 'sta'],
            ipFocus: ['passes', 'vivacite', 'placement-def'],
            oopFocus: ['placement-def', 'endurance', 'agilite']
        };
        if (r.includes('milieu défensif') || r.includes('demi-centre')) return {
            ipAttrs: ['pas', 'vis', 'dec'], oopAttrs: ['tac', 'mar', 'sta'],
            ipFocus: ['passes', 'placement-def'],
            oopFocus: ['placement-def', 'endurance', 'puissance']
        };
        if (r.includes('ailier') || r.includes('attaquant intérieur')) return {
            ipAttrs: ['acc', 'pac', 'dri', 'tec'], oopAttrs: ['wor', 'sta'],
            ipFocus: ['vivacite', 'controle'],
            oopFocus: ['endurance', 'placement-def']
        };
        if (r.includes('attaquant') || r.includes('avant-centre')) return {
            ipAttrs: ['fin', 'ant', 'acc'], oopAttrs: ['wor', 'sta'],
            ipFocus: ['trente-metres', 'deplacements-off'],
            oopFocus: ['endurance', 'vivacite']
        };
        return {
            ipAttrs: ['pas', 'tec', 'dec'], oopAttrs: ['wor', 'sta', 'tac'],
            ipFocus: ['passes', 'controle', 'deplacements-off'],
            oopFocus: ['endurance', 'placement-def', 'agilite']
        };
    }

    getAttrLabel(key) {
        const map = {
            acc: 'Accélération', pac: 'Vitesse', sta: 'Endurance', str: 'Puissance',
            agi: 'Agilité', ant: 'Anticipation', dec: 'Décisions', comp: 'Sang-froid',
            conc: 'Concentration', team: "Travail d'équipe", wor: 'Volume de jeu',
            vis: 'Vision du jeu', pas: 'Passes', tec: 'Technique', dri: 'Dribbles',
            fir: 'Contrôle de balle', fin: 'Finition', tac: 'Tacles', mar: 'Marquage',
            hea: 'Jeu de tête', jmp: 'Détente', one: '1v1', ref: 'Réflexes',
            han: 'Prises de balle', cmd: 'Sorties', kic: 'Dégagements', lon: 'Tir long'
        };
        return map[key] || key;
    }

    findWeakAttributes(player, attrKeys, threshold = 11) {
        // Returns attr keys where the player's value is below threshold
        return attrKeys.filter(k => {
            const v = player[k];
            return v !== undefined && v < threshold;
        });
    }

    getPriorityTrainingFocus(player, roleProfile, allCategories, threshold = 11) {
        // Identify weakest attributes vs role requirements and map to training categories
        const ipWeak = this.findWeakAttributes(player, roleProfile.ipAttrs, threshold);
        const oopWeak = this.findWeakAttributes(player, roleProfile.oopAttrs, threshold);
        const weakAll = [...new Set([...ipWeak, ...oopWeak])];

        // For each weak attr, find training categories that target it
        const priorityCats = new Set();
        weakAll.forEach(attr => {
            allCategories.forEach(cat => {
                if (cat.attrs.includes(attr)) priorityCats.add(cat.id);
            });
        });

        return {
            ipFocus: roleProfile.ipFocus,
            oopFocus: roleProfile.oopFocus,
            priorityFocus: [...priorityCats],
            weakAttrs: weakAll
        };
    }

    // Parse FM26 CSV position string (e.g. "D (DC)", "M/MO (DGC)", "BT (C)", "D/AL (G)")
    // Returns array of normalized FM26 internal codes like ['DC'], ['MD','MC'], ['ST'], etc.
    parseFM26Position(csvPosition) {
        if (!csvPosition) return [];
        const raw = csvPosition.trim();

        // Direct simple codes (exported without parentheses)
        const directMap = {
            'GB': ['GB'], 'GK': ['GB'],
            'DC': ['DC'], 'DL': ['DL'], 'DR': ['DR'],
            'MD': ['MD'], 'MC': ['MC'], 'MG': ['ML'], 'MD2': ['MR'],
            'BT': ['ST'], 'AT': ['ST']
        };
        if (directMap[raw.toUpperCase()]) return directMap[raw.toUpperCase()];

        // FM26 french format: "TYPE (SIDES)" e.g. "D (DC)", "M/MO (DGC)", "D/AL (G)"
        // TYPE part: D=Défenseur, M=Milieu, MO=Milieu offensif, AL=Ailier, BT=Buteur/Attaquant
        // SIDES part: D=Droit, G=Gauche, C=Centre, DC=Droit+Centre...
        const match = raw.match(/^([A-Z/]+)\s*\(([A-Z]+)\)$/i);
        if (!match) {
            // Try comma separated e.g. "DC, DL"
            return raw.split(',').map(s => s.trim().toUpperCase()).filter(Boolean);
        }

        const type = match[1].toUpperCase();   // D, M, MO, AL, BT, D/AL, M/MO etc
        const sides = match[2].toUpperCase();   // D, G, C, DC, GC, DGC, etc

        const hasD = sides.includes('D') && !sides.startsWith('DC');  // right
        const hasG = sides.includes('G');  // left
        const hasC = sides.includes('C') || sides === 'DC';  // center
        // Special: "DC" alone means centre (défenseur central), not D+C
        const isCenterOnly = sides === 'C' || sides === 'DC';
        const isRight = sides.includes('D') && sides !== 'DC';
        const isLeft  = sides.includes('G');
        const isCenter= sides.includes('C') || sides === 'DC';

        const codes = [];

        if (type === 'GB' || type === 'G') {
            codes.push('GB');
        } else if (type === 'D' || type === 'DEF') {
            // Defender
            if (sides === 'C' || sides === 'DC') codes.push('DC');
            else {
                if (isLeft) codes.push('DL');
                if (isRight) codes.push('DR');
                if (isCenter) codes.push('DC');
            }
        } else if (type === 'D/AL' || type === 'AL/D') {
            // Wing-back / fullback with attacking
            if (isLeft) codes.push('DL');
            if (isRight) codes.push('DR');
        } else if (type === 'MD' || type === 'MDC') {
            // Defensive mid
            if (isLeft) codes.push('MDL');
            if (isRight) codes.push('MDR');
            if (isCenter || sides === 'C') codes.push('MD');
            if (codes.length === 0) codes.push('MD');
        } else if (type === 'M') {
            // Central/wide mid
            if (isLeft) codes.push('ML');
            if (isRight) codes.push('MR');
            if (isCenter) codes.push('MC');
            if (codes.length === 0) codes.push('MC');
        } else if (type === 'MO' || type === 'M/MO') {
            // Attacking mid / wide attacking
            if (isLeft) { codes.push('AML'); codes.push('ML'); }
            if (isRight) { codes.push('AMR'); codes.push('MR'); }
            if (isCenter) codes.push('AMC');
            if (type === 'M/MO') {
                // Can also play deeper
                if (isLeft && !codes.includes('ML')) codes.push('ML');
                if (isRight && !codes.includes('MR')) codes.push('MR');
            }
            if (codes.length === 0) codes.push('MC');
        } else if (type === 'AL' || type === 'A') {
            // Winger
            if (isLeft) codes.push('AML');
            if (isRight) codes.push('AMR');
            if (codes.length === 0) codes.push('AML');
        } else if (type === 'BT' || type === 'AT' || type === 'AC') {
            codes.push('ST');
        }

        return codes.length > 0 ? codes : [raw.toUpperCase()];
    }

    // Map parsed FM26 codes to tactic slot roles + broad fallback
    inferRolesFromPosition(csvPosition, rolesIP, rolesOOP, ipPositions) {
        const codes = this.parseFM26Position(csvPosition);

        // Build map: internalCode → best { roleIP, roleOOP } from preset slots
        // Internal slot pos codes: GB, DC, DL, DR, MD, ML, MR, MC, AML, AMR, AMC, ST
        const slotMap = {};
        ipPositions.forEach((pos, idx) => {
            if (!pos) return;
            const code = (pos.pos || '').toUpperCase();
            if (!slotMap[code]) slotMap[code] = [];
            slotMap[code].push({ roleIP: rolesIP[idx] || '', roleOOP: rolesOOP[idx] || '' });
        });

        // Expand lookup aliases: FM26 internal slot codes may vary
        const codeAliases = {
            'DC': ['DC','CB'], 'DL': ['DL','LB','LWB'], 'DR': ['DR','RB','RWB'],
            'MD': ['MD','DM','MDL','MDR'], 'MDL': ['MD','DM'], 'MDR': ['MD','DM'],
            'ML': ['ML','LM'], 'MR': ['MR','RM'],
            'MC': ['MC','CM','MCA'], 'AMC': ['AMC','SS','MAM'],
            'AML': ['AML','LW'], 'AMR': ['AMR','RW'],
            'ST': ['ST','STC','BT','CF']
        };

        for (const code of codes) {
            const lookups = [code, ...(codeAliases[code] || [])];
            for (const lk of lookups) {
                if (slotMap[lk] && slotMap[lk].length > 0) {
                    return slotMap[lk][0];
                }
            }
        }

        // Generic fallback based on primary code
        const primary = codes[0] || '';
        if (primary === 'GB') return { roleIP: 'gardien', roleOOP: 'gardien' };
        if (['DC','CB'].includes(primary)) return { roleIP: 'défenseur central', roleOOP: 'défenseur central stoppeur' };
        if (['DL','DR','LB','RB','LWB','RWB'].includes(primary)) return { roleIP: 'latéral offensif', roleOOP: 'arrière latéral' };
        if (['MD','DM','MDL','MDR'].includes(primary)) return { roleIP: 'milieu défensif', roleOOP: 'milieu défensif de couverture' };
        if (['MC','CM','ML','MR'].includes(primary)) return { roleIP: 'milieu axial', roleOOP: 'milieu axial de pressing' };
        if (['AMC','SS'].includes(primary)) return { roleIP: 'meneur de jeu du milieu', roleOOP: 'milieu axial de pressing' };
        if (['AML','AMR','LW','RW'].includes(primary)) return { roleIP: 'ailier', roleOOP: 'attaquant intérieur' };
        if (['ST','STC','BT','CF'].includes(primary)) return { roleIP: 'attaquant central', roleOOP: 'attaquant central' };
        return { roleIP: '', roleOOP: '' };
    }

    // Determine display group from FM26 position string
    positionGroup(csvPosition) {
        const codes = this.parseFM26Position(csvPosition);
        const p = codes[0] || '';
        if (p === 'GB') return 'GB';
        if (['DC','DL','DR','LB','RB','LWB','RWB','CB'].includes(p)) return 'DEF';
        if (['MD','DM','MDL','MDR'].includes(p)) return 'MDF';
        if (['MC','CM','ML','MR','AMC','SS'].includes(p)) return 'MIL';
        if (['AML','AMR','LW','RW'].includes(p)) return 'AIL';
        if (['ST','STC','BT','CF'].includes(p)) return 'ATT';
        return 'AUT';
    }

    async generateTrainingPlan() {
        const fileInput = document.getElementById('training-csv-file');
        const resultsEl = document.getElementById('training-results');
        const placeholderEl = document.getElementById('training-placeholder');
        const gridEl = document.getElementById('training-players-grid');
        const presetNameEl = document.getElementById('training-preset-name');

        if (!fileInput || !fileInput.files || !fileInput.files[0]) {
            this.showNotification('Sélectionne un fichier CSV d\'abord', 'error');
            return;
        }

        let players;
        try {
            const text = await fileInput.files[0].text();
            players = this.parseFMCSVPlayers(text);
        } catch (e) {
            this.showNotification('Erreur lecture CSV: ' + e.message, 'error');
            return;
        }

        if (!players || players.length === 0) {
            this.showNotification('Aucun joueur trouvé dans le CSV', 'error');
            return;
        }

        const rolesIP = this.playerRoles.ip || {};
        const rolesOOP = this.playerRoles.oop || {};
        const formations = window.FM26Data.FORMATIONS || {};
        const ipPositions = formations[this.formationIP] || [];
        const allCategories = this.getTrainingCategories();
        // GK-only category IDs — never recommend for outfield
        const gkOnlyCats = new Set(['reactions-gb','tactique-gb','technique-gb','couverture-gb','relances-longues','relances-courtes']);
        // Outfield-only categories — never recommend for GK
        const outfieldCats = new Set(['vivacite','agilite','puissance','endurance','placement-def','deplacements-off','tirs','passes','trente-metres','centres','controle','jeu-aerien','coups-francs','corners','penalties','touches-longues']);

        const getCatLabel = id => (allCategories.find(c => c.id === id) || {}).label || id;

        const isGK = pos => this.parseFM26Position(pos).includes('GB');

        const groupLabels = { GB: 'Gardiens', DEF: 'Défenseurs', MDF: 'Milieux défensifs', MIL: 'Milieux centraux', AIL: 'Ailiers', ATT: 'Attaquants', AUT: 'Autres' };
        const groupOrder = ['GB','DEF','MDF','MIL','AIL','ATT','AUT'];

        // Build plan for EVERY player in CSV
        const plans = [];
        for (const player of players) {
            const gk = isGK(player.position);

            // Find best matching role from the tactic
            const { roleIP, roleOOP } = this.inferRolesFromPosition(
                player.position, rolesIP, rolesOOP, ipPositions
            );

            const profileIP = this.getRoleAttributeProfile(roleIP || (gk ? 'gardien' : player.position));
            const profileOOP = this.getRoleAttributeProfile(roleOOP || (gk ? 'gardien' : player.position));

            const combined = {
                ipAttrs: profileIP.ipAttrs,
                oopAttrs: profileOOP.oopAttrs,
                ipFocus: profileIP.ipFocus,
                oopFocus: profileOOP.oopFocus
            };

            // Filter categories to only relevant ones for this player type
            const categories = gk
                ? allCategories.filter(c => !outfieldCats.has(c.id))
                : allCategories.filter(c => !gkOnlyCats.has(c.id));

            const focusData = this.getPriorityTrainingFocus(player, combined, categories);

            const ipFocus = [...new Set(focusData.ipFocus)];
            const oopFocus = [...new Set(focusData.oopFocus)];
            // Priority = categories triggered by weak attrs, not already in ip/oop lists
            const priorityFocus = [...new Set(focusData.priorityFocus)].filter(id => !ipFocus.includes(id) && !oopFocus.includes(id));

            const weakAttrs = focusData.weakAttrs.map(k => ({
                key: k, label: this.getAttrLabel(k), val: player[k] || 0
            }));

            plans.push({
                player,
                posCode: (player.position || '').split(',')[0].trim(),
                group: this.positionGroup(player.position),
                roleIP, roleOOP,
                ipFocus, oopFocus, priorityFocus,
                weakAttrs,
                isGK: gk
            });
        }

        if (plans.length === 0) {
            this.showNotification('Aucun joueur trouvé', 'error');
            return;
        }

        // Sort by group order, then by name
        plans.sort((a, b) => {
            const gi = groupOrder.indexOf(a.group) - groupOrder.indexOf(b.group);
            return gi !== 0 ? gi : a.player.name.localeCompare(b.player.name);
        });

        presetNameEl.textContent = this.tacticName || `${this.formationIP} → ${this.formationOOP}`;

        // Render grouped
        let html = '';
        let currentGroup = null;
        for (const p of plans) {
            if (p.group !== currentGroup) {
                if (currentGroup !== null) html += '</div>'; // close previous group grid
                html += `<div class="tp-group-header">${groupLabels[p.group] || p.group}</div><div class="training-players-grid">`;
                currentGroup = p.group;
            }

            const ipBadges = p.ipFocus.map(id => `<span class="tp-cat tp-cat-ip">${escapeHtml(getCatLabel(id))}</span>`).join('');
            const oopBadges = p.oopFocus.map(id => `<span class="tp-cat tp-cat-oop">${escapeHtml(getCatLabel(id))}</span>`).join('');
            const prioBadges = p.priorityFocus.map(id => `<span class="tp-cat tp-cat-prio"><i class="bi bi-exclamation-circle-fill"></i> ${escapeHtml(getCatLabel(id))}</span>`).join('');
            const weakBadges = p.weakAttrs.length
                ? p.weakAttrs.map(a => `<span class="tp-weak-attr">${escapeHtml(a.label)} <strong>${a.val}</strong></span>`).join('')
                : '<span class="tp-no-weak"><i class="bi bi-check-circle-fill"></i> Aucun attribut critique faible</span>';

            const na = p.player.na || null;
            const pot = p.player.pot || null;
            const age = p.player.age || null;
            // Parsed codes for display
            const parsedCodes = this.parseFM26Position(p.player.position);
            const posDisplay = parsedCodes.slice(0,2).join('/') || p.posCode;
            const groupColor = { GB:'--goalkeeper', DEF:'--defender', MDF:'--secondary', MIL:'--midfielder', AIL:'--accent', ATT:'--attacker', AUT:'--text-muted' }[p.group] || '--text-muted';

            html += `
                <div class="training-player-card">
                    <div class="tp-header">
                        <div class="tp-pos-badge" style="background:color-mix(in srgb,var(${groupColor}) 15%,transparent);color:var(${groupColor});border-color:color-mix(in srgb,var(${groupColor}) 30%,transparent)">${escapeHtml(posDisplay)}</div>
                        <div class="tp-player-info">
                            <span class="tp-player-name">${escapeHtml(p.player.name)}</span>
                            <span class="tp-na-badge">${[age ? age+' ans' : '', na ? 'NA '+na+(pot?'/'+pot:'') : ''].filter(Boolean).join(' · ')}</span>
                        </div>
                    </div>

                    <div class="tp-roles">
                        <div class="tp-role-row">
                            <span class="tp-role-label ip">IP</span>
                            <span class="tp-role-name">${escapeHtml(p.roleIP || '—')}</span>
                        </div>
                        <div class="tp-role-row">
                            <span class="tp-role-label oop">OOP</span>
                            <span class="tp-role-name">${escapeHtml(p.roleOOP || '—')}</span>
                        </div>
                    </div>

                    <div class="tp-focus-grid">
                        <div class="tp-focus-col">
                            <div class="tp-section-title"><i class="bi bi-circle-fill" style="color:var(--phase-ip,#2ecc71);font-size:0.7em"></i> Avec ballon</div>
                            <div class="tp-cats">${ipBadges || '<span class="tp-no-data">—</span>'}</div>
                        </div>
                        <div class="tp-focus-col">
                            <div class="tp-section-title"><i class="bi bi-shield-check" style="color:var(--phase-oop,#e74c3c);font-size:0.7em"></i> Sans ballon</div>
                            <div class="tp-cats">${oopBadges || '<span class="tp-no-data">—</span>'}</div>
                        </div>
                    </div>

                    ${prioBadges ? `
                    <div class="tp-section">
                        <div class="tp-section-title"><i class="bi bi-exclamation-circle-fill" style="color:#e63946"></i> À travailler en priorité</div>
                        <div class="tp-cats">${prioBadges}</div>
                    </div>` : ''}

                    <div class="tp-section tp-section-weak">
                        <div class="tp-section-title">📉 Attributs faibles vs rôle</div>
                        <div class="tp-weak-attrs">${weakBadges}</div>
                    </div>
                </div>
            `;
        }
        if (currentGroup !== null) html += '</div>'; // close last group grid

        gridEl.innerHTML = html;
        placeholderEl.style.display = 'none';
        resultsEl.style.display = 'block';

        const indicator = document.getElementById('training-active-preset');
        if (indicator) indicator.textContent = this.tacticName || `${this.formationIP} / ${this.formationOOP}`;

        this.showNotification(`Plan généré pour ${plans.length} joueurs`);
    }

    // Utilities
    // ==========================================
    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? 'var(--phase-ip)' : 'var(--phase-oop)'};
            color: white;
            border-radius: 8px;
            font-weight: 500;
            z-index: 2000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // ==========================================
    // Player Scoring System
    // ==========================================

    /** Score a player [0-100] against a role's attribute profile.
     *  weights: ipAttrs count 60%, oopAttrs count 40%.
     *  Each attr scored against a scale of 1-20 → normalised to 0-1.
     *  Returns { ipScore, oopScore, totalScore, grade }
     */
    scorePlayerForRole(player, roleName) {
        const profile = this.getRoleAttributeProfile(roleName);
        const score = (attrs) => {
            if (!attrs || !attrs.length) return 0;
            let total = 0;
            for (const attr of attrs) {
                const val = player[attr] || 0;
                total += Math.min(Math.max((val - 1) / 19, 0), 1);
            }
            return total / attrs.length;
        };
        let ipScore = score(profile.ipAttrs);
        let oopScore = score(profile.oopAttrs);

        // Bonus/malus pied pour rôles avec déplacement intérieur (coupent vers l'intérieur)
        const r = (roleName || '').toLowerCase();
        const isInteriorCutter =
            r.includes('attaquant intérieur') || r.includes('ailier intérieur') ||
            r.includes('latéral offensif intérieur') || r.includes('arrière latéral intérieur') ||
            r.includes('milieu de couloir') || r.includes('attaquant désaxé');
        if (isInteriorCutter) {
            const norm = (s) => (s || '').toLowerCase();
            const rightFoot = norm(player.rightFootLabel);
            const leftFoot  = norm(player.leftFootLabel);
            const bestFoot  = norm(player.bestFootLabel);
            // Côté du rôle : les intérieurs gauches coupent vers la droite → pied droit préférable
            // Les intérieurs droits coupent vers la gauche → pied gauche préférable
            // On utilise le bestFoot pour détecter la latéralité naturelle
            const isNaturalLeft = bestFoot.includes('gaucher');
            // Malus si le pied faible est vraiment faible (<= "faible")
            const footVal = (label) => {
                const v = norm(label);
                if (v.includes('tres fort')) return 4;
                if (v.includes('fort')) return 3;
                if (v.includes('assez fort')) return 2;
                if (v.includes('correct')) return 1;
                return 0; // faible ou vide
            };
            // Pour un intérieur gauche (Attaquant Intérieur sur l'aile gauche), le pied droit est le pied de frappe
            // → si pied droit faible, malus
            const weakFootScore = isNaturalLeft ? footVal(rightFoot) : footVal(leftFoot);
            if (weakFootScore === 0) ipScore *= 0.88;       // pied faible : -12%
            else if (weakFootScore === 1) ipScore *= 0.94;   // correct : -6%
            // bonus si les deux pieds sont bons
            else if (weakFootScore >= 3) ipScore = Math.min(ipScore * 1.05, 1.0);
        }

        // 55% IP, 45% OOP
        const totalScore = Math.round((ipScore * 0.55 + oopScore * 0.45) * 100);
        const ipS = Math.round(ipScore * 100);
        const oopS = Math.round(oopScore * 100);
        const grade = totalScore >= 80 ? 'S' : totalScore >= 68 ? 'A' : totalScore >= 55 ? 'B' : totalScore >= 40 ? 'C' : 'D';
        return { ipScore: ipS, oopScore: oopS, totalScore, grade, profile };
    }

    /**
     * Returns whether the player's natural position is compatible with a tactic slot.
     * Levels: 'natural' (joue nativement ce poste), 'capable' (peut y jouer), 'unlikely' (hors poste)
     */
    getPositionCompatibility(player, slotPosCode) {
        const playerCodes = this.parseFM26Position(player.position || '');
        const slot = slotPosCode.toUpperCase();

        // Mapping: slot code → compatible FM26 internal codes
        const compat = {
            'GB': ['GB'],
            'DC': ['DC', 'DL', 'DR'],   // DC peut jouer DL/DR à la limite
            'DL': ['DL', 'DR', 'ML', 'AML'],
            'DR': ['DR', 'DL', 'MR', 'AMR'],
            'MD': ['MD', 'MDL', 'MDR', 'MC'],
            'MC': ['MC', 'MD', 'AMC', 'ML', 'MR'],
            'ML': ['ML', 'AML', 'MR', 'MC'],
            'MR': ['MR', 'AMR', 'ML', 'MC'],
            'AMC': ['AMC', 'MC', 'AML', 'AMR'],
            'AML': ['AML', 'AMR', 'ML', 'AMC'],
            'AMR': ['AMR', 'AML', 'MR', 'AMC'],
            'ST': ['ST', 'AMC', 'AML', 'AMR']
        };

        // Normalize: LB→DL, RB→DR, LWB→DL, RWB→DR, CB→DC, DM→MD, CM→MC, LW→AML, RW→AMR
        const normalize = (c) => ({ 'LB':'DL','RB':'DR','LWB':'DL','RWB':'DR','CB':'DC','DM':'MD','CM':'MC','LW':'AML','RW':'AMR','LM':'ML','RM':'MR','AM':'AMC' }[c] || c);
        const normPlayerCodes = playerCodes.map(normalize);
        const normSlot = normalize(slot);

        if (normPlayerCodes.includes(normSlot)) return 'natural';
        const compatList = (compat[normSlot] || [normSlot]).map(normalize);
        if (normPlayerCodes.some(c => compatList.includes(c))) return 'capable';
        return 'unlikely';
    }

    /**
     * Suggest individual player instructions (PI) based on player attributes and role.
     * Returns an array of { id, label, value, reason } suggestions.
     */
    suggestPlayerInstructions(player, roleName) {
        const suggestions = [];
        const locked = (window.FM26Data.ROLE_LOCKED_INSTRUCTIONS || {})[roleName] || {};

        // Helper: check if attr is above threshold
        const has = (attr, threshold = 13) => (player[attr] || 0) >= threshold;
        const lacks = (attr, threshold = 10) => (player[attr] || 0) < threshold;
        const val = (attr) => player[attr] || 0;

        const r = (roleName || '').toLowerCase();

        // --- Passes / Vision ---
        if (!locked['pi-pass-risk']) {
            if (has('vis', 14) && has('pas', 14) && has('dec', 13)) {
                suggestions.push({ id: 'pi-pass-risk', value: 'more', label: 'Passes risquées', reason: `Vis ${val('vis')}, Passes ${val('pas')}, Déc ${val('dec')} élevés → peut prendre des risques` });
            } else if (lacks('vis', 10) || lacks('dec', 10)) {
                suggestions.push({ id: 'pi-pass-risk', value: 'less', label: 'Passes sûres', reason: `Vis ${val('vis')} ou Déc ${val('dec')} faibles → jouer simple` });
            }
        }

        // --- Dribbles ---
        if (!locked['pi-dribbling']) {
            if (has('dri', 14) && has('acc', 13) && has('tec', 13)) {
                suggestions.push({ id: 'pi-dribbling', value: 'more', label: 'Plus de dribbles', reason: `Dri ${val('dri')}, Acc ${val('acc')}, Tec ${val('tec')} → dribbleur fiable` });
            } else if (lacks('dri', 10) || lacks('tec', 10)) {
                suggestions.push({ id: 'pi-dribbling', value: 'less', label: 'Moins de dribbles', reason: `Dri ${val('dri')} ou Tec ${val('tec')} faibles → éviter les dribbles` });
            }
        }

        // --- Tirs ---
        if (!locked['pi-shooting']) {
            const isShooter = r.includes('attaquant') || r.includes('ailier intérieur') || r.includes('milieu offensif') || r.includes('milieu de couloir');
            if (isShooter && has('fin', 14) && has('lon', 12)) {
                suggestions.push({ id: 'pi-shooting', value: 'more', label: 'Plus de tirs', reason: `Fin ${val('fin')}, Tir loin ${val('lon')} → peut menacer de loin` });
            }
        }

        // --- Pressing ---
        if (!locked['pi-pressing']) {
            if (has('wor', 14) && has('acc', 12) && has('sta', 13)) {
                suggestions.push({ id: 'pi-pressing', value: 'more', label: 'Plus de pressing', reason: `Trav ${val('wor')}, Acc ${val('acc')}, End ${val('sta')} → moteur du pressing` });
            } else if (lacks('sta', 10) || lacks('wor', 10)) {
                suggestions.push({ id: 'pi-pressing', value: 'less', label: 'Moins de pressing', reason: `End ${val('sta')} ou Trav ${val('wor')} faibles → économiser l'énergie` });
            }
        }

        // --- Tacles ---
        if (!locked['pi-tackling']) {
            if (has('tac', 14) && has('ant', 13)) {
                suggestions.push({ id: 'pi-tackling', value: 'harder', label: 'Tacles appuyés', reason: `Tac ${val('tac')}, Ant ${val('ant')} → peut aller au contact` });
            } else if (lacks('tac', 9)) {
                suggestions.push({ id: 'pi-tackling', value: 'ease', label: 'Tacles relâchés', reason: `Tac ${val('tac')} faible → éviter les tacles risqués` });
            }
        }

        // --- Courses (forward runs) ---
        if (!locked['pi-forward-runs']) {
            const isMid = r.includes('milieu') || r.includes('boîte à boîte');
            if (isMid && has('sta', 14) && has('wor', 14) && has('acc', 12)) {
                suggestions.push({ id: 'pi-forward-runs', value: 'more', label: 'Plus de courses', reason: `End ${val('sta')}, Trav ${val('wor')}, Acc ${val('acc')} → box-to-box naturel` });
            }
        }

        // --- Liberté (roam) ---
        if (!locked['pi-freedom']) {
            const isCreative = r.includes('meneur') || r.includes('trequartista') || r.includes('rôle libre');
            if (isCreative && has('vis', 14) && has('dec', 13) && has('tec', 13)) {
                suggestions.push({ id: 'pi-freedom', value: 'roam', label: 'Liberté de mouvement', reason: `Vis ${val('vis')}, Déc ${val('dec')}, Tec ${val('tec')} → peut dicter librement` });
            }
        }

        return suggestions;
    }

    /** Extract all unique IP+OOP roles from the active tactic */
    getTacticRoles() {
        const rolesIP = this.playerRoles?.ip || {};
        const rolesOOP = this.playerRoles?.oop || {};
        const ipPositions = window.FM26Data.FORMATIONS[this.formationIP] || [];

        const entries = ipPositions.map((pos, idx) => ({
            slotIdx: idx,
            posCode: pos.pos,
            roleIP: rolesIP[idx] || this.getDefaultRole(pos.pos),
            roleOOP: rolesOOP[idx] || this.getDefaultRole(pos.pos),
            posType: pos.type
        }));
        return entries;
    }

    /** For a player, find the best-matching tactic slots, with position compatibility weighting */
    bestRolesForPlayer(player, tacticSlots) {
        return tacticSlots.map(slot => {
            const scoredIP = this.scorePlayerForRole(player, slot.roleIP);
            const scoredOOP = this.scorePlayerForRole(player, slot.roleOOP);
            const compat = this.getPositionCompatibility(player, slot.posCode);

            // Multiplicateur de compatibilité de poste
            const compatMultiplier = compat === 'natural' ? 1.0 : compat === 'capable' ? 0.88 : 0.65;
            const rawCombined = Math.round((scoredIP.totalScore + scoredOOP.totalScore) / 2);
            const combinedScore = Math.round(rawCombined * compatMultiplier);

            return {
                slot,
                ipScore: scoredIP.totalScore,
                oopScore: scoredOOP.totalScore,
                combinedScore,
                rawScore: rawCombined,
                compat,
                gradeIP: scoredIP.grade,
                gradeOOP: scoredOOP.grade
            };
        }).sort((a, b) => b.combinedScore - a.combinedScore);
    }

    async runPlayerScoring() {
        const fileInput = document.getElementById('scoring-csv-file');
        if (!fileInput || !fileInput.files || !fileInput.files[0]) {
            this.showNotification('Sélectionne un fichier CSV d\'abord', 'error');
            return;
        }

        const btn = document.getElementById('run-scoring-btn');
        if (btn) { btn.disabled = true; btn.innerHTML = '<span class="btn-icon" aria-hidden="true"><i class="bi bi-hourglass-split"></i></span> Analyse...'; }

        try {
            const csvText = await fileInput.files[0].text();
            const players = this.parseFMCSVPlayers(csvText);
            if (!players.length) throw new Error('Aucun joueur trouvé dans le CSV');

            this.scoringData = { players, tacticSlots: this.getTacticRoles() };

            // Update active tactic badge
            const badge = document.getElementById('scoring-active-tactic');
            if (badge) badge.textContent = `${this.tacticName} (${this.formationIP} / ${this.formationOOP})`;

            // Populate role filter
            const roleFilter = document.getElementById('rs-role-filter');
            if (roleFilter) {
                const uniqueRoles = [...new Set(this.scoringData.tacticSlots.flatMap(s => [s.roleIP, s.roleOOP]))];
                roleFilter.innerHTML = '<option value="">Tous les rôles de la tactique</option>' +
                    uniqueRoles.map(r => `<option value="${escapeHtml(r)}">${escapeHtml(r)}</option>`).join('');
            }

            this.renderRoleScorer();
            this.renderSquadOverview();
            this.renderRecruitment();

            document.getElementById('scoring-placeholder').style.display = 'none';
            document.getElementById('role-scorer-controls').style.display = '';
            document.getElementById('scoring-view-bar').style.display = '';
            document.getElementById('scoring-export-btn').style.display = '';

            this.showNotification(`${players.length} joueurs analysés`, 'success');
        } catch (err) {
            this.showNotification(`Erreur: ${err.message}`, 'error');
        } finally {
            if (btn) { btn.disabled = false; btn.innerHTML = '<span class="btn-icon" aria-hidden="true"><i class="bi bi-search"></i></span> Analyser l\'effectif'; }
        }
    }

    renderRoleScorer() {
        if (!this.scoringData) return;
        const { players, tacticSlots } = this.scoringData;
        const container = document.getElementById('role-scorer-grid');
        if (!container) return;

        // Build all player-role combos
        this.scoringRows = players.map(player => {
            const best = this.bestRolesForPlayer(player, tacticSlots);
            const top = best[0] || null;
            return { player, best, topSlot: top };
        });

        this.filterRoleScorer();
    }

    filterRoleScorer() {
        const container = document.getElementById('role-scorer-grid');
        if (!container || !this.scoringRows) return;

        const search = (document.getElementById('rs-search')?.value || '').toLowerCase();
        const roleFilter = document.getElementById('rs-role-filter')?.value || '';
        const posFilter = document.getElementById('rs-pos-filter')?.value || '';
        const topOnly = document.getElementById('rs-top-only')?.checked || false;

        let rows = this.scoringRows;

        if (search) rows = rows.filter(r => r.player.name.toLowerCase().includes(search));
        if (posFilter) rows = rows.filter(r => this.positionGroup(r.player.position) === posFilter);
        if (topOnly) rows = rows.filter(r => r.topSlot && r.topSlot.combinedScore >= 60);

        if (roleFilter) {
            // Re-sort by score for that specific role
            rows = rows.map(r => {
                const matchingSlots = r.best.filter(b => b.slot.roleIP === roleFilter || b.slot.roleOOP === roleFilter);
                const best = matchingSlots[0] || r.best[0];
                return { ...r, displaySlot: best };
            }).filter(r => r.displaySlot);
            rows.sort((a, b) => (b.displaySlot?.combinedScore || 0) - (a.displaySlot?.combinedScore || 0));
        } else {
            rows.sort((a, b) => (b.topSlot?.combinedScore || 0) - (a.topSlot?.combinedScore || 0));
        }

        container.innerHTML = rows.map(row => {
            const { player, best } = row;
            const displaySlot = row.displaySlot || row.topSlot;
            if (!displaySlot) return '';

            const posGrp = this.positionGroup(player.position);
            const posColor = { GB: '#f1c40f', DEF: '#3498db', MDF: '#9b59b6', MIL: '#2ecc71', AIL: '#e67e22', ATT: '#e74c3c' }[posGrp] || '#888';

            const topN = best.slice(0, 4);
            const gradeColor = { S: '#00e676', A: '#4caf50', B: '#ff9800', C: '#ff5722', D: '#f44336' };
            const compatLabel = { natural: '<i class="bi bi-check-circle-fill"></i> Poste naturel', capable: '<i class="bi bi-dash-circle-fill"></i> Peut jouer', unlikely: '<i class="bi bi-exclamation-triangle-fill"></i> Hors poste' };
            const compatColor = { natural: 'var(--phase-ip)', capable: '#ff9800', unlikely: '#f44336' };
            const compat = displaySlot.compat || 'natural';

            // Attribute bars for top role (IP + OOP key attrs deduplicated, max 7)
            const profile = this.getRoleAttributeProfile(displaySlot.slot.roleIP);
            const keyAttrs = [...new Set([...(profile.ipAttrs || []), ...(profile.oopAttrs || [])])].slice(0, 7);
            const attrBars = keyAttrs.map(attr => {
                const v = player[attr] || 0;
                const pct = Math.round((v / 20) * 100);
                const col = v >= 14 ? 'var(--phase-ip)' : v >= 10 ? '#ff9800' : '#f44336';
                const isIPAttr = (profile.ipAttrs || []).includes(attr);
                const isOOPAttr = (profile.oopAttrs || []).includes(attr);
                const phase = isIPAttr && isOOPAttr ? '⚽🛡' : isIPAttr ? '⚽' : '🛡';
                return `<div class="rs-attr-row">
                    <span class="rs-attr-phase">${phase}</span>
                    <span class="rs-attr-label">${this.getAttrLabel(attr)}</span>
                    <div class="rs-attr-bar-track"><div class="rs-attr-bar-fill" style="width:${pct}%;background:${col}"></div></div>
                    <span class="rs-attr-val" style="color:${col}">${v}</span>
                </div>`;
            }).join('');

            // PI suggestions
            const piSuggestions = this.suggestPlayerInstructions(player, displaySlot.slot.roleIP);
            const piHtml = piSuggestions.length ? `
                <div class="rs-pi-section">
                    <span class="rs-pi-title">Consignes suggérées</span>
                    ${piSuggestions.slice(0, 3).map(s => `
                        <div class="rs-pi-chip" title="${escapeHtml(s.reason)}">
                            <span class="rs-pi-label">${escapeHtml(s.label)}</span>
                            <span class="rs-pi-reason">${escapeHtml(s.reason)}</span>
                        </div>`).join('')}
                </div>` : '';

            const scoreColor = gradeColor[displaySlot.gradeIP] || '#888';
            const totalPct = displaySlot.combinedScore;
            // Show raw score if position penalty applied
            const rawDiff = (displaySlot.rawScore || totalPct) - totalPct;
            const rawHint = rawDiff > 3 ? ` <span class="rs-raw-score" title="Score sans pénalité poste">(${displaySlot.rawScore} brut)</span>` : '';

            return `
            <div class="rs-player-card" data-score="${totalPct}">
                <div class="rs-player-header">
                    <div class="rs-player-name-row">
                        <span class="rs-pos-badge" style="background:${posColor}20;color:${posColor};border-color:${posColor}40">${posGrp}</span>
                        <span class="rs-player-name">${escapeHtml(player.name)}</span>
                        ${player.age ? `<span class="rs-player-age">${player.age}a</span>` : ''}
                        ${player.na ? `<span class="rs-player-na" title="Niveau actuel">NA: ${player.na}</span>` : ''}
                        <span class="rs-compat-badge" style="color:${compatColor[compat]}" title="${compatLabel[compat]}">${compatLabel[compat]}</span>
                    </div>
                    <div class="rs-score-badge" style="--grade-color:${scoreColor}">
                        <span class="rs-grade">${displaySlot.gradeIP}</span>
                        <span class="rs-score-num">${totalPct}${rawHint}</span>
                    </div>
                </div>

                <div class="rs-best-role">
                    <div class="rs-role-ip">
                        <span class="rs-role-phase-label ip">IP</span>
                        <span class="rs-role-name">${escapeHtml(displaySlot.slot.roleIP)}</span>
                        <span class="rs-role-score">${displaySlot.ipScore}</span>
                    </div>
                    <div class="rs-role-oop">
                        <span class="rs-role-phase-label oop">OOP</span>
                        <span class="rs-role-name">${escapeHtml(displaySlot.slot.roleOOP)}</span>
                        <span class="rs-role-score">${displaySlot.oopScore}</span>
                    </div>
                </div>

                <div class="rs-score-bar-wrap">
                    <div class="rs-score-bar-track">
                        <div class="rs-score-bar-fill" style="width:${totalPct}%;background:${scoreColor}"></div>
                    </div>
                </div>

                <div class="rs-attrs">${attrBars}</div>

                ${piHtml}

                ${topN.length > 1 ? `
                <div class="rs-alt-roles">
                    <span class="rs-alt-label">Autres rôles compatibles :</span>
                    ${topN.slice(1).map(s => {
                        const altCompat = s.compat || 'natural';
                        const altCompatIcon = { natural: '<i class="bi bi-check-circle-fill"></i>', capable: '<i class="bi bi-dash-circle-fill"></i>', unlikely: '<i class="bi bi-exclamation-triangle-fill"></i>' }[altCompat];
                        return `<span class="rs-alt-chip" style="--alt-color:${gradeColor[s.gradeIP] || '#888'}" title="${compatLabel[altCompat]}">
                            ${altCompatIcon} ${escapeHtml(s.slot.roleIP)} <em>${s.combinedScore}</em>
                        </span>`;
                    }).join('')}
                </div>` : ''}
            </div>`;
        }).join('');
    }

    renderSquadOverview() {
        if (!this.scoringData) return;
        const { players, tacticSlots } = this.scoringData;
        const container = document.getElementById('squad-overview-content');
        if (!container) return;

        // For each tactic slot, find the best player
        const slotAnalysis = tacticSlots.map(slot => {
            const scored = players.map(p => {
                const ipS = this.scorePlayerForRole(p, slot.roleIP);
                const oopS = this.scorePlayerForRole(p, slot.roleOOP);
                return {
                    player: p,
                    score: Math.round((ipS.totalScore + oopS.totalScore) / 2),
                    gradeIP: ipS.grade,
                    gradeOOP: oopS.grade
                };
            }).sort((a, b) => b.score - a.score);

            const top3 = scored.slice(0, 3);
            const coverageScore = top3[0]?.score || 0;
            const quality = coverageScore >= 70 ? 'ok' : coverageScore >= 50 ? 'warn' : 'bad';

            return { slot, top3, coverageScore, quality };
        });

        // Global squad stats
        const avgScore = slotAnalysis.reduce((s, a) => s + a.coverageScore, 0) / slotAnalysis.length;
        const badSlots = slotAnalysis.filter(a => a.quality === 'bad').length;
        const warnSlots = slotAnalysis.filter(a => a.quality === 'warn').length;

        const qualColor = { ok: 'var(--phase-ip)', warn: '#ff9800', bad: '#f44336' };

        container.innerHTML = `
            <div class="squad-overview-summary">
                <div class="squad-stat-card">
                    <span class="squad-stat-val">${Math.round(avgScore)}</span>
                    <span class="squad-stat-label">Score moyen effectif</span>
                </div>
                <div class="squad-stat-card ${badSlots > 2 ? 'bad' : ''}">
                    <span class="squad-stat-val">${badSlots}</span>
                    <span class="squad-stat-label">Postes critiques (score &lt;40)</span>
                </div>
                <div class="squad-stat-card ${warnSlots > 3 ? 'warn' : ''}">
                    <span class="squad-stat-val">${warnSlots}</span>
                    <span class="squad-stat-label">Postes fragiles (score &lt;60)</span>
                </div>
                <div class="squad-stat-card">
                    <span class="squad-stat-val">${players.length}</span>
                    <span class="squad-stat-label">Joueurs analysés</span>
                </div>
            </div>

            <div class="squad-slots-grid">
                ${slotAnalysis.map(analysis => `
                <div class="squad-slot-card ${analysis.quality}">
                    <div class="squad-slot-header">
                        <span class="squad-slot-pos">${analysis.slot.posCode}</span>
                        <div class="squad-slot-roles">
                            <span class="squad-slot-role ip">${escapeHtml(analysis.slot.roleIP)}</span>
                            <span class="squad-slot-sep">→</span>
                            <span class="squad-slot-role oop">${escapeHtml(analysis.slot.roleOOP)}</span>
                        </div>
                        <span class="squad-slot-score" style="color:${qualColor[analysis.quality]}">${analysis.coverageScore}</span>
                    </div>
                    <div class="squad-slot-players">
                        ${analysis.top3.map((s, i) => `
                            <div class="squad-slot-player ${i === 0 ? 'starter' : 'backup'}">
                                <span class="squad-slot-player-rank">${i === 0 ? '1️⃣' : i === 1 ? '2️⃣' : '3️⃣'}</span>
                                <span class="squad-slot-player-name">${escapeHtml(s.player.name)}</span>
                                <span class="squad-slot-player-score" style="color:${qualColor[analysis.quality]}">${s.score}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="squad-slot-bar-track">
                        <div class="squad-slot-bar-fill" style="width:${analysis.coverageScore}%;background:${qualColor[analysis.quality]}"></div>
                    </div>
                </div>`).join('')}
            </div>
        `;
    }

    renderRecruitment() {
        if (!this.scoringData) return;
        const { players, tacticSlots } = this.scoringData;
        const container = document.getElementById('recruitment-content');
        if (!container) return;

        // Identify weak slots (score < 60) and generate target profile
        const weakSlots = tacticSlots.map(slot => {
            const scored = players.map(p => {
                const ipS = this.scorePlayerForRole(p, slot.roleIP);
                const oopS = this.scorePlayerForRole(p, slot.roleOOP);
                return Math.round((ipS.totalScore + oopS.totalScore) / 2);
            });
            const best = Math.max(...scored);
            return { slot, best };
        }).filter(s => s.best < 62).sort((a, b) => a.best - b.best);

        if (!weakSlots.length) {
            container.innerHTML = `<div class="recruit-no-gap"><i class="bi bi-check-circle-fill"></i><p>Aucune lacune critique détectée. Votre effectif couvre bien tous les postes de la tactique.</p></div>`;
            return;
        }

        container.innerHTML = `
            <div class="recruit-intro">
                <h3>🔍 ${weakSlots.length} poste(s) nécessitant du renfort</h3>
                <p>Profils cibles basés sur les attributs clés des rôles mal couverts dans votre effectif actuel.</p>
            </div>
            <div class="recruit-cards">
                ${weakSlots.map(({ slot, best }) => {
                    const profileIP = this.getRoleAttributeProfile(slot.roleIP);
                    const profileOOP = this.getRoleAttributeProfile(slot.roleOOP);
                    const urgency = best < 40 ? 'urgent' : 'moderate';
                    const urgencyLabel = best < 40 ? '<i class="bi bi-exclamation-circle-fill" style="color:#e63946"></i> Priorité haute' : '<i class="bi bi-info-circle" style="color:#f4a261"></i> Priorité modérée';

                    const attrTarget = (attrs) => attrs.map(attr => {
                        const label = this.getAttrLabel(attr);
                        const currentBest = Math.max(...players.map(p => p[attr] || 0));
                        const target = currentBest < 13 ? '≥14' : '≥12';
                        return `<span class="recruit-attr-chip">${label} <em>${target}</em></span>`;
                    }).join('');

                    return `
                    <div class="recruit-card ${urgency}">
                        <div class="recruit-card-header">
                            <div class="recruit-pos-badge">${slot.posCode}</div>
                            <div class="recruit-roles">
                                <span class="recruit-role ip">${escapeHtml(slot.roleIP)}</span>
                                <span class="recruit-role-sep">→ OOP →</span>
                                <span class="recruit-role oop">${escapeHtml(slot.roleOOP)}</span>
                            </div>
                            <span class="recruit-urgency-badge">${urgencyLabel}</span>
                        </div>
                        <div class="recruit-best-score">Meilleur joueur actuel : <strong>${best}/100</strong></div>

                        <div class="recruit-attrs-section">
                            <div class="recruit-attrs-group">
                                <span class="recruit-attrs-title ip"><i class="bi bi-circle-fill" style="font-size:0.7em"></i> Attributs IP clés</span>
                                <div class="recruit-attrs-list">${attrTarget(profileIP.ipAttrs || [])}</div>
                            </div>
                            <div class="recruit-attrs-group">
                                <span class="recruit-attrs-title oop"><i class="bi bi-shield-check" style="font-size:0.7em"></i> Attributs OOP clés</span>
                                <div class="recruit-attrs-list">${attrTarget(profileOOP.oopAttrs || [])}</div>
                            </div>
                        </div>
                    </div>`;
                }).join('')}
            </div>
        `;
    }

    exportScoringReport() {
        if (!this.scoringData) return;
        const { players, tacticSlots } = this.scoringData;

        const rows = [['Joueur', 'Âge', 'NA', 'Poste', ...tacticSlots.map(s => `${s.roleIP}/${s.roleOOP}`)]];
        players.forEach(p => {
            const scores = tacticSlots.map(slot => {
                const ipS = this.scorePlayerForRole(p, slot.roleIP);
                const oopS = this.scorePlayerForRole(p, slot.roleOOP);
                return Math.round((ipS.totalScore + oopS.totalScore) / 2);
            });
            rows.push([p.name, p.age, p.na, p.position, ...scores]);
        });

        const csv = rows.map(r => r.join(';')).join('\n');
        const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `scoring_${this.tacticName.replace(/\s+/g, '_')}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Modal functions (global for onclick handlers)
function closeSaveModal() { app.closeSaveModal(); }
function closeLoadModal() { app.closeLoadModal(); }
function confirmSave() { app.confirmSave(); }

// Initialize app
const app = new FM26TacticsTool();

// Save full state on changes
window.addEventListener('beforeunload', () => {
    // Collect all current instruction values from DOM
    const allSelects = [
        'passing-style', 'tempo', 'width-attack', 'attack-focus',
        'pass-target', 'crossing-patience', 'crossing-style',
        'dribbling', 'long-shots', 'creative-freedom',
        'pressing-strategy', 'set-pieces',
        'goal-kicks', 'distribution-target', 'distribution-speed', 'time-wasting',
        'counter-attack',
        'pressing-height', 'defensive-line', 'pressing-trigger',
        'defensive-transition', 'tackling', 'pressing-crosses',
        'pressing-trap', 'defensive-behavior', 'prevent-short-gk'
    ];
    allSelects.forEach(id => {
        const el = document.getElementById(id);
        if (el) app.instructions[id] = el.value;
    });
    const allCheckboxes = ['overlap-left', 'overlap-right', 'underlap-left', 'underlap-right'];
    allCheckboxes.forEach(id => {
        const el = document.getElementById(id);
        if (el) app.checkboxes[id] = el.checked;
    });

    localStorage.setItem('fm26_last_state', JSON.stringify({
        formationIP: app.formationIP,
        formationOOP: app.formationOOP,
        mentality: app.mentality,
        tacticName: app.tacticName,
        playerRoles: app.playerRoles,
        playerPositions: app.playerPositions,
        playerNames: app.playerNames,
        playerInstructions: app.playerInstructions,
        phasePlayerMap: app.phasePlayerMapOverride,
        instructions: app.instructions,
        checkboxes: app.checkboxes
    }));
});
