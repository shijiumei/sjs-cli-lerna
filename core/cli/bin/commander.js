const pkg = require('../package.json');
const commander = require('commander');

// 获取commander的单例
// const { program } = commander;

const program = new commander.Command();

program
    .name(Object.keys(pkg.bin)[0])
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启调试模式', false)
    .option('-e, --envName <envName>', '获取环境变量名称');

// console.log(program.opts().debug);

// console.log(program.opts());
// program.outputHelp();

// command 注册命令
const clone = program.command('clone <source> [destination]');
clone.description('clone a repository')
    .option('-f, --force', '是否强制克隆')
    .action((source, destination, cmdObj) => {
        console.log('do clone', source, destination, cmdObj.force);
    });

// addCommand 注册子命令
const service = new commander.Command('service');
service
    .command('start [port]')
    .description('start service at some prot')
    .action((port) => {
        console.log('do service start', port);
    });
service
    .command('stop')
    .description('stop service')
    .action(() => {
        console.log('stop service');
    });

program.addCommand(service);

program
    .command('install [name]', 'install package', {
        executableFile: 'ls',
        // isDefault: true,
        hidden: true
    })
    .alias('i');

// program
//     .arguments('<cmd> [options]')
//     .description('test command', {
//         cmd: 'command to run',
//         options: 'options for command',
//     })
//     .action(function (cmd, options) {
//         console.log(cmd, options);
//     });

// console.log('-----------------------');
// console.log(program.outputHelp());
// console.log(program.helpInformation());
// console.log('----------------------- end');

// 高级定制1：自定义help信息
// program.helpInformation = function() { 
//     return 'xxx'; 
// }

// program.on('--help', function() {
//     console.log('your help information');
// });

// 高级定制2：实现debug模式
program.on('option:debug', function() {
    //console.log('debug', program.opts().debug);
    if(program.opts().debug){
        process.env.LOG_LEVEL = 'verbose';
    }
    console.log(process.env.LOG_LEVEL);
});

// 高级定制3： 对未知命令监听
program.on('command:*', function(obj) {
    console.log(obj);
    console.error('未知的命令:' + obj[0]);
    console.log(program.commands[0].name());

    const availableCommands = program.commands.map(cmd => cmd.name());
    console.log(availableCommands);
    console.log('可用命令：' + availableCommands.join(','));
});

program.parse(process.argv);