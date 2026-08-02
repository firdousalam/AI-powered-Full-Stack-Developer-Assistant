export interface FormField {

    name: string;

    type: string;

    placeholder: string;

    label: string;

    required: boolean;

    value: string;

}

export interface FormData {

    action: string;

    method: string;

    id: string;

    name: string;

    fields: FormField[];

}