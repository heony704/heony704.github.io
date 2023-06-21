해당 블로그는 [**Zoomkoding Gatsby Blog**](https://github.com/zoomkoding/zoomkoding-gatsby-blog)를 수정하여 만들어졌습니다.

## 수정된 부분

수정된 부분이 많지만 큰 가닥만 잡아보면 다음과 같습니다.

### 패키지 매니저 변경

기존 프로젝트를 클론 후 `npm install` 및 `npm start` 진행 시 에러가 발생했습니다.  
패키지 설치 중 뭔가가 꼬인 것 같은데 원인을 파악하기 힘들어 패키지 매니저를 `yarn`으로 바꾸고 `package.json`에 `resolution`을 명시해 설치 관련 에러를 해결했습니다.  
패키지 버전이 달라 문제가 생기지 않도록 기존 프로젝트의 패키지 버전을 그대로 사용했습니다.

```json
// package.json
{
  "dependencies": {
    "@mui/icons-material": "^5.1.0",
    "@mui/material": "^5.1.0",
    "gatsby": "^4.9.3",
    "gatsby-plugin-advanced-sitemap": "^2.0.0",
    "gatsby-plugin-google-analytics": "^4.9.0",
    "gatsby-plugin-image": "^2.9.1",
    "gatsby-plugin-manifest": "^4.9.1",
    "gatsby-plugin-offline": "^5.9.1",
    "gatsby-plugin-react-helmet": "^5.9.0",
    "gatsby-plugin-robots-txt": "^1.7.0",
    "gatsby-plugin-sass": "^5.9.0",
    "gatsby-plugin-sharp": "^4.9.1",
    "gatsby-remark-autolink-headers": "^5.9.0",
    "gatsby-remark-copy-linked-files": "^5.9.0",
    "gatsby-remark-images": "^6.9.1",
    "gatsby-remark-prismjs": "^6.9.0",
    "gatsby-remark-responsive-iframe": "^5.9.0",
    "gatsby-remark-smartypants": "^5.9.0",
    "gatsby-remark-table-of-contents": "^2.0.0",
    "gatsby-source-filesystem": "^4.9.1",
    "gatsby-theme-material-ui": "^5.1.0",
    "gatsby-transformer-remark": "^5.9.1",
    "gatsby-transformer-sharp": "^4.9.0",
    "prismjs": "^1.24.1",
    "react": "^17.0.1",
    "react-dom": "^17.0.1",
    "sass": "^1.43.4",
    "typeface-montserrat": "^1.1.13"
  },
  "devDependencies": {
    "gh-pages": "^3.2.3",
    "prettier": "2.2.1"
  },
  "resolutions": {
    "@babel/core": "^7.12.3",
    "@emotion/react": "^11.4.1",
    "@emotion/styled": "^11.3.0",
    "babel-eslint": "^10.0.0",
    "eslint": "^7.5.0",
    "gatsby-plugin-sharp": "^4.0.0-next",
    "gatsby-source-filesystem": "^4.0.0-next",
    "graphql": "^15.0.0",
    "react-helmet": "^5.1.3 || ^6.0.0",
    "typescript": ">=2.8.0",
    "webpack": "^4.36.0 || ^5.0.0"
  }
}
```

### 포스트 뷰 카운트 기능 제거

기존 프로젝트에서는 블로그 포스트의 뷰를 카운트하기 위해 CountAPI 서비스를 이용한 걸로 보입니다.  
그런데 CountAPI가 접속이 안될 때도 있고 기존 프로젝트의 코드 상으로는 CPRS 정책 위반으로 제대로 된 결과를 얻을 수 없습니다.  
뷰 카운트 기능으로 인한 편의보다 해당 서비스를 위해 무료 API를 사용하고 관리하는 비용이 더 크다고 생각하여 뷰 카운트 기능을 제거했습니다.

### UI 수정

좀 더 제 마음에 들게 UI를 다음과 같이 수정했습니다.  
변경된 UI는 [제 블로그](https://heony704.github.io/)에서 확인할 수 있습니다.

- header의 About, Posts 버튼 제거
- 포스트의 이모티콘 제거
- 가독성이 좋아지도록 포스트 글 간격 넓힘
- 소개글(Bio) 수정
- Post Navigator의 텍스트가 흘러넘치지 않도록 수정
- footer 수정

### gatsby 자동배포

master 브랜치에 push 혹은 PR 할때마다 자동으로 배포되도록 yml 파일을 추가했습니다.

```yml
// github/workflows/main.yml
name: Gatsby Publish

on:
  pull_request:
    branches:
      - master
    paths-ignore:
      - '**/README.md'
  push:
    branches:
      - master
    paths-ignore:
      - '**/README.md'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: enriikke/gatsby-gh-pages-action@v2
        with:
          access-token: ${{ secrets.ACCESS_TOKEN }}
          deploy-branch: gh-pages
          skip-publish: false
```

### english 버전 제거

영어 버전은 불필요해서 제거해서 프로젝트를 경량화했습니다.
