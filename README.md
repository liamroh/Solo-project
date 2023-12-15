# Spotify BetterAI

Spotify BetterAI is designed to leverage the complex music analysis data available through the Spotify API music analysis endpoint. This tool is designed to emulate DJ song transitions, and has volume and playback control designed in React to test the suggested transitions. 

## Features

- Retrieval and analysis of song data from the Spotify API
- Calculation of average BPM and updating of section timestamps
- Extraction of target sections based on song analysis
- Key and tempo compatibility check between songs
- Frontend volume control and playback

## Getting Started

### Prerequisites

Before getting started with Spotify BetterAI, you will need the following:

- Spotify API Key: Obtain your own Spotify API key by creating a Spotify Developer account and registering your application. Refer to the [Spotify for Developers documentation](https://developer.spotify.com/documentation/) for more information on how to obtain an API key.

### Installation

To get started with Spotify BetterAI, follow these steps:

1. Clone the repository to your local machine
2. Install the required dependencies using the package manager of your choice
3. Set up your Spotify API credentials and configure the application accordingly
4. Build and run the application

## Usage

Transition algorithm parameters can be tweaked for the `findTransition` function in the SpotifyHelper.js module:

- Calculating average BPM: The `findTransition` function calculates the average Beats Per Minute (BPM) of two songs
- Extracting target sections: The `findTransition` function identifies the loudest section in a song and extracts the sections before and after it as a basic double drop transition
- Key and tempo compatibility check: The `findTransition` function checks if the keys of two songs are within +/- 1 of each other and if the BPM difference is within 12%