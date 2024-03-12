
import React from 'react';
import { Div } from '@vkontakte/vkui';

interface LoadingErrorProps {
  loading: boolean;
  error: string | null;
}

const LoadingError: React.FC<LoadingErrorProps> = ({ loading, error }) => (
  <Div>
    {loading && <div>Loading...</div>}
    {error && <div>Error: {error}</div>}
  </Div>
);

export default LoadingError;
