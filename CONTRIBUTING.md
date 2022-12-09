# Contributing guide

We welcome contributions to the supplementary style guide project. You can either [open an issue](https://github.com/redhat-documentation/doc-style/issues) for discussion, or submit an update using the steps below.

## Submitting an update

These instructions show how to submit an update using the command line. You may also use the GitHub web interface for the update. Whichever method you choose, the update should be submitted as a pull request.

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

After you submit a pull request, at least three repository administrators must review and approve the content changes. 
When your PR has three such approvals, a repository administrator will merge your PR to the `main` branch.
## Building the guide

You must have `asciidoctor` installed.

1. Navigate to the `supplementary_style_guide` directory.
2. Use the following command to build the guide:

   ```
   $ asciidoctor main.adoc
   ```

This generates a `main.html` file that you can now view in a browser.

## Contributing guidelines

See the [Contributing guidelines](GUIDELINES.adoc) for guidelines to follow when making an update.
