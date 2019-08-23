/**
 * A minimal set of command-line arguments.
 */
export interface ParsedArgs {
    _: string[];
    help?: boolean;
    version?: boolean;
    locale?: string;
    performance?: boolean;
    dev?: boolean;
}
