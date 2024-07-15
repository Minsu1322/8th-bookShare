# 프로젝트 명 : 책 In

---

## 프로젝트 소개

- 한 줄 정리 : 도서 관련 의견 공유 웹사이트
- 내용 : 도서 정보 관람이 가능하고, 사용자 간 의견 공유 커뮤니티가 마련되어있는 도서 관련 사이트

## ⏳ 제작기간

- 2024/07/08(월) ~ 2024/07/14(일)

## 기술 환경 및 스택
<div align='center'>
<img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/> 
<img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
<img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" /> 
<img src="https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white" />
<img src="https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=Next.js&logoColor=white" />
<img src="https://img.shields.io/badge/nextui-000000%23000000.svg?style=for-the-badge&logo=nextui&logoColor=white" />
</div>

## 📑 페이지구성

- 메인페이지
- 상세페이지
- 로그인 & 회원가입 페이지
- 마이페이지

## 🔩 프로젝트 구조

```
project-root/
├── README.md
├── .gitignore
├── public/
│   ├── images
│   ├── json
│   └── projectbookin.ico
├── src/
│   ├── app/
│   │   ├── (Private)
│   │   │     └──(mypage)
│   │   │        ├── _components
│   │   │        │   ├── AccountDeletion.tsx
│   │   │        │   ├── ChangePassWord.tsx
│   │   │        │   ├── CHangeUserId.tsx
│   │   │        │   ├── ChangeUserNickName.tsx
│   │   │        │   ├── commentlist.tsx
│   │   │        │   ├── CoverImg.tsx
│   │   │        │   ├── EyeFilledIcon.tsx
│   │   │        │   ├── EyeSlashFilledIcon.tsx
│   │   │        │   ├── Mypage.tsx
│   │   │        │   └── userInfo.tsx
│   │   │        └── page.tsx  
│   │   ├── (public)
│   │   │    ├── (detailMainPage)
│   │   │    │   └── [id]
│   │   │    │       └── page.tsx
│   │   │    ├── (Login)
│   │   │    └── category
│   │   │        └── [category]
│   │   │            └── page.tsx
│   │   ├── api
│   │   │   ├──[id]
│   │   │   ├──AladinAPi
│   │   │   │   ├── [id]
│   │   │   │   │    └── route.tsx
│   │   │   │   └── route.ts
│   │   │   │   
│   │   │   ├──auth
│   │   │   │  └── callback
│   │   │   │       └── route.tsx  
│   │   │   ├──comment
│   │   │   │  └── route.tsx
│   │   │   └──SupabaseAuth
│   │   ├── auth
│   │   │    └── confirm
│   │   │        └── route.tsx
│   │   ├── error
│   │   │    └── page.tsx
│   │   ├── login
│   │   │    ├── action.tsx
│   │   │    └── page.tsx
│   │   ├── logout
│   │   │    └── actions.ts
│   │   ├── marketing
│   │   │    └── page.tsx
│   │   ├── private
│   │   │    └── page.tsx
│   │   ├── signup
│   │   │    ├── action.tsx
│   │   │    └── page.tsx
│   │   ├── terms
│   │   │    └── page.tsx
│   │   ├── terms_of_use
│   │   │    └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── provider.tsx
│   ├── components
│   │   ├── comment
│   │   │   ├── Comment.tsx
│   │   │   ├── CommentForm.tsx
│   │   │   ├── CommentList.tsx 
│   │   │   └── Pagination.tsx
│   │   ├── home
│   │   │   ├── Category.tsx
│   │   │   ├── CategoryItem.tsx 
│   │   │   └── SkeletonItem.tsx
│   │   ├── ButtonComponents.tsx
│   │   ├── DemoClientComponent.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── TopButton.tsx
│   ├── hooks
│   │   ├── useCommentQuery.tsx
│   │   └── useGenres.tsx
│   ├── styles
│   │   └── TopButton.css
│   ├── types
│   │   ├── book.type.ts
│   │   ├── button.type.ts
│   │   ├── genre.type.ts
│   │   ├── mypageCommentslist.type.ts
│   │   ├── supabase.ts
│   │   └── useInfo.type.ts
│   ├── utils
│   │   └── supabase
│   │       ├── client.ts
│   │       ├── middleware.ts
│   │       └── server.ts
│   └── middleware.ts
└── .env.local
```

## 📑 메인페이지

- AladinApi를 통해 책들의 정보를 메인페이지에 표시
- 베스트셀러, 신규, 인기책들을 분류해서 표시
- Pagination을 통해 각 페이지를 통해 표시

## 📑 상세페이지

- 선택한 책의 정보, 가격, 제목 및 구매버튼 등을 표시
- 댓글조회 & 수정 & 등록기능 구현

## 📑 마이페이지

- 로그인 & 회원가입 기능 구현
- 아이디,비밀번호,닉네임,아바타 이미지 변경 기능구현
- 회원탈퇴 기능구현
- 본인의 작성글 내역 확인기능 구현

## 🛠️ 트러블슈팅
### 1. react quill오류
#### **오류**: react-quill 을 return문에서 띄울 때, 500 에러 발생 
#### **조치**: next/dynamic 임포트,const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });로 불러와서 클라이언트 측에서만 로드되게 추가 처리해서 해결
### 2. supabase insert 오류
#### **오류**: [supabase insert 과정에서 발견한 연결 오류] 댓글 기능의 supabase 라우트 핸들러 부분을 switch 문으로 작성했더니,  response.method를 인식하지 못하는 것으로 보임.(모든 case, default문까지 실행 안 됨) export function으로 변경하니, 500 에러와 함께 response.status is not a function 에러 발생.response자체가  undefined 반환되는 것으로 보이고,supabase DB에 null값의 항목들이 추가됨 + TypeError: Invalid URL 에러 발생. 셋팅 관련 문제로 예상
#### **조치**:  .env.local 파일 url, key 형식 올바르게 변경.클라이언트 측 supabase client 연결. POST부분 핸들러의 함수 인자에 request 만 남기고 ,response는 함수 내부에서 const response = await request.json(); 로 선언. return NextResponse.json({ status: 'success' });(리턴 값 추가)
### 3. 댓글 수정 500 에러 발생.
#### **오류**: 댓글 수정 제작 중 발생 에러 원인 모를 500 에러 발생.
#### **조치**: 테이블의 있는 전체 항목을 update의 값으로 지정하지 않아서 생겼던 문제였음 올바른 user_id, created_at 값 추가해 해결
### 4. 댓글 수정 바로 반영되지않는 문제
#### **오류**: 댓글 작성, 수정시에 화면에 바로 적용이 될 때가 있고 새로고침을 해야 적용될때가있음
#### **조치**: 낙관적 업데이트 적용(tanstack 공식 문서 참고) 
### 5. 댓글 total 갯수 표시 오류
#### **오류**: 댓글 기능의 페이지네이션이 새 댓글이 생겨서 total 페이지네이션 수가 하나 증가될 때, 화면에 즉시 반영되지 않음
#### **조치**: 삭제 기능에도 낙관적 업데이트 적용하니 해결
### 6. 댓글 수정 오류
#### **오류**: 댓글 작성 직후 list에 key가 없다는 경고.(낙관적 업데이트 적용 후 생김)
#### **조치**: 입력할때 uuid로 id값도 직접 넣어주기
### 7. 성능개선
#### **오류**: lighthouse중 LCP에 확인된 이미지관련 로드지연
#### **조치**: Next UI에 제공된 Image 태그에서는 이미지 성능 개선효과 없으며 스타일링 제공되고 lazy loading은 별도로 구현해야될 필요로 확인됬습니다. Image태그를 모두 Next.js의 Image component로 변경
### 8. 마이페이지 아이디 수정 오류
#### **오류**: 마이페이지 아이디 변경 진행 시 입력한 ID가 짤려서 저장되는 증상 발생 ex) test@result.com으로 변경 시도하면 실제로 supabase users테이블에 test@re 로 저장되거나 test@으로 저장된다.
#### **탐색**:
##### 1. input의 입력가능 텍스트 수량 제한 때문에 문제발생?
##### 2. supabase.auth.onAuthStateChange 내에서 비동기 함수를 사용해야되서 setTimeout의 시간설정때문에 저장한된값이 일부만 보였던문제인가?
##### 3. useEffect에서 마운트되는 시점과 사용자가 입력한 값의 시점이 즉 useState로 onChange에서 사용자의 입력값을 받으면서 setTimeout과 맞물려서 결과값이 짤려서 저장되는건가?
#### **조치**:useState에서 문제 발생한부분으로 확인되여 입력값은 useRef로 대체해서 받아서 저장하니 짤리지않았습니다.