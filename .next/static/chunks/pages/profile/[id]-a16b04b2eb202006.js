(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[192],{2494:function(e,s,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/profile/[id]",function(){return t(5500)}])},3605:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return w}});var a=t(5893),n=t(4848),r=t(3533),o=t(7294),i=t(495),l=t(4053);function d(e){let{url:s,editable:t,fetchData:n}=e,[r,d]=(0,o.useState)(!1),c=(0,l.useSupabaseClient)(),u=(0,l.useSession)();async function h(e){await c.from("profiles").update({banner:e}).eq("id",u.user.id).then(e=>{if(e.error)throw e.error;n&&n()})}async function p(e){let s=e.target.files;if(s.length>0){for(let e of(d(!0),s)){let s=Date.now()+e.name;await c.storage.from("banners").upload(s,e).then(e=>{if(e.data){let s="https://xcsvoeiuobfilsxfigvr.supabase.co/storage/v1/object/public/banners/"+e.data.path;h(s)}})}d(!1)}}return(0,a.jsxs)("div",{className:"h-36 overflow-hidden relative",children:[(0,a.jsx)("img",{src:s}),r&&(0,a.jsx)("div",{className:"absolute inset-0 flex items-center bg-white opacity-70",children:(0,a.jsx)("div",{className:"mx-auto",children:(0,a.jsx)(i.Z,{})})}),t&&(0,a.jsx)("label",{className:"absolute bottom-2 right-2",children:(0,a.jsxs)("div",{className:"flex bg-white rounded-lg py-1 px-3 items-center shadow-md shadow-gray-400 cursor-pointer gap-1",children:[(0,a.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:[(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"}),(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"})]}),(0,a.jsx)("span",{className:"",children:"Change Banner"}),(0,a.jsx)("input",{type:"file",className:"hidden",onChange:p})]})})]})}var c=t(7844);function u(e){let{profile:s,editable:t,fetchData:n}=e,r=(0,l.useSupabaseClient)(),i=(0,l.useSession)(),[d,c]=(0,o.useState)(!1),[u,h]=(0,o.useState)("");async function p(){await r.from("profiles").update({name:u}).eq("id",i.user.id).then(e=>{if(e.error)throw e.error;n&&n(),c(!1)})}return(0,a.jsx)("div",{className:"p-8 pt-4 pb-0",children:(0,a.jsx)("div",{className:"ml-24 flex justify-between",children:(0,a.jsxs)("div",{className:"flex gap-2 items-center",children:[t&&d&&(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)("input",{className:"p-1 border-blue-600 border-2 rounded-md",type:"text",value:u,onChange:e=>h(e.target.value)}),(0,a.jsx)("button",{className:"shadow-md px-3 py-1 rounded-md shadow-gray-400",onClick:p,children:"Save"})]}),!d&&(0,a.jsx)("h1",{className:"text-2xl font-bold",children:null==s?void 0:s.name}),t&&!d&&(0,a.jsx)("div",{className:"cursor-pointer",onClick:function(){c(!0),h(s.name)},children:(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"})})})]})})})}var h=t(1417);function p(e){let{active:s,posts:t,myProfile:n}=e;return(0,a.jsxs)(a.Fragment,{children:["posts"===s&&t.map(e=>(0,a.jsx)(h.Z,{...e,myProfile:n},e.created_at)),"photos"===s&&(0,a.jsx)(r.Z,{children:(0,a.jsx)("div",{className:"flex gap-3 flex-wrap",children:t.map((e,s)=>(0,a.jsx)("div",{children:e.photos.map((e,s)=>(0,a.jsx)("img",{src:e,className:"mb-3 rounded-lg w-auto h-60"},"img+".concat(s)))},"post+".concat(s)))})})]})}var v=t(1664),f=t.n(v);function m(e){let{userId:s,active:t}=e,n="flex gap-1 px-4 py-1 items-center border-b-4 border-b-white",r="flex gap-1 px-4 py-1 items-center border-blue-500 border-b-4 font-bold";return(0,a.jsxs)("div",{className:"mt-4 md:mt-10 flex gap-0",children:[(0,a.jsxs)(f(),{href:"/profile/".concat(s),className:"posts"===t?r:n,children:[(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"})}),(0,a.jsx)("span",{className:"hidden sm:block",children:"Posts"})]}),(0,a.jsxs)(f(),{href:"/profile/".concat(s,"/photos"),className:"photos"===t?r:n,children:[(0,a.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"w-6 h-6",children:(0,a.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"})}),(0,a.jsx)("span",{className:"hidden sm:block",children:"Photos"})]})]})}var x=t(1403),j=t(1163);function w(){var e,s,t,i;let h=(0,l.useSupabaseClient)(),v=(0,l.useSession)(),[f,w]=(0,o.useState)(null),[b,g]=(0,o.useState)([]),[N,k]=(0,o.useState)(null),y=(0,j.useRouter)(),C=null==y?void 0:null===(e=y.query)||void 0===e?void 0:e.id,_=(null==y?void 0:null===(s=y.query)||void 0===s?void 0:null===(t=s.tab)||void 0===t?void 0:t[0])||"posts",L=async()=>{await h.from("posts").select("id, content, author, photos, created_at, profiles(id, name, avatar)").eq("author",C).order("created_at",{ascending:!1}).then(e=>{var s;(null==e?void 0:null===(s=e.data)||void 0===s?void 0:s.length)&&g(e.data)})},S=async()=>{var e;await h.from("profiles").select().eq("id",null==v?void 0:null===(e=v.user)||void 0===e?void 0:e.id).then(e=>{var s;k(null===(s=e.data)||void 0===s?void 0:s[0])})},z=async()=>{await h.from("profiles").select().eq("id",C).then(e=>{var s;w(null===(s=e.data)||void 0===s?void 0:s[0])})},M=()=>{L(),z(),S()};(0,o.useEffect)(()=>{C&&M()},[C]);let q=C===(null==v?void 0:null===(i=v.user)||void 0===i?void 0:i.id);return(0,a.jsx)(x.f,{children:(0,a.jsxs)(c.Z,{children:[(0,a.jsx)(r.Z,{noPadding:!0,children:(0,a.jsxs)("div",{className:"relative rounded-md overflow-hidden",children:[(0,a.jsx)(d,{editable:q,fetchData:M,url:null==f?void 0:f.banner}),(0,a.jsx)("div",{className:"absolute top-24 left-4 z-20",children:(0,a.jsx)(n.Z,{size:"lg",url:null==f?void 0:f.avatar,editable:q,fetchData:M})}),(0,a.jsx)(u,{profile:f,editable:q,fetchData:M}),(0,a.jsx)(m,{userId:C,active:_})]})}),(0,a.jsx)(p,{userId:C,active:_,posts:b,myProfile:N})]})})}},5500:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return r}});var a=t(5893),n=t(3605);function r(){return(0,a.jsx)(n.default,{})}}},function(e){e.O(0,[514,237,774,888,179],function(){return e(e.s=2494)}),_N_E=e.O()}]);