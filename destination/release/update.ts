import {platform} from "os"
import { destinationSettings } from "./destination.settings"
import { chmodSync, cpSync, existsSync, rmSync, writeFileSync } from "fs"
import { spawn } from "child_process"

const platformTagMap: Record<ReturnType<typeof platform>, "macOS" | "Windows" | "unknown"> = {
    darwin: "macOS",
    win32: "Windows",
    aix: "unknown",
    android: "unknown",
    cygwin: "unknown",
    freebsd: "unknown",
    haiku: "unknown",
    linux: "unknown",
    netbsd: "unknown",
    openbsd: "unknown",
    sunos: "unknown",
}

export function getPlatformTag() {
    return platformTagMap[platform()]
}

export function getAppName() {
    return destinationSettings.appName
}

export function getPlatformAppName() {
    return `${getAppName()}-${getPlatformTag()}`
}

export async function autoUpdateReducer() {

    /*
        1. Have `./test` download the updated exe to `./test-new`
        2. Have `./test` run `./test-new`
        3. Have `./test-new` kill `./test`
        4. Have `./test-new` copy itself to `./test`
        5. Have `./test-new` run `./test`
        6. Have `./test` kill `./test-new`
        7 Have `./test` remove `./test-new`
    */

   await async function if_HasUpdate_BeginUpdate
   (){
        console.log("if_HasUpdate_BeginUpdate")
        const updateUrl
            = `${destinationSettings.hostUrl}/releases/latest`
        const redirectedResponse
            = await fetch(updateUrl)
        const latestVersion
            = redirectedResponse.url.split("/").pop()!

        if(destinationSettings.version == latestVersion)
            return true
        console.log("if_HasUpdate_BeginUpdate")
        const binaryDownload = await fetch(`${destinationSettings.hostUrl}/releases/download/${latestVersion}/${getPlatformAppName()}`)
        const fileTempPath = `${process.execPath}_UPDATED`
        writeFileSync(fileTempPath, Buffer.from(await binaryDownload.arrayBuffer()))

        if (platform() !== 'win32') 
            chmodSync(fileTempPath, '755')

        const childProcess = spawn(fileTempPath, [], {
            detached: true,
            stdio: 'ignore',
        })
    
        childProcess.unref()
        process.exit()
   }() && 
   await async function elseIf_IsUpdating_FinishUpdate
   (){
        console.log("elseIf_IsUpdating_FinishUpdate")
        const index = process.execPath.lastIndexOf("_UPDATED")
            
        if(index < 0)
            return true
        console.log("elseIf_IsUpdating_FinishUpdate")
        const originalPath = process.execPath.slice(0, index)
        
        await new Promise((r) => setTimeout(r, 1_000))
        
        rmSync(originalPath, {force: true})
        cpSync(process.execPath, originalPath, {force: true})

        const childProcess = spawn(originalPath, [], {
            detached: true,
            stdio: 'ignore',
        });
    
        childProcess.unref();
        process.exit();
   }() &&
   await async function elseIf_JustUpdated_Clean
   (){
        console.log("elseIf_JustUpdated_Clean")
        await new Promise((r) => setTimeout(r, 1_000))
        
        const cleanupNeeded = existsSync(`${process.execPath}_UPDATED`)

        if(!cleanupNeeded)
            return true
        console.log("elseIf_JustUpdated_Clean")
        rmSync(`${process.execPath}_UPDATED`, {force: true})
   }()
}