#!/usr/bin/env python3
"""
Render del diagrama p19 "Estructura de Turno" de Kódem TCG v5.1
Layout v2: vertical puro con columnas (sin zigzag), más aire, texto legible.
Construido 100% con Pillow desde p19-extraction-v3-final.json.
"""
from PIL import Image, ImageDraw, ImageFont
import json, os, pathlib, math

# === Paleta ===
COLORS = {
    "cian":     ("#00B0E0", "#FFFFFF"),
    "rosa":     ("#E91E85", "#FFFFFF"),
    "rojo":     ("#D42A2A", "#FFFFFF"),
    "negro":    ("#1A1A1A", "#FFFFFF"),
    "amarillo": ("#F4D43A", "#1A1A1A"),
    "verde":    ("#56B84D", "#FFFFFF"),
    "gris":     ("#8A8A8A", "#FFFFFF"),
}
LEGEND_ORDER = [
    ("cian",     "Declaración"),
    ("rosa",     "Acción"),
    ("rojo",     "Resolución"),
    ("negro",    "Fin de efecto"),
    ("amarillo", "Efectos del rival"),
    ("verde",    "Efectos jugador + rival"),
    ("gris",     "Transición / inicio"),
]

# === Dimensiones ===
W = 3000
BG = "#F7F4EE"
PHASE_BG = "#FFFFFF"
PHASE_BORDER = "#2C2C2C"
PASAR_BG = "#FFF7E8"

MARGIN = 80
TITLE_H = 160
LEGEND_H = 400
PHASE_GAP = 50

# Node
NODE_W = 460
NODE_H = 130
NODE_R = 16
ROW_GAP = 60           # gap vertical entre filas de nodos
COL_GAP = 120          # gap horizontal entre columnas
OVAL_W = 480
OVAL_H = 130

def load_font(size, bold=False):
    cands = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
            else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf" if bold
            else "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for c in cands:
        if os.path.exists(c):
            return ImageFont.truetype(c, size)
    return ImageFont.load_default()

FONT_TITLE = load_font(64, bold=True)
FONT_SUBTITLE = load_font(28, bold=False)
FONT_PHASE = load_font(48, bold=True)
FONT_NODE = load_font(22, bold=True)
FONT_NODE_SM = load_font(18, bold=True)
FONT_NODE_XS = load_font(15, bold=True)
FONT_LEGEND = load_font(26, bold=False)
FONT_LEGEND_B = load_font(28, bold=True)
FONT_NOTE = load_font(22, bold=False)
FONT_FOOTER = load_font(20, bold=False)

# === Utils ===
def rounded_rect(draw, xy, r, fill, outline=None, width=2):
    draw.rounded_rectangle(xy, radius=r, fill=fill, outline=outline, width=width)

def wrap_lines(text, font, maxw, draw):
    words = text.split()
    if not words: return []
    lines, cur = [], ""
    for w in words:
        test = (cur + " " + w).strip()
        bbox = draw.textbbox((0,0), test, font=font)
        if bbox[2]-bbox[0] > maxw and cur:
            lines.append(cur); cur = w
        else:
            cur = test
    if cur: lines.append(cur)
    return lines

def draw_node(draw, cx, cy, label, color_key, shape="rect"):
    fill, text_color = COLORS.get(color_key, ("#888","#fff"))
    if shape in ("óvalo", "oval"):
        w, h = OVAL_W, OVAL_H
        draw.ellipse((cx-w//2, cy-h//2, cx+w//2, cy+h//2),
                     fill=fill, outline="#222", width=3)
    else:
        w, h = NODE_W, NODE_H
        rounded_rect(draw, (cx-w//2, cy-h//2, cx+w//2, cy+h//2),
                     NODE_R, fill, outline="#222", width=3)
    # Escoge fuente según largo
    if len(label) > 60:
        font = FONT_NODE_XS
    elif len(label) > 30:
        font = FONT_NODE_SM
    else:
        font = FONT_NODE
    maxw_text = w - 40
    lines = wrap_lines(label, font, maxw_text, draw)
    line_h = font.size + 4
    total_h = line_h * len(lines)
    y = cy - total_h//2
    for ln in lines:
        bbox = draw.textbbox((0,0), ln, font=font)
        tw = bbox[2]-bbox[0]
        draw.text((cx - tw//2, y), ln, font=font, fill=text_color)
        y += line_h

def draw_arrow(draw, start, end, color="#444", width=4):
    x0,y0 = start; x1,y1 = end
    draw.line((x0,y0,x1,y1), fill=color, width=width)
    angle = math.atan2(y1-y0, x1-x0)
    head_len = 22; head_w = 12
    xb = x1 - head_len*math.cos(angle); yb = y1 - head_len*math.sin(angle)
    left = (xb - head_w*math.sin(angle), yb + head_w*math.cos(angle))
    right = (xb + head_w*math.sin(angle), yb - head_w*math.cos(angle))
    draw.polygon([(x1,y1), left, right], fill=color)

# === Load data ===
JSON_PATH = pathlib.Path("/home/coder/Kodem/docs/rulebook-source-of-truth/extractions/llm/p19.json")
data = json.loads(JSON_PATH.read_text())
ds = data["diagram_structure"]
phases = ds["phases"]

# === Layout strategy: 3 columnas verticales con flechas rectas. ===
COLS = 3

def phase_height(nodes):
    rows = (len(nodes) + COLS - 1) // COLS
    return 90 + 70 + rows * (NODE_H + ROW_GAP) + 60  # header + padding + nodos + footer

def draw_phase_block(d, x0, y0, w, h, phase_data):
    # Container
    rounded_rect(d, (x0, y0, x0+w, y0+h), 22, PHASE_BG,
                 outline=PHASE_BORDER, width=3)
    # Header band
    d.rectangle((x0, y0, x0+w, y0+90), fill="#2C2C2C")
    name = phase_data.get("name", "")
    d.text((x0 + 32, y0 + 20), name, font=FONT_PHASE, fill="#FFFFFF")

    nodes = phase_data.get("nodes", [])
    n = len(nodes)
    if n == 0: return

    # Grid positions: 3 columnas fijas, filas secuenciales.
    inner_y0 = y0 + 140
    col_centers = [x0 + w*(i+1)//(COLS+1) for i in range(COLS)]
    positions = []
    for i, node in enumerate(nodes):
        row = i // COLS
        col = i % COLS
        # última fila: si tiene menos items, centrar
        last_row = (n-1) // COLS
        if row == last_row:
            items_in_last = n - last_row*COLS
            if items_in_last < COLS:
                # centrar últimos nodos
                col_centers_last = [x0 + w*(i+1)//(items_in_last+1) for i in range(items_in_last)]
                cx = col_centers_last[col]
            else:
                cx = col_centers[col]
        else:
            cx = col_centers[col]
        cy = inner_y0 + row * (NODE_H + ROW_GAP) + NODE_H//2
        positions.append((cx, cy, node))

    # Draw arrows ANTES de nodos: cada i → i+1
    for i in range(n-1):
        (x0n, y0n, _) = positions[i]
        (x1n, y1n, _) = positions[i+1]
        same_row = (i // COLS) == ((i+1) // COLS)
        if same_row:
            # horizontal corta
            if x1n > x0n:
                draw_arrow(d, (x0n + NODE_W//2 + 8, y0n),
                           (x1n - NODE_W//2 - 8, y1n), color="#555", width=5)
            else:
                draw_arrow(d, (x0n - NODE_W//2 - 8, y0n),
                           (x1n + NODE_W//2 + 8, y1n), color="#555", width=5)
        else:
            # cambio de fila: salimos hacia abajo, bajamos, entramos arriba
            # ruta ortogonal con codo en y_mid
            y_mid = (y0n + NODE_H//2 + y1n - NODE_H//2) // 2
            x_out = x0n
            x_in = x1n
            d.line((x_out, y0n + NODE_H//2 + 4, x_out, y_mid), fill="#555", width=5)
            d.line((x_out, y_mid, x_in, y_mid), fill="#555", width=5)
            d.line((x_in, y_mid, x_in, y1n - NODE_H//2 - 4), fill="#555", width=5)
            # cabeza
            draw_arrow(d, (x_in, y1n - NODE_H//2 - 20),
                       (x_in, y1n - NODE_H//2 - 4), color="#555", width=5)

    # Dibujar nodos encima
    for (cx, cy, node) in positions:
        draw_node(d, cx, cy, node["label"], node["color"], node.get("shape","rect"))

# === Compute heights ===
PHASE_KEYS = ["fase_previa","fase_de_batalla","fase_post","fase_de_equipo","fin_de_turno"]
phase_heights = {k: phase_height(phases[k]["nodes"]) for k in PHASE_KEYS}
pasar_nodes = phases["pasar_turno"]["nodes"]
pasar_h = phase_height(pasar_nodes) + 180  # + header extra con nota

total_phases_h = sum(phase_heights.values()) + PHASE_GAP*(len(PHASE_KEYS)-1)
H = TITLE_H + 30 + LEGEND_H + 30 + total_phases_h + PHASE_GAP + pasar_h + 140
print(f"Canvas: {W}x{H}")

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# === Header ===
d.rectangle((0,0,W,TITLE_H), fill="#2C2C2C")
title = "Kódem TCG — Estructura de Turno (§5.2)"
bbox = d.textbbox((0,0), title, font=FONT_TITLE)
d.text(((W - (bbox[2]-bbox[0]))//2, 24), title, font=FONT_TITLE, fill="#FFFFFF")
subtitle = "Reconstrucción del diagrama p19 · Master Rulebook v5.1 · pass 5 FINAL-ULTRA · 52 nodos"
bbox = d.textbbox((0,0), subtitle, font=FONT_SUBTITLE)
d.text(((W - (bbox[2]-bbox[0]))//2, 98), subtitle, font=FONT_SUBTITLE, fill="#E0E0E0")

# === Leyenda ===
ly0 = TITLE_H + 30
rounded_rect(d, (MARGIN, ly0, W-MARGIN, ly0+LEGEND_H-40),
             20, "#FFFFFF", outline=PHASE_BORDER, width=3)
d.text((MARGIN+32, ly0+22), "LEYENDA DE COLORES (verbatim)",
       font=FONT_LEGEND_B, fill="#2C2C2C")

# Distribuir leyenda en 2 columnas
col_x = [MARGIN+40, W//2+40]
mid = (len(LEGEND_ORDER)+1)//2
cols_legend = [LEGEND_ORDER[:mid], LEGEND_ORDER[mid:]]
for ci, col in enumerate(cols_legend):
    for i, (key, label) in enumerate(col):
        sy = ly0 + 90 + i*60
        fill, _ = COLORS[key]
        if key == "rosa":
            d.ellipse((col_x[ci], sy, col_x[ci]+80, sy+40),
                      fill=fill, outline="#111", width=2)
        else:
            rounded_rect(d, (col_x[ci], sy, col_x[ci]+80, sy+40),
                         8, fill, outline="#111", width=2)
        d.text((col_x[ci]+100, sy+6),
               f"{key.upper():<10} → {label}",
               font=FONT_LEGEND, fill="#2C2C2C")

d.text((MARGIN+40, ly0+LEGEND_H-78),
       "Forma: rectángulos redondeados = nodos estándar  ·  óvalos = nodos de acción/costo clave",
       font=FONT_NOTE, fill="#555")

# === Fases ===
current_y = ly0 + LEGEND_H + 20
x0 = MARGIN
w_ph = W - 2*MARGIN
for k in PHASE_KEYS:
    h = phase_heights[k]
    draw_phase_block(d, x0, current_y, w_ph, h, phases[k])
    # flecha entre fases
    if k != PHASE_KEYS[-1]:
        mid_x = x0 + w_ph//2
        draw_arrow(d, (mid_x, current_y + h + 4),
                   (mid_x, current_y + h + PHASE_GAP - 4),
                   color="#2C2C2C", width=6)
    current_y += h + PHASE_GAP

# === Pasar Turno ===
py0 = current_y
rounded_rect(d, (MARGIN, py0, W-MARGIN, py0+pasar_h), 22, PASAR_BG,
             outline="#B88900", width=4)
d.rectangle((MARGIN, py0, W-MARGIN, py0+90), fill="#B88900")
d.text((MARGIN+32, py0+20), "⟶ PASAR TURNO (flujo horizontal alternativo)",
       font=FONT_PHASE, fill="#FFFFFF")

note_line = ("Flujo INDEPENDIENTE en paralelo al turno normal. Se activa desde Fase Previa y termina "
             "en Fin de Turno. Solo permite resolver efectos con costo/condición de 'pasar turno'.")
lines_note = wrap_lines(note_line, FONT_NOTE, W-2*MARGIN-80, d)
ny = py0 + 110
for ln in lines_note:
    d.text((MARGIN+40, ny), ln, font=FONT_NOTE, fill="#4A3500")
    ny += 28

# nodos en grid de 3 col, zigzag NO — solo vertical top-down
inner_y0 = ny + 30
col_centers = [MARGIN + w_ph*(i+1)//(COLS+1) for i in range(COLS)]
pn = len(pasar_nodes)
positions_p = []
for i, node in enumerate(pasar_nodes):
    row = i // COLS
    col = i % COLS
    last_row = (pn-1) // COLS
    if row == last_row:
        items_in_last = pn - last_row*COLS
        if items_in_last < COLS:
            col_centers_last = [MARGIN + w_ph*(i+1)//(items_in_last+1) for i in range(items_in_last)]
            cx = col_centers_last[col]
        else:
            cx = col_centers[col]
    else:
        cx = col_centers[col]
    cy = inner_y0 + row * (NODE_H + ROW_GAP) + NODE_H//2
    positions_p.append((cx, cy, node))

# Flechas pasar turno
for i in range(pn-1):
    x0n,y0n,_ = positions_p[i]
    x1n,y1n,_ = positions_p[i+1]
    same_row = (i // COLS) == ((i+1) // COLS)
    if same_row:
        if x1n > x0n:
            draw_arrow(d, (x0n + NODE_W//2 + 8, y0n),
                       (x1n - NODE_W//2 - 8, y1n), color="#8B6500", width=5)
        else:
            draw_arrow(d, (x0n - NODE_W//2 - 8, y0n),
                       (x1n + NODE_W//2 + 8, y1n), color="#8B6500", width=5)
    else:
        y_mid = (y0n + NODE_H//2 + y1n - NODE_H//2) // 2
        x_out, x_in = x0n, x1n
        d.line((x_out, y0n + NODE_H//2 + 4, x_out, y_mid), fill="#8B6500", width=5)
        d.line((x_out, y_mid, x_in, y_mid), fill="#8B6500", width=5)
        d.line((x_in, y_mid, x_in, y1n - NODE_H//2 - 4), fill="#8B6500", width=5)
        draw_arrow(d, (x_in, y1n - NODE_H//2 - 20),
                   (x_in, y1n - NODE_H//2 - 4), color="#8B6500", width=5)

for (cx, cy, node) in positions_p:
    draw_node(d, cx, cy, node["label"], node["color"], node.get("shape","rect"))

# === Footer ===
fy = H - 100
d.rectangle((0, fy, W, H), fill="#2C2C2C")
d.text((MARGIN, fy+20),
       "Fuente: master-rulebook-v5.1.json · Consolidación Opus 4.7 · pass 5 FINAL-ULTRA (2026-04-19) · 52 nodos · confidence 0.98",
       font=FONT_FOOTER, fill="#E0E0E0")
d.text((MARGIN, fy+56),
       "Validación pendiente: Ramsés D'León · Status: CANONICAL_FINAL",
       font=FONT_FOOTER, fill="#AAAAAA")

OUT = pathlib.Path("/home/coder/Kodem/docs/rulebook-source-of-truth/p19-logos-render.png")
img.save(OUT, optimize=True, quality=95)
print(f"✅ Saved {OUT} · {img.size} · {OUT.stat().st_size/1024:.1f} KB")
