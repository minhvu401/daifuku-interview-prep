// English content — RoadmapPage (Expanded with full Q&A)
export default {
  badge: 'Roadmap & Interview Q&A',
  title: 'Advanced Backend Skill Roadmap (Detailed Q&A)',
  subtitle: 'Database · Distributed Systems · Cloud & DevOps · Testing & Observability · English Interview Scripts',
  content: `# 🚀 Advanced Backend Skill Roadmap (Deep Dive Q&A)

---

## 1. 🗄️ Database & Optimization (Core Backend)

### Q1: EXPLAIN ANALYZE & Execution Plan Analysis in PostgreSQL/MySQL?
- **Explanation**: \`EXPLAIN\` outputs the projected execution plan from the Query Planner; adding \`ANALYZE\` executes the query and returns actual metrics (*Actual Time*, *Rows*, *Loops*).
- **Key Concepts**:
  - **Seq Scan (Sequential Scan)**: Reads every row sequentially (slow on large tables).
  - **Index Scan**: Reads index tree pointers to fetch rows from table disk.
  - **Index Only Scan**: Fetches required data directly from index without touching main table disk (fastest).
  - **Nested Loop**: Iterates nested loops (ideal for small datasets).
  - **Hash Join**: Builds a hash table for the smaller table and probes from the larger table (ideal for large joins).
- **English Interview Answer**:
> "I use EXPLAIN ANALYZE to diagnose slow queries by inspecting the execution plan. It reveals whether the DB is performing a Sequential Scan instead of an Index Scan, and highlights join overhead like Hash Joins vs Nested Loops. It allows me to pinpoint missing indexes or inefficient query structures directly."

---

### Q2: Composite Index, Leftmost Prefix Rule & Covering Index?
- **Explanation**:
  - **Composite Index**: Index on multiple columns, e.g., \`(status, created_at, user_id)\`.
  - **Leftmost Prefix Rule**: The database uses a Composite Index only if the WHERE clause includes the leftmost column (\`status\`). Filtering by \`(status)\` or \`(status, created_at)\` uses the index, but filtering ONLY by \`(created_at)\` CANNOT use it.
  - **Covering Index**: An index containing all SELECT columns so the DB performs an *Index Only Scan* without main table I/O.
  - **B-Tree vs GIN Index**: B-Tree for comparison (\`=\`, \`<\`, \`>\`); GIN Index for arrays, JSONB, or Full-Text search in PostgreSQL.
- **English Interview Answer**:
> "A Composite Index indexes multiple columns, but it follows the Leftmost Prefix Rule — meaning queries must include the leading column to utilize the index. A Covering Index includes all required SELECT columns so the DB can return data via an Index Only Scan without hitting the main table disk."

---

### Q3: Table Partitioning & Indexing for Massive Datasets?
- **Explanation**:
  - **Table Partitioning**: Splits a massive table (tens of millions of rows) into smaller physical child tables (*Partitions*) while remaining a single logical table.
  - **Strategies**: *Range Partitioning* (by time \`created_at\`), *List Partitioning* (by \`region\`), *Hash Partitioning* (by ID).
  - **Benefit**: *Partition Pruning* — the DB skips irrelevant child tables during queries, scanning only a small subset of data.
- **English Interview Answer**:
> "Table Partitioning splits a massive table into smaller physical partition tables, typically by range like creation date. This enables Partition Pruning, allowing the database to scan only relevant partitions during queries instead of scanning millions of rows."

---

### Q4: 4 Transaction Isolation Levels & Concurrency Anomalies?
- **Explanation**:
  - **Read Uncommitted**: Lowest level, vulnerable to *Dirty Reads* (reading uncommitted data from another transaction).
  - **Read Committed** (Default in Postgres): Prevents *Dirty Reads*, but subject to *Non-Repeatable Reads* (reading a row twice yields different values due to concurrent UPDATE/DELETE).
  - **Repeatable Read**: Prevents *Non-Repeatable Reads*, but vulnerable to *Phantom Reads* (querying a range twice yields new rows due to concurrent INSERT).
  - **Serializable**: Highest level, strictly sequential execution, prevents all anomalies but heavy performance penalty.
- **English Interview Answer**:
> "The 4 transaction isolation levels manage concurrency trade-offs: Read Uncommitted allows Dirty Reads; Read Committed prevents Dirty Reads; Repeatable Read prevents Non-Repeatable Reads; and Serializable guarantees full isolation by executing transactions sequentially."

---

### Q5: Pessimistic Locking vs Optimistic Locking & Deadlock Handling?
- **Explanation**:
  - **Pessimistic Locking**: Uses \`SELECT ... FOR UPDATE\` locking rows at DB level. Used when write collision is high, but reduces throughput.
  - **Optimistic Locking**: Uses a \`@Version\` column checking \`WHERE id = ? AND version = old_version\`. Throws an exception if modified by another thread. Used for read-heavy flows.
  - **Deadlock Prevention**: Always acquire locks in a consistent order across transactions, keeping transactions short.
- **English Interview Answer**:
> "Pessimistic Locking locks rows at the DB level using SELECT FOR UPDATE, ideal for high contention. Optimistic Locking uses a version column to detect concurrent edits on commit, ideal for read-heavy flows. To prevent deadlocks, we always acquire locks in a consistent order across transactions."

---

### Q6: Caching Patterns (Cache-Aside, Write-Through, Write-Behind)?
- **Explanation**:
  - **Cache-Aside (Lazy Loading)**: Application queries cache first; on a Miss, fetches DB, stores result in cache and returns. Ideal for read-heavy applications.
  - **Write-Through**: Application updates cache, and cache synchronously updates DB before completing. Guarantees high data consistency.
  - **Write-Behind (Write-Back)**: Application writes to cache and returns immediately; cache asynchronously syncs to DB later. Extremely fast writes, but risk of data loss if cache fails before sync.
- **English Interview Answer**:
> "Cache-Aside queries cache first, falling back to DB on a miss. Write-Through updates cache and syncs to DB synchronously. Write-Behind updates cache immediately and syncs to DB asynchronously, giving high write performance at the risk of data loss if cache fails before sync."

---

### Q7: Production Cache Failure Handling (Cache Stampede, Avalanche, Penetration)?
- **Explanation**:
  - **Cache Stampede / Thundering Herd**: A hot key expires, and thousands of concurrent requests hit DB directly. *Fix*: Use Mutex Locking (Redis lock) so only one thread reloads DB, or auto-extend TTL (*Soft TTL*).
  - **Cache Avalanche**: Mass keys expire at the same second. *Fix*: Add random offsets (Jitter) to TTL values.
  - **Cache Penetration**: Continuous requests for keys that exist in neither DB nor Cache. *Fix*: Use *Bloom Filters* or cache NULL values temporarily.
- **English Interview Answer**:
> "To handle Cache Stampede, I use distributed locking so only one request repopulates the cache. For Cache Avalanche, I add random jitter to TTL values to avoid simultaneous expirations. For Cache Penetration, I employ Bloom Filters or cache null results temporarily."

---

### Q8: Distributed Locking with Redis (Redlock / Redisson)?
- **Explanation**: When multiple application instances need to execute a single job (e.g., cron job), local JVM locks (\`synchronized\`) are ineffective. Use Redis as a Distributed Lock using \`SET key value NX PX 30000\` (or Redisson in Java). The **Redlock** algorithm provides safe locking across Redis clusters.
- **English Interview Answer**:
> "A Distributed Lock ensures that across multiple application instances, only one instance executes a critical task at a time. We implement this using Redis commands like SET NX PX with unique tokens or framework implementations like Redisson."

---

## 2. 🏗️ Architecture & System Design

### Q9: RabbitMQ Deep Dive (Exchanges, DLQ, Manual ACK)?
- **Explanation**:
  - **Exchanges**: *Direct* (exact routing key), *Topic* (routing key with wildcards like \`order.*\`), *Fanout* (broadcast to all queues), *Headers* (header matching).
  - **Manual ACK**: Consumer sends ACK to RabbitMQ only after successfully processing task. On exception, sends NACK/REJECT to requeue or route to DLQ.
  - **Dead Letter Queue (DLQ)**: Queue holding rejected, expired, or max-retried messages for auditing.
- **English Interview Answer**:
> "RabbitMQ routes messages via Exchanges to Queues based on routing keys. Manual Acknowledgements ensure messages are not deleted until successfully processed. Failed or rejected messages are forwarded to a Dead Letter Queue (DLQ) for auditing and retries."

---

### Q10: Apache Kafka Architecture & Comparison with RabbitMQ?
- **Explanation**:
  - **Kafka Architecture**: Stores messages as append-only commit logs on disk. Organized into *Topics*, split into *Partitions*. Consumed via *Consumer Groups* with *Offsets*.
  - **Comparison**: RabbitMQ excels at Task Queues, complex message routing, push-based delivery. Kafka excels at massive Event Streaming (millions msg/sec), log aggregation, and message replay.
- **English Interview Answer**:
> "Kafka is an append-only distributed commit log organized into topics and partitions, consumed via Consumer Groups with offsets. Unlike RabbitMQ which excels at complex routing and per-message queues, Kafka achieves massive throughput and supports event replay."

---

### Q11: Idempotency Pattern (Idempotent API Design)?
- **Explanation**: Guarantees that invoking an API (e.g., payment, order creation) 1 time or 100 times produces the exact same single outcome on DB.
- **Implementation**: Client sends a unique \`Idempotency-Key\` (UUID). Server checks key in Redis (\`SETNX\`) or DB Unique constraint. If processed, returns cached result immediately without re-executing business logic.
- **English Interview Answer**:
> "Idempotency ensures that multiple identical requests produce the same system outcome as a single request. I implement this by attaching a unique Idempotency-Key to requests and verifying it against Redis or DB unique constraints before executing transactions."

---

### Q12: Transactional Outbox Pattern?
- **Explanation**: Dual-write problem: updating DB and publishing events to a Queue. If DB write succeeds but Queue publish fails, data becomes inconsistent.
- **Solution**: Save both main entity and outbox event record in an \`outbox\` table in DB within a single Local Transaction. A background worker (or Debezium CDC) reads outbox table and pushes events to Queue, guaranteeing *At-least-once delivery*.
- **English Interview Answer**:
> "The Transactional Outbox Pattern prevents data inconsistency when updating a database and publishing events. By saving outbox event records in the same local DB transaction, a background process or CDC engine reads and pushes events to the message broker reliably."

---

### Q13: Saga Pattern for Distributed Transactions?
- **Explanation**: In microservices, local DB transactions cannot span multiple services. Saga manages transactions as a sequence of local transactions.
- **2 Patterns**:
  - **Choreography**: Services listen to each other's events and process sequentially.
  - **Orchestration**: A central orchestrator coordinates execution steps.
- **Compensating Transactions**: If a step fails, Saga triggers compensating transactions in reverse order to roll back earlier changes.
- **English Interview Answer**:
> "The Saga pattern manages distributed transactions across microservices as a sequence of local transactions. If a step fails, the Saga triggers compensating transactions in reverse order to roll back changes made by earlier steps."

---

### Q14: Rate Limiting Algorithms (Token Bucket, Leaky Bucket, Sliding Window)?
- **Explanation**:
  - **Token Bucket**: Adds tokens to a bucket at a fixed rate. Requests consume tokens; empty bucket rejects requests. Allows burst traffic.
  - **Leaky Bucket**: Requests fill a bucket and leak out at a constant processing rate, flattening traffic spikes.
  - **Sliding Window Counter**: Counts requests within a sliding time window (e.g., 100 req/min).
- **English Interview Answer**:
> "Rate limiting algorithms control request velocity: Token Bucket allows burst traffic up to a bucket capacity, Leaky Bucket flattens traffic at a constant processing rate, and Sliding Window Counter tracks request frequency across dynamic time windows."

---

### Q15: Circuit Breaker Pattern & Exponential Backoff with Jitter?
- **Explanation**:
  - **Circuit Breaker (Resilience4j)**: Stops calling a failing service/PLC to prevent thread pool exhaustion. 3 states: *CLOSED* (normal), *OPEN* (fail-fast), *HALF-OPEN* (trial requests).
  - **Exponential Backoff with Jitter**: Retry delay increases exponentially (1s, 2s, 4s...) plus random noise (*Jitter*) to prevent retry storms.
- **English Interview Answer**:
> "Circuit Breaker trips to OPEN state when a downstream service fails, rejecting calls fast to protect system resources. Exponential Backoff with Jitter increases retry delays exponentially while adding random noise to prevent retry storms."

---

## 3. ☁️ Cloud & DevOps

### Q16: AWS/GCP Compute (EC2, ECS/Cloud Run, Lambda)?
- **Explanation**:
  - **EC2 (VM)**: Virtual machine instance. Self-manage OS, runtime, and scaling.
  - **ECS / Cloud Run**: Deploys containerized applications with automatic scaling.
  - **AWS Lambda**: Event-driven serverless functions billed strictly per millisecond execution.
- **English Interview Answer**:
> "EC2 provides full virtual machine control. ECS and Cloud Run manage Docker container deployments with auto-scaling. AWS Lambda offers serverless execution triggered by events, billing strictly per execution duration."

---

### Q17: S3, Managed DBs (RDS PostgreSQL) & Read Replicas?
- **Explanation**:
  - **AWS S3**: Object storage for static assets and logs with 99.999999999% durability.
  - **RDS PostgreSQL**: Managed relational DB handling backups and patching.
  - **Read Replicas**: Copies of primary DB dedicated to read queries (\`SELECT\`), relieving load from primary master (\`INSERT/UPDATE/DELETE\`).
- **English Interview Answer**:
> "S3 provides scalable object storage for static files. Managed RDS PostgreSQL automates backups and high availability, while Read Replicas separate read traffic from write operations on the primary node to boost throughput."

---

### Q18: Cloud Security: IAM Roles, VPC Subnets & API Gateway?
- **Explanation**:
  - **IAM**: Manages access with least privilege principle using Roles instead of hardcoded keys.
  - **VPC Subnets**: Public Subnets host Internet-facing Load Balancers / API Gateways; Private Subnets isolate Application Servers and Databases from the Internet.
  - **API Gateway**: Single entry point handling Authentication, Rate Limiting, and SSL Termination.
- **English Interview Answer**:
> "IAM enforces least privilege security via policies and roles. A VPC segregates public-facing resources like Load Balancers in Public Subnets from sensitive Backend services and Databases in isolated Private Subnets."

---

### Q19: CI/CD Pipelines with GitHub Actions / GitLab CI?
- **Explanation**:
  - **CI**: Automates linting, unit testing, and building on Pull Requests.
  - **CD**: Automates building Docker images, pushing to Registry (ECR/DockerHub), and deploying to Staging/Production clusters.
- **English Interview Answer**:
> "CI/CD pipelines automate testing, building, and deployment. On every pull request, CI runs code linters and unit tests. Upon merge, CD builds the Docker image, pushes it to the registry, and deploys it to the target cluster."

---

### Q20: Kubernetes Basics (Pods, Deployments, Services, Ingress)?
- **Explanation**:
  - **Pod**: Smallest execution unit in K8s running containers.
  - **Deployment**: Manages pod replicas and zero-downtime rolling updates.
  - **Service**: Provides stable IP and load balancing across pods.
  - **Ingress**: Routes external HTTP/HTTPS traffic into cluster Services.
- **English Interview Answer**:
> "In Kubernetes, a Pod is the smallest execution unit running containers. Deployments manage pod replicas and rolling updates. Services provide internal load balancing across pods, while Ingress routes external HTTP traffic into cluster services."

---

## 4. 🧪 Testing & Observability

### Q21: Integration Testing with Testcontainers?
- **Explanation**: Testcontainers automatically spins up real PostgreSQL, Redis, or RabbitMQ Docker containers during integration test runs and cleans up afterwards, avoiding mock discrepancies.
- **English Interview Answer**:
> "Testcontainers automatically spins up real Docker containers for PostgreSQL, Redis, or RabbitMQ during integration test execution. This avoids mock discrepancies and ensures our tests execute against real production-like dependencies."

---

### Q22: Structured Logging & Distributed Tracing (Correlation ID)?
- **Explanation**:
  - **Structured Logging**: Logs formatted in JSON for log aggregators (ELK / OpenSearch).
  - **Correlation ID / Trace ID**: Unique header ID passed across microservices to trace end-to-end request journeys during debugging.
- **English Interview Answer**:
> "Structured JSON logging allows log aggregators to parse log attributes efficiently. Passing a Correlation ID or Trace ID across HTTP headers enables end-to-end request tracing across microservices during debugging."

---

### Q23: Metrics & Dashboards (Prometheus & Grafana)?
- **Explanation**:
  - **Prometheus**: Scrapes application metrics via HTTP endpoints (\`/actuator/prometheus\`).
  - **Grafana**: Visualizes metrics on real-time dashboards monitoring the 4 Golden Signals (Latency, Traffic, Errors, Saturation).
- **English Interview Answer**:
> "Prometheus scrapes application metrics like request latency and JVM heap usage via HTTP endpoints. Grafana visualizes these metrics on real-time dashboards to monitor the 4 Golden Signals: Latency, Traffic, Errors, and Saturation."

---

### Q24: Distributed Tracing with OpenTelemetry / Jaeger?
- **Explanation**:
  - **Trace**: Represents entire end-to-end request path.
  - **Span**: Represents individual operations (SQL query, REST call, Redis lookup).
  - **Jaeger / OpenTelemetry**: Measures span latency breakdowns to locate performance bottlenecks.
- **English Interview Answer**:
> "Distributed Tracing using OpenTelemetry and Jaeger tracks end-to-end request flows across services. A Trace contains multiple Spans representing discrete operations, allowing us to pinpoint latency bottlenecks across microservices."

---

## 5. 💡 Milestone Checklist & Action Plan

| Phase | Core Objective | Practice Output |
| :--- | :--- | :--- |
| **Phase 1 (Short-term)** | Deep Postgres Optimization + Testcontainers + Outbox Pattern | Upgrade \`Car Management\` or \`BookSwapHub\` project with automated Integration Tests and Idempotent Payments. |
| **Phase 2 (Mid-term)** | Caching Patterns + RabbitMQ DLQ/Retry + Prometheus/Grafana | Build a simulated Order/Booking system under load with real-time latency & error rate Dashboards. |
| **Phase 3 (Long-term)** | AWS/GCP Core + GitHub Actions CI/CD + Kafka Basics | Full Cloud application deployment via automated CI/CD. |
`
}
