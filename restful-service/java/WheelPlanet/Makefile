test:
	./mvnw test
clean:
	rm -rf target
build:
	rm -rf target
	./mvnw clean package
run-jar:
	rm -rf target
	./mvnw clean package
	java -jar target/WheelPlanet-0.0.1-SNAPSHOT.jar
run:
	./mvnw spring-boot:run