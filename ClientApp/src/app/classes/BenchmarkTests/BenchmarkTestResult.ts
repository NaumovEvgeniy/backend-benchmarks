import { IIterableResult } from "../IIterableResult";

export class BenchmarkTestResult<T extends IIterableResult> {
	constructor(private _time: number, private _additionalData: T) {
	}

	get time(): number {
		return this._time;
	}

	get additionalData(): T {
		return this._additionalData;
	}
}
