export interface Option {
    id: string;
    type: 'boolean' | 'string';
    alias?: string;
    deprecates?: string; // old deprecated id
    args?: string | string[];
    description?: string;
}
