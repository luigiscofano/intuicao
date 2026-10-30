# Category home

Home now reveals only three category controls. Selecting a category filters the existing direct-child cards (including their info controls); returning closes game routes through their existing save/cleanup methods. Game rules, campaign catalogs and saved progress formats are untouched. Landing home intentionally no longer auto-opens a previously active game.

URL query `category=intuicao|logica|versus` persists category views; `game=light|cut|elo|prumo|pacto|sintonia|repasse|orbita|desvio` opens the appropriate game's existing selection screen, including on reload. Back/forward restore these navigation views. No previous URL router existed. Existing saves remain available when opening levels.

QA: native browser desktop and 320px iframe. Three groups (2/6/1), all nine game buttons, info-button filtering, keyboard Enter, category return, browser back, reload Cut/Pacto verified. Home contains no visible game cards or level grid. At 320px body client/scroll width both305px (scrollbar consumes15px), no horizontal overflow. Existing manual-check400cases and JSON-import4games regression suites pass. Hero/fauna/footer/About assets and markup unchanged.
