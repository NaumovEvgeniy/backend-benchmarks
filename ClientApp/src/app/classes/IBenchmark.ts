import { SocketBenchmarkResult } from "./SocketBenchmarkResult";

export interface IBenchmark {
	getName(): string;
	initSocket(): Promise<void>;
	testUpload(file: string): Promise<void>;
	finishUpload(): Promise<void>;
	testDownload(): Promise<void>;
	closeSocket(): Promise<void>;
}
