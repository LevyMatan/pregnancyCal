# Pregnancy Calendar Helper

This repository contains a WebApp called Pregnancy Calendar Helper. It helps display the pregnancy progress calendar based on the entered week and day. It also allows users to download an iCal file with the events.

## Using the WebApp

You can access the WebApp at: <link_placeholder>
All you have to do is to enter a known date with its matching week and day progress of the pregnancy. The WebApp will display the calendar with the events and allow you to download an iCal file with the events.

## How the WebApp Works

The WebApp is build using HTML, CSS and JavaScript. It uses the [ics](https://) library to display the calendar and [FileSaver.js](https://)
to download the iCal file.

## Want to modify the WebApp?

1. **Fork the Repository**: Click the "Fork" button in the upper right corner of the repository's GitHub page.

2. **Clone the Repository**: clone the repositpry using github desktop or command line.

3. **Deploy the WebApp**:

- Option 1: GitHub Pages
  - Commit and push your changes to the `main` branch.
  - Go to the repository's "Settings" tab.
  - Scroll down to the "GitHub Pages" section.
  - Choose the `main` branch as the source.
  - Click "Save" to deploy the WebApp using GitHub Pages.
  - Access the deployed WebApp at: `https://<username>.github.io/<repository>/`

- Option 2: GitHub Actions (Automatic Deployment)
  - Modify the `.github/workflows/main.yml` file to suit your needs.
  - Commit and push your changes to the `main` branch.
  - GitHub Actions will automatically build and deploy your WebApp.
  - Access the deployed WebApp at: `https://<username>.github.io/<repository>/`

## About the Author

Hi, I'm _Matan Levy_! I created this WebApp to provide a convenient way for expecting parents to track their pregnancy progress. Feel free to reach out to me at [levymatanlevy@gmail.com].
