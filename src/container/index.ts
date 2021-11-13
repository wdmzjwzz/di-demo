import TYPES from "../TYPEs";
import { getParams, hasKey } from "./utils";
interface ClassInfo {
    clazz: { new(...args: any[]): {} },
    args: Array<any>
}
class CreateIoc {
    static _instance: CreateIoc;
    public container: Map<symbol, ClassInfo>;
    constructor() {
        this.container = new Map();
    }
    get(namespace: symbol) {
        const target = this.container.get(namespace);
        if (!target) {
            return null
        }
        const { clazz, args } = target;
        return Reflect.construct(clazz, args);
    }
    bind<T extends { new(...args: any[]): {} }>(identifier: symbol, clazz: T, constructorArgs?: Array<any>) {
        this.container.set(identifier, {
            clazz,
            args: constructorArgs || []
        });
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