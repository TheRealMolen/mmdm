var e=Object.defineProperty,t=Object.prototype.hasOwnProperty,a=Object.getOwnPropertySymbols,r=Object.prototype.propertyIsEnumerable,o=(t,a,r)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:r}):t[a]=r,i=(e,i)=>{for(var c in i||(i={}))t.call(i,c)&&o(e,c,i[c]);if(a)for(var c of a(i))r.call(i,c)&&o(e,c,i[c]);return e};import{p as c,a as n,I as s,C as l,r as d,o as u,c as h,b as f,t as p,d as m,e as g,w as y,F as v,f as b,g as k,h as x,i as w,j as D}from"./vendor.ad28c960.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const r=new URL(e,location),o=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,i)=>{const c=new URL(e,r);if(self[t].moduleMap[c])return a(self[t].moduleMap[c]);const n=new Blob([`import * as m from '${c}';`,`${t}.moduleMap['${c}']=m;`],{type:"text/javascript"}),s=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(n),onerror(){i(new Error(`Failed to import: ${e}`)),o(s)},onload(){a(self[t].moduleMap[c]),o(s)}});document.head.appendChild(s)})),self[t].moduleMap={}}}("/mmdm/assets/");var T={characters:{Angel:{bg:"f3eeeb",fg:"f0462e",energy:"shield",faces:["022","133","134"]},Cyclops:{bg:"2d2523",fg:"d9441a",energy:"zap",faces:["142","153","164"]},Iceman:{bg:"96c4d1",fg:"f0f0f0",energy:"zap",faces:["124","136","146"]},Juggernaut:{bg:"d86627",fg:"5f2a22",energy:"shield",faces:["163","274","376"]},KittyPryde:{bg:"rgb(209, 185, 4, 0.6)",fg:"2b294e",energy:"mask",faces:["022","032","133"]},Magneto:{bg:"ac7fa6",fg:"6d2940",energy:"mask",faces:["144","257","368"]},Quicksilver:{bg:"32af39",fg:"ebdbe8",energy:"zap",faces:["031","132","143"]},Wolverine:{bg:"32285d",fg:"d9dd30",energy:"fist",faces:["152","263","384"],bursts:[1,1,0]}},cards:[{id:1,character:"Angel",name:"Air Transport",text:"When fielded, you may field a Sidekick die from your used pile (spin it to its character side)",affiliation:"xmen",cost:3,max:4},{id:2,character:"Angel",name:"Inspiring",text:"When Angel attacks, your Sidekicks get +1A and +1D (no matter how many Angel dice attack)",affiliation:"xmen",cost:3,max:4},{id:3,character:"Angel",name:"Superhero",text:"When fielded, Angel may pair up with a different Heroic character until the start of your next turn.\nOnce per turn while Angel is paired up, you may pay <shield> to give Angel and his partner each +2D",affiliation:"xmen",cost:3,heroic:!0,max:4},{id:4,character:"Cyclops",name:"Optic Blast",text:"When fielded, Cyclops deals 3 damage to an opposing character. Your opponent may pay 3 life to prevent this.",affiliation:"xmen",cost:6,max:4,whenFielded:{async:!0,resolve:()=>(alert("TODO: enemy character takes 3 damage from Cyclops"),Promise.resolve())}},{id:5,character:"Cyclops",name:"Overlook",text:"When fielded, Cyclops deals 1 damage to your opponent and each opposing character.",affiliation:"xmen",cost:6,max:4},{id:6,character:"Cyclops",name:"Superhero",text:"When fielded, Cyclops may pair up with a different Heroic character until the start of your next turn.\nWhile Cyclops is paired up, he and his partner each deal 1 damage to the opponent when assigned to attack.",affiliation:"xmen",cost:5,heroic:!0,max:4},{id:7,character:"Iceman",name:"Cryokinetic",text:"",affiliation:"xmen",cost:4,max:4},{id:8,character:"Iceman",name:"Robert Louis Drake",text:"You may pay <zap> to give Iceman +1A and +1D.",affiliation:"xmen",cost:5,max:4},{id:9,character:"Iceman",name:"Too Cool for Words",text:"Once per turn, you may pay <zap> to double Iceman's attack.",globaltext:"Pay <zap> to spin any number of your Sidekick dice to their <zap> side (if active, move them to your reserve pool)",affiliation:"xmen",cost:5,max:4},{id:10,character:"Juggernaut",name:"Cain Marko",text:"When Juggernaut takes damage, you may move any or all of your Sidekicks to your used pile. Prevent up to 3 damage to Juggernaut per Sidekick moved.",affiliation:"villain",cost:6,max:4},{id:11,character:"Juggernaut",name:"Unstoppable",text:"Once per turn, you may move one of your Sidekicks to your used pile to give Juggernaut +4A and +4D.",affiliation:"villain",cost:7,max:4},{id:12,character:"Juggernaut",name:"Archvillain",text:"When fielded, if your opponent has no Villains in the field, you may move one of your Sidekicks to your used pile to deal 1 damage to your opponent and gain 1 life.",affiliation:"villain",cost:6,max:4},{id:13,character:"KittyPryde",name:"Ariel",text:"",affiliation:"xmen",cost:2,max:4},{id:14,character:"KittyPryde",name:"Sprite",text:"Kitty Pryde cannot be blocked by Sidekicks.",affiliation:"xmen",cost:3,max:4},{id:15,character:"KittyPryde",name:"Shadowcat",text:"Kitty Pryde cannot be blocked on the turn she is fielded.",globaltext:"Pay <mask>. Target character cannot attack this turn unless its owner pays 1 life.",affiliation:"xmen",cost:4,max:4},{id:16,character:"Magneto",name:"Field Control",text:"When fielded, you may pay <mask><mask> to move a character from the field or reserve pool to its owners prep area.",affiliation:"villain",cost:6,max:4},{id:17,character:"Magneto",name:"Will to Live",text:"If Magneto leaves the field, he goes to your prep area instead of the used pile or dice bag.",affiliation:"villain",cost:6,max:4},{id:18,character:"Magneto",name:"Archvillain",text:"If your opponent has no Villains in the field, Magneto gains +3A and +3D.",affiliation:"villain",cost:6,max:4},{id:19,character:"Quicksilver",name:"Pietro Maximoff",text:"When fielded, Quicksilver deals 1 damage to one opposing character.",affiliation:"xmen",cost:3,max:4},{id:20,character:"Quicksilver",name:"Thanks to Isotope E",text:"When fielded, Quicksilver deals 1 damage to each opposing Sidekick.",affiliation:"xmen",cost:4,max:4},{id:21,character:"Quicksilver",name:"Former Villain",text:"When Quicksilver is blocked, he deals 1 damage to each opposing character (this extra damage is resolved before normal combat damage is assigned).",affiliation:"xmen",cost:4,max:4},{id:22,character:"Wolverine",name:"The Best There Is",text:"Wolverine deals double damage to characters that block him.",affiliation:"xmen",cost:5,max:4},{id:23,character:"Wolverine",name:"Not Very Nice",text:"When Wolverine is blocked, you may pay <fist><fist> to have him deal damage equal to his attack to one character blocking him (this extra damage is resolved before normal combat damage is assigned).",affiliation:"xmen",cost:6,max:4},{id:24,character:"Wolverine",name:"Superhero",text:"When fielded, Wolverine may pair up with a different Heroic character until the start of your next turn.\nWhile Wolverine is paired up, he and his partner can only be blocked by two or more characters (each).",affiliation:"xmen",cost:6,heroic:!0,max:4},{id:25,action:!0,name:"Ambush",text:"One of your characters gets +1A for each character your opponent has in the field.",cost:3,max:3,precondition(e){if(2!==e.selectedDice.length)return"You need to choose an action die and a character to target";const t=e.selectedDice.filter((e=>"action"===e.face.type)),a=e.selectedDice.filter((e=>"character"===e.face.type));if(1!==t.length||1!==a.length)return"You need to choose an action die and a character to target";const r=t[0],o=a[0];return r.owner!==e.currentTurn||o.owner!==e.currentTurn||"field"!==o.location&&"attack"!==o.location||"reserve"!==r.location||"character"!==o.face.type?"You need to select the ambush die and one of your fielded character dice":void 0},doit({game:e,commit:t}){const a=e.players[1-e.currentTurn],r=[...a.field,...a.attack];e.selectedDice.filter((e=>"action"===e.face.type));t("addModifier",{die:e.selectedDice.filter((e=>"character"===e.face.type))[0],stat:"attack",amount:r.length,source:"Ambush"})}},{id:26,action:!0,name:"Enrage",text:"Choose a character. That character must attack at its next opportunity. Spin that character up one level (if able).",cost:3,max:3,global:{text:"Pay <zap>. Give one character +1A.",phase:"attack",precondition(e){const t=e.selectedDice.filter((e=>"character"===e.face.type)),a=e.selectedDice.filter((e=>"energy"===e.face.type)).filter((e=>"zap"===e.face.icon||"wild"===e.face.icon)).filter((t=>t.owner===e.currentTurn));return 1!==t.length?"You need to pick one character to enrage":0===a.length?"You need to pay with <zap> energy":t.length+a.length!==e.selectedDice.length?"You can only use <zap> or <wild> energy to pay to Enrage":void 0},doit({game:e,commit:t}){const a=e.selectedDice.filter((e=>"character"===e.face.type))[0],r=e.selectedDice.filter((e=>"energy"===e.face.type&&("zap"===e.face.icon||"wild"===e.face.icon)));t("addModifier",{die:a,stat:"attack",amount:r.length,source:"Enrage"}),t("moveAllDice",{source:"reserve",dice:r,dest:"outOfPlay"})}}},{id:27,action:!0,name:"Feedback",text:"Deal 1 damage to your opponent for each of their characters that is knocked out for the rest of this turn.",cost:3,max:3},{id:28,action:!0,name:"Imprisoned",text:"This die captures any number of opposing characters with a total fielding cost of 2 or less. This effect lasts until canceled or you do damage to your opponent (return the captured dice to the field).",cost:4,max:3},{id:29,action:!0,name:"Possession",text:"At the start of your attack step, take control of an opposing character with a level lower than one of your characters. Attack with it.\n<burst><burst> Instead, take control of an opposing character with an equal or lower level.",cost:4,max:3},{id:30,action:!0,name:"Reckless Melee",text:"Deal 1 damage to each character (including yours).\n<burst> Instead, deal 1 damage to each player.\n<burst><burst> Instead, deal 1 damage to each player and 1 damage to each character.",cost:3,max:3,precondition(e){if(1!==e.selectedDice.length)return"You can only recklessly melee one die at a time 😅"},doit({game:e,commit:t}){const a=e.selectedDice[0].face.bursts;e.players.forEach((e=>{if(0===a||2===a){[...e.attack,...e.field].forEach((e=>{t("damageDie",{die:e,amount:1,source:"Reckless Melee"})}))}1!==a&&2!==a||t("damagePlayer",{playerNum:e.playerNum,amount:1,source:"Reckless Melee"})}))}},{id:31,action:!0,name:"Relentless",text:"Spin this die to a generic energy side. Reroll a character or Sidekick die from your reserve pool.",globaltext:"Pay <mask>. Target character cannot block.",cost:4,max:3},{id:32,action:!0,name:"Selective Shield",text:"Choose an energy type. Characters of that type cannot attack until next turn.\n<burst><burst> Also choose one character of that type. That character cannot block until your next turn.",globaltext:"Pay <fist> and target a blocked character. That character deals no damage.",cost:4,max:3},{id:33,action:!0,name:"Take That, Villain!",text:"Deal 3 damage to a Villain.\n<burst><burst> Deal an extra 1 damage to that Villain.",cost:3,max:3},{id:34,action:!0,name:"Transfer Power",text:"Roll a character die from your used pile. If it rolls a character face, field it at no cost. Otherwise, place it in your bag.",globaltext:"Pay <shield>. Swap the attack value of one of your characters with that of one opposing character.",cost:3,max:3}]};const A=()=>{const e="#333",t="#eee";return{faces:[{fg:e,bg:t,icon:"mask",type:"energy"},{fg:e,bg:t,icon:"zap",type:"energy"},{fg:e,bg:t,icon:"fist",type:"energy"},{fg:e,bg:t,icon:"shield",type:"energy"},{fg:e,bg:t,icon:"wild",type:"energy"},{fg:e,bg:t,icon:"prawn",field:0,attack:1,defense:1,type:"character"}],type:"sidekick",ko:!1,modifiers:[]}},C=e=>e.indexOf("#")>=0||e.indexOf("(")>=0?e:"#"+e,P=e=>{const t=["#E68C3C","#DC95DF","#63BF56","#6FACED"].filter((t=>!e.some((e=>e.tint==t))));return 0==t.length?"white":t[Math.floor(Math.random()*t.length)]},S=(e,t=null,a=T)=>a.cards.find((a=>a.name===e&&(!t||void 0!==a.character&&a.character===t))),M=e=>{const t={character:[],energy:[],action:[]};return e.forEach((e=>t[e.face.type].push(e))),t},E=e=>{const t={card:[],bag:[],reserve:[],field:[],attack:[],prep:[],used:[],outOfPlay:[]};return e.forEach((e=>t[e.location].push(e))),t},O=e=>{const t={total:0,energies:[]};return e.forEach((e=>{e.face.field>0&&(t.total+=e.face.field,t.energies.push(e.character.energy))})),t},$=e=>{const t={total:0,energies:[]};return e.forEach((e=>{t.total+=e.card.cost,void 0!==e.character&&t.energies.push(e.character.energy)})),t},R=(e,t)=>{const a=i(i({},t),{diceLeft:[...e],spent:[],spinDown:[]}),r=[];for(;a.diceLeft.length>0;){const e=a.diceLeft.pop();if("wild"===e.face.icon){r.push(e);continue}--a.total,"two"===e.face.icon&&--a.total;const t=e.face.icon.replace("x2","");e.face.icon.endsWith("x2")?a.spinDown.push(e):a.spent.push(e);const o=a.energies.indexOf(t);o>=0&&a.energies.splice(o,1)}if(a.total>0||a.energies.length>0)for(let o=0;o<a.spinDown.length;++o){const e=a.spinDown[o],t=e.face.icon.replace("x2",""),r=a.energies.indexOf(t);r<0&&0==a.total||(r>=0&&a.energies.splice(r,1),--a.total,a.spent.push(e))}for(;r.length>0;){const e=r.pop();--a.total,a.energies.length>0&&a.energies.pop(),a.spent.push(e)}return a.total<=0&&0===a.energies.length&&(a.enough=!0,a.total<0&&(a.tooMuch=!0)),a},Y=(e,t)=>{const a=e.modifiers.filter((e=>e.stat===t));if(!a.length)return 0;return a.reduce(((e,t)=>e+ +t.amount),0)},z=(e,t,a)=>{const r=e.modifiers.filter((e=>e.stat===t));if(!r.length)return;const o=r.reduce(((e,t)=>e+ +t.amount),0);if(0===o)return;return`${o>0?"+":"-"}${o}${a}`};const I={components:{InlineSvg:s},props:{die:{type:Object,required:!0},size:{type:String,default:"large"},angle:{type:Number},maxAngle:{type:Number,default:5}},computed:{icon(){return this.die.face.icon},fg(){return this.die.face.fg},bg(){return this.die.face.bg},field(){return this.die.face.field},fieldMod(){return z(this.die,"field","F")},attack(){return this.die.face.attack},attackMod(){return z(this.die,"attack","A")},defense(){return this.die.face.defense},defenseMod(){const e=z(this.die,"defense","D"),t=z(this.die,"hp","hp");return e&&t?`${e},${t}`:e||t},bursts(){return this.die.face.bursts},selected(){return void 0!==this.die.selected&&!0===this.die.selected},outOfPlay(){return void 0!==this.die.location&&"outOfPlay"===this.die.location},outlineCol(){return l(this.bg).saturate(1.8).darken(.75)},safeAngle(){return this.angle?this.angle:2*this.maxAngle*(Math.random()-.5)}},methods:{onClick(){"outOfPlay"!==this.die.location&&this.$store.dispatch("dieClicked",{die:this.die})}}},W=y();c("data-v-2a0d9abd");const F={class:"text tl"},j={key:0,class:"modifier"},_={class:"text tr"},L={key:0,class:"modifier"},N={class:"text bl burst"},U={class:"text br"},B={key:0,class:"modifier"};n();const V=W(((e,t,a,r,o,i)=>{const c=d("inline-svg");return u(),h("div",{class:["die",[a.size,i.selected?"selected":"",i.outOfPlay?"outOfPlay":""]],style:{color:i.fg,background:i.bg,"--inner-shadow-col":i.outlineCol,"--angle":i.safeAngle+"deg"},onClick:t[1]||(t[1]=(...e)=>i.onClick&&i.onClick(...e))},[f(c,{class:"icon",src:`/mmdm/assets/img/${i.icon}.svg`,fill:i.fg},null,8,["src","fill"]),f("div",F,[i.fieldMod?(u(),h("div",j,p(i.fieldMod),1)):m("",!0),g(p(i.field)+" ",1)]),f("div",_,[g(" "+p(i.attack)+" ",1),i.attackMod?(u(),h("div",L,p(i.attackMod),1)):m("",!0)]),f("div",N,p(i.bursts)+" ",1),f("div",U,[g(" "+p(i.defense)+" ",1),i.defenseMod?(u(),h("div",B,p(i.defenseMod),1)):m("",!0)])],6)}));I.render=V,I.__scopeId="data-v-2a0d9abd";const q={components:{Die:I},props:{pack:{type:String,default:"UXM"},id:{type:String},card:{type:Object,required:!0},size:{type:String,default:"large"}},data(){return{slots:this.computeSlots()}},computed:{safeId(){return this.card!=={}?this.card.id:this.id},imageUrlVar(){return{"--bgimg-url":`url(/mmdm/assets/img/${this.pack}${this.safeId}.jpg)`}},tint(){return l(this.card.tint).alpha(.5)}},methods:{computeSlots(){const e=e=>Math.random()*e,t=[];t.push({left:14+e(12),top:10+e(8)}),t.push({left:53+e(12),top:10+e(8)}),t.push({left:14+e(12),top:38+e(8)}),t.push({left:53+e(12),top:38+e(8)});const a=this.card.dice,r={};return a.forEach(((a,o)=>{r[a.uid]=i(i({},t[o]),{angle:-90+e(180)})})),r}}},H=y();c("data-v-72601e6c");const J={class:"d-flex position-relative"};n();const K=H(((e,t,a,r,o,i)=>{const c=d("die");return u(),h("div",J,[f("div",{class:["card",a.size],style:i.imageUrlVar,title:a.card.text+(a.card.global?"\n\nGlobal: "+a.card.global.text:"")},null,14,["title"]),(u(!0),h(v,null,b(a.card.dice,(e=>(u(),h("div",{key:e.uid,class:"position-absolute",style:{left:o.slots[e.uid].left+"%",top:o.slots[e.uid].top+"%"}},[f(c,{class:"mb-1",size:a.size,angle:o.slots[e.uid].angle,die:e},null,8,["size","angle","die"])],4)))),128)),"action"==a.card.die.type?(u(),h("div",{key:0,class:["tint",a.size],style:{"--tint":i.tint}},null,6)):m("",!0)])}));q.render=K,q.__scopeId="data-v-72601e6c";const G={components:{Card:q,Die:I},computed:{game(){return this.$store.state.game},allCards:()=>T.cards.map((e=>{const t=i({},e);if(void 0!==t.character){const e=T.characters[t.character],a="#"+e.fg,r="#"+e.bg,o={fg:a,bg:r,icon:e.energy},i={fg:a,bg:r,icon:e.energy+"x2"},c=[o,i,i];for(let n=0;n<3;++n){const o={fg:a,bg:r,icon:t.character.toLowerCase(),field:e.faces[n][0],attack:e.faces[n][1],defense:e.faces[n][2]};e.bursts&&e.bursts[n]>0&&(o.bursts="****".substring(0,e.bursts[n])),c.push(o)}t.diceFaces=c}else{t.diceFaces=[];for(let a=0;a<3;++a)t.diceFaces.push({bg:"white",fg:"#222",icon:"two"});let e="";for(let a=0;a<3;++a)t.diceFaces.push({bg:"white",fg:"#222",icon:"action",bursts:e}),e+="*"}return t}))},mounted(){this.$store.dispatch("setupStarterGame")}},Q=y();c("data-v-ba9fe316");const X={class:"container-fluid"},Z={class:"row"},ee={class:"col-3"},te=f("h1",null,"mmdm live",-1),ae={class:"col-9"};n();const re=Q(((e,t,a,r,o,i)=>{const c=d("card");return u(),h("div",X,[f("div",Z,[f("div",ee,[f("img",{src:"/mmdm/assets/img/UXMback.jpg",class:"w-75"},null,8,["src"]),te]),f("div",ae,[(u(!0),h(v,null,b(i.allCards,(e=>(u(),h("div",{class:"mb-2 d-inline-block ",key:e.id},[f(c,{card:e,size:"small"},null,8,["card"])])))),128))])])])}));G.render=re,G.__scopeId="data-v-ba9fe316";const oe={components:{Card:q},props:{cards:{type:Array,required:!0}}},ie=y();c("data-v-192373a8");const ce={class:"d-flex justify-content-end flex-wrap"};n();const ne=ie(((e,t,a,r,o,i)=>{const c=d("card");return u(),h("div",ce,[(u(!0),h(v,null,b(a.cards,((e,t)=>(u(),h(c,{key:t,card:e,size:"small"},null,8,["card"])))),128))])}));oe.render=ne,oe.__scopeId="data-v-192373a8";const se={components:{Die:I},props:{dice:{type:Array,required:!0},size:{type:String,default:"large"}}},le=y();c("data-v-79d121e3");const de={class:"d-flex flex-wrap justify-content-evenly pt-4"};n();const ue=le(((e,t,a,r,o,i)=>{const c=d("die");return u(),h("div",de,[(u(!0),h(v,null,b(a.dice,(e=>(u(),h("div",{key:e.uid,class:["die-container",a.size]},[f(c,{class:"mb-1",size:a.size,"max-angle":20,die:e},null,8,["size","die"])],2)))),128))])}));se.render=ue,se.__scopeId="data-v-79d121e3";const he={components:{DiceArea:se},props:{player:{type:Object,required:!0},invert:{type:Boolean,default:!1}},computed:{active(){return this.$store.state.game.currentTurn===this.player.num},bagCount(){const e=this.player.bag.length;return this.player.local?e:0===e?"No":e<4?"A few":e>10?"Loads of":"Some"}}},fe=y();c("data-v-0dc0afb6");const pe={class:"attack area"},me=g(" ATTACK "),ge={class:"overlay"},ye={class:"field area"},ve=g(" FIELD "),be={class:"overlay"},ke={class:"used area"},xe=g(" USED "),we={class:"overlay"},De={class:"reserve area"},Te=g(" RESERVE "),Ae={class:"overlay"},Ce={class:"prep area"},Pe=g(" PREP "),Se={class:"overlay"},Me={class:"oop pt-5 d-flex flex-column"},Ee={class:"flex-grow-1"},Oe=g(" out"),$e=f("br",null,null,-1),Re=g("of"),Ye=f("br",null,null,-1),ze=g("play "),Ie={class:"overlay"},We={class:"bag"};n();const Fe=fe(((e,t,a,r,o,i)=>{const c=d("dice-area");return u(),h("div",{class:["play-mat",{invert:a.invert,active:i.active}]},[f("div",pe,[me,f("div",ge,[f(c,{size:"small",dice:a.player.attack},null,8,["dice"])])]),f("div",ye,[ve,f("div",be,[f(c,{size:"small",dice:a.player.field},null,8,["dice"])])]),f("div",ke,[xe,f("div",we,[f(c,{size:"small",dice:a.player.used},null,8,["dice"])])]),f("div",De,[Te,f("div",Ae,[f(c,{size:"small",dice:a.player.reserve},null,8,["dice"])])]),f("div",Ce,[Pe,f("div",Se,[f(c,{size:"small",dice:a.player.prep},null,8,["dice"])])]),f("div",Me,[f("div",Ee,[Oe,$e,Re,Ye,ze,f("div",Ie,[f(c,{size:"small",dice:a.player.outOfPlay},null,8,["dice"])])]),f("div",We,p(i.bagCount)+" dice in bag ",1)])],2)}));he.render=Fe,he.__scopeId="data-v-0dc0afb6";const je={components:{CardArea:oe,PlayArea:he},data:()=>({resolving:!1}),computed:{game(){return this.$store.state.game},players(){return this.$store.state.game.players},selected(){return this.$store.state.game.selectedDice},moves(){const e=this.game.phase;if("roll"===e)return[{name:"Roll",desc:"Take four dice from your bag, refilling if needed, and roll them along with any dice in your prep area",doit({dispatch:e}){e("doRollPhase")}}];if("main"===e){const t=[];return t.push({name:"Reroll",desc:"Reroll any number of rolled dice (you can only do this once per turn)",precondition:e=>e.rerolled?"You can only reroll one time per turn":e.selectedDice.length?e.selectedDice.some((t=>t.owner!==e.currentTurn))?"You can only reroll dice you own":e.selectedDice.some((e=>"reserve"!==e.location))?"You can only reroll dice in your reserve":e.selectedDice.some((e=>e.modifiers.findIndex((e=>"spindown"===e.stat))>=0))?"You cannot reroll dice whose energy you've partially spent":void 0:"You need to select at least one die to reroll",doit({game:e,dispatch:t}){const a=[...e.selectedDice];t("deselect",{dice:a}),t("doReroll",{dice:a})}}),t.push({name:"Buy",desc:"Buy dice from cards (select dice and the energy to buy them)",precondition(e){if(!e.selectedDice.length)return"You need to select at least one die to buy";const t=E(e.selectedDice);if(0===t.card.length)return"You need to select some dice to buy";if(!t.card.every((t=>t.card.owner!==1-e.currentTurn)))return"You can only buy dice from your own cards or from action cards";if(!t.reserve.every((t=>t.owner===e.currentTurn)))return"You can only buy dice using energy you own";if(!t.reserve.every((e=>"energy"===e.face.type)))return"You can only buy dice using energy";if(t.card.length+t.reserve.length!==e.selectedDice.length)return"You can only buy dice with dice in your reserve";const a=$(t.card),r=R(t.reserve,a);if(!r.enough){let e="You haven't covered the purchase costs: ";return r.total>0&&(e+=`You need ${r.total} more energy. `),r.energies.length>0&&(e+=`You need ${r.energies.join(", ")} energ${1===r.energies.length?"y":"ies"}`),e}},doit({game:e,dispatch:t}){const a=E(e.selectedDice),r=$(a.card),o=R(a.reserve,r);o.tooMuch&&!confirm(`You're spending ${-o.total} energ${-1===o.total?"y":"ies"} more than required. Are you sure?`)||(t("deselect",{dice:e.selectedDice}),t("doBuyDice",{diceToBuy:a.card,diceToSpend:o.spent,diceToSpinDown:o.spinDown}))}}),t.push({name:"Field",desc:"Send characters to the field (select characters and the energy to field them)",precondition(e){if(!e.selectedDice.length)return"You need to select at least one die to field";if(!e.selectedDice.every((t=>t.owner===e.currentTurn)))return"You can only field dice you own";if(!e.selectedDice.every((e=>"reserve"===e.location)))return"You can only field dice in your reserve";const t=M(e.selectedDice);if(0===t.character.length)return"You need to select some characters to field";const a=O(t.character),r=R(t.energy,a);if(!r.enough){let e="You haven't covered the fielding costs: ";return r.total>0&&(e+=`You need ${r.total} more energy. `),r.energies.length>0&&(e+=`You need ${r.energies.join(", ")} energ${1===r.energies.length?"y":"ies"}`),e}},doit({game:e,gameui:t,dispatch:a}){const r=M(e.selectedDice),o=O(r.character),i=R(r.energy,o);i.tooMuch&&!confirm(`You're spending ${-i.total} energ${-1===i.total?"y":"ies"} more than required. Are you sure?`)||(a("deselect",{dice:e.selectedDice}),a("doField",{diceToField:r.character,diceToSpend:i.spent,diceToSpinDown:i.spinDown}),e.effectsToResolve.length>0&&(t.resolving=!0,t.$nextTick((()=>{const r=e.effectsToResolve.reduce(((e,t)=>e.then(t.die.card[t.effect].resolve(t.die))),Promise.resolve());r.catch((e=>alert(e))),r.finally(((e,r)=>{a("clearResolvedEffects"),t.resolving=!1}))}))))}}),this.selected.forEach((e=>{"action"===e.face.type&&t.push({name:e.card.name,desc:e.card.text,precondition:e.card.precondition,doit:t=>{e.card.doit(t),t.dispatch("deselect",{dice:t.game.selectedDice}),t.commit("moveAllDice",{source:"reserve",dice:[e],dest:"outOfPlay"})}})})),this.game.globals.forEach((a=>{void 0!==a.global.phase&&e!==a.global.phase||t.push({name:a.name,desc:a.global.text,precondition:a.global.precondition,doit:e=>{a.global.doit(e),e.dispatch("deselect",{dice:e.game.selectedDice})}})})),t.push({name:"Start Attack Phase",desc:"Move to the Attack phase",precondition(e){if(0!==e.selectedDice.length)return"You need to deselect all your dice before moving to the attack phase"},doit({game:e,dispatch:t}){e.players[e.currentTurn].reserve.some((e=>"character"===e.face.type))&&!confirm("You haven't fielded all of your characters -- are you sure you want to move to the attack phase?")||(t("deselect",{dice:e.selectedDice}),t("startAttack"))}}),t}if("attack"===e){const t=[];return t.push({name:"Attack",desc:"Move characters from the field to attack",precondition:e=>0===e.selectedDice.length?"You need to select some characters to attack with":e.selectedDice.every((e=>"field"===e.location))?void 0:"You can only attack with characters in the field",doit({game:e,dispatch:t,commit:a}){a("moveAllDice",{source:"field",dice:[...e.selectedDice],dest:"attack"}),t("deselect",{dice:e.selectedDice})}}),this.game.globals.forEach((a=>{void 0!==a.global.phase&&e!==a.global.phase||t.push({name:a.name,desc:a.global.text,precondition:a.global.precondition,doit:e=>{a.global.doit(e),e.dispatch("deselect",{dice:e.game.selectedDice})}})})),t.push({name:"End Turn",precondition(e){if(0!==e.selectedDice.length)return"You need to deselect all your dice before finishing your turn"},doit({game:e,dispatch:t}){t("deselect",{dice:e.selectedDice}),t("finishTurn"),t("doTurnStart")}}),t}return[]}},methods:{attempt(e){if(e.precondition){const t=e.precondition(this.game);if(t)return void alert(t)}e.doit({game:this.game,dispatch:this.$store.dispatch,commit:this.$store.commit,gameui:this})},buttonStyle(e){if(e.precondition){if(e.precondition(this.game))return"btn-secondary"}return"btn-primary"},buttonTooltip(e){let t=e.desc;if(e.precondition){const a=e.precondition(this.game);a&&(t+="\n\n"+a)}return t}},mounted(){this.$store.dispatch("setupStarterGame")}},_e=y();c("data-v-05607dfa");const Le={class:"container-fluid"},Ne={class:"row px-3"},Ue={class:"col-5 card-area"},Be={class:"container-fluid"},Ve={class:"row mb-3"},qe={class:"col"},He={class:"text-end"},Je={class:"row mb-3"},Ke={class:"col"},Ge={class:"row"},Qe={class:"col"},Xe={class:"text-end"},Ze={class:"col-7 play-area d-flex flex-column"},et={key:0,class:"mb-3 action-area d-flex justify-content-center"};n();const tt=_e(((e,t,a,r,o,i)=>{const c=d("card-area"),n=d("play-area");return u(),h("div",Le,[f("div",Ne,[f("div",Ue,[f("div",Be,[f("div",Ve,[f("div",qe,[f(c,{cards:i.players[1].cards},null,8,["cards"]),f("div",He,[f("strong",null,p(i.players[1].name),1),g(" - "+p(i.players[1].health)+"hp",1)])])]),f("div",Je,[f("div",Ke,[f(c,{cards:i.game.actionCards},null,8,["cards"])])]),f("div",Ge,[f("div",Qe,[f("div",Xe,[f("strong",null,p(i.players[0].name),1),g(" - "+p(i.players[0].health)+"hp",1)]),f(c,{cards:i.players[0].cards},null,8,["cards"])])])])]),f("div",Ze,[f(n,{player:i.players[1],invert:!0,class:"mb-3"},null,8,["player"]),o.resolving?m("",!0):(u(),h("div",et,[(u(!0),h(v,null,b(i.moves,((e,t)=>(u(),h("div",{key:t,class:"me-2"},[f("button",{type:"button",class:["btn",i.buttonStyle(e)],title:i.buttonTooltip(e),onClick:t=>i.attempt(e)},p(e.name),11,["title","onClick"])])))),128))])),f(n,{player:i.players[0],class:"mb-3",onDieClicked:t[1]||(t[1]=t=>e.console.log(t))},null,8,["player"])])])])}));je.render=tt,je.__scopeId="data-v-05607dfa";const at=[{path:"/hello",name:"Hello",component:G},{path:"/",name:"Play",component:je}],rt=k({history:x("/mmdm/"),routes:at}),ot=location.origin.replace(/^http/,"ws"),it=(e,t)=>({num:e,name:`player${e}`,local:t,cards:[],ownedDice:{},health:-1,damageHistory:[],bag:[],attack:[],field:[],reserve:[],prep:[],outOfPlay:[],used:[]}),ct=e=>{const t=Math.floor(6*Math.random());e.face=e.faces[t]};let nt=1;let st=100;var lt=w({modules:{game:{state:()=>({gameid:null,players:[it(0,!0),it(1,!1)],actionCards:[],globals:[],currentTurn:0,phase:"roll",rerolled:!1,selectedDice:[],effectsToResolve:[]}),actions:{setupStarterGame({commit:e,state:t}){const a=`sg${nt}`;++nt,((e,t)=>{const a=ot+"/game/"+encodeURIComponent(e);try{new WebSocket(a).onmessage=e=>{console.log("sock event:",e)}}catch(r){return console.error(r),{onStateChanged(){}}}})(a),e("resetGame",{startingHealth:10}),e("addCardToPlayer",{playerNum:0,card:S("Sprite","KittyPryde"),numDice:2}),e("addCardToPlayer",{playerNum:0,card:S("Optic Blast","Cyclops"),numDice:2}),e("addCardToPlayer",{playerNum:1,card:S("Air Transport","Angel"),numDice:2}),e("addCardToPlayer",{playerNum:1,card:S("Cain Marko","Juggernaut"),numDice:2}),e("addActionCard",{card:S("Ambush"),numDice:3}),e("addActionCard",{card:S("Enrage"),numDice:3}),e("addActionCard",{card:S("Reckless Melee"),numDice:3})},doTurnStart({commit:e,state:t}){e("moveAllDice",{source:"reserve",dest:"used"}),e("moveAllDice",{source:"outOfPlay",dest:"used"})},doRollPhase({commit:e,state:t}){const a=t.players[t.currentTurn];for(let r=0;r<4;++r)0===a.bag.length&&e("moveAllDice",{source:"used",dest:"bag"}),e("drawDie");e("moveAllDice",{source:"prep",dest:"reserve"}),e("rollDice",{dice:a.reserve}),e("changePhase",{phase:"main"})},doReroll({commit:e,state:t},{dice:a}){if("main"!==t.phase)throw`trying to reroll when in the ${t.phase} phase is forbidden!`;if(t.rerolled)throw"only one reroll is allowed!";e("rollDice",{dice:a}),e("setRerolled")},doBuyDice({commit:e,state:t},{diceToBuy:a,diceToSpend:r,diceToSpinDown:o}){if("main"!==t.phase)throw`trying to buy dice when in the ${t.phase} phase is forbidden!`;a.forEach((a=>e("buyDie",{playerNum:t.currentTurn,die:a}))),e("moveAllDice",{source:"reserve",dice:r,dest:"outOfPlay"}),o.forEach((t=>e("spinDown",{die:t})))},doField({commit:e,state:t},{diceToField:a,diceToSpend:r,diceToSpinDown:o}){if("main"!==t.phase)throw`trying to field characters when in the ${t.phase} phase is forbidden!`;a.forEach((t=>{void 0!==t.card&&void 0!==t.card.whenFielded&&e("addEffectToResolve",{die:t,effect:"whenFielded"})})),e("moveAllDice",{source:"reserve",dice:a,dest:"field"}),e("moveAllDice",{source:"reserve",dice:r,dest:"outOfPlay"}),o.forEach((t=>e("spinDown",{die:t})))},startAttack({commit:e,state:t}){if("main"!==t.phase)throw`trying to move to attack phase when in the ${t.phase} phase is forbidden!`;if(t.selectedDice.length>0)throw"can't start attack while dice are still selected";e("moveAllDice",{source:"reserve",dice:t.players[t.currentTurn].reserve.filter((e=>"character"===e.face.type)),dest:"used"}),e("changePhase",{phase:"attack"})},finishTurn({commit:e,state:t}){if("attack"!==t.phase)throw`trying to finish turn when in the ${t.phase} phase is forbidden!`;if(t.selectedDice.length>0)throw"can't end turn while dice are still selected";t.players.forEach((t=>{const a=t.field.filter((e=>e.ko));e("moveAllDice",{source:"field",dice:a,dest:"prep"});const r=t.attack.filter((e=>e.ko));e("moveAllDice",{source:"attack",dice:r,dest:"prep"}),e("moveAllDice",{source:"attack",dest:"field"})}));const a=t.players[t.currentTurn].reserve.filter((e=>"action"===e.face.type));e("moveAllDice",{source:"reserve",dice:a,dest:"used"}),e("moveAllDice",{source:"outOfPlay",dest:"used"}),e("endTurn")},dieClicked({commit:e,state:t},{die:a}){e("toggleDieSelection",{die:a})},deselect({commit:e},{dice:t}){[...t].forEach((t=>{e("toggleDieSelection",{die:t,selected:!1})}))},clearResolvedEffects({commit:e}){e("clearResolvedEffects")}},mutations:{addCardToPlayer(e,{playerNum:t,card:a,numDice:r}){const o=e.players[t],c=i(i({},a),{numDice:r,owner:t,dice:[]});c.die=((e,t=null)=>{const a=(t?t.characters:T.characters)[e.character],r=C(a.fg),o=C(a.bg),i={fg:r,bg:o,icon:a.energy,type:"energy"},c={fg:r,bg:o,icon:a.energy+"x2",type:"energy"},n=[i,c,c];for(let s=0;s<3;++s){const t={fg:r,bg:o,icon:e.character.toLowerCase(),field:+a.faces[s][0],attack:+a.faces[s][1],defense:+a.faces[s][2],type:"character"};a.bursts&&a.bursts[s]>0&&(t.bursts="****".substring(0,a.bursts[s])),n.push(t)}return{card:e,character:a,faces:n,type:"character",ko:!1,modifiers:[]}})(c);for(let n=0;n<r;++n){const e=i(i({},c.die),{uid:st++,card:c,location:"card"});ct(e),c.dice.push(e)}o.cards.push(c),c.global&&e.globals.push(c)},addActionCard(e,{card:t,numDice:a}){const r=i(i({},t),{numDice:a,tint:P(e.actionCards),dice:[]});r.die=(e=>{const t=e.tint?e.tint:"#fff",a=[];for(let o=0;o<3;++o)a.push({bg:t,fg:"#222",icon:"two",type:"energy"});let r="";for(let o=0;o<3;++o)a.push({bg:t,fg:"#222",icon:"action",bursts:r,type:"action"}),r+="*";return{card:e,faces:a,type:"action",modifiers:[]}})(r);for(let o=0;o<a;++o){const e=i(i({},r.die),{uid:st++,card:r,location:"card"});ct(e),r.dice.push(e)}e.actionCards.push(r),r.global&&e.globals.push(r)},changePhase(e,{phase:t}){e.phase=t},endTurn(e){e.currentTurn=1-e.currentTurn,e.phase="roll",e.rerolled=!1,e.players.forEach((e=>{Object.values(e.ownedDice).forEach((e=>{e.modifiers=[],e.ko=!1}))}))},setRerolled(e){e.rerolled=!0},toggleDieSelection(e,t){const{die:a}=t;void 0!==t.selected&&a.selected===t.selected||(a.selected?(a.selected=!1,e.selectedDice.splice(e.selectedDice.indexOf(a),1)):(a.selected=!0,e.selectedDice.push(a)))},buyDie(e,{playerNum:t,die:a}){const r="used",o=e.players[t],i=o.used,c=a.card.dice;if(void 0!==a.card.owner&&a.card.owner!==t)return console.error(`tried to buy die ${a.uid} but it's owned by someone else`),console.log(a),void console.log(card);const n=c.findIndex((e=>e.uid===a.uid));if(n<0)return console.error(`tried to buy die ${a.uid} but we couldn't find where it came from`),console.log(a),void console.log(c);c.splice(n,1),a.owner=t,o.ownedDice[a.uid]=a,a.location=r,ct(a),i.push(a)},drawDie(e){const t=e.players[e.currentTurn],a=t.bag;if(0===a.length)return console.error("tried to draw die but the bag's empty!"),void console.log(t);const r=Math.floor(Math.random()*a.length),o=a.splice(r,1)[0];o.location="prep",ct(o),t.prep.push(o)},moveAllDice(e,t){const{source:a,dest:r}=t,o=e.players[e.currentTurn],i=void 0!==t.dice,c=i?t.dice:o[a];for(;c.length>0;){const e=c.pop();i&&o[a].splice(o[a].indexOf(e),1),o[r].push(e),e.location=r}},rollDice(e,{dice:t}){t.forEach(ct)},spinDown(e,{die:t}){const a=t.face.icon.replace("x2",""),r=t.faces.find((e=>e.icon===a));if(void 0===r)throw"Cannot spin down a die that has no single-energy sides!";t.face=r,t.modifiers.push({stat:"spindown",amount:1,source:"spinDown"})},addModifier(e,{die:t,stat:a,amount:r,source:o}){t.modifiers.push({stat:a,amount:r,source:o})},resetModifiers(e){e.players.forEach((e=>{Object.values(e.ownedDice).forEach((e=>{e.modifiers=[]}))}))},damageDie(e,{die:t,amount:a,source:r}){t.face.defense+Y(t,"defense")+Y(t,"hp")-a>0?t.modifiers.push({stat:"hp",amount:-a,source:r}):t.ko=!0},damagePlayer(e,{playerNum:t,amount:a,source:r}){const o=e.players[t];o.damageHistory.push({amount:a,source:r}),o.health-=a,o.health<=0&&(e.finished||(e.finished=!0,e.winner=1-t))},addEffectToResolve(e,{die:t,effect:a}){e.effectsToResolve.push({die:t,effect:a})},clearResolvedEffects(e){e.effectsToResolve=[]},resetGame(e,{startingHealth:t}){e.finished=!1,e.winner=-1,e.players.forEach(((e,a)=>{e.health=t,e.damageHistory=[],e.cards=[],e.ownedDice={},e.bag=[],e.attack=[],e.field=[],e.reserve=[],e.prep=[],e.outOfPlay=[],e.used=[];for(let t=0;t<8;++t){const t=A();t.uid=st++,t.owner=a,t.location="bag",ct(t),e.bag.push(t),e.ownedDice[t.uid]=t}})),e.actionCards=[]}}}},strict:!1,plugins:[]});const dt=D({expose:[],setup:e=>(e,t)=>{const a=d("router-view");return u(),h(a)}});dt.use(rt),dt.use(lt),dt.mount("#app");