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
   칼럼을 추가하려면 아래 COLUMNS 에 한 칸씩 더 쓰면 됩니다.
   후기는 2026-08-24 부터 홈페이지에서 직접 받습니다. 이 파일이 아니라
   Supabase 보관함에 쌓이고, 숨기거나 지우는 것은 manage 페이지에서 합니다.
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

/* ── 후기 (2026-08-24) ─────────────────────────────────────────────
   후기는 이제 방문하신 분이 홈페이지에서 직접 남깁니다.
   글은 Supabase 보관함에 쌓이고 새로고침하면 바로 보입니다.
   숨기거나 지우는 것은 관리 화면(sumshim.co.kr/manage)에서만 됩니다.
   아래 두 줄은 공개용 열쇠라 홈페이지에 들어 있어도 안전합니다. */
var SB_URL = 'https://ybtxwywqhirltloinfju.supabase.co';
var SB_KEY = 'sb_publishable_svvJEf4Obdq24Z4dMsqurw_f_dDRU17';

function nl2br(s){ return esc(s).replace(/\n/g, '<br>'); }
function rvDate(iso){
  var d = new Date(iso); if(isNaN(d.getTime())) return '';
  var p = function(n){ return (n < 10 ? '0' : '') + n; };
  return d.getFullYear() + '.' + p(d.getMonth()+1) + '.' + p(d.getDate());
}

if($('reviews-list')){
  var rvList  = $('reviews-list');
  var rvEmpty = $('reviews-empty');

  var rvLoad = function(){
    fetch(SB_URL + '/rest/v1/sumshim_reviews'
        + '?select=body,label,created_at&status=eq.visible&order=created_at.desc&limit=30',
      { headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY } })
      .then(function(r){ if(!r.ok) throw 0; return r.json(); })
      .then(function(rows){
        rvList.innerHTML = rows.map(function(r){
          return '<div class="review"><p class="rq">“' + nl2br(r.body) + '”</p>'
               + '<div class="rm"><span>' + esc(r.label) + '</span>'
               + '<span class="rd">' + rvDate(r.created_at) + '</span></div></div>';
        }).join('');
        if(rvEmpty) rvEmpty.style.display = rows.length ? 'none' : 'block';
      })
      .catch(function(){
        if(!rvEmpty) return;
        rvEmpty.textContent = '후기를 불러오지 못했습니다. 잠시 뒤 새로고침해 주세요.';
        rvEmpty.style.display = 'block';
      });
  };
  rvLoad();

  /* 확인 문제 — 열 때마다 숫자가 바뀐다 */
  var rvA = 2 + Math.floor(Math.random() * 7);
  var rvB = 2 + Math.floor(Math.random() * 7);
  if($('rv-q')) $('rv-q').textContent = rvA + ' + ' + rvB + ' = ?';

  if($('rvForm')) $('rvForm').addEventListener('submit', function(e){
    e.preventDefault();
    var msg  = $('rvMsg');
    var show = function(kind, text){ msg.className = 'formmsg ' + kind; msg.textContent = text; };
    var body  = ($('rv-body').value  || '').trim();
    var label = ($('rv-label').value || '').trim();

    /* 사람에게 안 보이는 칸이 채워졌다 = 광고 프로그램. 조용히 버린다 */
    if($('rv-web').value) return;

    if(body.length < 10)  return show('err', '후기를 열 글자 이상 적어주세요.');
    if(/https?:\/\/|www\./i.test(body))
                          return show('err', '링크는 넣을 수 없습니다. 링크를 빼고 다시 올려주세요.');
    if(label.length < 2)  return show('err', '어떻게 표기할지 적어주세요. 예: 30대 · 개인상담');
    if(parseInt(($('rv-sum').value || '').replace(/[^0-9]/g, ''), 10) !== rvA + rvB)
                          return show('err', '확인 문제의 답이 맞지 않습니다.');
    if(!$('rv-agree').checked)
                          return show('err', '홈페이지 공개에 동의해 주셔야 올릴 수 있습니다.');

    var last = 0;
    try{ last = parseInt(localStorage.getItem('sumshim_rv') || '0', 10) || 0; }catch(_){}
    if(Date.now() - last < 5 * 60 * 1000)
      return show('err', '방금 후기를 남기셨습니다. 5분 뒤에 다시 시도해 주세요.');

    var btn = $('rvSend'); btn.disabled = true;
    show('ok', '올리는 중입니다…');

    fetch(SB_URL + '/rest/v1/sumshim_reviews', {
      method: 'POST',
      headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY,
                 'Content-Type': 'application/json', Prefer: 'return=minimal' },
      body: JSON.stringify({ body: body, label: label, agreed: true })
    })
    .then(function(r){
      btn.disabled = false;
      if(!r.ok) return show('err', '올리지 못했습니다. 내용을 조금 고쳐서 다시 시도해 주세요.');
      try{ localStorage.setItem('sumshim_rv', String(Date.now())); }catch(_){}
      $('rvForm').reset();
      show('ok', '후기를 남겨주셔서 감사합니다. 바로 아래에 올라갔습니다.');
      rvLoad();
    })
    .catch(function(){
      btn.disabled = false;
      show('err', '연결이 되지 않았습니다. 잠시 뒤 다시 시도해 주세요.');
    });
  });
}

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
