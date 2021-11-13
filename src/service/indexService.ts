
interface IIndexService {
    log(str: string): void
}

export class IndexService implements IIndexService {
    log(str: string) {
        console.log("IndexService====", str)
    }
    add(a: number, b: number) {
        return a + b
    }
}