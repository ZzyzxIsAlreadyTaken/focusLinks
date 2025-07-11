# focus-links

## Summary

A SharePoint Framework web part that displays quick links in various layouts. The web part can display both example links and links from a selected SharePoint list, providing a flexible way to showcase important resources and links to users.

**Key Features:**

- Display quick links in multiple layout options (wrap, grid, list, single column)
- Connect to SharePoint lists to display dynamic content
- Responsive design with Fluent UI icons

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.1-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

> Any special pre-requisites?

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

The Focus Links web part provides a comprehensive solution for displaying quick links and resources in SharePoint pages. Here's what it offers:

### Core Functionality

- **Multiple Layout Options**: Choose from wrap, grid, list, or single column layouts to best fit your page design
- **SharePoint List Integration**: Connect to any SharePoint list to display dynamic content
- **Example Links**: Built-in example links for testing and demonstration purposes
- **Responsive Design**: Automatically adapts to different screen sizes and devices

### User Experience

- **Fluent UI Icons**: Uses Microsoft's Fluent UI icon system for consistent visual design
- **Theme Support**: Automatically adapts to light and dark themes
- **Accessibility**: Built with accessibility in mind, including proper ARIA labels
- **External Link Handling**: Opens links in new tabs with proper security attributes

### SharePoint Integration

- **PnP/SPFx Integration**: Uses PnP (Patterns and Practices) for SharePoint data access
- **List Picker**: Easy selection of SharePoint lists through the property pane
- **Real-time Data**: Fetches and displays current list items
- **Error Handling**: Graceful handling of connection and data loading errors

### Teams Support

- **Microsoft Teams Integration**: Works seamlessly within Teams tabs
- **Multi-environment Support**: Functions in SharePoint, Teams, Office, and Outlook

This web part illustrates the following SharePoint Framework concepts:

- Property pane configuration with custom controls
- SharePoint data access using PnP
- React component development
- Theme integration
- Teams context awareness

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
