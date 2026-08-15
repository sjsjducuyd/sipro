import React from "react";
import { CloudOff, RefreshCw, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useOffline } from "@/context/OfflineContext";
import { OFFLINE } from "@/constants/testIds";

/**
 * Spanduk keadaan jaringan (Fase 35) — muncul HANYA bila ada yang perlu diketahui:
 * sedang offline, ada pekerjaan menunggu terkirim, atau ada yang ditolak server.
 * Tujuannya menghilangkan rasa "pekerjaan saya hilang" saat sinyal lapangan mati.
 */
export default function OfflineBanner() {
  const { online, pending, rejected, flush } = useOffline();
  if (online && !pending && !rejected) return null;

  const tone = !online
    ? "border-amber-300 bg-amber-50 text-amber-900"
    : rejected
      ? "border-rose-300 bg-rose-50 text-rose-900"
      : "border-sky-300 bg-sky-50 text-sky-900";

  return (
    <div data-testid={OFFLINE.banner} data-online={online ? "1" : "0"}
      className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2 text-xs md:px-8 ${tone}`}>
      <p className="flex items-center gap-2">
        {online ? <UploadCloud className="h-4 w-4" /> : <CloudOff className="h-4 w-4" />}
        <span>
          {!online ? (
            <>
              <b>Mode offline.</b> Pekerjaan tetap bisa diajukan — tersimpan di perangkat dan
              terkirim otomatis begitu sinyal kembali.
            </>
          ) : rejected ? (
            <>
              <b>{rejected} pengajuan ditolak server.</b> Buka Papan Mandor untuk melihat
              alasannya — bukti fotonya masih tersimpan.
            </>
          ) : (
            <><b>Mengirim pekerjaan tersimpan…</b> Jangan tutup aplikasi dulu.</>
          )}
        </span>
        {pending ? (
          <span data-testid={OFFLINE.pending}
            className="rounded-full border border-current/30 bg-white/70 px-2 py-0.5 font-semibold">
            {pending} menunggu terkirim
          </span>
        ) : null}
      </p>
      {online && (pending || rejected) ? (
        <Button size="sm" variant="outline" data-testid={OFFLINE.flush}
          onClick={() => flush()}>
          <RefreshCw className="mr-1 h-3.5 w-3.5" /> Kirim sekarang
        </Button>
      ) : null}
    </div>
  );
}
