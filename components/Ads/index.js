import { useEffect } from "react";
import { adsenseConfig } from "@/configs/gg-adsense";

export default function GoogleAds() {
  useEffect(() => {
    const pushAd = () => {
      try {
        const { adsbygoogle } = window;
        adsbygoogle.push({});
      } catch (e) {
        console.error(e);
      }
    };

    const interval = setInterval(() => {
      if (window.adsbygoogle) {
        pushAd();
        clearInterval(interval);
      }
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client={adsenseConfig.data_ad_client}
      data-ad-slot={adsenseConfig.data_ad_slot}
      data-ad-format={adsenseConfig.data_ad_format}
      data-full-width-responsive={adsenseConfig.data_full_width_responsive}
    />
  );
}
