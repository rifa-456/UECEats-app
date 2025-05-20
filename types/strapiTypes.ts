import type {
  AdminApiToken,
  AdminApiTokenPermission,
  AdminPermission,
  AdminRole,
  AdminTransferToken,
  AdminTransferTokenPermission,
  AdminUser,
  ApiNotificationNotification,
  PluginContentReleasesRelease,
  PluginContentReleasesReleaseAction,
  PluginI18NLocale,
  PluginReviewWorkflowsWorkflow,
  PluginReviewWorkflowsWorkflowStage,
  PluginUploadFile,
  PluginUploadFolder,
  PluginUsersPermissionsPermission,
  PluginUsersPermissionsRole,
  PluginUsersPermissionsUser,
} from '@/types/generated/contentTypes';
import type { Entity } from './conversion';
import {AxiosResponse} from "axios";

export type UserType = Entity<PluginUsersPermissionsUser>;
export type NotificationType = Entity<ApiNotificationNotification>;
export type ApiTokenType = Entity<AdminApiToken>;
export type ApiTokenPermissionType = Entity<AdminApiTokenPermission>;
export type AdminPermissionType = Entity<AdminPermission>;
export type AdminRoleType = Entity<AdminRole>;
export type TransferTokenType = Entity<AdminTransferToken>;
export type TransferTokenPermissionType = Entity<AdminTransferTokenPermission>;
export type AdminUserType = Entity<AdminUser>;
export type ContentReleaseType = Entity<PluginContentReleasesRelease>;
export type ContentReleaseActionType = Entity<PluginContentReleasesReleaseAction>;
export type LocaleType = Entity<PluginI18NLocale>;
export type WorkflowType = Entity<PluginReviewWorkflowsWorkflow>;
export type WorkflowStageType = Entity<PluginReviewWorkflowsWorkflowStage>;
export type MediaFileType = Entity<PluginUploadFile>;
export type MediaFolderType = Entity<PluginUploadFolder>;
export type PermissionType = Entity<PluginUsersPermissionsPermission>;
export type RoleType = Entity<PluginUsersPermissionsRole>;
export type UserRole = RoleType;
export type UserMedia = MediaFileType;

export type StrapiError = AxiosResponse<{
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, unknown>;
  };
}>;