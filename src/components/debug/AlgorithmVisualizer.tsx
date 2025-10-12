'use client';

import { JUDGMENT_MODULES, ALGORITHM_FLOW, MODEL_CONFIG, SCORING_THRESHOLDS, PRODUCT_FETCH_CONFIG } from '@/app/debug/algorithm-config';

export default function AlgorithmVisualizer() {
  return (
    <div className="space-y-8">
      {/* フロー図 */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          アルゴリズムフロー図
        </h2>
        <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded border border-slate-200 dark:border-slate-700">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Mermaidフロー図: src/app/debug/algorithm-flow.mmd
          </p>
          <div className="text-xs text-slate-500 dark:text-slate-500 font-mono">
            ※ この図をレンダリングするには、Mermaidビューアーまたは対応エディタで開いてください
          </div>
          <a
            href="/debug/algorithm-flow.mmd"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-sm"
          >
            Mermaidファイルを開く
          </a>
        </div>
      </section>

      {/* モデル設定 */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          現在のモデル設定
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">プロバイダー</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {MODEL_CONFIG.provider}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">モデル</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {MODEL_CONFIG.model}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">最大トークン数</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {MODEL_CONFIG.maxTokens}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">Temperature</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {MODEL_CONFIG.temperature}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">リトライ回数</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {MODEL_CONFIG.retryAttempts}回
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">キャッシュ有効期限</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {MODEL_CONFIG.cacheDuration / 1000 / 60}分
            </div>
          </div>
        </div>
      </section>

      {/* 判定モジュール一覧 */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          判定モジュール一覧
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  優先度
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  モジュール名
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  説明
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  重み
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700 dark:text-slate-300">
                  状態
                </th>
              </tr>
            </thead>
            <tbody>
              {JUDGMENT_MODULES.sort((a, b) => a.priority - b.priority).map((module) => (
                <tr
                  key={module.id}
                  className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-900"
                >
                  <td className="py-3 px-4 text-slate-900 dark:text-slate-100">
                    {module.priority}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900 dark:text-slate-100">
                    {module.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600 dark:text-slate-400">
                    {module.description}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${module.weight * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-700 dark:text-slate-300 w-12">
                        {(module.weight * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {module.enabled ? (
                      <span className="inline-flex items-center gap-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 px-2 py-1 rounded text-xs font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        有効
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded text-xs font-medium">
                        <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
                        無効
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* アルゴリズムステップ */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          処理ステップ
        </h2>
        <div className="space-y-3">
          {ALGORITHM_FLOW.steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  {step.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* スコアリング閾値 */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          スコアリング閾値
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded border-l-4 border-red-500">
            <div className="text-sm text-red-600 dark:text-red-400 mb-1">最低スコア</div>
            <div className="text-2xl font-bold text-red-700 dark:text-red-300">
              {SCORING_THRESHOLDS.minScore}
            </div>
            <div className="text-xs text-red-600 dark:text-red-400 mt-1">これ以下は推薦しない</div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded border-l-4 border-yellow-500">
            <div className="text-sm text-yellow-600 dark:text-yellow-400 mb-1">許容スコア</div>
            <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
              {SCORING_THRESHOLDS.acceptableScore}+
            </div>
            <div className="text-xs text-yellow-600 dark:text-yellow-400 mt-1">70-79点</div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded border-l-4 border-blue-500">
            <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">良好スコア</div>
            <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
              {SCORING_THRESHOLDS.goodScore}+
            </div>
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">80-89点</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded border-l-4 border-green-500">
            <div className="text-sm text-green-600 dark:text-green-400 mb-1">優秀スコア</div>
            <div className="text-2xl font-bold text-green-700 dark:text-green-300">
              {SCORING_THRESHOLDS.excellentScore}+
            </div>
            <div className="text-xs text-green-600 dark:text-green-400 mt-1">90点以上</div>
          </div>
        </div>
      </section>

      {/* 商品取得設定 */}
      <section className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
          商品取得設定
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">最大カテゴリ数</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {PRODUCT_FETCH_CONFIG.maxCategories}カテゴリ
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">カテゴリあたり</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {PRODUCT_FETCH_CONFIG.hitsPerCategory}件
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">合計最大</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {PRODUCT_FETCH_CONFIG.maxTotalProducts}件
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">ソート順</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {PRODUCT_FETCH_CONFIG.sort}
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded">
            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">キャッシュ期限</div>
            <div className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              {PRODUCT_FETCH_CONFIG.cacheDuration / 1000 / 60 / 60 / 24}日
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
