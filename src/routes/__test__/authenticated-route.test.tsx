import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ProtectedRoute from '../authenticated-route'
import useAuthStore from '@/store/auth-store'

// Mock the useAuthStore hook
vi.mock('@/store/auth-store')

describe('ProtectedRoute', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('renders Outlet when user is authenticated', () => {
        // Mock the useAuthStore to return isAuthenticated as true
        vi.mocked(useAuthStore).mockReturnValue({ isAuthenticated: true } as any)

        const { getByText } = render(
            <MemoryRouter initialEntries={['/protected']}>
                <Routes>
                    <Route element={<ProtectedRoute />}>
                        <Route path="/protected" element={<div>Protected Content</div>} />
                    </Route>
                </Routes>
            </MemoryRouter>
        )

        expect(getByText('Protected Content')).toBeTruthy()
    })

    // it('redirects to home when user is not authenticated', () => {
    //     // Mock the useAuthStore to return isAuthenticated as false
    //     vi.mocked(useAuthStore).mockReturnValue({ isAuthenticated: false } as any)

    //     const { getByText } = render(
    //         <MemoryRouter initialEntries={['/protected']}>
    //             <Routes>
    //                 <Route path="/" element={<div>Home Page</div>} />
    //                 <Route element={<ProtectedRoute />}>
    //                     <Route path="/protected" element={<div>Protected Content</div>} />
    //                 </Route>
    //             </Routes>
    //         </MemoryRouter>
    //     )

    //     expect(getByText('Home Page')).toBeTruthy()
    // })
})
