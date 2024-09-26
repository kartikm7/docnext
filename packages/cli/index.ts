#!/usr/bin/env node

import chalk from "chalk";
import {Command} from "commander"
import { createSpinner } from "nanospinner";
import {exec} from "node:child_process"
import figlet from "figlet"
import gradient from "gradient-string"
const program = new Command();

async function welcome():Promise<void>{
  await new Promise<void>(resolve => figlet("DocNext", (err,msg)=>{
    console.log(gradient.morning(msg))
    resolve()
  }))
  console.log(gradient.morning(' Next.js template for documentation!'))
  console.log()
}

program
  .name('docnext')
  .description('CLI to make documentation easier!')
  .version('1.0.0')

program.parse(process.argv);

program.command('clone [projectName]')
  .description('Clone the documentation') 
  // .option('-n, --name <string>', 'name of the project', 'hello')
  .action(async (projectName) => {
    await welcome()
    const command = `npx create-next-app -e https://github.com/kartikm7/docnext/tree/master/template ${projectName ?? '.'}`
    const spinner = createSpinner(' Cloning the repository...').start()
        
    // here we are cloning the repository
    await new Promise<void>((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        // incase it fails, we are exiting the cli
        if(err){
          spinner.error({text:String(err)})
          reject(err)
          process.exit(1)
        }
        // incase it does not fail we move onto the next step
        resolve()
      })
    })    
    const npmi = projectName ? `cd ${projectName} && npm i` : `npm i`  
    spinner.update({text: chalk.yellow(' Installing dependencies...')}).start()
    await new Promise<void>((resolve, reject) => {
      exec(npmi, (err, stdout, stderr) => {
        if(err){
          spinner.error({text:String(err)})
          reject(err)
          process.exit(1)
        }
        spinner.success({text: chalk.green(' Voila done!')})
        resolve()
      })
    })
    process.exit(0)
  });

program.parse();