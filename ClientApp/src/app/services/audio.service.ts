import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AudioService {

	constructor() {
	}

	public async downloadTestSample(): Promise<string> {
		const response = await fetch('/assets/test.aac');
		return response.text();
	}
}
