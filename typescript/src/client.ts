import {Widget, StringField} from './scout/scout';
import "./scout/util/strings.js";

function show() {
    // the first two objects are from the (typescripted) scout module
    var widget = new Widget();
    widget.foo();

    var stringField = new StringField();
    stringField.foo();

    // this is a 'legacy' utility, where no typescript but only javascript exists
    // The compiler uses strings.d.ts for type-checks, but since this file is only the definition
    // of an interface an contains no code at all, someone must still load the actual .js file
    // we do this with the import statement above.
    // TODO: i dont understand at all how the 'strings.d.ts' file is found? it's not referenced anywhere!?
    // but obviously it is used by TSC and also the IDE, because if i change something in it, i do get
    // compile errors.
    console.log('Do the concat', strings.concat('x','y'));
}

show();