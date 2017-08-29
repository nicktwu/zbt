# Overall Project Specification
## Goals
This project is supposed to provide a central location for all of ZBT's most important functions.
The original motivation was to provide a single place to access midnight information, but after discussion with officers, this expanded to provide a central place for other ZBT functions as well.
It's an attempt to phase out google docs and scattered email links. 
## User Interfaces
### Midnights
Publicly should display a list of the week's midnights, and all current Zebes's number of midnight points.
There should be a separate page for a user to view his own midnights, his upcoming midnights, and midnights the midnight maker recently awarded points for.
There should be a Midnight Maker admin UI, where the midnight maker can view unawarded midnights, award points, and provide feedback. 
The midnight maker UI should also allow the midnight maker to add midnights manually (although the bulk of midnights should be loaded by the Midnights script).
Whoever works on this should keep Sandeep updated on the UI. 
### Workdays
Publicly display a list of the workdays, and people assigned to them. Publicly display the number of workdays each Zebe has completed and is required to do. 
Create a House Chair UI that allows the House Chair to edit the workday assignments, sign off on completed workdays. Whoever works on this should keep David updated on the UI.
### Workweek
Publicly display a list of workweek shifts and people assigned. Display each Zebe's workweek requirement, and hours completed so far.
Provide a Workweek Chair UI that allows the workweek chairs to edit shifts and award hours. Contact Nick with questions.
### Social
Publicly display a list of past parties, jobs that were taken, and the number of points everyone has completed. Display upcoming parties and jobs, and allow users to claim jobs.
Provide a Risk/Social UI that allows the creation of parties/party jobs, and awarding of social points for completed party jobs.
### Trading
Provide a list of midnights people have put up for grabs (allow them to offer points to compensate taking, too). 
Allow users to take midnights. Allow users to put midnights up on the exchange. 
Allow users to put workdays on the exchange, in return for either a workday swap or midnight point compensation. 
Allow private trades (this is to handle the use case that people sometimes informally trade a midnight in person).
### Rush
We have a rush app. It seems to work fine; importing the original functionality seems good enough.
### General 
It'd be nice to have a list of Zebes and their kerberoses displayed somewhere.
### Additional Features
* Email notifications for upcoming requirements.
## Mobile Application
This should really port the basic view functionality from the web UI. I don't think it's necessary to implement any admin functionality in the mobile app. 
That means no need to build Midnight Maker/ House Chair/ Workweek Chair/ Social/Risk Chair admin functionality into the mobile app. Literally just viewing the status of things is good enough.
## Implementation Details
### Security
There is a flask script in the authentication/certificate folder, which provides an endpoint for anyone with an MIT certificate to obtain a JWT authenticating that user. The token should be presented with any requests to the backend.
This does require that the backend and authentication script share a secret key; ideally, we should use a random generate to generate 256 random bits and deploy the key to both using some script, with no Zebe ever gaining knowledge of the key.
For authentication via the mobile app, a separate endpoint can be provided. A scripts-hosted MySQL database can store kerberoses and password hashes to allow authentication manually, though this requires providing web UI ability to set a password (web UI should use certificates where possible).


### Local Development

You need to run the following things before you can run anything:

- `yarn install` or `npm install` in the `/backend` folder
- `yarn install` or `npm install` in the `/frontend-prototype` folder
- `pip install flask` (if you use virtual environment) or `sudo pip install flask` (if you are installing globally) in `/authentication`
- `sudo apt-get install mongodb-server` (for some functional mongodb)

Create a file `/authentication/certificate/secret.py` and have a single variable `crypto_key=<key>`, where `<key>` is a string that matches the secret in `/backend/secrets.js`.

Now run the backend parts with (runs mongod, authentication app on port 5555, backend on port 3010)

```bash
./dev-server
```

In `/frontend-prototype` run `yarn start` or `npm start` to start the frontend dev server (on port 3000).

Hit `localhost:5555` and that will get you an auth token. Now you can use this token in authentication bearer header in your requests to the backend (the front-end should implement these features in login/redirect interface).

