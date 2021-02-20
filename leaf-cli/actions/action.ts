
export type Input = {
    name: string;
    value: boolean | string;
};

export type Action = (inputs?: Input[], options?: Input[]) => Promise<void>;