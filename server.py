"""Local preview: python3 server.py (PORT defaults to 8080)."""
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


class Site(SimpleHTTPRequestHandler):
    def do_HEAD(self):
        if self.route():
            super().do_HEAD()

    def do_GET(self):
        if self.route():
            super().do_GET()

    def route(self):
        path = urlsplit(self.path).path
        if path == '/check/':
            self.send_response(302)
            self.send_header('Location', '../check')
            self.end_headers()
            return False
        if path in ('/', '/check'):
            self.path = '/index.html'
        elif path not in ('/index.html', '/style.css', '/app.js', '/planner.js', '/tutor.js', '/library.js', '/olympiad.js', '/locales/catalog.js', '/locales/language.js', '/bank.js', '/assets/favicon.svg', '/assets/apple-touch-icon.png') and not (
            path.startswith('/assets/') and Path(path).parent.as_posix() == '/assets'
            and path.endswith(('.jpg', '.woff2')) and '%' not in path
        ):
            self.send_error(404)
            return False
        return True


if __name__ == '__main__':
    handler = partial(Site, directory=Path(__file__).resolve().parent)
    ThreadingHTTPServer(('0.0.0.0', int(os.getenv('PORT', '8080'))), handler).serve_forever()
