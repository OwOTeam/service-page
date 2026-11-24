<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <svg
    viewBox="0 0 640 300"
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

    <!-- Identity 居中 -->
    <g>
      <rect x="230" y="110" width="180" height="76" rx="18" fill="var(--surface)" stroke="#1687e8" stroke-width="2" />
      <text x="320" y="143" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! Identity</text>
      <text x="320" y="165" text-anchor="middle" font-size="12" fill="var(--muted)">OIDC · SAML · SCIM</text>
    </g>

    <!-- TravelAI -->
    <g>
      <rect x="440" y="110" width="170" height="76" rx="18" fill="var(--surface)" stroke="#6366f1" stroke-width="2" />
      <text x="525" y="143" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! TravelAI</text>
      <text x="525" y="165" text-anchor="middle" font-size="12" fill="var(--muted)">Android</text>
    </g>
    <path d="M410 148H436" stroke="var(--muted)" stroke-width="2" marker-end="url(#arr)" />
    <text x="425" y="100" text-anchor="middle" font-size="11" fill="var(--muted)">{{ t('synergy.caption1') }}</text>

    <!-- Win Deployer -->
    <g>
      <rect x="30" y="30" width="180" height="76" rx="18" fill="var(--surface)" stroke="#16a34a" stroke-width="2" />
      <text x="120" y="63" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! Win Deployer</text>
      <text x="120" y="85" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('synergy.caption2') }}</text>
    </g>

    <!-- FlightAssistant -->
    <g>
      <rect x="30" y="196" width="180" height="76" rx="18" fill="var(--surface)" stroke="#f59e0b" stroke-width="2" />
      <text x="120" y="229" text-anchor="middle" font-size="16" font-weight="700" fill="var(--ink)">OwO! FlightAssistant</text>
      <text x="120" y="251" text-anchor="middle" font-size="12" fill="var(--muted)">{{ t('synergy.caption3') }}</text>
    </g>

  </svg>
</template>
