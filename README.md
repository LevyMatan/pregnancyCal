# Pregnancy Calendar Helper

This repository contains a modern, user-friendly WebApp called **Pregnancy Calendar Helper**. It helps expecting parents generate and visualize a pregnancy progress calendar.

<img src="https://raw.githubusercontent.com/levymatan/pregnancyCal/main/.github/screenshot.png" alt="Pregnancy Calendar Helper Screenshot" width="400"/>

## Using the WebApp

You can access the WebApp at: [**Pregnancy Calendar Helper**](https://levymatan.github.io/pregnancyCal/)

The app provides three simple ways to generate a calendar:
1.  **Known Date**: Enter any date along with the corresponding week and day of the pregnancy.
2.  **Last Period**: Enter the date of the last menstrual period.
3.  **Due Date**: Enter the expected due date.

Once the information is entered, the app will display a comprehensive calendar that you can also download as an iCal file to import into your personal calendar application.

## Key Features

*   **Multiple Calculation Methods**: Flexible options to generate the calendar based on what you know.
*   **42-Week Calendar**: Generates a full 42-week calendar to cover the entire possible length of pregnancy.
*   **Due Date Highlight**: Automatically marks the expected due date (end of week 40) on the calendar.
*   **Daily & Weekly Views**: Choose to view events by day or by week.
*   **iCal Export**: Download the calendar events for easy import into other calendar apps like Google Calendar or Apple Calendar.
*   **Responsive Design**: A clean, modern interface that works beautifully on both desktop and mobile devices.
*   **Input Validation**: Ensures the data you enter is sensible to prevent errors.

## Importing the Downloaded Calendar

After downloading the iCal (.ics) file, you can import it into your favorite calendar application. Here are the general steps for popular calendar clients:

### Google Calendar
1.  Open [Google Calendar](https://calendar.google.com) on a computer.
2.  In the top right, click **Settings** (gear icon) and then **Settings**.
3.  In the menu on the left, click **Import & Export**.
4.  Click **Select file from your computer** and select the downloaded `.ics` file.
5.  Choose the calendar you want to add the events to.
6.  Click **Import**.

### Apple Calendar (on macOS)
1.  Open the **Calendar** app on your Mac.
2.  Go to the **File** menu and select **Import**.
3.  Choose the downloaded `.ics` file and click **Import**.
4.  Select the calendar to which you want to add the events.

### Apple Calendar (on iPhone)
There are a few ways to import an `.ics` file on an iPhone:
*   **Direct Import**: After downloading the file in Safari, you may be prompted to add the events directly to your calendar.
*   **From the Files App**:
    1.  Download the `.ics` file and save it to the **Files** app (e.g., in the "Downloads" folder).
    2.  Open the **Files** app and locate the `.ics` file.
    3.  Tap on the file. The Calendar app should open and prompt you to add the events.
*   **Mail App Workaround**: If the above methods don't work, email the `.ics` file to yourself. Open the email in the Apple **Mail** app, tap the attachment, and you will be prompted to add the events to your calendar.

### Microsoft Outlook (on Windows)
1.  Open **Outlook**.
2.  Go to **File** > **Open & Export** > **Import/Export**.
3.  Select **Import an iCalendar (.ics) or vCalendar file (.vcs)** and click **Next**.
4.  Browse for the downloaded `.ics` file and click **OK**.
5.  Click **Open as New** or **Import**.

### Microsoft Outlook (on macOS)
1.  Open **Outlook**.
2.  Drag and drop the downloaded `.ics` file directly onto the Outlook Calendar grid.

## Technical Stack

The WebApp is built with standard web technologies:
*   **HTML5**
*   **CSS3**
*   **JavaScript (ES6 Modules)**

It utilizes the following libraries:
*   [FullCalendar](https://fullcalendar.io/): For displaying the calendar.
*   [moment.js](https://momentjs.com/): For robust date and time calculations.
*   [ics.js](https://github.com/nwcell/ics.js): For generating the iCal file.
*   [FileSaver.js](https://github.com/eligrey/FileSaver.js/): For saving the generated file.
*   [Bootstrap](https://getbootstrap.com/): For responsive layout and styling.

## Want to Contribute?

Contributions are welcome! Here's how you can help:
1.  **Fork the Repository**: Create your own copy of the project.
2.  **Clone it**: Clone the repository to your local machine.
3.  **Make Changes**: Create a new branch, add your features or bug fixes.
4.  **Submit a Pull Request**: Open a pull request to merge your changes into the main project.

## About the Author

Hi, I'm **Matan Levy**! I created this WebApp to provide a convenient tool for expecting parents. Feel free to reach out to me at [levymatanlevy@gmail.com].
