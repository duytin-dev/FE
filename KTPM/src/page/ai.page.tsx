import { RobotOutlined } from '@ant-design/icons';
import { App, Button, Card, Input, Space, Spin, Typography } from 'antd';
import { useState } from 'react';
import { geminiChatApi } from '../service/api';

const { Paragraph } = Typography;

const AiPage = () => {
  const { message } = App.useApp();
  const [prompt, setPrompt] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!prompt.trim()) {
      message.warning('Nhập nội dung trước khi gửi');
      return;
    }
    setLoading(true);
    setReply('');
    try {
      const res = await geminiChatApi(prompt.trim());
      setReply(res.data.text);
    } catch (e: unknown) {
      const ax = e as { response?: { data?: { error?: string } }; message?: string };
      const msg =
        ax.response?.data?.error ??
        ax.message ??
        'Không gọi được AI — kiểm tra backend và biến GEMINI_API_KEY trên Render.';
      message.error(String(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 16, maxWidth: 720, margin: '0 auto' }}>
      <Card title={
        <span>
          <RobotOutlined style={{ marginRight: 8 }} />
          Gemini (qua backend)
        </span>
      }>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <Input.TextArea
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Nhập câu hỏi hoặc yêu cầu gửi tới Gemini..."
            disabled={loading}
          />
          <Button type="primary" onClick={handleSend} loading={loading}>
            Gửi
          </Button>
          {loading && <Spin tip="Đang chờ Gemini..." />}
          {reply ? (
            <Card size="small" type="inner" title="Trả lời">
              <Paragraph style={{ whiteSpace: 'pre-wrap', margin: 0 }}>{reply}</Paragraph>
            </Card>
          ) : null}
        </Space>
      </Card>
    </div>
  );
};

export default AiPage;
