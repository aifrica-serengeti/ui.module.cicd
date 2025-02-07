echo "새로운 프로젝트 명을 입력해 주세요. 프로젝트 명은 Kebab Case 규칙을 따릅니다."
read -p "ex) serengeti-login : " NEW_PROJECT_NAME

echo "새로운 모듈 명을 입력해 주세요. 모듈 명은 Pascal Case 규칙을 따릅니다."
read -p "ex) SerengetiLoginModule : " NEW_MODULE_NAME

echo "프로젝트 명 변경 진행 중..."
# 디렉토리 아래의 모든 파일을 찾음
find ./ -type f -not -name "init.sh" |
# 파일을 순회하면서 변경된 파일 출력
while IFS= read -r file; do
    if grep -q "프로젝트 명 변경" "$file"; then
        # 파일 내용 변경 후 결과를 파일에 씀
        sed -i "s/프로젝트 명 변경/$NEW_PROJECT_NAME/g" "$file"
        echo "$file has changes"
    fi
done
echo -e "프로젝트 명 변경 완료!\n"
echo "모듈 명 변경 진행 중..."
# 디렉토리 아래의 모든 파일을 찾음
find ./ -type f -not -name "init.sh" |
# 파일을 순회하면서 변경된 파일 출력
while IFS= read -r file; do
    if grep -q "SerengetiDefaultModule" "$file"; then
        # 파일 내용 변경 후 결과를 파일에 씀
        sed -i "s/SerengetiDefaultModule/$NEW_MODULE_NAME/g" "$file"
        echo "$file has changes"
    fi
done
echo -e "모듈 명 변경 완료!\n"

mkdir -p "./.github/workflows"

# 파일 경로 설정
file_path="./.github/workflows/build.yml"

# 파일 내용 생성
echo "name: angular-library
on:
  push:
    branches: [\"master\"]
    paths-ignore:
      - ".github/**"
      - ".values/**"
    workflow_dispatch: {}
jobs:
  call-maven-workflow:
    uses: aifrica-serengeti/devops.workflow/.github/workflows/angular-library.yml@master
    secrets: inherit
    with:
      node_version: 18.13.0
      dispatch_url: https://github.com/aifrica-serengeti/ui.serengeti/actions/workflows/build.yml" > "$file_path"

echo -e "build.yml 파일이 생성되었습니다.\n"

git add .
git commit -m '[add]: initial setting complete'
git push

echo -e "git 설정이 완료되었습니다."

# 스크립트의 마지막 부분에서 init.sh와 init-mac.sh 파일을 백그라운드에서 삭제
(sleep 1 && rm -- "$0" init-mac.sh) &

echo -e "\n스크립트 파일을 삭제 하였습니다."
