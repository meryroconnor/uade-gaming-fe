import { apiService } from './api';

export const authService = {
    async login(email, password) {
        try {
            const response = await apiService.post('/users/login', { email, password });
            
            // Store the token
            if (response.token) {
                localStorage.setItem('token', response.token);
            }
            
            return response;
        } catch (error) {
            throw new Error(error.message || 'Login failed. Please check your credentials.');
        }
    },

    async logout() {
        try {
            // Clear token from localStorage
            localStorage.removeItem('token');
            // await apiService.post('/users/logout');
        } catch (error) {
            console.error('Logout error:', error);
            throw new Error('Failed to logout');
        }
    },

    async registerUser(userData) {
        try {
            const response = await apiService.post('/users/signup', {
                ...userData,
                userType: userData.userType || 'customer' // Default to customer if not specified
            });

            // Automatically log in after successful registration if your API returns a token
            if (response.token) {
                localStorage.setItem('token', response.token);
            }

            return response;
        } catch (error) {
            const message = error.message || 'Registration failed. Please try again.';
            throw new Error(message);
        }
    },

    isLoggedIn() {
        return !!localStorage.getItem('token');
    },

    getToken() {
        return localStorage.getItem('token');
    },
    
    validateRegistrationData(data) {
        const errors = {};

        if (!data.name?.trim()) {
            errors.name = 'Name is required';
        }

        if (data.userType === 'customer' && !data.lastName?.trim()) {
            errors.lastName = 'Last name is required';
        }

        if (!data.email?.trim()) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            errors.email = 'Invalid email format';
        }

        if (!data.password?.trim()) {
            errors.password = 'Password is required';
        } else if (data.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
};