#!/bin/sh
# Pakker ett casefragment i en tilordning så node --check kan lese det.
# Fragmentet er et bart objektliteral og parser ikke alene.
f="$1"
tmp="$(mktemp -t casefrag).js"
{ printf 'window = {}; window.EDU_DATA = { cases: [] };\nwindow.EDU_DATA.cases.push(\n'; cat "$f"; printf '\n);\n'; } > "$tmp"
node --check "$tmp" && echo "  $f: parser"
rm -f "$tmp"
