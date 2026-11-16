from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import Paragraph
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from pathlib import Path
R=Path(__file__).parent
for n in ['Sans400','Sans600','Serif600']:pdfmetrics.registerFont(TTFont(n,str(R/'fontes'/(n+'.ttf'))))
pdfmetrics.registerFontFamily('Sans400',normal='Sans400',bold='Sans600',italic='Sans400',boldItalic='Sans600')
W,H=595.276,841.89
c=canvas.Canvas(str(R/'pdf/Intuicao_Manuais_Visuais_19_Jogos.pdf'),pagesize=(W,H));c.setTitle('Intuição | Manuais visuais dos 19 jogos');c.setAuthor('Luigi Scofano de Araujo')
INK='#30412f';GREEN='#39654c';BLUE='#244b63';GOLD='#cca034'
def rect(x,y,w,h,col,r=0):
 c.setFillColor(HexColor(col));c.setStrokeColor(HexColor(col))
 if r:c.roundRect(x,H-y-h,w,h,r,stroke=0,fill=1)
 else:c.rect(x,H-y-h,w,h,stroke=0,fill=1)
def txt(s,x,y,size=12,font='Sans400',color=INK):
 c.setFillColor(HexColor(color));c.setFont(font,size);c.drawString(x,H-y-size*.82,s)
def para(s,x,y,w,size=12,leading=None):
 p=Paragraph(s,ParagraphStyle('p',fontName='Sans400',fontSize=size,leading=leading or size*1.32,textColor=HexColor(INK)));_,h=p.wrap(w,500);p.drawOn(c,x,H-y-h);return h
def image(f,x,y,w,h):c.drawImage(str(f),x,H-y-h,w,h,preserveAspectRatio=True,anchor='c',mask='auto')
def base(game,tag,lead,n):
 rect(0,0,W,H,'#fffefa');image(R/'fontes/logo.png',45,39,110,28)
 txt('MANUAIS VISUAIS · PARA IMPRIMIR',364,48,8,'Sans600',BLUE)
 txt(tag,45,91,9,'Sans600',BLUE);txt(game,45,111,39,'Serif600');image(R/'diagramas/tile.png',505,104,42,42)
 para(lead,45,170,500,16)
 txt('Intuição · Luigi Scofano de Araujo',45,805,8,color='#60705f');txt(f'Exemplos didáticos · A4 · {n:02}/19',424,805,8,color='#60705f')
def step(n,title,body,y):
 rect(45,y,23,23,BLUE,4);txt(str(n),53,y+4,13,'Sans600','#ffffff');txt(title,80,y,15,'Sans600');return y+22+para(body,80,y+22,464,12)
def note(title,body,y):
 h=para_measure(body,460,11.5)+42;rect(45,y,505,h,'#fbf3db',5);rect(45,y,3,h,GOLD);txt(title,59,y+12,12,'Sans600');para(body,59,y+32,477,11.5)
def para_measure(s,w,size):
 p=Paragraph(s,ParagraphStyle('p',fontName='Sans400',fontSize=size,leading=size*1.32));return p.wrap(w,500)[1]

def render_pulso():
 base('Pulso','RACIOCÍNIO LÓGICO / RITMO E CONTAGEM','Três batidas por linha. Dois intervalos iguais.',8)
 rect(45,211,505,255,'#f5f6ef',7);image(R/'diagramas/pulso-normal.png',51,219,274,232)
 txt('Leia a grade',348,233,16,'Serif600')
 para('<b>Acima:</b> cada número indica o total de batidas da coluna.',348,265,184,11.5)
 para('<b>Na linha 1:</b> A → C → E. São dois passos entre cada batida.',348,318,184,11.5)
 para('<b>Nas linhas 2 e 3:</b> B → C → D. Um passo também vale.',348,371,184,11.5)
 txt('Exemplo completo e válido',348,429,10,'Sans600',GREEN)
 y=488
 y=step(1,'Conte até três','Em cada linha, marque exatamente três casas como batida.',y)+16
 y=step(2,'Compare os intervalos','A distância da primeira à segunda deve ser igual à da segunda à terceira. Cada linha pode ter seu próprio intervalo.',y)+16
 y=step(3,'Feche a solução','Respeite as cotas das colunas e as pistas fixas. Marque todas as demais casas com × antes de confirmar.',y)+18
 note('Não basta completar 3/3','Três batidas com intervalos diferentes não resolvem a linha. O pino indica uma pista fixa: ela não pode ser alterada.',y)

def render_renovo():
 base('Renovo','RACIOCÍNIO LÓGICO / CONEXÕES','Uma semente, um botão, uma folha. Um trio com uma curva.',12)
 rect(45,221,505,251,'#f5f6ef',7);image(R/'diagramas/renovo-before.png',52,225,228,212);image(R/'diagramas/renovo-after.png',317,225,228,212)
 txt('→',284,326,25,'Sans400',BLUE);txt('01 · Encontre as três peças',72,446,11,'Sans600',BLUE);txt('02 · Ligue formando um L',333,446,11,'Sans600',BLUE)
 txt('Semente = verde  ·  Botão = amarelo  ·  Folha = azul',132,203,10,'Sans600')
 y=491
 y=step(1,'Comece por uma ponta','Arraste da semente ou da folha até o botão. Se quiser, vire no botão e siga até a outra ponta.',y)+14
 y=step(2,'Faça uma curva de 90°','Cada botão se liga a uma semente e a uma folha. Os trechos são retos, na horizontal ou na vertical.',y)+14
 y=step(3,'Use todas as peças','Cada peça pertence a um único trio. A ligação termina na primeira peça encontrada: não pode atravessar outra.',y)+17
 note('Sem cruzamentos','As linhas não cruzam nem se sobrepõem. Só os dois trechos do mesmo trio se encontram no botão. Você também pode ligar duas peças alinhadas com dois cliques.',y)

def render_cerco():
 base('Cerco','VERSUS / CAMINHOS E BLOQUEIOS','Mova uma peça. Feche uma casa. Preserve uma saída.',15)
 rect(45,221,505,251,'#f5f6ef',7);image(R/'diagramas/cerco-before.png',56,225,220,212);image(R/'diagramas/cerco-after.png',321,225,220,212)
 txt('→',284,326,25,'Sans400',BLUE);txt('01 · A peça desce uma casa',69,446,11,'Sans600',BLUE);txt('02 · A origem vira barreira',332,446,11,'Sans600',BLUE)
 txt('Jogador 1 = verde  ·  Jogador 2 = âmbar',168,203,10,'Sans600')
 y=491
 y=step(1,'Escolha uma peça sua','Cada jogador tem três peças. Mova uma delas exatamente uma casa para cima, baixo, esquerda ou direita.',y)+14
 y=step(2,'Confira e confirme','O destino precisa estar livre. Após a confirmação, a origem fica bloqueada para os dois jogadores até o fim da partida.',y)+14
 y=step(3,'Deixe o rival sem movimentos','Na vez do adversário, se nenhuma das três peças dele puder se mover, você venceu. Uma peça presa sozinha não encerra a partida.',y)+17
 note('Sem diagonal, salto ou captura','Não é permitido passar a vez. Os números 1 e 2 identificam as equipes neste diagrama; no site, elas aparecem com os mascotes. O movimento é o mesmo.',y)

import json
rows=json.loads((R/'conteudo.json').read_text())
for row in rows:
 id=row['id']
 if id in ['pulso','renovo','cerco']:
  globals()['render_'+id]()
 else:
  base(row['nome'],row['categoria'].upper()+' / GUIA DE JOGO',row['objetivo'],row['numero'])
  rect(45,222,505,260,'#f5f6ef',7)
  image(R/'diagramas'/f'{id}.png',58,230,479,244)
  y=502
  for i,s in enumerate(row['passos']):
   y=step(i+1,s['titulo'],s['texto'],y)+13
  y+=3
  needed=para_measure(row['atencao'],460,11.5)+42
  if y+needed>790:raise ValueError(f"Página {id} excede rodapé: {y+needed}")
  note(row['atencao_titulo'],row['atencao'],y)
 c.showPage()
c.save()
