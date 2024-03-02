# Weatherly - Real-time Local Weather Application

Welcome to Weatherly, a responsive web application designed to deliver real-time, location-specific weather forecasts right to your screen. By integrating Google Maps API with Open Weather API, Weatherly provides users with accurate and up-to-date weather information based on their precise location.

### Features

-   Real-time Weather Data: Access up-to-the-minute weather forecasts tailored to your exact position.

-   Google Maps Integration: Seamlessly find your location and view the weather specifics overlayed on the map.

-   Responsive Design: Whether on desktop, tablet, or mobile, enjoy a fully responsive interface that adapts to your device for optimal viewing.

### Powered by Google Cloud Platform (GCP)

Weatherly harnesses the robust cloud-based solutions and services provided by GCP, ensuring reliable access to application functionalities and API management. Through GCP, we leverage a solid infrastructure that scales and maintains performance excellence.

### Getting Started

To get started with Weatherly, clone the repository to your local machine and follow the setup instructions below.


### Prerequisites

A Google Cloud Platform account with billing enabled. API keys for Google Maps and Open Weather APIs.

### Installation

1. Clone the repository

```
git clone https://github.com/praneethravuri/weatherly.git
cd weatherly
```

2. Set up your API keys

* Obtain your Google Maps and Open Weather API keys from their respective platforms.
* Create an .env file in the root directory of the project.
* Add your API keys to the .env file as follows:

```
VITE_GOOGLE_MAPS_API_URL='your_google_maps_api_key'
VITE_OPEN_WEATHER_API_URL='your_open_weather_api_key'
```

3. Install dependencies

```npm install```

4. Run the application

```npm dev```

### Feedback

Any feedback or suggestions are welcome. Please open an issue in the repository for any queries.