// app/page.tsx

'use client';

import ProtectedRoute from '../components/ProtectedRoute';

const HomePage = () => {
  return (
    <ProtectedRoute>
      <div>
        <h1>Welcome to the Home Page</h1>
        <p>This is a protected route.</p>
      </div>
    </ProtectedRoute>
  );
};

export default HomePage;
