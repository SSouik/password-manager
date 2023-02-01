/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';

import { TraceIdMiddleware } from './trace-id.middleware';

jest.mock('uuid', () => ({ v4: () => 'trace-id' }));

describe('TraceIdMiddleware Tests', () => {
    const mockRequest = {} as Request;
    const mockResponse = {} as Response;
    let mockNextHandler: (error?: any) => void;
    let middleware: TraceIdMiddleware;

    beforeEach(() => {
        mockRequest.headers = {};
        mockNextHandler = jest.fn();

        middleware = new TraceIdMiddleware();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    it('Creates a trace ID and adds it to the request headers', () => {
        middleware.use(mockRequest, mockResponse, mockNextHandler);

        expect(mockRequest.headers['x-request-trace-id']).toBe('trace-id');
        expect(mockNextHandler).toBeCalledTimes(1);
    });
});
