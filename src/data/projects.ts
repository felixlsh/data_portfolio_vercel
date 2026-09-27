import { BarChart3, Gamepad2, Zap, Car, Vote } from "lucide-react";
import type { LucideProps } from "lucide-react";
import type { ComponentType } from "react";
import crmDashboardImg from "@/assets/crm-dashboard.webp";
import rok2489_1 from "@/assets/rok/2489_1.png";
import rok2489_2 from "@/assets/rok/2489_2.png";
import rok2489_3 from "@/assets/rok/2489_3.webp";
import rok2489_4 from "@/assets/rok/2489_4.webp";
import rok2489_5 from "@/assets/rok/2489_5.webp";
import rok1021_1 from "@/assets/rok/1021_1.png";
import rok1021_2 from "@/assets/rok/1021_2.png";
import rok1021_3 from "@/assets/rok/1021_3.png";
import rok1021_4 from "@/assets/rok/1021_4.webp";
import ahk2022 from "@/assets/ahk/2022_sosohan_ahk.png";
import ahk2023 from "@/assets/ahk/2023_dytlab_ahk.png";
import electionFinalAnalysis from "@/assets/election-final-analysis.png";

export type ProjectGallery = {
  title: string;
  subtitle?: string;
  images: string[];
};

export type CaseStudy = {
  problem: string;
  solution: string;
  result: string;
};

export type ProjectEvidence = {
  title: string;
  caption: string;
  points: string[];
} & (
  | { kind: "image"; src: string; alt: string }
  | { kind: "pdf"; links: { title: string; href: string; description: string }[] }
);

export type Project = {
  slug: string;
  title: string;
  org: string;
  status?: "Done" | "In Progress" | "Live" | "Archived";
  period?: string;
  dataPeriod?: string;
  reviewedAt: string;
  icon: ComponentType<LucideProps>;
  desc: string;
  tags: string[];
  metric?: { v: string; l: string };
  externalHref: string;
  overview: string;
  role: string[];
  highlights: { title: string; body: string }[];
  stack: string[];
  teamStack?: string[];
  image?: string;
  galleries?: ProjectGallery[];
  embedUrl?: string;
  embedAppName?: string;
  embedPoweredBy?: string;
  embedCaption?: string;
  pdfUrl?: string;
  caseStudy: CaseStudy;
  evidence: ProjectEvidence;
};

const statusLabels = {
  Done: "완료", "In Progress": "진행 중", Live: "운영 중", Archived: "보관 중",
} as const;

export const getProjectStatusLabel = (status: Project["status"]) =>
  status ? statusLabels[status] : undefined;

export const projects: Project[] = [
  {
    slug: "election-dashboard",
    title: "제9회 지선 서울시장 개표 추이 대시보드",
    org: "Personal Project",
    status: "Done",
    reviewedAt: "2026-09-13",
    icon: Vote,
    desc: "Cloud 환경에서 Selenium으로 선관위 개표 데이터를 실시간 크롤링하고, Pandas로 변동 시점을 감지해 Streamlit 웹앱으로 시각화한 실시간 모니터링 대시보드.",
    tags: ["Python", "Selenium", "Pandas", "Streamlit"],
    externalHref: "https://felixlsh0election.streamlit.app/",
    overview:
      "중앙선거관리위원회의 실시간 개표 현황을 매번 수동으로 새로고침하며 직접 계산해야 하는 비효율을 해결하기 위해 만든 프로젝트입니다. 단순 현재 수치 조회를 넘어 개표율 변동에 따른 후보별 득표율 추이를 시계열로 축적, 실시간 흐름을 직관적으로 모니터링할 수 있는 대시보드 인프라를 구축했습니다.",
    role: [
      "Cloud 서버 환경에서 Python·Selenium 기반 실시간 크롤링 파이프라인 구축",
      "Pandas로 이전 데이터와 비교해 Change Point만 필터링·적재하는 정제 프로세스 구현",
      "Streamlit으로 누적 변동 추이 라인 차트와 실시간 로그 테이블을 동적 시각화·배포",
    ],
    highlights: [
      {
        title: "수집·표시 자동 실행",
        body: "개표 데이터 수집, 이전 값 비교, 차트와 로그 표시를 자동 실행하는 흐름으로 구현했습니다.",
      },
      {
        title: "Change Point 실시간 감지",
        body: "이전 스냅샷과 비교해 값이 달라진 시점을 필터링하고, 변동 추이를 확인할 수 있도록 기록했습니다.",
      },
      {
        title: "웹 대시보드 배포",
        body: "Streamlit Cloud에 대시보드를 배포하고, 수집한 데이터의 변동 추이와 로그를 웹에서 확인할 수 있도록 구성했습니다.",
      },
    ],
    stack: ["Python", "Selenium", "Pandas", "Streamlit", "Cloud Server"],
    embedUrl: "https://felixlsh0election.streamlit.app/?embed=true",
    embedAppName: "서울시장 개표 추이 대시보드",
    embedPoweredBy: "Powered by Streamlit",
    embedCaption: "Streamlit Cloud에 배포한 프로젝트입니다. 아래 보관 화면에서도 차트와 로그 구성을 살펴볼 수 있습니다.",
    caseStudy: {
      problem: "개표 현황을 반복 조회해야 했고, 시간에 따른 변화를 비교하기 어려웠습니다.",
      solution: "Python·Selenium으로 수집하고, Pandas로 변동을 비교해 Streamlit에 시각화했습니다.",
      result: "개표 데이터의 변동 추이와 로그를 웹에서 확인할 수 있도록 구현했습니다.",
    },
    evidence: {
      kind: "image",
      title: "개표 변동 추이와 로그 화면",
      caption: "프로젝트에 보관된 분석 화면입니다. 시간별 표차 차트와 변동 로그의 표시 구성을 보여줍니다.",
      src: electionFinalAnalysis,
      alt: "시간별 표차 막대 차트와 개표 변동 로그 테이블",
      points: ["시간에 따른 표차와 선두 변화를 차트로 표시", "조회 시각·표차·변동폭을 로그 테이블에 함께 표시"],
    },
    galleries: [
      {
        title: "주요 차트",
        subtitle: "Streamlit 대시보드에서 산출된 최종 분석 결과입니다.",
        images: [electionFinalAnalysis],
      },
    ],
  },
  {
    slug: "crm-dashboard",
    title: "CRM 실적 대시보드",
    org: "다이트랩",
    status: "Done",
    reviewedAt: "2026-09-13",
    icon: BarChart3,
    desc: "신규 CRM에 부재했던 실적 조회 기능을 SQL + Looker Studio로 구축. 실장단이 결제 금액·내역·고객 정보를 손쉽게 조회.",
    tags: ["SQL", "Looker Studio", "BigQuery"],
    externalHref: "https://felixlsh.oopy.io/1e98d2a0-6494-803c-a36d-ebbc70a23f17",
    overview:
      "기존 CRM에서 신규 CRM으로 이관한 후, 실적 조회 기능이 부재해 실무자들이 매번 수기로 데이터를 취합해야 했던 문제를 해결한 프로젝트입니다. SQL 기반 데이터 파이프라인을 구축하고 Looker Studio로 시각화하여, 결제 금액·내역·고객 정보를 누구나 손쉽게 조회할 수 있는 환경을 제공했습니다.",
    role: [
      "신규 CRM 데이터 전처리 및 이관",
      "원내 실무자 대상 결제·고객 실적 조회 시스템 제공 및 가이드",
      "Looker Studio 대시보드 설계 및 운영",
    ],
    highlights: [
      { title: "실적 조회 화면", body: "결제 금액·내역·고객 정보를 대시보드에서 조회할 수 있도록 구현했습니다." },
      { title: "데이터 전처리·이관", body: "신규 CRM 데이터의 전처리와 이관, SQL 추출·집계를 담당했습니다." },
      { title: "조회 조건 제공", body: "지점·기간 필터와 고객 검색, 결제방법별 집계를 화면에 구성했습니다." },
    ],
    stack: ["SQL", "Looker Studio", "Google BigQuery"],
    image: crmDashboardImg,
    caseStudy: {
      problem: "신규 CRM의 실적 조회 기능이 부족해 데이터를 수기로 취합해야 했습니다.",
      solution: "데이터 전처리·이관, SQL 추출·집계, Looker Studio 대시보드 구축과 사용 안내를 담당했습니다.",
      result: "결제 금액·내역·고객 정보를 대시보드에서 조회할 수 있도록 구현했습니다.",
    },
    evidence: {
      kind: "image",
      title: "CRM 실적 조회 화면",
      caption: "지점·기간 필터와 수납 내역을 한 화면에 모은 Looker Studio 대시보드입니다.",
      src: crmDashboardImg,
      alt: "지점·기간 필터, 결제방법별 집계와 수납 내역을 표시한 CRM 대시보드",
      points: ["지점·조회 기간을 선택하고 고객 정보를 검색", "결제방법별 집계와 개별 수납 내역을 함께 조회"],
    },
  },
  {
    slug: "rok-dashboard",
    title: "ROK Dashboard",
    org: "Rise of Kingdoms",
    reviewedAt: "2026-09-13",
    icon: Gamepad2,
    desc: "시즌별 계정 데이터를 수집·정리·시각화. 개인 성과 지표, 항목별 랭킹, KPI 달성 현황을 차트로 제공.",
    tags: ["Python", "Pandas", "Looker Studio", "Zapier"],
    externalHref: "https://felixlsh.oopy.io/b29f67c3-3037-48f6-8c8a-ddd0b5a1008e",
    overview:
      "Rise of Kingdoms 길드 운영을 위해 시즌별 계정 데이터를 수집·가공·시각화한 분석 프로젝트입니다. 개인 성과 지표, 항목별 랭킹, KPI 달성 현황을 한눈에 볼 수 있는 대시보드를 제공하며, Zapier를 데이터 파이프라인 자동화에 활용했습니다.",
    role: [
      "Python 기반 데이터 수집·정제 파이프라인 구축",
      "시즌별 KPI 정의 및 지표 설계",
      "Looker Studio 시각화 및 운영",
      "Zapier를 활용한 ROK Dashboard 데이터 파이프라인 자동화",
    ],
    highlights: [
      { title: "시즌별 데이터 정리", body: "Python으로 계정 데이터를 수집·정제하고, Zapier를 데이터 파이프라인 자동화에 활용했습니다." },
      { title: "개인 KPI 시각화", body: "계정별 목표와 진행 현황을 게이지와 추이 차트로 표시했습니다." },
      { title: "성과·랭킹 비교", body: "계정별 성과와 기여 순위를 대시보드에서 비교할 수 있도록 구성했습니다." },
    ],
    stack: ["Python", "Pandas", "Looker Studio", "Google Sheets API", "Zapier"],
    caseStudy: {
      problem: "시즌별 계정 성과와 KPI 달성 현황을 비교할 화면이 필요했습니다.",
      solution: "Python 기반 수집·정제, KPI 설계, Looker Studio 시각화를 담당하고, Zapier로 데이터 파이프라인을 자동화했습니다.",
      result: "계정별 성과·랭킹·KPI 달성 현황을 비교하는 대시보드를 제공했습니다.",
    },
    evidence: {
      kind: "image",
      title: "Kingdom 2489 개인 KPI 화면",
      caption: "계정별 목표, 진행 현황과 기간별 변화를 보여주는 보관 화면입니다. 표시된 값은 캡처 당시 특정 계정의 상태입니다.",
      src: rok2489_1,
      alt: "Kingdom 2489의 계정 검색, KPI 진행률, 기여 순위와 개인 추이 차트",
      points: ["계정을 선택해 목표 대비 진행 현황과 기여 순위를 확인", "개인 활동 지표의 기간별 변화를 차트로 비교"],
    },
    galleries: [
      {
        title: "Kingdom 2489",
        subtitle: "KPI 시스템 · 리더보드 · 명예의 전당",
        images: [rok2489_1, rok2489_2, rok2489_3, rok2489_4, rok2489_5],
      },
      {
        title: "Kingdom 1021",
        subtitle: "왕국 투력·처치 포인트 · 개인 퀘스트 진행 현황",
        images: [rok1021_1, rok1021_2, rok1021_3, rok1021_4],
      },
    ],
    embedUrl:
      "https://datastudio.google.com/embed/reporting/305dc2f7-bc0e-445f-b855-157fa8ab8f56/page/p_71pb7nil6c",
  },
  {
    slug: "ahk-automation",
    title: "업무 자동화",
    org: "다이트랩 · 사소한",
    status: "Done",
    reviewedAt: "2026-09-13",
    icon: Zap,
    desc: "반복 입력·포맷 변환·셀 정리 작업을 AHK 스크립트와 업무 도구로 자동화.",
    tags: ["AHK", "Python", "Excel"],
    externalHref: "https://felixlsh.oopy.io/57185ce0-b3af-463b-aab3-d41fbd9f0b0d",
    overview:
      "반복 입력·포맷 변환·셀 정리 등 수작업으로 처리하던 업무를 스크립트로 자동화한 프로젝트입니다. 반복 업무의 흐름을 분석하고, AHK 기반 업무 도구와 데이터 입력 보조 도구를 구현했습니다.",
    role: [
      "반복 업무 패턴 분석 및 자동화 대상 선정",
      "AHK 스크립트 설계 및 배포",
      "포맷 변환, 셀 병합·정리 작업을 단일 스크립트로 처리",
    ],
    highlights: [
      { title: "반복 작업 자동 실행", body: "반복 입력과 데이터 정리 작업을 정해진 절차로 실행하도록 구현했습니다." },
      { title: "업무 도구 구성", body: "업무 상황에 맞는 작업을 선택해 실행할 수 있도록 탭과 버튼으로 구성했습니다." },
      { title: "단일 스크립트 통합", body: "포맷 변환·셀 병합·정리 작업을 하나의 스크립트로 묶어 운영 편의성을 높였습니다." },
    ],
    stack: ["AHK", "Python", "Excel"],
    caseStudy: {
      problem: "반복 입력·포맷 변환·셀 정리 등을 수작업으로 처리하고 있었습니다.",
      solution: "반복 업무를 분석하고, AHK 스크립트와 자동화 흐름을 설계·구현했습니다.",
      result: "여러 반복 작업을 정해진 절차로 실행하는 도구를 구현했습니다.",
    },
    evidence: {
      kind: "image",
      title: "사소한 업무 자동화 도구",
      caption: "업무 상황별 실행 항목을 탭으로 나눈 AHK 도구의 보관 화면입니다. 아래 갤러리에는 다이트랩의 데이터 입력 보조 화면도 함께 담았습니다.",
      src: ahk2022,
      alt: "출근 후·업무 중·퇴근 전·서브PC 탭으로 구성된 AHK 업무 도구",
      points: ["업무 상황별 탭과 작업 실행 버튼으로 구성", "사소한의 업무 도구와 다이트랩의 입력 보조 도구를 구분해 제시"],
    },
    galleries: [
      {
        title: "사소한 (2022)",
        subtitle: "출근 후·업무 중·퇴근 전·서브PC 탭으로 구성된 일과 자동화 매크로",
        images: [ahk2022],
      },
      {
        title: "다이트랩 (2023)",
        subtitle: "데이터 입력 보조 매크로 — 반복 입력·포맷 정리 자동화",
        images: [ahk2023],
      },
    ],
  },
  {
    slug: "carad",
    title: "CarAD",
    org: "졸업작품 · 2인",
    status: "Done",
    reviewedAt: "2026-09-13",
    icon: Car,
    desc: "Node.js(Express) + MongoDB + Kotlin 기반 웹앱. REST API 설계 및 백엔드/DB 담당.",
    tags: ["Node.js", "MongoDB", "REST API"],
    metric: { v: "2인", l: "팀 프로젝트" },
    externalHref: "https://felixlsh.oopy.io/1901d883-b654-48ad-b4a5-169d8cef3211",
    overview:
      "졸업작품으로 2인 팀에서 진행한 차량 광고 플랫폼 프로젝트입니다. Node.js(Express)와 MongoDB로 백엔드를 구축하고, Kotlin 기반 안드로이드 앱과 통신하는 REST API를 설계했습니다.",
    role: [
      "REST API 설계 및 구현",
      "MongoDB 스키마 설계 및 데이터 운영",
      "백엔드 인프라 전반 담당",
    ],
    highlights: [
      { title: "백엔드·DB 담당", body: "2인 팀에서 Node.js 기반 백엔드와 MongoDB 구현을 담당했습니다." },
      { title: "라우팅·데이터 구조", body: "보고서에 서버 구성, 요청 경로와 회원 데이터 스키마를 기록했습니다." },
      { title: "앱 연동", body: "Android 앱 기능을 지원할 API와 데이터 저장 구조를 구현했습니다." },
    ],
    stack: ["Node.js", "Express", "MongoDB", "REST API"],
    teamStack: ["Kotlin"],
    caseStudy: {
      problem: "차량 광고 플랫폼의 앱 기능을 지원할 API와 데이터 저장 구조가 필요했습니다.",
      solution: "2인 팀에서 REST API와 MongoDB 등 백엔드·DB 구현을 담당했습니다.",
      result: "Android 앱과 통신하는 백엔드와 데이터 저장 구조를 구현했습니다.",
    },
    evidence: {
      kind: "pdf",
      title: "보고서에서 보는 백엔드·DB 구현",
      caption: "팀 프로젝트 보고서 중 백엔드·DB 담당 범위와 연결되는 부분입니다. PDF 파일의 페이지 순서를 기준으로 안내합니다.",
      points: ["24쪽: Express 서버 구성과 MongoDB 연결, 요청 라우팅", "27쪽: 회원 스키마와 회원가입 정보의 DB 연동 기록"],
      links: [
        { title: "서버·라우팅 구성 · PDF 24쪽", href: "/carad/graduation-report.pdf#page=24&view=FitH", description: "서버 설정, DB 연결과 요청 경로를 살펴봅니다." },
        { title: "회원 스키마 · PDF 27쪽", href: "/carad/graduation-report.pdf#page=27&view=FitH", description: "회원 데이터 구조와 DB 연동 결과를 살펴봅니다." },
      ],
    },
    pdfUrl: "/carad/graduation-report.pdf",
  },
];

export const getProjectBySlug = (slug?: string) =>
  projects.find((p) => p.slug === slug);
