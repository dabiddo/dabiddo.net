---
##layout: ../layouts/Blogpost.astro
title: 'Live Soccer match with NestJs and SSE'
description: "Live Soccer match with NestJs and SSE"
image:
    url: 'https://media.publit.io/file/Yamazaki.png' 
    alt: 'My Avatar'
pubDate: 2026-08-15
jpn: '#'
author: 'Dabiddo'
tags: ["nestjs", "sse"]
---
# Building a Live Soccer Match Feed with NestJS and SSE

With the whole World Cup craze behind us, I wanted to tackle this small project. While visiting the FIFA website to check out scores, I came across their live match feed and became curious about how it worked and whether I could replicate it.

The easiest way would be to set up a WebSocket connection and call it a day, but when there is no activity, WebSockets tend to close the connection idle timeout. That led me to Server-Sent Events (SSE). While most of my projects are built in Laravel, native SSE isn't directly supported out of the box, so I turned to NestJS, which supports SSE out of the box.

The idea is simple: have a `match/:uuid/stream` route that notifies subscribers whenever a new event occurs (`goal` or `log`). Based on that event type, the frontend can either make an API call to retrieve the latest data or simply read the payload sent directly inside the SSE event.

## NestJS API Setup

It's been a while since I last worked with NestJS, but thankfully this pet project doesn’t require too much boilerplate.

`match.controller.ts`

```ts
import { Controller, Get, Post, Sse, Body, Param } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { MatchService } from './match.service';

@Controller('api/match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  // 1. GET current score
  @Get(':uuid')
  getScore(@Param('uuid') uuid: string) {
    return this.matchService.getScore(uuid);
  }

  // 2. SSE Stream (Filtered by Match UUID)
  @Sse(':uuid/stream')
  streamMatch(@Param('uuid') uuid: string): Observable<any> {
    return this.matchService.getEventStream().pipe(
      filter((event) => event.matchUuid === uuid),
      map((event) => ({
        data: event.data,
        type: event.type, // 'goal' or 'log'
      })),
    );
  }

  // 3. POST endpoint to trigger events locally
  @Post(':uuid/event')
  createEvent(
    @Param('uuid') uuid: string,    @Body() body: { type: 'goal' | 'log'; description: string; score?: { local: number; visitor: number } },  ) {
    return this.matchService.updateMatch(uuid, body.type, body.description, body.score);
  }
}
```

`match.service.ts`

```ts
import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

export interface MatchEvent {
  matchUuid: string;
  type: 'goal' | 'log';
  data: {
    description: string;
    score: { local: number; visitor: number };
    timestamp: string;
  };
}

@Injectable()
export class MatchService {
  // Global stream of match events
  private events$ = new Subject<MatchEvent>();

  // In-memory store for scores keyed by UUID
  private scores = new Map<string, { local: number; visitor: number }>();

  getEventStream() {
    return this.events$.asObservable();
  }

  getScore(matchUuid: string) {
    return this.scores.get(matchUuid) || { local: 0, visitor: 0 };
  }

  updateMatch(matchUuid: string, type: 'goal' | 'log', description: string, score?: { local: number; visitor: number }) {
    if (score) {
      this.scores.set(matchUuid, score);
    }

    const currentScore = this.getScore(matchUuid);

    const eventPayload: MatchEvent = {
      matchUuid,
      type,
      data: {
        description,
        score: currentScore,
        timestamp: new Date().toISOString(),
      },
    };

    // Emit event to all active SSE subscribers
    this.events$.next(eventPayload);
    return eventPayload;
  }
}
```

Next, register them in `app.module.ts`:

```ts
@Module({
  imports: [],
  controllers: [AppController, HealthController, MatchController],
  providers: [AppService, MatchService],
})
export class AppModule {}
```

Everything is hardcoded in memory for now since the goal is just to verify that the stream pipeline works.

## Testing the Setup

1. Open your browser and navigate to `http://localhost:3000/api/match/match-123/stream`. You'll notice the browser tab stays open in a pending/loading state, waiting for incoming stream events.
  
2. Open a terminal and trigger an event via `cURL`:
  

```bash
curl -X POST http://localhost:3000/api/match/match-123/event \
  -H "Content-Type: application/json" \
  -d '{    "type": "goal",    "description": "GOAL! Magnificent strike from outside the box!",    "score": { "local": 1, "visitor": 0 }  }'
```

As soon as the request hits the server, the browser stream will immediately log the new event without closing the connection.