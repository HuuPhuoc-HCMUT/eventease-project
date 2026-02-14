Một request (ví dụ GET /api/events) sẽ chạy theo chuỗi:

server.js → app.js → module routes → controller → service → (DB) → trả response

routes: khai báo endpoint + middleware
controller: nhận req/res, gọi service, trả JSON
service: logic nghiệp vụ (rule), gọi DB (qua database.js hoặc repo)
schema: validate input (body/query/params)


THỨ TỰ LÀM:
































