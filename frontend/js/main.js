(()=>{"use strict";function t(t){return["H","N"].includes(t.homeAway)}const e={Barcelona:"Barca","Paris Saint-Germain":"PSG","Manchester City":"Man City"};function s(t){return e[t]||t}function a(e,a){return t(e)?function(t,e){const{year:a,team:r,opponent:n,scoreTeam:o,scoreOpponent:i}=t;return`${_.get(e,"prefixYear")?`[${a}] `:""}${s(r)} ${o} - ${i} ${s(n)}`}(e,a):function(t,e){const{year:a,team:r,opponent:n,scoreTeam:o,scoreOpponent:i}=t;return`${_.get(e,"prefixYear")?`[${a}] `:""}${s(n)} ${i} - ${o} ${s(r)}`}(e,a)}const r={"2022-08-31":['<blockquote class="twitter-tweet" data-theme="light"><p lang="en" dir="ltr">Messi told Neymar It&#39;s a Goal even before the VAR!🤯 <a href="https://t.co/vQJoRQJPgb">pic.twitter.com/vQJoRQJPgb</a></p>&mdash; Omar Haija  (@3omarHaija) <a href="https://twitter.com/3omarHaija/status/1565646165944696832?ref_src=twsrc%5Etfw">September 2, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>','<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Hmmm🥺🥺 If Mbappe had the ball where Messi had it, he would have tried to score from there rather than pass to an open man. Messi🤏<a href="https://twitter.com/hashtag/Messi?src=hash&amp;ref_src=twsrc%5Etfw">#Messi</a> <a href="https://twitter.com/hashtag/Messi%F0%93%83%B5?src=hash&amp;ref_src=twsrc%5Etfw">#Messi𓃵</a> <a href="https://t.co/HZEzxCit4w">pic.twitter.com/HZEzxCit4w</a></p>&mdash; dezgn of d great benin empire (@EwereOfBenin) <a href="https://twitter.com/EwereOfBenin/status/1565076197868011523?ref_src=twsrc%5Etfw">August 31, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>'],"2022-08-06":['<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Believe me these kind of assist is a piece of cake for him. He&#39;s been doing this since years but still he will be criticized by people since they only check the scorecard but not watch the game🙃. How can someone score in every match when he is playing as a false 9?<a href="https://twitter.com/hashtag/Messi%F0%93%83%B5?src=hash&amp;ref_src=twsrc%5Etfw">#Messi𓃵</a> <a href="https://twitter.com/hashtag/PSG?src=hash&amp;ref_src=twsrc%5Etfw">#PSG</a> <a href="https://t.co/yvyAKvu655">pic.twitter.com/yvyAKvu655</a></p>&mdash; Nikhil Jindal (@nikhiljindal79) <a href="https://twitter.com/nikhiljindal79/status/1563442778243497987?ref_src=twsrc%5Etfw">August 27, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>'],"2009-03-22":['<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Lionel Messi goal vs Malaga 2009 is up there as one of his most underrated goal. <a href="https://twitter.com/hashtag/Barcelona?src=hash&amp;ref_src=twsrc%5Etfw">#Barcelona</a> <a href="https://twitter.com/hashtag/Messi%F0%93%83%B5?src=hash&amp;ref_src=twsrc%5Etfw">#Messi𓃵</a><br> <a href="https://t.co/ViJAMtZYVF">pic.twitter.com/ViJAMtZYVF</a></p>&mdash; What A Goal Messi (@WhatAGoalLeo) <a href="https://twitter.com/WhatAGoalLeo/status/1566210338755907588?ref_src=twsrc%5Etfw">September 3, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"><\/script>']},n={"2018-09-02":["Ye3eagqfilY"],"2021-09-02":["Mpt0YRaFc1c"],"2012-09-02":["5vx-V6-RiG8"],"2011-09-02":["r3uZ5YrZl2k","E5ef9gr04Is"],"2015-09-04":["_nBN53ub4wY"]};function o(){const t=_.flatten(_.map(dateMatchesMap,((t,e)=>_.map(t,(t=>(function(t,e){const[s,a]=e.split("-");t.id=`${t.year}-${a}-${s}`,t.videos=n[t.id],t.tweets=r[t.id]}(t,e),function(t){const{id:e,goals:s,assists:r,competition:n}=t;let o=r+s;const i=new Date(e),c=function(t){const e=new Date,s=new Date(t);if(!(e.getFullYear()-s.getFullYear()<=0))return{freq:"yearly",dtstart:t,until:new Date(e.getFullYear(),11,31)}}(i);return{id:e,title:a(t,{prefixYear:!0}),constraint:n,start:new Date(i).toISOString(),extendedProps:{totalGA:o,...t},rrule:c}}(t)))))));return _.reduce(_.orderBy(t,"id"),((t,e)=>{const{extendedProps:{totalGA:s,goals:a,assists:r}}=e;return s<=0||(function(t,e){const{extendedProps:{goals:s,assists:a}}=t;if(s>0){const a=e.goalOrder+1;t.extendedProps.goalsOrder=_.range(a,a+s)}if(a>0){const s=e.assistOrder+1;t.extendedProps.assistsOrder=_.range(s,s+a)}}(e,t),t.goalOrder+=a||0,t.assistOrder+=r||0),t}),{goalOrder:0,assistOrder:0}),t}const i={left:"left foot",right:"right foot",insideBox:"inside box",outsideBox:"outside box",freeKicks:"free kicks",pensMissed:"missed pens",started:"Starting lineup",minsPlayed:"Minutes played",motm:"Man of the match",season:"Season",throughballs:"Through balls",keyPasses:"Key passes",bigChancesCreated:"Big chances created"},c={0:"black",1:"#f2988d",2:"yellow",3:"lightgreen",4:"lightblue",5:"#7836a8",6:"violet"};function l(t,e){return 0===t?0:Math.floor(t/e*(100-h))}const h=1;const d={1:"st",2:"nd",3:"rd"};function p(t){return t>=11&&t<=19?t+"th":t+(d[t%10]||"th")}const u=(t,e)=>t.filter((t=>e[t]>0)).map((t=>`<span class="text-warning">${e[t]} ${i[t]||t}</span>`)).join(", ");!function(){for(const t in c)$(".note").append(`<span style="background-color: ${c[t]}">${t}</span>`)}(),function(){const e=new bootstrap.Modal(document.getElementById("matchDetail"));document.addEventListener("DOMContentLoaded",(function(){var s=document.getElementById("calendar"),r=o();new FullCalendar.Calendar(s,{timeZone:"UTC",headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,matchesOnMonth"},views:{dayGridMonth:{buttonText:"Calendar"},matchesOnYear:{type:"listYear",buttonText:"Year M"},matchesOnMonth:{type:"listMonth",buttonText:"Month Matches"}},slotDuration:"01:30:00",expandRows:!0,navLinks:!0,editable:!1,selectable:!0,weekends:!0,displayEventTime:!1,eventDisplay:"list-item",events:r,initialDate:_.first(r).start,eventOrder:"-start",visibleRange:function(){const t=_.last(r),e=_.first(r);return{start:new Date(t.start),end:new Date(e.start)}},eventDidMount:function(s){const{event:{extendedProps:r,_def:n},el:o}=s;if($(o).css("background",function(t){const{goals:e,assists:s}=t;let a=s+e;if(a<=0)return;const r=c[e],n=c[s],o=l(e,a),i=l(s,a),d=[];return d.push(`${r} ${o}%`),d.push(`black ${h}%`),d.push(`black ${h+o}%`),d.push(`${n} ${h+o}%`),d.push(`${n} ${h+o+i}%`),`linear-gradient(to right, ${d.join(",")})`}(r)),$(o).prop("title",function(t){const{goals:e,assists:s}=t;return`${e}G & ${s}A`}(r)),r.tweets||r.videos){const t=$(o).find(".fc-daygrid-event-dot");t.addClass("event-prefix").removeClass("fc-daygrid-event-dot"),r.videos&&t.append('<i class="bi bi-youtube"></i>'),r.tweets&&t.append('<i class="bi bi-twitter"></i>')}$(o).click((()=>{$("#matchDetail").data("match-id")!==r.id&&($("#matchDetail").data("match-id",r.id),$("#matchDetail .modal-title").html(function(e){const s=function(e){const{scoreTeam:s,scoreOpponent:a,penScore:r}=e;if(s>a)return!0;if(r){const[s,a]=r.split("-");return t(e)?s>a:a>s}return!1}(e)?"text-success":function(t){const{scoreTeam:e,scoreOpponent:s,penScore:a}=t;return e===s&&!a}(e)?"text-info":"text-danger";return`<div class="${s}">\n        [${e.competition}] ${a(e)} (${e.id})</div>`}(r)),$("#matchDetail .modal-body").html(function(t){const e=[];e.push(function(t){const{goals:e,assists:s,assistsOrder:a,goalsOrder:r,xg:n}=t,o=[];if(e>0){const s=n?`/ xG:${n}`:"",a=`${_.repeat("⚽",e)} (${r.map((t=>p(t))).join(", ")}) ${s}`;o.push(a);const i=u(["freeKicks","insideBox","outsideBox","pens"],t);o.push(i);const c=u(["left","right","head","other"],t);o.push(c)}if(s>0){const t=`${_.repeat("️🅰️️",s)} (${a.map((t=>p(t))).join(", ")})`;o.push(t)}return o.join("<br />")}(t));const s=["season","round","minsPlayed","keyPasses","throughballs","bigChancesCreated","motm","started"].filter((e=>t[e])).map((e=>`<tr><td><strong>${i[e]||e}</strong></td><td>${t[e]}</td></tr>`)).join("");return e.push(`<table class="table"><tbody>${s}</tbody></table>`),e.push(...function(t){const e=[];return _.map(t.videos,(t=>{e.push(`<iframe width="100%" height="315" src="https://www.youtube.com/embed/${t}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`),e.push(`<a href="https://www.youtube.com/watch?v=${t}" target="_blank">Link video</a>`),e.push("<hr />")})),e}(t)),e.push(...t.tweets||[]),e.join("\n")}(r))),e.show()}))}}).render()}))}()})();