# Automation Best Practices

*5 min read*

Automation isn't just about writing scripts—it's about building systems that reduce manual effort reliably. After automating countless processes, here are the practices that actually work.

## The Automation Mindset

Before automating anything, ask:

1. **Is it repetitive?** - Done more than twice a week
2. **Is it consistent?** - Same steps every time
3. **Is it time-consuming?** - Takes more than 5 minutes
4. **Is it error-prone?** - Humans make mistakes

If yes to 3+, automate it.

## The ROI Calculation

```
Time saved per execution × Frequency per year > Development time × 2
```

| Task | Manual Time | Frequency | Annual Cost | Worth Automating? |
|------|-------------|-----------|-------------|-------------------|
| Deploy | 15 min | 100/year | 25 hours | Yes |
| Report | 30 min | 52/year | 26 hours | Yes |
| Backup check | 2 min | 365/year | 12 hours | Maybe |
| Onboarding | 2 hours | 12/year | 24 hours | Yes |

## Start Simple

```bash
# Bad: Complex from day one
#!/bin/bash
if [[ $ENV == "prod" ]] && [[ $BRANCH == "main" ]]; then
  # 200 lines of edge cases
fi

# Good: Simple, expand as needed
#!/bin/bash
npm run build && npm run deploy
```

## My Automation Stack

### Shell Scripts (Quick Tasks)
```bash
#!/bin/bash
# daily-backup.sh
pg_dump $DATABASE_URL > "backup_$(date +%Y%m%d).sql"
aws s3 cp "backup_$(date +%Y%m%d).sql" s3://backups/
```

### GitHub Actions (CI/CD)
```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - run: npm run deploy
```

### Python Scripts (Complex Logic)
```python
# data-sync.py
def sync_data():
    source = fetch_from_api()
    transformed = transform(source)
    load_to_database(transformed)
    notify_slack("Sync complete")
```

### Cron Jobs (Scheduled)
```
# Every day at 3am
0 3 * * * /home/user/scripts/daily-backup.sh

# Every Monday at 9am
0 9 * * 1 /home/user/scripts/weekly-report.py
```

## Error Handling Done Right

```python
import logging
from slack_sdk import WebClient

def safe_automation():
    try:
        result = do_the_thing()
        logging.info(f"Success: {result}")
    except ExpectedError as e:
        logging.warning(f"Expected issue: {e}")
        handle_gracefully(e)
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        notify_team(f"Automation failed: {e}")
        raise
```

### Rules:

1. **Log everything** - You'll need it for debugging
2. **Categorize errors** - Expected vs unexpected
3. **Notify on failure** - Don't let failures go silent
4. **Retry intelligently** - Exponential backoff

## Idempotency Matters

Automations should be safe to run twice:

```python
# Bad: Creates duplicates
def process_orders():
    for order in get_all_orders():
        create_invoice(order)  # Duplicate invoices!

# Good: Idempotent
def process_orders():
    for order in get_unprocessed_orders():
        if not invoice_exists(order.id):
            create_invoice(order)
            mark_as_processed(order.id)
```

## Testing Automation

```python
# test_automation.py
def test_backup_script():
    # Setup
    create_test_database()
    
    # Execute
    run_backup_script()
    
    # Assert
    assert backup_file_exists()
    assert backup_is_valid()
    
    # Cleanup
    delete_test_files()
```

## Documentation Template

```markdown
# Script: daily-backup.sh

## Purpose
Creates daily database backup and uploads to S3.

## Schedule
Daily at 3:00 AM UTC

## Dependencies
- pg_dump (PostgreSQL client)
- AWS CLI (configured with backup credentials)

## Environment Variables
- DATABASE_URL: Connection string
- S3_BUCKET: Target bucket name

## Failure Handling
- Retries 3 times with 1-minute delay
- Notifies #ops-alerts on failure

## Manual Execution
bash /scripts/daily-backup.sh

## Logs
/var/log/backups/daily-backup.log
```

## Monitoring

Track your automations:

```python
# Metrics to collect
metrics = {
    "execution_time": duration,
    "success": True/False,
    "records_processed": count,
    "errors": error_count
}

# Send to monitoring
send_to_datadog(metrics)
```

### Alert Thresholds

| Metric | Warning | Critical |
|--------|---------|----------|
| Duration | 2x average | 5x average |
| Success rate | < 99% | < 95% |
| Error count | > 5/hour | > 20/hour |

## Common Pitfalls

### 1. Hardcoding Values
```bash
# Bad
curl https://api.example.com/key/abc123

# Good
curl "https://api.example.com/key/$API_KEY"
```

### 2. Silent Failures
```bash
# Bad
cp file.txt backup/ 2>/dev/null

# Good
cp file.txt backup/ || { echo "Backup failed"; exit 1; }
```

### 3. No Cleanup
```python
# Bad
def process():
    create_temp_files()
    do_work()
    # temp files left behind!

# Good
def process():
    try:
        create_temp_files()
        do_work()
    finally:
        cleanup_temp_files()
```

## The Automation Hierarchy

1. **Manual** - Document the steps
2. **Script** - Automate the steps
3. **Scheduled** - Run automatically
4. **Self-healing** - Handle failures automatically
5. **Self-improving** - Optimize based on metrics

Start at 2, aim for 4.

> "The best automation is invisible. It just works, every time, without you thinking about it."

---

*Automate the boring stuff. Spend your time on what matters.*
