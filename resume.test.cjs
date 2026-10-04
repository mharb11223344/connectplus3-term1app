const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function app() {
  const storage = new Map();
  const sandbox = { document:{querySelector:()=>({className:'',innerHTML:'',classList:{remove(){}}})}, localStorage: {getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)}, console, clearTimeout(){}, setTimeout(){return 1}, window:{} };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(__dirname+'/app.js','utf8').replace(/init\(\);\s*$/, ''),sandbox);
  vm.runInContext(`saveState=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(state));renderQuestion=()=>{};showQuizResult=()=>{state.activeQuiz=null};getItem=id=>({id,title:'Test'});makeLessonQuestions=()=>Array.from({length:26},()=>({}));`,sandbox);
  return { run:code=>vm.runInContext(code,sandbox), stored:()=>JSON.parse(storage.get('connectPlus3MonaHarbV2')) };
}

test('opening practice through the lesson menu resumes question 20 and its score',()=>{
  const a=app();a.run(`state.xp=60;state.solved=19;state.quizProgress['lesson:1-1']={index:19,answered:19,score:6,total:26};startQuizFor('1-1');`);
  assert.equal(a.run('currentQuestion'),19);assert.equal(a.stored().quizProgress['lesson:1-1'].score,6);assert.equal(a.stored().xp,60);
});
test('explicit Try Again can start a new attempt without deleting account points',()=>{
  const a=app();a.run(`state.xp=60;state.quizProgress['lesson:1-1']={index:19,answered:19,score:6,total:26};startQuizFor('1-1','lesson',false);`);
  assert.equal(a.run('currentQuestion'),0);assert.equal(a.stored().quizProgress['lesson:1-1'].score,0);assert.equal(a.stored().xp,60);
});
test('closing immediately after an answer restores the next unanswered question',()=>{
  const a=app();a.run(`tone=()=>{};updateTopbar=()=>{};celebrate=()=>{};startQuizFor('1-1');finishAnswer(true,'');`);
  assert.equal(a.stored().quizProgress['lesson:1-1'].index,1);
  a.run(`state=loadState();startQuizFor('1-1');`);
  assert.equal(a.run('currentQuestion'),1);assert.equal(a.stored().xp,10);assert.equal(a.stored().solved,1);
});
test('a finished checkpoint opens results rather than repeating the final question',()=>{
  const a=app();a.run(`state.quizProgress['lesson:1-1']={index:26,answered:26,score:20,total:26};startQuizFor('1-1');`);
  assert.equal(a.run('currentQuestion'),26);assert.equal(a.run('state.activeQuiz'),null);
});

test('offline cache only removes older Connect Plus 3 caches and precaches existing files',async()=>{
  const handlers={},deleted=[];
  const worker={self:{addEventListener:(name,fn)=>handlers[name]=fn,clients:{claim:()=>Promise.resolve()},skipWaiting:()=>Promise.resolve()},caches:{keys:async()=>['connect-plus-3-mona-v6','connect-plus-3-mona-v7','english-primary-3-v1'],delete:async key=>deleted.push(key),open:async()=>({addAll:async files=>files.forEach(file=>assert.ok(fs.existsSync(__dirname+'/'+file.split('?')[0]),file))})}};
  vm.createContext(worker);vm.runInContext(fs.readFileSync(__dirname+'/service-worker.js','utf8'),worker);
  let pending;handlers.install({waitUntil:p=>pending=p});await pending;
  handlers.activate({waitUntil:p=>pending=p});await pending;
  assert.deepEqual(deleted,['connect-plus-3-mona-v6']);
});
