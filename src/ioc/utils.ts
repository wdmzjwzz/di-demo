import { parseScript } from 'esprima'
import { Pattern } from "estree"
export function getParams(fn: Function) {
    let ast = parseScript(fn.toString())
    const node = ast.body[0]
    let params: Pattern[] = []
    const validParams: string[] = []
    if (node.type === "FunctionDeclaration") {
        params = node.params
    }
    params.forEach(param => {
        if (param.type === 'Identifier') {
            validParams.push(param.name)
        }
    })
    return validParams
}
export function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
    return obj.hasOwnProperty(key)
}