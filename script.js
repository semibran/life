"use strict";var app=function(){var e=[1,0,3,1,0,2,1,2,4,2,5,2,6,2],n=Object.freeze({default:e}),i=n&&e||n,t=document.createElement("canvas"),r={time:0,prev:[],world:i,view:{canvas:t,context:t.getContext("2d"),image:null,cursor:null,position:[0,0],size:[window.innerWidth,window.innerHeight]}},a={update:function(e){var n=e.prev;e.prev=e.world,e.world=function(e,n){if(n||(n=[]),n.length=0,!e.length)return n;for(var i=e.slice(),t=0;t<i.length;t+=2){for(var r=i[t],a=i[t+1],o=0,d=-1;d<=1;d++)for(var u=a+d,v=-1;v<=1;v++)if(v||d){for(var w=r+v,s=0;s<i.length&&(i[s]!==w||i[s+1]!==u);s+=2);s<i.length?s<e.length&&o++:t<e.length&&i.push(w,u)}(3===o||2===o&&t<e.length)&&n.push(r,a)}return n}(e.prev,n),e.time++},view:{mount:function(e){var n=e.view;document.body.appendChild(n.canvas),a.view.resize(r,window.innerWidth,window.innerHeight)},resize:function(e,n,i){var t=e.view;t.size[0]=t.canvas.width=n,t.size[1]=t.canvas.height=i,t.image=t.context.createImageData(n,i),a.view.render(r)},render:function(e){var n=e.view;!function(e,n){for(var i=e.world,t=(e.prev,e.view),r=t.size[0],a=t.size[1],o=[Math.round(r/2-t.position[0]),Math.round(a/2-t.position[1])],d=0;d<a;d++)for(var u=0;u<r;u++){var v=4*(d*r+u),w=n.data[v+2];if(w){for(var s=0;s<i.length&&(i[s]+o[0]!==u||i[s+1]+o[1]!==d);s+=2);s===i.length&&(n.data[v+0]=0,n.data[v+1]=0,n.data[v+2]=w-15,n.data[v+3]=255)}}for(s=0;s<i.length;s+=2)u=i[s+0]+o[0],d=i[s+1]+o[1],u>=0&&u<r&&d>=0&&d<a&&(v=4*(d*r+u),n.data[v+0]=0,n.data[v+1]=255,n.data[v+2]=255,n.data[v+3]=255)}(r,n.image),n.context.putImageData(n.image,0,0)}}};a.view.mount(r),requestAnimationFrame(function e(){a.update(r);a.view.render(r);requestAnimationFrame(e)}),window.addEventListener("resize",function(e){a.view.resize(r,window.innerWidth,window.innerHeight)}),window.addEventListener("mousedown",function(e){r.view.cursor=[e.pageX,e.pageY]}),window.addEventListener("mousemove",function(e){var n=r.view;n.cursor&&(n.position[0]-=(e.pageX-n.cursor[0])/window.innerWidth*n.size[0],n.position[1]-=(e.pageY-n.cursor[1])/window.innerHeight*n.size[1],n.cursor[0]=e.pageX,n.cursor[1]=e.pageY)}),window.addEventListener("mouseup",function(e){r.view.cursor=null});return{}}();