import { ITest } from "./ITest";
import { IBenchmark } from "../IBenchmark";
import { BenchmarkTestResult } from "./BenchmarkTestResult";
import { SocketBenchmarkResult } from "../SocketBenchmarkResult";
import { Injectable } from "@angular/core";
import { AudioService } from "../../services/audio.service";

@Injectable()
export class SocketTest implements ITest {

	getId(): string {
		return 'socket-test';
	}

	getDescription(): string {
		return "Тестирование производительности сокетов";
	}

	constructor(private audioService: AudioService) {
	}

	async doTest(testClass: IBenchmark): Promise<BenchmarkTestResult<SocketBenchmarkResult>> {
		const startTime = new Date().getTime();
		await testClass.initSocket();

		const uploadTime = await this.upload(testClass);
		const downloadTime = await this.download(testClass);

		await testClass.closeSocket();
		const endTime = new Date().getTime();
		return new BenchmarkTestResult<SocketBenchmarkResult>(endTime - startTime, new SocketBenchmarkResult(uploadTime, downloadTime));
	}

	private async upload(testClass: IBenchmark): Promise<number> {
		const binaryAudio = await this.audioService.downloadTestSample()
		const timeBeforeUpload = new Date().getTime();
		for(let i = 0; i < 1000; i++){
			await testClass.testUpload(binaryAudio);
			break;
		}
		const timeAfterUpload = new Date().getTime();
		return timeAfterUpload - timeBeforeUpload;
	}

	private async download(testClass: IBenchmark): Promise<number> {
		const timeBeforeDownload = new Date().getTime();
		await testClass.testDownload();
		const timeAfterDownload = new Date().getTime();
		return timeAfterDownload - timeBeforeDownload;
	}
}
