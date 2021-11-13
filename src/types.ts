interface ITypes {
    [key: string]: symbol
}
const TYPES: ITypes = {
    indexService: Symbol.for('indexService'),
    testService: Symbol.for('testService')
}
export default TYPES