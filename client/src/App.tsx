import { useQuery } from '@tanstack/react-query';

interface HealthResponse {
  status: string;
}

async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch('/api/health');
  if (!res.ok) throw new Error('Health check failed');
  return res.json() as Promise<HealthResponse>;
}

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['health'],
    queryFn: fetchHealth,
  });

  return (
    <main style={{ textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ marginBottom: '1rem' }}>Word Cloud Generator</h1>
      <p style={{ color: '#555', marginBottom: '1.5rem' }}>
        Generate word clouds from text
      </p>
      <div
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          background: '#fff',
          boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
          fontSize: '0.95rem',
        }}
      >
        {isLoading && <span>Checking server…</span>}
        {isError && <span style={{ color: '#c00' }}>Server unreachable</span>}
        {data && (
          <span style={{ color: '#0a0' }}>
            Server status: <strong>{data.status}</strong>
          </span>
        )}
      </div>
    </main>
  );
}
