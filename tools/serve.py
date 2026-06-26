#!/usr/bin/env python3
"""
Local server for the SAM3 learning platform.

Run it, then open http://127.0.0.1:4178/ in your browser.

It serves this folder (index.html is the app) and makes the exam manual
reachable so the platform can load the whole curriculum automatically
(no file-picker needed).
"""
import os
import shutil
import sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 4178

# Make the manual reachable from the app's origin. The manual normally lives one
# directory up (next to this project). Copy it in once so fetch("SAM3_Eksamensmanual.html")
# works; harmless if it is already here.
_parent_manual = os.path.join(os.path.dirname(ROOT), "SAM3_Eksamensmanual.html")
_local_manual = os.path.join(ROOT, "SAM3_Eksamensmanual.html")
if os.path.exists(_parent_manual) and not os.path.exists(_local_manual):
    try:
        shutil.copy(_parent_manual, _local_manual)
        print("Kopierte eksamensmanualen inn i appmappen.")
    except OSError:
        pass


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *a, **k):
        super().__init__(*a, directory=ROOT, **k)

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    print(f"SAM3-plattformen kjører på  →  http://127.0.0.1:{PORT}/")
    print("Trykk Ctrl+C for å stoppe.")
    try:
        HTTPServer(("127.0.0.1", PORT), Handler).serve_forever()
    except KeyboardInterrupt:
        print("\nStoppet.")
