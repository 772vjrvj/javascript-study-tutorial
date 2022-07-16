개별 파일 scss -> css 

해당 파일에 들어가서
cd src\component\timeline\timelineBothBasic\css

아래 명령어를 친다. 그럼 scss가 css로 바뀐 파일을 만들 수 있다.
sass timeline.scss:timeline.css


파일을 한곳에서 관리하는 것은
https://poiemaweb.com/sass-basics


현제 package.json

{
  "name": "sass-project",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build:sass": "sass src/component/sass:src/component/dist/css"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "sass": "^1.53.0"
  }
}

npm run build:sass 를 하면

src/component/sass에 scss파일들을
src/component/dist/css에 css 파일로 바꿔줍니다.




sass --watch src/component/sass:src/component/dist
sass 파일을 수정하면 dist에 파일들에 바로 적용된다.