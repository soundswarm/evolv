This app is built with React, boostrap v4, and firebase

This app shows an educational video then asks the watcher to take a quiz. The playback rate of the video is randomly chosen from three speeds (.5x, 1x, 1.25x). These are three hypotheses whose relationship to test score is tested.
The results of the quiz and the video-watching behavior are recorded and displayed after completing the quiz.  These results are stored in a firebase database.

In the results section of the app, stats across all quiz takers are shown.  These include:
  1) the correlation of video playback rate to quiz score. 
  2) the correlation of pause count to quiz score


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
