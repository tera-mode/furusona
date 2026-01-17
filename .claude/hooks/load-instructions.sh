#!/bin/bash
# Load project instructions at session start

INSTRUCTIONS_FILE="$CLAUDE_PROJECT_DIR/.claude/instructions.md"

if [ -f "$INSTRUCTIONS_FILE" ]; then
    echo "📋 プロジェクト固有ルール (.claude/instructions.md) を読み込みました"
    echo ""
    cat "$INSTRUCTIONS_FILE"
else
    echo "⚠️  .claude/instructions.md が見つかりません"
fi

exit 0
