// That's a module, there's no need to use a keyword or something else
// Also a module seems to be better as a namespace for some reason:
// https://hacks.mozilla.org/2015/08/es6-in-depth-modules/
// https://www.typescriptlang.org/docs/handbook/namespaces-and-modules.html

export function nvl(value:any, defaultValue:any):any {
    if (value === null || value === undefined) {
        return defaultValue;
    } else {
        return value;
    }
}

export {Widget} from './widget/Widget';
export {StringField} from './field/stringfield/StringField';

