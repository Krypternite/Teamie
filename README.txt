Task : To build a simple web app that allows a Twitter user to review his followers, view their twubric “scores” , filter & sort them and then decide to optionally remove certain followers.

1) The application has been successfully deployed at http://krypternite.github.io/Teamie

2) The application has been made using AngularJS 1.5.3 and Angular-Material as the UI Framework

3) When the application loads in the browser, the user is presented with a grid of cards that are his followers , loaded from the Mock JSON response provided along with the task.

4) The top header contains the side-menu toggle button, Teamie logo , the name of the application 'Twubric' and towards the right end is the button should be a placeholder for settings.

5) The blue-bar below the top header, lists various sort parameters namely,
	- Twubric Score
	- Chirpiness
	- Friends
	- Influence
	
5) Click any of the above mentioned buttons sorts the followers' cards in the ascending order of the selected parameter. Clicking the same button again sorts the followers in descending order. An up arrow and down arrow icon also appear on the button denoting ascending and descending sequence respectively.
	
6) The blue-bar also contains buttons for Joining Date , Clear Date , Reset Filters.

	- Joining Date 	: Clicking this button brings up a pop-up where the user can fill in start and end date and then filter followers who have joined between the selected dates.

	-Clear Date 	: This button is only visible if a joining date filter has been set. Clicking it clear the joinig date selection values and all the users are visible.

	-Reset Filter 	: Clicking this button clears all the filters and followers' cards are rearranged in the order of their UIDs. This also clears the Joining Date filter.

7) Each follower card contains the following information : 
	
	- Name
	- Username
	- Total Twubric Score
	- Chirpiness
	- Friends
	- Influence
	- Joining Date 
	- Delete Button : Clicking this button removes the follower card from the follower list.
	
8) The application is responsive and the cards re-align themselves when the window is resized.

9) When the window is set to tablet size or below, a floating button reading 'Filters' is visible at the bottom-right corner of the browser window. Clicking it reveals a list of the same filters that were earlier in the blue-bar at the top. When a filter is selected a toast is shown to the user telling him which filter has been set and in which order.

10) Short cut keys have been programmed for Sorting and Filtering the users. Pressing '?'(Question mark) shows a short cut help , listing the shortcut keys for each function.
	
	- space+t : For sorting the cards based on Total Score
	- space+c : For sorting the cards based on Chirpiness
	- space+f : For sorting the cards based on Friends
	- space+i : For sorting the cards based on Influence
	- space+j : For opening the date selector popup
	- space+r : For Re-setting the filters
	- space+d : Sets focus on the delete button of the first card.
	

11) Clicking the side-menu icon reveals the side that shows a mock user profile.

	