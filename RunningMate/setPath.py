import googlemaps,json,requests, urllib, urllib.request
from math import sin,cos,sqrt,atan2,radians, pi
from urllib.parse import urlencode
import math as math

#Assuming current location is Gmoney's House, and distance to run is 2 miles (This will be input by the user/phonedata)
beginningLatitude = 40.51303
beginningLongitude = -74.3910
distanceToRun = 2
distanceToDestination = distanceToRun/2
gmaps = googlemaps.Client(key = 'AIzaSyByZ1krKUMWCADrjkGIYty8F3-vfTtcdEQ')

R = 6378.1 #Radius of the Earth
brng = 0
lat1 = math.radians(beginningLatitude) #Current lat point converted to radians
lon1 = math.radians(beginningLongitude) #Current long point converted to radians
circleList1 = [] #List of equidistant points from lat1 and lat2 that form a circular shape
a = 0
b = 0
# North = 1, South = 2, East = 1, West = 2
direction1 = 2
direction2 = 2
if (direction1 == 1 & direction2 == 1):
    a = 0
    b = 91
if (direction1 == 2 & direction2 == 1):
    a = 91
    b = 181
if (direction1 == 2 & direction2 == 2):
    a = 181
    b = 271
if (direction1 == 1 & direction2 == 2):
    a = 271
    b = 361

for i in range(a,b,1):
    brng = i * (pi/180)

    lat2 = math.asin(math.sin(lat1)*math.cos(distanceToDestination/R) +
    math.cos(lat1)*math.sin(distanceToDestination/R)*math.cos(brng))

    lon2 = lon1 + math.atan2(math.sin(brng)*math.sin(distanceToDestination/R)*math.cos(lat1),
    math.cos(distanceToDestination/R)-math.sin(lat1)*math.sin(lat2))
   
    lat2 = round(math.degrees(lat2),5)
    lon2 = round(math.degrees(lon2),5)

    circleList1.append((lat2,lon2))

distanceListInitial = []
minimumDifference1 = 999
minimumDifference_Coordinates1 = 0 #minimumDifference_Coordinates1 is the coordinates for where Person 1 will have to travel
minimumDistance1 = 0 #minimumDistance1 is how long Person 1 will have to travel
for coordinates in circleList1:
    my_dist2 = gmaps.distance_matrix((beginningLatitude,beginningLongitude),(coordinates[0],coordinates[1]),mode='walking',units='imperial')['rows'][0]['elements'][0]
    get_Values = str(my_dist2)
    getMoreValues = list(my_dist2.values())[1]
    distanceValues = list(my_dist2.values())[0]
    #distanceEstimate2 is distance of the route in meters
    distanceEstimate2 = list(distanceValues.values())[1]
    distance2 = distanceEstimate2 * 0.000621371
    distanceListInitial.append(distance2)
    if abs(distance2 - distanceToDestination) < minimumDifference1:
        minimumDifference1 = abs(distance2 - distanceToDestination)
        minimumDifference_Coordinates1 = coordinates
        minimumDistance1 = distance2

traveledDistancePerson1 = minimumDistance1*2
#minimumDistance1 = Distance that Person 1 will have to travel before turning around and going back home
#minimumDifference_Coordinates1 = Coordinates that Person 1 will have to travel to, before turning around and running back home
#AT THE END OF THIS JOURNEY, WHEN THE PERSON REACHES THE COORDINATES IN THE LINE ABOVE, THEY WILL TURN AROUND AND RUN BACK HOME

print(minimumDistance1)
print(minimumDifference_Coordinates1)

#Using the value of the distance that Person 1 runs to their destination, and the initial location value from Person 2, find a route with the same distance.
#These 2 values below will actually be inputs from Person 2's phone
beginningLatitude2 = 40.534400
beginningLongitude2 = -74.422240
#Find finalLatitude and Longitude

# R = 6378.1 #Radius of the Earth
# brng = 0
lat1 = math.radians(beginningLatitude2) #Current lat point converted to radians
lon1 = math.radians(beginningLongitude2) #Current long point converted to radians
circleList2 = [] #List of equidistant points from lat1 and lat2 that form a circular shape
for i in range(0,361,3):
    brng = i * (pi/180)

    lat2 = math.asin(math.sin(lat1)*math.cos(minimumDistance1/R) +
    math.cos(lat1)*math.sin(minimumDistance1/R)*math.cos(brng))

    lon2 = lon1 + math.atan2(math.sin(brng)*math.sin(minimumDistance1/R)*math.cos(lat1),
    math.cos(minimumDistance1/R)-math.sin(lat1)*math.sin(lat2))
   
    lat2 = round(math.degrees(lat2),5)
    lon2 = round(math.degrees(lon2),5)

    circleList2.append((lat2,lon2))

distanceListSecond = []
minimumDifference2 = 999
minimumDifference_Coordinates2 = 0 #minimumDifference_Coordinates is the coordinates for where Person 2 will have to travel
minimumDistance2 = 0 #minimumDistance is how long Person 2 will have to travel
for coordinates in circleList2:
    my_dist2 = gmaps.distance_matrix((beginningLatitude2,beginningLongitude2),(coordinates[0],coordinates[1]),mode='walking',units='imperial')['rows'][0]['elements'][0]
    get_Values = str(my_dist2)
    getMoreValues = list(my_dist2.values())[1]
    distanceValues = list(my_dist2.values())[0]
    #distanceEstimate2 is distance of the route in meters
    distanceEstimate2 = list(distanceValues.values())[1]
    distance2 = distanceEstimate2 * 0.000621371
    distanceListSecond.append(distance2)
    if abs(distance2 - minimumDistance1) < minimumDifference2:
        minimumDifference2 = abs(distance2 - minimumDistance1)
        minimumDifference_Coordinates2 = coordinates
        minimumDistance2 = distance2

print(minimumDifference_Coordinates2)
print(minimumDistance2)

#minimumDistance2 is how long Person 2 will have to travel before turning around 
#minimumDifference_Coordinates is the coordinates for where Person 2 will have to travel before turning around