import { Card, Typography } from 'antd';

const { Paragraph } = Typography;

export function Explanation() {
  return (
    <Card>
      <Typography>
        <Paragraph>
          Create a colorful word cloud from randomly generated words.
        </Paragraph>
        <Paragraph>
          The more often a word appears, the larger it becomes in the cloud.
          Each word also gets its own consistent color, making the result easy
          to scan and visually engaging.
        </Paragraph>
        <Paragraph>
          Open the Word Cloud tab to generate and view the result.
        </Paragraph>
      </Typography>
    </Card>
  );
}
