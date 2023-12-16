export const destinationSettings = {
    appName: "Demo",
    hostUrl: "https://github.com/aikmandean/destination-deploy-test",
    version: "v0.3.7"
} satisfies {
    /** GITHUB SAFE APP NAME, LETTERS ONLY */
    appName: string
    hostUrl: string
    version: `v${any}`
}