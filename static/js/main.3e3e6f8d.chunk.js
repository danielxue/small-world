(this["webpackJsonpsmall-world"]=this["webpackJsonpsmall-world"]||[]).push([[0],{20:function(t,e,s){},26:function(t,e,s){},28:function(t,e,s){"use strict";s.r(e);var n=s(1),r=s.n(n),a=s(14),i=s.n(a),c=(s(20),s(3)),o=s(4),l=s(6),h=s(5),u=s(2),p=s.n(u),d=s(7),j=s(8),b=s(11),f=s.n(b),g=s(15),v=s.n(g),x=(s(26),s(0)),O=function(t){Object(l.a)(s,t);var e=Object(h.a)(s);function s(){return Object(c.a)(this,s),e.apply(this,arguments)}return Object(o.a)(s,[{key:"colorOfVertex",value:function(t){var e,s=Object(d.a)(this.props.initialVertexColors);try{for(s.s();!(e=s.n()).done;){var n=e.value;if(n.i===t)return n.color}}catch(r){s.e(r)}finally{s.f()}return"black"}},{key:"colorOfEdge",value:function(t){var e,s=Object(d.a)(this.props.initialEdgeColors);try{for(s.s();!(e=s.n()).done;){var n=e.value;if(n.edge.i===t.i&&n.edge.j===t.j||n.edge.j===t.i&&n.edge.i===t.j)return n.color}}catch(r){s.e(r)}finally{s.f()}return"black"}},{key:"renderAdjListTable",value:function(){var t=this,e=this.props.adjList.map((function(e,s){var n=e.map((function(e,n){return Object(x.jsx)("td",{style:{color:t.colorOfEdge({i:s,j:e})},children:e},s+"-"+n)}));return Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{style:{color:t.colorOfVertex(s)},children:s},s+"-label"),n]},""+s)}));return Object(x.jsx)("table",{children:Object(x.jsx)("tbody",{children:e})})}},{key:"renderDiagram",value:function(){for(var t=[],e=0;e<this.props.n;e++)t.push(Object(x.jsx)("button",{className:"vertex vertex-"+e,style:{background:this.colorOfVertex(e)}}));for(var s=[],n=0;n<this.props.n;n++){var r,a=Object(d.a)(this.props.adjList[n].slice(0,this.props.k/2));try{for(a.s();!(r=a.n()).done;){var i=r.value;s.push(Object(x.jsx)(f.a,{className:"edge",from:"vertex-"+n,to:"vertex-"+i,borderColor:this.colorOfEdge({i:n,j:i}),borderWidth:3},"edge-"+n+","+i))}}catch(h){a.e(h)}finally{a.f()}}var c,o=Object(d.a)(this.props.ghostEdges);try{for(o.s();!(c=o.n()).done;){var l=c.value;s.push(Object(x.jsx)(f.a,{className:"edge",from:"vertex-"+l.edge.i,to:"vertex-"+l.edge.j,borderColor:l.color,borderWidth:3},"edge-"+l.edge.i+","+l.edge.j))}}catch(h){o.e(h)}finally{o.f()}return Object(x.jsxs)("div",{className:"graph",children:[Object(x.jsx)("div",{className:"vertices",children:Object(x.jsx)(v.a,{r:256,children:t})}),Object(x.jsx)("div",{className:"edges",children:s})]})}},{key:"render",value:function(){return Object(x.jsx)("div",{children:Object(x.jsx)("div",{className:"diagram",children:this.renderDiagram()})})}}]),s}(r.a.Component),y=function(t){Object(l.a)(s,t);var e=Object(h.a)(s);function s(){return Object(c.a)(this,s),e.apply(this,arguments)}return Object(o.a)(s,[{key:"render",value:function(){return Object(x.jsx)("div",{className:"stat-bar",children:Object(x.jsx)("table",{children:Object(x.jsxs)("tbody",{children:[Object(x.jsxs)("tr",{children:[Object(x.jsx)("th",{children:"Length (L)"}),Object(x.jsx)("th",{children:"Clustering (C)"})]}),Object(x.jsxs)("tr",{children:[Object(x.jsx)("td",{children:-1!==this.props.L?this.props.L:"Calculating"}),Object(x.jsx)("td",{children:-1!==this.props.C?this.props.C:"Calculating"})]})]})})})}}]),s}(r.a.Component),k=function(t){Object(l.a)(s,t);var e=Object(h.a)(s);function s(t){var n;return Object(c.a)(this,s),(n=e.call(this,t)).state={delay:{gen:n.props.delay,calcL:n.props.delay,calcC:n.props.delay},adjList:[],vertexColors:[],edgeColors:[],ghostEdges:[],stats:{L:-1,C:-1},stage:""},n}return Object(o.a)(s,[{key:"generate",value:function(){var t=Object(j.a)(p.a.mark((function t(){var e,s,n,r,a,i,c,o,l,h,u,j,b,f,g,v,x=this;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(e=[],s=0;s<this.props.n;s++){for(e.push(Array(this.props.k)),n=0;n<this.props.k/2;n++)e[s][n]=(s+n+1)%this.props.n;for(r=0;r<this.props.k/2;r++)e[s][r+this.props.k/2]=(s-r-1+this.props.n)%this.props.n}this.setState({adjList:e,stage:"Generating"}),a=0;case 4:if(!(a<this.props.k/2)){t.next=25;break}i=0;case 6:if(!(i<this.props.n)){t.next=22;break}if(c=e[i][a],o=c,Math.random()<this.props.p){l=[i].concat(e[i]).sort((function(t,e){return t-e})),o=Math.floor(Math.random()*(this.props.n-l.length)),h=Object(d.a)(l);try{for(h.s();!(u=h.n()).done;)j=u.value,o>=j&&o++}catch(p){h.e(p)}finally{h.f()}b=e[c].indexOf(i),e[c].splice(b,1),e[i][a]=o,e[o].push(i)}if(0===this.state.delay.gen){t.next=19;break}return f=[{i:i,color:"green"},{i:c,color:"red"}],c===o?f[1].color="green":f.push({i:o,color:"green"}),g=[{edge:{i:i,j:o},color:"green"}],v=[],c!==o&&v.push({edge:{i:i,j:c},color:"red"}),this.setState({adjList:e,vertexColors:f,edgeColors:g,ghostEdges:v}),t.next=19,new Promise((function(t){return setTimeout(t,1e3*x.state.delay.gen)}));case 19:i++,t.next=6;break;case 22:a++,t.next=4;break;case 25:this.setState({adjList:e,vertexColors:[],edgeColors:[],ghostEdges:[]});case 26:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"bfs",value:function(t,e){var s=[t],n=Array(this.props.n).fill(!1);n[t]=!0;var r=Array(this.props.n).fill(-1);for(r[t]=-1;s.length>0;){var a=s.shift();if(a===e)break;var i,c=Object(d.a)(this.state.adjList[a]);try{for(c.s();!(i=c.n()).done;){var o=i.value;n[o]||(s.push(o),n[o]=!0,r[o]=a)}}catch(u){c.e(u)}finally{c.f()}}for(var l=[],h=e;-1!==r[h];)l.push(h),h=r[h];return l.push(h),l}},{key:"calculateL",value:function(){var t=Object(j.a)(p.a.mark((function t(){var e,s,n,r,a,i,c,o,l,h=this;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:this.setState({stage:"Calculating L"}),e=0,s=0,n=0;case 4:if(!(n<this.props.n-1)){t.next=22;break}r=n+1;case 6:if(!(r<this.props.n)){t.next=19;break}if(1!==(a=this.bfs(n,r)).length&&(e++,s+=a.length-1),0===this.state.delay.calcL){t.next=16;break}for(i=[{i:a[0],color:"green"}],c=[],o=1;o<a.length;o++)i.push({i:a[o],color:"green"}),c.push({edge:{i:a[o-1],j:a[o]},color:"green"});return this.setState({vertexColors:i,edgeColors:c}),t.next=16,new Promise((function(t){return setTimeout(t,1e3*h.state.delay.calcL)}));case 16:r++,t.next=6;break;case 19:n++,t.next=4;break;case 22:l=Math.round(s/e*100)/100,this.setState({stats:{L:l,C:this.state.stats.C},vertexColors:[],edgeColors:[]});case 24:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"calculateC",value:function(){var t=Object(j.a)(p.a.mark((function t(){var e,s,n,r,a,i,c,o,l;return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:for(this.setState({stage:"Calculating C"}),e=0,s=0,n=0;n<this.props.n;n++)if(r=this.state.adjList[n].length,0!==(a=r*(r-1)/2)){for(i=0,c=0;c<r-1;c++)for(o=c+1;o<r;o++)-1!==this.state.adjList[c].indexOf(o)&&i++;e++,s+=i/a}l=Math.round(s/e*100)/100,this.setState({stats:{L:this.state.stats.L,C:l},vertexColors:[],edgeColors:[]});case 6:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"calculate",value:function(){var t=Object(j.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.calculateL();case 2:return t.next=4,this.calculateC();case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){return Object(x.jsxs)("div",{className:"graph-generator",children:[this.state.stage.includes("Calculating")&&Object(x.jsx)(y,{L:this.state.stats.L,C:this.state.stats.C}),""!==this.state.stage&&Object(x.jsx)(O,{n:this.props.n,k:this.props.k,adjList:this.state.adjList,initialVertexColors:this.state.vertexColors,initialEdgeColors:this.state.edgeColors,ghostEdges:this.state.ghostEdges},"graph"+this.props.n)]})}},{key:"componentDidMount",value:function(){var t=Object(j.a)(p.a.mark((function t(){return p.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.generate();case 2:return t.next=4,this.calculate();case 4:case"end":return t.stop()}}),t,this)})));return function(){return t.apply(this,arguments)}}()}]),s}(r.a.Component),C=s(9),m=s(12),L=function(t){Object(l.a)(s,t);var e=Object(h.a)(s);function s(t){var n;return Object(c.a)(this,s),(n=e.call(this,t)).state={input:{n:String(n.props.initialInput.n),k:String(n.props.initialInput.k),p:String(n.props.initialInput.p),delay:String(n.props.initialInput.delay)}},n}return Object(o.a)(s,[{key:"handleInputChange",value:function(t){t.persist(),this.setState((function(e){return{input:Object(m.a)(Object(m.a)({},e.input),{},Object(C.a)({},t.target.name,t.target.value))}}))}},{key:"update",value:function(){this.props.onSubmit({n:parseInt(this.state.input.n),k:parseInt(this.state.input.k),p:parseFloat(this.state.input.p),delay:parseFloat(this.state.input.delay)})}},{key:"render",value:function(){return Object(x.jsx)("div",{children:Object(x.jsxs)("form",{onSubmit:this.update.bind(this),children:[Object(x.jsxs)("label",{children:["n:",Object(x.jsx)("input",{type:"text",name:"n",value:this.state.input.n,onChange:this.handleInputChange.bind(this)})]}),Object(x.jsxs)("label",{children:["k:",Object(x.jsx)("input",{type:"text",name:"k",value:this.state.input.k,onChange:this.handleInputChange.bind(this)})]}),Object(x.jsxs)("label",{children:["p:",Object(x.jsx)("input",{type:"text",name:"p",value:this.state.input.p,onChange:this.handleInputChange.bind(this)})]}),Object(x.jsxs)("label",{children:["delay:",Object(x.jsx)("input",{type:"text",name:"delay",value:this.state.input.delay,onChange:this.handleInputChange.bind(this)})]}),Object(x.jsx)("label",{children:Object(x.jsx)("input",{type:"submit",name:"generate",value:"Generate",onChange:this.handleInputChange.bind(this)})})]})})}}]),s}(r.a.Component),S=function(t){Object(l.a)(s,t);var e=Object(h.a)(s);function s(t){var n;return Object(c.a)(this,s),(n=e.call(this,t)).state={key:1,input:{n:16,k:4,p:.5,delay:.1}},n}return Object(o.a)(s,[{key:"onSubmit",value:function(t){this.setState({key:this.state.key+1,input:t})}},{key:"render",value:function(){return Object(x.jsxs)("div",{children:[Object(x.jsx)(L,{initialInput:this.state.input,onSubmit:this.onSubmit.bind(this)}),Object(x.jsx)(k,{n:this.state.input.n,k:this.state.input.k,p:this.state.input.p,delay:this.state.input.delay})]},"app-"+this.state.key)}}]),s}(r.a.Component);i.a.render(Object(x.jsx)(r.a.StrictMode,{children:Object(x.jsx)(S,{})}),document.getElementById("root"))}},[[28,1,2]]]);
//# sourceMappingURL=main.3e3e6f8d.chunk.js.map