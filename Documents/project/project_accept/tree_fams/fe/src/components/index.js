/**
 * Pro Family Tree Components - Barrel Export
 * Centralized import point untuk semua komponen
 */

export { default as ProFamilyTreeVisualization } from "./ProFamilyTreeVisualization";
export { default as ProFamilyTreeCard } from "./ProFamilyTreeCard";
export { default as FamilyMemberAvatar } from "./FamilyMemberAvatar";

// Optional: Export examples dan test data
export {
  SimpleExample,
  IntegratedExample,
  CustomCardExample,
  AvatarShowcaseExample,
  DataTransformationExamples,
} from "./USAGE_EXAMPLES";

export {
  SimpleFamily,
  MultiSpouseFamily,
  LargeExtendedFamily,
  mockHandlers,
} from "./TEST_DATA";

/**
 * Usage:
 *
 * // Import individual components
 * import { ProFamilyTreeVisualization, ProFamilyTreeCard } from './components';
 *
 * // Or import everything
 * import * as FamilyTree from './components';
 *
 * // Or in other files
 * import { SimpleFamily, mockHandlers } from './components/TEST_DATA';
 */
