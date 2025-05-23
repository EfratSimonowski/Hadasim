# part one
### Log File Error Counting
 Splitting the log file:The split_file function divides a large log file into smaller chunks for easier processing.
 
 Counting error codes: The count_errors_in_divide_file function counts the occurrences of each error code in a given file chunk.
 
 Merging results: The merge_counters function combines the error counts from all chunks into a single result.
 
 Finding top errors: The get_top_n_errors function identifies the most frequent error codes based on a specified number of occurrences.
 ### Hourly Average Calculation from Time Series Data
 The project processes time series data to calculate hourly averages.
 
 It ensures data quality by removing duplicates and handling missing values, and supports both CSV and Parquet file formats.
 
 The output includes:

 • A file with hourly averages across the entire dataset.

  • A file with hourly averages calculated separately for each day.

 This approach enables clean and efficient aggregation of time-based data.
 
# part two

### Family Relationship Mapping

This project ensures the integrity and completeness of family relationships within a relational database

It focuses on building a reliable structure that captures mutual connections between individuals—such

as spouses, parents, and children—while automatically handling missing or asymmetric links.

The approach supports consistent and bidirectional relationship mapping, enabling accurate family tree

analysis and relationship tracking at scale.

# part three

### Infrared Air Conditioner Remote System

This project provides a concise yet in-depth explanation of how infrared (IR) remote control systems

operate in air conditioners. It explores the bidirectional communication between the remote and the AC

unit, detailing how commands are encoded, transmitted via IR light, received, and decoded to control

system functions. The explanation also outlines the electronic components involved on both the

transmitter (remote) and receiver (AC) sides, offering insights into real-world embedded systems and

signal processing.
 
# part four

The application follows a client-server architecture. The client-side application interfaces with the server-side API, The server side interacts with
the database to store the data and return information. The way the system components communicate with each other:

• Client side is developed in React ,axios and designed by mui-material.

• The server-side is developed in Python using FastAPI for the API, Pydantic for data validation and models, and pymongo to interact with MongoDB, served by Uvicorn.

• Database implemented in mongoDB.

### Sign-up to the system

![Sign-up to the system](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20114618.png)

### Add products for supply

![Add products for supply](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20163141.png)


![Sign-up](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20120353.png)
 
 ### Login to the system

![login to the system](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20114004.png)

### Admin adds an order

![add order](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20121602.png)

#### The admin is waiting for the order confirmation from the supplier 
#### When the order is confirmed by the admin and the admin accepts the order,
#### the admin will click on the checkbox to update the order completion

![admin orders](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20015140%20copy%202.jpg)

#### Order history

![admin orders](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20163125%20copy.jpg)

#### supplier orders

![admin orders](https://github.com/EfratSimonowski/Hadasim/blob/main/part%204/screenshots/%D7%A6%D7%99%D7%9C%D7%95%D7%9D%20%D7%9E%D7%A1%D7%9A%202025-04-08%20015140%20copy.jpg)


