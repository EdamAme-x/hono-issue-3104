// websv.ts
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import consola from 'consola';
import color from 'picocolors';
import { onShutdown } from './scheduler';

const app = new Hono();

app.get('/', (c) => c.text('Hello Node.js!'));

const websv = serve({
	fetch: app.fetch,
	port: 8080,
});

//prettier-ignore
consola.info(color.green(`[WebSV] Web Server is ready on port ${color.cyan(8080)}`));

onShutdown(() => {
	consola.info(color.cyan('[WebSV] Called shutdown event'));
	websv.close();
	consola.info(color.red('[WebSV] Closed web server'));
});