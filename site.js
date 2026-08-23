/* ── 옛 한페이지 주소 구제 ──────────────────────────────────────
   예전에 뿌린 sumshim.co.kr/#art 같은 주소로 들어오면
   해당 페이지로 넘겨준다. 2027년쯤 지워도 된다. */
(function(){
  var here = location.pathname.replace(/index\.html$/,'');
  if(here !== '/' && here !== '') return;
  var go = {philosophy:'philosophy.html', guide:'counseling.html',
            counselor:'counseling.html#counselor', art:'art.html',
            column:'column.html', apply:'apply.html', visit:'apply.html#visit'};
  var h = location.hash.slice(1);
  if(go[h]) location.replace(go[h]);
})();

/* ═══════════════════════════════════════════════════════════════
   글은 전부 이 파일 안에 있습니다.
   후기·칼럼을 추가하려면 아래 REVIEWS / COLUMNS 에 한 칸씩 더 쓰면 됩니다.
   (관리자가 화면에서 직접 쓰는 기능은 서버 연결이 필요합니다 — 읽어보기.txt 참고)
   ═══════════════════════════════════════════════════════════════ */

var STEPS = [
  ['01','상담 문의 및 신청','상담을 원하는 이유와 가능한 일정을 간단하게 남깁니다.'],
  ['02','첫 상담','현재 가장 힘든 문제와 상담을 통해 다루고 싶은 부분을 함께 살펴봅니다.'],
  ['03','상담 방향 설정','첫 상담 내용을 바탕으로 현재의 어려움과 상담 목표, 진행 방향을 함께 정합니다.'],
  ['04','지속 상담','정기적인 상담을 통해 감정과 관계에서 반복되는 패턴을 탐색하고, 실제 생활에서의 변화를 함께 살펴봅니다.'],
  ['05','종결','변화한 부분을 정리하고, 스스로 자신의 마음을 이해하고 돌볼 수 있는 힘을 확인하며 마무리합니다.']
];

var WHO = [
  '이유를 정확히 모르겠지만 마음이 계속 힘든 분',
  '우울과 무기력이 반복되는 분',
  '불안과 걱정이 많아 쉽게 지치는 분',
  '사람의 말이나 반응에 지나치게 영향을 받는 분',
  '관계에서 비슷한 상처가 반복되는 분',
  '거절하거나 자신의 경계를 세우는 것이 어려운 분',
  '다른 사람에게 인정받아야 안심되는 분',
  '완벽하게 해야 한다는 압박이 심한 분',
  '자기 자신에게 지나치게 엄격한 분',
  '머리로는 알고 있지만 감정이 따라오지 않는 분',
  '비슷한 연애나 인간관계 문제가 반복되는 분',
  '내가 어떤 사람인지 좀 더 깊이 이해하고 싶은 분'
];

/* 후기 — 공개 동의를 받은 것만, 개인이 드러나지 않는 범위로 */
var REVIEWS = [
  ['왜 자꾸 같은 자리에서 걸려 넘어지는지 처음으로 설명이 됐어요. 답을 들은 게 아니라 제가 알게 된 느낌이었습니다.','30대 · 개인상담'],
  ['상담을 받으면 마음이 편해지는 줄만 알았는데, 편해지기 전에 이해되는 게 먼저더라고요.','20대 · 개인상담'],
  ['말로는 도저히 안 나오던 게 그림으로는 나왔습니다. 잘 그릴 필요 없다는 말이 정말이었어요.','40대 · 미술치료']
];

/* 마음읽기 — 칼럼 */
var COLUMNS = [
  ['머리로는 아는데 마음이 따라오지 않을 때','2026.08.10',
   '“이렇게 생각하면 된다”는 걸 몰라서 못 하는 경우는 생각보다 드뭅니다. 알고 있는데도 몸과 감정이 다르게 반응한다면, 그 반응은 한때 나를 지켜주던 방식이었을 가능성이 큽니다. 바꾸려 하기 전에, 그 방식이 언제부터 필요했는지를 먼저 봅니다.'],
  ['거절이 유난히 어려운 마음에 대하여','2026.07.22',
   '거절을 못 하는 것은 성격이 약해서가 아니라, 거절했을 때 벌어질 일을 이미 겪어본 적이 있기 때문일 수 있습니다. 상담에서는 “거절하는 법”을 연습하기 전에, 거절이 왜 그렇게 위험하게 느껴지는지를 먼저 살펴봅니다.'],
  ['반복되는 관계에는 이유가 있습니다','2026.07.05',
   '비슷한 사람을 만나고 비슷한 지점에서 지치는 일이 반복된다면, 우연이 아니라 익숙함일 수 있습니다. 익숙한 것은 편한 것과 다릅니다. 무엇이 익숙해서 끌리는지를 알게 되면, 그때부터 다른 선택이 가능해집니다.']
];

var $ = function(id){ return document.getElementById(id); };
var esc = function(s){ return String(s).replace(/[&<>"]/g, function(c){
  return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'})[c]; }); };

/* 그리기 — 페이지마다 있는 칸이 다르므로 있을 때만 그린다 */
if($('steps')) $('steps').innerHTML = STEPS.map(function(s){
  return '<div class="step"><div class="n">'+s[0]+'</div><div><h3>'+esc(s[1])+'</h3><p>'+esc(s[2])+'</p></div></div>';
}).join('');

if($('who-list')) $('who-list').innerHTML = WHO.map(function(w){ return '<li>'+esc(w)+'</li>'; }).join('');

if($('reviews-list')) $('reviews-list').innerHTML = REVIEWS.map(function(r){
  return '<div class="review"><p class="rq">“'+esc(r[0])+'”</p><div class="rm">'+esc(r[1])+'</div></div>';
}).join('');

if($('column-list')) $('column-list').innerHTML = COLUMNS.map(function(c,i){
  return '<article class="post" data-i="'+i+'" tabindex="0" role="button" aria-expanded="false">'
    +'<div class="t">'+esc(c[0])+'</div><div class="d">'+esc(c[1])+'</div>'
    +'<div class="x">'+esc(c[2])+'</div></article>';
}).join('');

/* 칼럼 펼치기 */
if($('column-list')){
  $('column-list').addEventListener('click', function(e){
    var p = e.target.closest('.post'); if(!p) return;
    var on = p.classList.toggle('open');
    p.setAttribute('aria-expanded', on ? 'true' : 'false');
  });
  $('column-list').addEventListener('keydown', function(e){
    if(e.key!=='Enter' && e.key!==' ') return;
    var p = e.target.closest('.post'); if(!p) return;
    e.preventDefault(); p.click();
  });
}

/* 메뉴 */
$('burger').addEventListener('click', function(){
  var m = $('menu'), on = m.classList.toggle('open');
  this.setAttribute('aria-expanded', on ? 'true':'false');
});
$('menu').addEventListener('click', function(e){
  if(e.target.tagName==='A') $('menu').classList.remove('open');
});

/* 스크롤 등장 */
var io = new IntersectionObserver(function(es){
  es.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
}, {rootMargin:'0px 0px -8% 0px', threshold:.06});
document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

/* 히어로 시퀀스 — 홈에만 있다 */
var heroEl = document.querySelector('.hero');
if(heroEl) requestAnimationFrame(function(){ heroEl.classList.add('play'); });

/* 개인정보처리방침 */
function ppOpen(e){ if(e) e.preventDefault(); $('ppModal').classList.add('on'); $('ppClose').focus(); }
function ppClose(){ $('ppModal').classList.remove('on'); }
if($('ppLink'))  $('ppLink').addEventListener('click', ppOpen);
if($('ppLink2')) $('ppLink2').addEventListener('click', ppOpen);
$('ppClose').addEventListener('click', ppClose);
$('ppModal').addEventListener('click', function(e){ if(e.target===this) ppClose(); });
document.addEventListener('keydown', function(e){ if(e.key==='Escape') ppClose(); });

/* ── 상담 신청 ──────────────────────────────────────────────────
   서버가 아직 없으므로 '접수되었습니다' 라고 거짓말하지 않는다.
   적으신 내용을 정리해서 카카오톡이나 이메일로 보내드리는 방식이다.
   서버를 붙이면 이 함수 안만 바꾸면 된다. */
function collect(){
  var g = function(id){ return ($(id).value||'').trim(); };
  return {
    name:g('f-name'), tel:g('f-tel'), age:g('f-age'), type:g('f-type'),
    when:g('f-when'), why:g('f-why'), prev:g('f-prev'), agree:$('f-agree').checked
  };
}
function validate(d){
  if(!d.name) return ['f-name','성함을 적어주세요.'];
  if(!d.tel) return ['f-tel','연락처를 적어주세요. 일정 안내에 필요합니다.'];
  if(!/[0-9]{7,}/.test(d.tel.replace(/[^0-9]/g,''))) return ['f-tel','연락처를 다시 확인해 주세요.'];
  if(!d.agree) return ['f-agree','개인정보 수집·이용에 동의해 주셔야 신청할 수 있습니다.'];
  return null;
}
function compose(d){
  var L = ['[쉬는숨쉬는쉼 상담센터 · 상담 신청]',''];
  L.push('이름: '+d.name);
  L.push('연락처: '+d.tel);
  if(d.age)  L.push('연령대: '+d.age);
  if(d.type) L.push('상담 희망 방식: '+d.type);
  if(d.when) L.push('상담 가능 시간: '+d.when);
  if(d.prev) L.push('이전 상담 경험: '+d.prev);
  if(d.why)  L.push('', '신청 이유:', d.why);
  L.push('', '(개인정보 수집·이용에 동의함)');
  return L.join('\n');
}
function say(kind, text){
  var m = $('formMsg'); m.className = 'formmsg ' + kind; m.textContent = text;
  m.scrollIntoView({block:'nearest', behavior:'smooth'});
}
function submitVia(how){
  var d = collect(), bad = validate(d);
  if(bad){ say('err', bad[1]); var el=$(bad[0]); if(el) el.focus(); return; }
  var body = compose(d);
  if(how==='mail'){
    location.href = 'mailto:sumshim_@naver.com?subject='
      + encodeURIComponent('상담 신청 · '+d.name)
      + '&body=' + encodeURIComponent(body);
    say('ok','메일 프로그램이 열립니다. 그대로 보내주시면 확인 후 연락드리겠습니다.');
  }else{
    try{ navigator.clipboard.writeText(body); }catch(e){}
    window.open($('kkoBtn').getAttribute('href'), '_blank', 'noopener');
    say('ok','적으신 내용을 복사했습니다. 카카오톡 채널 창에 붙여넣어 보내주세요.');
  }
}
if($('applyForm')){
  $('applyForm').addEventListener('submit', function(e){ e.preventDefault(); submitVia('kakao'); });
  $('mailBtn').addEventListener('click', function(){ submitVia('mail'); });
}
