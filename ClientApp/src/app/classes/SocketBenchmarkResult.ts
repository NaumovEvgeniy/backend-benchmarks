import { IIterableResult } from "./IIterableResult";

export class SocketBenchmarkResult implements IIterableResult {
	constructor(private _uploadTime: number, private _downloadTime: number) {
	}

	get uploadTime(): number {
		return this._uploadTime;
	}

	get downloadTime() {
		return this._downloadTime;
	}

	iterateResult(): {[name: string]: string} {
		return {
			"Время закачивания": this.uploadTime.toString(),
			"Время скачивания": this.downloadTime.toString(),
		};
	}


}
