echo 'Start'
while read line; do
   echo $line
   phantomjs oi.js "$line"
done <site.txt
