#!/bin/bash
BASE=/home/coder/Kodem/docs/rulebook-source-of-truth
export TESSDATA_PREFIX=$HOME/.local/share/tessdata
export LD_LIBRARY_PATH=$HOME/.local/lib:$LD_LIBRARY_PATH
TESS=$HOME/.local/bin/tesseract

for png in $BASE/pages/p??.png; do
    name=$(basename "$png" .png)  # p01, p02, ...
    out="$BASE/extractions/ocr/$name"
    # Si ya existe, skip
    [ -f "$out.txt" ] && continue
    $TESS "$png" "$out" -l spa+eng 2>/dev/null
    echo "$name: done" >> $BASE/extractions/ocr/_progress.txt
done
echo "OCR completo" >> $BASE/extractions/ocr/_progress.txt
