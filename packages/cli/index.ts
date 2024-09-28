#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander"
import { createSpinner } from "nanospinner";
import { exec } from "node:child_process"
import figlet from "figlet"
import gradient from "gradient-string"
import { confirm } from '@inquirer/prompts';
import { readdirSync, rmSync } from "node:fs";
import path from "node:path";

const program = new Command();

async function welcome(): Promise<void> {
  await new Promise<void>(resolve => figlet("DocNext", (err, msg) => {
    console.log(gradient.morning(msg))
    resolve()
  }))
  console.log(gradient.morning(' Next.js template for documentation!'))
  console.log(gradient.morning(' https://docnext.llocal.in'))
  console.log()
}

program
  .name('docnext')
  .description('CLI to make documentation easier!')
  .version('1.0.1')
  .option('-y, --yes', 'bypass checks')

program.parse(process.argv);

program.command('create [projectName]')
  .description('create a DocNext project')
  .action(async (projectName) => {
    await welcome()
    const command = `npx create-next-app -e https://github.com/kartikm7/docnext/tree/master/template ${projectName ?? '.'}`
    const spinner = createSpinner(' Cloning the repository...').start()

    // here we are cloning the repository
    await new Promise<void>((resolve, reject) => {
      exec(command, (err, stdout, stderr) => {
        // incase it fails, we are exiting the cli
        if (err) {
          spinner.error({ text: String(err) })
          reject(err)
          process.exit(1)
        }
        // incase it does not fail we move onto the next step
        resolve()
      })
    })
    // installing the dependencies
    const npmi = projectName ? `cd ${projectName} && npm i` : `npm i`
    spinner.update({ text: chalk.yellow(' Installing dependencies...') }).start()
    await new Promise<void>((resolve, reject) => {
      exec(npmi, (err, stdout, stderr) => {
        if (err) {
          spinner.error({ text: String(err) })
          reject(err)
          process.exit(1)
        }
        spinner.success({ text: chalk.green(' Voila done!') })
        resolve()
      })
    })
    process.exit(0)
  });

program.command('clean')
  .description('cleans up the template')
  .action(async () => {
    await welcome()
    const yes = program.opts().yes;
    // incase there is no flag
    console.log('This deletes the template files, giving you a blank slate')
    console.log(chalk.black.bgYellow(' Please make sure you are in the root of the project '))
    if (!yes) {
      const prompt1 = await confirm({ message: 'Are you sure?' })
      if (!prompt1) {
        console.log("You can use this command "+ gradient.morning('when you are ready!'))
        process.exit(0)
      }
    }
    // current directory
    const currentDir = process.cwd()
    const spinner = createSpinner(' Cleaning the Files...').start()
    const docsDirectory = path.join(currentDir, 'src', 'app', 'docs')
    const contents = readdirSync(docsDirectory)
    // deleting the folder contents
    for(let idx = 0; idx < contents.length; idx++ ){
      const content = contents[idx]
      // layout and page are also located at the root
      if(content != 'boilerplate' && content != 'layout.tsx' && content != 'page.mdx'){ 
        rmSync(path.join(docsDirectory,content),{recursive:true,force: true})
      }
    }

    spinner.success({text: ' Have fun '+gradient.morning('documenting!')})
    process.exit(0)
  })

program.parse();