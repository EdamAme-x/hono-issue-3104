// utils/Scheduler.ts
import consola from 'consola';
import color from 'picocolors';
import { setTimeout } from 'timers/promises';

const closeListeners: any = [];

export async function shutdown() {
	consola.start(color.italic('Shutting down...'));
	try {
		await Promise.race([
			Promise.all(closeListeners.map((closeListener: any) => closeListener())),
			setTimeout(5000),
		]);
	} catch (e) {
		console.error(e);
	}
	consola.success(color.italic('Goodbye!'));
	process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

/**
 * @param {() => (void | Promise<void>)} task
 */
export function onShutdown(task: any) {
	closeListeners.push(task);
}