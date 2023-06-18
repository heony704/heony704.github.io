---
title: ubuntu nodejs 프로젝트 환경 만들기
date: '2021-09-10 23:00:00'
tags:
categories: nodejs oci
---

디스코드 봇을 만들기 위해 오라클 클라우드 인스트럭쳐(OCI)에서 인스턴스 생성 후 세팅하는 과정입니다.  
image는 `ubuntu 20.04`를, SSH client는 PuTTY를 사용했습니다.  
node 프로젝트를 실행합니다.

## 1. SSH 접속

OCI에서 얻어온 공용 IP 주소와 private key를 이용해서 접속합니다.

## 2. root 비밀번호 설정

비밀번호를 잊어버리지 않도록 적어둡시다.

```bash
sudo passwd root
```

### 계정 변경 방법

- root 계정으로 변경

```bash
su -
```

- ubuntu 라는 계정으로 변경

```bash
su - ubuntu
```

## 3. 기본 업데이트

```bash
sudo apt-get update
sudo apt-get upgrade
```

## 4. nodejs 설치

`discord.js`가 최소 v16.6 이상의 nodejs를 필요로 해서 최신 버전의 nodejs를 설치했습니다.  
curl이 설치되어있지 않는지 확인해줘야 합니다.

```bash
curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## 5. pm2 설치

세션 로그인이 끊어져도 노드 프로젝트가 돌아가도록 pm2 모듈을 설치합니다.

```bash
sudo npm install pm2 -g
```

전역으로 사용하는 것이 편하므로 `-g`를 붙여줍니다.

### pm2란?

JavaScript 런타임 Node.js의 프로세스 관리자입니다.

- `pm2 list`: 프로세스 리스트 확인
- `pm2 start app.js`: app.js 프로세스를 실행
- `pm2 stop app.js`: app.js 프로세스를 정지
- `pm2 restart app.js`: app.js 프로세스를 재시작
- `pm2 delete app.js`: app.js 프로세스를 삭제
- `pm2 log`: 로그 확인

## 6. gitHub 프로젝트 가져오기

git이 이미 설치되어 있어 설치 명령어를 생략했습니다.

git config 정보를 입력합니다.

```bash
git config --global user.name SeungHe0n
git config --global user.mail lsheony704@gmail.com
```

gitHub에서 프로젝트를 복제합니다.

```bash
git clone 레포지토리주소
```

## 7. 프로젝트 실행

`package.json`에 기록된 모듈을 설치합니다.  
`npm i`로도 실행 가능합니다.

```bash
npm install
```

node 프로젝트를 실행하는 명령어입니다.

```bash
node 실행파일
```

저는 script를 저장해서 `npm start`로 프로젝트를 실행했습니다.

pm2로 프로젝트를 실행하는 방법입니다.

```bash
pm2 start 실행파일
```

이렇게 하면 putty를 꺼도 프로젝트가 꺼지지 않습니다.

### winscp란?

마이크로소프트 윈도우용으로 개발된 자유-오픈 소스 소프트웨어이며 SFTP, SCP 및 FTP 클라이언트입니다.

제가 진행한 프로젝트는 공유해선 안되지만 코드에 필요한 토큰이 있었습니다.  
따라서 토큰을 제외한 코드를 gitHub에 올려 사용하고, 토큰 값이 들은 파일은 winscp(SFTP)를 이용해서 옮겼습니다.

```toc

```
