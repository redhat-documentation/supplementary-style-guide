# Contributing guide

We welcome contributions to the supplementary style guide project. To contribute to the project, first [open an issue](https://github.com/redhat-documentation/doc-style/issues) for discussion, and then submit an update as a pull request (PR). 

## Opening an issue

By opening an issue first before you submit a PR, you help us track and prioritize changes, as well as expedite them when necessary.

Before you begin:

* You must have a GitHub account.

Take these steps:

1. From the main page of the [GitHub repository](https://github.com/redhat-documentation/supplementary-style-guide), open the [Issues tab](https://github.com/redhat-documentation/doc-style/issues).
2. Click **New issue**.
3. Select **Bug report** or **Enhancement request**.
4. Describe the issue in the **Title**, and select **Severity** and **Priority**.

## Submitting an update

You can submit an update by using the command line or the GitHub web interface. Whichever method you choose, submit the update as a pull request. A repository administrator must approve all updates before they can be merged. 

Before you begin:

* You must have a GitHub account.
* You must have [set up an SSH key for your GitHub account](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account).

The first time you contribute:

1. Fork the repository.

   From the main page of the [GitHub repository](https://github.com/redhat-documentation/supplementary-style-guide), click **Fork** in the upper right corner.

2. Clone the forked repository locally.

   ```
   $ git clone git@github.com:<username>/supplementary-style-guide.git
   ```

   If this command fails, be sure that you have [set up an SSH key for GitHub](https://docs.github.com/en/github/authenticating-to-github/adding-a-new-ssh-key-to-your-github-account).

3. Navigate to the `supplementary-style-guide` directory.

4. Set the upstream remote repository.

   ```
   $ git remote add -f upstream git@github.com:redhat-documentation/supplementary-style-guide.git
   ```

To submit an update:

1. Fetch the latest changes.

   ```
   $ git fetch upstream
   ```

2. Check out a branch from `upstream/main`.

   ```
   $ git checkout -b <new-branch> upstream/main
   ```

3. Make your edits.

   Add or edit files as needed. Be sure to follow the [contributing guidelines](GUIDELINES.adoc) for this project.

4. Stage the changes for each file.

   ```
   $ git add <file-name>
   ```

5. Commit the changes.

   ```
   $ git commit -m "<descriptive-commit-message>"
   ```

6. Push the changes to your forked repository.

   ```
   $ git push origin HEAD
   ```

7. Open a pull request.
 
   Typically the previous command gives the URL to open a pull request. If not, you can open one from the [Pull requests](https://github.com/redhat-documentation/supplementary-style-guide/pulls) tab of the GitHub UI.

After you submit a pull request, a preview URL is automatically generated. You can open that URL to see if your change is formatted corretly.

At least **one** repository administrator must review and approve the content changes. After your PR has one approval, a repository administrator will merge your PR to the `main` branch.

## Associating the PR with an issue

Associating the PR with an issue ensures that any changes to the GitHub repo are properly tracked. 

To associate your PR with the issue number in the GitHub web interface:

1. Open your PR.
2. In the right-hand sidebar, go to the Development section, click the gear icon, and select **Link an issue**.
3. Select the issue from the list.

## Building the guide

You must have `asciidoctor` installed.

1. Navigate to the `supplementary_style_gde` directory.
2. Use the following command to build the guide:

   ```
   $ asciidoctor main.adoc
   ```

This generates a `main.html` file that you can now view in a browser.

## Contributing guidelines

See the [Contributing guidelines](GUIDELINES.adoc) for guidelines to follow when making an update.
