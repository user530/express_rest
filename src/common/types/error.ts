export class CustomError extends Error {
    public status: number = 500;
    constructor(message: string, code?: number) {
        super(message);
        if (code)
            this.status = code;
    }
}