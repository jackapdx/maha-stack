/**
 * 🔱 Maha Stack — Tailwind CSS safelist
 *
 * This file ensures Tailwind v4's JIT scanner finds all utility classes
 * used in Angular component templates (which the scanner can't auto-detect).
 *
 * All classes here MUST match actual usage in templates.
 * Remove entries when no longer referenced.
 */

// ── Layout ──
const _0 = 'min-h-screen flex flex-col flex-grow';
const _1 = 'flex items-center justify-center justify-between';
const _2 = 'grid grid-cols-2 grid-cols-3 gap-4 gap-8 gap-6';
const _3 = 'max-w-6xl max-w-3xl max-w-2xl max-w-sm mx-auto';
const _4 = 'container mx-auto px-4';
const _5 = 'w-full h-16';

// ── Spacing ──
const _6 = 'py-24 py-8 py-6 py-5 py-4 py-3';
const _7 = 'px-6 px-4 px-3 pt-16 pb-8 mb-16 mb-12 mb-8 mb-6 mb-4 mb-2';
const _8 = 'mt-12 mt-1 mr-2 ml-3 ml-auto pl-3 pr-10';
const _9 = 'space-y-6 space-y-4 space-y-3 space-y-1';

// ── Typography ──
const _10 = 'text-5xl text-4xl text-3xl text-2xl text-xl text-lg text-base text-sm text-xs';
const _11 = 'font-bold font-medium font-semibold font-normal';
const _12 = 'leading-relaxed tracking-tight tracking-wider';
const _13 = 'text-center text-left uppercase';

// ── Colors (standard) ──
const _14 = 'text-white text-gray-900 text-gray-800 text-gray-700 text-gray-600 text-gray-500 text-gray-400';
const _15 = 'bg-white bg-gray-200 bg-gray-50';
const _16 = 'border-gray-200';

// ── Colors (Maha theme) ──
const _17 = 'text-maha-700 text-maha-600';
const _18 = 'text-surface-900 text-surface-800 text-surface-700 text-surface-600 text-surface-500 text-surface-400';
const _19 = 'bg-surface-50 bg-surface-100 bg-surface-200';

// ── Surfaces ──
const _20 = 'bg-white/80 bg-white/60';
const _21 = 'backdrop-blur backdrop-blur-md';

// ── Borders ──
const _22 = 'border border-t border-b border-surface-200 border-surface-300 rounded-lg rounded-xl rounded-full';

// ── Shadows ──
const _23 = 'shadow-sm shadow';

// ── Interactions ──
const _24 = 'hover:text-maha-700 hover:text-surface-600 hover:text-surface-700 hover:bg-surface-100 hover:bg-surface-300 hover:border-surface-300';
const _25 = 'transition-all cursor-pointer';

// ── States ──
const _26 = 'opacity-50 disabled:opacity-50 disabled:cursor-not-allowed';
const _27 = 'sr-only';

// ── Size utilities ──
const _28 = 'size-12 size-10 size-6 size-5 size-4';

// ── Overflow ──
const _29 = 'overflow-hidden';

// ── Position ──
const _30 = 'fixed inset-0 z-50';

// ── Animations ──
const _31 = 'animate-spin animate-pulse';

// ── Background ──
const _32 = 'bg-gradient-to-r from-maha-600 via-maha-700 to-maha-800 bg-clip-text text-transparent';
const _33 = 'bg-black/40';

// ── Aspect ratio ──
const _34 = 'aspect-square';

// ── Flexbox extras ──
const _35 = 'inline-flex flex-shrink-0 flex-1';

// ── Scrollbar ──
const _36 = 'w-10 h-10';

// ── Nx/CLI ──
const _37 = 'router-link-active';
