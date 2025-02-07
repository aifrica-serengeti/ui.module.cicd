# Serengeti.ui의 Default 모듈

- 해당 파일은 Serengeti.ui의 통일성을 위해 만들어진 파일입니다.
- Serengeti의 새로운 ui 개발 시 폴더를 다운받아 아래의 절차대로 진행합니다.

## init.sh 파일 실행
- 윈도우는 git bash 환경에서 실행하셔야 합니다.
- 윈도우는 현재 파일 루트에서 `./init.sh` 명령어로 실행
- 맥북은 현재 파일 루트에서 `sh ./init-mac.sh` 명령어로 실행

### serengeti-cicd
- init.sh 파일을 실행 시킬 시 첫 번째로 사용할 프로젝트 명을 입력합니다.
- serengeti-login과 같이 케밥 케이스를 사용합니다.
### 모듈 명 변경
- 두 번째로 작성할 항목은 모듈 명으로 프로젝트에 사용될 모듈 명을 입력합니다.
- SerengetiLoginModule과 같이 파스칼 케이스를 사용합니다.
### 입력 후
- 두 가지 항목을 입력한 뒤 해당 폴더 디렉터리에서 변경을 진행합니다.
- 다음으로는 git action을 실행시킬 workflow 파일을 생성하고
- git push를 실행시켜 해당 라이브러리 빌드를 진행합니다.

### 모듈 실행
- npm install을 진행한 후 새로운 컴포넌트를 routing module의 routes에 등록해야지 정상적으로 동작이 됩니다.