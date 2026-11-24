<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <svg
    viewBox="0 0 640 310"
    class="h-auto w-full"
    role="img"
    :aria-label="t('synergy.title')"
    font-family="Inter, 'Noto Sans SC', sans-serif"
  >
    <defs>
      <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 10 5 0 10z" fill="var(--muted)" />
      </marker>
    </defs>

    <!-- Identity：账号体系 -->
    <g>
      <rect x="220" y="117" width="180" height="76" rx="18" fill="var(--surface)" stroke="#1687e8" stroke-width="2" />
      <text x="310" y="150" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! Identity</text>
      <text x="310" y="172" text-anchor="middle" font-size="12" fill="var(--muted)">OIDC · SAML · SCIM</text>
    </g>

    <!-- TravelAI -->
    <g>
      <rect x="450" y="40" width="170" height="76" rx="18" fill="var(--surface)" stroke="#6366f1" stroke-width="2" />
      <text x="535" y="73" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! TravelAI</text>
      <text x="535" y="95" text-anchor="middle" font-size="12" fill="var(--muted)">Android</text>
    </g>
    <path d="M400 142H425V78H446" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linejoin="round" marker-end="url(#arr)" />
    <text x="535" y="30" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('synergy.caption1') }}</text>

    <!-- Recorder -->
    <g>
      <rect x="450" y="194" width="170" height="76" rx="18" fill="var(--surface)" stroke="#2458db" stroke-width="2" />
      <text x="535" y="227" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! Recorder</text>
      <text x="535" y="249" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('synergy.captionRecorder') }}</text>
    </g>
    <path d="M400 168H425V232H446" fill="none" stroke="var(--muted)" stroke-width="2" stroke-linejoin="round" marker-end="url(#arr)" />

    <!-- Win Deployer（独立） -->
    <g>
      <rect x="20" y="40" width="180" height="76" rx="18" fill="var(--surface)" stroke="#16a34a" stroke-width="2" />
      <text x="110" y="73" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! Win Deployer</text>
      <text x="110" y="95" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('synergy.caption2') }}</text>
    </g>

    <!-- FlightAssistant（独立） -->
    <g>
      <rect x="20" y="194" width="180" height="76" rx="18" fill="var(--surface)" stroke="#f59e0b" stroke-width="2" />
      <text x="110" y="227" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! FlightAssistant</text>
      <text x="110" y="249" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('synergy.caption3') }}</text>
    </g>
  </svg>
</template>
