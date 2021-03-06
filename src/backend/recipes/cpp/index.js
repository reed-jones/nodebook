const { defaultInitNotebook } = require('../defaultInitNotebook');
const stdExec = require('../../stdexec');
const stdExecDocker = require('../../stdexecdocker');

const recipe = ({
    key: 'cpp',
    name: 'C++14',
    language: 'C++',
    mainfile: ['index.cpp', 'main.cpp'],
    cmmode: 'clike',
    dir: __dirname,
    exec: ({ notebook, docker, writeStdOut, writeStdErr, writeInfo }) => {
        let command;

        if (docker) {
            return stdExecDocker({
                image: 'gcc:latest',
                cmd: ['sh', '-c', "g++ -std=c++14 -Wall -o /tmp/code.out /code/" + notebook.mainfilename + " && /tmp/code.out"],
                cwd: '/code',
                mounts: [
                    { from: notebook.absdir, to: '/code', mode: 'rw' },
                ],
            }, writeStdOut, writeStdErr, writeInfo);
        } else {
            return stdExec([
                'sh', '-c', "g++ -std=c++14 -Wall -o /tmp/code.out '" + notebook.abspath + "' && /tmp/code.out"
            ], writeStdOut, writeStdErr, writeInfo);
        }
    },
    init: async ({ name, notebookspath }) => await defaultInitNotebook(recipe, notebookspath, name),
});

module.exports = recipe;