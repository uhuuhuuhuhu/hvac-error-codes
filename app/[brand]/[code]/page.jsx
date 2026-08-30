import data from '../../../data.json';

// 구글 검색엔진에 1만개 페이지를 모두 등록시켜주는 핵심 설정
export async function generateStaticParams() {
  return data.map((item) => ({
    brand: item.brand,
    code: item.code,
  }));
}

export default function ErrorPage({ params }) {
  const errorInfo = data.find(
    (item) => item.brand === params.brand && item.code === params.code
  );

  if (!errorInfo) return <h1>Error Code Not Found</h1>;

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
