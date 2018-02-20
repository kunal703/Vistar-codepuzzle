# State Server!

Vistar serves up a mound of geospatial data both internally and to third
parties. What we need is a server to tell us which state, if any, a point is in.
Some simplified geometries are included in states.json (so greatly simplified,
that some of the smaller ones disappear).

It need not be fast, but the code should be readable, and the results should be
correct.

## Expected Behavior

  $ ./state-server &
  [1] 21507
  $ curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/
  ["Pennsylvania"]
  $


## Notes

Given that file, it took one of us about an hour to implement something that
worked correctly. You're welcome to take it however far you want, but we're
expecting something along those lines.

And if there's anything special we have to do to run your program, just let us
know. A Makefile never hurt anyone.

## Instructions to run the server

Clone the repository and go to the directory

Run 'npm install' to install the dependencies

Now ypu should be able to run the server,

$ node server.js
Server listening on port 8080

Now try to post on the server using curl to get the following result 

$  curl -d "longitude=-81.450394&latitude=41.653934" http://localhost:8080/
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    47  100     8  100    39    170    829 --:--:-- --:--:-- --:--:--   829["Ohio"]


$ curl  -d "longitude=-77.036133&latitude=40.513799" http://localhost:8080/
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100    55  100    16  100    39   1066   2600 --:--:-- --:--:-- --:--:--  2600["Pennsylvania"]
