---
title: Discord.js에서 자주 사용한 클래스들
date: '2021-09-24 23:00:00'
tags:
categories: discordjs
---

Discord.js를 이용해 디스코드 봇을 만들면서 자주 사용한 클래스와 함수들을 정리한 글입니다.  
궁금한 것은 직접 코드를 뜯어 보는 게 더 좋습니다.  
공식문서는 클래스, 함수에 대한 간략한 설명을 찾을 때 유용합니다.

> version  
> \- Discord.js: 13.1.0  
> \- node.js: 16.8.0

## Client

Discord API와 상호작용하기 위한 기본 허브이자 모든 봇의 시작점

### 사용한 변수

- channels `<ChannelManager>`  
   클라이언트가 현재 처리하고 있는 모든 서버의 모든 채널
- guilds `<GuildManager>`  
  클라이언트가 현재 처리하고 있는 모든 서버
- users `<UserManager>`  
  모든 사용자

### 사용한 함수

- `login(token)`  
  클라이언트 로그인, Discord에 웹소켓 연결
- `on(eventName, listener)`  
  Client 클래스는 EventEmitter를 extends함  
  Discord에서 특정 이벤트 수행시 작동하는 코드 작성 가능

## ClientEvents

Client가 Discord에서 어떤 이벤트를 받아올 수 있는지 알수 있음

### 사용한 이벤트

- ready  
  client가 ready되었을 때 발생
- messageCreate  
  메시지가 보내질 때마다 발생 (봇이든 사용자든)
- interactionCreate  
  interaction이 만들어질 때마다 발생
- guildCreate  
  봇이 서버에 참가했을 때마다 발생
- guildDelete  
  봇이 서버에서 추방되었거나, 서버가 없어졌을 때마다 발생
- guildMemberAdd  
  사용자가 서버에 참가했을 때마다 발생
- guildMemberRemove  
  사용자가 서버를 떠나거나 추방당했을 때마다 발생
- channelDelete  
  채널이 삭제될 때마다 발생

### 주의점

- interaction 이랑 message 이벤트는 DEPRECATED되었음

## Intents

intents를 쉽게 계산할 수 있는 데이터 구조

### 사용한 변수

- FLAG  
  웹소켓 intents의 사용가능한 속성  
  GUILDS, GUILD_MESSAGES, GUILD_MEMBERS 등등 ...

### 주의점

- 코드에 `Intents.FLAGS.속성`을 추가했을 때, 오류가 발생한다면 Discord에서 Bot - Privileged Gateway Intents 에 체크를 안해줘서 발생했을 가능성이 높음

## Guild

디스코드의 서버를 의미

### 사용한 변수

- id  
  서버 id
- name  
  서버 이름
- channels `<GuildChannelManager>`  
  서버에 속한 채널의 관리자

## GuildChannelManager

GuildChannel에 대한 API 메소드를 관리하고 해당 cache를 저장

### 사용한 변수

- cache `Collection<string, (GuildChannel|ThreadChannel)>`  
  서버의 채널들에 대해 알고 싶으면 이 cache 변수를 사용해야 함  
  `GuildChannelManager.cache.forEach()`로 서버의 모든 채널 순회 가능

### 사용한 함수

- `create(name, options)`  
  서버에 새로운 채널 생성, `Promise<Channel>` 반환  
  options을 통해 채널의 타입, 설명, 부모 등을 정할 수 있음

## GuildManager

Guild에 대한 API 메소드를 관리하고 해당 cache를 저장

### 사용한 변수

- cache `Collection<string, Guild/>`  
  서버의 채널들에 대해 알고 싶으면 이 cache 변수를 사용해야 함  
  `GuildManager.cache.forEach()`로 봇이 참여한 모든 서버 순회 가능

## GuildChannel

`TextChannel`, `VoiceChannel`, `CategoryChannel`, `NewsChannel`, `StoreChannel`, `StageChannel` 중 하나의 채널을 나타냄

### 사용한 변수

- id  
  채널 id
- guildId  
  채널이 속한 서버 id
- permissionOverwrites `<PermissionOverwritesManager>`  
  채널의 permissionOverwrites 관리자

## PermissionOverwriteManager

채널의 권한에 대한 API 메소드를 관리하고 해당 cache를 저장

### 사용한 함수

- `create(userOrRole, options, [overwriteOptions])`  
  채널에 권한 생성, 이미 존재한다면 교체  
  `Promise<GuildChannel>` 반환
- `delete(userOrRole, [reason])`  
  채널의 권한 삭제  
  `Promise<GuildChannel>` 반환

## TextBasedChannels

`DMChannel`, `TextChannel`, `NewsChannel`, `ThreadChannel`가 TextBasedChannels에 해당

### 사용한 함수

- `send(options)`  
  채널에 메세지를 보냄
  `Promise<Message>` 반환

## Massage

말 그대로 Discord의 메세지

### 사용한 변수

- author `<User>`  
  메세지 작성자  
  `author.id`로 작성자 id를 알 수 있고, `author.bot`으로 작성자가 봇인지 아닌지 확인 가능함
- content  
  메세지의 내용
- guildId  
  메세지를 보낸 서버 id
- channelId  
  메세지를 보낸 채널 id

```toc

```
