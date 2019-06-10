에리카 2019 오프소스 소프트웨어 개발 과정

10조 팀 프로젝트 Cubechat 입니다.

## Cubechat

Cubechat은 Node.js, React, `Express, Socket.io, 모듈과 Mysql 데이터베이스를 사용해 만든 채팅 애플리케이션입니다.

## 설치전에 확인 하실 것

이 프로그램은 common 패키지의 경우 mysql-client, mysql-server (5.5.0 이상), nodejs(12.0.0 이상),
client 패키지의 경우 nodejs(12.0.0 이상)이 필요합니다.

시스템에 없는 프로그램은 패키지를 설치하면서 자동으로 함께 설치가 됩니다. 다만 nodejs의 경우 데비안 에 기본으로 제공되는 패키지 저장소에선 4.8.2 까지만 구할 수 있으므로

### `apt-cache madison nodejs`

커맨드를 실행해서 맞는 버전의 nodejs를 다운 가능한지 확인해주세요.
nodejs 12 버전이 나타나지 않을 경우

### `wget https://deb.nodesource.com/setup_12.x -P /tmp/ ; bash /tmp/setup_12.x`

커맨드를 실행해서 해당 저장소를 추가해 주시면 됩니다.

## 설치하는 법

**(모든 설치 작업이 그렇듯이 아래의 과정은 루트 권한을 필요로 합니다.)**

###cubechat-common : 
`wget https://github.com/doublik/HYU-OSS-CUBE_CHAT/raw/master/packages/cubechat_1.0-common.deb -P /tmp/`

###cubechat-client :
`wget https://github.com/doublik/HYU-OSS-CUBE_CHAT/raw/master/packages/cubechat_1.0-client.deb -P /tmp/`

커맨드를 입력하고 다운로드 후,

###`chmod 755 /tmp/[패키지 이름.deb]`

커맨드를 실행해서 실행가능한 파일로 만들어주세요. 그리고

###`apt install /tmp/[패키지 이름.deb]`

를 실행해주면 됩니다.