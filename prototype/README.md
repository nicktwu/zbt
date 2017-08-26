# API Specification
## Flask-specific Info
The backend expects a file named `config.py` inside it, which sets the SQLAlchemy config values. In addition, it expects a 256-bit/32-byte key string called `crypto_key` in a `secret.py` file.
## Security
In general, all API endpoints should require presentation of a JWT, that should be signed by a 32-byte key shared with the authentication module.
The JWT should indicate a time of assignment and a time of expiry, as well as the client kerberos and IP address.
The token should be checked for being valid and unexpired, as coming from the indicated IP address, and as bearing a valid signature.
>This is done in the token_required decorater implemented in `authentication.py`.
The token_required decorator will provide the decorated route handler with a request.kerberos option to get the kerberos of the token bearer.

##Models
These are the specifications for the types of objects that this backend manages.
### General Utility Models
#### Zebe
A data model representing a Zebe.
* `id` -_int_: the unique integer that identifies this Zebe
* `kerberos` -_string_: the kerberos of the Zebe
* `name` -_string_: the full name of this Zebe
* `password` -_string_: the hash of the password that can be used to authenticate this Zebe, if no certificate is available
* `current` -_bool_: True if this Zebe is currently active (ie, not abroad or on a gap semester)
* `president` -_bool_: True if this Zebe has presidential permissions
* `midnight_maker` -_bool_: True if this Zebe has midnight maker permissions
* `house_chair` -_bool_: True if this Zebe has house chair permissions
* `workweek_chair` -_bool_: True if this Zebe has workweek administrative permissions
* `dev` -_bool_: True if this Zebe is a developer
* `rush_chair` -_bool_: True if this Zebe has rush chair permissions
* `social_chair` -_bool_: True if this Zebe has social chair permissions
* `tech_chair` -_bool_: True if this Zebe has tech-chair permissions.
* `risk_manager` -_bool_: True if this Zebe has risk manager permissions
#### Semester
A data model representing a semester.
* `id` -_int_: unique integer identifying semester
* `name` -_string_: human readable name for the semester (ex. Fall 2017)
* `start` -_date_: the start date of the semester
* `end` -_date_: the end date of the semester
### Midnight Models
#### Midnight
A data model representing a midnight.
* `id` -_int_: unique integer identifying this midnight
* `date` -_date_: the date this midnight is to be performed
* `zebe` -_string_: the kerberos of the Zebe this midnight is assigned to
* `task` -_string_: the name of the midnight
* `note` -_string_: any note the Midnight Maker might leave for the Zebe doing this midnight
* `feedback` -_string_: the feedback the Midnight Maker might give for the Zebe doing this midnight.
* `potential` -_float_: the number of points this midnight would be worth, if completed
* `awarded` -_float_: the number of points the Midnight Maker actually awarded for this midnight.
* `reviewed` -_bool_: True if the Midnight Maker has awarded points and provided feedback for this midnight.
#### MidnightAccount
A structure that saves the number of midnight points completed by a Zebe for a semester.
* `id` -_int_: a unique integer identifying this midnight account
* `semester` -_string_: the semester name for which this account applies
* `zebe` -_string_: the kerberos of the Zebe this account is for
* `balance` -_float_: the number of points the Zebe has completed thus far
* `requirement` -_float_: the target midnight requirement for this Zebe
#### MidnightType
A structure that describes the basic types of midnights
* `id` -_int_: a unique integer identifying this midnight type
* `name` -_string_: a name identifying this type of midnight (ex. "Commons")
* `value` -_float_: a default value that this type of midnight is worth
* `description` -_string_: a description of how this type of midnight should be performed
#### MidnightPrefs
A structure that describes a set of midnight preferences
* `id` -_int_: a unique integer identifying this set of preferences
* `zebe` -_string_: the kerberos of the Zebe who holds these preferences
* `daysPreferred` -_[string]_: the days the zebe prefers to work
* `tasksPreferred` -_[string]_: the tasks the zebe prefers to do
### Trade Models
#### MidnightTrade
A data model representing a potential or completed midnight trade.
* `id` -_int_: a unique integer identifying this trade
* `midnight_id` -_int_: the id of the midnight being traded
* `zebe_offering` -_string_: the kerberos of the Zebe offering this midnight
* `offered` -_float_: Any additional midnight points offered alongside the original midnight
* `completed` -_bool_: True if a taker was found, and the trade was executed
* `zebe_taker` -_string_: the kerberos of the Zebe taking the midnight
#### WorkdayForMidnightTrade
A data model representing a potential or completed workday-midnight trade: a workday a Zebe offered for someone to take by giving midnight points.
* `id` -_int_: a unique integer identifying this trade
* `workday_id` -_int_: the id of the workday involved in the trade
* `points` -_float_: the number of midnight points that were offered to take this workday
* `completed` -_bool_: True if a taker was found and the trade was completed.
* `zebe_taker` -_string_: the kerberos of the Zebe taking the workday
#### WorkdayForWorkdayTrade
A data model representing a workday trade for another workday.
* `id` -_int_: a unique integer identifying this trade
* `workday_offered_id` -_int_: the id of the workday being offered in exchange for a workday on another date
* `date` -_date_: the date of a workday the offerer is willing to take a workday on
* `completed` -_bool_: True if a valid taker was found and the trade was executed
* `workday_taken_id` -_int_: the id of the workday that the offerer took in exchange
### House Models
#### WorkdayAssignment
A data model representing a workday assignment.
* `id` -_int_: a unique integer identifying this shift
* `zebe` -_string_: the kerberos of the Zebe assigned
* `date` -_date_: the date of the workday
* `completed` -_bool_: True if this shift was completed
#### HouseAccount
A structure that saves the number of house hours completed by a Zebe for a semester.
* `id` -_int_: a unique integer identifying this midnight account
* `semester` -_string_: the semester name for which this account applies
* `zebe` -_string_: the kerberos of the Zebe this account is for
* `balance` -_float_: the number of hours the Zebe has completed thus far
* `requirement` -_float_: the target house requirement for this Zebe
### Workweek Models
#### WorkweekAccount
A structure that saves the number of workweek hours completed by a Zebe for a semester.
* `id` -_int_: a unique integer identifying this midnight account
* `semester` -_string_: the semester name for which this account applies
* `zebe` -_string_: the kerberos of the Zebe this account is for
* `balance` -_float_: the number of hours the Zebe has completed thus far
* `requirement` -_float_: the target workweek requirement for this Zebe
#### WorkweekShiftAssignment
A data model for a workweek shift
* `id` -_int_: a unique integer identifying this shift
* `zebe` -_string_: the kerberos of the Zebe assigned
* `date` -_date_: the date of the shift
* `start` -_time_: the start time of the shift
* `end` -_time_: the end time of the shift
* `completed` -_bool_: True if this shift was completed
#### WorkweekTicket
A data model representing a software ticket for workweek
* `id` -_int_: a unique integer identifying this ticket
* `description` -_string_: a description of the task
* `hours` -_float_: the number of workweek hours this ticket is worth
* `taker` -_string_: the kerberos of the Zebe who is working on this ticket
* `completed` -_bool_: True if the Workweek Chairs acknowledge this ticket is complete
### Rush Models
?????????
### Social/Risk Models
#### SocialEvent
A structure representing a social event
* `name` -_string_: the name of the event
* `start_time` -_date_: the start time of the event
#### PartyJob
A structure representing a party job
* `id` -_int_: unique integer identifying this party job
* `social_event` -_int_: id of social event for this party job
* `date_and_time` -_date_: the date of this party job includes the time
* `zebe_taker` -_string_: the kerberos of the Zebe this party job was taken by
* `task` -_string_: the name of the party job
* `note` -_string_: any note Risk/Social might leave for the Zebe doing this party job
* `potential` -_float_: the number of points this party job would be worth, if completed
* `awarded` -_float_: the number of points Risk/Social actually awarded for this party job (can be negative for punts).
* `reviewed` -_bool_: True if Risk/Social has awarded points and provided feedback for this party job.
#### SocialAccount
A structure that saves the number of social points completed by a Zebe for a semester.
* `id` -_int_: a unique integer identifying this social account
* `semester` -_string_: the semester name for which this account applies
* `zebe` -_string_: the kerberos of the Zebe this account is for
* `balance` -_float_: the number of social points the Zebe has completed thus far
* `requirement` -_float_: the target social requirement for this Zebe
#### PartyJobTypeDefault
A structure that describes the basic types of party jobs
* `id` -_int_: a unique integer identifying this party job type
* `name` -_string_: a name identifying this type of party job (ex. "Door")
* `value` -_float_: a default value that this type of party job is worth
* `desc` -_string_: a description of how this type of party job should be performed
##Routes
Routes should belong to seven groups. Special case note: any route that accepts a non-GET method should also accept an OPTIONS method.
General Cross-Origin Resource Sharing (CORS) protocols initialized by browsers will send OPTIONS requests before ever making any other call; the OPTIONS requests should be just handled by returning status code 200 and specifying the Methods, Origins, and Headers permitted.
### General
* `/user GET`: return the [Zebe](#zebe) whose kerberos matches the token bearer
* `/user/create POST`: Require rush chair or presidential permissions. Create new [Zebes](#zebe) from the POST body (should be a list).
* `/user/update/<string:kerberos> PUT`: Require presidential permissions. Update [Zebe](#zebe) identified by id.
* `/user/current GET`: return a list of [Zebe](#zebe) objects who are currently in ZBT.
* `/semester GET`: return the current [Semester](#semester)
* `/semester POST`: Require presidential/tech chair permissions. Create new [Semesters](#semester) from the POST body (should be a list).

### Midnights
The main API routes necessary are:
* `/midnights/accounts GET`: return a list of all [MidnightAccount](#midnightaccount) objects for the current Semester.
* `/midnights/accounts POST`: Require midnight-maker permissions on the [Zebe](#zebe). Creates [MidnightAccount](#midnightaccount) objects using the POST body (should be a list).
* `/midnights/accounts/<string:id> PUT`: Require midnight-maker permissions on the [Zebe](#zebe). Reads the put body and uses the ID to update the relevant [MidnightAccount](#midnightaccount).
* `/midnights/types GET`: return a list of all [MidnightTypeDefault](#midnighttypedefault) objects (get the midnight type defaults)
* `/midnights/types POST`: Require midnight-maker permissions on the [Zebe](#zebe). Create [MidnightTypeDefault](#midnighttypedefault) objects from the POST body (should be a list).
* `/midnights/types/<string:id> PUT`: Require midnight-maker permissions on the [Zebe](#zebe). Reads the put body and uses the ID to update the relevant [MidnightTypeDefault](#midnighttypedefault).
* `/midnights/midnight GET`: return all [Midnight](#midnight) assignments during the current week (Sunday-Saturday)
* `/midnights/midnight POST`: Require midnight-maker permissions. Create [Midnight](#midnight) assignments in the POST body (should be a list).
* `/midnights/midnight/<string:id> PUT`: Require midnight-maker permissions. Update the [Midnight](#midnight) with the given id using the PUT body.
* `/midnights/unreviewed GET`: Returns all unreviewed [Midnight](#midnight) assignments.
* `/midnights/reviewed GET`: Returns all reviewed [Midnight](#midnight) assignments from the past week.
### Trades
* `/trades/user GET`: return a list of all [MidnightTrades](#midnighttrade) the user was involved in
* `/trades/midnight GET`: return a list of all incomplete [MidnightTrade](#midnighttrade) objects for midnights that have not passed
* `/trades/midnight POST`: create a new [MidnightTrade](#midnighttrade) offer from POST body. **Check that the user actually has this midnight to give away.**
* `/trades/midnight/execute/<string:id> GET`: have the user/token bearer complete the [MidnightTrade](#midnighttrade) with the given id.
* `/trades/workday_for_midnight GET`: return a list of all incomplete [WorkdayForMidnightTrade](#workdayformidnighttrade) objects for workdays that have not passed
* `/trades/workday_for_midnight POST`: create a new [WorkdayForMidnightTrade](#workdayformidnighttrade) offer from POST body. **Check that the user actually has this workday to give away.**
* `/trades/workday_for_midnight/execute/<string:id> GET`: have the user/token bearer complete the [WorkdayForMidnightTrade](#workdayformidnighttrade) with the given id.
* `/trades/workday GET`: return a list of all incomplete [WorkdayForWorkdayTrade](#workdayforworkdaytrade) objects for workdays that have not passed
* `/trades/workday POST`: create a new [WorkdayForWorkdayTrade](#workdayforworkdaytrade) offer from POST body. **Check that the user actually has this workday to give away.**
* `/trades/workday/execute/<string:id> GET`: have the user/token bearer complete the [WorkdayForWorkdayTrade](#workdayforworkdaytrade) with the given id. **Check that the user actually has the workday necessary to complete the trade.**

### House
* `/house/user GET`: return a list of the user/token bearer's [WorkdayAssignments](#workdayassignment).
* `/house/workday/:date_unixtime GET`: return a list of all Zebes assigned to the workday on date_unixtime.
* `/house/workday/create POST`: Require house-chair permissions. Create [WorkdayAssignment](#workdayassignment) objects from the POST body (should be a list).
* `/house/workday/create/<string:id> PUT`: Require house-chair permissions. Update the id'd [WorkdayAssignment](#workdayassignment) object from the PUT body.
* `/house/accounts GET`: return a list of all [HouseAccount](#houseaccount) objects for the current semester.
* `/house/accounts/create POST`: Require house-chair permissions. Create [HouseAccount](#houseaccount) objects from the POST body (should be a list).
* `/house/accounts/update/<string:id> PUT`: Require house-chair permissions. Update id'd [HouseAccount](#houseaccount) with PUT body.
* `/house/incomplete GET`: Returns all incomplete [WorkdayAssignment](#workdayassignment) assignments for workdays that have passed.

### Workweek
* `/workweek/user GET`: return a list of the user/token bearer's [WorkweekShiftAssignment](#workweekshiftassignment).
* `/workweek/user/tickets GET`: Require software-dev permissions. Return a list of the user's [WorkweekTickets](#workweekticket).
* `/workweek/tickets GET`: Require software-dev permissions. Return a list of all [WorkweekTickets](#workweekticket).
* `/workweek/shift GET`: return a list of all Zebes assigned to the next workweek shift.
* `/workweek/shift POST`: Require workweek-chair permissions. Create [WorkweekShiftAssignment](#workweekshiftassignment) objects from the POST body (should be a list).
* `/workweek/shift/<string:id> PUT`: Require workweek-chair permissions. Update the id'd [WorkweekShiftAssignment](#workweekshiftassignment) object from the PUT body.
* `/workweek/accounts GET`: return a list of all [WorkweekAccount](#workweekaccount) objects for the current semester.
* `/workweek/accounts POST`: Require workweek-chair permissions. Create [WorkweekAccount](#workweekaccount) objects from the POST body (should be a list).
* `/workweek/accounts/<string:id> PUT`: Require workweek-chair permissions. Update id'd [WorkweekAccount](#workweekaccount) with PUT body.
* `/workweek/incomplete GET`: Returns all incomplete [WorkweekShiftAssignment](#workweekshiftassignment) for shifts that have passed.
* `/workweek/incomplete/tickets GET`: Returns all incomplete [WorkweekTickets](#workweekticket)

### Rush
????
### Social/Risk
* `/social/events GET`: return a list of SocialEvent
* `/social/jobs/<string:id> GET`: return a list of all [PartyJobs](#partyjob) for the  social event referenced by id
* `/social/jobs/create POST`: Require social/risk permissions. Create [PartyJobs](#partyjob) from the POST body (should be a list).
* `/social/jobs/update/<string:id> PUT`: Require social/risk permissions. Update [PartyJob](#partyjob) from the id.
* `/social/accounts GET`: return a list of all [SocialAccount](#socialaccount) objects for the current semester.
* `/social/accounts/create POST`: Require social/risk permissions. Create [SocialAccount](#socialaccount) objects from the POST body (should be a list).
* `/social/accounts/update/<string:id> PUT`: Require social/risk permissions. Update id'd [SocialAccount](#socialaccount) with PUT body.

## Additional Features
* Email notifications for tasks through a no-reply bot
* Potential addition of routes to suit frontend needs
* Allow private trades (trades made person to person, without ever being publicly open)
* Abstract the Zebe to the authentication layer; have the Zebe's permissions included in signed token.