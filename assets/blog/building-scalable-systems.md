# Building Scalable Systems

*6 min read*

Scalability isn't just about handling more users—it's about building systems that grow gracefully without requiring complete rewrites. Here's what I've learned building systems that need to scale.

## What Scalability Actually Means

```
Scalability = Growth Capacity / Added Complexity
```

A truly scalable system handles 10x load with less than 2x effort.

| Metric | Good Scaling | Bad Scaling |
|--------|--------------|-------------|
| 10x users | 2x servers, minor tweaks | Rewrite, new architecture |
| 10x data | Database config changes | Data migration nightmare |
| 10x features | Modular additions | Tangled dependencies |

## The Three Dimensions

### 1. Vertical Scaling (Up)
Add more power to existing machines.

```
Small VM → Large VM → Extra Large VM
$50/mo → $200/mo → $800/mo
```

**Pros**: Simple, no code changes
**Cons**: Has a ceiling, expensive at scale

### 2. Horizontal Scaling (Out)
Add more machines.

```
1 Server → 4 Servers → 16 Servers
$50/mo → $200/mo → $800/mo
```

**Pros**: Linear cost, high ceiling
**Cons**: Requires architectural support

### 3. Elastic Scaling (Auto)
Add/remove machines based on demand.

```
Low traffic: 2 servers
Peak time: 10 servers
Night: 1 server
```

**Pros**: Cost-efficient, handles spikes
**Cons**: More complex setup

## Architectural Patterns

### Stateless Services

```typescript
// Bad: State in memory
class UserSession {
  private sessions: Map<string, User> = new Map();
  
  getUser(token: string) {
    return this.sessions.get(token); // Lost on restart!
  }
}

// Good: External state
class UserSession {
  async getUser(token: string) {
    return await redis.get(`session:${token}`);
  }
}
```

Stateless services can scale horizontally without coordination.

### Database Patterns

```
Read-Heavy Workload:
Primary DB (writes) → Read Replicas (reads)

Write-Heavy Workload:
Sharding by user_id % N

Mixed Workload:
CQRS (Command Query Responsibility Segregation)
```

### Caching Layers

```
User Request
    ↓
CDN Cache (static assets)
    ↓
Application Cache (Redis)
    ↓
Database Query Cache
    ↓
Database
```

```typescript
// Multi-layer caching
async function getUser(id: string) {
  // L1: Memory cache (fastest, smallest)
  let user = memoryCache.get(id);
  if (user) return user;
  
  // L2: Redis cache (fast, shared)
  user = await redis.get(`user:${id}`);
  if (user) {
    memoryCache.set(id, user, '1m');
    return user;
  }
  
  // L3: Database (slowest, source of truth)
  user = await db.users.findById(id);
  await redis.set(`user:${id}`, user, 'EX', 3600);
  memoryCache.set(id, user, '1m');
  return user;
}
```

## Queue-Based Architecture

For async workloads:

```
API Request → Queue → Worker Pool → Result

Benefits:
- Decouple producers from consumers
- Handle traffic spikes
- Retry failed jobs
- Scale workers independently
```

```typescript
// Producer
await queue.add('processOrder', { orderId: '123' });

// Consumer (runs on separate workers)
queue.process('processOrder', async (job) => {
  await processOrder(job.data.orderId);
});
```

## The N+1 Query Problem

```typescript
// Bad: N+1 queries
const posts = await db.posts.findAll();
for (const post of posts) {
  post.author = await db.users.findById(post.authorId);
  // 100 posts = 101 queries!
}

// Good: Eager loading
const posts = await db.posts.findAll({
  include: [{ model: User, as: 'author' }]
});
// 100 posts = 2 queries
```

## Rate Limiting

Protect your system:

```typescript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requests per window
  message: 'Too many requests'
});

app.use('/api/', limiter);
```

## Monitoring at Scale

What to track:

```yaml
# Application metrics
- Request latency (p50, p95, p99)
- Error rate
- Throughput (requests/second)

# Infrastructure metrics
- CPU/Memory usage
- Disk I/O
- Network bandwidth

# Business metrics
- Active users
- Conversion rate
- Revenue per minute
```

## Load Testing

Test before scaling:

```bash
# Using k6
k6 run --vus 100 --duration 30s script.js
```

```javascript
// script.js
import http from 'k6/http';
import { check } from 'k6';

export default function () {
  const res = http.get('https://api.example.com/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 200ms': (r) => r.timings.duration < 200
  });
}
```

## Cost Optimization

```
Rule: Don't optimize prematurely, but plan for it

Phase 1 (0-1K users): Simple setup, monitor costs
Phase 2 (1K-10K): Optimize expensive queries, add caching
Phase 3 (10K-100K): Horizontal scaling, CDN, read replicas
Phase 4 (100K+): Custom solutions, dedicated infrastructure
```

## Common Mistakes

### 1. Premature Optimization
```
Don't: Build for 1M users on day one
Do: Build for 10x your current scale
```

### 2. Ignoring Database
```
Don't: Add servers to fix slow queries
Do: Add indexes, optimize queries first
```

### 3. Shared State
```
Don't: Store sessions in server memory
Do: Use Redis or external session store
```

## Quick Wins

1. **Add indexes** - Biggest impact for least effort
2. **Enable caching** - CDN for static, Redis for dynamic
3. **Optimize images** - Use WebP, lazy loading
4. **Database connection pooling** - Reuse connections
5. **Compression** - Gzip/Brotli for responses

> "Build for today, design for tomorrow. Scaling is a journey, not a destination."

---

*Scale incrementally. Measure continuously. Optimize deliberately.*
