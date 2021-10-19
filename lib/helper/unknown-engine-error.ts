export class VaultUnknownEngineError extends Error {
    constructor(engine: string, message = 'Unknown secrets engine:') {
        super(`${message} "${engine}"`);
    }
}

export default VaultUnknownEngineError;
