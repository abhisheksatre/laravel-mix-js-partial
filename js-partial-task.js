const Task = require('laravel-mix/src/tasks/Task');
const fs = require('fs');
const Path = require('path');

class JsPartialTask extends Task {

    constructor(data) {
        super(data);

        this.partialPath = data.partialPath;
        this.tempFolderPath = null;
        this.tempJsFilePath = null;

        this.init();
    }

    run() {
        this.updatePartial();
    }

    init(){

        const {entry, mix} = this.data;
        this.tempJsFilePath = this.getTempPath(entry);

        mix.js(entry, this.tempJsFilePath);

        /**
         * Delete temp directory
         */
        process.on('SIGINT', () => {
            this.cleanUp();
            process.exit();
        });
        process.on('exit', () => {
            this.cleanUp();
        });
    }

    /**
     * Create temp folder and return temp file path
     * @param filePath
     * @return {string}
     */
    getTempPath(filePath){

        if(Config.publicPath.trim() === ""){
            this.tempFolderPath = fs.mkdtempSync('node_modules' + '/temp-laravel-mix-js-partial');
        }else{
            this.tempFolderPath = fs.mkdtempSync(Config.publicPath + '/temp-laravel-mix-js-partial');
        }

        return this.tempFolderPath + '/' + Path.parse(filePath).name + ".js";
    }

    updatePartial(sourceFile = this.tempJsFilePath){
        fs.readFile(sourceFile, 'utf8', (err, data) => {
            if (err) {
                console.log('Unable to open file: ' + err);
                return;
            }

            const jsCode = `<script>${data}</script>`;

            fs.writeFile(this.partialPath, jsCode, (err) => {
                if (err){
                    throw err
                }

                console.log('\x1b[32m%s\x1b[0m', `JS Partial '${this.partialPath}' Updated`);
            });
        });
    }

    cleanUp(){
        this.deleteFolderRecursive(this.tempFolderPath);
    }

    /**
     * Delete folder recursively
     * @param path
     */
    deleteFolderRecursive(path) {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach((file, index) => {
                const curPath = Path.join(path, file);
                if (fs.lstatSync(curPath).isDirectory()) { // recurse
                    this.deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }

}
module.exports = JsPartialTask;
