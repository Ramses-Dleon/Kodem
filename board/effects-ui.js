/**
 * Kódem Board — Effect-based UI Button Generator
 * Parses effect_text/cost_text to determine which actions a card can perform.
 * Returns only buttons the card actually supports.
 */

// ── Effect Pattern Detection ───────────────────────────────────────────────

function parseCardAbilities(folio) {
  const cd = CARDS[folio];
  if (!cd) return { abilities: [], effectType: null };

  const et = (cd.effect_text || '').toLowerCase();
  const ct = (cd.cost_text || '').toLowerCase();
  const effectType = (cd.effect_type || '').toLowerCase();
  const abilities = [];

  // Damage effects
  const dmgMatch = et.match(/daña\s*(\d+)\s*(?:pto|pv|punto)/i);
  if (dmgMatch) abilities.push({ type: 'damage', value: parseInt(dmgMatch[1]), label: `💔 Daña ${dmgMatch[1]}` });

  const dmg2 = et.match(/daña\s*(\d+)\s*(?:pto|pv|punto).*?(\d+)\s*carta/i);
  if (dmg2) abilities.push({ type: 'aoe-damage', value: parseInt(dmg2[1]), targets: parseInt(dmg2[2]), label: `💔 Daña ${dmg2[1]} a ${dmg2[2]} cartas` });

  // Heal / Cure
  if (et.match(/cura\s*(\d+)/i)) {
    const healVal = et.match(/cura\s*(\d+)/i)[1];
    abilities.push({ type: 'heal', value: parseInt(healVal), label: `💚 Cura ${healVal}` });
  }
  if (et.match(/recupera\s*(\d+)/i)) {
    const recVal = et.match(/recupera\s*(\d+)/i)[1];
    abilities.push({ type: 'heal', value: parseInt(recVal), label: `💚 Recupera ${recVal}` });
  }

  // Burn
  if (et.includes('quemar') || et.includes('quemadura') || et.includes('quema')) {
    abilities.push({ type: 'burn', label: '🔥 Quemar' });
  }

  // Poison
  if (et.includes('veneno') || et.includes('envenenar') || et.includes('envenenamiento')) {
    abilities.push({ type: 'poison', label: '☠️ Veneno' });
  }

  // Abysm
  if (et.includes('abismar') || et.includes('abismada') || et.includes('abismo')) {
    abilities.push({ type: 'abysm', label: '🌀 Abismar' });
  }

  // Scale / Escalar
  if (et.includes('escala') || et.includes('incrementa') || et.includes('+1 de daño') || et.includes('aumenta')) {
    abilities.push({ type: 'scale-up', label: '⬆️ Escalar' });
  }

  // Descend / Desescalar
  if (et.includes('desciende') || et.includes('reduce') || et.includes('-1 de daño') || et.includes('disminuye')) {
    abilities.push({ type: 'scale-down', label: '⬇️ Descender' });
  }

  // Rest manipulation
  if (et.match(/(\d+)\s*descanso/i) && (et.includes('genera') || et.includes('agrega') || et.includes('añade') || et.includes('obtiene'))) {
    const restVal = et.match(/(\d+)\s*descanso/i)[1];
    abilities.push({ type: 'add-rest', value: parseInt(restVal), label: `💤 +${restVal} descanso` });
  }
  if (et.includes('actualiza') && et.includes('descanso')) {
    abilities.push({ type: 'remove-rest', label: '✅ Quitar descanso' });
  }

  // Protector damage
  if (et.includes('protector') && (et.includes('daña') || et.includes('pto'))) {
    abilities.push({ type: 'prot-damage', label: '🛡️💔 Daña Protector' });
  }

  // Send to extinction
  if (et.includes('extinción') && (et.includes('envía') || et.includes('enviar') || et.includes('manda'))) {
    abilities.push({ type: 'send-ext', label: '💀 Enviar Extinción' });
  }

  // Immunity / Shield
  if (et.includes('inmune') || et.includes('no puede ser dañad') || et.includes('inalcanzable')) {
    abilities.push({ type: 'immunity', label: '🛡️ Inmune' });
  }

  // Return from extinction
  if (et.includes('regresa') && et.includes('extinción')) {
    abilities.push({ type: 'return-ext', label: '♻️ Revivir' });
  }

  // Reveal trigger
  if (effectType.includes('pasiva') && (et.includes('al ser revelad') || et.includes('al revelarse'))) {
    abilities.push({ type: 'on-reveal', label: '👁️ Al revelar' });
  }

  // Death trigger
  if (et.includes('al ser enviada a extinción') || et.includes('al morir') || et.includes('cuando esta carta va a extinción')) {
    abilities.push({ type: 'on-death', label: '💀 Al morir' });
  }

  // Vinculo reference
  if (et.includes('vinculad') || et.includes('vínculo')) {
    abilities.push({ type: 'vinculo-ref', label: '🔗 Vínculo' });
  }

  return { abilities, effectType: cd.effect_type };
}

function secHeader(label) { return `<div class="popup-section-header" role="separator">${label}</div>`; }

// ── Context-Aware Button Generator ─────────────────────────────────────────

function generateCardButtons(folio, side, index, status) {
  const isMyCard = side === TURN_PLAYER;
  const isRivalCard = side !== TURN_PLAYER;
  const fc = getPlayer(side).field[index];
  const { abilities, effectType } = parseCardAbilities(folio);
  const abilityTypes = new Set(abilities.map(a => a.type));

  let btns = '';

  if (status === 'dead') return '';

  // ── Own card buttons ──
  if (isMyCard) {
    // ── ATTACK BUTTON (primary action) ──
    if (status === 'alive' && fc && fc.revealed && PHASE === 'batalla' && !HAS_ATTACKED && !VINCULO_USED) {
      const cd = CARDS[folio] || {};
      const hasDmg = safeInt(cd.damage) + (fc.scaledDmg || 0) > 0;
      const isRava = cd.type === 'Rava';
      if (hasDmg || !isRava) {
        btns += mkBtn('⚔️ Atacar', '#dc2626', `closePopup();startAttack('${side}',${index})`, true);
      }
    }

    // Reveal/Hide toggle (always available)
    if (status === 'hidden') {
      btns += mkBtn('👁️ Revelar', '#f59e0b', `revealCard('${side}',${index});closePopup()`);
    } else if (status === 'alive') {
      btns += mkBtn('🎴 Ocultar', '#6b7280', `hideCard('${side}',${index});closePopup()`);
    }

    // ── Vida ──
    btns += secHeader('Vida');
    btns += mkBtn('💚 +1 PV', '#22c55e', `manualDamage('${side}',${index},1);closePopup()`);
    btns += mkBtn('💔 -1 PV', '#ef4444', `manualDamage('${side}',${index},-1);closePopup()`);
    btns += mkBtn('💔 -2 PV', '#ef4444', `manualDamage('${side}',${index},-2);closePopup()`);

    // ── Escala ──
    btns += secHeader('Escala');
    btns += mkBtn('⬆️ Escalar +1', '#3b82f6', `manualScale('${side}',${index},1);closePopup()`);
    btns += mkBtn('⬇️ Descender -1', '#6b7280', `manualScale('${side}',${index},-1);closePopup()`);

    // ── Marcas ──
    btns += secHeader('Marcas');
    btns += mkBtn('🔥 Quemar', '#facc15', `toggleMark('${side}',${index},'burned');closePopup()`);
    btns += mkBtn('☠️ Veneno', '#a855f7', `toggleMark('${side}',${index},'poisoned');closePopup()`);
    btns += mkBtn('🌀 Abismar', '#38bdf8', `toggleMark('${side}',${index},'abyssed');closePopup()`);
    if (fc && (fc.burned || fc.poisoned || fc.abyssed)) {
      btns += mkBtn('🧹 Limpiar marcas', '#6b7280', `clearMarks('${side}',${index});closePopup()`);
    }

    // ── Descansos ──
    btns += secHeader('Descansos');
    btns += mkBtn('💤 +Descanso', '#eab308', `manualAddRest('${side}',${index});closePopup()`);
    if (fc && fc.rests > 0) {
      btns += mkBtn('✅ -Descanso', '#22c55e', `manualRemoveRest('${side}',${index});closePopup()`);
    }
  }

  // ── Rival card buttons ──
  if (isRivalCard) {
    // If we're in attack-target mode, show prominent target button
    if (ACTION_MODE === 'attack-target' && fc && fc.hp > 0) {
      btns += mkBtn('🎯 Atacar esta carta', '#dc2626', `closePopup();resolveAttack('${side}',${index})`, true);
    }

    // Reveal/Hide toggle for rival cards (manual effect resolution)
    if (status === 'hidden') {
      btns += mkBtn('👁️ Revelar', '#f59e0b', `revealCard('${side}',${index});closePopup()`);
    } else if (status === 'alive') {
      btns += mkBtn('🎴 Ocultar', '#6b7280', `hideCard('${side}',${index});closePopup()`);
    }

    // ── Vida ──
    btns += secHeader('Vida');
    btns += mkBtn('💔 -1 PV', '#ef4444', `manualDamage('${side}',${index},-1);closePopup()`);
    btns += mkBtn('💔 -2 PV', '#ef4444', `manualDamage('${side}',${index},-2);closePopup()`);

    // Marks — only show if ANY card on turn player's side has that ability
    const tpCards = getPlayer(TURN_PLAYER).field.filter(c => c.folio && c.revealed);
    const tpAbilities = new Set();
    tpCards.forEach(c => {
      const { abilities: abs } = parseCardAbilities(c.folio);
      abs.forEach(a => tpAbilities.add(a.type));
    });
    // Also check equipped cards
    tpCards.forEach(c => {
      if (c.equips) c.equips.forEach(eq => {
        const { abilities: eqAbs } = parseCardAbilities(eq.folio);
        eqAbs.forEach(a => tpAbilities.add(a.type));
      });
    });
    // Also check Bio (revealed)
    const tpBio = getPlayer(TURN_PLAYER).bio;
    if (tpBio && tpBio.folio && tpBio.revealed) {
      const { abilities: bioAbs } = parseCardAbilities(tpBio.folio);
      bioAbs.forEach(a => tpAbilities.add(a.type));
    }
    // Always show all 3 mark buttons for manual use (marks can come from many sources)
    tpAbilities.add('burn');
    tpAbilities.add('poison');
    tpAbilities.add('abysm');

    btns += secHeader('Marcas');
    if (tpAbilities.has('burn')) {
      btns += mkBtn('🔥 Quemar', '#facc15', `toggleMark('${side}',${index},'burned');closePopup()`);
    }
    if (tpAbilities.has('poison')) {
      btns += mkBtn('☠️ Veneno', '#a855f7', `toggleMark('${side}',${index},'poisoned');closePopup()`);
    }
    if (tpAbilities.has('abysm')) {
      btns += mkBtn('🌀 Abismar', '#38bdf8', `toggleMark('${side}',${index},'abyssed');closePopup()`);
    }
    if (fc && (fc.burned || fc.poisoned || fc.abyssed)) {
      btns += mkBtn('🧹 Limpiar marcas', '#6b7280', `clearMarks('${side}',${index});closePopup()`);
    }
    if (tpAbilities.has('scale-down')) {
      btns += mkBtn('⬇️ Descender', '#6b7280', `manualScale('${side}',${index},-1);closePopup()`);
    }
    // ── Descansos ──
    btns += secHeader('Descansos');
    btns += mkBtn('💤 +Descanso', '#eab308', `manualAddRest('${side}',${index});closePopup()`);
    if (fc && fc.rests > 0) {
      btns += mkBtn('✅ -Descanso', '#22c55e', `manualRemoveRest('${side}',${index});closePopup()`);
    }
    btns += mkBtn('❤️ +1 PV', '#22c55e', `manualDamage('${side}',${index},1);closePopup()`);
  }

  // ── Mover ──
  if (fc && fc.folio) {
    btns += secHeader('Mover');
    btns += mkBtn('📦⬆️ Tope del Mazo', '#6366f1', `sendToMazoTop('${side}',${index});closePopup()`);
    btns += mkBtn('📦⬇️ Fondo del Mazo', '#6366f1', `sendToMazoBottom('${side}',${index});closePopup()`);
    btns += mkBtn('💀 Enviar a Extinción', '#dc2626', `sendToExtinction('${side}',${index});closePopup()`);
  }

  return btns;
}

function generateProtButtons(side, status) {
  if (status === 'dead') return '';
  const isRivalProt = side !== TURN_PLAYER;
  const prot = getPlayer(side).protector;
  let btns = '';
  
  if (isRivalProt) {
    // Attack protector button when in attack mode
    if (ACTION_MODE === 'attack-target' && prot && prot.hp > 0) {
      btns += mkBtn('🎯 Atacar Protector', '#dc2626', `closePopup();attackProtector('${side}')`, true);
    }

    // Check if any turn player card can damage protector
    const tpCards = getPlayer(TURN_PLAYER).field.filter(c => c.folio && c.revealed);
    let canDmgProt = false;
    tpCards.forEach(c => {
      const { abilities } = parseCardAbilities(c.folio);
      if (abilities.some(a => a.type === 'prot-damage')) canDmgProt = true;
    });
    
    btns += mkBtn('💔 -1', '#ef4444', `manualProtDamage('${side}',-1);closePopup()`);
    btns += mkBtn('💔 -2', '#ef4444', `manualProtDamage('${side}',-2);closePopup()`);
    
    if (!canDmgProt) {
      btns = `<div style="font-size:0.6rem;color:#f87171;margin-bottom:6px">⚠️ Ninguna carta revelada puede dañar al Protector</div>` + btns;
    }
  } else {
    // Own protector
    if (!prot.revealed) {
      btns += mkBtn('👁️ Revelar', '#3b82f6', `revealProtector('${side}');closePopup()`);
    }
    
    // §6.3: Vínculo Odémico — only in Batalla, not attacked, not used
    if (PHASE === 'batalla' && !HAS_ATTACKED && !VINCULO_USED && prot && prot.revealed && (prot.rests || 0) === 0) {
      btns += mkBtn('🔗 Vínculo Odémico', '#8b5cf6', `closePopup();startVinculo('${side}')`, true);
    } else if (PHASE === 'batalla' && prot && prot.revealed && (prot.rests || 0) > 0) {
      btns += `<div style="font-size:0.6rem;color:#a78bfa;margin:4px 0">🔗 Vínculo no disponible (${prot.rests} descansos)</div>`;
    }

    btns += mkBtn('💚 Curar +1', '#22c55e', `manualProtDamage('${side}',1);closePopup()`);
    btns += mkBtn('💔 -1 PV', '#ef4444', `manualProtDamage('${side}',-1);closePopup()`);
  }

  // Rest buttons — both sides
  btns += mkBtn('💤 +1 Descanso', '#eab308', `adjustProtRest('${side}',1);closePopup()`);
  if (prot && prot.rests > 0) {
    btns += mkBtn('✅ -1 Descanso', '#22c55e', `adjustProtRest('${side}',-1);closePopup()`);
  }

  // Extinción — both sides (manual, for effect resolution)
  btns += secHeader('Extinción');
  btns += mkBtn('💀 Enviar Protector a Extinción', '#dc2626', `sendProtToExtinction('${side}');closePopup()`);
  
  return btns;
}

// Helper
function mkBtn(label, color, onclick, primary) {
  if (primary) {
    return `<button class="popup-act popup-act-primary" style="border-color:${color};color:${color};background:${color}18" onclick="${onclick}">${label}</button>`;
  }
  return `<button class="popup-act" style="border-color:${color};color:${color}" onclick="${onclick}">${label}</button>`;
}

// Rest manipulation helpers
function manualAddRest(side, index) {
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) return;
  pushUndo();
  const maxRest = 2; // Adendei max 2 descansos
  card.rests = Math.min(maxRest, (card.rests || 0) + 1);
  logAction(`💤 ${cardName(card.folio)} +1 descanso (${card.rests})`);
  saveState();
  renderInteractive();
}

function manualRemoveRest(side, index) {
  const card = getPlayer(side).field[index];
  if (!card || !card.folio) return;
  if ((card.rests || 0) <= 0) { warn('Ya tiene 0 descansos'); return; }
  pushUndo();
  card.rests = Math.max(0, card.rests - 1);
  logAction(`✅ ${cardName(card.folio)} -1 descanso (${card.rests})`);
  saveState();
  renderInteractive();
}
