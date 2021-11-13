import { container } from "../container"
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