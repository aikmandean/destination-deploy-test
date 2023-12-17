export const destinationSettings = {
    appName: "Demo",
    repoUrl: "https://github.com/aikmandean/destination-deploy-test",
    version: "v0.3.7"
} satisfies {
    /** GITHUB SAFE APP NAME, LETTERS ONLY */
    appName: string
    repoUrl: string
    version: `v${any}`
}