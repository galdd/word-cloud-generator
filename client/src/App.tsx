import { Tabs, Typography } from 'antd';
import { Explanation } from './explanation/Explanation';
import { WordCloud } from './word-cloud/WordCloud';

const { Title } = Typography;

const tabs = [
  {
    key: 'explanation',
    label: 'Explanation',
    children: <Explanation />,
  },
  {
    key: 'word-cloud',
    label: 'Word Cloud',
    children: <WordCloud />,
  },
];

function App() {
  return (
    <main className="app">
      <Title>Word Cloud Generator</Title>
      <Tabs defaultActiveKey="explanation" items={tabs} size="large" />
    </main>
  );
}

export default App;
