import * as minimist from 'minimist';
import { ParsedArgs } from "@scatter/cli/ParsedArgs";
import { Option } from "@scatter/cli/Option";

export function parseArgs<T extends ParsedArgs>(args: string[], options: Option[], isOptionSupported = (_: Option) => true): T {

    const alias: {
        [key: string]: string;
    } = {};
    const string: string[] = [];
    const boolean: string[] = [];

    for (let o of options) {
        if (isOptionSupported(o)) {
            if (o.alias) {
                alias[o.id] = o.alias;
            }
        }
        if (o.type === 'string') {
            string.push(o.id);
            if (o.deprecates) {
                string.push(o.deprecates);
            }
        }
        else if (o.type === 'boolean') {
            boolean.push(o.id);
            if (o.deprecates) {
                boolean.push(o.deprecates);
            }
        }
    }

    // remote aliases to avoid confusion
    const parsedArgs = minimist(args, { string, boolean, alias }) as unknown as T;
    for (let o of options) {
        if (o.alias) {
            delete parsedArgs[o.alias];
        }
        if (o.deprecates && parsedArgs.hasOwnProperty(o.deprecates) && !parsedArgs[o.id]) {
            parsedArgs[o.id] = parsedArgs[o.deprecates];
            delete parsedArgs[o.deprecates];
        }
    }
    return parsedArgs;
}
