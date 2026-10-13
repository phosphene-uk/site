"""Bundle the review board for opening locally without a running server."""
from base64 import b64encode
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent


def embed_font(match: re.Match[str]) -> str:
    source = (ROOT / match.group(1)).resolve()
    encoded = b64encode(source.read_bytes()).decode('ascii')
    return f"url('data:font/woff2;base64,{encoded}')"


def main() -> None:
    html = (ROOT / 'index.html').read_text()
    css = re.sub(r"url\('([^']+\.woff2)'\)", embed_font, (ROOT / 'ident.css').read_text())
    html = html.replace('<link rel="stylesheet" href="ident.css">', f'<style>{css}</style>')
    html = html.replace('<script src="ident.js" defer></script>', '')
    html = html.replace('</body>', f"<script>{(ROOT / 'ident.js').read_text()}</script></body>")
    icon = b64encode((ROOT / '../../public/assets/favicon.svg').read_bytes()).decode('ascii')
    html = html.replace('../../public/assets/favicon.svg', f'data:image/svg+xml;base64,{icon}')
    (ROOT / 'preview.html').write_text(html)
    print('Wrote prototypes/ident/preview.html with embedded fonts, styles and animation.')


if __name__ == '__main__':
    main()
