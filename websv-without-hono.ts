// websv.ts
import consola from 'consola';
import color from 'picocolors';
import { onShutdown } from './scheduler';

(async () => {
	await setTimeout(() => console.log("Timeout"), 10000)
})()

//prettier-ignore
consola.info(color.green(`[WebSV] Web Server is ready on port ${color.cyan(8080)}`));

onShutdown(() => {
	consola.info(color.cyan('[WebSV] Called shutdown event'));
	// websv.close();
	consola.info(color.red('[WebSV] Closed web server'));
});