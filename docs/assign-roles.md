
# Manage access to a workspace

In this article, you will learn how to manage access to a Microsoft Playwright Testing workspace. The service uses [Azure role-based access control](/azure/role-based-access-control/overview) (Azure RBAC) to authorize access rights to your workspace. Role assignments are the way you control access to resources using Azure RBAC.

## Default roles

Microsoft Playwright Testing workspaces use three Azure built-in roles to manage access to a workspace. To grant users access to a workspace, you assign them one of the following Azure built-in roles:

| Role | Access level |
| --- | --- |
| **Reader** | Have read-only access to the workspace in the Microsoft Playwright Testing portal. Readers can view test results for the workspace. Readers can't create workspace access keys. |
| **Contributor** | Have full access to manage the workspace in the Azure portal but can't assign roles in Azure RBAC. Contributors have full access to the workspace in the Microsoft Playwright Testing portal and can create access keys. |
| **Owner** | Have full access to manage the workspace in the Azure portal, including assigning roles in Azure RBAC. Owners have full access to the workspace in the Microsoft Playwright Testing portal and can create access keys in the workspace. |

> [!IMPORTANT]
> Before you assign an Azure RBAC role, determine the scope of access that is needed. Best practices dictate that it's always best to grant only the narrowest possible scope. Azure RBAC roles defined at a broader scope are inherited by the resources beneath them. For more information about scope for Azure RBAC role assignments, see [Understand scope for Azure RBAC](https://learn.microsoft.com/en-us/azure/role-based-access-control/scope-overview).

## Grant access to a user

You can grant a user access to a Microsoft Playwright Testing workspace using the Azure portal:

1. Sign in to the [Azure portal](https://portal.azure.com), and go to your Microsoft Playwright Testing workspace.

1. On the left pane, select **Access Control (IAM)**, and then select **Add > Add role assignment**.

    If you don't have permissions to assign roles, the Add role assignment option will be disabled.

    ![Screenshot that shows how to add a role assignment to your workspace in the Azure portal](./media/assign-roles/add-role-assignment.png)
    
1. On the **Role** tab, select **Privileged administrator roles**.

1. Select one of the Microsoft Playwright Testing [default roles](#default-roles), and then select **Next**.

    ![Screenshot that shows the list of roles when adding a role assignment in the Azure portal.](./media/assign-roles/add-role-assignment-select-role.png)
    

1. On the **Members** tab, make sure **User, group, or service principal** is selected.

1. Then, select **Select members**, find and select the users you want to grant access to, and then select **Next**.

    ![Screenshot that shows the member selection interface when adding a role assignment in the Azure portal.](./media/assign-roles/add-role-assignment-select-members.png)
   

1. Select **Review + assign** to assign the role.

    For more information about how to assign roles, see [Assign Azure roles using the Azure portal](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-portal).

## Revoke access for a user

You can revoke a user's access to a Microsoft Playwright Testing workspace using the Azure portal:

1. Sign in to the [Azure portal](https://portal.azure.com), and go to your Microsoft Playwright Testing workspace.

1. On the left pane, select **Access Control (IAM)**, and then select **Role assignments**.

1. In the list of role assignments, add a checkmark next to the user and role you want to remove, and then select **Remove**.

    ![Screenshot that shows the list of role assignments and how to delete an assignment in the Azure portal.](./media/assign-roles/remove-role-assignment.png)


1. Select **Yes** in the confirmation window to remove the role assignment.

    For more information about how to remove role assignments, see [Remove Azure role assignments](https://learn.microsoft.com/en-us/azure/role-based-access-control/role-assignments-remove).

## (Optional) Use Azure AD security groups to manage workspace access

 Instead of granting or revoking access to individual users, you can manage access for groups of users using Azure AD security groups. This approach has the following benefits:

- Avoid the need for granting team or project leaders the Owner role on the workspace. You can grant them access only to the security group to let them manage access to the workspace.
- You can organize, manage and revoke users' permissions on a workspace and other resources as a group, without having to manage permissions on a user-by-user basis.
- Using Azure AD groups helps you to avoid reaching the [subscription limit](https://learn.microsoft.com/en-us/azure/role-based-access-control/troubleshooting?tabs=bicep#limits) on role assignments.

To use Azure AD security groups:

1. [Create a security group](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-groups-create-azure-portal).

1. [Add a group owner](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-accessmanagement-managing-group-owners). This user has permissions to add or remove group members. The group owner isn't required to be group member, or have direct RBAC role on the workspace.

1. Grant the security group access on the workspace by assigning the group one of the [default roles](#default-roles).

1. [Add group members](https://learn.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-groups-members-azure-portal). The added members can now access the workspace.

## Troubleshooting

Here are a few points to consider when using Azure role-based access control (Azure RBAC):

- To assign roles in Azure, your account needs the [User Access Administrator](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#user-access-administrator), [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner), or one of the [classic administrator roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles#classic-subscription-administrator-roles).

    To verify your permissions in the Azure portal:

    1. In the [Azure portal](https://portal.azure.com), go to your Microsoft Playwright Testing workspace.
    1. On the left pane, select **Access Control (IAM)**, and then select **View my access**.
    1. Verify that [User Access Administrator](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#user-access-administrator), [Owner](https://learn.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#owner), or one of the [classic administrator roles](https://learn.microsoft.com/en-us/azure/role-based-access-control/rbac-and-directory-admin-roles#classic-subscription-administrator-roles) are in the list of role assignments.

    Request the permissions from your Azure subscription administrator, or have them configure the workspace access.

- When you create a resource in Azure, such as a workspace, you are not automatically the owner of the resource. Your role is inherited from the highest scope role that you are authorized against in that subscription. As an example, if you are a Contributor for the subscription, you have the permissions to create a Microsoft Playwright Testing workspace. However, you would be assigned the Contributor role against that workspace, and not the Owner role.

- When there are two role assignments to the same Azure Active Directory user with conflicting sections of Actions/NotActions, your operations listed in NotActions from one role might not take effect if they are also listed as Actions in another role. To learn more about how Azure parses role assignments, read [How Azure RBAC determines if a user has access to a resource](https://learn.microsoft.com/en-us/azure/role-based-access-control/overview#how-azure-rbac-determines-if-a-user-has-access-to-a-resource).

- It can sometimes take up to 1 hour for your new role assignments to take effect over cached permissions across the stack.
