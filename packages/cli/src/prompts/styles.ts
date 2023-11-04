import prompts from 'prompts'

interface PromptReturn {
    includeTailwind: boolean
}

export async function promptStyles(): Promise<PromptReturn> {
    const { includeTailwind } = await prompts({
        type: 'confirm',
        name: 'includeTailwind',
        message: 'Do you want to use TailwindCSS for styling?'
    })

    return {
        includeTailwind
    }
}
