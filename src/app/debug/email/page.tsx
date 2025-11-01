'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { EmailSchedule } from '@/types/email';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  htmlBody: string;
  textBody: string;
  active: boolean;
  schedule?: EmailSchedule;
}

export default function EmailDebugPage() {
  const { user } = useAuth();
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editScheduleMode, setEditScheduleMode] = useState(false);
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
          schedule: selectedTemplate.schedule,
        }),
      });

      if (response.ok) {
        setMessage('テンプレートを更新しました');
        setEditMode(false);
        setEditScheduleMode(false);
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

  // Cron APIを手動実行
  const runCronManually = async () => {
    setLoading(true);
    setMessage('Cron APIを実行中...');

    try {
      const cronSecret = prompt('CRON_SECRETを入力してください:');
      if (!cronSecret) {
        setMessage('キャンセルされました');
        setLoading(false);
        return;
      }

      const response = await fetch(`/api/cron/send-emails?secret=${cronSecret}`, {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        const summary = (data.summary || []) as Array<{ templateId: string; sent: number; failed: number }>;
        const matchingTemplates = (data.matchingTemplates || []) as Array<{ id: string; name: string }>;

        // 詳細なエラー情報を取得
        const detailsData = data.details as Record<string, Array<{ userId: string; status: string; error?: string }>> | undefined;
        let errorDetails = '';

        if (detailsData) {
          Object.entries(detailsData).forEach(([templateId, results]) => {
            const failedResults = results.filter(r => r.status === 'failed');
            if (failedResults.length > 0) {
              errorDetails += `\n[${templateId}]\n`;
              failedResults.forEach((r, index) => {
                errorDetails += `  ${index + 1}. userId: ${r.userId}\n     エラー: ${r.error || 'Unknown'}\n`;
              });
            }
          });
        }

        setMessage(
          `✅ Cron実行完了\n\n` +
          `マッチしたテンプレート: ${matchingTemplates.map((t) => t.name).join(', ') || 'なし'}\n` +
          `総購読者数: ${data.totalSubscribers || 0}\n` +
          `送信成功: ${data.sent || 0}通\n` +
          `送信失敗: ${data.failed || 0}通\n\n` +
          `サマリー:\n${summary.map(s => `  ${s.templateId}: ${s.sent}通成功, ${s.failed}通失敗`).join('\n') || 'なし'}` +
          (errorDetails ? `\n\nエラー詳細:${errorDetails}` : '')
        );
      } else {
        setMessage(`❌ Cron実行失敗: ${data.error || 'Unknown error'}\n\n詳細: ${data.details || ''}`);
      }
    } catch (error) {
      console.error('Failed to run cron:', error);
      setMessage(`❌ Cron実行エラー: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  // スケジュール表示用のヘルパー関数
  const formatSchedule = (schedule?: EmailSchedule) => {
    if (!schedule) return '未設定';
    if (!schedule.enabled) return '無効';

    const months = schedule.months && schedule.months.length > 0 ? schedule.months.join(', ') + '月' : '毎月';
    const days = schedule.days && schedule.days.length > 0 ? schedule.days.join(', ') + '日' : '毎日';
    const time = `${String(schedule.hour).padStart(2, '0')}:${String(schedule.minute).padStart(2, '0')}`;

    return `${months} ${days} ${time} (${schedule.timezone})`;
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
        <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded mb-6 whitespace-pre-wrap">
          {message}
        </div>
      )}

      {/* 初期化ボタン */}
      <div className="mb-6 flex gap-4">
        <div>
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
        <div>
          <button
            onClick={runCronManually}
            disabled={loading}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? '実行中...' : 'Cronを手動実行'}
          </button>
          <p className="text-sm text-gray-600 mt-2">
            ※ スケジュールに一致するメールを今すぐ送信テスト
          </p>
        </div>
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
                <p className="text-sm text-gray-600 mb-2">{template.subject}</p>
                <div className="text-xs text-gray-500 mb-3 bg-gray-50 p-2 rounded">
                  <strong>送信スケジュール:</strong> {formatSchedule(template.schedule)}
                </div>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setEditMode(false);
                      setEditScheduleMode(false);
                    }}
                    className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    プレビュー
                  </button>
                  <button
                    onClick={() => {
                      setSelectedTemplate(template);
                      setEditMode(true);
                      setEditScheduleMode(false);
                    }}
                    className="text-sm bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => {
                      // スケジュールが存在しない場合はデフォルト値で初期化
                      const templateWithSchedule = {
                        ...template,
                        schedule: template.schedule || {
                          enabled: false,
                          months: [],
                          days: [],
                          hour: 0,
                          minute: 0,
                          timezone: 'Asia/Tokyo',
                        },
                      };
                      setSelectedTemplate(templateWithSchedule);
                      setEditMode(false);
                      setEditScheduleMode(true);
                    }}
                    className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                  >
                    スケジュール
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
                {editScheduleMode ? 'スケジュール設定' : editMode ? 'テンプレート編集' : 'プレビュー'}
              </h2>

              {editScheduleMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center mb-4">
                      <input
                        type="checkbox"
                        checked={selectedTemplate.schedule?.enabled ?? false}
                        onChange={(e) =>
                          setSelectedTemplate({
                            ...selectedTemplate,
                            schedule: {
                              enabled: e.target.checked,
                              months: selectedTemplate.schedule?.months || [],
                              days: selectedTemplate.schedule?.days || [],
                              hour: selectedTemplate.schedule?.hour || 0,
                              minute: selectedTemplate.schedule?.minute || 0,
                              timezone: selectedTemplate.schedule?.timezone || 'Asia/Tokyo',
                            },
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm font-medium">自動送信を有効化</span>
                    </label>
                  </div>

                  {selectedTemplate.schedule?.enabled && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">送信する月（複数選択可、空=毎月）</label>
                        <div className="grid grid-cols-6 gap-2">
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
                            <label key={month} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={selectedTemplate.schedule?.months?.includes(month) ?? false}
                                onChange={(e) => {
                                  const currentMonths = selectedTemplate.schedule?.months || [];
                                  const newMonths = e.target.checked
                                    ? [...currentMonths, month]
                                    : currentMonths.filter((m) => m !== month);
                                  setSelectedTemplate({
                                    ...selectedTemplate,
                                    schedule: {
                                      enabled: selectedTemplate.schedule?.enabled || false,
                                      months: newMonths.sort((a, b) => a - b),
                                      days: selectedTemplate.schedule?.days || [],
                                      hour: selectedTemplate.schedule?.hour || 0,
                                      minute: selectedTemplate.schedule?.minute || 0,
                                      timezone: selectedTemplate.schedule?.timezone || 'Asia/Tokyo',
                                    },
                                  });
                                }}
                                className="mr-1"
                              />
                              {month}月
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">送信する日（複数選択可、空=毎日）</label>
                        <div className="grid grid-cols-7 gap-2 max-h-48 overflow-y-auto">
                          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                            <label key={day} className="flex items-center text-sm">
                              <input
                                type="checkbox"
                                checked={selectedTemplate.schedule?.days?.includes(day) ?? false}
                                onChange={(e) => {
                                  const currentDays = selectedTemplate.schedule?.days || [];
                                  const newDays = e.target.checked
                                    ? [...currentDays, day]
                                    : currentDays.filter((d) => d !== day);
                                  setSelectedTemplate({
                                    ...selectedTemplate,
                                    schedule: {
                                      enabled: selectedTemplate.schedule?.enabled || false,
                                      months: selectedTemplate.schedule?.months || [],
                                      days: newDays.sort((a, b) => a - b),
                                      hour: selectedTemplate.schedule?.hour || 0,
                                      minute: selectedTemplate.schedule?.minute || 0,
                                      timezone: selectedTemplate.schedule?.timezone || 'Asia/Tokyo',
                                    },
                                  });
                                }}
                                className="mr-1"
                              />
                              {day}日
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">時</label>
                          <input
                            type="number"
                            min="0"
                            max="23"
                            value={selectedTemplate.schedule?.hour ?? 0}
                            onChange={(e) =>
                              setSelectedTemplate({
                                ...selectedTemplate,
                                schedule: {
                                  enabled: selectedTemplate.schedule?.enabled || false,
                                  months: selectedTemplate.schedule?.months || [],
                                  days: selectedTemplate.schedule?.days || [],
                                  hour: parseInt(e.target.value, 10),
                                  minute: selectedTemplate.schedule?.minute || 0,
                                  timezone: selectedTemplate.schedule?.timezone || 'Asia/Tokyo',
                                },
                              })
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">分</label>
                          <input
                            type="number"
                            min="0"
                            max="59"
                            value={selectedTemplate.schedule?.minute ?? 0}
                            onChange={(e) =>
                              setSelectedTemplate({
                                ...selectedTemplate,
                                schedule: {
                                  enabled: selectedTemplate.schedule?.enabled || false,
                                  months: selectedTemplate.schedule?.months || [],
                                  days: selectedTemplate.schedule?.days || [],
                                  hour: selectedTemplate.schedule?.hour || 0,
                                  minute: parseInt(e.target.value, 10),
                                  timezone: selectedTemplate.schedule?.timezone || 'Asia/Tokyo',
                                },
                              })
                            }
                            className="w-full border rounded px-3 py-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">タイムゾーン</label>
                        <select
                          value={selectedTemplate.schedule?.timezone ?? 'Asia/Tokyo'}
                          onChange={(e) =>
                            setSelectedTemplate({
                              ...selectedTemplate,
                              schedule: {
                                enabled: selectedTemplate.schedule?.enabled || false,
                                months: selectedTemplate.schedule?.months || [],
                                days: selectedTemplate.schedule?.days || [],
                                hour: selectedTemplate.schedule?.hour || 0,
                                minute: selectedTemplate.schedule?.minute || 0,
                                timezone: e.target.value,
                              },
                            })
                          }
                          className="w-full border rounded px-3 py-2"
                        >
                          <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                          <option value="UTC">UTC</option>
                          <option value="America/New_York">America/New_York (EST)</option>
                          <option value="Europe/London">Europe/London (GMT)</option>
                        </select>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 p-3 rounded">
                        <p className="text-sm text-blue-800">
                          <strong>設定プレビュー:</strong><br />
                          {formatSchedule(selectedTemplate.schedule)}
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={updateTemplate}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {loading ? '保存中...' : '保存'}
                    </button>
                    <button
                      onClick={() => setEditScheduleMode(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : editMode ? (
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
                    <h3 className="font-medium mb-2">送信スケジュール</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                      {formatSchedule(selectedTemplate.schedule)}
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
