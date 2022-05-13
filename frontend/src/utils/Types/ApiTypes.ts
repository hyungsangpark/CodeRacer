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

export type AvatarResponse = {
    avatar: Avatar;
}

export type Avatar = {
    url: string;
}