export type CodeBlockResponse = {
    codeBlocks: CodeBlock[];
}

export type CodeBlock = {
    language: string;
    time: string;
    code: string;
}

export type CodeBlockDTO = {
    language: string;
    time: string;
}