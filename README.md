# JOM Business and Manufacturing Process Management System

![JOM Logo](https://github.com/GroupProject-JOM/Frontend/blob/Buddhikanip-patch-1/common/img/Jayasinghe-Oil-Mils-Logo.jpg)

Presenting a web application to manage and automate the business and manufacturing processes of Jayasinghe Oil Mills Pvt. Ltd., a local virgin coconut oil manufacturer. This solution is designed to make their operations smoother and boost efficiency.

## Project Structure

### Root Directory
- **.gitignore:** Governs files and directories excluded from Git version control.
- **README.md:** This current file, illuminating the project's structure and setup.
- **index.html:** The primary entry point for the web application.
- **site.webmanifest:** A manifest file empowering features like home screen installation.

### Common Directory
Houses common assets and functionalities shared across the application:
- JavaScript files for common scripts.
- Global CSS stylesheets applicable to the entire application.
- Images and other static assets utilized throughout the application.

### Feature-Specific Directories
Each pivotal feature aligns with a dedicated directory, named based on its respective actor:
- admin
- collector
- distributor
- production-manager
- sales-manager
- stock-manager
- supplier

These directories encapsulate code, components, styles, and assets specific to their designated features, fostering modular development and upkeep.

### Common Functionalities
- The sign-in and forgot-password functionalities, accessible to all users, reside within their respective directories, ensuring clear separation from actor-specific features.
- **Signup Access:** The signup functionality is exclusively available for the supplier. Other actors cannot directly sign up by themselves as company employees to this system.

## Features

### Universal User Features
- **Basic Functionalities:** Login, logout, edit/update/view profile.
- **Personalization:** Dark and light mode options.
- **Multilingual Support:** Both Sinhala and English languages are available.
- **Real-Time Validation:** Validating user actions as inputs, button clicks, etc.

### Supplier-Specific Features
- **Real-Time Communication (powered by WebSockets):** Engage in live chat with stock managers to coordinate pickup times, ensuring smooth communication and timely responses.
- **Location Services (via Google Maps):** Share live locations and select locations via an interactive map interface, facilitating accurate and efficient coordination.
- **Request Collection:** Initiate requests for harvest pickup.
- **Request Management:** Edit or cancel existing requests.
- **Request Tracking:** Monitor pending, accepted, rejected, and completed requests.
- **Sales Reporting:** Generate sales reports for specified time periods and create invoices using JS PDF templates.
- **Real-Time Verification:** Validate collected coconut amounts with collectors in real time.
- **Search and Filters:** Easily locate and filter relevant information.

### Collector-Specific Features
- **Navigation (powered by Google Maps):** Obtain precise directions to estates directly from the map, optimizing travel routes and reducing navigation uncertainties.
- **Amount Editing:** Edit or update collected coconut amounts with real-time supplier verification.
- **Optional Verification:** Offer OTP verification via email for added security.
- **Date Filtering:** Filter coconut collections by specific dates.

### Stock Manager-Specific Features
- **Real-Time Communication (powered by WebSockets):** Engage in live chat with suppliers to discuss pickup times, streamlining communication and enhancing responsiveness.
- **Collection Visualization (powered by Google Maps):** View allocated collections and routes on a map, enabling proactive monitoring and efficient resource allocation.
- **Request Handling:** Respond to supplier and production manager requests, assigning collectors to supply pickups.
- **Driver Allocation:** Assign drivers to jobs.
- **Stock Management:** View and update material stocks.
- **Inventory Visualization:** Utilize color-coded stock lists for efficient overview.
- **Collection Assignment:** Assign collected coconuts to yards, using doughnut charts and progress bars for clear visualization.
- **Filtering and Searching:** Effortlessly locate and filter relevant information.

### Production Manager-Specific Features
- **Stock Visualization:** Access color-coded stock lists for a quick overview.
- **Stock Requests:** Request needed coconut amounts from stocks.
- **Production Creation:** Initiate new productions based on requests.
- **Product Management:** Add, edit, and delete products.
- **Production Updates:** Update final product status for each production batch.

### Sales Manager-Specific Features
- **Product Management:** Add, edit, and delete products.
- **Distribution Management:** Update product quantities allocated to distributors.
- **Inventory Tracking:** View remaining product quantities for each distributor and product.
- **Sales Monitoring:** Track sold amounts and visited outlets for each distributor.
- **Revenue Collection:** Collect revenue from distributors.
- **Supplier Payment Management:** Update supplier payment status.
- **Outlet Management:** Add, edit, and delete outlets.

### Distributor-Specific Features
- **Outlet Management:** Add, edit, and delete outlets.
- **Sales Records:** Update sales records for each outlet.
- **Inventory View:** View allocated product amounts.

### System Admin-Specific Features
- **Employee Management:** Manage employee accounts and permissions.
- **Outlet Management:** Oversee outlet information.
- **Stock Overview:** View comprehensive stock information.
- **Product Management:** Manage product details.
- **Emergency Data Entry:** Update coconut amounts when collectors are unable to access the system.

## License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

---


<p align="center">
    <a href="https://github.com/GroupProject-JOM/Frontend/blob/main/LICENSE">
      <img alt="License: GNU" src="https://img.shields.io/badge/License-GPLv3-blue.svg">
   </a>
    <a href="https://github.com/GroupProject-JOM/Frontend">
      <img alt="Hits" src="https://hits.sh/github.com/GroupProject-JOM/Frontend.svg?label=Views"/>
    </a>
    <a href="https://github.com/GroupProject-JOM/Frontend/graphs/contributors">
      <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/GroupProject-JOM/Frontend" />
    </a>
    <a href="https://github.com/GroupProject-JOM/Frontend/issues">
      <img alt="Issues" src="https://img.shields.io/github/issues/GroupProject-JOM/Frontend?color=0088ff" />
    </a>
    <a href="https://github.com/GroupProject-JOM/Frontend/pulls">
      <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/GroupProject-JOM/Frontend?color=0088ff" />
    </a>
  </p>
