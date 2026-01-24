'use client';

import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdBannerProps = {
  className?: string;
  adSlot?: string; // AdSenseで作成した広告ユニットのスロットID
};

export default function AdBanner({ className = '', adSlot }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // 広告スロットIDがない場合は自動広告に任せる（何も表示しない）
    if (!adSlot) {
      return;
    }

    // 既にロード済みの場合はスキップ
    if (isAdLoaded.current) {
      return;
    }

    try {
      if (typeof window !== 'undefined' && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, [adSlot]);

  // 広告スロットIDがない場合はプレースホルダーを表示（自動広告用のスペース）
  if (!adSlot) {
    return (
      <div className={`ad-container my-8 min-h-[100px] ${className}`}>
        {/* 自動広告がここに表示される可能性があります */}
      </div>
    );
  }

  return (
    <div className={`ad-container my-8 ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5781326713622626"
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
