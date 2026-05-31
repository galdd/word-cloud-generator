import { Card, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

export function Explanation() {
  return (
    <Card>
      <Typography>
        <Title level={3}>What is this app?</Title>
        <Paragraph>
          <strong>Word Cloud Generator</strong> fetches a set of random words
          from the backend, counts how often each word appears, and displays
          them as an interactive word cloud.
        </Paragraph>

        <Title level={4}>How it works</Title>
        <Paragraph>
          <ul>
            <li>
              The <Text code>GET /api/word-cloud</Text> endpoint randomly
              samples words from a built-in word list and returns their
              frequencies, sorted from most to least common.
            </li>
            <li>
              The frontend fetches this data using{' '}
              <Text strong>React Query</Text>, which caches the result and
              avoids redundant network calls.
            </li>
            <li>
              Each word is rendered at a font size scaled linearly between{' '}
              <Text code>MIN_FONT_SIZE</Text> and <Text code>MAX_FONT_SIZE</Text>{' '}
              based on its frequency — larger means more frequent.
            </li>
            <li>
              Each word gets a <Text strong>persistent color</Text> derived from
              a hash of the word itself, so the same word always appears in the
              same color across renders.
            </li>
          </ul>
        </Paragraph>

        <Title level={4}>API response shape</Title>
        <Paragraph>
          <pre
            style={{
              background: '#f6f8fa',
              padding: '12px 16px',
              borderRadius: 8,
              fontSize: 13,
            }}
          >
            {`[
  { "word": "apple",  "count": 12 },
  { "word": "banana", "count":  8 }
]`}
          </pre>
        </Paragraph>
      </Typography>
    </Card>
  );
}
