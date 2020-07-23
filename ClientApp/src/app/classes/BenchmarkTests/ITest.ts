import { BenchmarkTestResult } from "./BenchmarkTestResult";
import { IBenchmark } from "../IBenchmark";
import { IIterableResult } from "../IIterableResult";

export interface ITest {
	getId(): string;
	getDescription(): string;
	doTest(testClass: IBenchmark): Promise<BenchmarkTestResult<IIterableResult>>;
}
