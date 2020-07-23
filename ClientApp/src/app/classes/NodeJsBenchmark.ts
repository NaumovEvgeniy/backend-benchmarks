import {IBenchmark} from "./IBenchmark";
import {Socket} from 'ngx-socket-io';
import {SocketBenchmarkResult} from "./SocketBenchmarkResult";

export class NodeJsBenchmark implements IBenchmark {

	constructor(private socket: Socket) {
	}

	getName(): string {
		return "NodeJs";
	}

	closeSocket(): Promise<void> {
		return Promise.resolve(undefined);
	}

	async initSocket(): Promise<void> {
		this.socket.on('waitForDataFromServer', data => {console.log('data', data); return Promise.resolve(undefined)});
	}


	async testDownload(): Promise<void> {
		this.socket.emit('getFileFromServer', data => {
		});
		return new Promise((resolve, reject) => {
			this.socket.on('stopReceiving', data => {
				resolve();
			});
		})
	}

	async testUpload(file: string): Promise<void> {
		await this.socket.emit('getFileFromClient', file);
	}

	finishUpload(): Promise<void> {
		return Promise.resolve(undefined);
	}

}
