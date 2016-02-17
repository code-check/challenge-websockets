## Login API
As most of the specification is already defined in the spec files (see the spec folder), 
some steps might seem to be lacking information to run correctly, 
in these cases please read the spec file belonging to the step.

All calls done to the API shall be RESTful, all data shall be json.

### Step 1, Registration
Create a registration portal according to the specifications.

Temporaly save all registered accounts, please make sure you clear them every run.

Also add a very simple password policy in which "123abc!" will be valid, but "root" will be invalid.

### Step 2, Login
Create a registration portal according to the specifications.

Please check for the password and existence of the account.

On a valid login, please provide the user with a login token which can be used for further references.

### Step 3, Delete
We also need to add functionality to delete an account. To delete an account, a valid token needs to be provided.