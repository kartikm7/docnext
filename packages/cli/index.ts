#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander"
import { createSpinner } from "nanospinner";
import { exec } from "node:child_process"
import figlet from "figlet"
import gradient from "gradient-string"
import { confirm } from '@inquirer/prompts';
import { existsSync, mkdirSync, readdirSync, rmSync, writeFile } from "node:fs";
import path, { join } from "node:path";
import { downloadFile } from "./utils/utils";

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
  .version('1.0.3')
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
        console.log(` Sorry  ` + gradient.morning('DocNext ') + `could not be of help :/` )
        process.exit(0)
      }
    }
    // current directory
    const currentDir = process.cwd()
    const spinner = createSpinner(' Cleaning the Files...').start()
    const docsDirectory = path.join(currentDir, 'src', 'app', 'docs')
    const contents = readdirSync(docsDirectory)
    // deleting the folder contents
    for (let idx = 0; idx < contents.length; idx++) {
      const content = contents[idx]
      // layout and page are also located at the root
      if (content != 'boilerplate' && content != 'layout.tsx' && content != 'page.mdx') {
        rmSync(path.join(docsDirectory, content), { recursive: true, force: true })
      }
    }

    spinner.success({ text: ' Have fun ' + gradient.morning('documenting!') })
    process.exit(0)
  })

program.command('init')
  .description('add docnext to an existing project')
  .action(async () => {
    await welcome();
    const command = "npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx"
    const yes = program.opts().yes;
    // incase there is no flag
    console.log(chalk.black.bgYellow(' Please make sure you are in the root of the project  \n Note: This only works for a Next.js project w/ App Router and it will also override the existing next.config.mjs'))
    if (!yes) {
      const prompt1 = await confirm({ message: ' Are you sure?' })
      if (!prompt1) {
        console.log("You can use this command " + gradient.morning('when you are ready!'))
        process.exit(0)
      }
    }
    const spinner = createSpinner(chalk.yellow(' Installing dependencies...')).start()
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

    // checking if there is a src folder
    const currentDir = process.cwd()
    const contents = readdirSync(currentDir)
    const check = contents.find(val => val == 'src')
    let destination = process.cwd()
    spinner.update({text: " "})
    rmSync(path.join(destination, 'next.config.mjs'), { force: true })
    let url = "https://raw.githubusercontent.com/kartikm7/docnext/refs/heads/master/template/next.config.mjs"
    let fileName = "next.config.mjs"
    let download = await downloadFile(url, fileName, destination)
    if(!download){
      spinner.error({ text: ' Some error has occured!' }) 
      process.exit(1)
    }

    // adding src incase
    if (check) destination = join(destination, 'src')
    spinner.update({ text: chalk.yellow(' Adding mdx-components.tsx') }).start()
    url = "https://raw.githubusercontent.com/kartikm7/docnext/refs/heads/master/template/src/mdx-components.tsx"
    fileName = "mdx-components.tsx"
    download = await downloadFile(url, fileName, destination)
    if(!download){
      spinner.error({ text: ' Some error has occured!' }) 
      process.exit(1)
    }

    // creating the docs route
    spinner.update({ text: chalk.yellow(' Adding a docs route') }).start()
    if(!existsSync(path.join(destination, 'app', 'docs'))) mkdirSync(path.join(destination, 'app','docs'))
    destination = path.join(destination, 'app','docs','page.mdx')
    
    writeFile(destination, '# Hello World', 'utf-8' ,(err)=>{
      spinner.error({text: String(err)})
      process.exit(1)
    })
    spinner.success({ text: ' Have fun ' + gradient.morning('documenting!') })
    process.exit(0)
  })

program.parse();