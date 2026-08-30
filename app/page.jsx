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

  // 1단계: 브랜드별로 그룹화
  const groupedByBrand = filteredData.reduce((acc, item) => {
    if (!acc[item.brand]) {
      acc[item.brand] = [];
    }
    acc[item.brand].push(item);
    return acc;
  }, {});

  // 2단계: 알파벳 대분류(A-Z)별로 브랜드 묶기
  const groupedByAlphabet = Object.keys(groupedByBrand).reduce((acc, brand) => {
    const firstLetter = brand.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  // 알파벳 순서 정렬 (A -> Z)
  const sortedAlphabets = Object.keys(groupedByAlphabet).sort();

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', backgroundColor: '#fcfcfc', minHeight: '100vh' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', color: '#1a1a1a', marginBottom: '10px' }}>Global HVAC Error Codes Directory</h1>
        <p style={{ color: '#666', fontSize: '16px' }}>Find troubleshooting steps, causes, and solutions for commercial AC units instantly.</p>
        
        {/* 실시간 검색창 */}
        <div style={{ marginTop: '25px' }}>
          <input
            type="text"
            placeholder="Search by Brand, Error Code, or Description (e.g., Daikin, U4)..."
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

      {/* 알파벳 대분류별 섹션 출력 */}
      {sortedAlphabets.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888', marginTop: '40px' }}>No error codes found matching your search.</p>
      ) : (
        sortedAlphabets.map((letter) => (
          <div key={letter} style={{ marginBottom: '35px' }}>
            {/* 알파벳 대분류 타이틀 */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
              <span style={{ 
                backgroundColor: '#0070f3', 
                color: '#fff', 
                fontSize: '18px', 
                fontWeight: 'bold', 
                width: '36px', 
                height: '36px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: '8px',
                marginRight: '10px',
                boxShadow: '0 2px 4px rgba(0,112,243,0.3)'
              }}>
                {letter}
              </span>
              <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Index {letter}</span>
            </div>

            {/* 해당 알파벳에 속한 업체명(브랜드) 목록 */}
            {groupedByAlphabet[letter].sort().map((brand) => (
              <section key={brand} style={{ marginBottom: '20px', backgroundColor: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #eaeaea', boxShadow: '0 2px 6px rgba(0,0,0,0.02)' }}>
                <h3 style={{ textTransform: 'uppercase', color: '#222', marginBottom: '12px', fontSize: '17px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{brand}</span>
                  <span style={{ fontSize: '13px', color: '#666', fontWeight: 'normal', backgroundColor: '#f0f0f0', padding: '2px 8px', borderRadius: '4px' }}>
                    {groupedByBrand[brand].length} codes
                  </span>
                </h3>
                
                {/* 하위 에러코드 리스트 */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '10px' }}>
                  {groupedByBrand[brand].map((item) => (
                    <Link
                      key={item.code}
                      href={`/error?brand=${item.brand}&code=${item.code}`}
                      style={{
                        display: 'block',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #f0f0f0',
                        backgroundColor: '#fafafa',
                        textDecoration: 'none',
                        color: '#333',
                        transition: 'background-color 0.2s'
                      }}
                    >
                      <div style={{ fontWeight: 'bold', color: '#d32f2f', fontSize: '13px', marginBottom: '2px' }}>Code: {item.code.toUpperCase()}</div>
                      <div style={{ fontSize: '13px', color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.title}</div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        ))
      )}
    </main>
  );
}
