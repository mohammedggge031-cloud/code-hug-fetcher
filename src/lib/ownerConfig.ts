/**
 * Single source of truth for the primary owner account email.
 *
 * Certain admin surfaces (currently: /admin/pricing) are locked down to
 * exactly this email in addition to the standard role/permission checks.
 * Keep in sync with docs/manual-sql/fix-owner-role-permissions.sql.
 */
export const OWNER_EMAIL = "info@alhamdacademy.net";

export const isPrimaryOwnerEmail = (email?: string | null): boolean =>
  !!email && email.trim().toLowerCase() === OWNER_EMAIL;
