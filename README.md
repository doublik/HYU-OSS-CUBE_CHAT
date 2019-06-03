osdev-team10-websocketchatplayer

클론하스고 npm install 하시고

nodemon 사용 하셔서 실행하시거나 (패키지에 있으니까 그냥 인스톨 하시고 'nodemon' 치시면 되용)

node index.js 하시면 되용

## mysql 추가 (6/3)
 mysql이 추가되어서 실행하기 전에 mysql도 같이 임포트 해주세용
 (npm install mysql --save)

 .js 파일에서 데이터베이스 세팅하는 건 아직 추가를 못해가
 (요건 사실 패키징 할 때 스크립트로 짤 생각임 다른 의견 있음 주세용)
 일단은 mysql 설치하시면 실행하셔서
 GRANT ALL PRIVILEGES ON *.* TO 'user'@'localhost' IDENTIFIED BY 'user';
 입력 해주시면 준비 완료임다
