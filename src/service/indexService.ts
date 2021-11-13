import { container } from "../container/index"
interface IIndexService {
    log(str: string): void
}
console.log(container.get)
export class IndexService implements IIndexService {
    public a: number
    constructor(a: number) {
        this.a = a
    }
    log(str: string) {
        console.log("IndexService====", str)
    }
    add(a: number, b: number) {
        return a + b
    }
}