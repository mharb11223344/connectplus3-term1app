"use strict";

const STORAGE_KEY="connectPlus3MonaHarbV2";
const DEFAULT_STATE={
  student:"",className:"",xp:0,coins:0,stars:0,solved:0,correct:0,
  completed:[],unitReviews:[],readerCompleted:[],badges:[],sound:true,
  lastRoute:{view:"dashboard"},lastLesson:"1-1",lastSection:"vocabulary",
  activeQuiz:null,quizProgress:{},vocabCorrect:0
};
let state=loadState();
let currentItem=null,currentQuiz=[],quizContext=null,currentQuestion=0,answerLocked=false;
let orderBuild=[],nextTimer=null,audioContext=null;

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const mainEl=()=>$("#main");
const esc=value=>String(value??"").replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]));
const enc=value=>encodeURIComponent(String(value));
const dec=value=>decodeURIComponent(String(value));

function loadState(){
  try{return {...DEFAULT_STATE,...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")};}
  catch(error){return {...DEFAULT_STATE};}
}
function saveState(updateNavigation=true){
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
  if(window.top!==window)window.parent.postMessage({type:'mona:progress-changed',appId:'connectplus3-term1app'},location.origin);
  updateTopbar();
  if(updateNavigation)renderSidebar();
}
function resetState(){
  const student=state.student,className=state.className,sound=state.sound;
  state={...DEFAULT_STATE,student,className,sound};
  localStorage.setItem(STORAGE_KEY,JSON.stringify(state));
}
function hash(text){return [...String(text)].reduce((total,char)=>((total<<5)-total)+char.charCodeAt(0),0)|0;}
function shuffle(items,seed=17){
  const result=[...items];let value=Math.abs(Number(seed)||17)+29;
  for(let index=result.length-1;index>0;index--){value=(value*9301+49297)%233280;const swap=Math.floor(value/233280*(index+1));[result[index],result[swap]]=[result[swap],result[index]];}
  return result;
}
function unique(items,keyFn=item=>JSON.stringify(item)){
  const seen=new Set();return items.filter(item=>{const key=keyFn(item);if(seen.has(key))return false;seen.add(key);return true;});
}
function blankWord(sentence,word){
  const safe=String(word).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
  return String(sentence).replace(new RegExp(safe,"i"),"____");
}
function setRoute(route){state.lastRoute=route;saveState(false);}
function setView(html,route=null){
  mainEl().innerHTML=`${html}<footer class="footer-note">Connect Plus Primary 3 · First Term · Prepared for Mrs. Mona Harb</footer>`;
  hydrateCovers(mainEl());
  mainEl().focus({preventScroll:true});
  window.scrollTo({top:0,behavior:"smooth"});
  if(route)setRoute(route);
  closeMenu();
}
function icon(name){return `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;}
function crumbs(parts){
  return `<nav class="crumbs" aria-label="Breadcrumb">${parts.map((part,index)=>{
    const separator=index?icon("arrow"):"";
    return `${separator}${part.action?`<button type="button" data-action="${part.action}" ${part.id?`data-id="${esc(part.id)}"`:""}>${esc(part.label)}</button>`:`<span>${esc(part.label)}</span>`}`;
  }).join("")}</nav>`;
}

function hydrateCovers(root=document){
  root.querySelectorAll("[data-cover]").forEach(element=>{
    const coverKey=element.dataset.cover;
    const path=window.EMBEDDED_COVERS?.[coverKey]||COVER_MAP[coverKey];if(!path)return;
    let overlay="linear-gradient(160deg,rgba(67,30,104,.03),rgba(67,30,104,.20))";
    if(element.classList.contains("dashboard-hero")||element.classList.contains("page-hero"))overlay="linear-gradient(90deg,rgba(48,22,77,.94) 0%,rgba(73,33,108,.73) 52%,rgba(73,33,108,.12))";
    if(element.classList.contains("reader-card"))overlay="linear-gradient(transparent 28%,rgba(31,17,44,.88))";
    if(element.classList.contains("teacher-visual"))overlay="linear-gradient(0deg,rgba(44,20,66,.83),rgba(71,33,103,.08))";
    if(element.classList.contains("splash-visual"))overlay="linear-gradient(180deg,rgba(48,22,77,.02) 35%,rgba(35,16,56,.72))";
    element.style.backgroundImage=`${overlay},url("${path}")`;
    element.dataset.coverReady="true";
  });
}

function init(){
  hydrateCovers(document);
  const saved=Boolean(state.student);
  if(saved){
    $("#studentName").value=state.student;$("#className").value=state.className||"";
    $("#resumeButtons").classList.remove("hidden");
  }
  $("#startBtn").addEventListener("click",()=>startApp("start"));
  $("#menuBtn").addEventListener("click",toggleMenu);
  $("#soundBtn").addEventListener("click",toggleSound);
  $("#scrim").addEventListener("click",closeMenu);
  document.addEventListener("click",handleAction);
  document.addEventListener("keydown",handleKeys);
  $("#teacherModal").addEventListener("click",event=>{if(event.target.id==="teacherModal")closeTeacher();});
  $("#confirmModal").addEventListener("click",event=>{if(event.target.id==="confirmModal")closeReset();});
  updateTopbar();
  // The portal already owns the student account and restores this app's progress.
  if(window.top!==window){
    $("#splash").classList.add("hidden");
    if(ensureApp())showDashboard();
    else mainEl().textContent="Please reopen this application from your learning portal.";
  }
  if("serviceWorker" in navigator&&location.protocol.startsWith("http"))navigator.serviceWorker.register("service-worker.js").catch(()=>{});
}

function handleAction(event){
  const button=event.target.closest("[data-action]");if(!button)return;
  const {action,id,section,mode,value,index}=button.dataset;
  const actions={
    "dashboard":showDashboard,"resume-lesson":resumeLesson,"resume-question":resumeQuestion,
    "teacher":openTeacher,"close-teacher":closeTeacher,"show-unit":()=>showUnit(Number(id)),
    "show-lesson":()=>showLesson(id),"show-section":()=>showSection(id,section),
    "readers":showReaders,"show-reader":()=>showReader(id),"show-chapter":()=>showLesson(id),
    "reviews":showReviews,"start-unit-review":()=>startUnitReview(Number(id)),
    "start-mega-review":()=>startMegaReview(id),"start-quiz":()=>startQuizFor(id,mode||"lesson"),
    "glossary":showGlossary,"achievements":showAchievements,"certificate":showCertificate,
    "reset":openReset,"cancel-reset":closeReset,"confirm-reset":confirmReset,
    "answer":()=>chooseAnswer(dec(value),button),"next-question":nextQuestion,
    "order-word":()=>addOrderWord(Number(index)),"clear-order":clearOrder,"check-order":checkOrder,
    "check-fill":checkFill,"check-match":checkMatch,"print-certificate":()=>window.print(),
    "speak":()=>speak(dec(value)),"retry-quiz":retryQuiz,"lesson-menu":()=>showLesson(id)
  };
  if(actions[action])actions[action]();
}
function handleKeys(event){
  if(event.key==="Escape"){closeTeacher();closeReset();closeMenu();}
  if(answerLocked)return;
  if(currentQuiz.length&&["1","2","3","4"].includes(event.key)){
    const option=$$(".option")[Number(event.key)-1];if(option)option.click();
  }
}

function startApp(intent){
  const student=$("#studentName").value.trim(),className=$("#className").value.trim();
  if(!student){$("#studentName").focus();toast("Please write the student's name first.");return;}
  if(state.student&&state.student.toLowerCase()!==student.toLowerCase()&&intent==="start"){
    state={...DEFAULT_STATE,student,className};
  }else{state.student=student;state.className=className;}
  saveState(false);
  $("#splash").classList.add("hidden");$("#app").classList.remove("hidden");
  renderSidebar();updateTopbar();showDashboard();
}
function ensureApp(){
  if(!state.student)return false;
  $("#splash").classList.add("hidden");$("#app").classList.remove("hidden");renderSidebar();return true;
}
function toggleMenu(){$("#sidebar").classList.toggle("open");$("#scrim").classList.toggle("hidden",!$("#sidebar").classList.contains("open"));}
function closeMenu(){$("#sidebar")?.classList.remove("open");$("#scrim")?.classList.add("hidden");}
function openTeacher(){$("#teacherModal").classList.remove("hidden");hydrateCovers($("#teacherModal"));}
function closeTeacher(){$("#teacherModal").classList.add("hidden");}
function openReset(){$("#confirmModal").classList.remove("hidden");}
function closeReset(){$("#confirmModal").classList.add("hidden");}
function confirmReset(){resetState();closeReset();renderSidebar();showDashboard();toast("Progress has been reset.");}
function toggleSound(){state.sound=!state.sound;saveState(false);updateTopbar();toast(state.sound?"Sound is on.":"Sound is off.");}
function updateTopbar(){
  if(!$("#topStars"))return;$("#topStars").textContent=state.stars;$("#topCoins").textContent=state.coins;
  $("#soundBtn").classList.toggle("muted",!state.sound);$("#soundBtn").title=state.sound?"Turn sound off":"Turn sound on";
}

function speak(text){
  if(!state.sound||!("speechSynthesis" in window))return;
  speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang="en-US";utterance.rate=.82;utterance.pitch=1.05;
  const voices=speechSynthesis.getVoices();utterance.voice=voices.find(voice=>/zira|samantha|female|google us english/i.test(voice.name))||voices.find(voice=>/^en-US/i.test(voice.lang))||voices.find(voice=>/^en/i.test(voice.lang))||null;
  speechSynthesis.speak(utterance);
}
function tone(kind){
  if(!state.sound)return;
  try{
    audioContext=audioContext||new(window.AudioContext||window.webkitAudioContext)();
    const oscillator=audioContext.createOscillator(),gain=audioContext.createGain();
    oscillator.connect(gain);gain.connect(audioContext.destination);oscillator.type=kind==="good"?"sine":"triangle";oscillator.frequency.value=kind==="good"?660:190;
    gain.gain.setValueAtTime(.08,audioContext.currentTime);gain.gain.exponentialRampToValueAtTime(.001,audioContext.currentTime+.3);oscillator.start();oscillator.stop(audioContext.currentTime+.31);
  }catch(error){}
}
function toast(message){
  const element=$("#toast");element.textContent=message;element.classList.remove("hidden");clearTimeout(element._timer);element._timer=setTimeout(()=>element.classList.add("hidden"),2600);
}
function celebrate(){
  const holder=$("#celebration"),colors=["#7540d8","#ee70aa","#42c9b0","#f5b945","#40b8d6"];
  holder.innerHTML=Array.from({length:52},(_,index)=>`<i class="confetti" style="left:${(index*37)%100}%;background:${colors[index%colors.length]};--x:${(index%2?1:-1)*(30+(index*13)%150)}px;animation-delay:${(index%11)*.04}s"></i>`).join("");
  setTimeout(()=>holder.innerHTML="",2300);
}

function portalUnitOpen(id){try{if(window.top===window)return true;const row=JSON.parse(localStorage.getItem('mona-unit-control-connectplus3-term1app')||'{}');return !Array.isArray(row.openUnits)||row.openUnits.includes(Number(id))}catch{return true}}
function portalUnitMessage(){toast('This unit is closed by Mrs. Mona Harb.');}
function unitCompleted(unit){return unit.lessons.every(lesson=>state.completed.includes(lesson.id));}
function unitUnlocked(unitId){return unitId===1||unitCompleted(UNITS.find(unit=>unit.id===unitId-1));}
function lessonUnlocked(lessonId){
  const index=ALL_LESSONS.findIndex(lesson=>lesson.id===lessonId);return index===0||state.completed.includes(lessonId)||state.completed.includes(ALL_LESSONS[index-1].id);
}
function readerUnlocked(readerId){return readerId==="hospitals"?UNITS.slice(0,3).every(unitCompleted):UNITS.every(unitCompleted);}
function chapterUnlocked(chapterId){
  const reader=READERS.find(item=>item.chapters.some(chapter=>chapter.id===chapterId));if(!reader||!readerUnlocked(reader.id))return false;
  const index=reader.chapters.findIndex(chapter=>chapter.id===chapterId);return index===0||state.readerCompleted.includes(chapterId)||state.readerCompleted.includes(reader.chapters[index-1].id);
}
function itemUnlocked(item){return item.kind==="reader"?chapterUnlocked(item.id):lessonUnlocked(item.id);}
function unitProgress(unit){const done=unit.lessons.filter(lesson=>state.completed.includes(lesson.id)).length;return{done,total:unit.lessons.length,pct:Math.round(done/unit.lessons.length*100)};}
function courseProgress(){const done=ALL_LESSONS.filter(lesson=>state.completed.includes(lesson.id)).length;return{done,total:ALL_LESSONS.length,pct:Math.round(done/ALL_LESSONS.length*100)};}

function renderSidebar(){
  const sidebar=$("#sidebar");if(!sidebar)return;
  const unitButtons=UNITS.map(unit=>{const progress=unitProgress(unit),locked=!unitUnlocked(unit.id);return `<button class="nav-item ${locked?"locked":""}" type="button" data-action="show-unit" data-id="${unit.id}">${locked?icon("lock"):icon("book")}<span>Unit ${unit.id}: ${esc(unit.title)}</span><span class="nav-progress"><i style="width:${progress.pct}%"></i></span></button>`;}).join("");
  sidebar.innerHTML=`
    <div class="sidebar-profile"><div class="sidebar-avatar">${esc((state.student||"S").charAt(0).toUpperCase())}</div><div><b>${esc(state.student||"Student")}</b><small>${esc(state.className||"Primary 3")}</small></div></div>
    <div class="nav-heading">My Journey</div>
    <button class="nav-item" type="button" data-action="dashboard">${icon("home")}<span>Dashboard</span></button>
    <button class="nav-item" type="button" data-action="resume-lesson">${icon("play")}<span>Continue lesson</span></button>
    <button class="nav-item" type="button" data-action="resume-question">${icon("check")}<span>Continue question</span></button>
    <div class="nav-heading">Course Units</div>${unitButtons}
    <div class="nav-heading">Reading Library</div>
    <button class="nav-item" type="button" data-action="readers">${icon("book")}<span>Readers and Story</span></button>
    <button class="nav-item" type="button" data-action="reviews">${icon("check")}<span>Reviews</span></button>
    <button class="nav-item" type="button" data-action="glossary">${icon("book")}<span>Glossary</span></button>
    <button class="nav-item" type="button" data-action="achievements">${icon("trophy")}<span>Achievements</span></button>
    <button class="nav-item" type="button" data-action="certificate">${icon("star")}<span>Certificate</span></button>
    <div class="nav-heading">Settings</div>
    <button class="nav-item" type="button" data-action="reset">${icon("reset")}<span>Reset progress</span></button>`;
}

function showDashboard(){
  if(!ensureApp())return;
  const progress=courseProgress();
  const unitCards=UNITS.map(unit=>{const p=unitProgress(unit),locked=!unitUnlocked(unit.id);return `
    <article class="unit-card ${locked?"locked":""}">
      <div class="unit-cover image-cover" data-cover="${unit.cover}"><span class="unit-number">UNIT ${unit.id}</span>${locked?`<span class="unit-lock">${icon("lock")}</span>`:""}</div>
      <div class="unit-body"><h3>${esc(unit.title)}</h3><p>${esc(unit.description)}</p><div class="progress-line"><i style="width:${p.pct}%"></i></div>
      <div class="unit-footer"><small>${p.done}/${p.total} lessons complete</small><button class="btn ${locked?"btn-ghost":"btn-primary"}" type="button" data-action="show-unit" data-id="${unit.id}">${locked?"Locked":"Explore"}</button></div></div>
    </article>`;}).join("");
  setView(`
    <section class="dashboard-hero image-cover" data-cover="app-cover"><div class="hero-panel"><span class="micro-label light">YOUR ENGLISH ADVENTURE</span><h1>Welcome, ${esc(state.student||"Superstar")}!</h1><p>Every word you learn is a new superpower. Continue from exactly where you stopped and collect stars as you master Connect Plus.</p><div class="button-row"><button class="btn btn-primary" type="button" data-action="resume-lesson">Continue Last Lesson ${icon("arrow")}</button><button class="btn btn-soft" type="button" data-action="resume-question">Continue Last Question</button></div></div></section>
    <section class="stats-grid"><article class="stat-card"><div class="stat-icon">${icon("check")}</div><div><strong>${progress.pct}%</strong><span>COURSE PROGRESS</span></div></article><article class="stat-card"><div class="stat-icon">XP</div><div><strong>${state.xp}</strong><span>XP POINTS</span></div></article><article class="stat-card"><div class="stat-icon">${icon("star")}</div><div><strong>${state.stars}</strong><span>STARS EARNED</span></div></article><article class="stat-card"><div class="stat-icon">${icon("trophy")}</div><div><strong>${state.correct}/${state.solved}</strong><span>CORRECT ANSWERS</span></div></article></section>
    <div class="section-head"><div><h2>Your Learning Map</h2><p>Six connected units built directly from the Ministry book.</p></div><div class="button-row"><button class="btn btn-soft" type="button" data-action="readers">Readers</button><button class="btn btn-soft" type="button" data-action="reviews">Reviews</button></div></div>
    <div class="theme-strip"><div><strong>Theme 1: Who am I?</strong><br><span>Living healthy · Units 1–3</span></div></div>
    <section class="unit-grid">${unitCards.slice(0,3)}</section>
    <div class="theme-strip green"><div><strong>Theme 2: The world around me</strong><br><span>Taking care of our world · Units 4–6</span></div></div>
    <section class="unit-grid">${unitCards.slice(3)}</section>`,{view:"dashboard"});
}

function showUnit(unitId){
  if(!portalUnitOpen(unitId)){portalUnitMessage();return;}
  const unit=UNITS.find(item=>item.id===unitId);if(!unit)return;
  if(!unitUnlocked(unitId)){toast("Complete the previous unit first.");return;}
  const progress=unitProgress(unit);
  const lessonCards=unit.lessons.map((lesson,index)=>{const locked=!lessonUnlocked(lesson.id),done=state.completed.includes(lesson.id);return `
    <article class="lesson-card ${locked?"locked":""}"><div class="lesson-cover image-cover" data-cover="${lesson.cover}"><span class="status-chip">${done?"COMPLETED":locked?"LOCKED":`LESSON ${index+1}`}</span></div><div class="lesson-card-body"><span class="micro-label">LESSON ${index+1}</span><h3>${esc(lesson.title)}</h3><p>${esc(lesson.subtitle)}</p><button class="btn ${locked?"btn-ghost":done?"btn-soft":"btn-primary"}" type="button" data-action="show-lesson" data-id="${lesson.id}">${locked?`${icon("lock")} Locked`:done?"Review Again":"Start Lesson"}</button></div></article>`;}).join("");
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:`Unit ${unit.id}`}])}<section class="page-hero image-cover" data-cover="${unit.cover}"><div class="page-hero-copy"><span class="micro-label light">UNIT ${unit.id} · ${progress.pct}% COMPLETE</span><h1>${esc(unit.title)}</h1><p>${esc(unit.description)}<br><b>Life skill:</b> ${esc(unit.lifeSkill)}</p></div><div class="page-hero-actions"><button class="btn btn-soft" type="button" data-action="start-unit-review" data-id="${unit.id}">${unitCompleted(unit)?"Start 50-Question Unit Review":"Review unlocks after all lessons"}</button></div></section><div class="section-head"><div><h2>Learning Missions</h2><p>Open each section separately. Your exact place is saved.</p></div></div><section class="lesson-grid">${lessonCards}</section>`,{view:"unit",id:unit.id});
}

const SECTION_INFO={
  vocabulary:{title:"Vocabulary",icon:"WORDS",description:"Hear every key word, read a simple definition, and see it in context."},
  phrases:{title:"Key Expressions",icon:"TALK",description:"Practice useful phrases and complete sentence patterns."},
  definitions:{title:"Important Definitions",icon:"MEAN",description:"Review the lesson's scientific and language definitions in one table."},
  notes:{title:"Language Notes",icon:"NOTE",description:"Notice small differences, collocations, spelling, and usage."},
  grammar:{title:"Grammar",icon:"RULE",description:"Learn the form, meaning, and clear examples before practice."},
  phonics:{title:"Phonics",icon:"SOUND",description:"Blend target sounds and listen to model words."},
  reading:{title:"Reading Summary",icon:"READ",description:"Understand the text through an organized teaching summary."},
  practice:{title:"Interactive Practice",icon:"QUIZ",description:"Answer at least 24 varied questions and unlock the next lesson."}
};
function getItem(id){return ALL_CONTENT.find(item=>item.id===id);}
function showLesson(id){
  const gatedItem=getItem(id);if(gatedItem?.kind==='unit'&&!portalUnitOpen(gatedItem.unitId)){portalUnitMessage();return;}
  const item=getItem(id);if(!item)return;if(!itemUnlocked(item)){toast("Complete the previous lesson first.");return;}
  currentItem=item;state.lastLesson=id;saveState(false);
  const unit=item.kind==="unit"?UNITS.find(entry=>entry.id===item.unitId):null;
  const reader=item.kind==="reader"?READERS.find(entry=>entry.id===item.readerId):null;
  const sections=Object.entries(SECTION_INFO).filter(([key])=>key!=="phonics"||item.phonics).map(([key,info])=>`<article class="section-card"><div class="section-card-icon">${info.icon}</div><h3>${info.title}</h3><p>${info.description}</p><button class="btn btn-soft" type="button" data-action="show-section" data-id="${item.id}" data-section="${key}">Open</button></article>`).join("");
  const parentCrumb=item.kind==="unit"?{label:`Unit ${item.unitId}`,action:"show-unit",id:item.unitId}:{label:reader.title,action:"show-reader",id:reader.id};
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},parentCrumb,{label:item.title}])}<section class="lesson-intro"><div class="lesson-intro-cover image-cover" data-cover="${item.cover}"></div><div class="lesson-intro-copy"><span class="micro-label">${item.kind==="unit"?`UNIT ${item.unitId} · LESSON ${item.index+1}`:`${reader.type} · CHAPTER ${item.index+1}`}</span><h1>${esc(item.title)}</h1><p>${esc(item.subtitle)}</p><div class="progress-line"><i style="width:${state.completed.includes(item.id)||state.readerCompleted.includes(item.id)?100:12}%"></i></div><p><small>${state.completed.includes(item.id)||state.readerCompleted.includes(item.id)?"Completed · You can review any section.":"Choose a section below. Progress is saved automatically."}</small></p><button class="btn btn-primary" type="button" data-action="show-section" data-id="${item.id}" data-section="vocabulary">Start with Vocabulary ${icon("arrow")}</button></div></section><section class="content-menu">${sections}</section>`,{view:"lesson",id:item.id});
}

function showSection(id,section){
  const gatedItem=getItem(id);if(gatedItem?.kind==='unit'&&!portalUnitOpen(gatedItem.unitId)){portalUnitMessage();return;}
  const item=getItem(id);if(!item)return;currentItem=item;state.lastLesson=id;state.lastSection=section;saveState(false);
  if(section==="practice"){startQuizFor(id,"lesson");return;}
  let body="";const info=SECTION_INFO[section];
  if(section==="vocabulary")body=`<div class="vocab-grid">${item.vocab.map(entry=>`<article class="vocab-card"><button class="speak-btn" type="button" data-action="speak" data-value="${enc(entry.word)}" aria-label="Listen to ${esc(entry.word)}">${icon("sound")}</button><div class="vocab-word">${esc(entry.word)}</div><div class="vocab-def">${esc(entry.definition)}</div><div class="example">${esc(entry.example)}</div></article>`).join("")}</div>`;
  if(section==="phrases")body=`<div class="chip-wrap">${item.phrases.map(phrase=>`<button class="phrase-chip" type="button" data-action="speak" data-value="${enc(phrase)}">${icon("sound")} ${esc(phrase)}</button>`).join("")}</div>`;
  if(section==="definitions")body=`<div class="table-scroll"><table class="definition-table"><thead><tr><th>Word</th><th>Simple definition</th><th>Example</th></tr></thead><tbody>${item.vocab.map(entry=>`<tr><td>${esc(entry.word)}</td><td>${esc(entry.definition)}</td><td>${esc(entry.example)}</td></tr>`).join("")}</tbody></table></div>`;
  if(section==="notes")body=`<div class="note-list">${item.notes.map(note=>`<div class="note">${esc(note)}</div>`).join("")}</div>`;
  if(section==="grammar")body=`<article class="grammar-box"><div class="grammar-head"><h2>${esc(item.grammar.title)}</h2><p>${esc(item.grammar.rule)}</p></div><div class="grammar-examples">${item.grammar.examples.map(example=>`<div class="grammar-example"><b>${esc(example[0])}</b><span>${esc(example[1])}</span></div>`).join("")}</div></article>`;
  if(section==="phonics")body=`<article class="phonics-hero"><span class="micro-label">PHONICS FOCUS</span><h2>${esc(item.phonics.sound)}</h2><p>${esc(item.phonics.rule)}</p><div class="sound-words">${item.phonics.words.map(word=>`<button class="sound-word" type="button" data-action="speak" data-value="${enc(word)}">${icon("sound")} ${esc(word)}</button>`).join("")}</div></article>`;
  if(section==="reading")body=`<article class="story-box"><span class="micro-label">TEACHING SUMMARY</span><h2>${esc(item.reading.title)}</h2><p class="story-summary">${esc(item.reading.summary)}</p><div class="story-points">${item.reading.points.map((point,index)=>`<div class="story-point"><b>${index+1}</b><span>${esc(point)}</span></div>`).join("")}</div><div class="main-idea"><b>Main idea:</b> ${esc(item.reading.mainIdea)}</div></article>`;
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:item.title,action:"show-lesson",id:item.id},{label:info.title}])}<section class="content-panel"><div class="content-title-row"><div><span class="micro-label">${esc(item.title)}</span><h1>${esc(info.title)}</h1><p>${esc(info.description)}</p></div><button class="btn btn-ghost back-btn" type="button" data-action="lesson-menu" data-id="${item.id}">Back to Lesson Menu</button></div>${body}</section>`,{view:"section",id:item.id,section});
}

function makeLessonQuestions(item){
  const vocabulary=item.vocab,seed=Math.abs(hash(item.id)),words=vocabulary.map(entry=>entry.word);
  const definitionChoices=vocabulary.slice(0,6).map((entry,index)=>q(`Which word means “${entry.definition}”?`,shuffle([entry.word,...shuffle(words.filter(word=>word!==entry.word),seed+index).slice(0,3)],seed+index+33),entry.word,`${entry.word}: ${entry.definition}`));
  const sentenceChoices=vocabulary.slice(0,4).map((entry,index)=>q(`Choose the missing word: ${blankWord(entry.example,entry.word)}`,shuffle([entry.word,...shuffle(words.filter(word=>word!==entry.word),seed+index+77).slice(0,3)],seed+index+99),entry.word,`Correct sentence: ${entry.example}`));
  const fills=vocabulary.slice(4,6).map(entry=>({type:"fill",text:`Write the missing word: ${blankWord(entry.example,entry.word)}`,answer:entry.word,why:`Correct sentence: ${entry.example}`}));
  const trueFalse=vocabulary.slice(0,4).map((entry,index)=>index%2===0?tf(`${entry.word} means “${entry.definition}”.`,true,`${entry.word}: ${entry.definition}`):tf(`${entry.word} means “${vocabulary[(index+2)%vocabulary.length].definition}”.`,false,`${entry.word}: ${entry.definition}`));
  const orders=vocabulary.slice(0,3).map(entry=>({type:"order",text:"Put the words in the correct order.",answer:entry.example.replace(/[.!?]+$/,""),why:`Correct order: ${entry.example}`}));
  const matches=[0,3].map(start=>({type:"match",text:"Match each word with its correct definition.",pairs:vocabulary.slice(start,start+3).map(entry=>[entry.word,entry.definition]),answer:"match",why:"Each word is matched to its lesson definition."}));
  const direct=(item.questions||[]).map(question=>({...question}));
  const grammar=item.grammar.examples.slice(0,2).map(example=>tf(`“${example[1]}” is a correct example in this lesson.`,true,`Correct example: ${example[1]}`));
  return unique([...definitionChoices,...sentenceChoices,...fills,...trueFalse,...orders,...matches,...direct,...grammar],question=>question.type+question.text+String(question.answer||"")+JSON.stringify(question.pairs||[])).slice(0,26);
}
function questionPool(items,count,seed){
  const pool=items.flatMap(item=>makeLessonQuestions(item).map(question=>({...question,source:item.title})));
  return shuffle(unique(pool,question=>question.type+question.text+String(question.answer||"")+JSON.stringify(question.pairs||[])),seed).slice(0,count);
}
function startQuizFor(id,mode="lesson",resume=true){
  const item=getItem(id);if(!item)return;currentItem=item;
  const key=`lesson:${id}`,questions=makeLessonQuestions(item);
  beginQuiz({key,title:`${item.title} Practice`,mode:"lesson",itemId:id,questions},resume);
}
function startUnitReview(unitId,resume=true){
  if(!portalUnitOpen(unitId)){portalUnitMessage();return;}
  const unit=UNITS.find(item=>item.id===unitId);if(!unit)return;if(!unitCompleted(unit)){toast("Complete all four lessons to unlock the unit review.");return;}
  beginQuiz({key:`unit:${unitId}`,title:`Unit ${unitId}: ${unit.title} Review`,mode:"unit",unitId,questions:questionPool(unit.lessons,50,unitId*307)},resume);
}
function startMegaReview(id,resume=true){
  const groups={review1:[1,2,3],review2:[4,5,6]};const unitIds=groups[id];if(!unitIds)return;
  if(!unitIds.every(portalUnitOpen)){portalUnitMessage();return;}
  const selected=UNITS.filter(unit=>unitIds.includes(unit.id));if(!selected.every(unitCompleted)){toast("Complete the included units first.");return;}
  const items=selected.flatMap(unit=>unit.lessons);beginQuiz({key:`mega:${id}`,title:id==="review1"?"Review 1: Units 1–3":"Review 2: Units 4–6",mode:"mega",reviewId:id,questions:questionPool(items,50,hash(id))},resume);
}
function beginQuiz(context,resume=true){
  clearTimeout(nextTimer);answerLocked=false;orderBuild=[];quizContext={...context,questions:undefined};currentQuiz=context.questions;const saved=state.quizProgress[context.key];
  currentQuestion=resume&&saved?Math.min(Math.max(0,Number(saved.index)||0),currentQuiz.length):0;
  if(!resume||!saved)state.quizProgress[context.key]={index:0,score:0,total:currentQuiz.length,answered:0};
  state.activeQuiz={key:context.key,title:context.title,mode:context.mode,itemId:context.itemId||null,unitId:context.unitId||null,reviewId:context.reviewId||null};saveState(false);if(currentQuestion>=currentQuiz.length)showQuizResult();else renderQuestion();
}
function restoreActiveQuiz(){
  const active=state.activeQuiz;if(!active)return false;
  if(active.mode==="lesson"){startQuizFor(active.itemId,"lesson",true);return true;}
  if(active.mode==="unit"){startUnitReview(active.unitId,true);return true;}
  if(active.mode==="mega"){startMegaReview(active.reviewId,true);return true;}
  return false;
}

function renderQuestion(){
  answerLocked=false;orderBuild=[];const question=currentQuiz[currentQuestion];if(!question){showQuizResult();return;}
  const progress=state.quizProgress[quizContext.key],pct=Math.round(currentQuestion/currentQuiz.length*100);
  let interaction="";
  if(question.type==="choice"||question.type==="tf")interaction=`<div class="options">${question.options.map((option,index)=>`<button class="option" type="button" data-action="answer" data-value="${enc(option)}" data-letter="${String.fromCharCode(65+index)}">${esc(option)}</button>`).join("")}</div>`;
  if(question.type==="fill")interaction=`<div class="fill-wrap"><label for="fillAnswer">Type the missing word or phrase</label><input id="fillAnswer" class="fill-input" autocomplete="off" spellcheck="false" placeholder="Write your answer"><button class="btn btn-primary" type="button" data-action="check-fill">Check Answer</button></div>`;
  if(question.type==="order"){
    const words=shuffle(question.answer.split(/\s+/),hash(question.answer));interaction=`<div id="orderAnswer" class="order-answer"><span class="order-placeholder">Build the sentence here</span></div><div class="order-bank">${words.map((word,index)=>`<button class="word-tile" type="button" data-action="order-word" data-index="${index}" data-word="${enc(word)}">${esc(word)}</button>`).join("")}</div><div class="button-row"><button class="btn btn-ghost" type="button" data-action="clear-order">Clear</button><button class="btn btn-primary" type="button" data-action="check-order">Check Order</button></div>`;
  }
  if(question.type==="match"){
    const definitions=shuffle(question.pairs.map(pair=>pair[1]),hash(question.text+currentQuestion));interaction=`<div class="match-list">${question.pairs.map((pair,index)=>`<label class="match-row"><b>${esc(pair[0])}</b><select data-match-index="${index}"><option value="">Choose the definition</option>${definitions.map(definition=>`<option value="${enc(definition)}">${esc(definition)}</option>`).join("")}</select></label>`).join("")}</div><button class="btn btn-primary" type="button" data-action="check-match">Check Matches</button>`;
  }
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:quizContext.title}])}<section class="quiz-shell"><div class="quiz-top"><span class="quiz-counter">${currentQuestion+1} / ${currentQuiz.length}</span><div class="progress-line"><i style="width:${pct}%"></i></div><span class="quiz-counter">Score: ${progress.score}</span></div><article class="quiz-card"><span class="quiz-label">${icon("star")} ${question.source?esc(question.source):"INTERACTIVE PRACTICE"} · ${esc(question.type)}</span><h1>${esc(question.text)}</h1>${interaction}<div class="quiz-actions"><div id="feedback" class="feedback">Choose carefully. The correct answer will be explained.</div><button id="nextQuestionBtn" class="btn btn-primary hidden" type="button" data-action="next-question">Next Question ${icon("arrow")}</button></div></article></section>`,{view:"quiz",key:quizContext.key});
  if(question.type==="fill")$("#fillAnswer")?.focus();
}
function chooseAnswer(value,button){
  if(answerLocked)return;const question=currentQuiz[currentQuestion],correct=normalize(value)===normalize(question.answer);
  $$(".option").forEach(option=>{option.disabled=true;const optionValue=dec(option.dataset.value);if(normalize(optionValue)===normalize(question.answer))option.classList.add("correct");});
  if(!correct)button.classList.add("wrong");finishAnswer(correct,question.why||`Correct answer: ${question.answer}`);
}
function normalize(value){return String(value??"").trim().toLowerCase().replace(/[.!?]+$/g,"").replace(/\s+/g," ");}
function addOrderWord(index){
  if(answerLocked)return;const tile=$$('[data-action="order-word"]')[index];if(!tile||tile.classList.contains("used"))return;tile.classList.add("used");orderBuild.push({index,word:dec(tile.dataset.word)});renderOrderBuild();
}
function renderOrderBuild(){const holder=$("#orderAnswer");if(!holder)return;holder.innerHTML=orderBuild.length?orderBuild.map(entry=>`<span class="word-tile">${esc(entry.word)}</span>`).join(""):`<span class="order-placeholder">Build the sentence here</span>`;}
function clearOrder(){if(answerLocked)return;orderBuild=[];$$('[data-action="order-word"]').forEach(tile=>tile.classList.remove("used"));renderOrderBuild();}
function checkOrder(){if(answerLocked)return;const question=currentQuiz[currentQuestion],answer=orderBuild.map(entry=>entry.word).join(" ");finishAnswer(normalize(answer)===normalize(question.answer),question.why);}
function checkFill(){if(answerLocked)return;const question=currentQuiz[currentQuestion],value=$("#fillAnswer")?.value||"";finishAnswer(normalize(value)===normalize(question.answer),question.why||`Correct answer: ${question.answer}`);}
function checkMatch(){
  if(answerLocked)return;const question=currentQuiz[currentQuestion],selects=$$("[data-match-index]");let correct=true;
  selects.forEach(select=>{const index=Number(select.dataset.matchIndex),value=select.value?dec(select.value):"";if(normalize(value)!==normalize(question.pairs[index][1]))correct=false;select.disabled=true;select.classList.toggle("correct",normalize(value)===normalize(question.pairs[index][1]));select.classList.toggle("wrong",normalize(value)!==normalize(question.pairs[index][1]));});
  finishAnswer(correct,question.why);
}
function finishAnswer(correct,explanation){
  if(answerLocked)return;answerLocked=true;const progress=state.quizProgress[quizContext.key];progress.answered++;state.solved++;
  if(correct){progress.score++;state.correct++;state.xp+=10;state.coins+=2;state.vocabCorrect++;tone("good");}else tone("bad");
  // Save the next unanswered position before the feedback timer or navigation.
  progress.index=currentQuestion+1;
  const feedback=$("#feedback");feedback.className=`feedback ${correct?"good":"bad"}`;feedback.innerHTML=`<b>${correct?"Correct! Well done.":"Not quite."}</b> ${esc(explanation||"")}`;
  $("#nextQuestionBtn")?.classList.remove("hidden");state.quizProgress[quizContext.key]=progress;saveState(false);updateTopbar();
  if(correct&&progress.answered%5===0)celebrate();
  nextTimer=setTimeout(nextQuestion,correct?2500:4200);
}
function nextQuestion(){
  if(!answerLocked)return;clearTimeout(nextTimer);const progress=state.quizProgress[quizContext.key];currentQuestion++;progress.index=currentQuestion;state.quizProgress[quizContext.key]=progress;saveState(false);if(currentQuestion>=currentQuiz.length)showQuizResult();else renderQuestion();
}
function showQuizResult(){
  clearTimeout(nextTimer);const progress=state.quizProgress[quizContext.key]||{score:0,total:currentQuiz.length},pct=Math.round(progress.score/progress.total*100),passed=pct>=60;
  if(passed){
    if(quizContext.mode==="lesson"&&currentItem){
      const list=currentItem.kind==="reader"?state.readerCompleted:state.completed;if(!list.includes(currentItem.id)){list.push(currentItem.id);state.xp+=50;state.coins+=20;state.stars++;}
    }
    if(quizContext.mode==="unit"&&!state.unitReviews.includes(quizContext.unitId)){state.unitReviews.push(quizContext.unitId);state.xp+=80;state.coins+=30;state.stars+=2;}
    if(progress.score===progress.total&&!state.badges.includes("perfect"))state.badges.push("perfect");
    celebrate();tone("good");
  }
  state.activeQuiz=null;updateBadges();saveState();
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:"Quiz Result"}])}<section class="result-card"><div class="result-medal">${icon("trophy")}</div><span class="micro-label">${passed?"MISSION COMPLETE":"KEEP PRACTICING"}</span><h1>${passed?"Brilliant work!":"Almost there!"}</h1><div class="result-score">${pct}%</div><p>You answered <b>${progress.score}</b> out of <b>${progress.total}</b> questions correctly.${passed?" Your progress has been saved and the next step is unlocked.":" Score 60% or more to unlock the next step."}</p><div class="button-row center"><button class="btn btn-ghost" type="button" data-action="retry-quiz">Try Again</button>${quizContext.mode==="lesson"&&currentItem?`<button class="btn btn-soft" type="button" data-action="show-lesson" data-id="${currentItem.id}">Lesson Menu</button>`:""}<button class="btn btn-primary" type="button" data-action="dashboard">Dashboard</button></div></section>`,{view:"result",key:quizContext.key});
}
function retryQuiz(){
  if(!quizContext)return;if(quizContext.mode==="lesson")startQuizFor(currentItem.id,"lesson",false);else if(quizContext.mode==="unit")startUnitReview(quizContext.unitId,false);else startMegaReview(quizContext.reviewId,false);
}

function updateBadges(){
  const add=id=>{if(!state.badges.includes(id))state.badges.push(id);};
  if(state.completed.length+state.readerCompleted.length>=1)add("first-step");
  if(state.vocabCorrect>=50)add("word-star");
  if(UNITS.some(unitCompleted))add("unit-hero");
  if(state.readerCompleted.length)add("reader");
  if(unitCompleted(UNITS[4])&&unitCompleted(UNITS[5]))add("water-wise");
  if(UNITS.every(unitCompleted))add("course-star");
}
function resumeLesson(){
  if(!ensureApp())return;const route=state.lastRoute;
  if(route?.view==="section"&&getItem(route.id)){showSection(route.id,route.section);return;}
  if(getItem(state.lastLesson)){showLesson(state.lastLesson);return;}showDashboard();
}
function resumeQuestion(){if(!ensureApp())return;if(!restoreActiveQuiz())toast("There is no unfinished question yet.");}

function showReaders(){
  const cards=READERS.map(reader=>{const locked=!readerUnlocked(reader.id),done=reader.chapters.filter(chapter=>state.readerCompleted.includes(chapter.id)).length;return `<article class="reader-card image-cover" data-cover="${reader.cover}"><div class="reader-card-copy"><span class="micro-label light">${esc(reader.type)}</span><h3>${esc(reader.title)}</h3><p>${esc(reader.description)}</p><button class="btn ${locked?"btn-ghost":"btn-soft"}" type="button" data-action="show-reader" data-id="${reader.id}">${locked?`${icon("lock")} ${reader.id==="hospitals"?"Complete Units 1–3":"Complete Units 1–6"}`:`Open · ${done}/${reader.chapters.length}`}</button></div></article>`;}).join("");
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:"Readers and Story"}])}<div class="section-head"><div><h2>Reading Library</h2><p>The non-fiction reader appears after Unit 3; the fiction story appears after Unit 6.</p></div></div><section class="reader-grid">${cards}</section>`,{view:"readers"});
}
function showReader(id){
  const reader=READERS.find(item=>item.id===id);if(!reader)return;if(!readerUnlocked(id)){toast(id==="hospitals"?"Complete Units 1–3 first.":"Complete all six units first.");return;}
  const chapters=reader.chapters.map((chapter,index)=>{const item=getItem(chapter.id),locked=!chapterUnlocked(chapter.id),done=state.readerCompleted.includes(chapter.id);return `<article class="lesson-card ${locked?"locked":""}"><div class="lesson-cover image-cover" data-cover="${chapter.cover}"><span class="status-chip">${done?"COMPLETED":locked?"LOCKED":`CHAPTER ${index+1}`}</span></div><div class="lesson-card-body"><span class="micro-label">CHAPTER ${index+1}</span><h3>${esc(chapter.title)}</h3><p>${esc(chapter.subtitle)}</p><button class="btn ${locked?"btn-ghost":done?"btn-soft":"btn-primary"}" type="button" data-action="show-chapter" data-id="${chapter.id}">${locked?"Locked":done?"Review Again":"Start Chapter"}</button></div></article>`;}).join("");
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:"Readers",action:"readers"},{label:reader.title}])}<section class="page-hero image-cover" data-cover="${reader.cover}"><div class="page-hero-copy"><span class="micro-label light">${esc(reader.type)}</span><h1>${esc(reader.title)}</h1><p>${esc(reader.description)}</p></div></section><div class="section-head"><div><h2>${reader.id==="hospitals"?"Learning Sections":"Story Chapters"}</h2><p>Vocabulary, teaching summaries, language notes, and comprehension.</p></div></div><section class="lesson-grid">${chapters}</section>`,{view:"reader",id});
}
function showReviews(){
  const review1=UNITS.slice(0,3).every(unitCompleted),review2=UNITS.slice(3).every(unitCompleted);
  const unitButtons=UNITS.map(unit=>`<article class="section-card"><div class="section-card-icon">U${unit.id}</div><h3>${esc(unit.title)}</h3><p>50 mixed questions from all four lessons.</p><button class="btn ${unitCompleted(unit)?"btn-primary":"btn-ghost"}" type="button" data-action="start-unit-review" data-id="${unit.id}">${unitCompleted(unit)?"Start Review":"Complete Unit"}</button></article>`).join("");
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:"Reviews"}])}<div class="section-head"><div><h2>Reviews and Question Banks</h2><p>Every unit bank contains 50 questions. The book's two general reviews are included too.</p></div></div><section class="content-menu">${unitButtons}</section><div class="section-head"><div><h2>General Reviews</h2><p>Review 1 covers Units 1–3. Review 2 covers Units 4–6.</p></div></div><section class="lesson-grid"><article class="lesson-card"><div class="lesson-cover image-cover" data-cover="unit-3"><span class="status-chip">50 QUESTIONS</span></div><div class="lesson-card-body"><span class="micro-label">GENERAL REVIEW 1</span><h3>Units 1, 2, and 3</h3><p>Sports, the body, nutrition, grammar, phonics, and reading.</p><button class="btn ${review1?"btn-primary":"btn-ghost"}" type="button" data-action="start-mega-review" data-id="review1">${review1?"Start Review":"Complete Units 1–3"}</button></div></article><article class="lesson-card"><div class="lesson-cover image-cover" data-cover="unit-6"><span class="status-chip">50 QUESTIONS</span></div><div class="lesson-card-body"><span class="micro-label">GENERAL REVIEW 2</span><h3>Units 4, 5, and 6</h3><p>Animals, habitats, water, floods, engineering, and reading.</p><button class="btn ${review2?"btn-primary":"btn-ghost"}" type="button" data-action="start-mega-review" data-id="review2">${review2?"Start Review":"Complete Units 4–6"}</button></div></article></section>`,{view:"reviews"});
}
function showGlossary(){
  const entries=[];ALL_CONTENT.forEach(item=>item.vocab.forEach(entry=>entries.push({...entry,source:item.title})));const sorted=unique(entries,entry=>entry.word.toLowerCase()).sort((a,b)=>a.word.localeCompare(b.word));
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:"Glossary"}])}<div class="section-head"><div><h2>Complete Glossary</h2><p>${sorted.length} important words and definitions from the six units and both readers.</p></div></div><section class="content-panel"><div class="vocab-grid">${sorted.map(entry=>`<article class="vocab-card"><button class="speak-btn" type="button" data-action="speak" data-value="${enc(entry.word)}">${icon("sound")}</button><div class="vocab-word">${esc(entry.word)}</div><div class="vocab-def">${esc(entry.definition)}</div><div class="example">${esc(entry.example)}<br><small>${esc(entry.source)}</small></div></article>`).join("")}</div></section>`,{view:"glossary"});
}
function showAchievements(){
  updateBadges();saveState(false);const cards=BADGES.map(badge=>{const unlocked=state.badges.includes(badge.id);return `<article class="badge-card ${unlocked?"":"locked"}"><div class="badge-symbol">${esc(badge.symbol)}</div><h3>${esc(badge.title)}</h3><p>${esc(badge.description)}</p></article>`;}).join("");
  setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:"Achievements"}])}<div class="section-head"><div><h2>My Achievements</h2><p>Keep learning to unlock every badge.</p></div></div><section class="badge-grid">${cards}</section>`,{view:"achievements"});
}
function showCertificate(){
  const complete=UNITS.every(unitCompleted),progress=courseProgress();if(!complete){setView(`${crumbs([{label:"Dashboard",action:"dashboard"},{label:"Certificate"}])}<section class="empty-state"><div class="result-medal">${icon("lock")}</div><h2>Your certificate is waiting!</h2><p>Complete all 24 learning missions to unlock it. Current progress: <b>${progress.done}/${progress.total}</b>.</p><button class="btn btn-primary" type="button" data-action="resume-lesson">Continue Learning</button></section>`,{view:"certificate"});return;}
  setView(`<section class="certificate"><span class="micro-label">CERTIFICATE OF ACHIEVEMENT</span><h1>Connect Plus Primary 3</h1><p>This certificate is proudly presented to</p><div class="student-cert">${esc(state.student)}</div><p>for successfully completing the First Term interactive course, including vocabulary, language notes, grammar, reading, phonics, CLIL, and assessment challenges.</p><div class="certificate-signature"><div class="signature-line">Mrs. Mona Harb<br><small>English Language Teacher</small></div><div class="signature-line">${new Date().toLocaleDateString("en-GB",{day:"numeric",month:"long",year:"numeric"})}<br><small>Date of Completion</small></div></div><div class="button-row center" style="margin-top:34px"><button class="btn btn-primary" type="button" data-action="print-certificate">Print Certificate</button><button class="btn btn-soft" type="button" data-action="dashboard">Dashboard</button></div></section>`,{view:"certificate"});
}

init();
