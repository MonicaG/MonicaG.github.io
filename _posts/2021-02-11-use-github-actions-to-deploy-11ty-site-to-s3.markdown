---
title: How To Use GitHub Actions To Deploy an 11ty Websiteite To S3
layout: post
category: webdev
desc: A walkthrough describing how to setup a GitHub Actions workflow to deploy an 11ty website to AWS-S3.
layout: post
excerpt_separator: <!--more-->
youtubeId: h-iowIY4DCU
---


I use [11ty](https://www.11ty.dev/) to generate a static website and [S3](https://aws.amazon.com/s3/) to host it. This post describes how I set up a workflow in [GitHub Actions](https://docs.github.com/en/actions) to build and deploy the website. The workflow uses the AWS - CLI [S3 - sync](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html) command to transfer the files. 


This post describes how to:
* create an AWS policy with only those permission needed by the `sync` command
* create an [AWS individual IAM user](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) with the above policy
* create a GitHub Action workflow using the `sync` command to upload the files


I will provide the policy and workflow files first for those wanting only the code. A detailed [walkthrough](#walk-through) is provided below these files. This post assumes you already have set up an S3 bucket. If not, please see the [Hosting a static website using Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) guide.  
<!--more-->


#### **`s3_sync_policy.json`** {#json}
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "s3:PutObject",
                "s3:GetObject",
                "s3:ListBucket",
                "s3:DeleteObject",
                "s3:GetBucketLocation"
            ],
            "Resource": [
                "arn:aws:s3:::your-bucket-name",
                "arn:aws:s3:::your-bucket-name/*"
            ]
        }
    ]
}
```

#### **`github_build_and_deploy_workflow.yml`** {#yml}
```yml
name: Build and Deploy to S3
on: [push]
jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v2.3.4

      # Uncomment if you want to specify a certain 
      # Node version. Otherwise the Node version installed
      # on the GitHub VM will be used. For more details
      # see: https://github.com/actions/virtual-environments 
      # - name: Setup Node.js environment
      #   uses: actions/setup-node@v2.1.4
      #   with:
      #     node-version: '15.7.0'

      # Uncomment if your project uses dependencies
      # - name: Install dependencies
      #   run: npm install

      - name: Build the website
        run: npx @11ty/eleventy
      
      - name: Configure AWS Credentials
        uses: aws-actions/configure-aws-credentials@v1
        with:
          aws-access-key-id: {% raw  %}${{ secrets.AWS_ACCESS_KEY_ID }}{% endraw %}
          aws-secret-access-key: {% raw  %}${{ secrets.AWS_SECRET_ACCESS_KEY }}{% endraw %}
          aws-region: us-west-2 # replace this with your aws-region

      - name: Upload files to S3 with AWS CLI
        run: |
          aws s3 sync _site/ s3://{% raw %}${{ secrets.S3_BUCKET }}{% endraw %} --delete 
```

## Walk-through 

There are many menus to navigate to set this up. I've created a video walk through to help explain where everything is. If you want just the text write up then please skip to the [AWS Setup section below](#aws-setup).

{% include youtube.html id=page.youtubeId %}

### AWS Setup

Using an individual IAM account with limited permissions is a best practice. Creating a new user, rather than using an existing one, means the credentials are not shared across services. If the credentials change then GitHub alone will be affected. Plus, we can restrict the user to only those permissions needed by the workflow. In this case, the account will only have permissions for the actions needed by the `sync` command. For more details on credential best practices, see the [configure-aws-credentials](https://github.com/marketplace/actions/configure-aws-credentials-action-for-github-actions#credentials) documentation.



#### Create a policy

The first step is to create a policy that will only contain the permissions needed by the `sync` command. This policy will be used during the account creation step. 

To create the policy:

* Sign in to the [IAM Console](https://console.aws.amazon.com/iam/).
* Goto Access Management -> Policies -> Create Policy.
* Click the JSON tab and paste in the [JSON policy from above](#json).
* Click the 'Review' Policy button.
* Next, name the policy. I used S3-Sync-Policy. 
* Click the 'Create Policy' button.

This policy does the following:
* Allows the following actions:
  * `s3:PutObject`
    * "Grants permission to add an object to a bucket"
  * `s3:GetObject` 
    * "Grants permission to retrieve objects from Amazon S3"
  * `s3:ListBucket` 
    * "Grants permission to list some or all of the objects in an Amazon S3 bucket"
  * `s3:DeleteObject` 
    * "Grants permission to remove the null version of an object and insert a delete marker, which becomes the current version of the object"
  * `s3:GetBucketLocation` 
    * Grants permission to return the Region that an Amazon S3 bucket resides in"
* Specifies the resources the actions can be applied to. Ensure you change the `your-bucket-name` value.
  * `arn:aws:s3:::your-bucket-name`
    * Applied to the bucket: `your-bucket-name`
  * `arn:aws:s3:::your-bucket-name/*`
    * Applied to all objects in `your-bucket-name`


You can also create the policy using the Visual Editor rather than pasting in the JSON code.  Note: You do not need to do both. The Visual Editor is a second way to create the policy. The video demonstrates using the Visual Editor.

#### Create a user
The next step is to create a user and apply the policy to it.

To create a user:
* Goto Access Management -> Users -> Add user
* On the first screen:
  * Enter a name in the "User Name" field. I chose github-actions.
  * Select "Programmatic access" in the "Access Type" section. This user does not need "AWS Management Console access". 
  * Click the "Next: Permissions" button.
* On the second screen:
  * Click on the "Attach existing policies directly" box in the "Set permissions" section.
  * Use the search feature to find the policy created in the previous section. Select it.
<img src="/images/github-actions/iam-create-user-filter-policy.png" class="img-fluid mx-auto d-block" alt="The IAM Add User Permission screen. The search feature has been used to find the policy created previously.">
  * Click the "Next: Tags" button.
* On the third screen:
  * Optionally add a tag (or more) for the user.
  * Click the "Next: Review" button.
* On the fourth screen:
  * Review the user settings.
  * Click the "Create User" button.
* On the fifth screen:
  * This screen displays the user's AWS credentials. These will be used with the GitHub repo. WARNING: This is the only time the credentials will be available to download. Either keep this screen open while setting up GitHub, OR click the Download button.


### GitHub Setup

#### Setup AWS Credentials

The GitHub action will need the AWS credentials in order to work. Add the credentials to your repo by doing the following:

* Go to your repo
* Click Settings -> Secrets -> New Repository Secret
* Using the credentials created in the previous section, add keys for:
  * `AWS_ACCESS_KEY_ID`
  * `AWS_SECRET_ACCESS_KEY` 
* Also, add an `S3_BUCKET` key with the name of your S3 bucket.


#### Create a GitHub Workflow

Now to create a workflow that will build the website and upload it to S3.  The workflow will do the following:
* Use the [configure-aws-credentials](https://github.com/marketplace/actions/configure-aws-credentials-action-for-github-actions) to access the AWS access and secret keys
* Build the website using 11ty
* Use the [AWS-CLI](https://aws.amazon.com/cli/) to upload the generated site to the S3 bucket


To create the workflow:
* In your repo click the Actions link.
* Click on the "Skip this and set up a workflow yourself" link.  
* Remove the template code and replace it with the [yml file from above](#yml).
* Change the `aws-region` location to your bucket's region.
* Optionally, rename the file.
* Click the "Start Commit" button.

 
Below is a description of what each line does:

```yml
name: Build and Deploy to S3
```
* The name of this workflow. It will show under the Actions tab in your repository. Name the workflow whatever you like. 

```yml
on: [push]
```
* This is the event that will trigger this workflow. In this example, it will run on any push to the repository. See [Events that trigger workflows](https://docs.github.com/en/actions/reference/events-that-trigger-workflows) for other options.

```yml
jobs:
```
* Groups together the jobs that run in this workflow (Build and Deploy to S3).

```yml
build_and_deploy:
``` 
* The name of the job. This name can be whatever you would like it to be. 

```yml
runs-on: ubuntu-latest
```
* In this example, the workflow will run in an ubuntu virtual environment using the latest version supported by GitHub. See [Specifications for GitHub-hosted runners](https://docs.github.com/en/actions/reference/specifications-for-github-hosted-runners) for other options. 

```yml
steps:
```
* Groups together all the steps that run during the build_and_deploy job. 

```yml
- name:  Checkout repository`
  uses: actions/checkout@v2.3.4
```
* This block of code is one step. The `name` is optional. If provided it will be displayed in the output when the workflow runs. The `uses` keyword retrieves the action to run in this step. An action is a reusable piece of code. In this case, the step uses the public action actions/checkout@v2.3.4 to checkout your repository. See the [Checkout](https://github.com/marketplace/actions/checkout) documentation for more details.

```yml
 - name: Build the website
   run: npx @11ty/eleventy
```
* This step uses the `run` keyword to execute a command-line program using the OS's default shell. In this case, `npx` is used to generate the 11ty website.

```yml
- name: Configure AWS Credentials
  uses: aws-actions/configure-aws-credentials@v1
  with:
    aws-access-key-id: {% raw %}${{ secrets.AWS_ACCESS_KEY_ID }}{% endraw %}
    aws-secret-access-key: {% raw %}${{ secrets.AWS_SECRET_ACCESS_KEY }}{% endraw %}
    aws-region: us-west-2 # replace this with your aws-region
```
* This step uses the public `configure-aws-credentials` action to set up the credentials for the workflow. The `with` keyword is a map of input parameters to the action. Here, the repo's AWS secret keys are passed to the action. See ["Configure AWS Credentials" Action For GitHub Actions](https://github.com/marketplace/actions/configure-aws-credentials-action-for-github-actions#credentials) for more details on this Action.

```yml
 - name: Upload files to S3 with AWS CLI
   run: |
     aws s3 sync _site/ s3://{% raw %}${{ secrets.S3_BUCKET }}{% endraw %} --delete 
```

* This step uses the AWS CLI to transfer the files generated by the "Build the website" step to the S3 bucket.  The AWS CLI is installed by default on the virtual machine. See the [GitHub Actions Virtual Environments](https://github.com/actions/virtual-environments) for more details on pre-installed tools.
* The [S3 sync](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html) command recursively copies files from the `_site` directory to the S3 bucket. The `--delete` option deletes any files in the S3 bucket that are not in the `_site` directory. 

#### Run the workflow

The workflow will run when a commit is pushed to the repo.  You can see the output of a run by going to the 'Actions' menu for the repo. Here is an example of the output of the workflow.

<img src="/images/github-actions/output.png" class="img-fluid mx-auto d-block" alt="The output after a workflow has been executed. It shows the steps run.">

Thank you for reading! I hope you found this useful!

## References

* [AWS Identity and Access Management User Guide](https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html)
* [AWS permissions required for sync](https://stackoverflow.com/q/48894886/4704303)
* [S3 - sync](https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3/sync.html)
* [GitHub Actions ](https://docs.github.com/en/actions)