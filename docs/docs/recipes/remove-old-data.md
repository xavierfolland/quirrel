---
title: Remove Old Data
---

If you regularly need to purge old data, [`CronJob`](https://docs.quirrel.dev/api/cronjob) is a great fit.

```ts title="api/remove-old-data.ts"
import { subDays } from 'date-fns'
import db from 'db'
import { CronJob } from 'quirrel/blitz'

export default CronJob(
  'api/remove-old-data', // 👈 the route that it's reachable on
  '0 * * * *', // same as @hourly (see https://crontab.guru/)
  async () => {
    await db.logs.deleteMany({
      where: {
        customer: {
          isPremium: false,
        },
        date: {
          lt: subDays(Date.now(), 3),
        },
      },
    })
  },
)
```
