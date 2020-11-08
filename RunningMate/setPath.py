import googlemaps,json,requests, urllib, urllib.request
from math import sin,cos,sqrt,atan2,radians, pi
from urllib.parse import urlencode
import math as math

#Assuming current location is Gmoney's House

beginningLatitude = 40.51303
beginningLongitude = -74.3910

finalLatitude = 40.498430
finalLongitude = -74.362350

start1 = str(beginningLatitude) + "," + str(beginningLongitude)
end1 = str(finalLatitude) + "," + str(finalLongitude)

gmaps = googlemaps.Client(key = 'AIzaSyByZ1krKUMWCADrjkGIYty8F3-vfTtcdEQ')
my_dist = gmaps.distance_matrix(start1,end1,mode='walking',units='imperial')['rows'][0]['elements'][0]
str1 = str(my_dist)
dict2 = list(my_dist.values())[1]
#walkingEstimate is a time value
walkingEstimate = list(dict2.values())[0]
dict3 = list(my_dist.values())[0]
#distanceEstimate is distance of the route in meters
distanceEstimate = list(dict3.values())[1]
distance = distanceEstimate * 0.000621371
#distance gives the distance of the route in miles
DISTANCE = distance


#Using the value of distance, and the initial location value from Person 2, find a route with the same distance

beginningLatitude2 = 40.534400
beginningLongitude2 = -74.422240
#Find finalLatitude and Longitude

R = 6378.1 #Radius of the Earth
brng = 0
lat1 = math.radians(beginningLatitude2) #Current lat point converted to radians
lon1 = math.radians(beginningLongitude2) #Current long point converted to radians
circleList = [] #List of equidistant points from lat1 and lat2 that form a circular shape
for i in range(0,361,3):
    brng = i * (pi/180)

    lat2 = math.asin(math.sin(lat1)*math.cos(distance/R) +
    math.cos(lat1)*math.sin(distance/R)*math.cos(brng))

    lon2 = lon1 + math.atan2(math.sin(brng)*math.sin(distance/R)*math.cos(lat1),
    math.cos(distance/R)-math.sin(lat1)*math.sin(lat2))
   
    lat2 = round(math.degrees(lat2),5)
    lon2 = round(math.degrees(lon2),5)

    circleList.append((lat2,lon2))

distanceList = []
minimumDifference = 999
minimumDifference_Coordinates = 0 #minimumDifference_Coordinates is the coordinates for where Person 2 will have to travel
minimumDistance = 0 #minimumDistance is how long Person 2 will have to travel
for coordinates in circleList:
    my_dist2 = gmaps.distance_matrix((beginningLatitude2,beginningLongitude2),(coordinates[0],coordinates[1]),mode='walking',units='imperial')['rows'][0]['elements'][0]
    get_Values = str(my_dist2)
    getMoreValues = list(my_dist2.values())[1]
    distanceValues = list(my_dist2.values())[0]
    #distanceEstimate2 is distance of the route in meters
    distanceEstimate2 = list(distanceValues.values())[1]
    distance2 = distanceEstimate2 * 0.000621371
    distanceList.append(distance2)
    if abs(distance2 - DISTANCE) < minimumDifference:
        minimumDifference = abs(distance2 - DISTANCE)
        minimumDifference_Coordinates = coordinates
        minimumDistance = distance2


print(distanceList)
print(DISTANCE)
print(minimumDifference_Coordinates)
print(minimumDistance)

#minimumDistance is how long Person 2 will have to travel
#minimumDifference_Coordinates is the coordinates for where Person 2 will have to travel