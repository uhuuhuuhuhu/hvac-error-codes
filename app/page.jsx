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

  // 브랜드별 그룹화
  const groupedByBrand = filteredData.reduce((acc, item) => {
    if (!acc[item.brand]) {
      acc[item.brand] = [];
    }
    acc[item.brand].push(item);
    return acc;
  }, {});

  // 알파벳 대분류(A-Z)별 그룹화
  const groupedByAlphabet = Object.keys(groupedByBrand).reduce((acc, brand) => {
    const firstLetter = brand.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  const sortedAlphabets = Object.keys(groupedByAlphabet).sort();

  return (
    <div style={{ fontFamily: 'sans-serif', backgroundColor: '#f4f6f8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 상단 헤더 및 검색바 */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #e1e4e8', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h1 style={{ fontSize: '22px', color: '#111', margin: 0 }}>HVAC Error Codes Directory</h1>
          <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0 0' }}>Professional Troubleshooting Database</p>
        </div>
        <div style={{ flex: '1', maxWidth: '400px' }}>
          <input
            type="text"
            placeholder="Search code, brand, or symptom..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 16px',
              fontSize: '14px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              outline: 'none',
              backgroundColor: '#f9fafb'
            }}
          />
        </div>
      </header>

      {/* 메인 컨테이너 (좌측 사이드바 + 우측 본문) */}
      <div style={{ display: 'flex', flex: '1', maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '30px 20px', gap: '30px', boxSizing: 'border-box' }}>
        
        {/* 좌측 사이드바 (블로그 스타일 카테고리) */}
        <aside style={{ width: '260px', flexShrink: '0' }}>
          <div style={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e1e4e8', padding: '20px', position: 'sticky', top: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
            <h3 style={{ fontSize: '15px', color: '#333', borderBottom: '2px solid #0070f3', paddingBottom: '8px', marginTop: 0, marginBottom: '15px', textTransform: 'uppercase' }}>
              Categories (A-Z)
            </h3>
            
            {sortedAlphabets.length === 0 ? (
              <p style={{ fontSize: '13px', color: '#888' }}>No categories</p>
            ) : (
              sortedAlphabets.map((letter) => (
                <div key={letter} style={{ marginBottom: '15px' }}>
                  <div style={{ fontWeight: 'bold', color: '#0070f3', fontSize: '14px', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ backgroundColor: '#ebf5ff', padding: '2px 6px', borderRadius: '4px' }}>{letter}</span>
                  </div>
                  <ul style={{ listStyle: 'none', paddingLeft: '12px', margin: 0, borderLeft: '2px solid #f0f2f5' }}>
                    {groupedByAlphabet[letter].sort().map((brand) => (
                      <li key={brand} style={{ margin: '6px 0' }}>
                        <a 
                          href={`#brand-${brand}`} 
                          style={{ fontSize: '13px', color: '#4b5563', textDecoration: 'none', display: 'block', padding: '2px 0' }}
                        >
                          {brand.toUpperCase()} <span style={{ color: '#9ca3af', fontSize: '11px' }}>({groupedByBrand[brand].length})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* 우측 메인 컨텐츠 영역 */}
        <main style={{ flex: '1', minWidth: 0 }}>
          {sortedAlphabets.length === 0 ? (
            <div style={{ backgroundColor: '#fff', padding: '40px', textAlign: 'center', borderRadius: '8px', border: '1px solid #e1e4e8' }}>
              <p style={{ color: '#666', fontSize: '15px' }}>No error codes found matching your search.</p>
            </div>
          ) : (
            sortedAlphabets.map((letter) => (
              <div key={letter} style={{ marginBottom: '35px' }}>
                <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#111', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #d1d5db', paddingBottom: '6px' }}>
                  <span>Index [{letter}]</span>
                </div>

                {groupedByAlphabet[letter].sort().map((brand) => (
                  <section 
                    key={brand} 
                    id={`brand-${brand}`}
                    style={{ marginBottom: '25px', backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e1e4e8', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}
                  >
                    <h3 style={{ textTransform: 'uppercase', color: '#1f2937', marginTop: 0, marginBottom: '15px', fontSize: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{brand}</span>
                      <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 'normal', backgroundColor: '#f3f4f6', padding: '2px 8px', borderRadius: '12px' }}>
                        {groupedByBrand[brand].length} codes registered
                      </span>
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                      {groupedByBrand[brand].map((item) => (
                        <Link
                          key={item.code}
                          href={`/error?brand=${item.brand}&code=${item.code}`}
                          style={{
                            display: 'block',
                            padding: '12px',
                            borderRadius: '6px',
                            border: '1px solid #e5e7eb',
                            backgroundColor: '#fafafa',
                            textDecoration: 'none',
                          }}
                        >
                          <div style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '13px', marginBottom: '3px' }}>
                            Code: {item.code.toUpperCase()}
                          </div>
                          <div style={{ fontSize: '13px', color: '#4b5563', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.title}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ))
          )}
        </main>

      </div>
    </div>
  );
}
