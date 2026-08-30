'use client';
import { useState } from 'react';
import data from '../data.json';
import Link from 'next/link';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어 필터링
  const filteredData = data.filter(
    (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 브랜드별로 그룹화
  const groupedData = filteredData.reduce((acc, item) => {
    if (!acc[item.brand]) {
      acc[item.brand] = [];
    }
    acc[item.brand].push(item);
    return acc;
  }, {});

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#1a1a1a', marginBottom: '10px' }}>Global HVAC Error Codes Directory</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Find troubleshooting steps, causes, and solutions for commercial AC units instantly.</p>
        
        {/* 실시간 검색창 */}
        <div style={{ marginTop: '25px' }}>
          <input
            type="text"
            placeholder="Search by Brand, Error Code, or Description (e.g., Daikin, U4, Sensor)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              padding: '12px 20px',
              fontSize: '16px',
              borderRadius: '30px',
              border: '1px solid #ccc',
              outline: 'none',
              boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
            }}
          />
        </div>
      </header>

      {/* 브랜드별 분류 리스트 출력 */}
      {Object.keys(groupedData).length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No error codes found matching your search.</p>
      ) : (
        Object.keys(groupedData).map((brand) => (
          <section key={brand} style={{ marginBottom: '40px', backgroundColor: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <h2 style={{ textTransform: 'uppercase', borderBottom: '2px solid #eaeaea', paddingBottom: '10px', color: '#0070f3', marginBottom: '15px', fontSize: '20px' }}>
              {brand} <span style={{ fontSize: '14px', color: '#888', fontWeight: 'normal' }}>({groupedData[brand].length} codes)</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '15px' }}>
              {groupedData[brand].map((item) => (
                <Link
                  key={item.code}
                  href={`/error?brand=${item.brand}&code=${item.code}`}
                  style={{
                    display: 'block',
                    padding: '12px 15px',
                    borderRadius: '8px',
                    border: '1px solid #eee',
                    backgroundColor: '#fafafa',
                    textDecoration: 'none',
                    color: '#333',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontWeight: 'bold', color: '#d32f2f', marginBottom: '4px' }}>Code: {item.code.toUpperCase()}</div>
                  <div style={{ fontSize: '14px', color: '#444', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                </Link>
              ))}
            </div>
          </section>
        ))
      )}
    </main>
  );
}
