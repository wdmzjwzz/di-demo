import TYPES from "../TYPEs";
import { getParams, hasKey } from "./utils";

class CreateIoc {
    static _instance: CreateIoc;
    public container: Map<symbol, { callback: Function }>;
    constructor() {
        this.container = new Map();

    }
    get(namespace: symbol) {
        let item = this.container.get(namespace)
        if (item) {
            return item.callback()
        } else {
            throw new Error("not find name");

        }
    }
    bind(key: symbol, callback: Function) {
        this.container.set(key, { callback })
    }
    static getInstance() {
        if (!CreateIoc._instance) {
            CreateIoc._instance = new CreateIoc()
        }
        return CreateIoc._instance
    }
}
export const container = CreateIoc.getInstance()
export function controller<T extends { new(...args: any[]): {} }>(constructor: T) {

    class Controller extends constructor {
        constructor(...args: any[]) {
            super(args)
            const params: string[] = getParams(constructor)
            let ident: string
            for (ident of params) {
                if (hasKey(this, ident)) {
                    this[ident] = Reflect.getMetadata(TYPES[ident], constructor)

                }

            }
        }
    }
    return Controller
}
export function inject(serviceIdent: symbol): Function {
    return (target: Function, targetKey: string, index: number) => {
        if (!targetKey) {

            Reflect.defineMetadata(serviceIdent,
                container.get(serviceIdent),
                target
            )
        }
    }
}