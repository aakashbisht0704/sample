// Types for user data
export interface User {
  name: string;
  email: string;
  role: string;
}

// Check if user is logged in
export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  const user = localStorage.getItem('user');
  return user !== null;
};

// Get current user data
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// Login user
export const loginUser = (userData: User): void => {
  localStorage.setItem('user', JSON.stringify(userData));
};

// Logout user
export const logoutUser = (): void => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};
