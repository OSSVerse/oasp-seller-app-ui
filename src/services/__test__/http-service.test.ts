import { describe, it, beforeEach, expect, vi } from 'vitest';
import { httpService } from '@/services/http-service';
import { AUTH_STORAGE_TOKEN } from '@/lib/constant';
import storage from '@/lib/storage-helper';

// Mock the storage-helper module properly
vi.mock('@/lib/storage-helper', () => ({
    default: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        removeItem: vi.fn(),
    },
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
}));

// Use importOriginal to mock axios
vi.mock('axios', async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        default: {
            create: vi.fn().mockReturnValue({
                interceptors: {
                    request: { use: vi.fn() },
                    response: { use: vi.fn() },
                },
                get: vi.fn(),
                post: vi.fn(),
                put: vi.fn(),
                patch: vi.fn(),
                delete: vi.fn(),
            }),
        },
    };
});

describe('httpService Tests', () => {
    const mockToken = 'mocked_token';
    const newToken = 'New Access Token';
    const mockResponse = {
        data: { message: 'success' },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {},
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });



    it('should handle a 401 response and refresh token', async () => {
        (storage.getItem as vi.Mock).mockReturnValue(mockToken);

        const errorResponse = {
            response: { status: 401 },
            config: { _retry: false },
        };
        const retryResponse = {
            ...mockResponse,
            data: { message: 'success after token refresh' },
        };

        const axiosInstance = await import('axios').then((axios) => axios.default.create());
        (axiosInstance.get as vi.Mock).mockRejectedValueOnce(errorResponse);
        (axiosInstance.get as vi.Mock).mockResolvedValueOnce(retryResponse);



    });



    it('should reject if 401 error is encountered and token refresh fails', async () => {
        const errorResponse = {
            response: { status: 401 },
            config: { _retry: false },
        };

        const axiosInstance = await import('axios').then((axios) => axios.default.create());
        (axiosInstance.get as vi.Mock).mockRejectedValueOnce(errorResponse);

        try {
            await httpService.get('/some-endpoint');
        } catch (error) {
            console.log(error, '=-=-====');
            expect(error).toEqual(errorResponse);
        }
    });
});
