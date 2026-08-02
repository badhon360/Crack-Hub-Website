import React, { useState, useEffect, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import AppCard from '../components/AppCard';
import { getApps } from '../services/firebase';
import { filterAppsByName } from '../utils/helpers';
import { Terminal, Flame, Sparkles, Cpu, Layers } from 'lucide-react';

export default function Home() {
  const [apps, setApps] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadAppsData() {
      try {
        const firestoreApps = await getApps();
        setApps(Array.isArray(firestoreApps) ? firestoreApps : []);
      } catch (error) {
        console.error('Error fetching apps:', error);
        setApps([]);
      }
    }

    loadAppsData();
  }, []);

  // Search
  const searchResults = useMemo(() => {
    return filterAppsByName(apps, searchQuery);
  }, [apps, searchQuery]);

  // Latest Apps
  const latestApps = useMemo(() => {
    return [...apps].sort((a, b) => {
      const aTime =
        a.createdAt?.seconds ??
        (a.createdAt instanceof Date ? a.createdAt.getTime() : 0);

      const bTime =
        b.createdAt?.seconds ??
        (b.createdAt instanceof Date ? b.createdAt.getTime() : 0);

      return bTime - aTime;
    });
  }, [apps]);

  // Most Downloaded
  const mostDownloadedApps = useMemo(() => {
    return [...apps].sort(
      (a, b) => (Number(b.downloads) || 0) - (Number(a.downloads) || 0)
    );
  }, [apps]);

  return (
    <div className="space-y-10">

      {/* Hero */}
      <section className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl py-8 sm:py-10 md:py-12 overflow-hidden shadow-2xl">
        <div className="absolute inset-0 scanline opacity-10 pointer-events-none"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 sm:w-56 sm:h-56 bg-[#00ff41]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex items-center justify-center px-4">
          <h1 className="font-orbitron font-black text-white text-center leading-tight text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            BADHON'S{" "}
            <span className="text-[#00ff41] glow-text-green">
              CRACK HUB
            </span>
          </h1>
        </div>
      </section>

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalResultsCount={searchResults.length}
      />

      {searchQuery.trim() ? (
        <section className="space-y-6">

          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-[#00ff41]" />
              <h2 className="font-orbitron font-bold text-lg text-white">
                SEARCH RESULTS
              </h2>
            </div>

            <span className="font-mono text-xs text-gray-400">
              FOUND {searchResults.length}
            </span>
          </div>

          {searchResults.length === 0 ? (
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center space-y-4">

              <Cpu className="w-12 h-12 mx-auto text-[#00ff41]" />

              <h3 className="font-orbitron text-lg text-white">
                NO APPS FOUND
              </h3>

              <p className="font-mono text-xs text-gray-400">
                No apps matched "{searchQuery}"
              </p>

              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 rounded-lg bg-[#00ff41] text-black font-bold text-xs"
              >
                CLEAR SEARCH
              </button>

            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>
          )}

        </section>
      ) : (
        <div className="space-y-12">

          {/* Latest */}
          <section className="space-y-6">

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#00ff41]" />
                <h2 className="font-orbitron font-bold text-lg text-white">
                  LATEST APPS
                </h2>
              </div>

              <span className="font-mono text-xs text-gray-400">
                RECENT RELEASES
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {latestApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>

          </section>

          {/* Most Downloaded */}
          <section className="space-y-6">

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#00ff41]" />
                <h2 className="font-orbitron font-bold text-lg text-white">
                  MOST DOWNLOADED
                </h2>
              </div>

              <span className="font-mono text-xs text-gray-400">
                POPULAR APKS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mostDownloadedApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </div>

          </section>

        </div>
      )}

    </div>
  );
}