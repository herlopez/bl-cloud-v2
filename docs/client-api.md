# Brilliant Labs Web Client API

*  [Users](#head_users)
    *  [Overview](#head_users_overview)
    *  [Create User](#head_create_user)
    *  [Delete User](#head_delete_user)
    *  [Change User Key](#head_change_key)
    *  [Change User Email](#head_change_email)
    *  [Change User Usernam](#head_change_username)
    *  [Recover User Key](#head_recover_user_key)
*  [Projects](#head_projects)
    *  [Overview](#head_projects_overview)
    *  [Create Project](#head_create_project)
    *  [Change Project Name](#head_change_project_name)
    *  [Delete Project](#head_delete_project)
    *  [Add User To Project](#head_add_user_project)
    *  [Remove User From Project](#head_remove_user_project)
    *  [Make Project Public](#head_make_project_public)
    *  [Make Project Private](#head_make_project_private)
    *  [Request New Project API Key](#head_request_new_project_api_key)


SIGN_IN
email
key

## <a name="head_users"></a> Users

#### <a name="head_users_overview"></a> Overview

User management commands are intended to be used by the web client for creating, removing and editing users.

Please note that these commands only work over https.

Open https connection to: **https://cloud.brilliantlabs.ca/client**

#### <a name="head_create_user"></a> CREATE_USER

Command that creates a user.

An email will be sent and the user must click a confirmation link before the user can access the cloud.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**CREATE_USER**    |email     |String   |Email of the user to create.          |
|                   |name      |String   |Username of the user to create.       |
|                   |key       |String   |Password of the user to create.       |
##### Example
*Request:*
```json
{
  "cmd": "CREATE_USER",
  "email": "Test",
  "name": "JohnS",
  "key": "xxxxxxxxxxx"
}
```
*Response:*
```json
{
    "verified": false,
    "authorized": true
}
```
##### Example 2
*Request:*
```json
{
  "cmd": "CREATE_USER",
  "email": "Test",
  "name": "JohnS",
  "key": "xxxxxxxxxxx"
}
```
*Response:*
```json
{
    "verified": false,
    "authorized": false,
    "error": "Email already taken."
}
```
#### <a name="head_delete_user"></a> DELETE_USER

Command that deletes a user.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**DELETE_USER**    |email     |String   |Email of the user to delete.          |
|                   |key       |String   |Password of the user to delete.       |

#### <a name="head_change_key"></a> CHANGE_USER_KEY

Command that changes a users password.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**CHANGE_USER_KEY**    |email     |String   |Email of the user.                    |
|                   |key       |String   |Current password of the user.         |
|                   |new       |String   |New password of the user.             |

#### <a name="head_change_email"></a> CHANGE_USER_EMAIL

Command that changes a users email.
An email will be sent to the the email and the user must click a confirmation link before the new email address is active.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**CHANGE_USER_EMAIL**    |email         |String   |Email of the user.          |
|                   |key       |String   |Password of the user.                 |
|                   |new       |String   |New email of the user.                |

#### <a name="head_change_email"></a> CHANGE_USER_USERNAME

Command that changes a users username.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**CHANGE_USER_USERNAME**    |email         |String   |Email of the user.       |
|                   |key       |String   |Password of the user.                 |
|                   |new       |String   |New email of the user.                |

#### <a name="head_recover_user_key"></a> RECOVER_USER_KEY
Command that recovers a forgotten users key.

An email will be sent with the new temporary key.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**RECOVER_USER_KEY**    |email         |String   |Email of the user.       | 

## <a name="head_projects"></a> Projects

#### <a name="head_projects_overview"></a> Overview

#### <a name="head_create_project"></a> Create Project
Command that creates a new project.

An email will be sent with the new temporary key.

|Command            |Parameters|Type     |Description                           |
|-------------------|----------|---------|--------------------------------------|
|**RECOVER_USER_KEY**    |email         |String   |Email of the user.       | 