# Web Performance Testing Exercise

A single-page website designed for web performance analysis and optimization practice.

## Setup Instructions

### Step 1: Download the Project

1. Go to the GitHub repository page
2. Click the green **Code** button
3. Select **Download ZIP**
4. Extract the ZIP file to your computer

### Step 2: Copy to Your Week-10 Folder

1. Locate the extracted folder contents
2. Copy **all files and folders** into your `week-10` folder
3. Your `week-10` folder should now contain:
   - `index.html`
   - `css/` folder
   - `js/` folder
   - `vendor/` folder
   - `images/` folder
   - `webfonts/` folder
   - Other files (README, etc.)

### Step 3: Open in VS Code

1. Open Visual Studio Code
2. Open your `week-10` folder in VS Code
3. Make sure you have the **Live Server** extension installed
   - If not: Go to Extensions (Ctrl+Shift+X) and search for "Live Server" by Ritwick Dey

### Step 4: Start Live Server

1. Right-click on `index.html` in VS Code
2. Select **Open with Live Server**
3. Your browser should open automatically to `http://127.0.0.1:5500`

## Testing Performance with Lighthouse

### Step 1: Open Chrome DevTools

1. With the website open in **Chrome**, press `F12` (or right-click and select "Inspect")
2. In DevTools, click the **Lighthouse** tab
   - If you don't see it, click the `>>` icon and select Lighthouse from the dropdown

### Step 2: Run Lighthouse Audit

1. In the Lighthouse tab, make sure these options are selected:
   - Mode: **Navigation**
   - Categories: Check **Performance** (you can check others too)
   - Device: **Desktop** or **Mobile** (try both!)
2. Click the **Analyze page load** button
3. Wait for the audit to complete (30-60 seconds)

### Step 3: Review the Results

Look at the Performance score and examine the results. Some things to explore:

- What is the overall Performance score?
- What metrics are highlighted in red or orange?
- What opportunities does Lighthouse suggest?
- What diagnostics are shown?
- How large is the total page size?

### Additional DevTools Tabs to Explore

- **Network Tab**: See what resources are loading and how long they take
- **Performance Tab**: Record and analyze page load performance
- **Coverage Tab**: See how much code is actually being used

## Your Task

Use the Lighthouse report and Chrome DevTools to identify performance issues with this website. Then, **fix as many problems as you can** to improve the performance score. Make changes to the code and re-run Lighthouse to see your improvements.

## Questions to Consider

- How many HTTP requests does the page make?
- What is the total size of resources loaded?
- Are there any render-blocking resources?
- How are images being handled?
- Is all the CSS and JavaScript being used?
- What are the Core Web Vitals scores?

Good luck with your performance analysis!

## Credits

Created as a teaching resource for web performance optimization.

---

**Remember**: This website demonstrates what NOT to do. Never build a production website like this! 🐌
