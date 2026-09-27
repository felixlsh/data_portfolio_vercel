# Felix · 데이터 분석 포트폴리오

이승헌(Felix)의 기존 Lovable 포트폴리오 콘텐츠를 바탕으로 구성한 React + TypeScript + Vite 웹사이트입니다. 대형 타이포그래피, 데이터 조형 애니메이션, 스크롤 등장 효과, 프로젝트별 이미지 구성을 적용했습니다.

## 실행과 검증

Node.js 22 LTS와 npm을 권장합니다. 별도 환경 변수 없이 실행할 수 있습니다.

```bash
npm ci
npm run dev
```

```bash
npm run typecheck
npm run build
npm run preview
```

## Vercel 배포

프로젝트를 Git 저장소에 올린 뒤 Vercel에서 가져오거나, 프로젝트 루트에서 Vercel CLI로 배포할 수 있습니다.

```bash
npx vercel
# 미리보기 확인 후 프로덕션 배포
npx vercel --prod
```

`vercel.json`에 다음 설정이 포함되어 있습니다.

- 프레임워크: Vite
- 설치: `npm ci`
- 빌드: `npm run build`
- 출력 폴더: `dist`
- 프로젝트 상세 URL 새로고침을 지원하는 SPA 라우팅

## 주요 구성

- `src/pages/Index.tsx`: 소개, 주요 수치, 프로젝트, 경력, 연락처
- `src/pages/ProjectDetail.tsx`: 프로젝트 상세, 이미지 확대, 외부 대시보드, PDF
- `src/data/projects.ts`: 기존 프로젝트 콘텐츠
- `src/components/portfolio/`: 주요 섹션과 데이터 조형
- `src/index.css`: 테마, 반응형 레이아웃, 모션
- `src/assets/`, `public/carad/`: 원본 프로젝트 이미지와 졸업 보고서

기존 프로젝트 5개와 경력, 연락처, 프로젝트 이미지 및 PDF를 유지했습니다. 화면 오른쪽 상단에서 다크·라이트 테마와 모션을 전환할 수 있습니다. 운영체제의 동작 줄이기 설정도 존중하며, 모바일에서는 조형 표현과 탐색 메뉴를 단순화합니다.

외부 Streamlit·Looker 대시보드는 해당 서비스의 공개 상태와 접근 권한에 따라 표시 여부가 달라집니다. 포함된 정적 이미지와 PDF는 이 프로젝트에서 직접 제공합니다.

## Lovable과의 관계

기존 Lovable 프로젝트를 기반으로 내보낸 후 최종 UI, 접근성, 배포 설정을 이 소스에서 보완했습니다. 이 소스와 기존 Lovable 편집기는 자동으로 동기화되지 않습니다. 후속 수정은 이 프로젝트를 기준으로 진행하거나 Git 연동을 별도로 구성하세요.
