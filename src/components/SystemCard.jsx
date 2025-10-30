import React, { useEffect, useState } from 'react';
import { SiApple, SiLinux, SiAndroid } from 'react-icons/si';
import { FaChrome,FaWindows, FaFirefoxBrowser, FaSafari, FaEdge, FaOpera, FaGlobe, FaUserSecret } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';

function detectOS() {
  if (typeof navigator === 'undefined') return { name: 'Unknown', icon: FaUserSecret };
  const ua = navigator.userAgent || '';
  const uaData = navigator.userAgentData;

  // Prefer userAgentData when available
  if (uaData && uaData.platform) {
    const p = uaData.platform.toLowerCase();
    if (p.includes('win')) return { name: 'Windows', icon: FaWindows };
    if (p.includes('mac')) return { name: 'macOS', icon: SiApple };
    if (p.includes('linux')) return { name: 'Linux', icon: SiLinux };
    if (p.includes('android')) return { name: 'Android', icon: SiAndroid };
  }

  if (/windows/i.test(ua)) return { name: 'Windows', icon: SiWindows };
  if (/macintosh|mac os x/i.test(ua)) return { name: 'macOS', icon: SiApple };
  if (/android/i.test(ua)) return { name: 'Android', icon: SiAndroid };
  if (/linux/i.test(ua)) return { name: 'Linux', icon: SiLinux };

  return { name: 'Unknown', icon: FaUserSecret };
}

function detectBrowser() {
  if (typeof navigator === 'undefined') return { name: 'Unknown', icon: FaGlobe };
  const ua = navigator.userAgent || '';
  const uaData = navigator.userAgentData;
  if (uaData && uaData.brands && uaData.brands.length) {
    const brand = uaData.brands[0].brand.toLowerCase();
    if (brand.includes('chrome')) return { name: 'Chrome', icon: FaChrome };
    if (brand.includes('safari')) return { name: 'Safari', icon: FaSafari };
    if (brand.includes('firefox')) return { name: 'Firefox', icon: FaFirefoxBrowser };
    if (brand.includes('edge')) return { name: 'Edge', icon: FaEdge };
    if (brand.includes('opera')) return { name: 'Opera', icon: FaOpera };
  }

  if (/edg\//i.test(ua)) return { name: 'Edge', icon: FaEdge };
  if (/opr\//i.test(ua) || /opera/i.test(ua)) return { name: 'Opera', icon: FaOpera };
  if (/chrome\//i.test(ua) && !/chromium/i.test(ua)) return { name: 'Chrome', icon: FaChrome };
  if (/firefox\//i.test(ua)) return { name: 'Firefox', icon: FaFirefoxBrowser };
  if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) return { name: 'Safari', icon: FaSafari };

  return { name: 'Unknown', icon: FaGlobe };
}

const SystemCard = () => {
  const [ip, setIp] = useState('loading...');
  // default to open; persist user's choice in localStorage
  const [visible, setVisible] = useState(true);

  // read persisted visible state (if any) on mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = window.localStorage.getItem('systemcard_visible');
        if (stored !== null) setVisible(stored === 'true');
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // persist visible state changes
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('systemcard_visible', visible ? 'true' : 'false');
      }
    } catch (e) {
      // ignore
    }
  }, [visible]);
  const os = detectOS();
  const browser = detectBrowser();

  useEffect(() => {
    let mounted = true;
    async function fetchIp() {
      try {
        // try lightweight ipify first
        const r = await fetch('https://api.ipify.org?format=json');
        if (!r.ok) throw new Error('ipify failed');
        const j = await r.json();
        if (mounted) setIp(j.ip || 'unknown');
      } catch (err) {
        try {
          const r2 = await fetch('https://ipapi.co/json/');
          if (!r2.ok) throw new Error('ipapi failed');
          const j2 = await r2.json();
          if (mounted) setIp(j2.ip || j2.city || 'unknown');
        } catch (err2) {
          if (mounted) setIp('unavailable');
        }
      }
    }
    fetchIp();
    return () => { mounted = false; };
  }, []);

  // When hidden, still render a small 'show' button so user can bring the card back
  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        aria-label="Show system info"
        className="fixed top-6 right-6 z-[99999] p-2 bg-white/90 dark:bg-gray-900/80 border border-blue-500/10 rounded-full shadow-lg backdrop-blur-sm"
      >
        <FiCpu size={18} className="text-blue-600 dark:text-cyan-200" />
      </button>
    );
  }

  const OSIcon = os.icon;
  const BrowserIcon = browser.icon;

  return (
    <div className="fixed top-6 right-6 z-[99999] w-64 sm:w-72 bg-white/90 dark:bg-gray-900/80 border border-blue-500/10 rounded-xl shadow-xl p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-xs text-gray-500 dark:text-cyan-200">System Info</div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Your device</h4>
        </div>
        <button onClick={() => setVisible(false)} className="text-sm text-gray-500 hover:text-gray-700 dark:text-cyan-200" aria-label="close">✕</button>
      </div>

      <div className="mt-3 space-y-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-300"><OSIcon size={20} /></div>
          <div>
            <div className="text-sm text-gray-600 dark:text-cyan-100">Operating System</div>
            <div className="font-medium text-gray-900 dark:text-white">{os.name}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-300"><BrowserIcon size={20} /></div>
          <div>
            <div className="text-sm text-gray-600 dark:text-cyan-100">Browser</div>
            <div className="font-medium text-gray-900 dark:text-white">{browser.name}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-500/10 text-yellow-600 dark:text-yellow-300"><FaGlobe size={18} /></div>
          <div>
            <div className="text-sm text-gray-600 dark:text-cyan-100">Public IP</div>
            <div className="font-medium text-gray-900 dark:text-white">{ip}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemCard;
