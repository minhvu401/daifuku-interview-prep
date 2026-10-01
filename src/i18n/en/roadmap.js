// English content — RoadmapPage
export default {
  badge: 'Development Roadmap',
  title: 'Advanced Backend Skill Roadmap',
  subtitle: 'Database · System Architecture · Cloud & DevOps · Testing & Observability · Action Plan',
  content: `# 🚀 Advanced Backend Skill Upgrade Roadmap

---

## 1. 🗄️ Database & Optimization (Core Backend)

### SQL Diagnosis & Optimization
- **Advanced Execution Plan Analysis**: Proficient use of \`EXPLAIN ANALYZE\` to read and analyze execution plans (*Seq Scan* vs *Index Scan*, *Nested Loop* vs *Hash Join* vs *Merge Join*).
- **Advanced Indexing**: Deep understanding of Composite Indexes (respecting the *Leftmost Prefix Rule*), Covering Indexes, B-Tree vs Hash/GIN indexes.
- **Table Partitioning**: Data partitioning techniques & indexing strategies for multi-million row tables.

### Transaction & Concurrency
- **Transaction Isolation**: 4 isolation levels (*Read Uncommitted, Read Committed, Repeatable Read, Serializable*) and preventing *Dirty Read, Non-Repeatable Read, Phantom Read*.
- **Write Conflict Resolution**: Applying *Pessimistic Locking* (\`SELECT ... FOR UPDATE\`) vs *Optimistic Locking* (\`@Version\`) and avoiding *Deadlocks*.

### Advanced Caching Strategies (Redis)
- **Caching Patterns**: *Cache-Aside*, *Write-Through*, *Write-Behind*.
- **Production Cache Failures**:
  - **Cache Stampede / Thundering Herd**: Concurrent requests hitting DB when cache expires.
  - **Cache Avalanche**: Mass key expiration at the same timestamp.
  - **Cache Penetration**: Continuous requests for non-existent keys in both Cache and DB.
- **Distributed Locking**: Distributed locks using Redis (*Redlock algorithm*) ensuring single-instance execution.

---

## 2. 🏗️ Architecture & System Design

### Event-Driven & Message Queue
- **RabbitMQ Deep Dive**: Exchange types (*Direct, Topic, Fanout, Headers*), Dead Letter Queue (DLQ), Retry Mechanism, Acknowledgement modes (Manual ACK vs Auto ACK).
- **Apache Kafka**: Topic, Partition, Consumer Group, Event Streaming & Replay, comparing with RabbitMQ.

### Distributed Patterns
- **Idempotency**: Designing APIs handling duplicate requests without duplicating orders/payments (using Idempotency-Key & Redis SETNX / DB Unique Constraints).
- **Transactional Outbox Pattern**: Ensuring atomicity between DB writes and Queue Event publishing within a single Local Transaction.
- **Saga Pattern**: Managing cross-microservice transactions via *Choreography* or *Orchestration* with *Compensating Transactions* without 2PC.

### Resilience
- **Rate Limiting**: *Token Bucket*, *Leaky Bucket*, *Fixed Window*, *Sliding Window* algorithms.
- **Circuit Breaker**: System fault tolerance using *Resilience4j* (CLOSED, OPEN, HALF-OPEN states).
- **Exponential Backoff**: Retry strategy with exponential wait time and Jitter.

---

## 3. ☁️ Cloud & DevOps

### Cloud Core (AWS / GCP)
- **Compute**: EC2, Cloud Run / AWS ECS (Docker containers), AWS Lambda (Serverless functions).
- **Storage & Database**: S3 / Cloud Storage, Managed Relational Databases (AWS RDS PostgreSQL).
- **Network & Security**: IAM (Permissions, Roles, Policies), VPC Basics, API Gateway, Load Balancers.

### CI/CD & Containerization
- **CI/CD Pipelines**: Authoring **GitHub Actions / GitLab CI** pipelines automating linting, unit tests, building Docker images, and deploying.
- **Kubernetes (K8s) Basics**: Managing Pods, Services, Deployments, ConfigMap, Secret, Ingress Controller.

---

## 4. 🧪 Testing & Observability

### Integration Testing with Testcontainers
- Automatically spinning up real PostgreSQL, Redis, and RabbitMQ Docker containers during Integration Tests (Spring Boot / NestJS) for realistic test execution.

### Observability
- **Structured Logging**: JSON formatted logs using Correlation ID / Trace ID to trace requests across microservices.
- **Metrics & Dashboards**: Collecting metrics via **Prometheus** and building real-time monitoring dashboards in **Grafana** (Response time, Error rate, JVM Heap, Throughput).
- **Distributed Tracing**: Tracing request flows using **OpenTelemetry / Jaeger**.

---

## 5. 💡 Milestone Checklist & Action Plan

| Phase | Core Objective | Practice Output |
| :--- | :--- | :--- |
| **Phase 1 (Short-term)** | Deep Postgres Optimization + Testcontainers + Outbox Pattern | Upgrade \`Car Management\` or \`BookSwapHub\` project with automated Integration Tests and Idempotent Payments. |
| **Phase 2 (Mid-term)** | Caching Patterns + RabbitMQ DLQ/Retry + Prometheus/Grafana | Build a simulated Order/Booking system under load with real-time latency & error rate Dashboards. |
| **Phase 3 (Long-term)** | AWS/GCP Core + GitHub Actions CI/CD + Kafka Basics | Full Cloud application deployment via automated CI/CD. |
`
}
