import data from '../data.json';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Global HVAC Error Codes Directory</h1>
      <p>Find troubleshooting steps for commercial AC units instantly.</p>
      <ul style={{ lineHeight: '2' }}>
        {data.map((item) => (
          <li key={item.code}>
            <Link href={`/error?brand=${item.brand}&code=${item.code}`} style={{ color: 'blue', textDecoration: 'none' }}>
              <strong>{item.brand.toUpperCase()}</strong>: Error Code {item.code.toUpperCase()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
