const mix = require('laravel-mix');
const JsPartialTask = require('./js-partial-task');

class jsPartial{

    name() {
        return ['jsPartial', 'jspartial'];
    }

    register(entry, partialPath) {
        Mix.addTask(new JsPartialTask({
            entry: entry,
            partialPath: partialPath,
            mix: mix
        }));
    }
}

mix.extend('jsPartial', new jsPartial());
