# -*- coding: utf-8 -*-
"""
쉬는숨쉬는쉼 홈페이지 — 여러 페이지 만들기

글을 고칠 때는 `_parts/sections/*.html` 안의 해당 조각만 고친 뒤
    python _parts/build.py
를 실행하면 6개 페이지가 다시 만들어집니다.
머리말(메뉴)·꼬리말은 이 파일 안에 한 번만 적혀 있으므로 여기서만 고치면 됩니다.
"""
import io, os, re, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SEC  = os.path.join(HERE, "sections")
SITE = "https://sumshim.co.kr"

def part(name):
    with io.open(os.path.join(SEC, name + ".html"), encoding="utf-8") as f:
        return f.read().rstrip("\n")

# ── 메뉴 ────────────────────────────────────────────────────────────
#   (보이는 글, 주소, 이 메뉴가 켜지는 페이지)
MENU = [
    ("센터소개",   "index.html",                 "index.html"),
    ("상담철학",   "philosophy.html",            "philosophy.html"),
    ("상담안내",   "counseling.html",            "counseling.html"),
    ("상담사소개", "counseling.html#counselor",  None),
    ("미술치료",   "art.html",                   "art.html"),
    ("마음읽기",   "column.html",                "column.html"),
    ("상담후기",   "review.html",                "review.html"),
    ("오시는길",   "apply.html#visit",           None),
]
CTA = ("상담신청", "apply.html", "apply.html")

# ── 페이지 ──────────────────────────────────────────────────────────
PAGES = [
 dict(file="index.html",
      title="쉬는숨쉬는쉼 상담센터 | 마음을 바꾸기 전에, 그 마음을 이해하는 시간",
      desc="서울 신촌 심리상담센터. 증상을 빠르게 없애기보다 그 마음이 만들어진 이유를 함께 이해합니다. 성인 개인 심리상담 · 미술치료.",
      ogt="쉬는숨쉬는쉼 상담센터",
      ogd="마음을 바꾸기 전에, 그 마음을 이해하는 시간.",
      body=["home", "about", "who", "reviews-home"],
      cta=True),

 dict(file="review.html",
      title="상담 후기 | 쉬는숨쉬는쉼 상담센터",
      desc="쉬는숨쉬는쉼 상담센터를 찾아주신 분들이 직접 남겨주신 후기입니다. 이름 대신 연령대와 상담 유형만 표시합니다. 서울 신촌 심리상담·미술치료.",
      ogt="상담 후기 — 쉬는숨쉬는쉼 상담센터",
      ogd="방문해 주신 분들이 직접 남겨주신 후기입니다.",
      body=["reviews"],
      cta=True),

 dict(file="philosophy.html",
      title="상담 철학 | 쉬는숨쉬는쉼 상담센터",
      desc="지금의 감정은 어느 날 갑자기 생겨난 것이 아닙니다. 신촌 쉬는숨쉬는쉼 상담센터가 상담을 바라보는 관점과 상담 진행 과정을 안내합니다.",
      ogt="상담 철학 — 쉬는숨쉬는쉼 상담센터",
      ogd="지금의 감정은 어느 날 갑자기 생겨난 것이 아닙니다.",
      body=["band-mist", "philosophy"],
      cta=True),

 dict(file="counseling.html",
      title="상담 안내 · 상담사 소개 | 쉬는숨쉬는쉼 상담센터",
      desc="성인 개인 심리상담 1회 50분 80,000원. 첫 상담에서 어려움을 함께 살펴본 뒤 상담 방향을 정합니다. 심리상담·미술치료 약 10년 김민정 상담사.",
      ogt="상담 안내 · 상담사 소개 — 쉬는숨쉬는쉼 상담센터",
      ogd="첫 상담에서 지금의 어려움을 함께 살펴본 뒤, 상담 방향을 같이 정합니다.",
      body=["guide", "counselor"],
      cta=True),

 dict(file="art.html",
      title="미술치료 | 쉬는숨쉬는쉼 상담센터",
      desc="말로 설명하기 어려운 마음을 이미지와 색, 형태로 다룹니다. 그림 실력은 필요하지 않습니다. 서울 신촌 미술치료 · 개인 심리상담과 병행 가능.",
      ogt="미술치료 — 쉬는숨쉬는쉼 상담센터",
      ogd="말로 설명하기 어려운 마음도 있습니다.",
      body=["art"],
      cta=True),

 dict(file="column.html",
      title="마음읽기 | 쉬는숨쉬는쉼 상담센터",
      desc="반복되는 감정과 관계에 대해 상담실에서 자주 나누는 이야기를 짧게 적습니다. 쉬는숨쉬는쉼 상담센터 칼럼.",
      ogt="마음읽기 — 쉬는숨쉬는쉼 상담센터",
      ogd="반복되는 감정과 관계에 대해 상담실에서 자주 나누는 이야기.",
      body=["column"],
      cta=True),

 dict(file="apply.html",
      title="상담 신청 · 오시는 길 | 쉬는숨쉬는쉼 상담센터",
      desc="상담 신청은 초기 상담에 필요한 만큼만 남기시면 됩니다. 2호선 신촌역 도보 이동 · 서울 서대문구 신촌로 109 르메이에르5차 지하 2층.",
      ogt="상담 신청 · 오시는 길 — 쉬는숨쉬는쉼 상담센터",
      ogd="이야기를 시작하는 데에 특별한 이유는 필요하지 않습니다.",
      body=["band-sea", "apply", "visit"],
      cta=False),
]

ENDCTA = """
<!-- ═══ 페이지 끝 — 어디서 읽다 멈추셔도 바로 신청할 수 있게 ═══ -->
<section class="band band--sky endcta">
  <div class="wrap">
    <p class="eyebrow rv">상담 신청</p>
    <h2 class="rv wide-line">이야기를 시작하는 데에<br>특별한 이유는 필요하지 않습니다.</h2>
    <div class="btns rv">
      <a class="btn btn-solid" href="apply.html">상담 신청하기</a>
      <a class="btn btn-line" href="counseling.html">상담 안내 먼저 보기</a>
    </div>
  </div>
</section>
""".strip()


def menu_html(current):
    out = []
    for label, href, active_on in MENU:
        on = " class=\"on\"" if active_on == current else ""
        out.append('      <a href="%s"%s>%s</a>' % (href, on, label))
    label, href, active_on = CTA
    cls = "cta on" if active_on == current else "cta"
    out.append('      <a href="%s" class="%s">%s</a>' % (href, cls, label))
    return "\n".join(out)


def header_html(current):
    return """<header>
  <div class="wrap nav">
    <a class="brand" href="index.html">쉬는숨 <span>쉬는쉼</span></a>
    <button class="burger" id="burger" aria-label="메뉴 열기" aria-expanded="false">메뉴</button>
    <nav class="menu" id="menu">
%s
    </nav>
  </div>
</header>""" % menu_html(current)


def head_html(p):
    url = SITE + "/" + ("" if p["file"] == "index.html" else p["file"])
    return """<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>%(title)s</title>
<meta name="description" content="%(desc)s">
<link rel="canonical" href="%(url)s">
<meta property="og:title" content="%(ogt)s">
<meta property="og:description" content="%(ogd)s">
<meta property="og:type" content="website">
<meta property="og:url" content="%(url)s">
<meta property="og:site_name" content="쉬는숨쉬는쉼 상담센터">
<meta property="og:image" content="%(site)s/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="쉬는숨 쉬는쉼 — 마음을 바꾸기 전에, 그 마음을 이해하는 시간.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="%(ogt)s">
<meta name="twitter:description" content="%(ogd)s">
<meta name="twitter:image" content="%(site)s/og-image.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Gowun+Batang:wght@400;700&family=IBM+Plex+Sans+KR:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>""" % dict(title=p["title"], desc=p["desc"], ogt=p["ogt"], ogd=p["ogd"], url=url, site=SITE)


H2_FIRST = re.compile(r'<h2( [^>]*)?>', re.S)

def promote_h1(html):
    """홈이 아닌 페이지는 첫 제목을 h1 으로 올린다 (검색엔진이 페이지 주제를 안다)"""
    m = H2_FIRST.search(html)
    if not m:
        return html
    attrs = m.group(1) or ""
    head = html[:m.start()] + "<h1" + attrs + ">"
    rest = html[m.end():]
    close = rest.find("</h2>")
    if close < 0:
        return html
    return head + rest[:close] + "</h1>" + rest[close + 5:]


def build():
    made = []
    for p in PAGES:
        blocks = [part(b) for b in p["body"]]
        body = "\n\n".join(blocks)
        if p["file"] != "index.html":
            body = promote_h1(body)
        if p["cta"]:
            body += "\n\n" + ENDCTA
        html = "\n".join([
            head_html(p), "",
            header_html(p["file"]), "",
            body, "",
            part("footer"), "",
            part("kko"), "",
            part("ppmodal"), "",
            part("admmodal"), "",
            '<script src="site.js"></script>',
            "</body>", "</html>", ""
        ])
        with io.open(os.path.join(ROOT, p["file"]), "w", encoding="utf-8", newline="\r\n") as f:
            f.write(html)
        made.append((p["file"], len(html)))

    # 검색엔진용
    urls = "".join(
        '  <url><loc>%s/%s</loc><changefreq>monthly</changefreq></url>\n'
        % (SITE, "" if p["file"] == "index.html" else p["file"]) for p in PAGES)
    sm = ('<?xml version="1.0" encoding="UTF-8"?>\n'
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n%s</urlset>\n' % urls)
    with io.open(os.path.join(ROOT, "sitemap.xml"), "w", encoding="utf-8", newline="\n") as f:
        f.write(sm)
    with io.open(os.path.join(ROOT, "robots.txt"), "w", encoding="utf-8", newline="\n") as f:
        f.write("User-agent: *\nAllow: /\nDisallow: /manage/\n\nSitemap: %s/sitemap.xml\n" % SITE)

    # 후기 관리 화면 — 메뉴에도 검색에도 없는 숨은 한 장.
    # 원본은 _parts/manage.html 이고, 여기서 manage/index.html 로 옮겨 놓는다.
    mdir = os.path.join(ROOT, "manage")
    if not os.path.isdir(mdir):
        os.makedirs(mdir)
    with io.open(os.path.join(HERE, "manage.html"), encoding="utf-8") as f:
        mhtml = f.read()
    with io.open(os.path.join(mdir, "index.html"), "w", encoding="utf-8", newline="\r\n") as f:
        f.write(mhtml)

    for name, n in made:
        print("%-18s %6d bytes" % (name, n))
    print("%-18s %6d bytes" % ("manage/index.html", len(mhtml)))
    print("sitemap.xml, robots.txt")

if __name__ == "__main__":
    build()
