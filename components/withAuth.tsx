import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { isAuthenticated } from '../lib/auth';

export function withAuth(WrappedComponent: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    
    useEffect(() => {
      // Check if user is not authenticated
      if (!isAuthenticated()) {
        router.replace('/login');
      }
    }, [router]);

    // If we're on the client and not authenticated, don't render the component
    if (typeof window !== 'undefined' && !isAuthenticated()) {
      return null;
    }

    // If authenticated, render component
    return <WrappedComponent {...props} />;
  };
}
