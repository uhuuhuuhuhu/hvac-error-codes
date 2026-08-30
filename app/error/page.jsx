'use client';
import { useSearchParams } from 'next/navigation';
import data from '../../data.json';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand');
  const code = searchParams.get('code');

  const errorInfo = data.find((item) => item.brand === brand && item.code === code);

  if (!errorInfo) return <div style={{ padding: '40px' }}><h1>Error Code Not Found</h1><p><a href="/">← Back to Home</a></p></div>;

  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <p><a href="/" style={{ color: 'gray' }}>← Back to Directory</a></p>
      <h1 style={{ borderBottom: '2px solid #eee', paddingBottom: '10px' }}>
        {errorInfo.brand.toUpperCase()} Error Code: {errorInfo.code.toUpperCase()}
      </h1>
      <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginTop: '20px' }}>
        <h3 style={{ color: '#d32f2f' }}>Description</h3>
        <p>{errorInfo.title}</p>
        <h3 style={{ color: '#f57c00' }}>Possible Cause</h3>
        <p>{errorInfo.cause}</p>
        <h3 style={{ color: '#388e3c' }}>Solution / Troubleshooting</h3>
        <p>{errorInfo.solution}</p>
      </div>
      <p style={{ marginTop: '40px', fontSize: '12px', color: 'gray' }}>
        * Disclaimer: Always consult a certified HVAC technician before performing repairs.
      </p>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div style={{ padding: '40px' }}>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
