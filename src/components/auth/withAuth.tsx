"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// import LoadingPage from '@/app/dashboard/loading';

interface AuthState {
  isLoggedIn: boolean;
  isLoading: boolean;
}

const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>): React.FC<P> => {
  const WithAuthentication: React.FC<P> = (props) => {
    const router = useRouter();
    const [authState, setAuthState] = useState<AuthState>({
      isLoggedIn: false,
      isLoading: true,
    });

    useEffect(() => {
      const checkAuth = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
          router.push('/'); // Redirect to login page if not authenticated
        } else {
          // Optionally, validate the token here
          setAuthState({ isLoggedIn: true, isLoading: false });
        }
      };

      checkAuth();
    }, [router]);

    if (authState.isLoading) {
      return <div> Loading...</div>;
    }

    return authState.isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthentication;
};

export default withAuth;
