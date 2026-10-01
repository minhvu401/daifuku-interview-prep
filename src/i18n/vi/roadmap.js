// Vietnamese content — RoadmapPage (Expanded with full Q&A)
export default {
  badge: 'Lộ trình & Câu hỏi Phỏng vấn',
  title: 'Lộ trình Kỹ năng Backend Nâng cao (Q&A Chi tiết)',
  subtitle: 'Database · Hệ thống Phân tán · Cloud & DevOps · Testing & Observability · Script Tiếng Anh Phỏng vấn',
  content: `# 🚀 Lộ trình Kỹ năng Backend Nâng cao (Hỏi & Đáp Chuyên Sâu)

---

## 1. 🗄️ Database & Optimization (Cốt lõi Backend)

### Q1: EXPLAIN ANALYZE & Đọc Execution Plan trong PostgreSQL/MySQL?
- **Giải thích**: \`EXPLAIN\` đưa ra kế hoạch thực thi dự kiến của Query Planner; thêm \`ANALYZE\` sẽ thực sự chạy query và trả về thời gian thực tế (*Actual Time*), số dòng (*Rows*), số vòng lặp (*Loops*).
- **Các thuật ngữ quan trọng**:
  - **Seq Scan (Sequential Scan)**: Đọc từng dòng toàn bộ bảng (chậm trên bảng lớn).
  - **Index Scan**: Đọc cây Index để lấy pointer tới bảng và đọc dữ liệu.
  - **Index Only Scan**: Đọc trực tiếp dữ liệu ngay từ Index mà không cần chạm tới đĩa bảng chính (nhanh nhất).
  - **Nested Loop**: Duyệt mảng lặp lồng nhau (tốt cho dataset nhỏ).
  - **Hash Join**: Tạo Hash Table cho bảng nhỏ rồi tra cứu từ bảng lớn (tốt cho JOIN bảng lớn).
- **English Interview Answer**:
> "I use EXPLAIN ANALYZE to diagnose slow queries by inspecting the execution plan. It reveals whether the DB is performing a Sequential Scan instead of an Index Scan, and highlights join overhead like Hash Joins vs Nested Loops. It allows me to pinpoint missing indexes or inefficient query structures directly."

---

### Q2: Composite Index, Leftmost Prefix Rule & Covering Index là gì?
- **Giải thích**:
  - **Composite Index**: Index tạo trên nhiều cột, ví dụ \`(status, created_at, user_id)\`.
  - **Leftmost Prefix Rule**: Cơ sở dữ liệu chỉ có thể sử dụng Composite Index nếu câu truy vấn chứa cột ngoài cùng bên trái (\`status\`). Query lọc theo \`(status)\` hoặc \`(status, created_at)\` sẽ dùng Index, nhưng query CHỈ lọc theo \`(created_at)\` sẽ KHÔNG thể dùng Index này.
  - **Covering Index**: Index chứa tất cả các cột được yêu cầu trong câu \`SELECT\`. CSDL thực hiện *Index Only Scan* mà không cần I/O truy xuất bảng chính.
  - **B-Tree vs GIN Index**: B-Tree dùng cho dữ liệu so sánh bằng/khoảng (\`=\`, \`<\`, \`>\`); GIN Index dùng cho mảng, JSONB, hoặc Full-text search trong PostgreSQL.
- **English Interview Answer**:
> "A Composite Index indexes multiple columns, but it follows the Leftmost Prefix Rule — meaning queries must include the leading column to utilize the index. A Covering Index includes all required SELECT columns so the DB can return data via an Index Only Scan without hitting the main table disk."

---

### Q3: Phân vùng dữ liệu (Table Partitioning) & Indexing cho bảng dữ liệu cực lớn?
- **Giải thích**:
  - **Table Partitioning**: Chia một bảng dữ liệu khổng lồ (hàng chục triệu dòng) thành các bảng con nhỏ hơn (*Partitions*) về mặt vật lý nhưng vẫn là 1 bảng về mặt logic.
  - **Các chiến lược**: *Range Partitioning* (theo khoảng thời gian \`created_at\` theo tháng/năm), *List Partitioning* (theo khu vực \`region\`), *Hash Partitioning* (theo ID).
  - **Lợi ích**: *Partition Pruning* — DB loại bỏ ngay các bảng con không liên quan khi truy vấn, giúp query chỉ tìm trên tập dữ liệu nhỏ.
- **English Interview Answer**:
> "Table Partitioning splits a massive table into smaller physical partition tables, typically by range like creation date. This enables Partition Pruning, allowing the database to scan only relevant partitions during queries instead of scanning millions of rows."

---

### Q4: 4 Cấp độ Transaction Isolation & Các hiện tượng tranh chấp dữ liệu?
- **Giải thích**:
  - **Read Uncommitted**: Thấp nhất, dễ bị *Dirty Read* (đọc dữ liệu chưa commit của transaction khác).
  - **Read Committed** (Mặc định trong Postgres): Tránh *Dirty Read*, nhưng vẫn bị *Non-Repeatable Read* (đọc 1 dòng 2 lần ra 2 giá trị khác nhau do transaction khác đã UPDATE/DELETE & Commit).
  - **Repeatable Read**: Tránh *Non-Repeatable Read*, nhưng có thể bị *Phantom Read* (đọc danh sách 2 lần xuất hiện thêm dòng mới do transaction khác INSERT & Commit).
  - **Serializable**: Cao nhất, chạy tuần tự hoàn toàn, chống mọi xung đột dữ liệu nhưng giảm hiệu năng nặng.
- **English Interview Answer**:
> "The 4 transaction isolation levels manage concurrency trade-offs: Read Uncommitted allows Dirty Reads; Read Committed prevents Dirty Reads; Repeatable Read prevents Non-Repeatable Reads; and Serializable guarantees full isolation by executing transactions sequentially."

---

### Q5: Pessimistic Locking vs Optimistic Locking & Xử lý Deadlock?
- **Giải thích**:
  - **Pessimistic Locking**: Dùng \`SELECT ... FOR UPDATE\` khóa dòng ngay từ DB. Dùng khi tỉ lệ xung đột ghi cao, nhưng giảm throughput.
  - **Optimistic Locking**: Dùng cột \`@Version\` (số phiên bản). Khi update kiểm tra \`WHERE id = ? AND version = old_version\`. Nếu phiên bản bị sửa bởi thread khác sẽ ném exception. Dùng khi đọc nhiều ghi ít.
  - **Phòng tránh Deadlock**: Luôn lấy lock theo một thứ tự cố định giữa các transaction, giữ transaction ngắn nhất có thể.
- **English Interview Answer**:
> "Pessimistic Locking locks rows at the DB level using SELECT FOR UPDATE, ideal for high contention. Optimistic Locking uses a version column to detect concurrent edits on commit, ideal for read-heavy flows. To prevent deadlocks, we always acquire locks in a consistent order across transactions."

---

### Q6: Các mô hình Caching (Cache-Aside, Write-Through, Write-Behind)?
- **Giải thích**:
  - **Cache-Aside (Lazy Loading)**: Ứng dụng kiểm tra Cache trước; nếu Miss thì đọc DB, lưu kết quả vào Cache rồi trả về. Thích hợp cho ứng dụng đọc nhiều.
  - **Write-Through**: Ứng dụng ghi dữ liệu vào Cache, Cache tự động đồng bộ ghi xuống DB trước khi hoàn tất. Đảm bảo tính nhất quán dữ liệu cao.
  - **Write-Behind (Write-Back)**: Ứng dụng ghi vào Cache và trả về ngay; Cache sẽ gom và ghi bất đồng bộ xuống DB sau. Tốc độ ghi cực nhanh nhưng có rủi ro mất dữ liệu nếu Redis sập trước khi sync.
- **English Interview Answer**:
> "Cache-Aside queries cache first, falling back to DB on a miss. Write-Through updates cache and syncs to DB synchronously. Write-Behind updates cache immediately and syncs to DB asynchronously, giving high write performance at the risk of data loss if cache fails before sync."

---

### Q7: Xử lý sự cố Cache (Cache Stampede, Avalanche, Penetration)?
- **Giải thích**:
  - **Cache Stampede / Thundering Herd**: Key hot bị hết hạn, hàng ngàn request đồng thời chọc thẳng xuống DB gây nghẽn. *Khắc phục*: Dùng Mutex Lock (Redis lock) cho thread đầu tiên load DB, hoặc gia hạn TTL tự động (*Soft TTL*).
  - **Cache Avalanche**: Hàng loạt key hết hạn cùng 1 giây. *Khắc phục*: Thêm giá trị ngẫu nhiên (Jitter/Random offset) vào thời gian TTL.
  - **Cache Penetration**: Request liên tục các key không hề tồn tại cả ở DB lẫn Cache. *Khắc phục*: Dùng *Bloom Filter* hoặc lưu giá trị NULL ngắn hạn vào Cache.
- **English Interview Answer**:
> "To handle Cache Stampede, I use distributed locking so only one request repopulates the cache. For Cache Avalanche, I add random jitter to TTL values to avoid simultaneous expirations. For Cache Penetration, I employ Bloom Filters or cache null results temporarily."

---

### Q8: Khoá phân tán Redis (Distributed Lock with Redlock / Redisson)?
- **Giải thích**: Khi có nhiều pod/instance backend cùng muốn thực thi 1 job (ví dụ: quét đơn hàng trùng), JVM local lock (\`synchronized\`) không có tác dụng. Cần dùng Redis làm Distributed Lock bằng lệnh \`SET key value NX PX 30000\` (hoặc thư viện Redisson trong Java). Thuật toán **Redlock** giúp khóa an toàn ngay cả trên Redis cluster.
- **English Interview Answer**:
> "A Distributed Lock ensures that across multiple application instances, only one instance executes a critical task at a time. We implement this using Redis commands like SET NX PX with unique tokens or framework implementations like Redisson."

---

## 2. 🏗️ Architecture & System Design (Kiến trúc Hệ thống)

### Q9: RabbitMQ Deep Dive (Exchanges, DLQ, Manual ACK)?
- **Giải thích**:
  - **Exchanges**: *Direct* (routing key chính xác), *Topic* (routing key có wildcard như \`order.*\`), *Fanout* (broadcast cho tất cả queue), *Headers* (routing theo header).
  - **Manual ACK**: Consumer phải gửi ACK cho RabbitMQ sau khi xử lý xong task. Nếu ném Exception, gửi NACK/REJECT để nạp lại Queue hoặc chuyển sang DLQ.
  - **Dead Letter Queue (DLQ)**: Queue chứa các tin nhắn bị từ chối, hết hạn TTL, hoặc retry quá số lần cho phép để lập trình viên kiểm tra lỗi sau.
- **English Interview Answer**:
> "RabbitMQ routes messages via Exchanges to Queues based on routing keys. Manual Acknowledgements ensure messages are not deleted until successfully processed. Failed or rejected messages are forwarded to a Dead Letter Queue (DLQ) for auditing and retries."

---

### Q10: Apache Kafka Architecture & So sánh với RabbitMQ?
- **Giải thích**:
  - **Kafka Architecture**: Kafka lưu trữ messages dưới dạng Append-Only Commit Log trên đĩa. Tổ chức thành *Topics*, chia nhỏ thành *Partitions*. Mỗi Partition có chuỗi *Offsets*. *Consumer Groups* cho phép phân tải xử lý song song.
  - **So sánh**: RabbitMQ thích hợp cho Task Queues, routing tin nhắn phức tạp, đẩy tin theo mô hình Push. Kafka thích hợp cho Event Streaming tải cực lớn (hàng triệu msg/sec), log aggregation, hỗ trợ replay lại dữ liệu cũ theo Offset.
- **English Interview Answer**:
> "Kafka is an append-only distributed commit log organized into topics and partitions, consumed via Consumer Groups with offsets. Unlike RabbitMQ which excels at complex routing and per-message queues, Kafka achieves massive throughput and supports event replay."

---

### Q11: Idempotency Pattern (Thiết kế API Bất biến)?
- **Giải thích**: Đảm bảo 1 API call (như thanh toán, tạo đơn) dù gọi 1 lần hay 100 lần (do retry, mạng chập chờn) cũng chỉ sinh ra 1 hiệu ứng duy nhất trên CSDL.
- **Cách cài đặt**: Client gửi kèm một \`Idempotency-Key\` (UUID). Server dùng Redis \`SETNX\` hoặc bảng DB Unique constraint để kiểm tra. Nếu Key đã xử lý, lập tức trả về kết quả đã lưu trước đó mà không chạy lại nghiệp vụ.
- **English Interview Answer**:
> "Idempotency ensures that multiple identical requests produce the same system outcome as a single request. I implement this by attaching a unique Idempotency-Key to requests and verifying it against Redis or DB unique constraints before executing transactions."

---

### Q12: Transactional Outbox Pattern?
- **Giải thích**: Khi cần vừa cập nhật DB vừa bắn tin nhắn ra Queue. Nếu ghi DB thành công nhưng bắn Queue bị lỗi (hoặc sập mạng), dữ liệu bị lệch pha.
- **Giải pháp**: Ghi cả dữ liệu chính lẫn 1 bản tin sự kiện vào bảng \`outbox\` nằm trong CSDL trong cùng 1 Local Transaction. Một background worker (hoặc Debezium CDC) sẽ polling đọc bảng \`outbox\` và push tin ra Queue. Đảm bảo *At-least-once delivery*.
- **English Interview Answer**:
> "The Transactional Outbox Pattern prevents data inconsistency when updating a database and publishing events. By saving outbox event records in the same local DB transaction, a background process or CDC engine reads and pushes events to the message broker reliably."

---

### Q13: Saga Pattern cho Giao dịch Phân tán?
- **Giải thích**: Trong kiến trúc Microservices, mỗi service có CSDL riêng nên không dùng được ACID Local Transaction. Saga chia nhỏ giao dịch thành chuỗi các Local Transactions.
- **2 Mô hình**:
  - **Choreography**: Các service tự lắng nghe event của nhau và nối tiếp xử lý.
  - **Orchestrator**: Một service trung tâm chỉ đạo các bước tiếp theo.
- **Compensating Transaction**: Khi 1 bước ở giữa thất bại, Saga sẽ kích hoạt các giao dịch hoàn trả (bù trừ) ngược lại để rollback dữ liệu của các bước trước đó.
- **English Interview Answer**:
> "The Saga pattern manages distributed transactions across microservices as a sequence of local transactions. If a step fails, the Saga triggers compensating transactions in reverse order to roll back changes made by earlier steps."

---

### Q14: Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window)?
- **Giải thích**:
  - **Token Bucket**: Cung cấp số lượng token cố định vào giỏ theo thời gian. Request tới phải lấy 1 token, hết token sẽ bị từ chối. Hỗ trợ xử lý tải đột biến (Bursting).
  - **Leaky Bucket**: Request đổ vào xô và được rò rỉ xử lý với tốc độ đều đặn. Giúp là phẳng tải (Smooth traffic).
  - **Sliding Window Counter**: Đếm số request trong cửa sổ thời gian trượt (vd: 100 req/phút).
- **English Interview Answer**:
> "Rate limiting algorithms control request velocity: Token Bucket allows burst traffic up to a bucket capacity, Leaky Bucket flattens traffic at a constant processing rate, and Sliding Window Counter tracks request frequency across dynamic time windows."

---

### 15: Circuit Breaker Pattern & Exponential Backoff with Jitter?
- **Giải thích**:
  - **Circuit Breaker (Resilience4j)**: Ngăn việc tiếp tục gọi một service/PLC bị sập để tránh làm nghẽn toàn bộ thread pool. Gồm 3 trạng thái: *CLOSED* (bình thường), *OPEN* (ngắt cầu chì, fail-fast lập tức), *HALF-OPEN* (cho thử vài request xem target service hồi phục chưa).
  - **Exponential Backoff with Jitter**: Chiến lược retry với thời gian chờ tăng theo cấp số nhân (1s, 2s, 4s, 8s...) cộng thêm một giá trị thời gian ngẫu nhiên (*Jitter*) để tránh tất cả client cùng retry vào 1 thời điểm.
- **English Interview Answer**:
> "Circuit Breaker trips to OPEN state when a downstream service fails, rejecting calls fast to protect system resources. Exponential Backoff with Jitter increases retry delays exponentially while adding random noise to prevent retry storms."

---

## 3. ☁️ Cloud & DevOps (Hạ tầng & Triển khai)

### Q16: AWS/GCP Compute (EC2, ECS/Cloud Run, Lambda)?
- **Giải thích**:
  - **EC2 (VM)**: Cấp phát máy chủ ảo nguyên bản. Tự quản lý OS, runtime và scaling.
  - **ECS / Cloud Run (Containerized)**: Chạy ứng dụng đã đóng gói thành Docker Container. Tự động scale theo lượng traffic.
  - **AWS Lambda (Serverless)**: Chạy các hàm sự kiện ngắn hạn mà không cần quản lý máy chủ. Chỉ tính tiền theo millisecond thực thi.
- **English Interview Answer**:
> "EC2 provides full virtual machine control. ECS and Cloud Run manage Docker container deployments with auto-scaling. AWS Lambda offers serverless execution triggered by events, billing strictly per execution duration."

---

### Q17: S3, Managed DBs (RDS PostgreSQL) & Read Replicas?
- **Giải thích**:
  - **AWS S3**: Storage chứa file tĩnh (ảnh, tài liệu, logs) vô hạn với độ bền 99.999999999%.
  - **RDS PostgreSQL**: CSDL quan hệ được quản lý sẵn (tự động Backup, Patching).
  - **Read Replicas**: Tạo ra các bản sao CSDL chỉ đọc. Đã tách biệt traffic: Master node xử lý ghi (\`INSERT/UPDATE/DELETE\`), các Read Replicas xử lý đọc (\`SELECT\`) để giảm tải.
- **English Interview Answer**:
> "S3 provides scalable object storage for static files. Managed RDS PostgreSQL automates backups and high availability, while Read Replicas separate read traffic from write operations on the primary node to boost throughput."

---

### Q18: Cloud Security: IAM Roles, VPC Subnets & API Gateway?
- **Giải thích**:
  - **IAM (Identity and Access Management)**: Quản lý quyền hạn theo nguyên tắc Least Privilege (Quyền tối thiểu). Dùng Roles thay vì hardcode Access Keys.
  - **VPC (Virtual Private Cloud)**:
    - **Public Subnet**: Đặt Load Balancer / API Gateway tiếp xúc với Internet.
    - **Private Subnet**: Đặt Backend App và Database cách ly hoàn toàn khỏi Internet.
  - **API Gateway**: Điểm vào duy nhất kiểm soát Authentication, Rate Limiting, SSL Termination.
- **English Interview Answer**:
> "IAM enforces least privilege security via policies and roles. A VPC segregates public-facing resources like Load Balancers in Public Subnets from sensitive Backend services and Databases in isolated Private Subnets."

---

### Q19: CI/CD Pipelines với GitHub Actions / GitLab CI?
- **Giải thích**:
  - **Continuous Integration (CI)**: Tự động chạy linter, unit test và build khi có Pull Request để đảm bảo code mới không hỏng hệ thống.
  - **Continuous Deployment (CD)**: Tự động build Docker Image, push lên Docker Registry (ECR/DockerHub) và trigger deploy lên server Staging/Production.
- **English Interview Answer**:
> "CI/CD pipelines automate testing, building, and deployment. On every pull request, CI runs code linters and unit tests. Upon merge, CD builds the Docker image, pushes it to the registry, and deploys it to the target cluster."

---

### Q20: Kubernetes Basics (Pods, Deployments, Services, Ingress)?
- **Giải thích**:
  - **Pod**: Đơn vị nhỏ nhất trong K8s, chứa 1 hoặc nhiều Docker container.
  - **Deployment**: Quản lý số lượng Pods (Replicas), hỗ trợ Rolling Updates không gây downtime.
  - **Service**: Tạo IP cố định và Load Balancer nội bộ cho tập hợp các Pods.
  - **Ingress**: Định tuyến HTTP/HTTPS traffic từ bên ngoài vào các Services bên trong cluster.
- **English Interview Answer**:
> "In Kubernetes, a Pod is the smallest execution unit running containers. Deployments manage pod replicas and rolling updates. Services provide internal load balancing across pods, while Ingress routes external HTTP traffic into cluster services."

---

## 4. 🧪 Testing & Observability (Chất lượng & Vận hành)

### Q21: Integration Testing với Testcontainers?
- **Giải thích**: Thay vì dùng H2 in-memory DB (khác biệt với DB thật) hoặc mock DB, **Testcontainers** tự động khởi chạy 1 container Docker chứa PostgreSQL / Redis / RabbitMQ thật khi chạy lệnh test và tự tiêu hủy khi test xong. Đảm bảo test chính xác tuyệt đối hành vi Production.
- **English Interview Answer**:
> "Testcontainers automatically spins up real Docker containers for PostgreSQL, Redis, or RabbitMQ during integration test execution. This avoids mock discrepancies and ensures our tests execute against real production-like dependencies."

---

### Q22: Structured Logging & Distributed Tracing (Correlation ID)?
- **Giải thích**:
  - **Structured Logging**: Log ở dạng định dạng JSON (\`{ "timestamp": "...", "level": "INFO", "traceId": "...", "message": "..." }\`) để các hệ thống như ELK / OpenSearch dễ dàng parse và index.
  - **Correlation ID / Trace ID**: Đặt một mã ID duy nhất ở HTTP Header (\`X-Correlation-ID\`). Truyền mã này qua mọi service trong luồng xử lý để dễ dàng grep toàn bộ hành trình request khi xảy ra lỗi.
- **English Interview Answer**:
> "Structured JSON logging allows log aggregators to parse log attributes efficiently. Passing a Correlation ID or Trace ID across HTTP headers enables end-to-end request tracing across microservices during debugging."

---

### Q23: Metrics & Dashboards (Prometheus & Grafana)?
- **Giải thích**:
  - **Prometheus**: Thu thập số liệu (Metrics) từ ứng dụng theo cơ chế Pull (bằng cách cào dữ liệu từ endpoint \`/actuator/prometheus\` trong Spring Boot).
  - **Grafana**: Dựng các bảng biểu đồ trực quan hóa realtime dựa trên số liệu của Prometheus.
  - **4 Golden Signals**: *Latency* (Độ trễ), *Traffic* (Lượng truy cập), *Errors* (Tỉ lệ lỗi), *Saturation* (Mức độ quá tải CPU/RAM/JVM Heap).
- **English Interview Answer**:
> "Prometheus scrapes application metrics like request latency and JVM heap usage via HTTP endpoints. Grafana visualizes these metrics on real-time dashboards to monitor the 4 Golden Signals: Latency, Traffic, Errors, and Saturation."

---

### Q24: Distributed Tracing với OpenTelemetry / Jaeger?
- **Giải thích**:
  - **Trace**: Đại diện cho toàn bộ con đường đi của 1 request qua các microservices từ đầu đến cuối.
  - **Span**: Đại diện cho từng chặng xử lý nhỏ bên trong (ví dụ: 1 query SQL, 1 REST call, 1 Redis lookup).
  - **OpenTelemetry / Jaeger**: Giúp đo chính xác thời gian tốn ở từng chặng (Span latency breakdown) để phát hiện microservice nào đang kéo chậm hệ thống.
- **English Interview Answer**:
> "Distributed Tracing using OpenTelemetry and Jaeger tracks end-to-end request flows across services. A Trace contains multiple Spans representing discrete operations, allowing us to pinpoint latency bottlenecks across microservices."

---

## 5. 💡 Milestone Checklist & Kế hoạch Thực hành

| Giai đoạn | Mục tiêu trọng tâm | Output sản phẩm thực hành |
| :--- | :--- | :--- |
| **Giai đoạn 1 (Ngắn hạn)** | Tối ưu Postgres sâu + Testcontainers + Outbox Pattern | Nâng cấp project \`Car Management\` hoặc \`BookSwapHub\` có Integration Tests tự động và xử lý Idempotent Payments. |
| **Giai đoạn 2 (Trung hạn)** | Caching patterns + RabbitMQ DLQ/Retry + Prometheus/Grafana | Dựng một hệ thống xử lý Order/Booking giả lập chịu tải có Dashboard đo latency & error rate. |
| **Giai đoạn 3 (Dài hạn)** | AWS/GCP Core + GitHub Actions CI/CD + Kafka basics | Deploy ứng dụng lên Cloud hoàn chỉnh qua CI/CD tự động. |
`
}
