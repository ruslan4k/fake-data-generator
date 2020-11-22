import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import OutputBox from './OutputBox';

test('shows nothing when no generated rows', async () => {
  render(<OutputBox generatedDataRows={[]} columns={[]} />);
  expect(screen.queryByTestId('paper')).toBeNull();
});
