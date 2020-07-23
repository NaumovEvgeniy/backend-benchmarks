import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr";
import { DotnetBenchmark } from "./classes/DotnetBenchmark";
import { IBenchmark } from "./classes/IBenchmark";
import { NodeJsBenchmark } from "./classes/NodeJsBenchmark";
import { AudioService } from "./services/audio.service";
import { SocketTest } from "./classes/BenchmarkTests/SocketTest";
import { ITest } from "./classes/BenchmarkTests/ITest";
import { BenchmarkTestResult } from "./classes/BenchmarkTests/BenchmarkTestResult";
import { IIterableResult } from "./classes/IIterableResult";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	providers: [SocketTest]
})
export class AppComponent implements OnInit {
	title = 'app';

	benchmark: IBenchmark;

	testResults = new WeakMap<ITest, BenchmarkTestResult<IIterableResult>>();

	tests: ITest[] = [];

	constructor(
		socketTest: SocketTest
	) {
		// раскоментировать для теста nodejs
		// this.benchmark = new NodeJsBenchmark();
		this.benchmark = new DotnetBenchmark();

		this.tests.push(socketTest);
	}

	startTransfer() {
	}

	async ngOnInit(): Promise<void> {
	}

	async startTest(test: ITest) {
		this.testResults.set(test, undefined);
		this.testResults.set(test, await test.doTest(this.benchmark));
		console.log(this.testResults.get(test))
	}
}
