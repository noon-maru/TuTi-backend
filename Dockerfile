# Node.js의 18.x 버전을 사용하는 이미지를 선택합니다.
FROM node:18

# python3와 python3-venv을 설치합니다.
RUN apt-get update && apt-get install -y python3 python3-venv python3-pip

# 가상환경을 생성하고 활성화합니다.
RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Python의 Pillow 패키지와 numpy 패키지를 설치합니다.
RUN pip3 install pillow numpy

# 작업 디렉토리를 생성하고 Express 서버 소스 코드를 복사합니다.
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install

# nodemon과 ts-node와 typescript를 전역으로 설치합니다.
RUN yarn global add nodemon ts-node typescript

COPY . .

# 포트 8080을 열어 Express 서버가 외부와 통신할 수 있도록 합니다.
EXPOSE 8080

# 서버를 실행합니다.
CMD ["yarn", "dev"]
