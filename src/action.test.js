jest.mock('got');
jest.mock('@actions/core');
jest.mock('@actions/core/lib/command');

const core = require('@actions/core');
const got = require('got');
const {
    exportSecrets,
    parseSecretsInput,
    parseResponse,
    parseHeadersInput
} = require('./action');

const { when } = require('jest-when');

describe('parseSecretsInput', () => {
    

    it('parses special chars secrets', () => {
        const output = parseSecretsInput('secret/data/ci .');
        console.log(output)
        expect(output).toContainEqual({
            path: 'secret/data/ci',
            selector: null,
            outputVarName: 'secret_data_ci',
            envVarName: 'SECRET_DATA_CI',
            outputFileName: null
        });
    });


    it('parses special chars secrets with outputVarName ', () => {
        const output = parseSecretsInput('secret/data/ci . | DIOS');
        console.log(output)
        expect(output).toContainEqual({
            path: 'secret/data/ci',
            selector: null,
            outputVarName: 'DIOS',
            envVarName: 'DIOS',
            outputFileName: null
        });
    });

    it('parses special chars secrets with output to file', () => {
        const output = parseSecretsInput('secret/data/ci . > /tmp/secrets.json');
        console.log(output)
        expect(output).toContainEqual({
            path: 'secret/data/ci',
            selector: null,
            outputVarName: null,
            envVarName: null,
            outputFileName: '/tmp/secrets.json'
        });
    });
    
});
