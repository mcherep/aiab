(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{4573:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/audio",function(){return t(8645)}])},8645:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return C},default:function(){return S}});var i=t(5893),o=t(7294),s=t(9094),r=t(1232),a=t(1332),l=t(7414),d=t(5117),u=t(5296),c=t(7841),p=t(8247),m=t(9355),f=t(9834),h=t(3991);let x=e=>{let[n,t]=(0,o.useState)(null),[s,r]=(0,o.useState)(!1),[a,l]=(0,o.useState)(!1),d=(0,o.useRef)(e.ctx.createBufferSource());(0,o.useEffect)(()=>{t(null),fetch(e.audio).then(e=>e.arrayBuffer()).then(n=>e.ctx.decodeAudioData(n)).then(e=>{t(e)}).catch(e=>{t(null),console.error(e)})},[e.audio,e.ctx]);let u=t=>{n&&(t?(d.current=e.ctx.createBufferSource(),d.current.buffer=n,d.current.connect(e.ctx.destination),d.current.onended=()=>l(!1),d.current.start(),l(!0),r(!0)):(r(!1),a&&e.stoppable&&d.current.stop()))};return n?(0,i.jsx)(i.Fragment,{children:(0,i.jsx)(f.A,{sx:n=>({position:"fixed",left:e.x,top:e.y,color:a?"red":n.colors[n.primaryColor][6]}),onMouseEnter:()=>u(!0),onMouseLeave:()=>u(!1),children:(0,i.jsx)(h.AEM,{size:s?30:12})})}):null},g=e=>{let{audioData:n,ctx:t,stoppable:s}=e;return n&&n.length?(0,i.jsx)(i.Fragment,{children:n.map((e,n)=>(0,o.createElement)(x,{...e,ctx:t,stoppable:s,key:e.audio}))}):null};var y=t(4685),w=t(1261),b=t(8351),j=t(4619);let _=e=>{let{code:n}=e;return(0,i.jsx)(b.D,{rehypePlugins:[j.Z],components:{p:e=>(0,i.jsx)(d.x,{...e,style:{paddingTop:10,paddingBottom:10}}),a:e=>(0,i.jsx)(y.e,{...e}),code:e=>(0,i.jsx)(w.p,{language:"python",children:e.children[0]})},children:n})},v=e=>{let{uri:n,list:t,coords:f}=e,[h,x]=(0,o.useState)(""),[y,w]=(0,o.useState)(200),[b,j]=(0,o.useState)(!1),{width:v,height:C}=(0,m.n)(),S=(0,o.useRef)(new AudioContext),M=(0,o.useMemo)(()=>{if(""==h)return[];let e=e=>0==e?1e-6:e,i=f[h].map(e=>e[0]),o=f[h].map(e=>e[1]),s=e(i.reduce((e,n)=>Math.min(e,n))),r=e(i.reduce((e,n)=>Math.max(e,n))),a=e(o.reduce((e,n)=>Math.min(e,n))),l=e(o.reduce((e,n)=>Math.max(e,n))),d=e=>(e-s)/(r-s),u=e=>(e-a)/(l-a);return t[h].map((e,t)=>({sample:e,x:d(f[h][t][0])*(v-400)+200,y:u(f[h][t][1])*(C-400)+200,audio:n[h]+e}))},[n,t,f,h,v,C]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(s.M,{children:(0,i.jsxs)(r.Z,{grow:!0,children:[(0,i.jsx)(a.p,{data:[...Object.keys(n).map(e=>e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase()),""],value:h.slice(0,1).toUpperCase()+h.slice(1).toLowerCase(),label:"Sample Set",onChange:e=>x(e.currentTarget.value.toLowerCase()),style:{width:400}}),(0,i.jsxs)(l.x,{children:[(0,i.jsx)(d.x,{size:"sm",children:"Num. Samples"}),(0,i.jsx)(u.i,{min:Math.min(100,M.length),max:M.length,step:100,disabled:0==M.length,value:y,onChangeEnd:e=>w(e),style:{wifth:400}})]}),(0,i.jsx)(c.z,{size:"sm",variant:"gradient",onClick:()=>j(e=>!e),children:"Code for Audio Embedding"})]})}),(0,i.jsx)(g,{audioData:M.slice(0,y),ctx:S.current,stoppable:"vocal"==h}),(0,i.jsx)(p.u,{opened:b,onClose:()=>j(!1),title:"Code for embedding audio into 2D",sizer:"100%",children:(0,i.jsx)(_,{code:'First, install some dependencies and do our imports:\n\n```\n!pip3 install numpy scipy umap-learn soundfile wav2clip\n```\n\n```\nimport os\nimport numpy\nimport soundfile\nimport scipy.signal\nimport wav2clip\nimport ipywidgets\nimport umap\nfrom tqdm.auto import tqdm\n```\n\nNext, let\'s pick a subdirectory with audio files to embed:\n```\n# Alternatively, simply set it to the desired subdirectory\nw = ipywidgets.Dropdown(options=glob.glob("./*/"))\nw\n```\n\n\nWe assume there is a list of files to embed (named samples.txt). If not, this can be replaced with reading the relevant filenames directly (with os.listdir() for example).\n```\nf = w.value # Replace with just f = <subdirectory> if desired here instead\nwith open(os.path.join(f, "samples.txt")) as infile:\n    files = [os.path.join(f, file) for file in infile.read().splitlines()]\n    \nprint("Will embed %d files." % len(files))\n```\n\nFirst, we want to get useful high-dimensional embeddings. We\'ll use the Wav2CLIP model for this, just due to it\'s broad utility and simple API.\n```\ndef embed_file(file, model):\n    y, sr = soundfile.read(file) # Read file\n    if len(y.shape) > 1:\n        y = y.mean(axis=1) # Make mono if needed\n    audio = scipy.signal.resample(y, int((len(y)/sr) * 16000)).astype(numpy.float32) # Resample to 16kHz for Wav2CLIP input\n    return wav2clip.embed_audio(audio, model) # Return embedding\n```\n\nActually run the embedding function over the files:\n```\nmodel = wav2clip.get_model()\nembeddings = [embed_file(file, model) for file in tqdm(files)]\n```\n\nNow, we want to project these embeddings into two dimensions for visualization. We use the well-known UMAP algorithm, but you can subtitute some other manifold learning approach or another dimensionality reduction technique.\n```\nall_embeddings = numpy.vstack([x[0] for x in embeddings])\nt = umap.UMAP(\n    n_components=2,\n    min_dist=0.1,\n    a=0.05,\n    b=0.8,\n    spread=10\n)\n```\n\nSave output so we can use it in the frontend. That\'s it!\n```\ncoords = t.fit_transform(all_embeddings)\nnumpy.savetxt(os.path.join(f, "coords.txt"), coords, fmt="%.8f")\n```'})})]})};var C=!0,S=v}},function(e){e.O(0,[978,231,79,261,308,774,888,179],function(){return e(e.s=4573)}),_N_E=e.O()}]);