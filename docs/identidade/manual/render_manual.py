"""Renderiza a fonte editorial local; não modifica o runtime do site."""
from pathlib import Path
from weasyprint import HTML

pasta = Path(__file__).resolve().parent
HTML(filename=str(pasta / "manual.html")).write_pdf(pasta / "Intuicao_Manual_da_Marca_2026.pdf")
