# Random Vacation Spot Finder

This web app detects your current location, converts your latitude and longitude into a human-readable address, and suggests up to 5 vacation spots nearby using free public APIs.

## Features
- Detects your current geolocation (latitude and longitude)
- Converts coordinates to a readable address using the OpenCage Geocoding API
- Suggests up to 5 random vacation spots near you using the OpenTripMap API
- Clean, modern UI with loading animation

## How It Works
1. Click the **Generate** button.
2. The app will ask for your location permission.
3. Your coordinates are displayed and converted to a readable address.
4. The app fetches and displays up to 5 interesting places nearby as vacation suggestions.

## Technologies Used
- HTML, CSS, JavaScript (Vanilla)
- [OpenCage Geocoding API](https://opencagedata.com/)
- [OpenTripMap Places API](https://opentripmap.io/)

## Setup & Usage
1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Click **Generate** and allow location access.

## File Structure
- `index.html` — Main HTML file
- `styles.css` — Styling for the app
- `script.js` — Main JavaScript logic

## API Keys
- The app uses API keys for OpenCage and OpenTripMap. For production use, sign up for your own free API keys and replace them in `script.js`.

## License
This project is open source and free to use for educational and personal projects.
