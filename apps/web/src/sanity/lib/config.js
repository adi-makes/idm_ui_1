// =============================================================================
// Sanity project configuration — single source of truth for all Sanity env
// vars. Imported by client.js and fetch.js; never read process.env directly
// in those files.
//
//   Safe to expose (NEXT_PUBLIC_*): projectId, dataset, apiVersion, studioUrl
//   Server-only (never sent to browser): readToken
// =============================================================================

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim()

function isValidProjectId(value) {
  return /^[a-z0-9-]+$/.test(value || '')
}

export const projectId = isValidProjectId(rawProjectId) ? rawProjectId : undefined
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'

/** Path or URL where the Studio is hosted (used by visual editing links). */
export const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'

/** Server-only read token — required for Draft Mode / preview. */
export const readToken = process.env.SANITY_API_READ_TOKEN

/** True only when a valid project id is present, so the app degrades gracefully. */
export const isSanityConfigured = Boolean(projectId)
