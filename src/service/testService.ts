import { container } from "../ioc"
import TYPES from "../TYPEs"

interface ITestService {
    log(str: string): void
}

export class TestService implements ITestService {
    log(str: string) {
        console.log("testService====", str)
    }
    add(a: number, b: number) {
        return a + b
    }
}
container.bind(TYPES.testService, () => new TestService())