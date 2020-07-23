import { IBenchmark } from "./IBenchmark";
import { SocketBenchmarkResult } from "./SocketBenchmarkResult";

export class NodeJsBenchmark implements IBenchmark {

	constructor() {
	}

	getName(): string {
		return "NodeJs";
	}

	closeSocket(): Promise<void> {
		return Promise.resolve(undefined);
	}

	initSocket(): Promise<void> {
		return Promise.resolve(undefined);
	}

	testDownload(): Promise<void> {
		return Promise.resolve(undefined);
	}

	testUpload(file: string): Promise<void> {
		return Promise.resolve(undefined);
	}

	finishUpload(): Promise<void> {
		return Promise.resolve(undefined);
	}

}
