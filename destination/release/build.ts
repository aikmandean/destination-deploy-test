import {renameSync, mkdirSync, rmSync, statSync, readdirSync, cpSync} from "fs"
import {execSync} from "child_process"
import { getPlatformAppName } from "./update"
const {chdir} = process

rmSync(`dist`, {force: true, recursive: true})

execSync(`npx tsc-transpile-only`)

execSync(`npx pkg package.json --compress Brotli --target node18 --output exec`)

const outputFileName = readdirSync(`.`).find(fileName => fileName.includes(`exec`))!

mkdirSync(`dist/MyApp`, {recursive: true})

renameSync(outputFileName, `dist/MyApp/${getPlatformAppName()}`)