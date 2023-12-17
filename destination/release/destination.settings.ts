export const destinationSettings = {
    appName: "Demo",
    repoUrl: "https://github.com/aikmandean/pkg-auto-update",
    version: "v0.4.0"
} satisfies {
    /** GITHUB SAFE APP NAME, LETTERS ONLY */
    appName: string
    repoUrl: string
    version: `v${any}`
}