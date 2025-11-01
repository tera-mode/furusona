'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  active: boolean;
}

export default function EmailDebugPage() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // テンプレート一覧を取得
  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/email/templates');
      const data = await response.json();
      setTemplates(data.templates || []);
    } catch (error) {
      console.error('Failed to fetch templates:', error);
      setMessage('テンプレートの取得に失敗しました');
    }
  };

  // テンプレートを初期化
  const initializeTemplates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/email/templates', {
        method: 'POST',
      });

      if (response.ok) {
        setMessage('テンプレートを初期化しました');
        await fetchTemplates();
      } else {
        setMessage('テンプレートの初期化に失敗しました');
      }
    } catch (error) {
      console.error('Failed to initialize templates:', error);
      setMessage('テンプレートの初期化に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // テンプレートを更新
  const updateTemplate = async () => {
    if (!selectedTemplate) return;

    setLoading(true);
    try {
      const response = await fetch('/api/email/templates', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          subject: selectedTemplate.subject,
          htmlBody: selectedTemplate.htmlBody,
          textBody: selectedTemplate.textBody,
          active: selectedTemplate.active,
        }),
      });

      if (response.ok) {
        setMessage('テンプレートを更新しました');
        setEditMode(false);
        await fetchTemplates();
      } else {
        setMessage('テンプレートの更新に失敗しました');
      }
    } catch (error) {
      console.error('Failed to update template:', error);
      setMessage('テンプレートの更新に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  // テストメール送信
  const sendTestEmail = async (templateId: string) => {
    if (!user) {
      setMessage('ログインしてください');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId,
          userId: user.uid,
          testMode: true,
        }),
      });

      if (response.ok) {
        setMessage('テストメールを送信しました（管理者メールアドレス宛）');
      } else {
        const data = await response.json();
        setMessage(`送信失敗: ${data.error}`);
      }
    } catch (error) {
      console.error('Failed to send test email:', error);
      setMessage('テストメールの送信に失敗しました');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">メール管理</h1>
        <p className="text-gray-600">この機能を使用するにはログインしてください。</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">メール管理</h1>

      {message && (
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6">
          {message}
        </div>
      )}

      {/* 初期化ボタン */}
      <div className="mb-6">
        <button
          onClick={initializeTemplates}
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? '処理中...' : 'テンプレートを初期化'}
        </button>
        <p className="text-sm text-gray-600 mt-2">
          ※ デフォルトテンプレートをFirestoreに保存します
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* テンプレート一覧 */}
        <div>
          <h2 className="text-xl font-bold mb-4">テンプレート一覧</h2>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold">{template.name}</h3>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {template.active ? '有効' : '無効'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">{template.subject}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setEditMode(false);
                    }}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    プレビュー
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setEditMode(true);
                    }}
                    className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => sendTestEmail(template.id)}
                    disabled={loading}
                    className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    テスト送信
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* プレビュー・編集エリア */}
        <div>
          {selectedTemplate ? (
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">
                {editMode ? 'テンプレート編集' : 'プレビュー'}
              </h2>

              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">件名</label>
                    <input
                      type="text"
                      value={selectedTemplate.subject}
                      onChange={(e) =>
                        setSelectedTemplate({ ...selectedTemplate, subject: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">HTML本文</label>
                    <textarea
                      value={selectedTemplate.htmlBody}
                      onChange={(e) =>
                        setSelectedTemplate({ ...selectedTemplate, htmlBody: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 font-mono text-sm h-64"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">テキスト本文</label>
                    <textarea
                      value={selectedTemplate.textBody}
                      onChange={(e) =>
                        setSelectedTemplate({ ...selectedTemplate, textBody: e.target.value })
                      }
                      className="w-full border rounded px-3 py-2 font-mono text-sm h-32"
                    />
                  </div>

                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedTemplate.active}
                        onChange={(e) =>
                          setSelectedTemplate({ ...selectedTemplate, active: e.target.checked })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">有効</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={updateTemplate}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? '保存中...' : '保存'}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">件名</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {selectedTemplate.subject}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">HTML本文（プレビュー）</h3>
                    <div className="border rounded p-3 bg-gray-50 max-h-96 overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap font-mono">
                        {selectedTemplate.htmlBody}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border rounded-lg p-6 text-center text-gray-500">
              左のテンプレートを選択してください
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
