//Stellardrive Prototype JS
//By Jason Brown
//November 2017 - this version: November 8th 2017

//Array containing song information for track advance, e.g. album name, artist name and album art source
var tracks = [['American Idiot', '1989 Delxe Edition', 'Loud', '21', 'Prism'],
['assets/music/americanidiot.png', 'assets/music/1989dlx.png', 'assets/music/loud.png', 'assets/music/twentyone.png', 'assets/music/prism.png'],
['Green Day', 'Taylor Swift', 'Rihanna', 'Adele', 'Katy Perry'],
['Jesus of Suburbia', 'You Are In Love', 'Only Girl (In The World)', 'Rolling In The Deep', 'Roar']
];

var trackNumber = 0; //The ID of the track that is being played, this variable is used later to advance/reverse the track

var screen = "home"; //This changes depending on the screen that is shown to activate different options, e.g. D-Pad buttons and displaying the OptionBar
var highlightedButton = 1; //The button that the user is currently 'rolling over'/highlighted
var optionbar = ""; //The OptionBar state changes depending on why it is open, see the D-Pad functions for more information

var toggle = "0"; //Default value, 0 = video showing, 1 = video hidden
var largeview = "0"; //Default value, 0 = large view hidden, 1 = large view showing

//Home Screen: hide and show the applicable elements for this view
function homeScreen() {
    screen = "home";
    highlightedButton = 1;
    document.getElementById('home-1-rollover').style.visibility = 'visible';
    document.getElementById('home-1').style.visibility = 'visible';
    document.getElementById('home-2').style.visibility = 'visible';
    document.getElementById('home-3').style.visibility = 'visible';
    document.getElementById('home-4').style.visibility = 'visible';
    document.getElementById('home-5').style.visibility = 'visible';
    document.getElementById('home-6').style.visibility = 'visible';
    document.getElementById('home-6-rollover').style.visibility = 'hidden';

    document.getElementById('music-1').style.visibility = 'hidden';
    document.getElementById('music-2').style.visibility = 'hidden';
    document.getElementById('music-3').style.visibility = 'hidden';
    document.getElementById('music-4').style.visibility = 'hidden';
    document.getElementById('titlebar').style.visibility = 'hidden';
    document.getElementById('albumart').style.visibility = 'hidden';
    document.getElementById('songtitle').style.visibility = 'hidden';
    document.getElementById('songinfo').style.visibility = 'hidden';
    document.getElementById('duration').style.visibility = 'hidden';
    document.getElementById('folder-1').style.visibility = 'hidden';
    document.getElementById('folder-1-rollover').style.visibility = 'hidden';
    document.getElementById('folder-2').style.visibility = 'hidden';
    document.getElementById('folder-3').style.visibility = 'hidden';
    document.getElementById('folder-4').style.visibility = 'hidden';
    document.getElementById('trackone').style.visibility = 'hidden';
}

//Function to change the operation of the D-Pad buttons depending on the screen that is shown
function dPadPress(dPadButton) {
    if (document.getElementById("optionbar").style.visibility == 'visible') {
        optionBarDPad(dPadButton);
    }

    else if (screen === "home") {
        homeDPad(dPadButton);
    }

    else if (screen === "music") {
        trackAdvance(dPadButton);
    }
}

//D-Pad button controls if the home screen is displayed 
function homeDPad(dPadButton) {
    switch (dPadButton) {
        case 1:
            if (highlightedButton - 3 > 0) {
                dPadDirection(-3);
            }
            break;

        case 2:
            if (highlightedButton + 1 >= 7) {
                dPadDirection(-5);
            }
            else {
                dPadDirection(1);
            }
            break;

        case 3:
            if (highlightedButton + 3 < 7) {
                dPadDirection(3);
            }
            break;

        case 4:
            if (highlightedButton - 1 <= 0) {
                dPadDirection(3);
            }
            else {
                dPadDirection(-1);
            }
            break;

        case 5:
            if (highlightedButton != 1) {
                featureNotAvailable();
            }
            else {
                musicScreen();
            }
            break;
    }
}

//D-Pad button controls if the OptionBar is present
function optionBarDPad(dPadButton) {
    if (screen === 'music') {
        if (optionbar === 'music') { //The following switch runs if the OptionBar is open to change the source of the music, e.g. change from radio to USB
            switch (dPadButton) {
                case 2:
                    if (highlightedButton + 1 >= 5) {
                        dPadDirection(-3);
                    }
                    else {
                        dPadDirection(1);
                    }
                    break;

                case 4:
                    if (highlightedButton - 1 <= 0) {
                        dPadDirection(3);
                    }
                    else {
                        dPadDirection(-1);
                    }
                    break;

                case 5:
                    if (document.getElementById("music-2-rollover").style.visibility == 'visible') {
                        selectFolder();
                    }
                    else {
                        featureNotAvailable();
                    }
                    break;
            }
        }
        else if (optionbar === 'folder') { //The following switch runs if the OptionBar is open to change the source folder, e.g. change from Play All to a specific folder
            switch (dPadButton) {
                case 2:
                    if (highlightedButton + 1 >= 5) {
                        dPadDirectionOption(-3);
                    }
                    else {
                        dPadDirectionOption(1);
                    }
                    break;

                case 4:
                    if (highlightedButton - 1 <= 0) {
                        dPadDirectionOption(3);
                    }
                    else {
                        dPadDirectionOption(-1);
                    }
                    break;

                case 5:
                    if (document.getElementById("folder-3-rollover").style.visibility == 'visible') {
                        musicScreen();
                    }
                    else {
                        featureNotAvailable();
                    }
                    break;
            }
        }
    }
}

//D-Pad button controls if the music app is open and the OptionBar is not open (this is to advance/reverse the track)
function trackAdvance(dPadButton) {
    switch (dPadButton) {
        case 2:
            document.getElementById("albumart").src = tracks[1][++trackNumber];
            break;

        case 4:
            document.getElementById("albumart").src = tracks[1][--trackNumber];
    }
}

//Music app: hide and show the applicable elements for this view
function musicScreen() {
    screen = 'music';
    console.log(screen)

    document.getElementById('home-1').style.visibility = 'hidden';
    document.getElementById('home-1-rollover').style.visibility = 'hidden';
    document.getElementById('home-2').style.visibility = 'hidden';
    document.getElementById('home-2-rollover').style.visiblity = 'hidden';
    document.getElementById('home-3').style.visibility = 'hidden';
    document.getElementById('home-3-rollover').style.visiblity = 'hidden';
    document.getElementById('home-4').style.visibility = 'hidden';
    document.getElementById('home-4-rollover').style.visiblity = 'hidden';
    document.getElementById('home-5').style.visibility = 'hidden';
    document.getElementById('home-5-rollover').style.visiblity = 'hidden';
    document.getElementById('home-6').style.visibility = 'hidden';
    document.getElementById('home-6-rollover').style.visibility = 'hidden';

    document.getElementById('optionbar').style.visibility = 'hidden';
    document.getElementById('folder-1').style.visibility = 'hidden';
    document.getElementById('folder-1-rollover').style.visibility = 'hidden';
    document.getElementById('folder-2').style.visibility = 'hidden';
    document.getElementById('folder-3').style.visibility = 'hidden';
    document.getElementById('folder-3-rollover').style.visibility = 'hidden';
    document.getElementById('folder-4').style.visibility = 'hidden';

    document.getElementById('titlebar').style.visibility = 'visible';
    document.getElementById('albumart').style.visibility = 'visible';
    document.getElementById('songtitle').style.visibility = 'visible';
    document.getElementById('songinfo').style.visibility = 'visible';
    document.getElementById('duration').style.visibility = 'visible';
}

//Set the OptionBar state to 'music' to allow correct use of D-Pad buttons and hide and show applicable elements
//The 'music' view is the source selection screen - allows the user to change where the music is played from, e.g. CD, Radio, USB
function selectSource(dPadButton) {
    optionbar = "music";
    highlightedButton = 1;
    document.getElementById('optionbar').style.visibility = 'visible';
    document.getElementById('music-1').style.visibility = 'visible';
    document.getElementById('music-1-rollover').style.visibility = 'visible';
    document.getElementById('music-2').style.visibility = 'visible';
    document.getElementById('music-3').style.visibility = 'visible';
    document.getElementById('music-4').style.visibility = 'visible';

    optionBarDPad(dPadButton);
}

//Set the OptionBar state to 'folder' to allow correct use of D-Pad buttons and hide and show applicable elements
//The 'folder' view is the folder selection screen - allows the user to play music from a specific folder on a USB drive or SD card
function selectFolder() {
    optionbar = "folder";
    highlightedButton = 1;

    document.getElementById('music-1').style.visibility = 'hidden';
    document.getElementById('music-2-rollover').style.visibility = 'hidden';
    document.getElementById('music-2').style.visibility = 'hidden';
    document.getElementById('music-3').style.visibility = 'hidden';
    document.getElementById('music-4').style.visibility = 'hidden';

    document.getElementById('folder-1').style.visibility = 'visible';
    document.getElementById('folder-1-rollover').style.visibility = 'visible';
    document.getElementById('folder-2').style.visibility = 'visible';
    document.getElementById('folder-3').style.visibility = 'visible';
    document.getElementById('folder-4').style.visibility = 'visible';
}

//Hide and show rollovers based on the button that is currently selected - applies to all screens apart from when the OptionBar is open on the 'Select Folder' screen
function dPadDirection(increment) {
    document.getElementById(screen + "-" + highlightedButton + "-rollover").style.visibility = 'hidden';
    highlightedButton = highlightedButton + increment;
    document.getElementById(screen + "-" + highlightedButton + "-rollover").style.visibility = 'visible';
}

//Hide and show rollovers based on the button that is currently selected - only applies when the OptionBar is open on the 'Select Folder' screen
function dPadDirectionOption(increment) {
    document.getElementById("folder-" + highlightedButton + "-rollover").style.visibility = 'hidden';
    highlightedButton = highlightedButton + increment;
    document.getElementById("folder-" + highlightedButton + "-rollover").style.visibility = 'visible';
}

//Show the OptionBar depending on the screen that is currently shown - the OptionBar can only be open on the 'Music' screen in this prototype
function optionButton() {
    if (screen === 'music')
        selectSource();
    else {
        featureNotAvailable();
    }
}

//Toggle video
function toggleVideo() {
    if (toggle === "0") {
        document.getElementById("video").style.visibility = "hidden";
        toggle = "1";
    }
    else if (toggle === "1") {
        document.getElementById("video").style.visibility = "visible";
        toggle = "0";
    }
}

//Display a modal informing the user that the feature is not available if they attempt to access a feature that has not been coded, e.g. phone buttons
function featureNotAvailable() {
    window.alert("This feature is not available in this view yet.");
}