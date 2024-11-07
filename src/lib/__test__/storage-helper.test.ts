import { describe, it, expect, beforeEach, vi } from 'vitest'
import storage, { setIsAuthenticated, getIsAuthenticated, removeIsAuthenticated } from '../storage-helper'
import { AUTH_STORAGE_KEY } from '../constant'

describe('storage-helper', () => {
    const mockUser = { id: '1', name: 'Test User' }

    beforeEach(() => {
        // Clear all mocks before each test
        vi.clearAllMocks()

        // Mock localStorage
        const localStorageMock = {
            getItem: vi.fn(),
            setItem: vi.fn(),
            removeItem: vi.fn(),
        }
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })

        // Mock sessionStorage
        const sessionStorageMock = {
            getItem: vi.fn(),
        }
        Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock })
    })

    describe('storage object', () => {
        it('should get item from localStorage', () => {
            storage.getItem('testKey')
            expect(localStorage.getItem).toHaveBeenCalledWith('testKey')
        })

        it('should set item in localStorage', () => {
            storage.setItem('testKey', 'testValue')
            expect(localStorage.setItem).toHaveBeenCalledWith('testKey', 'testValue')
        })

        it('should remove item from localStorage', () => {
            storage.removeItem('testKey')
            expect(localStorage.removeItem).toHaveBeenCalledWith('testKey')
        })
    })

    describe('setIsAuthenticated', () => {
        it('should store user object in localStorage', () => {
            setIsAuthenticated(mockUser)
            expect(localStorage.setItem).toHaveBeenCalledWith(AUTH_STORAGE_KEY, JSON.stringify(mockUser))
        })
    })

    describe('getIsAuthenticated', () => {
        it('should retrieve user object from localStorage', () => {
            localStorage.getItem.mockReturnValue(JSON.stringify(mockUser))
            const result = getIsAuthenticated()
            expect(localStorage.getItem).toHaveBeenCalledWith(AUTH_STORAGE_KEY)
            expect(result).toEqual(mockUser)
        })

        it('should retrieve user object from sessionStorage if not in localStorage', () => {
            localStorage.getItem.mockReturnValue(null)
            sessionStorage.getItem.mockReturnValue(JSON.stringify(mockUser))
            const result = getIsAuthenticated()
            expect(localStorage.getItem).toHaveBeenCalledWith(AUTH_STORAGE_KEY)
            expect(sessionStorage.getItem).toHaveBeenCalledWith(AUTH_STORAGE_KEY)
            expect(result).toEqual(mockUser)
        })

        it('should return null if user object is not found', () => {
            localStorage.getItem.mockReturnValue(null)
            sessionStorage.getItem.mockReturnValue(null)
            const result = getIsAuthenticated()
            expect(result).toBeNull()
        })
    })

    describe('removeIsAuthenticated', () => {
        it('should remove user object from localStorage', () => {
            removeIsAuthenticated()
            expect(localStorage.removeItem).toHaveBeenCalledWith(AUTH_STORAGE_KEY)
        })
    })
})
