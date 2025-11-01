# セキュリティガイドライン

## 🚨 重要: 機密情報の取り扱い

このドキュメントは、開発時に**絶対に守らなければならない**セキュリティルールを定めています。

---

## 1. APIキー・シークレットキーの取り扱い

### ❌ 絶対にやってはいけないこと

1. **ドキュメントに実際のAPIキーを記載しない**
   - ✗ `BREVO_API_KEY=xkeysib-3c2b8f9cd42a23b45a...`
   - ✓ `BREVO_API_KEY=your-brevo-api-key-here`

2. **コード内にAPIキーをハードコーディングしない**
   - ✗ `const apiKey = "xkeysib-3c2b8f9cd42a23b45a...";`
   - ✓ `const apiKey = process.env.BREVO_API_KEY;`

3. **コミットメッセージにAPIキーを含めない**

4. **スクリーンショットにAPIキーが映り込んでいないか確認**

5. **ログ出力にAPIキーを含めない**
   - ✗ `console.log('API Key:', apiKey);`
   - ✓ `console.log('API Key:', '***');`

### ✅ 正しい取り扱い方法

1. **環境変数で管理**
   ```javascript
   const apiKey = process.env.BREVO_API_KEY;
   if (!apiKey) {
     throw new Error('BREVO_API_KEY is not set');
   }
   ```

2. **ドキュメントにはプレースホルダーを使用**
   ```markdown
   BREVO_API_KEY=your-brevo-api-key-here
   FIREBASE_PRIVATE_KEY=your-private-key-here
   CRON_SECRET=your-random-secret-here
   ```

3. **`.gitignore`で機密ファイルを除外**
   ```
   .env*.local
   .env
   .env.production
   *.pem
   credentials.json
   service-account-key.json
   ```

---

## 2. 機密情報の種類

### 必ず保護すべき情報

- ✗ APIキー (`BREVO_API_KEY`, `GEMINI_API_KEY`, `RAKUTEN_APPLICATION_ID`等)
- ✗ シークレットキー (`RAKUTEN_APPLICATION_SECRET`, `CRON_SECRET`等)
- ✗ 秘密鍵 (`FIREBASE_PRIVATE_KEY`等)
- ✗ データベース接続文字列
- ✗ アクセストークン
- ✗ パスワード
- ✗ 個人情報（メールアドレス、電話番号等）

### 公開しても問題ない情報

- ✓ プロジェクトID (`NEXT_PUBLIC_FIREBASE_PROJECT_ID`)
- ✓ 公開URL (`NEXT_PUBLIC_APP_URL`)
- ✓ 一般的な設定値
- ✓ ドキュメント（実際の機密情報を含まない場合のみ）

---

## 3. コード作成時のチェックリスト

### 新しいファイルを作成する前

- [ ] 機密情報を含むか確認
- [ ] 機密情報を含む場合、環境変数から読み込む設計にする
- [ ] ハードコーディングは絶対にしない

### ドキュメントを作成する前

- [ ] 実際のAPIキーを記載しない
- [ ] プレースホルダーを使用する
- [ ] 例として記載する場合も架空の値を使う

### コミット前

- [ ] `git diff`で変更内容を確認
- [ ] 機密情報が含まれていないか目視確認
- [ ] `.env.local`など機密ファイルが含まれていないか確認
- [ ] コミットメッセージに機密情報が含まれていないか確認

### プルリクエスト前

- [ ] すべてのファイルを再確認
- [ ] ドキュメントに実際のAPIキーがないか確認
- [ ] スクリーンショットに機密情報が映っていないか確認

---

## 4. 万が一、機密情報をコミットしてしまった場合

### 即座に行うべきこと

1. **APIキーを即座に無効化・再生成**
   - Brevoの場合: Settings > API Keys > Revoke
   - Geminiの場合: Google Cloud Console > APIキーを削除
   - Rakutenの場合: アプリケーション設定から再発行

2. **Gitの履歴から完全に削除**
   ```bash
   # BFG Repo-Cleaner を使用（推奨）
   bfg --replace-text passwords.txt

   # または git filter-branch（非推奨）
   git filter-branch --force --index-filter \
     "git rm --cached --ignore-unmatch <file-path>" \
     --prune-empty --tag-name-filter cat -- --all
   ```

3. **強制プッシュ**
   ```bash
   git push origin --force --all
   ```

4. **関係者に通知**
   - チームメンバーに周知
   - セキュリティ担当者に報告

5. **インシデント記録**
   - 何が漏洩したか
   - いつ気づいたか
   - どう対処したか

---

## 5. 環境変数の管理

### ローカル開発

- `.env.local`に機密情報を記載
- `.env.local`は絶対にコミットしない
- `.env.example`はプレースホルダーのみ記載してコミット可

```bash
# .env.local (コミットしない)
BREVO_API_KEY=xkeysib-actual-key-here

# .env.example (コミットする)
BREVO_API_KEY=your-brevo-api-key-here
```

### 本番環境（Vercel）

- Vercelのダッシュボードで環境変数を設定
- 環境変数はチーム内で安全に共有
- 必要に応じて権限を制限

### GitHub Actions

- Repository Settings > Secrets で管理
- Secretsは暗号化されて保存される
- ログには`***`として表示される

---

## 6. レビュー時のチェックポイント

### コードレビュー時

- [ ] ハードコーディングされたAPIキーがないか
- [ ] 環境変数を適切に使用しているか
- [ ] ログ出力に機密情報が含まれていないか
- [ ] エラーメッセージに機密情報が含まれていないか

### ドキュメントレビュー時

- [ ] 実際のAPIキーが記載されていないか
- [ ] スクリーンショットに機密情報が映っていないか
- [ ] 設定例がプレースホルダーになっているか

---

## 7. 教訓: 過去のインシデント

### ケース: Brevo APIキーの漏洩リスク（2025年）

**何が起きたか:**
- `docs/EMAIL_SETUP.md`に実際のBrevo APIキーを記載
- GitHubに公開される前にユーザーが指摘し、修正

**学んだこと:**
- ドキュメント作成時も機密情報チェックが必須
- 自動化だけに頼らず、人間の目視確認が重要
- プレースホルダーを使う習慣を徹底

**対策:**
- このセキュリティガイドラインを作成
- コミット前のチェックリスト導入
- ドキュメントテンプレートにプレースホルダーを明記

---

## 8. 参考リンク

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [GitHub Secrets Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [.gitignore Templates](https://github.com/github/gitignore)

---

## まとめ

**🔐 セキュリティは全員の責任です**

- 機密情報は**絶対に**公開リポジトリにコミットしない
- 疑わしい場合は**必ず**確認する
- 万が一の場合は**即座に**対処する

**このガイドラインを常に参照し、セキュアな開発を心がけてください。**
