"use strict";(self.webpackChunkheony704_github_io=self.webpackChunkheony704_github_io||[]).push([[678],{5023:function(e,t,n){var a=n(7294);t.Z=function(e){let{author:t}=e;if(!t)return null;const{bio:n,name:r}=t;return a.createElement("div",{className:"bio"},a.createElement("div",{className:"introduction"},a.createElement("p",{className:"title"},"안녕하세요.",a.createElement("br",null),n.role," ",a.createElement("strong",null,r),"입니다.",a.createElement("br",null)),n.description.map(((e,t)=>a.createElement("p",{className:"description",key:t},e)))))}},617:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var a=n(5785),r=n(7294),l=n(1715),o=n(3432),c=n(5023),u=n(8154);var s=n(6525);var i=function(e){let{data:t}=e;const n=t.allMarkdownRemark.edges.map((e=>{let{node:t}=e;return new u.Z(t)})),{author:i}=t.site.siteMetadata,d=["All"].concat((0,a.Z)((e=>{const t=new Set;return e.forEach((e=>{let{categories:n}=e;return n.forEach((e=>t.add(e)))})),(0,a.Z)(t).sort(((e,t)=>"featured"===e?-1:"featured"===t?1:0))})(n))),m=d.findIndex((e=>"featured"===e)),{0:f,1:h}=(0,r.useState)(-1===m?0:m),E=(0,r.useCallback)(((e,t)=>h(t)),[]);return r.createElement(l.Z,null,r.createElement(o.Z,{title:"Home"}),r.createElement(c.Z,{author:i}),r.createElement(s.Z,{posts:n,onChange:E,tabs:d,tabIndex:f,showMoreButton:!0}))}}}]);
//# sourceMappingURL=component---src-pages-index-js-20322b89023526c4e104.js.map