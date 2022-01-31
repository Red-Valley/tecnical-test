export declare class ToolsService {
    constructor();
    dateToMySQL(fechaR: any): any;
    encriptHash(hash: string, salt: string): Promise<any>;
    checkHash(attemp: string, hash: string, salt: string): Promise<any>;
    createSalt(): Promise<any>;
    createUUID(): Promise<string>;
}
