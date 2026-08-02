export interface BrowserMetadata {

    url: string;

    title: string;

    hostname: string;

    protocol: string;

    language: string;

    timestamp: string;

}

export interface CodeBlock {

    language: string;

    code: string;

}

export interface Heading {

    level: number;

    text: string;

}

export interface BrowserLink {

    text: string;

    href: string;

}

export interface BrowserTable {

    headers: string[];

    rows: string[][];

}
export interface BrowserField {

    name: string;

    type: string;

    placeholder: string;

    label: string;

    required: boolean;

    value: string;

}

export interface BrowserForm {

    action: string;

    method: string;

    id: string;

    name: string;

    fields: BrowserField[];

}

export interface BrowserContext {

    metadata: BrowserMetadata;

    article: string;

    markdown: string;

    codeBlocks: CodeBlock[];

    headings: Heading[];

    links: BrowserLink[];

    tables: BrowserTable[];

    forms: BrowserForm[];


}