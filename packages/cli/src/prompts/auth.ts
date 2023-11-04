import prompts from 'prompts'

interface PromptReturn {
    includeAuth: boolean
}

export async function promptAuth(): Promise<PromptReturn> {
    const { includeAuth } = await prompts({
        type: 'confirm',
        name: 'includeAuth',
        message: 'Include auth?'
    })

    return {
        includeAuth
    }
}
