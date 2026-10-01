// English content — TechPage (expanded technical Q&A)
export default {
  badge: 'Technical',
  title: 'Technical Interview Prep (Comprehensive Edition)',
  subtitle: 'WCS domain · Java Core & Advanced · Spring Boot & Security · Database & Tuning · System Design & Messaging · CV Boundaries',
  sections: {
    overview: {
      label: '📋 Overview & Study Plan',
      content: `# Context: Who you will meet, and what they are looking for

Round 1 was HR only — the Department person has not spoken with you yet. That means **the technical screening is still fully ahead**, and it may happen in the same session as the Japanese GM.

Prepare for three types of people who may be in the room:

| Who is asking | What they are looking for | Nature |
|---|---|---|
| **Department (Vietnamese tech lead)** | Can you actually write code. Java Core, Spring Boot, JPA, SQL queries, Indexing, Concurrency. | **Pass/fail gate.** Failing here ends it, regardless of domain knowledge. |
| **Japanese IT Department** | Systems thinking, understanding constraints of equipment control software (WCS), TCP/Socket, Idempotency, High Availability, Log Tracing. | Where you **stand out**. |
| **Japanese GM** | Attitude, honesty, long-term commitment, willingness to do onsite work. Less focus on code. | Answer slowly, clearly, humbly. |

---

# Detailed Study Schedule

| When | Core Topics |
|---|---|
| **Day 1: SQL & Database** | SQL Joins, B-Tree Index (Leftmost Prefix Rule), Lock Types (Optimistic/Pessimistic), Isolation Levels, HikariCP, EXPLAIN ANALYZE & Oracle Question. |
| **Day 2: Java Core & Concurrency** | OOP/SOLID, JVM Memory (Heap/Stack/Metaspace), GC, HashMap internals, Memory Leaks, CompletableFuture, ThreadPoolExecutor, Java 8-21 features. |
| **Day 3: Spring Boot & Security** | DI/IoC, Bean Lifecycle, Bean Scopes, AOP Dynamic Proxies, @Transactional Propagation, Hibernate Entity States & N+1 Fix, Spring Security (JWT/RBAC). |
| **Day 4: WCS, Socket & Distributed Systems** | WCS vs Web, TCP Socket Framing, Heartbeat/ACK-NAK, Idempotency, Outbox Pattern, Circuit Breaker, RabbitMQ/Kafka, Saga Pattern & Distributed Tracing. |
| **Night before interview** | Only read "WCS vs web software" and "CV Boundaries". Sleep early. Do not cram anything new. |

---

# Questions to ask them (technical round)

- What does the WCS here talk to — do you integrate with the customer's WMS, or directly with their ERP?
- Is the communication with the equipment over a standard protocol (TCP/IP socket, Modbus...) or specific to each project?
- Is the software developed here in Vietnam, or is it a base system from Japan that gets customised for each customer?
- Do you have a simulator for testing, or does testing happen at the customer site?
- For a new member, what is the usual learning path — do you start on maintenance of an existing system first?
`
    },
    wcs: {
      label: '🏭 WCS Domain & Real-time Messaging',
      content: `# WCS Domain, TCP Socket & Real-Time Messaging

## 1. System Architecture Diagram
\`\`\`
Customer's ERP / Host system   ← Orders, inventory, business logic
            ↓
          WMS                  ← Warehouse management: What, where, how many
            ↓
          WCS   ← YOU WORK HERE: Translate business commands into equipment
            ↓        commands, coordinate realtime, avoid conflicts, set order
          PLC                  ← Controls motors, reads sensors
            ↓
    Physical equipment         ← AS/RS crane, conveyor, sorter, AGV
\`\`\`

---

## 2. ⭐ 5 Things that make WCS software different from web software

### a) Retry is not safe the way it is in web (Non-idempotent physical actions).
> In a web application, if a request times out, you retry it. Here, a command moves a physical pallet. If I retry blindly, the crane may move twice causing a crash. So before retrying, I need to query the real state of the equipment, and commands need a unique identifier so the same command is never executed twice.

### b) Command order is critical (Strict Command Ordering).
> Physical movements have a strict sequence (Enter conveyor → Pass sensor → Load onto AS/RS crane). If message two arrives before message one, the result on the floor is wrong. So sequence numbers and ordered FIFO processing matter more than raw throughput.

### c) There is no "downtime window" (24/7 High Availability).
> Warehouses often run twenty-four hours. Deploying or restarting is not free — the system has to recover its state (Crash Recovery) and know exactly where every piece of equipment was before it stopped.

### d) Errors are physical, not just data (Physical Consequences).
> If web software fails, the user presses F5. If WCS fails, a pallet drops, thousands of orders stall, or equipment collides. That is why testing with simulators and clear specifications matter so much here.

### e) Logs are the only investigation tool (Traceability & Auditing).
> When an issue happens at three in the morning on a customer site, nobody can reproduce it. Logging every command byte, millisecond timestamp and response is mandatory for root cause analysis.

---

## 3. TCP Socket Communication & Framing
> **Question**: What is the difference between TCP Sockets and HTTP/REST APIs? How do you handle Packet Fragmentation?
> **Answer**: HTTP is a stateless Request-Response application-layer protocol. TCP Socket is a persistent, stateful, bi-directional Transport-layer connection.
> Because TCP is a continuous byte stream without message boundaries, we must use **Framing**:
> 1. **Fixed-length framing**: Every message has a fixed byte length (e.g., 64 bytes).
> 2. **Delimiter-based framing**: Using special delimiter bytes (e.g., \\r\\n or ETX byte).
> 3. **Length-field framing**: Prefixing messages with a 4-byte header specifying payload length.

---

## 4. WebSockets vs STOMP vs RabbitMQ vs Kafka
> **Question**: Differentiate WebSockets/STOMP (from your Syrix Chat project) vs RabbitMQ/Kafka?
> - **WebSocket/STOMP**: Bi-directional low-latency protocol between Client (Browser/App) and Server over HTTP Upgrade. Ideal for Realtime Chat/UI updates.
> - **RabbitMQ**: AMQP-compliant Message Broker. Supports complex routing (Direct, Topic, Fanout exchanges) and reliable message delivery. Best for task queues and order processing.
> - **Kafka**: Distributed commit-log event streaming platform. Retains messages on disk across partitions, supporting ultra-high throughput (millions msg/sec) and event replay. Ideal for Event Sourcing and Log Streaming.

---

## 5. Experience Bridge
> "I have not coded PLC protocols directly, but I built real-time messaging services using WebSockets/STOMP and RabbitMQ at XPERC. The underlying principles — maintaining persistent connections, handling reconnects, heartbeats, message ordering, and preventing duplicate processing — are identical."
`
    },
    java: {
      label: '☕ Java Core & Advanced Concurrency',
      content: `# Java Core, Collections & Advanced Concurrency

### 1. 4 Pillars of OOP & SOLID Principles
> - **4 OOP Pillars**: Encapsulation, Abstraction, Inheritance, Polymorphism.
> - **S.O.L.I.D**:
>   - **S**ingle Responsibility: A class should have only one reason to change.
>   - **O**pen/Closed: Open for extension via interfaces/inheritance, closed for modification.
>   - **L**iskov Substitution: Subtypes must be substitutable for their base types.
>   - **I**nterface Segregation: Many specific interfaces are better than one general-purpose interface.
>   - **D**ependency Inversion: Depend upon abstractions (interfaces), not concretions.

---

### 2. Interface vs Abstract Class
> An interface defines a contract (what a class can do), supporting multiple inheritance. An abstract class defines identity (what a class is) and shared state/code, supporting single inheritance. In practice, I use interfaces to define contracts across unrelated classes, and abstract classes to share code among closely related classes.

---

### 3. HashMap Internals & equals() / hashCode() Contract
> HashMap stores (key, value) entries in array buckets. Bucket index = hash(key) % capacity. Bucket collisions are handled via LinkedLists, which treeify into Red-Black Trees when bucket size exceeds 8 (since Java 8).
> **Contract**: If two objects are equal according to equals(), they MUST have the same hashCode(). Otherwise, HashMap will compute wrong bucket indexes and fail to retrieve values.

---

### 4. ConcurrentHashMap vs Collections.synchronizedMap vs HashMap
> - **HashMap**: Not thread-safe.
> - **SynchronizedMap**: Thread-safe by locking the entire Map for every operation, creating a severe bottleneck.
> - **ConcurrentHashMap**: Uses bucket-level locking (Segment locking / CAS operations), allowing concurrent reads and writes across different buckets without locking the entire Map.

---

### 5. JVM Memory Architecture & Garbage Collection (GC)
> - **Stack Memory**: Stores local variables and method call frames per thread. Cleared upon method exit.
> - **Heap Memory**: Stores all instantiated objects. Divided into Young Generation (Eden, Survivor spaces) and Old Generation.
> - **Metaspace**: Stores class metadata, bytecodes, and static variables.
> **Garbage Collectors**: G1GC (Garbage-First), ZGC (Ultra-low latency), Parallel GC. GC automatically reclaims unreferenced objects starting from GC Roots.

---

### 6. Memory Leaks in Java Despite GC
> Occurs when objects no longer needed remain referenced by long-lived objects (such as static collections, unclosed streams/connections, unregistered event listeners, or unremoved ThreadLocals).

---

### 7. ThreadPoolExecutor Parameters
> When instantiating a custom ThreadPoolExecutor, 5 key parameters are used:
> 1. **corePoolSize**: Minimum number of threads kept alive.
> 2. **maximumPoolSize**: Maximum threads allowed when work queue is full.
> 3. **keepAliveTime**: Time idle excess threads wait before terminating.
> 4. **workQueue**: Queue holding tasks before execution (ArrayBlockingQueue, LinkedBlockingQueue).
> 5. **handler**: RejectedExecutionHandler for handling full queue/pool states (AbortPolicy, CallerRunsPolicy, DiscardPolicy).

---

### 8. CompletableFuture & Non-blocking Asynchronous Programming
> CompletableFuture enables non-blocking asynchronous programming by chaining callbacks (thenApply, thenCompose, handle, allOf) without blocking the main thread like Future.get().

---

### 9. Volatile Keyword vs AtomicInteger (CAS) vs Synchronized
> - **volatile**: Guarantees visibility across threads (reads/writes directly to Main Memory, bypassing CPU caches), but does NOT guarantee atomicity.
> - **AtomicInteger**: Guarantees atomicity using hardware CAS (Compare-And-Swap) without locking (Lock-free).
> - **synchronized**: Guarantees both visibility and atomicity using mutual exclusion (Mutex locks).

---

### 10. Java 8 to 21 Key Features
> - **Java 8**: Lambda expressions, Streams API, Optional, Functional Interfaces, Default methods.
> - **Java 11**: New HttpClient API, new String methods.
> - **Java 17 (LTS)**: Sealed Classes, Records (concise DTOs), Pattern Matching for instanceof.
> - **Java 21 (LTS)**: Virtual Threads (Project Loom - lightweight threads), Pattern Matching for switch.
`
    },
    spring: {
      label: '🌱 Spring Boot, Security & JPA',
      content: `# Spring Boot, Spring Security & Spring Data JPA

### 1. Dependency Injection (DI) & Inversion of Control (IoC)
> IoC is the principle of delegating object lifecycle management to the Spring Container. DI is how IoC is implemented: Spring automatically injects dependencies (beans) into classes via Constructor, Setter, or @Autowired. This keeps code loosely coupled and easy to unit test using mocks.

---

### 2. Spring Bean Lifecycle
> 1. Instantiation (Creating instance)
> 2. Populate Properties (Injecting dependencies)
> 3. BeanNameAware / BeanFactoryAware callbacks
> 4. Pre-initialization (BeanPostProcessor.postProcessBeforeInitialization)
> 5. Custom Init (@PostConstruct / InitializingBean)
> 6. Post-initialization (BeanPostProcessor.postProcessAfterInitialization) -> Bean ready to use.
> 7. Destruction (@PreDestroy / DisposableBean) when container closes.

---

### 3. Spring Bean Scopes
> - **Singleton** (Default): A single instance per Spring Container.
> - **Prototype**: A new instance created every time requested.
> - **Request / Session**: Created per HTTP Request / Session.

---

### 4. Spring AOP & Dynamic Proxies
> AOP modularizes cross-cutting concerns (Logging, Security, Transactions) out of business logic. Spring AOP uses **Dynamic Proxies** (JDK Dynamic Proxy for interfaces, CGLIB for classes). Calling methods annotated with @Transactional routes through the Proxy to open, commit, or rollback transactions before reaching actual code.

---

### 5. @Transactional Propagation & Isolation
> - **Propagation**:
>   - **REQUIRED** (Default): Uses current transaction or creates new if none exists.
>   - **REQUIRES_NEW**: Suspends current transaction and opens a fresh one.
>   - **SUPPORTS**: Uses transaction if present, executes non-transactionally if none.
> - **Isolation**: READ_COMMITTED, REPEATABLE_READ, SERIALIZABLE.

---

### 6. Hibernate Entity States & Cascade Types
> - **Entity States**:
>   1. **Transient**: Newly created object via \`new\`, not associated with Session/DB.
>   2. **Persistent**: Object managed by Session (has DB ID). Changes automatically sync to DB on Commit (Dirty Checking).
>   3. **Detached**: Object was Persistent but Session closed.
>   4. **Removed**: Object marked for deletion.
> - **Cascade Types**: PERSIST, MERGE, REMOVE, REFRESH, DETACH, ALL. \`orphanRemoval=true\` automatically deletes child entity from DB when removed from parent collection.

---

### 7. N+1 Query Problem & Fixes
> Happens when an ORM loads N parent entities, and then executes an additional query per parent to fetch child relationships (resulting in N+1 total DB queries).
> **Fixes**: Use JOIN FETCH in JPQL, @EntityGraph, or DTO projections. At XPERC, I optimized queries and removed unneeded joins to reduce total queries by ~40% and response time by ~30%.

---

### 8. Spring Security & JWT Architecture
> Requests pass through the **SecurityFilterChain**. Uses a \`OncePerRequestFilter\` to extract JWT Token from \`Authorization: Bearer <token>\` header. Decodes token, extracts Username & Permissions, constructs a \`UsernamePasswordAuthenticationToken\`, and stores it in \`SecurityContextHolder.getContext().setAuthentication(...)\`.

---

### 9. Unit Testing in Spring Boot with Mockito
> - **@SpringBootTest**: Boots entire Spring Context (slower, for Integration testing).
> - **@WebMvcTest**: Loads Controller layer and Security config only (fast).
> - **@DataJpaTest**: Loads JPA Repositories and DB config only.
> - **Mockito**: Uses \`@Mock\` / \`@MockBean\` to mock services, \`when(...).thenReturn(...)\` and \`verify(...)\` to assert method calls.
`
    },
    sql: {
      label: '🗄️ Database, SQL & Performance Tuning',
      content: `# Database, SQL & Performance Tuning

## 1. Handling Oracle / SQL Server Questions
> I use PostgreSQL professionally and used MySQL at university. Standard SQL, Indexing, Transaction Isolation, and Query Execution Plans apply across all relational databases. If using Oracle or SQL Server, I would quickly adapt to specific syntax and tooling (such as PL/SQL, T-SQL, ROWNUM/Paging, Sequences).

---

## 2. B-Tree Index Mechanics & Leftmost Prefix Rule
> B-Tree Index creates a balanced tree structure allowing data retrieval in O(log N) time complexity instead of O(N) Full Table Scan.
> **Composite Index (Index on multiple columns)**:
> Example Index on \`(status, created_at, user_id)\`.
> **Leftmost Prefix Rule**: Index is only utilized when the WHERE clause includes the leftmost column (\`status\`). Queries matching \`(status)\` or \`(status, created_at)\` use the index. A query filtering ONLY on \`(created_at, user_id)\` CANNOT use this composite index.

---

## 3. When Index DOES NOT Help
> 1. Applying functions on indexed columns (e.g., WHERE UPPER(name) = 'ABC' or WHERE YEAR(created_at) = 2024).
> 2. Wildcard searches at the beginning (WHERE name LIKE '%abc').
> 3. Low Cardinality columns (e.g., gender or status with only 2-3 unique values).
> 4. Very small tables (Full table scan is faster than reading index).

---

## 4. Database Locks: Pessimistic vs Optimistic Locking
> - **Pessimistic Locking**: Uses SELECT ... FOR UPDATE to lock rows at DB level, preventing other threads from reading/writing until transaction ends. Ideal for high contention but reduces throughput.
> - **Optimistic Locking**: Uses a @Version column. When updating, checks WHERE id = ? AND version = old_version. If modified by another thread, throws OptimisticLockException. Ideal for read-heavy applications.

---

## 5. Isolation Levels & Concurrency Anomalies
> - **Dirty Read**: Reading uncommitted data from another transaction.
> - **Non-Repeatable Read**: Reading the same row twice in one transaction returns different values because another committed transaction updated/deleted it.
> - **Phantom Read**: Querying a range of rows twice returns new rows because another committed transaction inserted them.
> **Isolation Levels**: Read Uncommitted -> Read Committed (prevents Dirty Read) -> Repeatable Read (prevents Non-repeatable Read) -> Serializable (prevents all anomalies).

---

## 6. HikariCP Connection Pool Tuning
> - **maximumPoolSize**: Maximum DB connection count (typically 10-20 connections based on formula \`connections = ((core_count * 2) + effective_spindle_count)\`).
> - **minimumIdle**: Minimum idle connections in pool.
> - **connectionTimeout**: Maximum wait time to obtain connection before throwing SQLException (default 30s).
> - **idleTimeout**: Idle duration before excess connections are released.

---

## 7. Steps to Tune Slow SQL Queries (EXPLAIN ANALYZE)
> 1. Run EXPLAIN ANALYZE to inspect Execution Plan (Seq Scan vs Index Scan, Nested Loop vs Hash Join).
> 2. Check for missing or disabled indexes due to functions/wildcards.
> 3. Avoid SELECT *; fetch only required columns.
> 4. Optimize pagination: Use Keyset Pagination (WHERE id > last_id LIMIT 20) instead of large OFFSETs (OFFSET 1000000).
`
    },
    scenarios: {
      label: '🧩 System Design, Distributed Systems & CV Boundaries',
      content: `# System Design, Distributed Systems & CV Boundaries

### 1. Idempotency Pattern & Duplicate Prevention
> **Scenario**: Message queue sends a move command twice or a client retries due to timeout.
> **Solution**: Assign a unique GUID / Idempotency-Key per command. Before processing, check the Key in Redis or DB (using Unique Constraints or Redis SETNX). If the Key exists, skip duplicate processing or return cached result.

---

### 2. Outbox Pattern for Distributed Systems / WCS
> **Scenario**: You must save an order in DB and publish a message to Queue/Socket. If DB save succeeds but Queue publish fails, data becomes inconsistent.
> **Solution**: Write both order and outbox message into an outbox table in DB within a single Local Transaction. A background worker (or Debezium CDC) reads outbox table and pushes to Queue/Socket, ensuring At-least-once delivery.

---

### 3. Circuit Breaker Pattern when External System Fails
> **Scenario**: A PLC or external service crashes or slows down; continuing requests exhausts WCS thread pools.
> **Solution**: Use Circuit Breaker (Resilience4j). Has 3 states:
> - **CLOSED**: Normal operation.
> - **OPEN**: When error rate exceeds threshold, trips immediately, failing fast without calling target service.
> - **HALF-OPEN**: Allows trial requests to check if target service has recovered.

---

### 4. Distributed Transactions: 2PC vs Saga Pattern
> In Microservices, Local Transactions cannot span multiple DBs.
> - **2PC (Two-Phase Commit)**: Uses Coordinator for Prepare & Commit phases. Guarantees Strong Consistency but reduces performance and risks deadlocks.
> - **Saga Pattern**: Breaks process into series of Local Transactions. If a step fails, triggers **Compensating Transactions** to undo previous steps. Ideal for Event-driven architectures.

---

### 5. Distributed Log Tracing (Trace ID & Span ID)
> When requests flow through multiple microservices/WCS modules, use Distributed Tracing (Micrometer Tracing / Zipkin / OpenTelemetry).
> - **Trace ID**: Unique identifier for entire end-to-end request flow.
> - **Span ID**: Identifier for individual service step or operation.
> Put Trace ID in Log MDC (Mapped Diagnostic Context) to easily grep and track incidents across Kibana/Grafana.

---

# 🛡️ CV Boundaries Table — Remember before entering the room

| They ask | The truth to hold (Do not cross) |
|---|---|
| "You analysed requirements with customers?" | **No.** Received FRDs from BA and coded based on FRDs. |
| "Did you design the database schema?" | At XPERC: no, followed specs. **Car Management project**: Self-designed DB schema from scratch. |
| "Tell me about performance improvement." | Code fix (fewer queries, removed unneeded joins). ~40% query reduction, ~30% response time improvement. **Not** Redis caching. |
| "You mentioned Redis." | Redis was configured for **state sharing across 2 pods** when scaling out (Deployment concern). |
| "Have you written design documents?" | Not written yet. Followed FRDs for 1 year, understand proper spec structure, and want to learn this in the new role. |
| "Do you know WCS?" | Have not worked on it directly. But understand core concepts: realtime control, equipment messaging, idempotency & retries. |
`
    },
  }
}
