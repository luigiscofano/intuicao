import random,json,itertools,time
R=random.Random(8030)
def canon(cs):
 x=min(x for x,y in cs); y=min(y for x,y in cs)
 return tuple(sorted((a-x,b-y) for a,b in cs))
def valid(cs):
 n=len(cs);sx=sum(x*2 for x,y in cs);sy=sum(y*2 for x,y in cs)
 if sx%n or sy%n:return False
 x,y=sx//n,sy//n
 if x%2 and y%2:return False
 return (x//2,y//2) in cs and ((x+1)//2,(y+1)//2) in cs
shapes=set()
for trial in range(180000):
 cs={(0,0)}
 for n in range(1,R.randint(7,21)):
  a,b=R.choice(tuple(cs));dx,dy=R.choice(((1,0),(-1,0),(0,1),(0,-1)));cs.add((a+dx,b+dy))
  if len(cs)>=5 and valid(cs):shapes.add(canon(cs))
for w in range(1,11):
 for h in range(1,11):
  if (w%2 or h%2) and w*h<=25:shapes.add(tuple((x,y) for x in range(w) for y in range(h)))
print('shapes',len(shapes),flush=True)
def compose(n,seed):
 rng=random.Random(seed);options=[[] for i in range(n*n)];records=[]
 for sh in shapes:
  w=max(x for x,y in sh)+1;h=max(y for x,y in sh)+1
  if w>n or h>n:continue
  area=len(sh); nonrect=area<w*h
  if not nonrect and min(w,h)>1 and area>9:continue
  for dx in range(n-w+1):
   for dy in range(n-h+1):
    cells=tuple((y+dy)*n+x+dx for x,y in sh);mask=sum(1<<c for c in cells)
    rec=(mask,cells,nonrect,area);j=len(records);records.append(rec)
    for c in cells:options[c].append(j)
 full=(1<<(n*n))-1;nodes=0
 def dfs(used,out,singles):
  nonlocal nodes
  nodes+=1
  if nodes>40000:return None
  if used==full:return out
  # first empty creates irregular seams; shape priorities random but favour area and asymmetry
  c=next(i for i in range(n*n) if not used>>i&1)
  opts=[j for j in options[c] if not records[j][0]&used and (records[j][3]>1 or singles<2)]
  opts.sort(key=lambda j: -(records[j][3]**.6*(1.5 if records[j][2] else .5)*rng.uniform(.5,1.8)))
  for j in opts:
   rec=records[j];res=dfs(used|rec[0],out+[rec[1]],singles+(rec[3]==1))
   if res:return res
  return None
 res=dfs(0,[],0)
 if not res:return None
 a=[-1]*(n*n);supports=[]
 for k,cs in enumerate(res):
  for c in cs:a[c]=k
  supports.append({'id':k,'x2':sum(2*(c%n) for c in cs)//len(cs),'y2':sum(2*(c//n) for c in cs)//len(cs)})
 return {'rows':n,'cols':n,'supports':supports,'answer':a,'seed':seed}
all=[]
for n,count in [(7,6),(8,9),(9,5),(10,5)]:
 for k in range(count):
  for attempt in range(10):
   v=compose(n,10000*n+100*k+attempt)
   if v:break
  if not v:raise Exception((n,k))
  all.append(v);print(n,k,len(v['supports']),flush=True)
json.dump(all,open('tests/prumo80-build-compositions.json','w'))
