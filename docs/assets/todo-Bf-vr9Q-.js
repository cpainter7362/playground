import{r as o,j as t,R as S,a as E}from"./client-GwgkEzKu.js";/* empty css              *//**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),j=(...s)=>s.filter((r,l,i)=>!!r&&r.trim()!==""&&i.indexOf(r)===l).join(" ").trim();/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var T={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=o.forwardRef(({color:s="currentColor",size:r=24,strokeWidth:l=2,absoluteStrokeWidth:i,className:d="",children:n,iconNode:x,...m},h)=>o.createElement("svg",{ref:h,...T,width:r,height:r,stroke:s,strokeWidth:i?Number(l)*24/Number(r):l,className:j("lucide",d),...m},[...x.map(([p,b])=>o.createElement(p,b)),...Array.isArray(n)?n:[n]]));/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=(s,r)=>{const l=o.forwardRef(({className:i,...d},n)=>o.createElement(A,{ref:n,iconNode:r,className:j(`lucide-${$(s)}`,i),...d}));return l.displayName=`${s}`,l};/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]],R=g("Download",L);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],I=g("Pen",D);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]],P=g("Trash2",M),O=()=>{const[s,r]=o.useState([]),[l,i]=o.useState(""),[d,n]=o.useState(null),[x,m]=o.useState(""),[h,p]=o.useState("medium");o.useEffect(()=>{const e=localStorage.getItem("todos");if(e)try{r(JSON.parse(e))}catch(a){console.error("Error parsing stored todos:",a),r([])}},[]),o.useEffect(()=>{localStorage.setItem("todos",JSON.stringify(s))},[s]);const b=e=>{e.preventDefault();const a=l.trim();if(a){const c={id:Date.now(),text:a,completed:!1,priority:h,createdAt:new Date().toISOString()};r([...s,c]),i(""),p("medium")}},w=e=>{r(s.filter(a=>a.id!==e))},v=e=>{r(s.map(a=>a.id===e?{...a,completed:!a.completed}:a))},N=e=>{n(e.id),m(e.text)},f=e=>{const a=x.trim();a&&(r(s.map(c=>c.id===e?{...c,text:a}:c)),n(null),m(""))},k=()=>{window.confirm("Are you sure you want to clear all todos?")&&r([])},C=()=>{const e=s.map(y=>`- [${y.completed?"x":" "}] ${y.text} (Priority: ${y.priority})`).join(`
`),a=new Blob([e],{type:"text/markdown"}),c=URL.createObjectURL(a),u=document.createElement("a");u.href=c,u.download="todos.md",document.body.appendChild(u),u.click(),document.body.removeChild(u),URL.revokeObjectURL(c)};return t.jsx("div",{className:"container py-5",children:t.jsx("div",{className:"row justify-content-center",children:t.jsx("div",{className:"col-lg-8",children:t.jsx("div",{className:"card shadow-sm mb-5",children:t.jsxs("div",{className:"card-body p-4",children:[t.jsx("h1",{className:"card-title h3 mb-4",children:"Accessible Todo List"}),t.jsx("div",{className:"bg-yellow-50 border border-yellow-200 rounded p-4 mb-4",children:t.jsx("p",{className:"text-yellow-800",children:"⚠️ Security Notice: This app uses localStorage which is vulnerable to XSS attacks. Never store sensitive data here as malicious scripts can access it."})}),t.jsx("form",{onSubmit:b,className:"mb-4",children:t.jsxs("div",{className:"input-group mb-3",children:[t.jsx("input",{type:"text",value:l,onChange:e=>i(e.target.value),placeholder:"Enter a new todo","aria-label":"New todo text",className:"form-control"}),t.jsxs("select",{value:h,onChange:e=>p(e.target.value),className:"form-select",style:{maxWidth:"180px"},"aria-label":"Priority level",children:[t.jsx("option",{value:"low",children:"Low Priority"}),t.jsx("option",{value:"medium",children:"Medium Priority"}),t.jsx("option",{value:"high",children:"High Priority"})]}),t.jsx("button",{type:"submit",className:"btn btn-primary","aria-label":"Add todo",children:"Add"})]})}),t.jsxs("div",{className:"d-flex justify-content-between mb-4",children:[t.jsx("button",{onClick:k,className:"btn btn-danger","aria-label":"Clear all todos",children:"Clear All"}),t.jsxs("button",{onClick:C,className:"btn btn-success d-flex align-items-center","aria-label":"Download todos as markdown",children:[t.jsx(R,{className:"me-2",size:16}),"Download"]})]}),s.length>0?t.jsx("ul",{className:"list-group shadow-sm",children:s.map(e=>t.jsx("li",{className:`list-group-item p-3 ${e.priority==="high"?"border-start border-danger border-3":e.priority==="medium"?"border-start border-warning border-3":"border-start border-success border-3"}`,children:d===e.id?t.jsxs("div",{className:"d-flex gap-2",children:[t.jsx("input",{type:"text",value:x,onChange:a=>m(a.target.value),className:"form-control","aria-label":"Edit todo text"}),t.jsx("button",{onClick:()=>f(e.id),className:"btn btn-primary","aria-label":"Save edit",children:"Save"})]}):t.jsxs("div",{className:"d-flex align-items-center",children:[t.jsxs("div",{className:"form-check d-flex align-items-center",children:[t.jsx("input",{type:"checkbox",checked:e.completed,onChange:()=>v(e.id),className:"form-check-input me-3",style:{transform:"scale(1.2)"},"aria-label":`Mark "${e.text}" as ${e.completed?"incomplete":"complete"}`,id:`todo-${e.id}`}),t.jsx("label",{className:`form-check-label ${e.completed?"text-decoration-line-through text-muted":"fw-medium"}`,htmlFor:`todo-${e.id}`,style:{marginBottom:"0"},children:e.text})]}),t.jsx("span",{className:"ms-auto me-3 badge rounded-pill text-bg-secondary",children:e.priority}),t.jsx("button",{onClick:()=>N(e),className:"btn btn-sm btn-outline-primary me-2","aria-label":`Edit "${e.text}"`,children:t.jsx(I,{size:16})}),t.jsx("button",{onClick:()=>w(e.id),className:"btn btn-sm btn-outline-danger","aria-label":`Delete "${e.text}"`,children:t.jsx(P,{size:16})})]})},e.id))}):t.jsx("div",{className:"text-center py-5 text-muted",children:t.jsx("p",{children:"No todos yet. Add some tasks to get started!"})})]})})})})})};S.createRoot(document.getElementById("root")).render(t.jsx(E.StrictMode,{children:t.jsx(O,{})}));
