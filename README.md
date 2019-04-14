## Train Scheduler

This is an app that stores users' input in firebase. A user can enter a train name, where that train is going, when the first train arrives, and how often the train comes. That input will then be stored in a list of trains along with how much time remains until the next train arrives and what time the next train is due to arrive. 

### Background
I used bootstrap to style a table for the train entries, I also used bootstrap to create the form to for users to enter new trains.

I created a Firebase project and initilized that project in my javascript. 

I added an event listener for when someone submits a train via the submit button. When the submit button is clicked, the valued entered into the form is the trimmed, and the time of the first train formatted to military hours and minutes. 

A temporary variable held the information, before it was pushed to Firebase. After submitted, the form was cleared of the text. 

The information was then stored in firebase as a child snap shot. 

An object was created for each of the values, but I first modified the information with some formulas. For the frequency, I modified it so that if the duration was equal or more than 60 minutes, it would display hours and minutes, if the frequency was not, it would display the minutes only. 

I used moment.js to grab the current time, and the different between the first train and the current time, then factored in the frequency of train arrivals to find how much time remained until the next train arrived. When I added the time remaining until the next train with the current time, I got when the next train would arrive. 

When all the info was modified to the way that I liked, I then pushed that info the the Object.

Then I created a variable for a new table row to display the newly entered train data. 

Then I ran a for loop that added the properties of the object into the newly created row, and added the row to the table created to hold all the train information. 

### Tricky parts
At first, I did not include window.onload so my script ran before things were loaded so I could not execute my script. I then added window.onload and moved the script to lower in my html file, just in case. 

This is my first time using Firebase, and it showed I did not have access to the database, so I had to spend some time researching what was wrong then figured out that I had to change the rules in my Firebase database to allow .read and .write to read true. 
