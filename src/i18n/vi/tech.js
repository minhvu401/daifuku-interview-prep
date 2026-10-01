// Vietnamese content — TechPage (expanded technical Q&A)
export default {
  badge: 'Kỹ thuật',
  title: 'Chuẩn bị phỏng vấn kỹ thuật (Bản Mở Rộng Toàn Diện)',
  subtitle: 'WCS domain · Java Core & Advanced · Spring Boot & Security · Database & Tuning · System Design & Messaging · CV Boundaries',
  sections: {
    overview: {
      label: '📋 Tổng quan & Lịch ôn',
      content: `# Bối cảnh: vòng tới bạn gặp ai, và họ tìm gì

Vòng 1 thực tế **chỉ có HR** — người Department chưa nói chuyện với bạn. Nghĩa là **phần sàng lọc kỹ thuật vẫn còn nguyên ở phía trước**, và nó có thể diễn ra cùng buổi với sếp tổng Nhật.

Chuẩn bị cho cả ba kiểu người có thể ngồi trong phòng:

| Người hỏi | Họ tìm gì | Tính chất |
|---|---|---|
| **Department (tech lead phía VN)** | Bạn có code được thật không. Java Core, Spring Boot, JPA, SQL, Indexing, Concurrency. Có thể hỏi code trực tiếp. | **Cửa pass/fail.** Trượt ở đây là hết. |
| **IT Dept bên Nhật** | Tư duy hệ thống WCS, xử lý sự cố, TCP/Socket, Idempotency, High Availability, Log Tracing, Hardware Resilience. | Chỗ bạn **tạo khác biệt**. |
| **Sếp tổng Nhật** | Thái độ, trung thực, cam kết dài hạn, chịu onsite. Ít đi sâu code. | Trả lời chậm, rõ, khiêm tốn. |

---

# Lịch ôn chi tiết

| Thời gian | Nội dung ôn tập chính |
|---|---|
| **Ngày 1: SQL & Database** | SQL Joins, B-Tree Index (Leftmost Prefix Rule), Lock Types (Optimistic/Pessimistic), Isolation Levels, HikariCP, EXPLAIN ANALYZE & Câu hỏi Oracle. |
| **Ngày 2: Java Core & Concurrency** | OOP/SOLID, JVM Memory (Heap/Stack/Metaspace), GC, HashMap internals, Memory Leaks, CompletableFuture, ThreadPoolExecutor, Java 8-21 features. |
| **Ngày 3: Spring Boot & Security** | DI/IoC, Bean Lifecycle, Bean Scopes, AOP Dynamic Proxies, @Transactional Propagation, Hibernate Entity States & N+1 Fix, Spring Security (JWT/RBAC). |
| **Ngày 4: WCS, Socket & Distributed Systems** | WCS vs Web, TCP Socket Framing, Heartbeat/ACK-NAK, Idempotency, Outbox Pattern, Circuit Breaker, RabbitMQ/Kafka, Saga Pattern & Distributed Tracing. |
| **Tối trước phỏng vấn** | Chỉ đọc "WCS khác web" và "Ranh giới CV". Ngủ sớm. Đừng nhồi gì mới. |

---

# Câu bạn hỏi lại họ (vòng kỹ thuật)

- WCS ở đây kết nối với gì — tích hợp với WMS của khách hàng hay trực tiếp với ERP của họ?
- Giao tiếp với thiết bị dùng giao thức chuẩn (TCP/IP socket, Modbus...) hay đặc thù theo từng dự án?
- Phần mềm được phát triển tại Việt Nam hay là hệ thống nền từ Nhật rồi tùy chỉnh theo từng khách?
- Có simulator để test không, hay việc test xảy ra tại công trường khách hàng?
- Với người mới, con đường học việc thường như thế nào — bắt đầu bằng maintenance hệ thống cũ không?
`
    },
    wcs: {
      label: '🏭 WCS Domain & Real-time Messaging',
      content: `# WCS Domain, TCP Socket & Real-Time Messaging

## 1. Sơ đồ kiến trúc tổng quan WCS
\`\`\`
Customer's ERP / Host system   ← Đơn hàng, tồn kho, nghiệp vụ
            ↓
          WMS                  ← Quản lý kho: Cái gì, ở đâu, bao nhiêu
            ↓
          WCS   ← BẠN LÀM Ở ĐÂY: Dịch lệnh nghiệp vụ thành lệnh thiết bị,
            ↓        điều phối realtime, tránh xung đột, sắp thứ tự
          PLC                  ← Điều khiển motor, đọc sensor
            ↓
    Thiết bị vật lý            ← AS/RS crane, băng tải, sorter, AGV
\`\`\`

---

## 2. ⭐ 5 Điều làm phần mềm WCS khác phần mềm web

### a) Retry không an toàn như web (Non-idempotent physical actions).
> Trong ứng dụng web, nếu request timeout thì retry lại. Ở WCS, một lệnh di chuyển pallet vật lý. Nếu retry mù quáng, crane có thể di chuyển hai lần gây đâm va. Vì vậy trước khi retry, cần query trạng thái thực của thiết bị, và các lệnh phải có UUID/Message Key duy nhất.

### b) Thứ tự lệnh là sinh mệnh (Strict Command Ordering).
> Các chuyển động vật lý có thứ tự (Vào băng tải → Qua sensor → Lên cẩu AS/RS). Nếu tin nhắn 2 đến trước tin nhắn 1, kết quả trên sàn kho sẽ sai hỏng. Sequence number và queue theo thứ tự (FIFO) quan trọng hơn throughput.

### c) Không có "downtime window" (24/7 High Availability).
> Kho vận hoạt động liên tục. Deploy hay restart không miễn phí — hệ thống phải khôi phục được state (Crash Recovery) và biết thiết bị đang đứng ở đâu trước khi dừng.

### d) Lỗi là vật lý, không chỉ là dữ liệu (Physical Consequences).
> Nếu phần mềm web lỗi, user bấm F5. Nếu WCS lỗi, pallet rơi, hàng nghìn đơn bị nghẽn, hoặc thiết bị va chạm hỏng hóc. Do đó testing với Simulator và spec rõ ràng quan trọng hàng đầu.

### e) Log là công cụ điều tra duy nhất (Traceability & Auditing).
> Khi sự cố xảy ra lúc 3h sáng tại kho khách hàng, không ai tái hiện lại được. Log mọi byte lệnh, timestamp millisecond và response là bắt buộc để tra cứu root cause.

---

## 3. TCP Socket Communication & Framing (Giao tiếp Socket)
> **Hỏi**: Khác biệt giữa TCP Socket và HTTP/REST API là gì? Làm sao xử lý dính gói/xé gói (Packet Fragmentation)?
> **Trả lời**: HTTP là giao thức Request-Response stateless trên lớp ứng dụng. TCP Socket là kết nối stateful hai chiều trực tiếp tầng Giao vận.
> Do TCP là luồng byte (byte stream), không có ranh giới tin nhắn, nên cần cơ chế **Framing**:
> 1. **Fixed-length framing**: Mọi tin nhắn luôn có độ dài cố định (vd: 64 bytes).
> 2. **Delimiter-based framing**: Dùng ký tự phân cách (vd: \\r\\n hoặc ETX byte).
> 3. **Length-field framing**: Đặt 4 bytes đầu ghi độ dài của payload theo sau.

---

## 4. WebSockets vs STOMP vs RabbitMQ vs Kafka
> **Hỏi**: Phân biệt WebSockets/STOMP (bạn làm ở Syrix Chat) với RabbitMQ/Kafka?
> - **WebSocket/STOMP**: Giao thức truyền tin hai chiều độ trễ thấp giữa Client (Browser/App) và Server qua HTTP Upgrade. Thích hợp cho ứng dụng Chat/UI Realtime.
> - **RabbitMQ**: Message Broker theo chuẩn AMQP. Hỗ trợ routing phức tạp (Direct, Topic, Fanout exchanges), đảm bảo delivery tin nhắn tin cậy. Phù hợp cho task queue, xử lý đơn hàng.
> - **Kafka**: Distributed Streaming Platform dạng commit-log. Lưu giữ tin nhắn trên đĩa theo partition, hỗ trợ throughput cực cao (hàng triệu msg/sec) và replay data. Thích hợp cho Event Sourcing và Log Streaming.

---

## 5. Cầu nối kinh nghiệm thực tế
> "I have not coded PLC protocols directly, but I built real-time messaging services using WebSockets/STOMP and RabbitMQ at XPERC. The underlying principles — maintaining persistent connections, handling reconnects, heartbeats, message ordering, and preventing duplicate processing — are identical."
`
    },
    java: {
      label: '☕ Java Core & Advanced Concurrency',
      content: `# Java Core, Collections & Advanced Concurrency

### 1. 4 Trụ cột OOP & Các nguyên lý SOLID
> - **4 Trụ cột OOP**: Encapsulation (Đóng gói), Abstraction (Trừu tượng), Inheritance (Kế thừa), Polymorphism (Đa hình).
> - **S.O.L.I.D**:
>   - **S**ingle Responsibility: 1 class chỉ nên có 1 lý do để thay đổi.
>   - **O**pen/Closed: Mở rộng bằng kế thừa/interface, đóng đối với sửa đổi code cũ.
>   - **L**iskov Substitution: Class con phải thay thế được class cha mà không làm hỏng ứng dụng.
>   - **I**nterface Segregation: Chia nhỏ interface thay vì một interface quá to.
>   - **D**ependency Inversion: Phụ thuộc vào Abstraction (Interface), không phụ thuộc vào Concretion.

---

### 2. Interface vs Abstract Class
> An interface defines a contract (what a class can do), supporting multiple inheritance. An abstract class defines identity (what a class is) and shared state/code, supporting single inheritance. In practice, I use interfaces to define contracts across unrelated classes, and abstract classes to share code among closely related classes.

---

### 3. HashMap Internals & equals() / hashCode() Contract
> HashMap lưu entry (key, value) trong mảng các bucket. Chỉ số bucket = hash(key) % capacity. Nếu xảy ra collision (trùng bucket), nó lưu dưới dạng LinkedList, và chuyển thành Red-Black Tree khi kích thước bucket > 8 (từ Java 8).
> **Contract**: Nếu 2 object bằng nhau theo equals(), chúng BẮT BUỘC phải có hashCode() giống nhau. Nếu không, HashMap sẽ tính sai bucket và không tìm thấy data.

---

### 4. ConcurrentHashMap vs Collections.synchronizedMap vs HashMap
> - **HashMap**: Không thread-safe.
> - **SynchronizedMap**: Thread-safe bằng cách khóa (lock) toàn bộ Map cho mỗi thao tác, gây ra thắt nút cổ chai nặng.
> - **ConcurrentHashMap**: Dùng bucket-level locking (Segment locking / CAS operations), cho phép nhiều thread đọc/ghi đồng thời trên các bucket khác nhau mà không lock toàn bộ Map.

---

### 5. JVM Memory Architecture & Garbage Collection (GC)
> - **Stack Memory**: Lưu trữ local variables và method call frames cho từng Thread. Tự dọn khi kết thúc method.
> - **Heap Memory**: Lưu trữ tất cả Object. Gồm Young Generation (Eden, Survivor spaces) và Old (Tenured) Generation.
> - **Metaspace**: Lưu trữ Class metadata, bytecode và static variables.
> **Garbage Collectors**: G1GC (Garbage-First), ZGC (Ultra-low latency), Parallel GC. GC tự động thu dọn các object không còn reachable từ GC Roots.

---

### 6. Memory Leaks trong Java dù có GC
> Xảy ra khi một object không còn sử dụng nhưng vẫn bị tham chiếu bởi một object sống lâu (như static collection, unclosed streams/DB connections, event listeners quên unregister, ThreadLocal quên remove).

---

### 7. ThreadPoolExecutor Parameters (Quản lý Thread Pool)
> Khi tạo Custom ThreadPoolExecutor, có 5 tham số quan trọng:
> 1. **corePoolSize**: Số lượng thread tối thiểu luôn giữ sống.
> 2. **maximumPoolSize**: Số thread tối đa được phép tạo khi queue đầy.
> 3. **keepAliveTime**: Thời gian sống của thread dư thừa khi rảnh rỗi.
> 4. **workQueue**: Queue chứa task chờ (ArrayBlockingQueue, LinkedBlockingQueue).
> 5. **handler**: RejectedExecutionHandler xử lý khi queue & pool đều đầy (AbortPolicy, CallerRunsPolicy, DiscardPolicy).

---

### 8. CompletableFuture & Non-blocking Asynchronous Programming
> CompletableFuture giúp viết code bất đồng bộ chaining callbacks (thenApply, thenCompose, handle, allOf) mà không làm chặn (block) Main thread như Future.get().

---

### 9. Volatile Keyword vs AtomicInteger (CAS) vs Synchronized
> - **volatile**: Đảm bảo tính nhìn thấy (Visibility) giữa các thread (đọc/ghi trực tiếp từ Main Memory, bỏ qua CPU Cache), nhưng KHÔNG đảm bảo tính nguyên tử (Atomicity).
> - **AtomicInteger**: Đảm bảo tính nguyên tử bằng phần cứng CAS (Compare-And-Swap) không cần lock (Lock-free).
> - **synchronized**: Đảm bảo cả Visibility và Atomicity bằng cách khóa (Mutex lock).

---

### 10. Java 8 đến 21 Features quan trọng
> - **Java 8**: Lambda expressions, Streams API, Optional, Functional Interfaces, Default methods.
> - **Java 11**: HttpClient API mới, String methods mới.
> - **Java 17 (LTS)**: Sealed Classes, Records (DTOs ngắn gọn), Pattern Matching for instanceof.
> - **Java 21 (LTS)**: Virtual Threads (Project Loom - Thread siêu nhẹ), Pattern Matching for switch.
`
    },
    spring: {
      label: '🌱 Spring Boot, Security & JPA',
      content: `# Spring Boot, Spring Security & Spring Data JPA

### 1. Dependency Injection (DI) & Inversion of Control (IoC)
> IoC là nguyên lý chuyển giao quyền quản lý vòng đời và tạo đối tượng cho Spring Container. DI là cách thực thi: Spring tự tiêm các Bean vào class qua Constructor, Setter hoặc @Autowired. Giúp code loosely coupled và dễ viết Unit Test với Mock.

---

### 2. Spring Bean Lifecycle
> 1. Instantiation (Tạo instance)
> 2. Populate Properties (Tiêm phụ thuộc)
> 3. BeanNameAware / BeanFactoryAware
> 4. Pre-initialization (BeanPostProcessor.postProcessBeforeInitialization)
> 5. Custom Init (@PostConstruct / InitializingBean)
> 6. Post-initialization (BeanPostProcessor.postProcessAfterInitialization) -> Bean sẵn sàng dùng.
> 7. Destruction (@PreDestroy / DisposableBean) khi IoC container đóng.

---

### 3. Spring Bean Scopes
> - **Singleton** (Default): 1 instance duy nhất trong toàn bộ Spring Container.
> - **Prototype**: Tạo mới instance mỗi lần được request.
> - **Request / Session**: Tạo mới cho từng HTTP Request / Session.

---

### 4. Spring AOP (Aspect Oriented Programming) & Dynamic Proxies
> AOP tách biệt các quan tâm chéo (Logging, Security, Transaction) ra khỏi business logic. Spring AOP sử dụng **Dynamic Proxies** (JDK Dynamic Proxy cho interface, CGLIB cho class). Khi gọi method chứa @Transactional, call sẽ đi qua Proxy để mở/commit/rollback transaction trước khi vào code thật.

---

### 5. @Transactional Propagation & Isolation
> - **Propagation**:
>   - **REQUIRED** (Default): Dùng transaction hiện tại, hoặc tạo mới nếu chưa có.
>   - **REQUIRES_NEW**: Tạm dừng transaction hiện tại và luôn mở 1 transaction hoàn toàn mới.
>   - **SUPPORTS**: Dùng transaction nếu có, không có thì chạy non-transactional.
> - **Isolation**: READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE.

---

### 6. Hibernate Entity States & Cascade Types
> - **Entity States**:
>   1. **Transient**: Object mới tạo bằng \`new\`, chưa liên kết với JPA Session/DB.
>   2. **Persistent**: Object đã được quản lý bởi Session (có ID trong DB). Mọi thay đổi trên object sẽ tự động Sync xuống DB khi Commit (Dirty Checking).
>   3. **Detached**: Object đã từng Persistent nhưng Session bị đóng.
>   4. **Removed**: Object đã được đánh dấu để xóa khỏi DB.
> - **Cascade Types**: PERSIST, MERGE, REMOVE, REFRESH, DETACH, ALL. \`orphanRemoval=true\` tự động xóa child entity khỏi DB khi gỡ khỏi collection của parent.

---

### 7. N+1 Query Problem & Triệt để giải quyết
> Xảy ra khi ORM load N parent entities, sau đó với mỗi parent lại phát sinh 1 query để load child relation (tổng CSDL nhận N+1 queries).
> **Giải pháp**: Dùng JOIN FETCH trong JPQL, @EntityGraph, hoặc DTO Projections. Ở XPERC tôi đã tối ưu lại query & loại bỏ join thừa để giảm ~40% số query và ~30% thời gian phản hồi.

---

### 8. Spring Security & JWT Architecture
> Request đi qua chuỗi **SecurityFilterChain**. Dùng \`OncePerRequestFilter\` để trích xuất JWT Token từ Header \`Authorization: Bearer <token>\`. Giải mã token, lấy Username & Permissions/Roles, tạo đối tượng \`UsernamePasswordAuthenticationToken\` và lưu vào \`SecurityContextHolder.getContext().setAuthentication(...)\`.

---

### 9. Unit Testing trong Spring Boot với Mockito
> - **@SpringBootTest**: Boot toàn bộ Spring Context (chậm, thích hợp cho Integration test).
> - **@WebMvcTest**: Chỉ load Controller layer và Security configuration (nhanh).
> - **@DataJpaTest**: Chỉ load JPA Repositories và DB config.
> - **Mockito**: Dùng \`@Mock\` / \`@MockBean\` để giả lập service, dùng \`when(...).thenReturn(...)\` và \`verify(...)\` để kiểm tra số lần method được gọi.
`
    },
    sql: {
      label: '🗄️ Database, SQL & Performance Tuning',
      content: `# Database, SQL & Performance Tuning

## 1. Xử lý câu hỏi Oracle / SQL Server
> Tôi dùng PostgreSQL chuyên nghiệp tại công ty và MySQL ở đại học. Bản chất SQL chuẩn, Indexing, Transaction Isolation, Query Execution Plan là dùng chung. Nếu dùng Oracle/SQL Server, tôi chỉ cần làm quen thêm về syntax cụ thể (như PL/SQL, T-SQL, ROWNUM/Paging, Sequences) trong thời gian ngắn.

---

## 2. B-Tree Index Mechanics & Leftmost Prefix Rule
> B-Tree Index tạo cấu trúc cây cân bằng giúp tìm kiếm dữ liệu O(log N) thay vì Full Table Scan O(N).
> **Composite Index (Index trên nhiều cột)**:
> Ví dụ Index trên \`(status, created_at, user_id)\`.
> **Leftmost Prefix Rule**: Index chỉ được sử dụng khi điều kiện WHERE chứa cột đầu tiên bên trái (\`status\`). Query chứa \`(status)\` hoặc \`(status, created_at)\` sẽ dùng Index. Query CHỈ chứa \`(created_at, user_id)\` sẽ KHÔNG thể dùng Index này.

---

## 3. Khi nào Index KHÔNG giúp ích?
> 1. Dùng hàm trên cột indexed (ví dụ: WHERE UPPER(name) = 'ABC' hoặc WHERE YEAR(created_at) = 2024).
> 2. Dùng wildcard ở đầu (WHERE name LIKE '%abc').
> 3. Cột có Low Cardinality (độ đa dạng kém như cột gender, status chỉ có 2-3 giá trị).
> 4. Bảng quá nhỏ (Full table scan nhanh hơn đọc Index).

---

## 4. Database Locks: Pessimistic vs Optimistic Locking
> - **Pessimistic Locking (Khóa quan quan)**: Dùng \`SELECT ... FOR UPDATE\` để khóa dòng dữ liệu ngay từ DB, ngăn thread khác đọc/ghi tới khi transaction kết thúc. Phù hợp xung đột cao nhưng giảm throughput.
> - **Optimistic Locking (Khóa lạc quan)**: Dùng cột @Version (số phiên bản). Khi update sẽ kiểm tra WHERE id = ? AND version = old_version. Nếu bị sửa bởi thread khác sẽ quăng Exception (OptimisticLockException). Phù hợp ứng dụng đọc nhiều ghi ít.

---

## 5. Isolation Levels & Concurrency Anomalies
> - **Dirty Read**: Đọc dữ liệu chưa commit của transaction khác.
> - **Non-Repeatable Read**: Đọc 1 dòng 2 lần trong 1 transaction ra 2 giá trị khác do transaction khác đã UPDATE/DELETE và Commit.
> - **Phantom Read**: Đọc danh sách 2 lần thấy xuất hiện thêm các dòng mới do transaction khác INSERT và Commit.
> **Mức Isolation**: Read Uncommitted -> Read Committed (chống Dirty Read) -> Repeatable Read (chống Non-repeatable Read) -> Serializable (chống mọi hiện tượng).

---

## 6. HikariCP Connection Pool Tuning
> - **maximumPoolSize**: Số lượng connection tối đa tới DB (thường chọn từ 10-20 connections dựa trên công thức \`connections = ((core_count * 2) + effective_spindle_count)\`).
> - **minimumIdle**: Số connection rảnh rỗi tối thiểu.
> - **connectionTimeout**: Thời gian tối đa ứng dụng chờ lấy connection từ pool trước khi ném SQLException (mặc định 30s).
> - **idleTimeout**: Thời gian rảnh rỗi trước khi connection thừa bị giải phóng.

---

## 7. Các bước Tuning câu SQL chậm (EXPLAIN ANALYZE)
> 1. Chạy EXPLAIN ANALYZE để xem Query Execution Plan (Seq Scan vs Index Scan, Nested Loop vs Hash Join).
> 2. Kiểm tra Index bị thiếu hoặc bị vô hiệu hóa do hàm/wildcard.
> 3. Loại bỏ SELECT *, chỉ lấy các cột thực sự cần.
> 4. Tối ưu phân trang: Dùng Keyset Pagination (WHERE id > last_id LIMIT 20) thay vì OFFSET lớn (OFFSET 1000000).
`
    },
    scenarios: {
      label: '🧩 System Design, Distributed Systems & CV Boundaries',
      content: `# System Design, Distributed Systems & CV Boundaries

### 1. Idempotency Pattern & Chống xử lý trùng lặp
> **Tình huống**: Message queue gửi 1 lệnh di chuyển 2 lần hoặc client bị timeout nên gửi lại.
> **Giải pháp**: Mỗi lệnh có một GUID / Idempotency-Key duy nhất. Trước khi xử lý, kiểm tra Key trong Redis hoặc Database (dùng Unique Constraint / Redis SETNX). Nếu Key đã tồn tại, bỏ qua lệnh trùng hoặc trả về kết quả đã lưu.

---

### 2. Outbox Pattern cho Hệ thống Phân tán / WCS
> **Tình huống**: Bạn cần vừa lưu đơn hàng vào DB vừa publish message ra Queue/Socket. Nếu lưu DB xong mà gửi Queue thất bại, dữ liệu sẽ bất đồng bộ.
> **Giải pháp**: Transaction ghi cả đơn hàng và một message vào bảng outbox trong CSDL trong cùng 1 Local Transaction. Một background worker (hoặc Debezium CDC) sẽ đọc bảng outbox và push ra Queue/Socket, đảm bảo At-least-once delivery.

---

### 3. Circuit Breaker Pattern khi kết nối bên ngoài sập
> **Tình huống**: PLC hoặc service bên ngoài bị sập/chậm, nếu tiếp tục gửi request sẽ làm nghẽn toàn bộ thread pool của WCS.
> **Giải pháp**: Dùng Circuit Breaker (Resilience4j). Có 3 trạng thái:
> - **CLOSED**: Bình thường.
> - **OPEN**: Khi tỉ lệ lỗi vượt ngưỡng, ngắt cầu chì ngay, trả về fallback lỗi mà không gọi service đích nữa.
> - **HALF-OPEN**: Cho phép một vài request chạy thử để xem service đã hồi phục chưa.

---

### 4. Distributed Transactions: 2PC vs Saga Pattern
> Trong Microservices không thể dùng Local Transaction cho nhiều DB.
> - **2PC (Two-Phase Commit)**: Dùng Coordinator kiểm soát Prepare & Commit phase. Đảm bảo Strong Consistency nhưng giảm performance và dễ deadlock.
> - **Saga Pattern**: Chia nhỏ thành chuỗi các Local Transactions. Nếu 1 step thất bại, gửi các **Compensating Transactions** (Giao dịch bù trừ) để rollback ngược lại từng bước trước đó. Thích hợp cho Event-driven architecture.

---

### 5. Distributed Log Tracing (Trace ID & Span ID)
> Khi một request đi qua nhiều microservices/WCS modules, dùng Distributed Tracing (Micrometer Tracing / Zipkin / OpenTelemetry).
> - **Trace ID**: Mã định danh duy nhất cho toàn bộ luồng request từ đầu đến cuối.
> - **Span ID**: Mã định danh cho từng công đoạn/service xử lý nhỏ.
> Đặt Trace ID vào Log MDC (Mapped Diagnostic Context) để dễ dàng grep và tracking sự cố trên Kibana/Grafana.

---

# 🛡️ Bảng Ranh giới CV — Nhớ kĩ trước khi vào phòng

| Họ hỏi | Sự thật cần giữ (Không được vượt qua) |
|---|---|
| "You analysed requirements with customers?" | **Không.** Nhận FRD do BA viết và code theo FRD. |
| "Did you design the database schema?" | XPERC: không, làm theo doc. **Đồ án Car Management**: Tự thiết kế DB schema từ đầu. |
| "Tell me about performance improvement." | Sửa **code** (giảm query, bỏ join thừa). ~40% query, ~30% response. **Không phải** Redis cache. |
| "You mentioned Redis." | Redis dùng để **chia sẻ state giữa 2 pod** khi scale out (Deployment). |
| "Have you written design documents?" | Chưa tự viết. Đã làm theo FRD 1 năm nên biết cấu trúc tài liệu chuẩn và muốn học phần này. |
| "Do you know WCS?" | Chưa từng làm trực tiếp. Nhưng hiểu bản chất điều khiển realtime, giao tiếp thiết bị, idempotency & retry. |
`
    },
  }
}
