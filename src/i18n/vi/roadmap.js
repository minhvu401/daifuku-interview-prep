// Vietnamese content — RoadmapPage
export default {
  badge: 'Lộ trình phát triển',
  title: 'Lộ trình kỹ năng Backend nâng cao',
  subtitle: 'Database · Kiến trúc hệ thống · Cloud & DevOps · Testing & Observability · Kế hoạch hành động',
  content: `# 🚀 Lộ trình Kỹ năng Backend Cần Bổ sung & Nâng cao

---

## 1. 🗄️ Database & Optimization (Cốt lõi Backend)

### Chẩn đoán & Tối ưu SQL
- **Đọc Execution Plan chuyên sâu**: Sử dụng thành thạo \`EXPLAIN ANALYZE\` để đọc và phân tích execution plan (phân biệt *Seq Scan* vs *Index Scan*, *Nested Loop* vs *Hash Join* vs *Merge Join*).
- **Indexing nâng cao**: Hiểu sâu và vận dụng Composite Index (tuân thủ *Leftmost Prefix Rule*), Covering Index, B-Tree vs Hash/GIN index.
- **Phân vùng dữ liệu**: Kỹ thuật phân vùng dữ liệu (*Table Partitioning*) & Indexing cho các bảng lớn hàng triệu dòng.

### Transaction & Concurrency
- **Transaction Isolation**: 4 cấp độ cô lập giao dịch (*Read Uncommitted, Read Committed, Repeatable Read, Serializable*) và chống các hiện tượng *Dirty Read, Non-Repeatable Read, Phantom Read*.
- **Xử lý xung đột ghi**: Vận dụng *Pessimistic Locking* (\`SELECT ... FOR UPDATE\`) vs *Optimistic Locking* (\`@Version\`) và phòng tránh *Deadlock*.

### Chiến lược Caching nâng cao (Redis)
- **Các mô hình Caching**: *Cache-Aside*, *Write-Through*, *Write-Behind*.
- **Xử lý sự cố Cache trong Production**:
  - **Cache Stampede / Thundering Herd**: Nhiều request cùng lúc chọc xuống DB khi cache hết hạn.
  - **Cache Avalanche**: Hàng loạt key hết hạn cùng một thời điểm.
  - **Cache Penetration**: Request liên tục các key không tồn tại cả trong Cache lẫn DB.
- **Distributed Locking**: Khoá phân tán với Redis (*Redlock algorithm*) để đảm bảo chỉ 1 instance thực thi task tại một thời điểm.

---

## 2. 🏗️ Architecture & System Design (Kiến trúc Hệ thống)

### Event-Driven & Message Queue
- **Đào sâu RabbitMQ**: Exchange types (*Direct, Topic, Fanout, Headers*), Dead Letter Queue (DLQ), Retry Mechanism, Acknowledgement modes (Manual ACK vs Auto ACK).
- **Apache Kafka**: Topic, Partition, Consumer Group, Event Streaming & Replay, so sánh với RabbitMQ.

### Distributed Patterns (Xử lý Giao dịch Phân tán)
- **Idempotency (Tính bất biến)**: Thiết kế API nhận nhiều request trùng lặp mà không bị duplicate đơn hàng / thanh toán (dùng Idempotency-Key & Redis SETNX / DB Unique Constraint).
- **Transactional Outbox Pattern**: Đảm bảo atomicity giữa việc lưu Database và phát Event vào Queue trong cùng một Local Transaction.
- **Saga Pattern**: Quản lý transaction qua nhiều microservices bằng *Choreography* hoặc *Orchestration* với các *Compensating Transactions* (Giao dịch bù trừ) mà không dùng 2PC.

### Resilience (Khả năng Chịu lỗi & Tải cao)
- **Rate Limiting**: Thuật toán *Token Bucket*, *Leaky Bucket*, *Fixed Window*, *Sliding Window*.
- **Circuit Breaker**: Cầu chì bảo vệ hệ thống với *Resilience4j* (CLOSED, OPEN, HALF-OPEN states).
- **Exponential Backoff**: Chiến lược retry với thời gian chờ tăng theo cấp số nhân và Jitter.

---

## 3. ☁️ Cloud & DevOps (Rất cần cho các cty Cloud Solution)

### Cloud Core (AWS / GCP)
- **Compute**: EC2, Cloud Run / AWS ECS (Docker containers), AWS Lambda (Serverless functions).
- **Storage & Database**: S3 / Cloud Storage, Managed Relational Databases (AWS RDS PostgreSQL).
- **Network & Security**: IAM (Permissions, Roles, Policies), VPC Basics, API Gateway, Load Balancers.

### CI/CD & Containerization
- **CI/CD Pipelines**: Viết pipeline **GitHub Actions / GitLab CI** tự động chạy lint, unit test, build Docker image và push registry / deploy.
- **Kubernetes (K8s) cơ bản**: Quản lý Pods, Services, Deployments, ConfigMap, Secret, Ingress Controller.

---

## 4. 🧪 Testing & Observability (Chất lượng & Vận hành Thực tế)

### Integration Testing với Testcontainers
- Tự động khởi tạo container PostgreSQL, Redis, RabbitMQ thật trong Docker khi chạy Integration Tests (Spring Boot / NestJS), giúp test chính xác môi trường thật.

### Observability (Giám sát & Cảnh báo)
- **Structured Logging**: Log định dạng JSON, sử dụng Correlation ID / Trace ID để trace request xuyên suốt các microservices.
- **Metrics & Dashboards**: Thu thập số liệu hệ thống qua **Prometheus** và dựng dashboard giám sát realtime trên **Grafana** (Response time, Error rate, JVM Heap, Throughput).
- **Distributed Tracing**: Định danh luồng request qua **OpenTelemetry / Jaeger**.

---

## 5. 💡 Gợi ý Checklist Phân chia theo Giai đoạn Học (Milestones)

| Giai đoạn | Mục tiêu trọng tâm | Output sản phẩm thực hành |
| :--- | :--- | :--- |
| **Giai đoạn 1 (Ngắn hạn)** | Tối ưu Postgres sâu + Testcontainers + Outbox Pattern | Nâng cấp project \`Car Management\` hoặc \`BookSwapHub\` có Integration Tests tự động và xử lý Idempotent Payments. |
| **Giai đoạn 2 (Trung hạn)** | Caching patterns + RabbitMQ DLQ/Retry + Prometheus/Grafana | Dựng một hệ thống xử lý Order/Booking giả lập chịu tải có Dashboard đo latency & error rate. |
| **Giai đoạn 3 (Dài hạn)** | AWS/GCP Core + GitHub Actions CI/CD + Kafka basics | Deploy ứng dụng lên Cloud hoàn chỉnh qua CI/CD tự động. |
`
}
