import { IBenchmark } from "./IBenchmark";
import { HubConnection, HubConnectionBuilder, LogLevel, Subject } from "@microsoft/signalr";

export class DotnetBenchmark implements IBenchmark {

	private connection: HubConnection;

	private uploadAudioSubject: Subject<string>

	constructor() {
	}

	getName(): string {
		return ".NET Core 3.1";
	}

	async initSocket(): Promise<void> {
		this.connection = new HubConnectionBuilder()
			.withUrl("/hub")
			// .configureLogging(LogLevel.Trace)
			.build();
		await this.connection.start();

		this.uploadAudioSubject = new Subject<string>();
		await this.connection.send("SendAudio", this.uploadAudioSubject);
	}

	async testDownload(): Promise<void> {
		this.connection.stream("ReceiveFile").subscribe({
			next(value: any): void {
			},
			complete(): void {
			},
			error(err: any): void {
			}
		})
		return new Promise(resolve => {
			this.connection.on("FinishReceiveFile", () => resolve());
		});
	}

	async testUpload(file: string): Promise<void> {
		await this.uploadAudioSubject.next(file);
	}

	async finishUpload(): Promise<void> {
		this.uploadAudioSubject.complete();
	}

	async closeSocket(): Promise<void>{
		await this.connection.stop();
	}
}
