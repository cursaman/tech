"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const codes = [
  { code: "M2-1317", title: "정착기 내부 용지 걸림", category: "용지 걸림", level: "자가 조치", summary: "정착기에 걸린 용지를 제거한 뒤 Wrap Jam을 초기화합니다." },
  { code: "A1-1111 / A1-1113", title: "Regi·MP 모터 이상", category: "구동부", level: "기사 점검", summary: "급지부 이물, 모터 커넥터, 하네스와 24V 전원을 확인합니다." },
  { code: "A1-1211 / A1-1213", title: "현상기 모터 이상", category: "구동부", level: "기사 점검", summary: "현상기 회전부와 모터 연결, 24V 공급 상태를 점검합니다." },
  { code: "A1-1611~1613", title: "ITB 구동 이상", category: "이미징", level: "기사 점검", summary: "전사벨트 장착 상태와 구동부, 하네스를 확인합니다." },
  { code: "A1-221x / 231x / 241x / 251x", title: "OPC 드럼 구동 이상", category: "이미징", level: "기사 점검", summary: "22=Y, 23=M, 24=C, 25=K 순으로 해당 드럼과 구동부를 점검합니다." },
  { code: "A1-5212~5513", title: "토너 공급 모터 이상", category: "소모품", level: "기사 점검", summary: "52=Y, 53=M, 54=C, 55=K 순으로 토너 공급부와 카트리지를 확인합니다." },
  { code: "A2-1212 / 1521 / 2321", title: "팬 동작 이상", category: "냉각", level: "기사 점검", summary: "SMPS·양면기·정착기 팬의 이물, 커넥터와 전원을 확인합니다." },
  { code: "A3-2113 / A3-4114", title: "CTD·ACR 센서 오염", category: "센서", level: "청소 가능", summary: "센서 창을 청소하고 이미지 관리 메뉴에서 센서 청소를 실행합니다." },
  { code: "C1-2110 / 3110 / 4110 / 5110", title: "토너 교체 준비", category: "소모품", level: "소모품", summary: "Y·M·C·K 해당 색상의 새 토너를 준비하고 잔량을 확인합니다." },
  { code: "C3-2110 / 3110 / 4110 / 5110", title: "이미징 유닛 교체 준비", category: "소모품", level: "소모품", summary: "해당 색상의 이미징 유닛을 준비하고 모델 호환성을 확인합니다." },
];

const quick = [
  { icon: "▤", title: "용지 걸림", note: "급지·정착기·양면기", filter: "용지 걸림" },
  { icon: "◫", title: "화질 문제", note: "줄·번짐·색상 이상", filter: "이미징" },
  { icon: "⌁", title: "스캔·ADF", note: "선 발생·급지 불량", filter: "센서" },
  { icon: "◉", title: "소모품", note: "토너·드럼·교체", filter: "소모품" },
];

export default function Home() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(codes[0]);
  const [category, setCategory] = useState("전체");
  const filtered = useMemo(() => codes.filter((item) => {
    const text = `${item.code} ${item.title} ${item.category} ${item.summary}`.toLowerCase();
    return (category === "전체" || item.category === category) && text.includes(query.toLowerCase().trim());
  }), [query, category]);

  const runSearch = (value: string) => {
    setCategory("전체"); setQuery(value);
    setTimeout(() => document.getElementById("results")?.scrollIntoView({ behavior: "smooth" }), 0);
  };

  return <main>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="복합기 기술지원 홈"><span className="brandmark">T</span><span>TECH<span>CARE</span></span></a>
      <nav aria-label="주요 메뉴"><a href="#results">오류코드</a><a href="#guides">해결가이드</a><a href="#manuals">자료실</a></nav>
      <a className="support" href="tel:15880000"><span>기술지원</span><strong>1588-0000</strong></a>
    </header>

    <section className="hero" id="top">
      <div className="heroCopy">
        <span className="eyebrow">MULTIFUNCTION PRINTER SUPPORT</span>
        <h1>복합기 문제,<br/><em>빠르게 해결하세요.</em></h1>
        <p>에러코드나 증상을 검색하면 원인과 조치 방법을 바로 확인할 수 있습니다.</p>
        <div className="searchbox"><span aria-hidden="true">⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} onKeyDown={(e) => e.key === "Enter" && runSearch(query)} placeholder="에러코드 또는 증상 검색 (예: M2-1317, 줄 발생)" aria-label="에러코드 또는 증상 검색"/><button onClick={() => runSearch(query)}>검색</button></div>
        <div className="chips"><span>자주 찾는 검색</span><button onClick={() => runSearch("M2-1317")}>M2-1317</button><button onClick={() => runSearch("토너")}>토너 오류</button><button onClick={() => runSearch("ADF")}>ADF 줄 발생</button></div>
      </div>
      <div className="heroPanel" aria-label="지원 현황"><div className="device"><div className="screen"><span/><span/><span/></div><div className="paper">READY</div></div><div className="statuscard"><span className="pulse"/><div><strong>자가 해결 가이드</strong><small>현장에서 바로 확인</small></div></div></div>
    </section>

    <section className="quickSection" aria-labelledby="quickTitle">
      <div className="sectionHead"><div><span className="sectionNo">01</span><h2 id="quickTitle">증상으로 빠르게 찾기</h2></div><p>문제 유형을 선택하세요</p></div>
      <div className="quickGrid">{quick.map((item) => <button key={item.title} onClick={() => { setCategory(item.filter); setQuery(""); setTimeout(() => document.getElementById("results")?.scrollIntoView({behavior:"smooth"}), 0); }}><span className="quickIcon">{item.icon}</span><strong>{item.title}</strong><small>{item.note}</small><i>→</i></button>)}</div>
    </section>

    <section className="resultsSection" id="results">
      <div className="sectionHead"><div><span className="sectionNo">02</span><h2>오류코드 검색</h2></div><p>Samsung MultiXpress MX 시리즈 기준</p></div>
      <div className="supportGrid">
        <aside className="filterPanel"><label htmlFor="codeSearch">코드·증상 검색</label><input id="codeSearch" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="코드 또는 증상"/><span className="filterLabel">분류</span>{["전체","용지 걸림","구동부","이미징","센서","소모품","냉각"].map((item) => <button className={category === item ? "active" : ""} onClick={() => setCategory(item)} key={item}>{item}<span>›</span></button>)}</aside>
        <div className="codeList"><div className="listMeta"><strong>{filtered.length}개의 결과</strong><span>코드를 선택하면 조치 방법이 열립니다.</span></div>{filtered.length ? filtered.map((item) => <button className={`codeCard ${selected.code === item.code ? "selected" : ""}`} key={item.code} onClick={() => setSelected(item)}><div><code>{item.code}</code><span className={item.level === "자가 조치" || item.level === "청소 가능" ? "safe" : "warn"}>{item.level}</span></div><strong>{item.title}</strong><p>{item.summary}</p><i>자세히 보기 →</i></button>) : <div className="empty"><strong>검색 결과가 없습니다.</strong><p>코드의 일부만 입력하거나 증상 이름으로 다시 찾아보세요.</p></div>}</div>
        <article className="detailPanel"><span className="detailTag">선택한 오류</span><code>{selected.code}</code><h3>{selected.title}</h3><p>{selected.summary}</p><ol><li><span>1</span><div><strong>전원 및 안전 확인</strong><small>인쇄를 중지하고 내부가 뜨거운 경우 충분히 식혀주세요.</small></div></li><li><span>2</span><div><strong>해당 부위 점검</strong><small>{selected.code === "M2-1317" ? "옆 커버를 열어 정착기에 걸린 종이를 완전히 제거합니다." : "표시된 부품의 장착, 이물질과 연결 상태를 확인합니다."}</small></div></li><li><span>3</span><div><strong>재시작 후 확인</strong><small>전원을 다시 켜고 테스트 인쇄로 정상 동작을 확인합니다.</small></div></li></ol>{selected.code === "M2-1317" ? <a className="primaryLink" href="#m2-guide">이미지 가이드 보기</a> : <a className="primaryLink" href="/assets/mx-error-codes.pdf" target="_blank">전체 매뉴얼 보기</a>}<div className="caution"><strong>!</strong><span>에러가 반복되거나 분해가 필요하면 전원을 끄고 전문 기사에게 문의하세요.</span></div></article>
      </div>
    </section>

    <section className="guidesSection" id="guides"><div className="sectionHead"><div><span className="sectionNo">03</span><h2>현장 해결 가이드</h2></div><p>이미지를 눌러 크게 확인하세요</p></div><div className="guideGrid"><article><div className="guideLabel">화질 문제 · 3단계</div><h3>ADF 복사 시 가로 줄이 생길 때</h3><p>ADF 미러 오염 여부를 확인하고 젖은 티슈와 마른 수건으로 안전하게 청소합니다.</p><a href="/assets/adf-line-guide.png" target="_blank"><Image src="/assets/adf-line-guide.png" width={1536} height={1018} alt="ADF 줄 발생 시 미러 청소 방법 전체 안내"/></a></article><article id="m2-guide"><div className="guideLabel navy">에러 해결 · 6단계</div><h3>M2-1317 정착기 용지 걸림</h3><p>걸린 용지를 제거하고 테크 모드의 Wrap Jam Clear로 오류를 초기화합니다.</p><a href="/assets/m2-1317-guide.png" target="_blank"><Image src="/assets/m2-1317-guide.png" width={1400} height={2304} alt="M2-1317 오류 해결 6단계 안내"/></a></article></div></section>

    <section className="manuals" id="manuals"><div><span className="sectionNo light">04</span><h2>기술자료 다운로드</h2><p>현장에서 빠르게 확인할 수 있도록 원본 PDF 자료를 제공합니다.</p></div><div className="downloadGrid"><a href="/assets/mx-error-codes.pdf" target="_blank"><span>PDF</span><div><strong>MX 시리즈 에러코드</strong><small>SL-X3220 / SL-X4220 오류 진단표</small></div><i>↓</i></a><a href="/assets/mxpro-error-codes.pdf" target="_blank"><span>PDF</span><div><strong>MXPRO 오류코드</strong><small>오류 체계와 분류별 확인 자료</small></div><i>↓</i></a></div></section>
    <footer><div className="brand inverse"><span className="brandmark">T</span><span>TECH<span>CARE</span></span></div><p>복합기 기술지원 포털 · 현장 조치 전 안전수칙을 먼저 확인하세요.</p><a href="#top">맨 위로 ↑</a></footer>
  </main>;
}
