---
title: 자주 쓰는 git branch 명령어 모음
date: '2021-06-11 23:00:00'
tags:
categories: git
---

자주 사용하는 git 명령어를 정리했습니다.

## git 관련 명령어

### 원격 저장소의 내용 갱신하기

```bash
git remote update
```

## branch 목록 관련 명령어

### 로컬 저장소의 branch 목록 보기

```bash
git branch
```

### 원격 저장소의 branch 목록 보기

```bash
git branch -r
```

### 모든 branch 목록 보기

```bash
git branch -a
```

## branch 관리 명령어

### 현재 위치에서 새로운 branch 생성하기

```bash
git branch [생성할 branch 이름]
```

### 다른 branch로 이동하기

```bash
git checkout [이동할 branch 이름]
```

### branch 이름 변경하기

```bash
git branch -m [기존 branch 이름] [새로운 branch 이름]
```

### branch 삭제하기

```bash
git branch -d [삭제할 branch 이름]
```

### 원격 저장소의 branch 삭제하기

```bash
git push --delete [원격 저장소 별칭] [원격 branch 이름]
```

예를 들어 다음과 같이 작성할 수 있습니다.

```bash
git push --delete origin test
```

### 원격 저장소의 특정 branch를 로컬 저장소의 새로운 branch로 가져오기

```bash
# 원격 저장소의 branch 를 가져와 새로운 로컬 branch 생성
git checkout -b [새로운 로컬 branch 이름] [원격 저장소 별칭][원격 branch 이름]

# 새로 만든 로컬 branch 로 이동
git checkout [새로운 로컬 branch 이름]

# 원격 저장소의 최신 변경사항을 가져와 현재 branch에 반영
git pull origin [원격 branch 이름]
```

세번째 줄에서 pull을 하는 이유는 `checkout -b` 명령을 수행할 때 대상 Branch를 과거에 이미 가져온 기록이 있을 경우 원격 저장소에서 가져오는 것이 아닌, Cache된 정보를 가져오기 때문입니다.

예를 들어 다음과 같이 작성할 수 있습니다.

```bash
git checkout -b temp origin/master
git checkout temp
git pull origin master
```

### 로컬 저장소의 변경 내용을 원격 저장소로 보내기

```bash
git add .
git commit -m "commit text"
git push origin [원격 branch 이름]
```

예를 들어 다음과 같이 작성할 수 있습니다.

```bash
git add .
git commit -m "User 수정, Move/Block Handler 추가"
git push origin feature/moveBlockHandler
```

---

참고

- [[GIT] Branch 관리하기: branch, checkout, push, pull](https://www.tuwlab.com/ece/22216)
- [[GIT] Commit하고 원격 저장소로 내보내기: add, reset, commit, push](https://www.tuwlab.com/22214)
- [[Git] branch생성 후 push하기](https://velog.io/@clubmed2/Git-branch생성-후-push하기)

```toc

```
