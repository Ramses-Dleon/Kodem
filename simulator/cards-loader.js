'use strict';

/**
 * cards-loader.js — Kódem TCG Card Database Loader
 * Loads cards.json and provides indexed access helpers.
 * Zero dependencies. Pure vanilla JS.
 */

const fs = require('fs');
const path = require('path');

const CARDS_PATH = path.resolve(__dirname, '../cards.json');

let _cards = null;
let _byFolio = null;
let _bySet = null;
let _byType = null;

function _load() {
  if (_cards) return;
  const raw = fs.readFileSync(CARDS_PATH, 'utf8');
  _cards = JSON.parse(raw);

  _byFolio = Object.create(null);
  _bySet   = Object.create(null);
  _byType  = Object.create(null);

  for (const card of _cards) {
    // Index by folio
    _byFolio[card.folio] = card;

    // Index by set
    const setKey = card.set || 'UNKNOWN';
    if (!_bySet[setKey]) _bySet[setKey] = [];
    _bySet[setKey].push(card);

    // Index by type (Adendei, Protector, Ixim, Rot, Rava, Bio, Token, Espectro)
    const typeKey = card.type || 'UNKNOWN';
    if (!_byType[typeKey]) _byType[typeKey] = [];
    _byType[typeKey].push(card);
  }
}

/**
 * Get a single card by folio.
 * @param {string} folio
 * @returns {object|null}
 */
function getCard(folio) {
  _load();
  return _byFolio[folio] || null;
}

/**
 * Get all cards belonging to a set.
 * @param {string} set — e.g. 'LGRO', 'FYTE', 'DOOC'
 * @returns {object[]}
 */
function getCardsBySet(set) {
  _load();
  return (_bySet[set] || []).slice();
}

/**
 * Get all cards of a given type.
 * @param {string} type — e.g. 'Adendei', 'Protector', 'Ixim', 'Rot', 'Rava', 'Bio', 'Espectro'
 * @returns {object[]}
 */
function getCardsByType(type) {
  _load();
  return (_byType[type] || []).slice();
}

/**
 * Get all cards (full array copy).
 * @returns {object[]}
 */
function getAllCards() {
  _load();
  return _cards.slice();
}

/**
 * Returns the raw folio→card index (read-only reference, do not mutate).
 */
function getIndex() {
  _load();
  return _byFolio;
}

module.exports = { getCard, getCardsBySet, getCardsByType, getAllCards, getIndex };
