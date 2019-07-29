# tai image tren mang, neu co san tren may thi ko tao nua, tai~ dung' phien ban moi' chiu.
FROM node:10.16
# thu muc cai` app sau khi build container
# no giong linux hay macos vay
# thu muc no cung giong v
WORKDIR /usr/src/app
# nay la copy file bo~ vao` do'. thuong` copy toan` thu muc, ma` do t xai docker compose roi nen chi can copy cai nao
# can thiet thoi, vi file nay de nodejs no chay.
COPY package*.json ./
# cau lenh co ban thoi
RUN npm install

#docker -compose la de quan ly NHIEU` containers
# chu yeu cai volume
# la t mount no ra ngoai`
# la cho~ thu muc code ne`,
# de luc code
# la no combine code o~ ngoai` + node_modules o~ trong container => app chay

# nay la bind port cua may' minh` toi port cua container dang chay
# <port bind ra may' minh`>:<port cua app trong container>
# nhiu volume con` nhieu` lam', nay moi' da long^ :))