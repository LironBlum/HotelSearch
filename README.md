
run the server: 
  node server.js


request samples:
  create a search:
    curl -X POST http://localhost:3000/search \
    -H "Content-Type: application/json" \
    -d '{
      "ski_site": 1,
      "from_date": "2024-12-01",
      "to_date": "2024-12-05",
      "guests": 2
    }'

  poll the search results:
    curl -X GET "http://localhost:3000/search/<search_uuid>"

