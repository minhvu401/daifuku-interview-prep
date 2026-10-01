# Technical prep — Daifuku vòng 2 (Sếp tổng Nhật + có thể IT Dept bên Nhật)

## Bối cảnh: vòng tới bạn gặp ai, và họ tìm gì

Vòng 1 thực tế **chỉ có HR** — người Department chưa nói chuyện với bạn. Nghĩa là **phần sàng lọc kỹ thuật vẫn còn nguyên ở phía trước**, và nó có thể diễn ra cùng buổi với sếp tổng Nhật.

Chuẩn bị cho cả ba kiểu người có thể ngồi trong phòng:

| Người hỏi | Họ tìm gì | Tính chất |
|---|---|---|
| **Department (tech lead phía VN)** | Bạn có code được thật không. Java, Spring, SQL cụ thể. Có thể hỏi thẳng "viết thử query này". | **Cửa pass/fail.** Trượt ở đây là hết, dù domain có giỏi. |
| **IT Dept bên Nhật** | Tư duy hệ thống, hiểu ràng buộc của phần mềm điều khiển thiết bị. | Chỗ bạn **tạo khác biệt**. |
| **Sếp tổng Nhật** | Thái độ, trung thực, cam kết dài hạn, chịu được onsite. Ít đi sâu code. | Trả lời chậm, rõ, khiêm tốn. |

### Thứ tự ôn — đã cập nhật

Trước đây tôi xếp WCS lên đầu vì tưởng bạn đã qua phần kỹ thuật với Department. Giờ thì khác:

1. **Mục 2 (Java core) + Mục 3 (Spring) + Mục 4 (SQL)** — đây là **cửa pass/fail** với Department. Không có đường vòng.
2. **Mục 1 (WCS) + Mục 5 (tình huống)** — đây là thứ khiến bạn được nhớ tới thay vì chỉ "đạt yêu cầu".
3. **Mục 6 (ranh giới CV)** — đọc lại tối hôm trước, để không lỡ miệng nói quá.

Cả hai đều phải có. Java/SQL đưa bạn qua cửa; WCS khiến họ muốn chọn bạn.

### Nên làm ngay: hỏi HR vòng tới gồm những gì

Bạn có quyền hỏi, và hỏi là chuyên nghiệp chứ không phải yếu thế. Nhắn cho HR:

> Thank you again for our conversation. Could I ask what the next interview will cover, and who will be joining? I would like to prepare properly.

Biết được có bài test code hay không, có người Nhật tham gia hay không, sẽ tiết kiệm cho bạn rất nhiều thời gian ôn sai chỗ.

---

# 1. WCS domain — phần quan trọng nhất

## 1.1 Bức tranh hệ thống

```
Customer's ERP / Host system   ← đơn hàng, tồn kho, nghiệp vụ
            ↓
          WMS                  ← quản lý kho: cái gì, ở đâu, bao nhiêu
            ↓
          WCS   ← BẠN LÀM Ở ĐÂY: dịch lệnh nghiệp vụ thành lệnh thiết bị,
            ↓        điều phối realtime, tránh xung đột, sắp thứ tự
          PLC                  ← điều khiển motor, đọc sensor
            ↓
    Thiết bị vật lý            ← AS/RS crane, băng tải, sorter, AGV
```

**Thuộc mấy từ này:**

| Từ | Nghĩa |
|---|---|
| **WMS** | Warehouse Management System — tầng nghiệp vụ: tồn kho, đơn hàng, vị trí lưu |
| **WCS** | Warehouse Control System — tầng điều khiển: biến lệnh thành chuyển động thiết bị, realtime |
| **Host system** | Hệ thống của khách (ERP/WMS) gửi lệnh xuống |
| **AS/RS** | Automated Storage and Retrieval System — cần cẩu xếp/lấy hàng trong giá kệ. **Sản phẩm lõi của Daifuku** |
| **PLC** | Programmable Logic Controller — bộ điều khiển chạy motor/đọc cảm biến |
| **Sorter** | Hệ thống phân loại hàng theo đích đến |
| **AGV** | Automated Guided Vehicle — xe tự hành trong kho |

**Câu một dòng nếu họ hỏi "do you understand what a WCS does?":**
> As I understand it, the WMS decides what should happen — which pallet, to which location. The WCS decides how it actually happens — which crane, which conveyor route, in which order — and talks to the PLCs that move the equipment. Please correct me if I have that wrong.

Câu *"please correct me if I have that wrong"* rất quan trọng ở công ty Nhật — thể hiện bạn học chứ không phô trương.

## 1.2 Điều làm phần mềm WCS khác phần mềm web — **học kỹ phần này**

Đây là chỗ bạn ghi điểm nhiều nhất, vì nó cho thấy bạn hiểu **vì sao** hệ này khó.

**a) Retry không an toàn như web.**
> In a web application, if a request times out, you retry it. Here, a command moves a physical pallet. If I retry blindly, the crane may move twice. So before retrying, I need to know the real state of the equipment, and commands need an identifier so the same command is never executed twice.

**b) Thứ tự lệnh quan trọng.**
> Physical movements have an order. If message two arrives before message one, the result on the floor is wrong. So sequence numbers and ordered processing matter more than throughput.

**c) Không có "downtime window".**
> A warehouse may run twenty-four hours. Deploying or restarting is not free — the system has to recover and know what was in progress before it stopped.

**d) Lỗi là vật lý, không chỉ là dữ liệu.**
> If the software is wrong, a pallet ends up in the wrong place, or equipment stops and the customer's operation stops with it. That is why testing and a clear specification matter so much here.

**e) Log là công cụ điều tra duy nhất.**
> When something goes wrong at three in the morning on a customer site, nobody can reproduce it. The logs are all you have. So logging every command, its timestamp and its response is not optional.

**Nếu bạn chỉ thuộc được một mục trong cả file này, thuộc mục 1.2.**

## 1.3 Giao tiếp giữa WCS và thiết bị/host

Không cần biết sâu, chỉ cần biết tên và nguyên lý:

- Thường là **TCP socket**, message dạng **fixed-length** hoặc có ký tự phân cách — không phải REST/JSON như bạn quen
- **ACK / NAK**: bên nhận báo đã nhận được / từ chối
- **Heartbeat (keepalive)**: gói tin định kỳ để biết đầu bên kia còn sống
- **Sequence number**: đánh số để phát hiện mất gói và sai thứ tự
- **Timeout + trạng thái**: hết giờ không phản hồi thì phải hỏi lại trạng thái, không phải gửi lại lệnh

**Cầu nối sang kinh nghiệm thật của bạn:**
> I have not worked with PLC protocols. But I have built integrations with external systems where the other side was slow or went down, and message queue workflows where a message must not be processed twice. The shape of the problem — timeouts, retries, ordering, not double-processing — is familiar to me. The difference is that here the consequence is physical.

---

# 2. Java core — câu hay hỏi

Trả lời ngắn, 2–4 câu. Đừng thuyết trình.

**"What is the difference between an interface and an abstract class?"**
> An interface defines what a class can do — the contract. An abstract class can also hold state and shared implementation. A class can implement many interfaces but extend only one class. I use an interface when I want to define behaviour, and an abstract class when several classes share real code.

**"ArrayList vs LinkedList?"**
> ArrayList is backed by an array, so reading by index is fast, but inserting in the middle means shifting elements. LinkedList is fast to insert or remove if you already have the position, but slow to reach an index. In practice I use ArrayList almost always.

**"HashMap — how does it work?"**
> It stores entries in buckets based on the hash code of the key. To look up a key it computes the hash, finds the bucket, then uses equals to find the exact entry. That is why if you override equals you must also override hashCode — otherwise the map cannot find your object again.

**"== vs equals?"**
> `==` compares references — whether they are the same object. `equals` compares the value, if the class implements it. For String I always use equals.

**"Checked vs unchecked exception?"**
> A checked exception must be declared or caught — it represents something the caller can reasonably handle. An unchecked exception extends RuntimeException, usually a programming error. I try not to catch an exception unless I can actually do something about it.

**"What is `final`?"**
> On a variable it means it cannot be reassigned, on a method it cannot be overridden, on a class it cannot be extended.

**"String vs StringBuilder?"**
> String is immutable, so building a string in a loop by concatenation creates many objects. StringBuilder modifies one buffer, so it is the right choice inside a loop.

**"Java 8 — do you use streams and Optional?"**
> Yes. Streams for filtering and mapping collections, it makes the intent clearer than a loop. Optional to make it explicit that a value may be absent, instead of returning null.

**"How do you handle multiple threads?"**
> Most of my concurrency has been through Spring and the message queue rather than managing threads directly. I understand the basics — shared mutable state needs synchronisation, and I prefer to avoid sharing state at all when I can. This is an area I want to learn more deeply.

⚠️ Câu cuối: **nói đúng mức của mình.** Đừng nhận là chuyên gia concurrency.

---

# 3. Spring Boot

**"What is dependency injection, and why is it useful?"**
> Instead of a class creating the objects it needs, Spring provides them. It makes the class easier to test, because I can give it a different implementation, and it keeps the classes loosely coupled.

**"@Component, @Service, @Repository — difference?"**
> They all register a bean. The names express the layer — Service for business logic, Repository for data access. Repository also translates database exceptions into Spring's own exception types.

**"What does @Transactional do?"**
> It wraps the method in a database transaction. If the method finishes normally the transaction commits, if a runtime exception is thrown it rolls back. I keep the transaction as short as I can, and I do not put slow external calls inside it.

**"Explain the flow of a REST request in Spring."**
> The request reaches the dispatcher, which finds the controller method that matches the path and verb. The controller calls the service, the service uses the repository for data, and the return value is serialised back to JSON.

**"How do you handle errors in an API?"**
> I use a central exception handler with @ControllerAdvice, so the error format is consistent and the controllers stay clean, and I return a meaningful status code rather than five hundred for everything.

**"What is the N+1 query problem?"**
**Đây là câu ăn khớp trực tiếp với câu chuyện tối ưu của bạn — chuẩn bị kỹ.**
> It is when you load a list of entities, and then for each one the ORM runs another query to load its relation. One query becomes N plus one. That is exactly the kind of problem I fixed at XPERC — the code was making far more queries than it needed. You solve it by fetching what you need in one query with a join fetch, or by loading the related data in a batch.

**"Lazy vs eager loading?"**
> Eager loads the relation immediately, lazy loads it only when you access it. Lazy is usually better, but it is what causes the N plus one problem if you then touch it inside a loop.

---

# 4. Database / SQL

## 4.1 Xử lý câu Oracle / SQL Server — **chuẩn bị trước, đừng ứng biến**

Họ sẽ hỏi, vì JD ghi rõ. Trả lời thẳng:

> I have not used Oracle or SQL Server in production. My professional experience is PostgreSQL, and I used MySQL at university.
>
> What transfers is the part that matters: standard SQL, how to read a query plan, indexing, transactions and isolation. What I would need to learn is the specific syntax and tooling — for example PL/SQL, and Oracle's own way of doing sequences and paging. I do not think that would take me long, and I would rather tell you honestly than claim experience I do not have.

**Trung thực ở đây được chấm cao hơn là cố lấp liếm.** Người Nhật rất dị ứng với việc phóng đại.

## 4.2 Câu SQL hay hỏi

**"What types of join do you know?"**
> INNER returns only rows matching on both sides. LEFT returns all rows from the left table and nulls where there is no match. RIGHT is the mirror. FULL returns both sides.

**"What is an index, and when does it not help?"**
> An index is a separate structure that lets the database find rows without scanning the whole table. It costs write time and storage. It does not help if the query uses a function on the column, or if it matches most of the table anyway — then a full scan is cheaper.

**"How do you find out why a query is slow?"**
> I look at the execution plan first, to see whether it is scanning a table it should be seeking, or joining far more rows than expected. Then I check the indexes and whether the query is asking for more data than it needs. At XPERC that is how I found we were running many more queries than necessary and joining tables the result did not need.

**"What is a transaction? ACID?"**
> A transaction groups operations so they all succeed or all fail. Atomicity — all or nothing. Consistency — the data is left in a valid state. Isolation — concurrent transactions do not corrupt each other. Durability — once committed it survives a crash.

**"What is a deadlock?"**
> Two transactions each hold a lock the other needs, so neither can continue. The database usually detects it and kills one. You reduce the risk by keeping transactions short and always taking locks in the same order.

**"Primary key vs unique key vs foreign key?"**
> A primary key identifies the row and cannot be null. A unique key also prevents duplicates but can allow a null. A foreign key points to a key in another table and enforces that the reference is valid.

---

# 5. Câu tình huống hệ thống — dạng IT Dept bên Nhật hay hỏi

Đừng vội trả lời. **Hỏi lại một câu làm rõ trước** — ở công ty Nhật đó là điểm cộng, không phải điểm trừ.

**"The equipment does not respond to a command. What do you do?"**
> First I would want to know whether the command actually reached it, or whether only the response was lost — those need different actions.
>
> If I cannot tell, I would not resend the command, because a movement command that runs twice is dangerous. I would query the current state of the equipment first, and decide from that. And I would make sure every command carries an identifier so the same one is never executed twice.

**"The same message arrives twice. What happens?"**
> It must not be processed twice. I would keep the identifier of every message I have already handled and ignore a repeat. I worked with message queues at XPERC, where the same principle applies — a message can be delivered more than once, so the handler has to be safe to run again.

**"The system restarts in the middle of an operation. What then?"**
> The software has to be able to find out what was actually in progress. So the state has to be persisted as it changes, not only held in memory, and on startup the system should reconcile what it believed with what the equipment reports.

**"How would you test this kind of system? You cannot break a real warehouse."**
> Unit tests for the logic, and a simulator for the equipment so I can test the message exchange without the hardware — including the bad cases: no response, late response, wrong sequence. I would not want the first test of an error path to be on the customer's site.

**"How do you debug a problem on a customer site?"**
> Logs first — what command was sent, when, what came back. That is why I would log every exchange with a timestamp. Then I try to reproduce it in the test environment. I would not change anything on a live system before I understand what happened.

---

# 6. Câu về chính CV của bạn — nhớ ranh giới

| Họ hỏi | Sự thật cần giữ |
|---|---|
| "You analysed requirements with customers?" | **Không.** Bạn nhận FRD do BA viết và code từ đó. Nói thẳng. |
| "Did you design the database schema?" | Ở XPERC: không, bạn implement theo tài liệu. Đồ án **Car Management thì schema là của bạn** — lấy đó làm ví dụ. |
| "Tell me about the performance improvement." | Sửa **code**: giảm số query, bỏ join thừa. ~40% query, ~30% response. **Không phải** thêm Redis cache. |
| "You mentioned Redis." | Redis được **cấu hình để 2 pod dùng chung state** khi scale ra. Đó là việc deployment, khác với chuyện tối ưu ở trên. |
| "Have you written design documents?" | Chưa. Đã đọc và làm theo suốt một năm nên biết một tài liệu tốt cần gì. Muốn học phần này. |
| "Do you know WCS?" | Chưa từng làm. Nhưng hiểu vấn đề dạng gì — dùng mục 1.2 để bắc cầu. |

**Nguyên tắc vàng cho vòng này:** mọi câu bạn nói phải khớp với CV, và mọi câu trong CV phải khớp với sự thật. Kỹ sư Nhật sẽ đào một câu sâu ba tầng. Tầng ba là chỗ người nói quá bị lộ.

---

# 7. Lịch ôn

| Thời gian | Làm gì |
|---|---|
| **Ngày 1** | Mục 4 (SQL, gồm câu Oracle) + Mục 3 (Spring). Đây là phần Department hỏi nhiều nhất. Nói thành tiếng bằng tiếng Anh. |
| **Ngày 2** | Mục 2 (Java core). Tự trả lời không nhìn giấy. Đặc biệt kỹ: N+1, @Transactional, HashMap/equals-hashCode, interface vs abstract class. |
| **Ngày 3** | Mục 1 (WCS) — vẽ lại sơ đồ từ trí nhớ, học thuộc 5 ý ở 1.2. Rồi Mục 5 (tình huống). |
| **Tối trước hôm phỏng vấn** | Chỉ đọc mục 1.2 và mục 6. Ngủ sớm. Đừng nhồi thêm gì mới. |

**Nếu chỉ còn 1 ngày:** mục 4 → mục 1.2 → mục 6. Bỏ qua phần còn lại.

**Luyện nói thành tiếng.** Phỏng vấn bằng tiếng Anh, biết trong đầu mà nói không ra thì vẫn trượt. Mỗi câu ở mục 1.2 và mục 5, nói to 3 lần.

---

# 8. Câu bạn hỏi lại họ (vòng kỹ thuật)

Hỏi được mấy câu này là họ biết bạn đã tìm hiểu nghiêm túc:

- What does the WCS here talk to — do you integrate with the customer's WMS, or directly with their ERP?
- Is the communication with the equipment over a standard protocol, or is it specific to each project?
- Is the software developed here in Vietnam, or is it a base system from Japan that gets customised for each customer?
- Do you have a simulator for testing, or does testing happen at the customer site?
- For a new member, what is the usual learning path — do you start on maintenance of an existing system first?
